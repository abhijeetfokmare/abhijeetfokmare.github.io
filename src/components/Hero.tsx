import { useReveal } from '@/hooks/useReveal';
import type { PortfolioProfile } from '@/lib/supabase';
import { ArrowDown, Mail, MapPin, Phone, Globe } from 'lucide-react';

interface HeroProps {
  profile: PortfolioProfile;
  editMode: boolean;
  onEdit: () => void;
}

export function Hero({ profile, editMode, onEdit }: HeroProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-sky-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow-delayed" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl">
        {/* Avatar */}
        <div className={`mx-auto mb-8 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative w-36 h-36 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 animate-spin-slow" />
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-stone-900">
              {profile.avatar_url ? (
                <img src = "WhatsApp.jpeg" alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 text-4xl font-light">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className={`text-5xl md:text-7xl font-serif font-light tracking-tight text-stone-100 mb-4 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {profile.name}
        </h1>

        {/* Title */}
        <p className={`text-lg md:text-xl text-sky-400/90 font-light tracking-wide mb-3 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {profile.title}
        </p>

        {/* Tagline */}
        <p className={`text-stone-400 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {profile.tagline}
        </p>

        {/* Contact pills */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-sm text-stone-400 hover:text-sky-400 transition-colors duration-300">
              <Mail className="w-4 h-4" /> {profile.email}
            </a>
          )}
          {profile.location && (
            <span className="flex items-center gap-2 text-sm text-stone-400">
              <MapPin className="w-4 h-4" /> {profile.location}
            </span>
          )}
          {profile.phone && (
            <span className="flex items-center gap-2 text-sm text-stone-400">
              <Phone className="w-4 h-4" /> {profile.phone}
            </span>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-stone-400 hover:text-sky-400 transition-colors duration-300">
              <Globe className="w-4 h-4" /> {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        {/* CTA */}
        <div className={`flex items-center justify-center gap-4 transition-all duration-1000 delay-[900ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a href="#resume" className="px-8 py-3 rounded-full bg-sky-500 text-stone-950 text-sm font-medium hover:bg-sky-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/30">
            View Profile
          </a>
          <a href="#gallery" className="px-8 py-3 rounded-full border border-stone-700 text-stone-300 text-sm font-medium hover:border-sky-500 hover:text-sky-400 transition-all duration-300">
            View Gallery
          </a>
          {editMode && (
            <button onClick={onEdit} className="px-8 py-3 rounded-full bg-sky-500 text-stone-950 text-sm font-medium hover:bg-sky-400 transition-all duration-300 animate-pulse-once">
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-500 hover:text-sky-400 transition-colors duration-300 animate-bounce-slow">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
}
