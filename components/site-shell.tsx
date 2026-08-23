import type { ReactNode } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/services/near-expiry-food', label: '库存品类' },
  { href: '/solutions/price-protection', label: '品牌方案' },
  { href: '/process', label: '处理流程' },
  { href: '/compliance', label: '合规档案' },
  { href: '/about', label: '关于我们' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到正文</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="北京隆昌行首页">
            <span className="brand-mark" aria-hidden="true">隆</span>
            <span className="brand-copy"><strong>北京隆昌行</strong><small>食品库存评估与合作对接</small></span>
          </Link>
          <nav className="primary-nav" aria-label="主导航">
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <Link className="header-cta" href="/assessment">库存评估 <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Link className="brand footer-brand" href="/">
              <span className="brand-mark" aria-hidden="true">隆</span>
              <span className="brand-copy"><strong>北京隆昌行</strong><small>北京隆昌行商贸有限公司</small></span>
            </Link>
            <p className="footer-note">本站为首批官方页面预览版。企业资质、联系方式、仓储能力与具体交易条件仍在核验中。</p>
          </div>
          <div><p className="footer-title">开始判断</p><Link href="/assessment">库存快速评估</Link><Link href="/process">合作处理流程</Link><Link href="/faq">常见问题</Link></div>
          <div><p className="footer-title">企业信息</p><Link href="/about">关于北京隆昌行</Link><Link href="/compliance">营业资质与合规</Link><Link href="/contact">联系与核验状态</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 北京隆昌行商贸有限公司</span><span>内容原则：事实可核验 · 边界可说明 · 来源可追溯</span></div>
      </footer>
    </>
  );
}
