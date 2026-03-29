'use client';

import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import ImageWithFallback from '@/components/ImageWithFallback';
import type { DaySpecial, Drink } from '@/lib/data';

interface SpecialsClientProps {
  specials: DaySpecial[];
  drinks: Drink[];
}

export default function SpecialsClient({ specials, drinks }: SpecialsClientProps) {
  const [activeDay, setActiveDay] = useState(specials[0]?.id || 'wed');
  const [activeSection, setActiveSection] = useState<'specials' | 'drinks'>('specials');

  const currentDay = specials.find((s) => s.id === activeDay);

  const categories = drinks.reduce<Record<string, Drink[]>>((acc, drink) => {
    if (!acc[drink.category]) acc[drink.category] = [];
    acc[drink.category].push(drink);
    return acc;
  }, {});

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-gray-950 min-h-screen">
      <div className="section-padding">
        <SectionHeader
          title="Specials & Menu"
          subtitle="Deals every night we're open. Check what's on."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-white/15">
            <button
              onClick={() => setActiveSection('specials')}
              className={`px-5 sm:px-7 py-3 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold transition-all ${
                activeSection === 'specials'
                  ? 'bg-scarlet text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              Weekly Specials
            </button>
            <button
              onClick={() => setActiveSection('drinks')}
              className={`px-5 sm:px-7 py-3 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold transition-all ${
                activeSection === 'drinks'
                  ? 'bg-scarlet text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              Drink Menu
            </button>
          </div>
        </div>

        {activeSection === 'specials' ? (
          <div>
            {/* Day Tabs */}
            <div className="flex justify-center mb-10 overflow-x-auto">
              <div className="inline-flex gap-1 flex-nowrap">
                {specials.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm uppercase tracking-[0.1em] font-semibold transition-all whitespace-nowrap ${
                      activeDay === day.id
                        ? 'bg-scarlet text-white'
                        : 'bg-gray-900 text-white/40 hover:text-white border border-white/5'
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Periods */}
            {currentDay && (
              <div className={`grid gap-5 max-w-4xl mx-auto ${
                currentDay.periods.length === 1 ? 'grid-cols-1 max-w-lg' : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {currentDay.periods.map((period) => (
                  <div
                    key={period.id}
                    className="bg-gray-900 border border-white/5 overflow-hidden"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <ImageWithFallback
                        src={period.image}
                        alt={period.title}
                        className="w-full h-full object-cover"
                        fallbackText={period.title}
                      />
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="absolute bottom-3 left-4 text-over-image">
                        <span className="text-sm text-white font-semibold tracking-wide">{period.time}</span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-white">{period.title}</h3>
                      <p className="text-white/60 text-sm sm:text-base leading-relaxed">{period.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {Object.entries(categories).map(([category, categoryDrinks]) => (
              <div key={category} className="mb-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{category}</h3>
                <div className="divider mb-5" />

                <div className="space-y-0">
                  {categoryDrinks.map((drink) => (
                    <div
                      key={drink.id}
                      className="flex items-start sm:items-center justify-between py-3.5 border-b border-white/5 group"
                    >
                      <div className="flex-1 mr-4">
                        <div className="flex items-baseline gap-2 flex-wrap sm:flex-nowrap">
                          <span className="text-white font-semibold text-sm sm:text-base group-hover:text-scarlet transition-colors">
                            {drink.name}
                          </span>
                          <span className="hidden sm:block flex-1 border-b border-dotted border-white/15 min-w-[20px]" />
                          <span className="text-scarlet-light font-bold text-sm sm:text-base">{drink.price}</span>
                        </div>
                        {drink.description && (
                          <p className="text-white/45 text-xs sm:text-sm mt-1">{drink.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
