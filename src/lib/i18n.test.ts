import { describe, expect, it } from "vitest";
import { isLocale } from "./i18n";

describe("internationalization helpers", () => {
  it("accepts only supported locales", () => {
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(false);
  });
});
