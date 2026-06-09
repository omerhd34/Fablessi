"use client";

const headingClassByLevel = {
 2: "font-display text-[0.875rem] font-semibold tracking-[0.26em] text-charcoal uppercase md:text-base",
 3: "mt-6 font-display text-[0.8125rem] font-semibold tracking-[0.22em] text-charcoal uppercase md:text-[0.95rem]",
 4: "mt-5 font-body text-[0.95rem] font-semibold text-charcoal md:text-base",
};

const bodyClassName =
 "mt-4 font-body text-[0.95rem] leading-[1.85] text-charcoal/78 md:text-base";

const listClassName =
 "mt-4 list-disc space-y-2 pl-5 font-body text-[0.95rem] leading-[1.85] text-charcoal/78 md:text-base";

export function LegalSection({ section, contentKey, level = 2 }) {
 const HeadingTag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";
 const sectionClassName =
  level === 2 ? "legal-page__section" : "legal-page__subsection";

 return (
  <section
   className={sectionClassName}
   aria-labelledby={
    level === 2 ? `legal-${contentKey}-${section.id}` : undefined
   }
  >
   <HeadingTag
    id={level === 2 ? `legal-${contentKey}-${section.id}` : undefined}
    className={headingClassByLevel[level] ?? headingClassByLevel[4]}
   >
    {section.title}
   </HeadingTag>

   {section.paragraphs?.map((paragraph) => (
    <p key={paragraph} className={bodyClassName}>
     {paragraph}
    </p>
   ))}

   {section.list?.length ? (
    <ul className={listClassName}>
     {section.list.map((item) => (
      <li key={item}>{item}</li>
     ))}
    </ul>
   ) : null}

   {section.definitions?.length ? (
    <dl className="mt-4 space-y-4">
     {section.definitions.map(({ term, definition }) => (
      <div key={term}>
       <dt className="font-body text-[0.95rem] font-semibold text-charcoal md:text-base">{term}</dt>
       <dd className={`${bodyClassName} mt-1`}>{definition}</dd>
      </div>
     ))}
    </dl>
   ) : null}

   {section.subsections?.map((subsection) => (
    <LegalSection
     key={subsection.title}
     section={subsection}
     contentKey={contentKey}
     level={level + 1}
    />
   ))}
  </section>
 );
}
