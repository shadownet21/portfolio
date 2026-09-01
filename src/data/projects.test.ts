import { describe, expect, it } from "vitest";
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
});
