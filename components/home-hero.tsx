import Image from 'next/image';
import Link from 'next/link';
import { pages, type PageDefinition } from '../content/pages';
import { themeVisuals } from '../content/visuals';

const homepage = pages[0];

export function HomeHero({ page = homepage }: { page?: PageDefinition }) {
  const visual = themeVisuals.inventory;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow"><span aria-hidden="true" />{page.eyebrow}</p>
          <h1 id="home-hero-title">让库存更快找到合适的去向</h1>
          <p className="home-hero__summary">{page.summary}</p>
          <div className="home-hero__actions">
            <Link className="button button-primary" href="/assessment">
              开始库存评估 <span aria-hidden="true">↗</span>
            </Link>
            <Link className="home-hero__secondary" href="/process">
              先了解处理流程 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <figure className="home-hero__visual">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={1672}
            height={941}
            priority
            sizes="(max-width: 60rem) calc(100vw - 48px), 52vw"
            style={{ objectPosition: visual.objectPosition }}
          />
          <figcaption>{visual.disclosure}</figcaption>
        </figure>
      </div>
    </section>
  );
}
