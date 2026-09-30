import { useReveal } from '@/hooks/useReveal';
import type { PortfolioProfile } from '@/lib/supabase';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactProps {
  profile: PortfolioProfile;
}

export function Contact({ profile }: ContactProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const items = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phone ? `tel:${profile.phone}` : undefined },
    { icon: MapPin, label: 'Location', value: profile.location, href: undefined },
    { icon: Globe, label: 'Website', value: profile.website, href: profile.website || undefined },
  ].filter((i) => i.value);

  return (
    <section id="contact" className="relative py-32 px-6 bg-stone-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-sky-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sky-500/80 text-sm tracking-[0.3em] uppercase font-light">Get in Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-100 mt-3 mb-6">
            Let's Connect
          </h2>
          <p className="text-stone-400 text-lg font-light mb-12">
            Open to collaboration, learning opportunities, and hands-on projects.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {items.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center gap-4 p-5 rounded-xl border border-stone-800 hover:border-sky-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-stone-950 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-stone-500 tracking-widest uppercase">{item.label}</div>
                  <div className="text-stone-200 text-sm mt-0.5">{item.value}</div>
                </div>
              </div>
            );
            return item.href ? (
              <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">{content}</a>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className={`inline-block mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-stone-950 text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/20 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Send a Message
        </a>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center mt-24 pt-8 border-t border-stone-800/50">
        <p className="text-stone-500 text-sm font-light">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}
