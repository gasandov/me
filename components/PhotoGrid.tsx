import type { Photo } from "@/lib/photos";

interface PhotoGridProps {
  photos: Photo[];
  noPhotos: string;
}

export function PhotoGrid({ photos, noPhotos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-(--color-muted) flex items-center justify-center text-3xl">
          📷
        </div>
        <p className="text-(--color-muted-foreground) text-sm">{noPhotos}</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.filename} className="break-inside-avoid mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl border border-(--color-border) transition-transform duration-300 hover:scale-[1.01]"
          />
        </div>
      ))}
    </div>
  );
}
