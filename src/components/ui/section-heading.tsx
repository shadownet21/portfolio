export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="muted mt-5 max-w-2xl text-base leading-7 md:text-lg">{description}</p> : null}
    </div>
  );
}
