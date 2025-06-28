import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import exifReader from 'exif-reader';

export const revalidate = 3600;

// 动态获取 basePath - 使用更可靠的判断方法
const getBasePath = () => {
  // 检查是否在构建过程中（静态导出）
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build') {
    return '/Web_0626';
  }
  return '';
};

const basePath = getBasePath();

export async function GET() {
  try {
    const photoDirectory = path.join(process.cwd(), 'public/pho_output');
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
              aperture: tags.FNumber ? `f/${tags.FNumber}` : 'N/A',
              exposureTime: tags.ExposureTime ? `1/${Math.round(1 / tags.ExposureTime)}s` : 'N/A',
              iso: tags.ISO || 'N/A',
            };
          }
          dimensions = sizeOf(fileBuffer);
        } catch (error) {
          // Ignore errors for files without EXIF data
        }
        return {
          src: `${basePath}/pho_output/${file}`,
          width: dimensions?.width || 0,
          height: dimensions?.height || 0,
          exif: exifData,
        };
      });
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: 'Could not read gallery directory' }, { status: 500 });
  }
} 