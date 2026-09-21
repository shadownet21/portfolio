import { describe, expect, it } from "vitest";
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

  it("rejects line breaks in a mail subject", async () => {
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
