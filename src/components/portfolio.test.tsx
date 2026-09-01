import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact";
import { ProjectCard } from "@/components/ui/project-card";
import { SafeLink } from "@/components/ui/safe-link";
import { projects } from "@/data/projects";

describe("public portfolio interface", () => {
  it("does not render temporary URLs as interactive links", () => {
    const { container } = render(<SafeLink href="URL_CV_A_REMPLACER" label="CV">CV</SafeLink>);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not expose incomplete project fields", () => {
    const project = projects.find(({ slug }) => slug === "frig-auto");
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} locale="fr" compact />);
    expect(screen.queryByText("À compléter")).not.toBeInTheDocument();
  });

  it("hides the contact form until an email address is configured", () => {
    render(<Contact locale="fr" />);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
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
