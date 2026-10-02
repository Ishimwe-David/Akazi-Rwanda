import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { ServicesOffersSection } from '../components/ServicesOffersSection';
import { 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  HeartHandshake, 
  Lightbulb, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Building2 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (route: string, params?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language } = useApp();
  const t = translations[language];

  const values = [
    {
      title: 'Trust (Icyizere)',
      desc: 'Trust is our product. Every advert is verified by real human moderators before it goes live. A fake job is worse than no job.',
      icon: ShieldCheck
    },
    {
      title: 'Equal Chance (Amahirwe Anagana)',
      desc: 'Job seekers never pay and never face paywalls to access livelihoods. Browsing and applying will always remain 100% free.',
      icon: Scale
    },
    {
      title: 'Simplicity (Ukwiyoroshya)',
      desc: 'Three taps to anything: search, view, apply. We intentionally eliminate bureaucratic friction and unnecessary steps.',
      icon: Sparkles
    },
    {
      title: 'Support (Ubufatanye)',
      desc: 'We support Rwandan employers in finding genuine talent and assist youth with free CV guidance and career advice.',
      icon: HeartHandshake
    },
    {
      title: 'Innovation (Udushya)',
      desc: 'Rooted in Kigali and aligned with Rwanda’s Vision 2050, we build lightweight, mobile-first digital employment infrastructure.',
      icon: Lightbulb
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero statement */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          About Akazi.com
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Work. Hire Talent. Grow.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Akazi does one thing: it puts the right person in front of the right opportunity, with no friction. Headquartered in Kigali, Rwanda.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Our Mission
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Frictionless Connection to Livelihoods
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide every Rwandan professional, student, and vocational graduate an equal, cost-free gateway to verified employment, while empowering employers with rapid, trustworthy talent acquisition tools.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Our Vision
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Rwanda's National Employment Standard
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To become the most respected and dependable marketplace for work, internships, tenders, and books across the Land of a Thousand Hills, setting an uncompromised standard for transparency and trust.
          </p>
        </div>
      </div>

      {/* 5 Core Values */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">
            Our 5 Core Values
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            The non-negotiable principles guiding every line of code, policy, and decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us: 4 Audience Blocks */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">
            Why Choose Akazi?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tailored specifically for each member of Rwanda's economic ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-xs text-slate-900">For Job Seekers</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              100% free forever. No application fees, no fake vacancies, instant one-click applications.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Building2 className="w-5 h-5 text-slate-900" />
            <h4 className="font-bold text-xs text-slate-900">For Employers</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent RWF pricing, Mobile Money checkout, RDB verified badges, and applicant shortlisting.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-xs text-slate-900">For Students & TVET</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated internship strips, practical industrial apprenticeships, and university transitions.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-xs text-slate-900">For Authors</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Homepage Book of the Week visibility, connecting Rwandan writers directly to reader WhatsApp lines.
            </p>
          </div>
        </div>
      </div>

      {/* Services & What Akazi Offers */}
      <ServicesOffersSection onNavigate={onNavigate || (() => {})} />

      {/* Official Contact Info Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-4">
        <h3 className="text-lg font-bold">
          Akazi.com Rwanda Headquarters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Physical Location</div>
              <div>KN 5 Rd, Centenary House & Kigali Heights, Kigali, Rwanda</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Direct Line & WhatsApp</div>
              <div className="font-mono tabular-nums">+250 788 785 514</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Official Correspondence</div>
              <div>info@akazi.com · akazi.rw@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
