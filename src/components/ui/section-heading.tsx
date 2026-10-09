// Numbered like the sheets of a technical drawing: "01 / Projets", with the number repeated as a watermark.
export function SectionHeading({ index, eyebrow, title, description }: { index?: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading mb-10 md:mb-14" data-index={index}>
      <p className="eyebrow mb-4">
        {index ? <span className="eyebrow-index">{index}</span> : null}
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="muted mt-5 max-w-2xl text-base leading-7 md:text-lg">{description}</p> : null}
    </div>
  );
}
