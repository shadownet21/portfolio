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
        {/* TITRE DE LA SECTION */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow={fr ? "Expérience & formation" : "Experience & education"}
            title={
              fr
                ? "Un parcours construit sur le terrain"
                : "A journey built through hands-on work"
            }
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* =========================
              EXPÉRIENCE
          ========================== */}
          <div>
            <Reveal direction="left" duration={0.7} distance={40}>
              <h3 className="mb-6 flex items-center gap-3 text-xl font-extrabold">
                <BriefcaseBusiness
                  className="text-[var(--brand)]"
                  aria-hidden="true"
                />

                {fr ? "Expérience professionnelle" : "Professional experience"}
              </h3>
            </Reveal>

            {/* TIMELINE */}
            <div className="relative border-l border-[var(--border)] pl-7">
              {experiences.map((item, index) => (
                <Reveal
                  key={`${
                    typeof item.organization === "string"
                      ? item.organization
                      : item.organization[locale]
                  }-${item.role.fr}`}
                  direction="left"
                  distance={30}
                  duration={0.7}
                  delay={index * 0.08}
                  className="relative mb-8 last:mb-0"
                >
                  {/* POINT TIMELINE */}
                  <span
                    className="
                      absolute
                      -left-[2.14rem]
                      top-1
                      h-3
                      w-3
                      rounded-full
                      bg-[var(--brand)]
                      ring-4
                      ring-[var(--background)]
                    "
                    aria-hidden="true"
                  />

                  {!isPending(item.period[locale]) ? (
                    <p className="eyebrow">{item.period[locale]}</p>
                  ) : null}

                  <h4 className="mt-2 text-lg font-extrabold">
                    {item.role[locale]}
                  </h4>

                  <p className="muted mt-1 font-semibold">
                    {typeof item.organization === "string"
                      ? item.organization
                      : item.organization[locale]}
                  </p>

                  {item.responsibilities.length ? (
                    <details className="mt-4"><summary className="cursor-pointer text-sm font-bold text-[var(--brand)]">{fr ? "Missions et contributions" : "Responsibilities and contributions"}</summary><ul className="muted mt-3 grid gap-2 text-sm leading-6">
                      {item.responsibilities.map((responsibility) => (
                        <li
                          key={responsibility.fr}
                          className="
                              before:mr-2
                              before:text-[var(--brand)]
                              before:content-['—']
                            "
                        >
                          {responsibility[locale]}
                        </li>
                      ))}
                    </ul></details>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>

          {/* =========================
              FORMATION
          ========================== */}
          <div>
            <Reveal direction="right" duration={0.7} distance={40}>
              <h3 className="mb-6 flex items-center gap-3 text-xl font-extrabold">
                <GraduationCap
                  className="text-[var(--brand)]"
                  aria-hidden="true"
                />

                {fr ? "Formation" : "Education"}
              </h3>
            </Reveal>

            <div className="space-y-6">
              {education.map((item, index) => (
                <Reveal
                  key={item.institution}
                  direction="right"
                  distance={40}
                  duration={0.75}
                  delay={0.1 + index * 0.1}
                >
                  <div className="card p-6 md:p-8">
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
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
