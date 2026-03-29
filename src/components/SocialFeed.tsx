'use client';

import { Instagram, ArrowRight } from 'lucide-react';

export default function SocialFeed() {
  return (
    <div className="bg-gray-900 border border-white/5 p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-5">
        <Instagram size={20} className="text-scarlet" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
          @midwayonhigh
        </h3>
      </div>

      <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
        Follow us for one-off specials, event announcements, game day updates, and more. Everything happens on the gram first.
      </p>

      <a
        href="https://www.instagram.com/midwayonhigh"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center justify-center gap-2 w-full"
      >
        Follow on Instagram <ArrowRight size={16} />
      </a>
    </div>
  );
}
