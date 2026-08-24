import type { PageDefinition } from '../content/pages';
import { company } from '../content/company';

export function StructuredData({ page }: { page: PageDefinition }) {
  const faqItems = page.sections.flatMap((section) => section.type === 'faq' ? section.items : []);
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Organization',
      '@id': '#organization',
      name: '北京隆昌行商贸有限公司',
      alternateName: '北京隆昌行',
      description: '面向食品品牌商、进口商和经销商的库存批次资料评估与合作对接。',
      identifier: company.licenseIdentifier,
      foundingDate: '2019-03-18',
      telephone: company.officialPhone,
      sameAs: [
        'https://www.yiyebang.com/index/contacts_detail/id/67995.html',
        'https://www.yiyebang.com/index/demand_detail/id/37977.html',
      ],
    },
    {
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      about: { '@id': '#organization' },
    },
  ];

  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }} />;
}
