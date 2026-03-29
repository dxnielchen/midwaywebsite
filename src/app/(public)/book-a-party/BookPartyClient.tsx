'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import type { PartyPhoto } from '@/lib/data';

interface BookPartyClientProps {
  photos: PartyPhoto[];
  bookingUrl: string;
}

const venueOptions = [
  'Midway - Full Venue',
  'Midway - Upstairs Only',
  'Ethyl & Tank - Full Venue',
  'Ethyl & Tank - Upstairs Only',
  'Block',
];

const eventTypes = [
  'Birthday Party', 'Graduation', 'Organization Event', 'Fundraiser',
  'Greek Life Event', 'Private Party', 'Corporate Event', 'Other',
];

export default function BookPartyClient({ photos, bookingUrl }: BookPartyClientProps) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', organization: '',
    eventType: '', eventDate: '', venue: '', headcount: '', description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (bookingUrl && bookingUrl !== '#') {
      window.open(bookingUrl, '_blank');
      setSubmitting(false);
      return;
    }

    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative">
        <HeroCarousel photos={photos} height="h-[50vh] sm:h-[55vh]" />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-over-image">
          <div className="px-5">
            <p className="text-white text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold">
              Private Events
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Book a Party
            </h1>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="section-padding max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-gray-900 border border-white/5 p-10 sm:p-12 text-center">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-2">Request Sent</h3>
              <p className="text-white/50 text-base">
                We&apos;ll reach out soon to confirm. Get ready.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                  Request a Booking
                </h2>
                <div className="divider mx-auto mb-3" />
                <p className="text-white/50 text-sm sm:text-base">We&apos;ll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-gray-900 border border-white/5 p-5 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => update('name', e.target.value)} className="admin-input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => update('email', e.target.value)} className="admin-input" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => update('phone', e.target.value)} className="admin-input" placeholder="(614) 555-0000" />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Organization</label>
                    <input type="text" value={formData.organization} onChange={(e) => update('organization', e.target.value)} className="admin-input" placeholder="Optional" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Event Type *</label>
                    <select required value={formData.eventType} onChange={(e) => update('eventType', e.target.value)} className="admin-input">
                      <option value="">Select...</option>
                      {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Event Date *</label>
                    <input type="date" required value={formData.eventDate} onChange={(e) => update('eventDate', e.target.value)} className="admin-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Venue *</label>
                    <select required value={formData.venue} onChange={(e) => update('venue', e.target.value)} className="admin-input">
                      <option value="">Select venue...</option>
                      {venueOptions.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Headcount *</label>
                    <input type="number" required min="1" value={formData.headcount} onChange={(e) => update('headcount', e.target.value)} className="admin-input" placeholder="# of guests" />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Details</label>
                  <textarea value={formData.description} onChange={(e) => update('description', e.target.value)} className="admin-input min-h-[90px] resize-y" placeholder="Special requests, etc." />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
                  {submitting ? 'Submitting...' : <><Send size={16} /> Submit Request</>}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
