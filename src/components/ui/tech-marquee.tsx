const STACK = ["PHP", "Laravel", "JavaScript", "SQL Server", "MySQL", "PostgreSQL", "React", "Next.js", "TypeScript", "jQuery", "Bootstrap", "Linux", "Git"];

// A tilted ticker between the hero and the projects. The list is rendered twice for a seamless loop.
export function TechMarquee({ label }: { label: string }) {
  return (
    <div className="tech-marquee-wrap" role="region" aria-label={label}>
      <div className="tech-marquee">
        <div className="tech-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="tech-marquee-list" aria-hidden={copy === 1 ? true : undefined}>
              {STACK.map((name) => <li key={name}>{name}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
