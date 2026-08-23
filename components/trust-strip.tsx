const trustItems = [
  { label: '判断维度', value: '效期 · 温区 · 包装 · 来源' },
  { label: '常温品类', value: '临期食品（按具体批次判断）' },
  { label: '冷链品类', value: '冷冻食品 · 海鲜' },
  { label: '合作原则', value: '先核验批次资料，再判断适配' },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="库存合作判断摘要">
      <dl className="trust-strip__inner">
        {trustItems.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
