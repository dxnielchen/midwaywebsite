'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Upload, GlassWater } from 'lucide-react';

interface Drink {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export default function AdminDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('midway_admin_token') : '';

  useEffect(() => {
    fetch('/api/admin/drinks')
      .then((res) => res.json())
      .then((data) => { setDrinks(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/drinks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(drinks),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateDrink = (id: string, field: string, value: string) => {
    setDrinks((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const addDrink = () => {
    setDrinks((prev) => [
      ...prev,
      {
        id: `drink-${Date.now()}`,
        name: 'New Drink',
        description: 'Description',
        price: '$0',
        category: 'Signature Cocktails',
        image: '',
      },
    ]);
  };

  const removeDrink = (id: string) => {
    if (!confirm('Remove this drink?')) return;
    setDrinks((prev) => prev.filter((d) => d.id !== id));
  };

  const handleImageUpload = async (drinkId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'drinks');

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      updateDrink(drinkId, 'image', url);
    }
  };

  // Get unique categories
  const categories = [...new Set(drinks.map((d) => d.category))];

  if (loading) return <div className="text-white/40">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Drink Menu</h1>
          <p className="text-white/40 text-sm">Edit drink names, descriptions, prices, and photos.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addDrink} className="admin-btn flex items-center gap-2 !bg-midway-gray border border-white/10 hover:!bg-midway-light">
            <Plus size={16} /> Add Drink
          </button>
          <button onClick={handleSave} className="admin-btn flex items-center gap-2" disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {drinks.map((drink) => (
          <div key={drink.id} className="admin-card">
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-midway-dark">
                {drink.image ? (
                  <img src={drink.image} alt={drink.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <GlassWater size={24} className="text-white/10" />
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Name</label>
                  <input
                    type="text"
                    value={drink.name}
                    onChange={(e) => updateDrink(drink.id, 'name', e.target.value)}
                    className="admin-input !py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Price</label>
                  <input
                    type="text"
                    value={drink.price}
                    onChange={(e) => updateDrink(drink.id, 'price', e.target.value)}
                    className="admin-input !py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Category</label>
                  <input
                    type="text"
                    value={drink.category}
                    onChange={(e) => updateDrink(drink.id, 'category', e.target.value)}
                    className="admin-input !py-2 text-sm"
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-1 px-3 py-2 rounded-lg bg-midway-dark border border-white/10 text-white/40 text-xs cursor-pointer hover:border-midway-accent/30 transition-all">
                    <Upload size={12} /> Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(drink.id, file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <button
                    onClick={() => removeDrink(drink.id)}
                    className="p-2 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="text-white/40 text-xs mb-1 block">Description</label>
                  <input
                    type="text"
                    value={drink.description}
                    onChange={(e) => updateDrink(drink.id, 'description', e.target.value)}
                    className="admin-input !py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
