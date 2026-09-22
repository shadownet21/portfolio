"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

import type { Locale } from "@/types/content";

type FormStatus = "idle" | "sending" | "success" | "error" | "rate-limit";

export function ContactForm({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const [status, setStatus] = useState<FormStatus>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    /*
     * Honeypot.
     * Un humain ne doit jamais remplir ce champ.
     */
    if (form.get("website")) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });

      if (response.status === 429) {
        setStatus("rate-limit");
        return;
      }

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");

      formElement.reset();
    } catch {
      setStatus("error");
    }
  }

  function getStatusMessage() {
    switch (status) {
      case "sending":
        return fr ? "Envoi du message..." : "Sending message...";

      case "success":
        return fr
          ? "Merci ! Votre message a bien été reçu."
          : "Thank you! Your message has been received.";

      case "rate-limit":
        return fr
          ? "Trop de tentatives. Veuillez réessayer plus tard."
          : "Too many attempts. Please try again later.";

      case "error":
        return fr
          ? "Une erreur est survenue. Veuillez réessayer."
          : "Something went wrong. Please try again.";

      default:
        return "";
    }
  }

  return (
    <form
      className="card h-full p-6 md:p-8"
      onSubmit={submit}
      aria-label={fr ? "Formulaire de contact" : "Contact form"}
      aria-describedby="form-note form-status"
    >
      {/* NOM + COURRIEL */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          {fr ? "Nom" : "Name"}

          <input
            required
            name="name"
            type="text"
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className="surface min-h-12 rounded-lg px-3"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          {fr ? "Courriel" : "Email"}

          <input
            required
            type="email"
            name="email"
            maxLength={254}
            autoComplete="email"
            className="surface min-h-12 rounded-lg px-3"
          />
        </label>
      </div>

      {/* SUJET */}
      <label className="mt-5 grid gap-2 text-sm font-bold">
        {fr ? "Sujet" : "Subject"}

        <input
          required
          name="subject"
          type="text"
          minLength={2}
          maxLength={150}
          className="surface min-h-12 rounded-lg px-3"
        />
      </label>

      {/* MESSAGE */}
      <label className="mt-5 grid gap-2 text-sm font-bold">
        Message
        <textarea
          required
          name="message"
          rows={5}
          minLength={20}
          maxLength={5000}
          className="surface rounded-lg p-3"
        />
      </label>

      {/* HONEYPOT ANTI-SPAM */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* INFORMATION */}
      <p id="form-note" className="muted mt-4 text-sm">
        {fr
          ? "Vos informations sont utilisées uniquement pour répondre à votre message."
          : "Your information is used only to respond to your message."}
      </p>

      {/* BOUTON */}
      <button
        className="button-primary mt-6"
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        <Mail size={18} aria-hidden="true" />

        {status === "sending"
          ? fr
            ? "Envoi..."
            : "Sending..."
          : fr
            ? "Envoyer le message"
            : "Send message"}
      </button>

      {/* ÉTAT DU FORMULAIRE */}
      <p
        id="form-status"
        className="mt-4 min-h-5 text-sm font-semibold"
        role="status"
        aria-live="polite"
      >
        {getStatusMessage()}
      </p>
    </form>
  );
}
