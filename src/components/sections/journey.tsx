import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { education, experiences } from "@/data/profile";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { isPending } from "@/data/site";

export function Journey({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <section id="experience" className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow={fr ? "Expérience & formation" : "Experience & education"}
          title={
            fr
              ? "Un parcours construit sur le terrain"
              : "A journey built through hands-on work"
          }
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xl font-extrabold">
              <BriefcaseBusiness
                className="text-[var(--brand)]"
                aria-hidden="true"
              />
              {fr ? "Expérience professionnelle" : "Professional experience"}
            </h3>
            <div className="relative border-l border-[var(--border)] pl-7">
              {experiences.map((item, index) => (
                <Reveal
                  key={`${item.organization}-${item.role.fr}`}
                  className="relative mb-8 last:mb-0"
                  delay={index * 0.05}
                >
                  <span
                    className="absolute -left-[2.14rem] top-1 h-3 w-3 rounded-full bg-[var(--brand)] ring-4 ring-[var(--background)]"
                    aria-hidden="true"
                  />
                  {!isPending(item.period[locale]) ? (
                    <p className="eyebrow">{item.period[locale]}</p>
                  ) : null}
                  <h4 className="mt-2 text-lg font-extrabold">
                    {item.role[locale]}
                  </h4>
                  <p className="muted mt-1 font-semibold">
                    {item.organization}
                  </p>
                  {item.responsibilities.length ? (
                    <ul className="muted mt-4 grid gap-2 text-sm leading-6">
                      {item.responsibilities.map((responsibility) => (
                        <li
                          key={responsibility.fr}
                          className="before:mr-2 before:text-[var(--brand)] before:content-['—']"
                        >
                          {responsibility[locale]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xl font-extrabold">
              <GraduationCap className="text-[var(--brand)]" />
              {fr ? "Formation" : "Education"}
            </h3>
            {education.map((item) => (
              <Reveal key={item.institution} className="card p-6 md:p-8">
                <p className="eyebrow">{item.period[locale]}</p>
                <h4 className="mt-3 text-xl font-extrabold">
                  {item.institution}
                </h4>
                <p className="muted mt-1">{item.program[locale]}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span key={topic.fr} className="tag">
                      {topic[locale]}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
