'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Upload } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Photo {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('midway_admin_token') : '';

  const fetchPhotos = async () => {
    const res = await fetch('/api/admin/photos');
    if (res.ok) setPhotos(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'hero');

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (uploadRes.ok) {
      const { url } = await uploadRes.json();
      const newPhoto: Photo = {
        id: `hero-${Date.now()}`,
        url,
        alt: file.name.replace(/\.[^/.]+$/, ''),
        order: photos.length,
      };

      await fetch('/api/admin/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPhoto),
      });

      fetchPhotos();
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await fetch(`/api/admin/photos?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPhotos();
  };

  const handleUpdateAlt = async (id: string, alt: string) => {
    await fetch('/api/admin/photos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, alt }),
    });
  };

  if (loading) return <div className="text-white/40">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Hero Photos</h1>
          <p className="text-white/40 text-sm">These rotate on the homepage. Upload high-quality images.</p>
        </div>
        <label className="admin-btn flex items-center gap-2 cursor-pointer">
          <Upload size={16} />
          {uploading ? 'Uploading...' : 'Upload Photo'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {photos.length === 0 ? (
        <div className="admin-card text-center py-16">
          <Plus size={48} className="text-white/10 mx-auto mb-4" />
          <p className="text-white/30">No photos yet. Upload your first hero image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos
            .sort((a, b) => a.order - b.order)
            .map((photo) => (
              <div key={photo.id} className="admin-card p-0 overflow-hidden group">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    fallbackText="Hero Photo"
                  />
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical size={14} className="text-white/60" />
                  </div>
                </div>
                <div className="p-3">
                  <input
                    type="text"
                    defaultValue={photo.alt}
                    onBlur={(e) => handleUpdateAlt(photo.id, e.target.value)}
                    className="w-full bg-transparent border-0 text-sm text-white/60 focus:text-white focus:outline-none"
                    placeholder="Photo description"
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
