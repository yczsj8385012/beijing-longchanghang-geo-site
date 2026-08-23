import Link from 'next/link';
import { CategoryCards } from '../components/category-cards';
import { HomeHero } from '../components/home-hero';
import { PageSections } from '../components/page-sections';
import { StructuredData } from '../components/structured-data';
import { TrustStrip } from '../components/trust-strip';
import { pages } from '../content/pages';

const page = pages[0];
const categorySection = page.sections.find((section) => section.type === 'links');
const remainingPage = {
  ...page,
  sections: page.sections.filter((section) => section !== categorySection),
};

export default function Home() {
  return (
    <>
      <StructuredData page={page} />
      <HomeHero page={page} />
      <TrustStrip />
      {categorySection && <CategoryCards section={categorySection} />}
      <div className="page-body home-body">
        <PageSections page={remainingPage} />
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
