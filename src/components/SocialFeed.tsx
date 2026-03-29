'use client';

export default function SocialFeed() {
  return (
    <div className="bg-gray-900 border border-white/5 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          @midwayonhigh
        </h3>
        <a
          href="https://www.instagram.com/midwayonhigh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-scarlet hover:text-scarlet-light transition-colors"
        >
          Follow
        </a>
      </div>

      <div className="overflow-hidden">
        <iframe
          src="https://www.instagram.com/midwayonhigh/embed"
          className="w-full h-[480px] border-0"
          title="Midway Instagram"
          loading="lazy"
        />
      </div>
    </div>
  );
}
