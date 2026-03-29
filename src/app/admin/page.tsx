'use client';

import Link from 'next/link';
import { Image, Sparkles, GlassWater, PartyPopper, Settings } from 'lucide-react';

const cards = [
  { href: '/admin/photos', icon: Image, title: 'Hero Photos', desc: 'Manage homepage carousel images.' },
  { href: '/admin/specials', icon: Sparkles, title: 'Weekly Specials', desc: 'Update daily deals and time periods.' },
  { href: '/admin/drinks', icon: GlassWater, title: 'Drink Menu', desc: 'Edit drinks, prices, and photos.' },
  { href: '/admin/party', icon: PartyPopper, title: 'Party Photos', desc: 'Manage Book a Party carousel.' },
  { href: '/admin/settings', icon: Settings, title: 'Site Settings', desc: 'Contact info, links, and hours.' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/35 text-sm">Manage your Midway website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="admin-card group">
            <card.icon size={22} className="text-scarlet mb-4" />
            <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-scarlet transition-colors">
              {card.title}
            </h3>
            <p className="text-white/30 text-sm">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
