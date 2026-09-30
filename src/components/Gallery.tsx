import { useMemo, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import type { PortfolioPhoto } from '@/lib/supabase';
import { Plus, X, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';

interface GalleryProps {
  photos: PortfolioPhoto[];
  editMode: boolean;
  onAddPhoto: () => void;
  onEditPhoto: (photo: PortfolioPhoto) => void;
  onDeletePhoto: (photo: PortfolioPhoto) => void;
}

export function Gallery({ photos, editMode, onAddPhoto, onEditPhoto, onDeletePhoto }: GalleryProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(photos.map((p) => p.category)));
    return ['All', ...cats];
  }, [photos]);

  const filtered = useMemo(() => {
    const sorted = [...photos].sort((a, b) => a.display_order - b.display_order);
    if (filter === 'All') return sorted;
    return sorted.filter((p) => p.category === filter);
  }, [photos, filter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="gallery" className="relative py-32 px-6 bg-stone-900 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sky-500/80 text-sm tracking-[0.3em] uppercase font-light">Portfolio</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-100 mt-3">
            Projects & Interests
          </h2>
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap items-center justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                filter === cat
                  ? 'bg-sky-500 text-stone-950'
                  : 'border border-stone-700 text-stone-400 hover:border-sky-500/50 hover:text-sky-400'
              }`}
            >
              {cat}
            </button>
          ))}
          {editMode && (
            <button
              onClick={onAddPhoto}
              className="px-5 py-2 rounded-full text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-300 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Photo
            </button>
          )}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((photo, index) => (
            <div
              key={photo.id}
              className={`group relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${Math.min(index * 80, 600)}ms` }}
              onClick={() => !editMode && openLightbox(index)}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-sky-400 text-xs tracking-widest uppercase">{photo.category}</span>
                <h3 className="text-stone-100 font-serif text-xl font-light mt-1">{photo.title}</h3>
                {photo.caption && <p className="text-stone-400 text-sm mt-1">{photo.caption}</p>}
              </div>

              {/* Edit mode controls */}
              {editMode && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEditPhoto(photo); }}
                    className="w-9 h-9 rounded-full bg-stone-950/80 backdrop-blur flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-stone-950 transition-all duration-300"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeletePhoto(photo); }}
                    className="w-9 h-9 rounded-full bg-stone-950/80 backdrop-blur flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            <p className="text-lg font-light">No photos yet. {editMode ? 'Click "Add Photo" to get started.' : ''}</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-stone-400 hover:text-sky-400 transition-colors duration-300" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-6 text-stone-400 hover:text-sky-400 transition-colors duration-300"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightboxIndex].image_url} alt={filtered[lightboxIndex].title} className="max-w-full max-h-[75vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <span className="text-sky-400 text-xs tracking-widest uppercase">{filtered[lightboxIndex].category}</span>
              <h3 className="text-stone-100 font-serif text-2xl font-light mt-1">{filtered[lightboxIndex].title}</h3>
              {filtered[lightboxIndex].caption && <p className="text-stone-400 text-sm mt-1">{filtered[lightboxIndex].caption}</p>}
            </div>
          </div>

          <button
            className="absolute right-6 text-stone-400 hover:text-sky-400 transition-colors duration-300"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
}
