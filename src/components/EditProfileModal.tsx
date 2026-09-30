import { useEffect, useState } from 'react';
import type { PortfolioProfile } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { X, Save, Loader2 } from 'lucide-react';

interface EditProfileModalProps {
  profile: PortfolioProfile;
  onClose: () => void;
  onSave: (updated: PortfolioProfile) => void;
}

export function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  const [form, setForm] = useState<PortfolioProfile>(profile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleChange = (field: keyof PortfolioProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { data, error } = await supabase
      .from('portfolio_profile')
      .update({
        name: form.name,
        title: form.title,
        tagline: form.tagline,
        bio: form.bio,
        email: form.email,
        phone: form.phone,
        location: form.location,
        website: form.website,
        avatar_url: form.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', form.id)
      .select()
      .single();

    if (error) {
      setSaving(false);
      alert('Failed to save. Please try again.');
      return;
    }
    onSave(data as PortfolioProfile);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-light text-stone-100">Edit Your Details</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-sky-400 transition-colors duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5">
          <Field label="Name" value={form.name} onChange={(v) => handleChange('name', v)} />
          <Field label="Title" value={form.title} onChange={(v) => handleChange('title', v)} />
          <Field label="Tagline" value={form.tagline} onChange={(v) => handleChange('tagline', v)} />
          <Field label="Avatar URL" value={form.avatar_url} onChange={(v) => handleChange('avatar_url', v)} placeholder="Paste an image URL" />

          {form.avatar_url && (
            <div className="flex justify-center">
              <img src={form.avatar_url} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-stone-700" />
            </div>
          )}

          <div>
            <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={5}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" value={form.email} onChange={(v) => handleChange('email', v)} />
            <Field label="Phone" value={form.phone} onChange={(v) => handleChange('phone', v)} />
            <Field label="Location" value={form.location} onChange={(v) => handleChange('location', v)} />
            <Field label="Website" value={form.website} onChange={(v) => handleChange('website', v)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2.5 rounded-full text-sm text-stone-400 hover:text-stone-200 transition-colors duration-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-2.5 rounded-full bg-sky-500 text-stone-950 text-sm font-medium hover:bg-sky-400 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 text-sm focus:border-sky-500 focus:outline-none transition-colors duration-300"
      />
    </div>
  );
}
