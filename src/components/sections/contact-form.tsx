"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import type { Locale } from "@/types/content";

type FormStatus = "idle" | "sending" | "success" | "error" | "rate-limit";
type FieldName = "name" | "email" | "subject" | "message";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_LENGTH: Record<FieldName, number> = { name: 2, email: 0, subject: 2, message: 20 };

export function ContactForm({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [firstName, setFirstName] = useState("");
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  function validate(name: FieldName, raw: FormDataEntryValue | null): string | undefined {
    const value = String(raw ?? "").trim();
    if (!value) return fr ? "Ce champ est obligatoire." : "This field is required.";
    if (name === "email" && !EMAIL_PATTERN.test(value)) {
      return fr ? "Entrez une adresse courriel valide, par exemple nom@domaine.com." : "Enter a valid email address, for example name@domain.com.";
    }
    if (value.length < MIN_LENGTH[name]) {
      return fr ? `Au moins ${MIN_LENGTH[name]} caractères.` : `At least ${MIN_LENGTH[name]} characters.`;
    }
    return undefined;
  }

  // Errors appear only after a first submit attempt, then update live. Showing them
  // on blur would shift the submit button under the pointer mid-click.
  const [attempted, setAttempted] = useState(false);
  function validateField(name: FieldName, value: string) {
    if (attempted) setErrors((current) => ({ ...current, [name]: validate(name, value) }));
  }

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

    setAttempted(true);
    const found: Partial<Record<FieldName, string>> = {};
    for (const name of ["name", "email", "subject", "message"] as const) {
      const error = validate(name, form.get(name));
      if (error) found[name] = error;
    }
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      formElement.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
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

      setFirstName(String(form.get("name") ?? "").trim().split(/\s+/)[0]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex h-full flex-col items-start justify-center p-6 md:p-10" role="status">
        <CheckCircle2 className="text-[var(--skill-operational)]" size={44} aria-hidden="true" />
        <h3 ref={successHeading} tabIndex={-1} className="mt-5 text-2xl font-extrabold outline-none">
          {fr ? `Merci ${firstName} !` : `Thank you, ${firstName}!`}
        </h3>
        <p className="muted mt-3 max-w-lg leading-7">
          {fr
            ? "Votre message a bien été reçu. Merci de partager votre projet avec moi ! Au plaisir d’en discuter avec vous. — Marc Maurice"
            : "Your message has been received. Thank you for sharing your project with me! I look forward to discussing it with you. — Marc Maurice"}
        </p>
        <button type="button" className="button-secondary mt-7" onClick={() => { setErrors({}); setAttempted(false); setStatus("idle"); }}>
          {fr ? "Envoyer un autre message" : "Send another message"}
        </button>
      </div>
    );
  }

  const statusMessage =
    status === "sending"
      ? fr ? "Envoi du message..." : "Sending message..."
      : status === "rate-limit"
        ? fr ? "Trop de tentatives. Veuillez réessayer plus tard." : "Too many attempts. Please try again later."
        : status === "error"
          ? fr ? "Une erreur est survenue. Veuillez réessayer ou m’écrire directement par courriel." : "Something went wrong. Please try again or email me directly."
          : "";

  const field = (name: FieldName, label: string, input: (props: FieldProps) => React.ReactNode) => {
    const error = errors[name];
    return (
      <div className="grid content-start gap-2">
        <label htmlFor={`contact-${name}`} className="text-sm font-bold">
          {label}
          <span className="text-[var(--brand)]" aria-hidden="true"> *</span>
        </label>
        {input({
          id: `contact-${name}`,
          name,
          required: true,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `contact-${name}-error` : undefined,
          className: `field ${error ? "field-invalid" : ""}`,
          onBlur: (event) => validateField(name, event.currentTarget.value),
          onChange: (event) => validateField(name, event.currentTarget.value),
        })}
        {error ? <p id={`contact-${name}-error`} className="field-error">{error}</p> : null}
      </div>
    );
  };

  return (
    <form
      className="card h-full p-6 md:p-8"
      onSubmit={submit}
      noValidate
      aria-label={fr ? "Formulaire de contact" : "Contact form"}
      aria-describedby="form-note form-status"
    >
      <p className="muted mb-5 text-sm">
        <span className="text-[var(--brand)]" aria-hidden="true">* </span>
        {fr ? "Tous les champs sont obligatoires." : "All fields are required."}
      </p>

      {/* NOM + COURRIEL */}
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", fr ? "Nom" : "Name", (props) => <input {...props} type="text" minLength={2} maxLength={80} autoComplete="name" />)}
        {field("email", fr ? "Courriel" : "Email", (props) => <input {...props} type="email" maxLength={254} autoComplete="email" />)}
      </div>

      {/* SUJET */}
      <div className="mt-5">
        {field("subject", fr ? "Sujet" : "Subject", (props) => <input {...props} type="text" minLength={2} maxLength={150} />)}
      </div>

      {/* MESSAGE */}
      <div className="mt-5">
        {field("message", "Message", (props) => <textarea {...props} rows={5} minLength={20} maxLength={5000} />)}
      </div>

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
        className={`mt-4 min-h-5 text-sm font-semibold ${status === "error" || status === "rate-limit" ? "field-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: FieldName;
  required: true;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  className: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
