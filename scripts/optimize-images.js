import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const WORK_DIR = new URL('../public/images/work/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MAX_WIDTH = 1280;
const QUALITY = 80;

const files = await readdir(WORK_DIR);
const pngs = files.filter((f) => extname(f).toLowerCase() === '.png');

for (const file of pngs) {
  const input = join(WORK_DIR, file);
  const output = join(WORK_DIR, `${basename(file, '.png')}.webp`);
  const before = (await stat(input)).size;

  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const after = (await stat(output)).size;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${file} -> ${basename(output)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (-${saved}%)`
  );
}
