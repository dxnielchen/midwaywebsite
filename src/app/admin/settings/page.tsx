'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface SiteConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
  social: { instagram: string; twitter: string; tiktok: string };
  bookingUrl: string;
  workFormUrl: string;
  ambassadorFormUrl: string;
  instagramEmbedUrl: string;
}

export default function AdminSettings() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('midway_admin_token') : '';

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => { setConfig(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: string, value: string) => {
    setConfig((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const updateSocial = (field: string, value: string) => {
    setConfig((prev) => prev ? { ...prev, social: { ...prev.social, [field]: value } } : prev);
  };

  const updateHours = (day: string, value: string) => {
    setConfig((prev) => prev ? { ...prev, hours: { ...prev.hours, [day]: value } } : prev);
  };

  if (loading || !config) return <div className="text-white/40">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Site Settings</h1>
          <p className="text-white/40 text-sm">Update contact info, links, and hours.</p>
        </div>
        <button onClick={handleSave} className="admin-btn flex items-center gap-2" disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="admin-card">
          <h3 className="font-display font-semibold mb-4">Basic Info</h3>
          <div className="space-y-4">
            {[
              { label: 'Bar Name', field: 'name', value: config.name },
              { label: 'Tagline', field: 'tagline', value: config.tagline },
              { label: 'Address', field: 'address', value: config.address },
              { label: 'Phone', field: 'phone', value: config.phone },
              { label: 'Email', field: 'email', value: config.email },
            ].map((item) => (
              <div key={item.field}>
                <label className="text-white/40 text-xs mb-1 block">{item.label}</label>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => update(item.field, e.target.value)}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="admin-card">
          <h3 className="font-display font-semibold mb-4">Links & URLs</h3>
          <div className="space-y-4">
            {[
              { label: 'Booking Platform URL', field: 'bookingUrl', value: config.bookingUrl },
              { label: 'Work Application Form URL', field: 'workFormUrl', value: config.workFormUrl },
              { label: 'Ambassador Form URL', field: 'ambassadorFormUrl', value: config.ambassadorFormUrl },
            ].map((item) => (
              <div key={item.field}>
                <label className="text-white/40 text-xs mb-1 block">{item.label}</label>
                <input
                  type="url"
                  value={item.value}
                  onChange={(e) => update(item.field, e.target.value)}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="admin-card">
          <h3 className="font-display font-semibold mb-4">Social Media</h3>
          <div className="space-y-4">
            {[
              { label: 'Instagram URL', field: 'instagram', value: config.social.instagram },
              { label: 'Twitter URL', field: 'twitter', value: config.social.twitter },
              { label: 'TikTok URL', field: 'tiktok', value: config.social.tiktok },
            ].map((item) => (
              <div key={item.field}>
                <label className="text-white/40 text-xs mb-1 block">{item.label}</label>
                <input
                  type="url"
                  value={item.value}
                  onChange={(e) => updateSocial(item.field, e.target.value)}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="admin-card">
          <h3 className="font-display font-semibold mb-4">Hours</h3>
          <div className="space-y-4">
            {Object.entries(config.hours).map(([day, hours]) => (
              <div key={day}>
                <label className="text-white/40 text-xs mb-1 block capitalize">{day}</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => updateHours(day, e.target.value)}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
