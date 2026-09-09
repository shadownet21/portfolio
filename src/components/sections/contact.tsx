import { CodeXml, ContactRound, Mail, MapPin } from "lucide-react";

import { PLACEHOLDERS, isPlaceholder } from "@/data/site";
import type { Locale } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeLink } from "@/components/ui/safe-link";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

export function Contact({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const hasEmail = !isPlaceholder(PLACEHOLDERS.email);

  const opportunities = fr
    ? [
        "Développement web",
        "Support TI et applicatif",
        "Projets techniques",
        "Région de Montréal et Rive-Sud",
      ]
    : [
        "Web development",
        "IT and application support",
        "Technical projects",
        "Montréal and South Shore area",
      ];

  return (
    <section id="contact" className="section-space">
      <div className="container-shell">
        {/* =========================
            TITRE
        ========================== */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow="Contact"
            title={
              fr
                ? "Construisons une solution utile"
                : "Let’s build something useful"
            }
            description={
              fr
                ? "Je suis disponible pour échanger au sujet de postes, de projets techniques et d’occasions professionnelles."
                : "I am available to discuss roles, technical projects and professional opportunities."
            }
          />
        </Reveal>

        <div
          className={`grid gap-7 ${
            hasEmail ? "lg:grid-cols-[.78fr_1.22fr]" : "max-w-2xl"
          }`}
        >
          {/* =========================
              INFORMATIONS CONTACT
          ========================== */}
          <Reveal
            direction="left"
            duration={0.8}
            distance={45}
            className="h-full"
          >
            <div className="card h-full p-6 md:p-8">
              <h3 className="text-lg font-extrabold">
                {fr ? "Ouvert aux occasions" : "Open to opportunities"}
              </h3>

              <ul className="muted mt-4 grid gap-2">
                {opportunities.map((item) => (
                  <li
                    key={item}
                    className="
                      before:mr-2
                      before:text-[var(--brand)]
                      before:content-['✓']
                    "
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-4 text-sm font-semibold">
                {/* LOCALISATION */}
                <span className="flex items-center gap-3">
                  <MapPin
                    className="text-[var(--brand)]"
                    size={20}
                    aria-hidden="true"
                  />
                  Longueuil, Québec
                </span>

                {/* EMAIL */}
                <SafeLink
                  className="flex items-center gap-3"
                  href={`mailto:${PLACEHOLDERS.email}`}
                  label={fr ? "Envoyer un courriel" : "Send an email"}
                >
                  <Mail
                    className="text-[var(--brand)]"
                    size={20}
                    aria-hidden="true"
                  />

                  {PLACEHOLDERS.email}
                </SafeLink>

                {/* LINKEDIN */}
                <SafeLink
                  className="flex items-center gap-3"
                  href={PLACEHOLDERS.linkedin}
                  label="LinkedIn"
                  newTab
                >
                  <ContactRound
                    className="text-[var(--brand)]"
                    size={20}
                    aria-hidden="true"
                  />
                  LinkedIn
                </SafeLink>

                {/* GITHUB */}
                <SafeLink
                  className="flex items-center gap-3"
                  href={PLACEHOLDERS.github}
                  label="GitHub"
                  newTab
                >
                  <CodeXml
                    className="text-[var(--brand)]"
                    size={20}
                    aria-hidden="true"
                  />
                  GitHub
                </SafeLink>
              </div>
            </div>
          </Reveal>

          {/* =========================
              FORMULAIRE
          ========================== */}
          {hasEmail ? (
            <Reveal
              direction="right"
              delay={0.12}
              duration={0.85}
              distance={45}
              className="h-full"
            >
              <ContactForm locale={locale} />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
