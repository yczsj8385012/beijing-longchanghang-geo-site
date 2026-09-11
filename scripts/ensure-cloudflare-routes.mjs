import { readFile, writeFile } from 'node:fs/promises';

const configPath = 'dist/server/wrangler.json';
const config = JSON.parse(await readFile(configPath, 'utf8'));

config.routes = [
  { pattern: 'coglioo.com/*', zone_name: 'coglioo.com' },
  { pattern: 'www.coglioo.com/*', zone_name: 'coglioo.com' },
];

await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log('Cloudflare routes configured for coglioo.com and www.coglioo.com');
