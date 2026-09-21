import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16_384;
const MAX_RATE_LIMIT_ENTRIES = 1_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, entry] of rateLimitStore) {
      if (now >= entry.resetAt) rateLimitStore.delete(key);
    }
    if (rateLimitStore.size >= MAX_RATE_LIMIT_ENTRIES) {
      rateLimitStore.delete(rateLimitStore.keys().next().value!);
    }
  }
  const current = rateLimitStore.get(ip);

  if (!current || now >= current.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });

    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;

  return false;
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function readJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function POST(request: Request) {
  try {
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
      return NextResponse.json({ error: "invalid_request" }, { status: 415 });
    }
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "rate_limit",
        },
        {
          status: 429,
        },
      );
    }

    const body = await readJson(request);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "invalid_request",
        },
        {
          status: 400,
        },
      );
    }

    const data = body as Record<string, unknown>;

    const name = getString(data.name);
    const email = getString(data.email);
    const subject = getString(data.subject);
    const message = getString(data.message);
    const website = getString(data.website);

    /*
     * Honeypot anti-spam.
     * Un utilisateur normal ne remplit jamais ce champ.
     */
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    /*
     * Validation serveur
     */
    if (
      name.length < 2 ||
      name.length > 80 ||
      /[\r\n]/.test(name) ||
      !EMAIL_REGEX.test(email) ||
      email.length > 254 ||
      subject.length < 2 ||
      subject.length > 150 ||
      /[\r\n]/.test(subject) ||
      message.length < 20 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          error: "validation",
        },
        {
          status: 400,
        },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !contactEmail || !fromEmail) {
      console.error("Missing contact environment variables.");

      return NextResponse.json(
        {
          error: "configuration",
        },
        {
          status: 500,
        },
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,

      // Cette adresse n'est jamais envoyée au navigateur.
      to: [contactEmail],

      // Quand tu cliques sur "Répondre", tu réponds au visiteur.
      replyTo: email,

      subject: `[Portfolio] ${subject}`,

      text: [
        "Nouveau message depuis le portfolio",
        "",
        `Nom : ${name}`,
        `Courriel : ${email}`,
        `Sujet : ${subject}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error: "send_failed",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        error: "invalid_request",
      },
      {
        status: 400,
      },
    );
  }
}
