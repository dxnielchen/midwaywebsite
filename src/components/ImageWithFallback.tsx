'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackText = 'Photo',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`img-placeholder ${className}`}>
        <span className="text-white/20 text-sm">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
