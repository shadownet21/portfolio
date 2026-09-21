import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { projects } from "./projects";

describe("project data", () => {
  it("contains unique slugs and complete bilingual core content", () => {
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.title.fr).toBeTruthy();
      expect(project.title.en).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.image.startsWith("/images/")).toBe(true);
    }
  });

  it("references images available in public", () => {
    for (const project of projects) {
      for (const image of [project.image, ...(project.gallery?.map(({ src }) => src) ?? [])]) {
        expect(existsSync(resolve("public", image.slice(1))), image).toBe(true);
      }
    }
  });
});
