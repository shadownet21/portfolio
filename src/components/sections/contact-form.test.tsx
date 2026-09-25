import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.resetAllMocks(); });

function fill() {
  fireEvent.change(screen.getByLabelText(/^Nom/), { target: { value: "Alice Martin" } });
  fireEvent.change(screen.getByLabelText(/^Courriel/), { target: { value: "alice@example.com" } });
  fireEvent.change(screen.getByLabelText(/^Sujet/), { target: { value: "Projet web" } });
  fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: "Bonjour, discutons de mon prochain projet web." } });
}

describe("contact form", () => {
  it("shows an inline confirmation and can start a new message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm locale="fr" />);
    fill();
    fireEvent.submit(screen.getByRole("form"));
    expect(await screen.findByRole("heading", { name: "Merci Alice !" })).toHaveFocus();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Envoyer un autre message" }));
    expect(screen.getByLabelText(/^Nom/)).toHaveValue("");
  });

  it("reports a failed submission without clearing the form", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    render(<ContactForm locale="fr" />);
    fill();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Une erreur est survenue"));
    expect(screen.getByLabelText(/^Nom/)).toHaveValue("Alice Martin");
  });

  it("flags invalid fields next to the input and does not send", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm locale="fr" />);
    fireEvent.change(screen.getByLabelText(/^Courriel/), { target: { value: "alice" } });
    fireEvent.submit(screen.getByRole("form"));
    const name = screen.getByLabelText(/^Nom/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Ce champ est obligatoire.");
    expect(name).toHaveFocus();
    expect(screen.getByLabelText(/^Courriel/)).toHaveAccessibleDescription(/adresse courriel valide/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
