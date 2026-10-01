type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactEmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 10_000;

// Email delivery is enabled only when all three variables are set.
export function getContactEmailConfig(): ContactEmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  return apiKey && to && from ? { apiKey, to, from } : null;
}

export async function sendContactEmail(config: ContactEmailConfig, message: ContactMessage): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      // This address is never sent to the browser.
      to: [config.to],
      // "Reply" answers the visitor directly.
      reply_to: message.email,
      subject: `[Portfolio] ${message.subject}`,
      text: [
        "Nouveau message depuis le portfolio",
        "",
        `Nom : ${message.name}`,
        `Courriel : ${message.email}`,
        `Sujet : ${message.subject}`,
        "",
        "Message :",
        message.message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}: ${await response.text()}`);
  }
}
