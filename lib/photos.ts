import fs from "fs";
import path from "path";

export interface Photo {
  src: string;
  alt: string;
  filename: string;
}

const PHOTOS_DIR = path.join(process.cwd(), "public/images/photos");

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
    .sort()
    .map((filename) => ({
      filename,
      src: `/images/photos/${filename}`,
      alt: filename
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
}
