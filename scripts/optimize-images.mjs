import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const jobs = [
  ['assets/source/food-inventory-hero.png', 'public/images/theme/food-inventory-hero.webp'],
  ['assets/source/frozen-food-theme.png', 'public/images/theme/frozen-food-theme.webp'],
  ['assets/source/beverages-snacks-theme.png', 'public/images/theme/beverages-snacks-theme.webp'],
];

await mkdir('public/images/theme', { recursive: true });
for (const [input, output] of jobs) {
  await sharp(input)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
}
