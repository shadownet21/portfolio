import { afterEach, describe, expect, it, vi } from "vitest";
import { getContactEmailConfig, sendContactEmail } from "./contact-mailer";

const config = { apiKey: "re_test", to: "owner@example.com", from: "Portfolio <contact@example.com>" };
const message = { name: "Visiteur", email: "visitor@example.com", subject: "Projet web", message: "Bonjour, je souhaite discuter." };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact mailer", () => {
  it("is enabled only when every variable is set", () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_EMAIL", "owner@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    expect(getContactEmailConfig()).toBeNull();
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    expect(getContactEmailConfig()).toEqual({ apiKey: "re_test", to: "owner@example.com", from: "contact@example.com" });
  });

  it("sends the message to the owner with the visitor as reply-to", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await sendContactEmail(config, message);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ from: config.from, to: [config.to], reply_to: message.email, subject: "[Portfolio] Projet web" });
    expect(body.text).toContain(message.message);
  });

  it("throws when Resend rejects the email", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("invalid from", { status: 422 })));
    await expect(sendContactEmail(config, message)).rejects.toThrow("Resend responded with 422: invalid from");
  });
});
