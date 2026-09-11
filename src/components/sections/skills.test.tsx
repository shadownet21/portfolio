import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skills } from "./skills";

describe("skill proficiency filters", () => {
  it("filters groups and restores all skills when toggled off", async () => {
    render(<Skills locale="fr" />);
    const section = document.getElementById("competences")!;
    expect(within(section).getByText("Informatique décisionnelle (BI)")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "En apprentissage" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(within(section).queryByText("Informatique décisionnelle (BI)")).not.toBeInTheDocument());
    expect(within(section).getByText("TypeScript")).toBeInTheDocument();
    expect(within(section).queryByText("PHP")).not.toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => expect(within(section).getByText("Informatique décisionnelle (BI)")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Tout voir" })).toHaveAttribute("aria-pressed", "true");
  });
  it("keeps business intelligence available in the professional filter", async () => {
    render(<Skills locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Professional experience" }));
    expect(screen.getByText("Business Intelligence (BI)")).toBeInTheDocument();
    expect(screen.getByText("Excel data processing")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("TypeScript")).not.toBeInTheDocument());
  });
});
