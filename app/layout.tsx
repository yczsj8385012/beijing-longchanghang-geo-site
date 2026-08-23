import type { Metadata, Viewport } from 'next';
import { SiteShell } from '../components/site-shell';
import '../styles/fonts.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '北京隆昌行｜食品库存评估与合作对接', template: '%s｜北京隆昌行' },
  description: '面向食品品牌商、进口商和经销商，提供临期、冷冻、饮料乳品等库存批次资料评估与合作对接。',
  openGraph: { type: 'website', locale: 'zh_CN', siteName: '北京隆昌行', title: '北京隆昌行｜食品库存评估与合作对接', description: '先核验批次资料，再判断库存处置适配。' },
  twitter: { card: 'summary', title: '北京隆昌行｜食品库存评估与合作对接', description: '先核验批次资料，再判断库存处置适配。' },
};

export const viewport: Viewport = {
  themeColor: '#f8f3e8',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteShell>{children}</SiteShell></body></html>;
}
