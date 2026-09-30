import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { PortfolioProfile, PortfolioPhoto } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ResumeSection } from '@/components/ResumeSection';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { EditProfileModal } from '@/components/EditProfileModal';
import { EditPhotoModal } from '@/components/EditPhotoModal';
import type { PortfolioPhoto as PhotoType } from '@/lib/supabase';
import { Loader2, UserCog } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoType | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const fetchData = useCallback(async () => {
    const [profileRes, photosRes] = await Promise.all([
      supabase.from('portfolio_profile').select('*').maybeSingle(),
      supabase.from('portfolio_photos').select('*').order('display_order', { ascending: true }),
    ]);

    if (profileRes.data) setProfile(profileRes.data as PortfolioProfile);
    if (photosRes.data) setPhotos(photosRes.data as PortfolioPhoto[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePhoto = async (photo: PortfolioPhoto) => {
    if (!confirm(`Delete "${photo.title || 'this photo'}"?`)) return;
    const { error } = await supabase.from('portfolio_photos').delete().eq('id', photo.id);
    if (error) {
      alert('Failed to delete. Please try again.');
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">
        <p>Something went wrong loading your portfolio. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar profile={profile} editMode={editMode} onToggleEdit={() => setEditMode((prev) => !prev)} />

      <Hero profile={profile} editMode={editMode} onEdit={() => setShowEditProfile(true)} />

      <About profile={profile} />

      <ResumeSection />

      <Gallery
        photos={photos}
        editMode={editMode}
        onAddPhoto={() => { setEditingPhoto(null); setShowPhotoModal(true); }}
        onEditPhoto={(photo) => { setEditingPhoto(photo); setShowPhotoModal(true); }}
        onDeletePhoto={handleDeletePhoto}
      />

      <Contact profile={profile} />

      {showEditProfile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditProfile(false)}
          onSave={(updated) => setProfile(updated)}
        />
      )}

      {showPhotoModal && (
        <EditPhotoModal
          photo={editingPhoto}
          onClose={() => setShowPhotoModal(false)}
          onSave={fetchData}
        />
      )}

      {/* Floating edit profile button - always visible in edit mode */}
      {editMode && (
        <button
          onClick={() => setShowEditProfile(true)}
          className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full bg-sky-500 text-stone-950 text-sm font-medium shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <UserCog className="w-4 h-4" />
          Edit Profile
        </button>
      )}
    </div>
  );
}
