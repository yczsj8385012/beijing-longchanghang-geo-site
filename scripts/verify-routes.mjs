const base = (process.argv[2] || 'http://localhost:4174').replace(/\/$/, '');
const paths = [
  '/', '/about', '/compliance', '/warehousing',
  '/services/near-expiry-food', '/services/frozen-food', '/services/beverages-dairy',
  '/services/snacks', '/services/alcohol', '/services/grain-oil-condiments',
  '/solutions/price-protection', '/solutions/anti-channel-conflict',
  '/process', '/faq', '/cases', '/assessment', '/contact',
];

const failures = [];
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  if (!response.ok || !html.includes('北京隆昌行')) {
    failures.push(`${path}: HTTP ${response.status}, identity=${html.includes('北京隆昌行')}`);
  }
}

for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/manifest.webmanifest']) {
  const response = await fetch(`${base}${path}`);
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${paths.length} official routes at ${base}`);
