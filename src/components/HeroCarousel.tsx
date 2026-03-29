'use client';

import { useState, useEffect, useCallback } from 'react';

interface Photo {
  id: string;
  url: string;
  alt: string;
}

interface HeroCarouselProps {
  photos: Photo[];
  autoPlayInterval?: number;
  height?: string;
}

export default function HeroCarousel({
  photos,
  autoPlayInterval = 5000,
  height = 'h-[100svh]',
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const hasPhotos = photos.length > 0;

  const next = useCallback(() => {
    if (!hasPhotos) return;
    setCurrent((prev) => (prev + 1) % photos.length);
  }, [hasPhotos, photos.length]);

  useEffect(() => {
    if (!hasPhotos || photos.length <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval, hasPhotos, photos.length]);

  return (
    <div className={`relative ${height} w-full overflow-hidden bg-gray-950`}>
      {hasPhotos ? (
        photos.map((photo, i) => (
          <div
            key={photo.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${photo.url})` }}
            />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 img-placeholder">
          <span className="text-white/15 text-sm font-body tracking-wide">Upload photos in admin</span>
        </div>
      )}

      {/* Stronger dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Dots */}
      {hasPhotos && photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-scarlet' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
