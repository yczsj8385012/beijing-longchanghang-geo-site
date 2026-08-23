import type { PageDefinition, PageSection } from '../content/pages';

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function SectionContent({ section }: { section: PageSection }) {
  switch (section.type) {
    case 'lead':
      return (
        <section className="manifest-lead">
          <span className="section-index">判断原则</span>
          <p>{section.text}</p>
        </section>
      );
    case 'links':
      return (
        <section className="content-section section-links">
          <SectionHeading kicker="业务入口" title={section.title} intro={section.intro} />
          <div className="link-grid">
            {section.items.map((item, index) => (
              <a className="route-card" href={item.href} key={item.href}>
                <div className="route-card-top">
                  <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                  {item.tag ? <span className="tag">{item.tag}</span> : null}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="route-card-action">查看判断标准 <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </section>
      );
    case 'steps':
      return (
        <section className="content-section section-steps">
          <SectionHeading kicker="处理路径" title={section.title} intro={section.intro} />
          <ol className="steps-track">
            {section.items.map((item, index) => (
              <li key={`${item.title}-${index}`}>
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'facts':
      return (
        <section className="content-section section-facts">
          <SectionHeading kicker="信息清单" title={section.title} intro={section.intro} />
          <dl className="facts-grid">
            {section.items.map((item, index) => (
              <div key={item.label}>
                <dt>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case 'checklist':
      return (
        <section className="content-section section-checklist">
          <SectionHeading kicker="准备材料" title={section.title} intro={section.intro} />
          <ol className="check-list">
            {section.items.map((item, index) => (
              <li key={item}>
                <span className="check-list__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="check-list__mark" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'faq':
      return (
        <section className="content-section section-faq">
          <SectionHeading kicker="常见问题" title={section.title} />
          <div className="faq-list">
            {section.items.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">＋</span>
                </summary>
                <div className="faq-answer"><p>{item.answer}</p></div>
              </details>
            ))}
          </div>
        </section>
      );
    case 'notice':
      return (
        <aside className={`notice notice-${section.tone}`}>
          <span className="notice-icon" aria-hidden="true">{section.tone === 'warning' ? '!' : 'i'}</span>
          <div>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        </aside>
      );
    case 'source':
      return (
        <aside className="source-card">
          <div className="source-card__label">公开资料来源</div>
          <div className="source-card__body">
            <strong>{section.title}</strong>
            <small>{section.publisher}</small>
          </div>
          <a href={section.href} rel="noreferrer" target="_blank">
            查看原始页面 <ArrowIcon />
          </a>
        </aside>
      );
  }
}

export function PageSections({ page }: { page: PageDefinition }) {
  return (
    <>
      {page.sections.map((section, index) => (
        <SectionContent key={`${section.type}-${index}`} section={section} />
      ))}
    </>
  );
}
