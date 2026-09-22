import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Swal from "sweetalert2";
import { ContactForm } from "./contact-form";

vi.mock("sweetalert2", () => ({ default: { fire: vi.fn() } }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.resetAllMocks(); });

function submit() {
  render(<ContactForm locale="fr" />);
  fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Alice Martin" } });
  fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "alice@example.com" } });
  fireEvent.change(screen.getByLabelText("Sujet"), { target: { value: "Projet web" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour, discutons de mon prochain projet web." } });
  fireEvent.submit(screen.getByRole("form"));
}

describe("contact confirmation", () => {
  it("keeps success after confirming a SweetAlert thenable without catch", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    let confirm!: (value: { isConfirmed: boolean }) => void;
    const closed = new Promise<{ isConfirmed: boolean }>(resolve => { confirm = resolve; });
    vi.mocked(Swal.fire).mockReturnValue({ then: closed.then.bind(closed) } as ReturnType<typeof Swal.fire>);
    submit();
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    expect(screen.getByRole("status")).toHaveTextContent("Votre message a bien été reçu");
    await act(async () => { confirm({ isConfirmed: true }); await closed; });
    expect(screen.getByRole("status")).toHaveTextContent("Votre message a bien été reçu");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Nom")).toHaveValue("");
  });

  it("keeps a successful submission successful if the popup throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
    vi.mocked(Swal.fire).mockImplementation(() => { throw new Error("Popup unavailable"); });
    submit();
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    expect(screen.getByRole("status")).toHaveTextContent("Votre message a bien été reçu");
  });

  it("reports a failed submission without showing a success popup or clearing the form", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    submit();
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Une erreur est survenue"));
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Nom")).toHaveValue("Alice Martin");
  });
});