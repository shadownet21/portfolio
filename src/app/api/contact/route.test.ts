import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveContactMessage } from "../../../lib/contact-store";
vi.mock("../../../lib/contact-store", () => ({ saveContactMessage: vi.fn() }));
beforeEach(() => { vi.mocked(saveContactMessage).mockReset(); });
import { POST } from "./route";

const endpoint = "http://localhost:3000/api/contact";

function request(body: string, ip: string, contentType = "application/json") {
  return new Request(endpoint, {
    method: "POST",
    headers: { "content-type": contentType, "x-forwarded-for": ip },
    body,
  });
}

describe("contact route validation", () => {
  it("rejects unsupported content types", async () => {
    const response = await POST(request("name=Marc", "audit-content-type", "text/plain"));
    expect(response.status).toBe(415);
  });

  it("rejects oversized requests before parsing them", async () => {
    const response = await POST(request(JSON.stringify({ message: "x".repeat(17_000) }), "audit-size"));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid_request" });
  });

  it("rejects line breaks in a subject", async () => {
    const response = await POST(request(JSON.stringify({
      name: "Marc",
      email: "marc@example.com",
      subject: "Bonjour\nBcc: someone@example.com",
      message: "Un message suffisamment long pour être validé.",
    }), "audit-header"));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "validation" });
  });
});

const validMessage = {
  name: "Visiteur",
  email: "visitor@example.com",
  subject: "Projet web",
  message: "Bonjour, je souhaite discuter de mon projet web.",
};

describe("contact persistence", () => {
  it("stores validated fields and acknowledges the saved message", async () => {
    vi.mocked(saveContactMessage).mockResolvedValue(undefined);
    const response = await POST(request(JSON.stringify({ ...validMessage, name: "  Visiteur  ", extra: "ignored" }), "save-success"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(saveContactMessage).toHaveBeenCalledExactlyOnceWith(validMessage);
  });

  it("returns a server error when storage fails", async () => {
    vi.mocked(saveContactMessage).mockRejectedValue(new Error("Disk unavailable"));
    const logger = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const response = await POST(request(JSON.stringify(validMessage), "save-failure"));
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({ error: "storage_failed" });
    } finally { logger.mockRestore(); }
  });

  it("does not store spam or invalid submissions", async () => {
    const spam = await POST(request(JSON.stringify({ ...validMessage, website: "spam" }), "save-spam"));
    expect(spam.status).toBe(200);
    const invalid = await POST(request(JSON.stringify({ ...validMessage, email: "invalid" }), "save-invalid"));
    expect(invalid.status).toBe(400);
    expect(saveContactMessage).not.toHaveBeenCalled();
  });

  it("limits repeated submissions", async () => {
    vi.mocked(saveContactMessage).mockResolvedValue(undefined);
    for (let index = 0; index < 5; index++) {
      expect((await POST(request(JSON.stringify(validMessage), "save-rate"))).status).toBe(200);
    }
    expect((await POST(request(JSON.stringify(validMessage), "save-rate"))).status).toBe(429);
    expect(saveContactMessage).toHaveBeenCalledTimes(5);
  });
});