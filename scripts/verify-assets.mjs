import { stat } from 'node:fs/promises';
import sharp from 'sharp';

const assets = [
  'public/images/theme/food-inventory-hero.webp',
  'public/images/theme/frozen-food-theme.webp',
  'public/images/theme/beverages-snacks-theme.webp',
];
const maxBytes = 500 * 1024;
const minWidth = 1200;

for (const asset of assets) {
  const [file, metadata] = await Promise.all([stat(asset), sharp(asset).metadata()]);

  if (file.size > maxBytes) {
    throw new Error(`${asset} exceeds the 500KB limit (${file.size} bytes).`);
  }
  if (!metadata.width || metadata.width < minWidth) {
    throw new Error(`${asset} is narrower than ${minWidth}px (${metadata.width ?? 0}px).`);
  }

  console.log(`${asset}: ${metadata.width}px, ${file.size} bytes`);
}
