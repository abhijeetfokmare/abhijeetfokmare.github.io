import { useReveal } from '@/hooks/useReveal';
import { Award, BrainCircuit, CheckCircle2, GraduationCap, Server, ShieldCheck } from 'lucide-react';

const skills = [
  'Ethical hacking',
  'Network auditing',
  'Tailscale',
  'Proton VPN',
  'Nmap',
  'Command-line AI',
  'Prompt engineering',
  'Claude Code',
  'Open Interpreter',
  'AnythingLLM',
  'Gemini Pro',
  'OpenRouter',
  'Self-hosting',
  'Server administration',
];

const academicResults = [
  { label: 'JEE Main 2026', value: '95.45 percentile', detail: 'CRL: 71,447' },
  { label: 'MHT CET 2026', value: '90.27 percentile', detail: '' },
  { label: 'Class 10', value: '90.5%', detail: '' },
];

export function ResumeSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="resume" className="relative py-32 px-6 bg-stone-900 overflow-hidden">
      <div className="absolute top-20 right-0 w-[32rem] h-[32rem] rounded-full bg-sky-500/5 blur-[120px]" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className={`mb-14 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sky-400 text-sm tracking-[0.3em] uppercase font-light">Profile</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-100 mt-3">A curious mind, built for systems</h2>
          <p className="text-stone-400 text-lg font-light mt-5 max-w-2xl leading-relaxed">
            Combining computer engineering fundamentals with a growing focus on cybersecurity, networking, AI tools, and practical systems work.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className={`rounded-3xl border border-stone-800 bg-stone-950/60 p-7 md:p-9 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 text-sky-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sky-400 text-xs uppercase tracking-widest">Education</span>
                <h3 className="text-stone-100 text-xl font-medium mt-1">B.Tech, Computer Engineering</h3>
                <p className="text-stone-400 text-sm mt-1">Pimpri Chinchwad College of Engineering · Maharashtra</p>
                <p className="text-stone-500 text-sm mt-1">Currently pursuing</p>
              </div>
            </div>

            <div className="border-t border-stone-800 pt-6">
              <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Academic performance</p>
              <div className="space-y-3">
                {academicResults.map((result) => (
                  <div key={result.label} className="flex items-center justify-between gap-4 rounded-xl bg-stone-900 px-4 py-3">
                    <span className="text-stone-300 text-sm">{result.label}</span>
                    <span className="text-right"><strong className="text-sky-400 text-sm font-medium">{result.value}</strong>{result.detail && <small className="block text-stone-500 text-xs mt-0.5">{result.detail}</small>}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-400/10 to-stone-950 p-7 md:p-9 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-400 text-stone-950 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sky-300 text-xs uppercase tracking-widest">Certification</span>
                <h3 className="text-stone-100 text-2xl font-serif font-light mt-1">Introduction to Cybersecurity</h3>
                <p className="text-stone-300 text-sm mt-2">Cisco Networking Academy</p>
                <div className="flex items-center gap-2 mt-5 text-sky-300 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Completed 13 July 2026
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-sky-400/15 text-stone-400 text-sm leading-relaxed">
              A foundation in cybersecurity concepts, online safety, threat awareness, and the role of secure networks in modern computing.
            </div>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 mt-6 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <FocusCard icon={ShieldCheck} title="Cybersecurity & Networking" text="Ethical hacking, network auditing, Nmap, VPNs, and secure network awareness." />
          <FocusCard icon={BrainCircuit} title="AI & Developer Tools" text="Command-line AI, prompt engineering, Claude Code, AnythingLLM, Gemini Pro, and OpenRouter." />
          <FocusCard icon={Server} title="Systems & Self-hosting" text="Self-hosting multiplayer servers, configuration, moderation, and plugin management." />
        </div>

        <div className={`mt-8 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Technical toolkit</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => <span key={skill} className="px-3.5 py-2 rounded-full border border-stone-700 bg-stone-950/50 text-stone-300 text-sm hover:border-sky-400/60 hover:text-sky-300 transition-colors duration-300">{skill}</span>)}
          </div>
        </div>

        <div className={`mt-10 rounded-2xl border border-stone-800 bg-stone-950/40 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-1000 delay-[900ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-stone-500 text-xs uppercase tracking-widest">Achievement</p>
            <p className="text-stone-200 mt-2">Shortlisted for and attended the 10+2 Technical Entry Scheme (TES-56) SSB interview at Selection Centre Central, Bhopal.</p>
          </div>
          <p className="text-stone-500 text-sm shrink-0">Interests: cycling · gardening · reading · UI customization · gaming</p>
        </div>
      </div>
    </section>
  );
}

function FocusCard({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-950/40 p-6 hover:border-sky-400/40 hover:-translate-y-1 transition-all duration-300">
      <Icon className="w-5 h-5 text-sky-400 mb-5" />
      <h3 className="text-stone-100 font-medium mb-2">{title}</h3>
      <p className="text-stone-400 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
