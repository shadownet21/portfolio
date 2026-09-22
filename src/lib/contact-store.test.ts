// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createContactStore } from "./contact-store";

let directory: string;
beforeEach(async () => { directory = await mkdtemp(join(tmpdir(), "portfolio-contact-")); });
afterEach(async () => { await rm(directory, { recursive: true, force: true }); });
const message = { name: "Visiteur", email: "visitor@example.com", subject: "Projet", message: "Bonjour, discutons de mon prochain projet." };

describe("local contact storage", () => {
  it("creates the directory and retains concurrent submissions across store instances", async () => {
    const file = join(directory, "data", "messages.json");
    const save = createContactStore(file);
    await Promise.all(Array.from({ length: 10 }, (_, index) => save({ ...message, subject: `Projet ${index}` })));
    await createContactStore(file)({ ...message, subject: "Après redémarrage" });
    const records = JSON.parse(await readFile(file, "utf8"));
    expect(records).toHaveLength(11);
    expect(new Set(records.map((record: { id: string }) => record.id)).size).toBe(11);
    expect(records[0]).toMatchObject({ ...message, subject: "Projet 0" });
    expect(Number.isNaN(Date.parse(records[0].receivedAt))).toBe(false);
    expect(records[10].subject).toBe("Après redémarrage");
    expect(await readdir(join(directory, "data"))).toEqual(["messages.json"]);
  });

  it("preserves corrupt storage and accepts new writes after recovery", async () => {
    const file = join(directory, "messages.json");
    const save = createContactStore(file);
    await writeFile(file, "invalid JSON");
    await expect(save(message)).rejects.toThrow();
    expect(await readFile(file, "utf8")).toBe("invalid JSON");
    await writeFile(file, "{}");
    await expect(save(message)).rejects.toThrow("JSON array");
    expect(await readFile(file, "utf8")).toBe("{}");
    await writeFile(file, "[]");
    await save(message);
    expect(JSON.parse(await readFile(file, "utf8"))).toHaveLength(1);
  });
});