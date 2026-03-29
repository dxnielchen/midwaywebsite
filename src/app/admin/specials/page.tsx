'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Upload, Clock } from 'lucide-react';

interface SpecialPeriod {
  id: string;
  time: string;
  title: string;
  description: string;
  image: string;
}

interface DaySpecial {
  id: string;
  day: string;
  periods: SpecialPeriod[];
}

export default function AdminSpecials() {
  const [specials, setSpecials] = useState<DaySpecial[]>([]);
  const [activeDay, setActiveDay] = useState('wed');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('midway_admin_token') : '';

  useEffect(() => {
    fetch('/api/admin/specials')
      .then((res) => res.json())
      .then((data) => { setSpecials(data); setLoading(false); });
  }, []);

  const currentDay = specials.find((s) => s.id === activeDay);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/specials', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(specials),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePeriod = (dayId: string, periodId: string, field: string, value: string) => {
    setSpecials((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              periods: day.periods.map((p) =>
                p.id === periodId ? { ...p, [field]: value } : p
              ),
            }
          : day
      )
    );
  };

  const addPeriod = (dayId: string) => {
    setSpecials((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              periods: [
                ...day.periods,
                {
                  id: `${dayId}-${Date.now()}`,
                  time: '9PM - 11PM',
                  title: 'New Special',
                  description: 'Description here',
                  image: '',
                },
              ],
            }
          : day
      )
    );
  };

  const removePeriod = (dayId: string, periodId: string) => {
    if (!confirm('Remove this time period?')) return;
    setSpecials((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? { ...day, periods: day.periods.filter((p) => p.id !== periodId) }
          : day
      )
    );
  };

  const handleImageUpload = async (dayId: string, periodId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'specials');

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      updatePeriod(dayId, periodId, 'image', url);
    }
  };

  if (loading) return <div className="text-white/40">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Weekly Specials</h1>
          <p className="text-white/40 text-sm">Edit deals by day and time period.</p>
        </div>
        <button onClick={handleSave} className="admin-btn flex items-center gap-2" disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {specials.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold font-display transition-all ${
              activeDay === day.id
                ? 'bg-midway-accent text-white'
                : 'bg-midway-gray text-white/40 hover:text-white'
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Periods */}
      {currentDay && (
        <div className="space-y-6">
          {currentDay.periods.map((period) => (
            <div key={period.id} className="admin-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-midway-accent">
                  <Clock size={16} />
                  <span className="font-display font-semibold text-sm">Time Period</span>
                </div>
                <button
                  onClick={() => removePeriod(currentDay.id, period.id)}
                  className="admin-btn-danger !px-3 !py-1.5 text-xs flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Time Range</label>
                  <input
                    type="text"
                    value={period.time}
                    onChange={(e) => updatePeriod(currentDay.id, period.id, 'time', e.target.value)}
                    className="admin-input"
                    placeholder="e.g., 9PM - 11PM"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Title</label>
                  <input
                    type="text"
                    value={period.title}
                    onChange={(e) => updatePeriod(currentDay.id, period.id, 'title', e.target.value)}
                    className="admin-input"
                    placeholder="Special name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-white/40 text-xs mb-1 block">Description (deals)</label>
                  <textarea
                    value={period.description}
                    onChange={(e) => updatePeriod(currentDay.id, period.id, 'description', e.target.value)}
                    className="admin-input min-h-[80px] resize-y"
                    placeholder="e.g., $4 Wells | $3 Shots | $5 Margs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-white/40 text-xs mb-1 block">Image</label>
                  <div className="flex items-center gap-4">
                    {period.image && (
                      <img src={period.image} alt="" className="w-24 h-16 object-cover rounded-lg" />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-midway-dark border border-white/10 text-white/40 text-sm cursor-pointer hover:border-midway-accent/30 transition-all">
                      <Upload size={14} /> Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(currentDay.id, period.id, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => addPeriod(currentDay.id)}
            className="w-full admin-card flex items-center justify-center gap-2 text-white/30 hover:text-midway-accent py-8 border-dashed !border-white/10"
          >
            <Plus size={20} /> Add Time Period
          </button>
        </div>
      )}
    </div>
  );
}
