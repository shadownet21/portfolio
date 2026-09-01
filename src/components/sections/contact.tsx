import { CodeXml, ContactRound, Mail, MapPin } from "lucide-react";
import { PLACEHOLDERS, isPlaceholder } from "@/data/site";
import type { Locale } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeLink } from "@/components/ui/safe-link";
import { ContactForm } from "./contact-form";

export function Contact({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const hasEmail = !isPlaceholder(PLACEHOLDERS.email);
  const opportunities = fr ? ["Développement web", "Support TI et applicatif", "Projets techniques", "Région de Montréal et Rive-Sud"] : ["Web development", "IT and application support", "Technical projects", "Montréal and South Shore area"];
  return (
    <section id="contact" className="section-space">
      <div className="container-shell"><SectionHeading eyebrow={fr ? "Contact" : "Contact"} title={fr ? "Construisons une solution utile" : "Let’s build something useful"} description={fr ? "Je suis disponible pour échanger au sujet de postes, de projets techniques et d’occasions professionnelles." : "I am available to discuss roles, technical projects and professional opportunities."} />
        <div className={`grid gap-7 ${hasEmail ? "lg:grid-cols-[.78fr_1.22fr]" : "max-w-2xl"}`}><div className="card p-6 md:p-8"><h3 className="text-lg font-extrabold">{fr ? "Ouvert aux occasions" : "Open to opportunities"}</h3><ul className="muted mt-4 grid gap-2">{opportunities.map((item) => <li key={item} className="before:mr-2 before:text-[var(--brand)] before:content-['✓']">{item}</li>)}</ul><div className="mt-8 grid gap-4 text-sm font-semibold"><span className="flex items-center gap-3"><MapPin className="text-[var(--brand)]" size={20} aria-hidden="true" />Longueuil, Québec</span><SafeLink className="flex items-center gap-3" href={`mailto:${PLACEHOLDERS.email}`} label={fr ? "Envoyer un courriel" : "Send an email"}><Mail className="text-[var(--brand)]" size={20} aria-hidden="true" />{PLACEHOLDERS.email}</SafeLink><SafeLink className="flex items-center gap-3" href={PLACEHOLDERS.linkedin} label="LinkedIn" newTab><ContactRound className="text-[var(--brand)]" size={20} aria-hidden="true" />LinkedIn</SafeLink><SafeLink className="flex items-center gap-3" href={PLACEHOLDERS.github} label="GitHub" newTab><CodeXml className="text-[var(--brand)]" size={20} aria-hidden="true" />GitHub</SafeLink></div></div>{hasEmail ? <ContactForm locale={locale} /> : null}</div>
      </div>
    </section>
  );
}
