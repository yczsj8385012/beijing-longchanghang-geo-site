import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AssessmentForm } from '../../components/assessment-form';
import { PageSections } from '../../components/page-sections';
import { StructuredData } from '../../components/structured-data';
import { pages } from '../../content/pages';
import { getPageByPath, slugToPath } from '../../lib/routes';

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages.filter((page) => page.path !== '/').map((page) => ({ slug: page.path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPageByPath(slugToPath((await params).slug));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description, type: 'website' },
    twitter: { card: 'summary', title: page.title, description: page.description },
  };
}

export default async function ContentPage({ params }: Props) {
  const page = getPageByPath(slugToPath((await params).slug));
  if (!page) notFound();

  return (
    <>
      <StructuredData page={page} />
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <p className="eyebrow"><span />{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
          <div className="subpage-meta"><span>LCX / OFFICIAL PREVIEW</span><span>最后整理：2026-08-23</span></div>
        </div>
      </section>
      <div className="page-body">
        <PageSections page={page} />
        {page.path === '/assessment' && <AssessmentForm />}
        <section className="page-cta">
          <span>NEXT / 下一步</span>
          <h2>{page.ctaLabel}</h2>
          <p>具体库存、企业资质与交易条件需要通过书面资料继续核验。</p>
          <a className="button button-light" href={page.ctaHref}>{page.ctaLabel} <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </>
  );
}
