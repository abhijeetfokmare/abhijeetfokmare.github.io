import { useEffect, useState } from 'react';
import type { PortfolioPhoto } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { X, Save, Loader2 } from 'lucide-react';

interface EditPhotoModalProps {
  photo: PortfolioPhoto | null;
  onClose: () => void;
  onSave: () => void;
}

export function EditPhotoModal({ photo, onClose, onSave }: EditPhotoModalProps) {
  const isEditing = !!photo;
  const [form, setForm] = useState({
    image_url: photo?.image_url ?? '',
    title: photo?.title ?? '',
    caption: photo?.caption ?? '',
    category: photo?.category ?? 'General',
    display_order: photo?.display_order ?? 0,
  id: photo?.id ?? '',
  created_at: photo?.created_at ?? '',
  updated_at: '',
  created_by: null as string | null,
  created_by_name: '',
    created_by_avatar: '',
    created_by_email: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.image_url) return;
    setSaving(true);

    if (isEditing) {
      const { error } = await supabase
        .from('portfolio_photos')
        .update({
          image_url: form.image_url,
          title: form.title,
          caption: form.caption,
          category: form.category,
          display_order: form.display_order,
        })
        .eq('id', form.id);
      if (error) {
        setSaving(false);
        alert('Failed to save. Please try again.');
        return;
      }
    } else {
      const { error } = await supabase
        .from('portfolio_photos')
        .insert({
          image_url: form.image_url,
          title: form.title,
          caption: form.caption,
          category: form.category,
          display_order: form.display_order || 0,
        });
      if (error) {
        setSaving(false);
        alert('Failed to add photo. Please try again.');
        return;
      }
    }

    setSaving(false);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-light text-stone-100">
            {isEditing ? 'Edit Photo' : 'Add New Photo'}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-sky-400 transition-colors duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Image URL</label>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="Paste an image URL"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
            />
          </div>

          {form.image_url && (
            <div className="flex justify-center">
              <img src={form.image_url} alt="Preview" className="max-h-48 rounded-xl border border-stone-700" />
            </div>
          )}

          <div>
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Photo title"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Caption</label>
            <input
              type="text"
              value={form.caption}
              onChange={(e) => handleChange('caption', e.target.value)}
              placeholder="Short description"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="e.g. Cybersecurity"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2.5 rounded-full text-sm text-stone-400 hover:text-stone-200 transition-colors duration-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.image_url}
            className="px-8 py-2.5 rounded-full bg-sky-500 text-stone-950 text-sm font-medium hover:bg-sky-400 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Photo'}
          </button>
        </div>
      </div>
    </div>
  );
}
