import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { getProject } from "@/data/projects";

const flash = getProject("flash-production")!;

describe("project gallery showcase", () => {
  it("moves through the screens with the arrows, the thumbnails and the keyboard", () => {
    const { container } = render(<ProjectGallery project={flash} locale="fr" />);
    const total = flash.gallery!.length;
    const thumbs = screen.getAllByRole("button", { name: /^\d+ — / }).filter((button) => button.classList.contains("showcase-thumb"));
    expect(thumbs).toHaveLength(total);
    expect(screen.getByText("Écran de connexion repensé")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Interface suivante" })[0]);
    expect(thumbs[1]).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(container.querySelector(".showcase")!, { key: "ArrowLeft" });
    fireEvent.keyDown(container.querySelector(".showcase")!, { key: "ArrowLeft" });
    expect(thumbs[total - 1]).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(thumbs[5]);
    expect(thumbs[5]).toHaveAttribute("aria-pressed", "true");
    // Only the active screen and its two neighbours are mounted.
    expect(container.querySelectorAll(".showcase-image")).toHaveLength(3);
  });
});

