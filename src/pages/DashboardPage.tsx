import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Advert } from '../types';
import { JobCard } from '../components/JobCard';
import { 
  Bookmark, 
  Send, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Search,
  Sparkles,
  Lock
} from 'lucide-react';

interface DashboardPageProps {
  onSelectJob: (advert: Advert) => void;
  onNavigatePost: () => void;
  onNavigateJobs: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onSelectJob, 
  onNavigatePost,
  onNavigateJobs
}) => {
  const { 
    language, 
    adverts, 
    savedJobIds, 
    applications, 
    alerts 
  } = useApp();

  const t = translations[language];

  const savedAdverts = adverts.filter(a => savedJobIds.includes(a.id));
  const myApplications = applications;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'rw' ? 'Ibyo Wabitse n\'Ubusabe Bwawe' : 'Saved Opportunities & Applications'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your bookmarked vacancies, review application stages, and manage your alert notifications.
          </p>
        </div>

        <button
          onClick={onNavigateJobs}
          className="self-start sm:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{t.nav.jobs}</span>
        </button>
      </div>

      {/* Frictionless Privacy Reassurance */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-emerald-950">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
            {language === 'rw' ? 'Umutekano n\'Icyizere Ku Musaba Akazi' : 'Frictionless & Account-Free Experience'}
          </div>
          <p className="text-slate-700 leading-relaxed text-xs">
            {language === 'rw'
              ? 'Muri Akazi.com, ntidusaba konti cyangwa kwinjira (login) kugira ngo usabe akazi. Ibyo wambitse n\'ubusabe bwawe bibikwa mu buryo bwite kuri telefone cyangwa mudasobwa yawe, ku buntu kandi mu mutekano busesuye.'
              : 'At Akazi.com, your privacy and time are paramount. You never need to create an account or sign in to browse, save, or apply for jobs. Your saved jobs and applications are securely stored in your local session without trackers or login friction.'}
          </p>
        </div>
      </div>

      {/* 1. Submitted Applications Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-600" />
            <span>My Submitted Applications ({myApplications.length})</span>
          </h2>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            0 RWF Candidate Fees
          </span>
        </div>

        {myApplications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {myApplications.map(app => (
              <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{app.jobTitle}</div>
                  <div className="text-slate-500 mt-0.5">
                    {app.companyName} · Submitted on {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    CV Attached: {app.cvFileName}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    app.status === 'shortlisted'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : app.status === 'reviewed'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    Status: {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            You haven't submitted any job applications yet. Browse verified opportunities to apply with zero hassle.
          </div>
        )}
      </div>

      {/* 2. Saved Opportunities (Bookmarks) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Saved Opportunities ({savedAdverts.length})</span>
          </h2>
          {savedAdverts.length > 0 && (
            <span className="text-xs text-slate-400">Click bookmark on any card to remove</span>
          )}
        </div>

        {savedAdverts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedAdverts.map(adv => (
              <JobCard key={adv.id} advert={adv} onSelect={onSelectJob} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            No saved jobs yet. Click the bookmark icon on any job card to save it for later review.
          </div>
        )}
      </div>

      {/* 3. Active Job Alerts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Active Job Alerts ({alerts.length})</span>
          </h2>
        </div>

        {alerts.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {alerts.map(alt => (
              <div key={alt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    Matches for: "{alt.keywords || 'All Categories'}"
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    District: {alt.district} · Via {alt.channel.toUpperCase()} to {alt.destination}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
                  {alt.frequency} Digest
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-500">
            No active alerts configured. You can set up instant SMS/WhatsApp alerts on the homepage.
          </div>
        )}
      </div>

    </div>
  );
};
