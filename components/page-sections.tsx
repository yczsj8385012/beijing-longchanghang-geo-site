import type { PageDefinition, PageSection } from '../content/pages';

function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

function SectionContent({ section }: { section: PageSection }) {
  switch (section.type) {
    case 'lead':
      return <section className="manifest-lead"><span className="section-index">判断原则</span><p>{section.text}</p></section>;
    case 'links':
      return <section className="content-section"><div className="section-heading"><span className="section-kicker">业务入口</span><h2>{section.title}</h2>{section.intro && <p>{section.intro}</p>}</div><div className="link-grid">{section.items.map((item, index) => <a className="route-card" href={item.href} key={item.href}><div className="route-card-top"><span className="card-number">{String(index + 1).padStart(2, '0')}</span>{item.tag && <span className="tag">{item.tag}</span>}</div><h3>{item.title}</h3><p>{item.body}</p><span className="route-card-action">查看判断标准 <ArrowIcon /></span></a>)}</div></section>;
    case 'steps':
      return <section className="content-section section-ink"><div className="section-heading"><span className="section-kicker">处理路径</span><h2>{section.title}</h2>{section.intro && <p>{section.intro}</p>}</div><ol className="steps-list">{section.items.map((item, index) => <li key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol></section>;
    case 'facts':
      return <section className="content-section"><div className="section-heading"><span className="section-kicker">信息清单</span><h2>{section.title}</h2>{section.intro && <p>{section.intro}</p>}</div><dl className="facts-list">{section.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>;
    case 'checklist':
      return <section className="content-section"><div className="section-heading"><span className="section-kicker">准备材料</span><h2>{section.title}</h2>{section.intro && <p>{section.intro}</p>}</div><ul className="check-list">{section.items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>;
    case 'faq':
      return <section className="content-section"><div className="section-heading"><span className="section-kicker">常见问题</span><h2>{section.title}</h2></div><div className="faq-list">{section.items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>;
    case 'notice':
      return <aside className={`notice notice-${section.tone}`}><span className="notice-icon" aria-hidden="true">{section.tone === 'warning' ? '!' : 'i'}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></aside>;
    case 'source':
      return <aside className="source-row"><div><span>公开资料来源</span><strong>{section.title}</strong><small>{section.publisher}</small></div><a href={section.href} rel="noreferrer" target="_blank">查看原始页面 <ArrowIcon /></a></aside>;
  }
}

export function PageSections({ page }: { page: PageDefinition }) {
  return <>{page.sections.map((section, index) => <SectionContent key={`${section.type}-${index}`} section={section} />)}</>;
}
