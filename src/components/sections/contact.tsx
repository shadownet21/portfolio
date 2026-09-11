import { BrandIcon } from "@/components/ui/brand-icon";
import { MapPin } from "lucide-react";

import { PLACEHOLDERS } from "@/data/site";
import type { Locale } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeLink } from "@/components/ui/safe-link";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

export function Contact({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

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
        {/* TITRE */}
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

        <div className="grid gap-7 lg:grid-cols-[.78fr_1.22fr]">
          {/* =========================
              INFORMATIONS
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

                {/* LINKEDIN */}
                <SafeLink
                  className="flex items-center gap-3"
                  href={PLACEHOLDERS.linkedin}
                  label="LinkedIn"
                  newTab
                >
                  <BrandIcon brand="linkedin"
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
                  <BrandIcon brand="github"
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
          <Reveal
            direction="right"
            delay={0.12}
            duration={0.85}
            distance={45}
            className="h-full"
          >
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
