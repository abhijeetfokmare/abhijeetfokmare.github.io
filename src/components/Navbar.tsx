import { useEffect, useState } from 'react';
import type { PortfolioProfile } from '@/lib/supabase';
import { Pencil, Eye } from 'lucide-react';

interface NavbarProps {
  profile: PortfolioProfile;
  editMode: boolean;
  onToggleEdit: () => void;
}

export function Navbar({ profile, editMode, onToggleEdit }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-serif text-lg font-light text-stone-100 tracking-wide hover:text-sky-400 transition-colors duration-300">
          {profile.name}
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#about" label="About" />
            <NavLink href="#resume" label="Profile" />
            <NavLink href="#gallery" label="Gallery" />
            <NavLink href="#contact" label="Contact" />
          </div>

          <button
            onClick={onToggleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              editMode
                ? 'bg-sky-500 text-stone-950 hover:bg-sky-400'
                : 'border border-stone-700 text-stone-300 hover:border-sky-500 hover:text-sky-400'
            }`}
          >
            {editMode ? <Eye className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
            {editMode ? 'Preview' : 'Edit Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-sm text-stone-400 hover:text-sky-400 transition-colors duration-300 font-light tracking-wide">
      {label}
    </a>
  );
}
