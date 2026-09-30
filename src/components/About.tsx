import { useReveal } from '@/hooks/useReveal';
import type { PortfolioProfile } from '@/lib/supabase';

interface AboutProps {
  profile: PortfolioProfile;
}

export function About({ profile }: AboutProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-32 px-6 bg-stone-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sky-500/80 text-sm tracking-[0.3em] uppercase font-light">About</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-100 mt-3 mb-8">
            About Me
          </h2>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative pl-8 border-l border-stone-800">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-sky-500 shadow-lg shadow-sky-500/50" />
            <p className="text-stone-300 text-lg leading-relaxed font-light whitespace-pre-wrap">
              {profile.bio}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Stat label="JEE Percentile" value="95.45" />
            <Stat label="CET Percentile" value="90.27" />
            <Stat label="Certifications" value="1" />
            <Stat label="SSB Interview" value="TES-56" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center group">
      <div className="text-4xl font-serif font-light text-sky-400 mb-1 group-hover:scale-110 transition-transform duration-300">
        {value}
      </div>
      <div className="text-xs text-stone-500 tracking-widest uppercase">{label}</div>
    </div>
  );
}
