'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import SocialFeed from '@/components/SocialFeed';
import type { HeroPhoto, SiteConfig } from '@/lib/data';

interface HomeClientProps {
  photos: HeroPhoto[];
  config: SiteConfig;
}

export default function HomeClient({ photos, config }: HomeClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <HeroCarousel photos={photos} />

        <div className="absolute inset-0 z-20 flex items-end pb-20 sm:pb-28 lg:pb-32">
          <div className="section-padding w-full text-over-image">
            <p className="text-white text-sm sm:text-base uppercase tracking-[0.25em] mb-3 font-semibold">
              <span className="text-scarlet-light">1728 N High St</span> &middot; Columbus, OH
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[0.9]">
              MIDWAY
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              The spot on High Street. Strong drinks, great DJs, unforgettable nights.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/specials" className="btn-primary">
                View Specials
              </Link>
              <Link href="/book-a-party" className="btn-outline">
                Book a Party
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-scarlet">
        <div className="section-padding py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 text-sm sm:text-base text-white font-medium">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>1728 N High St, Columbus</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Wed &ndash; Sat &middot; Open till 2AM</span>
          </div>
          <a
            href="https://www.instagram.com/midwayonhigh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            @midwayonhigh
          </a>
        </div>
      </section>

      {/* Quick Links + Social */}
      <section className="py-16 sm:py-20 bg-gray-950">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Left: Quick links */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                  What&apos;s Going On
                </h2>
                <div className="divider" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Specials',
                    desc: 'Deals every night, Wed through Sat.',
                    href: '/specials',
                  },
                  {
                    title: 'Book a Party',
                    desc: 'Birthdays, orgs, celebrations.',
                    href: '/book-a-party',
                  },
                  {
                    title: 'Join the Team',
                    desc: 'Work with us or be an ambassador.',
                    href: '/work-with-us',
                  },
                ].map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="block bg-gray-900 border border-white/5 p-6 hover:border-scarlet/30 transition-colors group"
                  >
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-scarlet transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Social Feed */}
            <div className="lg:col-span-2">
              <SocialFeed />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
