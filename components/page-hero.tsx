import Image from 'next/image';
import type { PageDefinition } from '../content/pages';
import { getVisualForPath } from '../content/visuals';

export function PageHero({ page }: { page: PageDefinition }) {
  const visual = getVisualForPath(page.path);

  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__inner">
        <div className="page-hero__copy">
          <p className="page-hero__eyebrow"><span aria-hidden="true" />{page.eyebrow}</p>
          <h1 id="page-hero-title">{page.title}</h1>
          <p className="page-hero__summary">{page.summary}</p>
        </div>

        <figure className="page-hero__visual">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={1672}
            height={941}
            priority
            sizes="(max-width: 60rem) calc(100vw - 48px), 43vw"
            style={{ objectPosition: visual.objectPosition }}
          />
          <figcaption>{visual.disclosure}</figcaption>
        </figure>
      </div>
    </section>
  );
}
