import fs from 'fs';
import path from 'path';

const photoDirectory = path.join(process.cwd(), 'public/pho_output');
const outputJson = path.join(process.cwd(), 'public/gallery.json');

const photoFiles = fs.readdirSync(photoDirectory);
const photos = photoFiles
  .filter(file => /\.(jpg|jpeg)$/i.test(file))
  .map(file => ({
    src: `/Web_0626/pho_output/${file}`,
    // 可扩展EXIF等参数
  }));

fs.writeFileSync(outputJson, JSON.stringify(photos, null, 2), 'utf-8');
console.log(`gallery.json 生成成功，共${photos.length}张图片。`); 