import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  Zap, 
  UserCheck, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Megaphone, 
  BookOpen, 
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ServicesOffersSectionProps {
  onNavigate: (route: string, params?: any) => void;
  className?: string;
  showHeading?: boolean;
}

export const ServicesOffersSection: React.FC<ServicesOffersSectionProps> = ({ 
  onNavigate, 
  className = '',
  showHeading = true 
}) => {
  const { language } = useApp();
  const t = translations[language];
  const s = t.servicesOffers;

  const [activeTab, setActiveTab] = useState<'jobs' | 'interns' | 'ads' | 'books'>('jobs');

  const allInOneServices = [
    {
      id: 'jobs' as const,
      label: s.tabJob,
      icon: Briefcase,
      color: 'emerald',
      heading: language === 'rw' ? 'Gushaka Akazi Kemejwe' : 'Find a Verified Job',
      desc: language === 'rw' 
        ? 'Imyanya y\'akazi ihoraho n\'iy\'amasezerano yatanzwe n\'ibigo byemewe mu Rwanda. Gusaba ni ubuntu 100% nta kiguzi cyihishe.' 
        : 'Permanent and contract positions from accredited employers across Rwanda. 100% free to browse and apply without fees.',
      actionLabel: language === 'rw' ? 'Reba Imirimo' : 'Browse Jobs',
      actionRoute: 'jobs',
      actionParams: null
    },
    {
      id: 'interns' as const,
      label: s.tabIntern,
      icon: GraduationCap,
      color: 'blue',
      heading: language === 'rw' ? 'Gushaka Umwimenyerezo (Intern)' : 'Find an Intern or Trainee',
      desc: language === 'rw'
        ? 'Gerera ku banyeshuri barangije za kaminuza n\'amashuri y\'imyuga (TVET) bafite umwete n\'ubushake bwo kwimenyereza umwuga.'
        : 'Direct access to energetic university graduates and TVET vocational interns ready for immediate hands-on placement.',
      actionLabel: language === 'rw' ? 'Reba Kwimenyereza' : 'Browse Internships',
      actionRoute: 'jobs',
      actionParams: { type: 'internship' }
    },
    {
      id: 'ads' as const,
      label: s.tabAdvertise,
      icon: Megaphone,
      color: 'purple',
      heading: language === 'rw' ? 'Kwamamaza Ubucuruzi bwawe' : 'Advertise Your Business',
      desc: language === 'rw'
        ? 'Kwamamaza ibicuruzwa, serivisi, amasoko ya Leta cyangwa imyanya y\'akazi ukoresheje MoMo, bigahita bigera ku bihumbi by\'abasomyi.'
        : 'Promote commercial services, tenders, and institutional notices with instant MoMo checkout and targeted nationwide reach.',
      actionLabel: language === 'rw' ? 'Shyiraho Itangazo' : 'Post Business Advert',
      actionRoute: 'post-advert',
      actionParams: null
    },
    {
      id: 'books' as const,
      label: s.tabBooks,
      icon: BookOpen,
      color: 'amber',
      heading: language === 'rw' ? 'Kugura, Kwamamaza & Kugurisha Ibitabo' : 'Buy, Market & Sell Books',
      desc: language === 'rw'
        ? 'Isoko ry\'abanditsi b\'abanyarwanda ryo kumenyekanisha ibitabo, kugurisha ako kanya kuri WhatsApp no kwagura abasomyi.'
        : 'Dedicated bookstore for Rwandan authors and publishers to market literature, leadership, business books, and sell directly.',
      actionLabel: language === 'rw' ? 'Reba Ibitabo' : 'Explore Books',
      actionRoute: 'books',
      actionParams: null
    }
  ];

  const currentService = allInOneServices.find(s => s.id === activeTab) || allInOneServices[0];
  const CurrentIcon = currentService.icon;

  return (
    <section className={`space-y-8 ${className}`}>
      
      {/* Section Header */}
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{s.tagline}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {s.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {s.subtitle}
          </p>
        </div>
      )}

      {/* 3 Core Value Offerings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ------------------------------------------------------------- */}
        {/* PILLAR 9: WE BRING QUALIFIED WORKERS FAST                    */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all space-y-6">
          <div className="space-y-4">
            
            {/* Number Badge & Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                <Zap className="w-5 h-5 fill-emerald-500/20" />
              </div>
              <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Offering #9
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                9. {s.pillar9Title}
              </h3>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                &ldquo;{s.pillar9Subtitle}&rdquo;
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {s.pillar9Desc}
            </p>

            {/* Functional Checkpoints */}
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant applicant delivery:</strong> Vetted candidates apply within 24 hours of advert approval.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero candidate noise:</strong> Structured applications with clean phone, email, and CV attachments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Nationwide coverage:</strong> Deep candidate presence across all 30 Rwandan districts.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <button
              onClick={() => onNavigate('post-advert')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{language === 'rw' ? 'Shyiraho Akazi (Bona Abakozi)' : 'Post Vacancy (Hire Fast)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PILLAR 13: RECRUITMENT & CONSULTANCY                         */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all space-y-6">
          <div className="space-y-4">
            
            {/* Number Badge & Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                <UserCheck className="w-5 h-5 fill-blue-500/20" />
              </div>
              <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Offering #13
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                13. {s.pillar13Title}
              </h3>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                &ldquo;{s.pillar13Subtitle}&rdquo;
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {s.pillar13Desc}
            </p>

            {/* Functional Checkpoints */}
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Talent headhunting:</strong> Executive and specialized recruitment tailored to your exact terms of reference.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Technical screening & testing:</strong> Pre-interview assessments and background reference checks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Interview shortlisting:</strong> Committee-ready candidate dossiers with ranking and scoring reports.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <button
              onClick={() => onNavigate('employers')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{s.ctaConsultancy}</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PILLAR 14: ALL-IN-ONE PLATFORM                               */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/30 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-6 relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            
            {/* Number Badge & Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                <Layers className="w-5 h-5 fill-purple-500/20" />
              </div>
              <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Offering #14
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                14. {s.pillar14Title}
              </h3>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                &ldquo;{s.pillar14Subtitle}&rdquo;
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {s.pillar14Desc}
            </p>

            {/* 4 Pillars Interactive Tab Pill Selectors */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {allInOneServices.map(item => {
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-2 py-1.5 text-[11px] font-bold rounded-lg transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <item.icon className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Preview Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <CurrentIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{currentService.heading}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {currentService.desc}
              </p>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <button
              onClick={() => onNavigate(currentService.actionRoute, currentService.actionParams)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{currentService.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Trust & Efficiency Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">
              {language === 'rw' ? 'Sisitemu Yuzuye Y\'Akazi mu Rwanda' : 'One Unified Digital Livelihood System for Rwanda'}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {language === 'rw' 
                ? 'Nta gutatanya imbaraga. Akazi.com gakomatanya ibikenewe byose mu kazi, ubucuruzi n\'ibitabo.' 
                : 'From talent acquisition and student internships to commercial advertising and Rwandan literature, everything works in one place.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            {s.ctaBrowseJobs}
          </button>
          <button
            onClick={() => onNavigate('post-advert')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
          >
            {s.ctaPostAdvert}
          </button>
        </div>
      </div>

    </section>
  );
};
