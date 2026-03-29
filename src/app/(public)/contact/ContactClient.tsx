'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { SiteConfig } from '@/lib/data';

interface ContactClientProps {
  config: SiteConfig;
}

export default function ContactClient({ config }: ContactClientProps) {
  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-gray-950 min-h-screen">
      <div className="section-padding">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
            Contact
          </h1>
          <div className="divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Info */}
          <div className="bg-gray-900 border border-white/5 p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-scarlet mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-0.5">Address</h3>
                <p className="text-white/50 text-sm sm:text-base">{config.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={20} className="text-scarlet mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-0.5">Phone</h3>
                <a href={`tel:${config.phone}`} className="text-white/50 text-sm sm:text-base hover:text-white transition-colors">
                  {config.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail size={20} className="text-scarlet mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-0.5">Email</h3>
                <a href={`mailto:${config.email}`} className="text-white/50 text-sm sm:text-base hover:text-white transition-colors">
                  {config.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock size={20} className="text-scarlet mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-0.5">Hours</h3>
                <div className="text-white/50 text-sm sm:text-base space-y-1.5">
                  {Object.entries(config.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between gap-6">
                      <span className="capitalize text-white/60 font-medium">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex gap-6">
                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-white/40 text-sm sm:text-base font-medium hover:text-scarlet transition-colors">Instagram</a>
                <a href={config.social.tiktok} target="_blank" rel="noopener noreferrer"
                  className="text-white/40 text-sm sm:text-base font-medium hover:text-scarlet transition-colors">TikTok</a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-900 border border-white/5 overflow-hidden min-h-[350px] sm:min-h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.3!2d-83.0068!3d39.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388e8f26c6e0d1%3A0x1f6b6e5b4f5e1c1a!2s1728%20N%20High%20St%2C%20Columbus%2C%20OH%2043210!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)', minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              title="Midway Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
