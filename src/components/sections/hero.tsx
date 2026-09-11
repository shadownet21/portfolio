import { ArrowDownRight, Download, Mail, MapPin } from "lucide-react";
import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SafeLink } from "@/components/ui/safe-link";

export function Hero({ locale }: { locale: Locale }) {
  const copy =
    locale === "fr"
      ? {
          intro:
            "Professionnel des technologies de l’information avec plus de quatre années d’expérience en support informatique, développement d’applications web et administration de bases de données. J’aime transformer les besoins métier en solutions fiables, pratiques et maintenables. Je souhaite également mettre cette expérience à profit dans un rôle de gestionnaire de projets junior, en contribuant à l’organisation du travail et au suivi des livrables.",
          projects: "Voir mes projets",
          cv: "Télécharger mon CV",
          contact: "Me contacter",
        }
      : {
          intro:
            "Over four years building web applications, supporting users and making data reliable. Practical solutions, from requirements to delivery.",
          projects: "View my projects",
          cv: "Download my résumé",
          contact: "Contact me",
        };

  return (
    <section
      id="accueil"
      className="container-shell grid min-h-[92vh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.12fr_.88fr]"
    >
      {/* =========================
          CONTENU GAUCHE
      ========================== */}
      <div>
        <Reveal direction="up" delay={0.05} duration={0.7} distance={25}>
          <p className="eyebrow mb-5">{SITE.role[locale]}</p>
        </Reveal>

        <Reveal direction="up" delay={0.12} duration={0.8} distance={35}>
          <h1 className="display-title">
            Marc Maurice <span className="text-[var(--brand)]">Freeman</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2} duration={0.7} distance={25}>
          <div className="muted mt-6 flex items-center gap-2 font-semibold">
            <MapPin size={18} aria-hidden="true" />
            Longueuil, Québec
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.27} duration={0.8} distance={30}>
          <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl">
            {copy.intro}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.34} duration={0.7} distance={25}>
          <p className="mt-5 font-extrabold tracking-wide text-[var(--brand)]">
            {SITE.signature[locale]}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} duration={0.7} distance={25}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projets">
              {copy.projects}
              <ArrowDownRight size={18} />
            </a>

            <SafeLink
              className="button-secondary"
              href={PLACEHOLDERS.cv}
              download
              label={copy.cv}
            >
              <Download size={18} />
              {copy.cv}
            </SafeLink>

            <a className="button-secondary" href="#contact">
              <Mail size={18} />
              {copy.contact}
            </a>
          </div>
        </Reveal>
      </div>

      {/* =========================
          PHOTO / PROFIL
      ========================== */}
      <Reveal
        direction="right"
        delay={0.2}
        duration={1}
        distance={60}
        className="profile-card"
      >
        <div className="profile-glow" />

        <div className="profile-image-wrapper">
          <img
            src="/images/profile.png"
            alt={
              locale === "fr"
                ? "Portrait de Marc Maurice Freeman"
                : "Portrait of Marc Maurice Freeman"
            }
            className="profile-image"
          />

          <span className="profile-status" />
        </div>

        <div className="profile-info">
          <h2 className="profile-name">MMF</h2>

          <p className="profile-role">
            {locale === "fr"
              ? "Développement web · Support TI · Données · Gestion de projets"
              : "Web Development · IT Support · Data · Project Management"}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
