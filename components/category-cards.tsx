import Link from 'next/link';
import type { PageSection } from '../content/pages';

type LinksSection = Extract<PageSection, { type: 'links' }>;

export function CategoryCards({ section }: { section: LinksSection }) {
  return (
    <section className="category-cards" aria-labelledby="category-cards-title">
      <div className="category-cards__heading">
        <p>品类入口</p>
        <h2 id="category-cards-title">{section.title}</h2>
        {section.intro && <span>{section.intro}</span>}
      </div>
      <div className="category-cards__grid">
        {section.items.map((item, index) => (
          <Link className="category-card" href={item.href} key={item.href}>
            <div className="category-card__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.tag && <span className="category-card__tag">{item.tag}</span>}
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <span className="category-card__action">查看判断标准 <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
