import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import exifReader from 'exif-reader';
import nextConfig from '../../../../next.config.mjs';

const basePath = nextConfig.basePath || '';

export const revalidate = 3600;

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
          const parser = exifParser.create(fileBuffer);
          const result = parser.parse();
          const tags = result.tags;
          if (tags) {
            exifData = {
              focalLength: tags.FocalLength ? `${tags.FocalLength}mm` : null,
              fNumber: tags.FNumber ? `f/${tags.FNumber}` : null,
              exposureTime: tags.ExposureTime ? `1/${Math.round(1 / tags.ExposureTime)}s` : null,
              iso: tags.ISO || null,
              model: tags.Model || null,
            };
          }
          dimensions = sizeOf(fileBuffer);
        } catch (error) {
          // Ignore errors for files without EXIF data
        }
        return {
          src: `${basePath}/pho_output/${file}`,
          width: dimensions?.width,
          height: dimensions?.height,
          exif: exifData,
        };
      });
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: 'Could not read gallery directory' }, { status: 500 });
  }
} 