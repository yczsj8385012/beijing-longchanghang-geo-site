export type ThemeVisual = {
  src: string;
  alt: string;
  kind: 'concept' | 'verified-photo';
  disclosure: '主题视觉示意' | '企业实拍';
  objectPosition: string;
};

export const themeVisuals = {
  inventory: {
    src: '/images/theme/food-inventory-hero.webp',
    alt: '食品包装与库存分类主题视觉',
    kind: 'concept',
    disclosure: '主题视觉示意',
    objectPosition: '58% center',
  },
  frozen: {
    src: '/images/theme/frozen-food-theme.webp',
    alt: '冷冻食品与冷链资料主题视觉',
    kind: 'concept',
    disclosure: '主题视觉示意',
    objectPosition: '55% center',
  },
  beverages: {
    src: '/images/theme/beverages-snacks-theme.webp',
    alt: '饮料乳品与休闲食品主题视觉',
    kind: 'concept',
    disclosure: '主题视觉示意',
    objectPosition: '55% center',
  },
} satisfies Record<string, ThemeVisual>;

export function getVisualForPath(path: string): ThemeVisual {
  if (path === '/services/frozen-food') return themeVisuals.frozen;
  if (['/services/beverages-dairy', '/services/snacks'].includes(path)) {
    return themeVisuals.beverages;
  }
  return themeVisuals.inventory;
}
