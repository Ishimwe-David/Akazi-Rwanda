import React from 'react';
import { Advert } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  MapPin, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

interface JobCardProps {
  advert: Advert;
  onSelect: (advert: Advert) => void;
  onApplyDirect?: (advert: Advert) => void;
}

// Helper to get high-resolution banner image matching Rwandan industry context
const getCategoryBanner = (advert: Advert): string => {
  switch (advert.category) {
    case 'technology':
      return '/src/assets/images/hero_kigali_workplace_1790885227399.jpg';
    case 'finance_banking':
      return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80';
    case 'ngo_development':
      return 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80';
    case 'healthcare':
      return 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80';
    case 'education_teaching':
      return 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80';
    case 'hospitality_tourism':
      return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80';
    case 'agriculture':
      return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80';
    case 'construction_engineering':
      return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80';
    case 'sales_marketing':
      return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80';
    case 'administration_hr':
      return '/src/assets/images/employer_rwanda_office_1790885250817.jpg';
    default:
      return advert.companyLogo || '/src/assets/images/hero_kigali_workplace_1790885227399.jpg';
  }
};

export const JobCard: React.FC<JobCardProps> = ({ advert, onSelect }) => {
  const { language, toggleSaveJob, isJobSaved } = useApp();
  const t = translations[language];
  const saved = isJobSaved(advert.id);

  // Format currency
  const formatSalary = () => {
    if (advert.isSalaryHidden) return null;
    if (advert.salaryMin && advert.salaryMax) {
      return `${(advert.salaryMin / 1000).toLocaleString()}k - ${(advert.salaryMax / 1000).toLocaleString()}k RWF`;
    }
    if (advert.salaryMin) {
      return `From ${(advert.salaryMin / 1000).toLocaleString()}k RWF`;
    }
    return null;
  };

  const salaryString = formatSalary();
  const bannerImg = getCategoryBanner(advert);

  return (
    <div 
      className={`smoky-job-card group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col justify-between min-h-[380px] bg-slate-950 text-white ${
        advert.featured
          ? 'border-amber-400/60 ring-1 ring-amber-400/20 shadow-lg shadow-amber-950/20'
          : 'border-slate-800 hover:border-slate-700 shadow-md shadow-slate-950/40'
      }`}
      onClick={() => onSelect(advert)}
    >
      {/* ======================================================== */}
      {/* 1. IMAGE: FILLS WIDTH, HEIGHT REACHES HALF               */}
      {/* ======================================================== */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden shrink-0 bg-slate-900">
        <img
          src={bannerImg}
          alt={advert.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Smoky Vignette Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        {/* Top Badges & Save Action floating over image */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {advert.urgent && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                <Flame className="w-3 h-3 text-white fill-white" />
                <span>{t.common.urgent}</span>
              </span>
            )}

            {advert.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md">
                <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
                <span>{t.common.featured}</span>
              </span>
            )}
          </div>

          {/* Bookmark Button with Smoky Frosted Glass */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(advert.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer border shadow-sm ${
              saved 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-slate-950/60 text-slate-300 border-white/10 hover:text-white hover:bg-slate-900'
            }`}
            title={saved ? 'Remove from saved' : 'Save opportunity'}
            aria-label="Save opportunity"
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CONTENTS OVERLAID AT BOTTOM WITH DARK SMOKY DESIGN   */}
      {/* ======================================================== */}
      <div className="relative -mt-8 z-10 px-5 pb-5 pt-3.5 bg-linear-to-b from-slate-900/95 via-slate-950 to-slate-950 border-t border-slate-800/80 rounded-t-2xl backdrop-blur-md flex-1 flex flex-col justify-between shadow-[0_-12px_24px_-8px_rgba(0,0,0,0.6)] space-y-3">
        
        <div className="space-y-2.5">
          {/* Company Row: Logo + Name + Verified Badge */}
          <div className="flex items-center gap-3">
            {advert.companyLogo ? (
              <img
                src={advert.companyLogo}
                alt={`${advert.companyName} logo`}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border-2 border-slate-700 bg-slate-900 shadow-md shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-sm shadow-md">
                {advert.companyName.charAt(0)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold truncate">
                <span className="truncate">{advert.companyName}</span>
                {advert.isVerified && (
                  <span title="RDB Verified Employer" className="inline-flex shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate">{advert.district}{advert.sector ? `, ${advert.sector}` : ''}</span>
              </div>
            </div>
          </div>

          {/* Job Title */}
          <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
            {language === 'rw' && advert.titleRw ? advert.titleRw : advert.title}
          </h3>

          {/* Metadata tags */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-0.5">
            <span className="capitalize text-slate-300 font-medium">
              {advert.employmentType.replace('-', ' ')}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="capitalize text-slate-300 font-medium">
              {advert.experienceLevel} level
            </span>
            {advert.openings > 1 && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="tabular-nums font-mono text-emerald-400">
                  {advert.openings} {t.common.openings}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Card Footer: Salary + Deadline + Direct Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          <div>
            {salaryString ? (
              <span className="font-mono font-bold text-emerald-400 tabular-nums">
                {salaryString}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">
                Competitive Rwandan Package
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-0.5">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{advert.deadline}</span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center shrink-0 border border-emerald-500/20">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
