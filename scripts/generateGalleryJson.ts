import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import exifReader from 'exif-reader';

const photoDirectory = path.join(process.cwd(), 'public/pho_output');
const outputJson = path.join(process.cwd(), 'public/gallery.json');

const photoFiles = fs.readdirSync(photoDirectory);
const photos = photoFiles
  .filter(file => /\.(jpg|jpeg)$/i.test(file))
  .map(file => {
    const filePath = path.join(photoDirectory, file);
    const fileBuffer = fs.readFileSync(filePath);
    let exifData = null;
    let dimensions = null;
    try {
      const result: any = exifReader(fileBuffer);
      if (result && result.tags) {
        const tags = result.tags;
        exifData = {
          model: tags.Model || 'N/A',
          focalLength: tags.FocalLength ? `${tags.FocalLength}mm` : 'N/A',
          fNumber: tags.FNumber ? `f/${tags.FNumber}` : 'N/A',
          exposureTime: tags.ExposureTime ? `1/${Math.round(1 / tags.ExposureTime)}s` : 'N/A',
          iso: tags.ISO || 'N/A',
        };
      }
      dimensions = sizeOf(fileBuffer);
    } catch (error) {
      // Ignore errors for files without EXIF data
    }
    return {
      src: `/Web_0626/pho_output/${file}`,
      width: dimensions?.width || 0,
      height: dimensions?.height || 0,
      exif: exifData,
    };
  });

fs.writeFileSync(outputJson, JSON.stringify(photos, null, 2), 'utf-8');
console.log(`gallery.json 生成成功，共${photos.length}张图片。`); 