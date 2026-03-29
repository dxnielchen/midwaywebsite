'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">MIDWAY</h3>
            <p className="text-white/30 text-sm leading-relaxed">
              Columbus&apos; spot on High Street since 2012.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-5">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/specials', label: 'Specials' },
                { href: '/book-a-party', label: 'Book a Party' },
                { href: '/work-with-us', label: 'Work With Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/30 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-5">
              Visit
            </h4>
            <div className="text-white/30 text-sm space-y-3">
              <p>1728 N High St<br />Columbus, OH 43201</p>
              <p>Wed &ndash; Sat</p>
              <p>(614) 824-1397</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/midwayonhigh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-scarlet transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@midwayonhigh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-scarlet transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} Midway on High
          </p>
          <p className="text-white/15 text-xs">
            21+ to enter. Drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
