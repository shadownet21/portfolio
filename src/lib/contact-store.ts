import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Serialize writes within the single Node.js server to avoid lost submissions.
export function createContactStore(filePath: string) {
  let pending: Promise<void> = Promise.resolve();

  return function save(message: ContactMessage): Promise<void> {
    const operation = pending.then(async () => {
      await mkdir(dirname(filePath), { recursive: true });
      let messages: unknown[];
      try {
        const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
        if (!Array.isArray(parsed)) throw new Error("Contact storage must contain a JSON array.");
        messages = parsed;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        messages = [];
      }

      messages.push({ id: randomUUID(), receivedAt: new Date().toISOString(), ...message });
      const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
      try {
        await writeFile(temporaryPath, JSON.stringify(messages, null, 2) + "\n", { encoding: "utf8", flag: "wx", mode: 0o600 });
        await rename(temporaryPath, filePath);
      } finally {
        await rm(temporaryPath, { force: true });
      }
    });
    pending = operation.catch(() => {});
    return operation;
  };
}

export const saveContactMessage = createContactStore(
  join(process.cwd(), "data", "contact-messages.json"),
);