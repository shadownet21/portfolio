import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact";
import { ProjectCard } from "@/components/ui/project-card";
import { SafeLink } from "@/components/ui/safe-link";
import { projects } from "@/data/projects";
import { isPlaceholder, PLACEHOLDERS } from "@/data/site";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

describe("public portfolio interface", () => {
  it("does not render temporary URLs as interactive links", () => {
    const { container } = render(<SafeLink href="URL_CV_A_REMPLACER" label="CV">CV</SafeLink>);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not expose incomplete project fields", () => {
    const project = projects.find(({ slug }) => slug === "frig-auto");
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} locale="fr" />);
    expect(screen.queryByText("À compléter")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FRIG’AUTO" })).toHaveAttribute("href", "/fr/projets/frig-auto");
  });

  it("links to a résumé that exists in public", () => {
    expect(isPlaceholder(PLACEHOLDERS.cv)).toBe(false);
    expect(existsSync(resolve("public", PLACEHOLDERS.cv.slice(1)))).toBe(true);
  });

  it("renders the configured contact fields without placeholder text", () => {
    render(<Contact locale="fr" />);
    expect(screen.getByRole("button", { name: /Envoyer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: PLACEHOLDERS.email })).toHaveAttribute("href", `mailto:${PLACEHOLDERS.email}`);
    expect(screen.queryByText("EMAIL_A_REMPLACER")).not.toBeInTheDocument();
  });

  it("opens the mobile menu and closes it with Escape", () => {
    render(<Header locale="fr" />);
    const menuButton = screen.getByRole("button", { name: "Ouvrir le menu" });
    fireEvent.click(menuButton);
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Navigation mobile" })).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
  });
});
