import { PageSections } from '../components/page-sections';
import { StructuredData } from '../components/structured-data';
import { pages } from '../content/pages';
import Link from 'next/link';

const page = pages[0];

export default function Home() {
  return (
    <>
      <StructuredData page={page} />
      <section className="hero home-hero">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span />{page.eyebrow}</p>
            <h1>让每一批库存，<em>先被准确判断</em></h1>
            <p className="hero-summary">{page.summary}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/assessment">开始库存评估 <span aria-hidden="true">↗</span></Link>
              <Link className="text-link" href="/process">先了解处理流程 <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="manifest-card" aria-label="库存初判资料卡">
            <div className="manifest-head"><span>STOCK / INTAKE</span><strong>库存初判单</strong><small>LCX · 001</small></div>
            <div className="manifest-status"><span />等待批次资料</div>
            <dl>
              <div><dt>品类 / CATEGORY</dt><dd>食品 · 饮料 · 酒水</dd></div>
              <div><dt>核验 / VERIFY</dt><dd>效期 · 温区 · 包装 · 来源</dd></div>
              <div><dt>结果 / OUTPUT</dt><dd>适配判断与书面边界</dd></div>
            </dl>
            <div className="manifest-stamp" aria-hidden="true">先核验<br />再承接</div>
          </div>
        </div>
        <div className="hero-trust"><span>适用对象</span><strong>食品品牌商</strong><strong>进口商</strong><strong>经销商</strong><small>具体批次以书面核验为准</small></div>
      </section>
      <div className="page-body home-body">
        <PageSections page={page} />
        <section className="page-cta">
          <span>有一批库存需要判断？</span>
          <h2>先整理资料，再开始合作沟通</h2>
          <p>三分钟生成一份完整的库存摘要。内容只在你的浏览器中处理，不会自动上传。</p>
          <Link className="button button-light" href={page.ctaHref}>{page.ctaLabel} <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
    </>
  );
}
