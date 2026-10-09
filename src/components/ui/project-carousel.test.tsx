import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { projects } from "@/data/projects";

const secondary = projects.filter((project) => !project.featured);

describe("project carousel", () => {
  it("only lets the centred card be reached", () => {
    render(<ProjectCarousel projects={secondary} locale="fr" />);
    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides).toHaveLength(secondary.length);
    expect(slides.filter((slide) => !slide.hasAttribute("inert"))).toHaveLength(1);
  });

  it("moves with the buttons and the arrow keys, and stops at the ends", () => {
    render(<ProjectCarousel projects={secondary} locale="fr" />);
    const start = Math.floor((secondary.length - 1) / 2) + 1;
    const counter = screen.getByText(`${start} / ${secondary.length}`);

    fireEvent.click(screen.getByRole("button", { name: "Projet suivant" }));
    expect(counter).toHaveTextContent(`${start + 1} / ${secondary.length}`);

    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowLeft" });
    expect(counter).toHaveTextContent(`${start} / ${secondary.length}`);

    const previous = screen.getByRole("button", { name: "Projet précédent" });
    for (let i = 0; i < secondary.length; i++) fireEvent.click(previous);
    expect(counter).toHaveTextContent(`1 / ${secondary.length}`);
    expect(previous).toHaveAttribute("aria-disabled", "true");
  });
});
