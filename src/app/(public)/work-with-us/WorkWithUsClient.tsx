'use client';

import { ArrowRight } from 'lucide-react';

interface WorkWithUsClientProps {
  workFormUrl: string;
  ambassadorFormUrl: string;
}

export default function WorkWithUsClient({ workFormUrl, ambassadorFormUrl }: WorkWithUsClientProps) {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-gray-950 min-h-screen">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-scarlet-light text-sm uppercase tracking-[0.25em] mb-3 font-semibold">
            Join the Crew
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            Work With Us
          </h1>
          <div className="divider mx-auto mb-4" />
          <p className="text-white/50 text-base sm:text-lg max-w-md mx-auto">
            Midway is more than a bar. Ready to be part of it?
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {/* Work at Midway */}
          <div className="bg-gray-900 border border-white/5 p-6 sm:p-8 group hover:border-scarlet/20 transition-colors flex flex-col">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 group-hover:text-scarlet transition-colors">
              Work at Midway
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 flex-1">
              Bartenders, barbacks, security, promotions. If you bring the energy, we&apos;ve got the spot.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Bartending', 'Barback', 'Security', 'Promotions'].map((role) => (
                <span key={role} className="text-xs font-medium px-3 py-1.5 bg-gray-800 text-white/50 border border-white/5">
                  {role}
                </span>
              ))}
            </div>
            <a
              href={workFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight size={16} />
            </a>
          </div>

          {/* Ambassador */}
          <div className="bg-gray-900 border border-white/5 p-6 sm:p-8 group hover:border-scarlet/20 transition-colors flex flex-col">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 group-hover:text-scarlet transition-colors">
              Become an Ambassador
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 flex-1">
              Rep the brand, bring the crowd, get rewarded. Our ambassadors are the face of Midway on campus.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Free Entry', 'Perks', 'Events', 'Networking'].map((perk) => (
                <span key={perk} className="text-xs font-medium px-3 py-1.5 bg-gray-800 text-white/50 border border-white/5">
                  {perk}
                </span>
              ))}
            </div>
            <a
              href={ambassadorFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Join the Squad <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
