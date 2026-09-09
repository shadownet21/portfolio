"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { PLACEHOLDERS, isPlaceholder } from "@/data/site";
import type { Locale } from "@/types/content";

export function ContactForm({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const [message, setMessage] = useState("");

  const unavailable = isPlaceholder(PLACEHOLDERS.email);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    // Honeypot anti-spam
    if (form.get("website")) return;

    if (unavailable) {
      setMessage(
        fr
          ? "Le courriel doit d’abord être configuré dans src/data/site.ts."
          : "The email address must first be configured in src/data/site.ts.",
      );

      return;
    }

    const subject = encodeURIComponent(String(form.get("subject")));

    const body = encodeURIComponent(
      `${fr ? "Nom" : "Name"}: ${form.get("name")}
${fr ? "Courriel" : "Email"}: ${form.get("email")}

${form.get("message")}`,
    );

    window.location.href = `mailto:${PLACEHOLDERS.email}?subject=${subject}&body=${body}`;

    setMessage(
      fr
        ? "Votre application de courriel va s’ouvrir. Aucun message n’est envoyé automatiquement."
        : "Your email application will open. No message is sent automatically.",
    );
  }

  return (
    <form
      className="card h-full p-6 md:p-8"
      onSubmit={submit}
      aria-label={fr ? "Formulaire de contact" : "Contact form"}
      aria-describedby="form-note"
    >
      {/* NOM + EMAIL */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          {fr ? "Nom" : "Name"}

          <input
            required
            name="name"
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
          className="surface min-h-12 rounded-lg px-3"
        />
      </label>

      {/* MESSAGE */}
      <label className="mt-5 grid gap-2 text-sm font-bold">
        {fr ? "Message" : "Message"}

        <textarea
          required
          name="message"
          rows={5}
          minLength={20}
          className="surface rounded-lg p-3"
        />
      </label>

      {/* HONEYPOT ANTI-SPAM */}
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {/* INFORMATION */}
      <p id="form-note" className="muted mt-4 text-sm">
        {fr
          ? "Ce formulaire prépare un courriel dans votre application. Il ne transmet aucune donnée à un serveur."
          : "This form prepares an email in your mail application. It sends no data to a server."}
      </p>

      {/* BOUTON */}
      <button className="button-primary mt-6" type="submit">
        <Mail size={18} aria-hidden="true" />

        {fr ? "Préparer le courriel" : "Prepare email"}
      </button>

      {/* MESSAGE DE STATUT */}
      <p
        className="mt-4 text-sm font-semibold"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
