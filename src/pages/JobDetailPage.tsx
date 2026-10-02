import React, { useState, useEffect } from 'react';
import { Advert } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { JobCard } from '../components/JobCard';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Share2, 
  AlertTriangle, 
  ArrowLeft, 
  Briefcase, 
  GraduationCap, 
  Coins, 
  Users, 
  Calendar,
  MessageCircle,
  ExternalLink,
  Flame,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface JobDetailPageProps {
  advert: Advert;
  onBack: () => void;
  onOpenApply: (advert: Advert) => void;
  onOpenReport: (advert: Advert) => void;
  onSelectSimilarJob: (advert: Advert) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  advert,
  onBack,
  onOpenApply,
  onOpenReport,
  onSelectSimilarJob
}) => {
  const { language, adverts, toggleSaveJob, isJobSaved, incrementAdvertViews, showToast } = useApp();
  const t = translations[language];
  const saved = isJobSaved(advert.id);

  useEffect(() => {
    incrementAdvertViews(advert.id);
  }, [advert.id]);

  const similarJobs = adverts
    .filter(a => a.id !== advert.id && a.status === 'live' && (a.category === advert.category || a.district === advert.district))
    .slice(0, 3);

  const handleShare = (platform: 'whatsapp' | 'x' | 'linkedin' | 'copy') => {
    const shareUrl = window.location.href;
    const shareTitle = `${advert.title} at ${advert.companyName} on Akazi.com Rwanda`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast(language === 'rw' ? 'Ihuza ry\'iri tangazo ryakoporowe!' : 'Job link copied to clipboard!');
    }
  };

  const formatSalary = () => {
    if (advert.isSalaryHidden) return language === 'rw' ? 'Biganirwaho' : 'Competitive / Negotiable';
    if (advert.salaryMin && advert.salaryMax) {
      return `${advert.salaryMin.toLocaleString()} - ${advert.salaryMax.toLocaleString()} RWF / month`;
    }
    if (advert.salaryMin) {
      return `From ${advert.salaryMin.toLocaleString()} RWF / month`;
    }
    return language === 'rw' ? 'Biganirwaho' : 'Competitive';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'rw' ? 'Gusubira ku rutonde' : 'Back to Opportunities'}</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-start gap-4">
            {advert.companyLogo ? (
              <img
                src={advert.companyLogo}
                alt={`${advert.companyName} logo`}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xl shrink-0">
                {advert.companyName.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">{advert.companyName}</span>
                {advert.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>RDB Verified</span>
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
                {language === 'rw' && advert.titleRw ? advert.titleRw : advert.title}
              </h1>

              {/* Zero-pill metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{advert.district}{advert.sector ? `, ${advert.sector}` : ''}</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="capitalize">{advert.employmentType.replace('-', ' ')}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{advert.category.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Action buttons (Save & Apply) */}
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <button
              onClick={() => toggleSaveJob(advert.id)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                saved 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
              title={saved ? 'Remove saved' : 'Save job'}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-emerald-600' : ''}`} />
            </button>

            {advert.applicationMethod === 'link' && advert.applicationUrl ? (
              <a
                href={advert.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <span>{language === 'rw' ? 'Saba ku rubuga rw\'ikigo' : 'Apply on Company Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => onOpenApply(advert)}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <span>{t.common.applyNow}</span>
                <span className="text-[11px] font-normal text-emerald-100">(Free)</span>
              </button>
            )}
          </div>

        </div>

        {/* 4-Item Metric Strip with tabular numerals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.common.salary}</div>
            <div className="font-bold text-slate-900 mt-0.5 font-mono tabular-nums">{formatSalary()}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.common.experience}</div>
            <div className="font-bold text-slate-900 mt-0.5 capitalize">{advert.experienceLevel} level</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Education</div>
            <div className="font-bold text-slate-900 mt-0.5 truncate">{advert.educationLevel}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.common.deadline}</div>
            <div className="font-bold text-slate-900 mt-0.5 font-mono tabular-nums">{advert.deadline}</div>
          </div>
        </div>

        {/* Job Body Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
          
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              {language === 'rw' ? 'Ibisobanuro by\'Umurimo' : 'Role Overview'}
            </h2>
            <p className="whitespace-pre-line text-slate-600">
              {advert.description}
            </p>
          </div>

          {advert.responsibilities && advert.responsibilities.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                {language === 'rw' ? 'Inshingano z\'Ibanze' : 'Key Responsibilities'}
              </h2>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                {advert.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {advert.requirements && advert.requirements.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                {language === 'rw' ? 'Ibisabwa n\'Ubumenyi' : 'Candidate Requirements'}
              </h2>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                {advert.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Bottom Apply Box & Safety Guarantee */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.footer.antiScam}</span>
          </div>

          <button
            onClick={() => onOpenApply(advert)}
            className="w-full sm:w-auto px-8 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            {t.common.applyNow} (Free of charge)
          </button>
        </div>

        {/* Share & Report Toolbar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <span>{t.common.share}:</span>
            <button
              onClick={() => handleShare('whatsapp')}
              className="p-1.5 rounded-md hover:bg-slate-100 text-emerald-600 font-semibold cursor-pointer"
              title="Share on WhatsApp"
            >
              WhatsApp
            </button>
            <span>·</span>
            <button
              onClick={() => handleShare('x')}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 cursor-pointer"
              title="Share on X"
            >
              X
            </button>
            <span>·</span>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-1.5 rounded-md hover:bg-slate-100 text-blue-700 cursor-pointer"
              title="Share on LinkedIn"
            >
              LinkedIn
            </button>
            <span>·</span>
            <button
              onClick={() => handleShare('copy')}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              Copy Link
            </button>
          </div>

          <button
            onClick={() => onOpenReport(advert)}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.common.report}</span>
          </button>

        </div>

      </div>

      {/* Similar Opportunities */}
      {similarJobs.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-slate-900">
            {language === 'rw' ? 'Imirimo Isa N\'Iyi Muri aka Karere' : 'Similar Opportunities in Rwanda'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarJobs.map(job => (
              <JobCard
                key={job.id}
                advert={job}
                onSelect={(j) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectSimilarJob(j);
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
