import Link from 'next/link';

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={compact ? 'brand brand--compact' : 'brand'}
      href="/"
      aria-label={compact ? '北京隆昌行首页（页脚）' : '北京隆昌行首页'}
    >
      <span className="brand-mark" aria-hidden="true">隆</span>
      <span className="brand-copy">
        <strong>北京隆昌行</strong>
        {!compact && <small>食品库存评估与合作对接</small>}
      </span>
    </Link>
  );
}
