import { Code2, Database, Headphones, ShieldCheck } from "lucide-react";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  { 
    icon: Code2, 
    title: { fr: "Développement Web", en: "Web Development" }, 
    text: { 
      fr: "Applications métier, interfaces responsive et API REST avec JavaScript, PHP et Laravel; React et Next.js sont actuellement en approfondissement.", 
      en: "Business applications, responsive interfaces and REST APIs with JavaScript, PHP and Laravel; React and Next.js are currently being developed further." 
    } 
  },
  { 
    icon: Headphones, 
    title: { fr: "Support informatique", en: "IT Support" }, 
    text: { 
      fr: "Diagnostic matériel et logiciel, soutien aux utilisateurs, gestion des comptes et accès, documentation et suivi d’incidents.", 
      en: "Hardware and software diagnostics, user assistance, account and access management, documentation and incident tracking." 
    } 
  },
  { 
    icon: Database, 
    title: { fr: "Bases de données", en: "Databases" }, 
    text: { 
      fr: "SQL Server, MySQL et PostgreSQL : requêtes, maintenance, exploitation et analyse structurée des données.", 
      en: "SQL Server, MySQL and PostgreSQL: queries, maintenance, operations and structured data analysis." 
    } 
  },
  { 
    icon: ShieldCheck, 
    title: { fr: "Sécurité et fiabilité", en: "Security and Reliability" }, 
    text: { 
      fr: "Linux, contrôle des accès, sauvegardes, principes de cybersécurité, réseaux TCP/IP et virtualisation.", 
      en: "Linux, access control, backups, cybersecurity principles, TCP/IP networking and virtualization." 
    } 
  },
];

export function Expertise({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  
  return (
    <section id="expertise" className="section-space">
      <div className="container-shell">
        <SectionHeading 
          eyebrow={fr ? "Domaines d’expertise" : "Areas of expertise"} 
          title={fr ? "Un profil hybride, de l’utilisateur jusqu’à la donnée" : "A hybrid profile, from user needs to data"} 
          description={fr ? "Une vision transversale pour diagnostiquer, développer et fiabiliser les solutions." : "A cross-functional perspective to diagnose, build and make solutions reliable."} 
        />
        
        <div className="grid gap-5 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title.fr} delay={index * .06} className="card p-6 md:p-8">
              <div className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-[var(--surface-muted)] text-[var(--brand)]">
                <Icon />
              </div>
              <h3 className="text-xl font-extrabold">{title[locale]}</h3>
              <p className="muted mt-3 leading-7">{text[locale]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
