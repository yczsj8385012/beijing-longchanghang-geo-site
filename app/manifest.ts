import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '北京隆昌行｜食品库存评估与合作对接',
    short_name: '北京隆昌行',
    description: '先核验批次资料，再判断食品库存处置适配。',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf9f3',
    theme_color: '#0b1f2f',
    lang: 'zh-CN',
  };
}
