import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Advert } from '../types';
import { JobCard } from '../components/JobCard';
import { ServicesOffersSection } from '../components/ServicesOffersSection';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  PhoneCall, 
  ChevronRight,
  TrendingUp,
  UserPlus,
  Send,
  BellRing
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string, filterParams?: any) => void;
  onSelectJob: (advert: Advert) => void;
  onOpenAlertModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onSelectJob,
  onOpenAlertModal 
}) => {
  const { language, adverts, books, testimonials, articles } = useApp();
  const t = translations[language];

  const [keyword, setKeyword] = useState('');
  const [district, setDistrict] = useState('All');

  const featuredJobs = adverts.filter(a => a.featured && a.status === 'live');
  const latestJobs = adverts.filter(a => a.status === 'live' && a.type === 'job').slice(0, 6);
  const internships = adverts.filter(a => a.status === 'live' && a.type === 'internship');
  const featuredBook = books.find(b => b.isFeaturedWeek && b.status === 'live') || books[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('jobs', { keyword, district: district === 'All' ? '' : district });
  };

  const districtsList = [
    'All',
    'Gasabo',
    'Kicukiro',
    'Nyarugenge',
    'Musanze',
    'Huye',
    'Rubavu',
    'Rwamagana',
    'Bugesera',
    'Muhanga'
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 md:pt-16 md:pb-24">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Tagline & Fast Search */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.hero.verifiedTag} · {t.hero.noFeesTag}</span>
              </div>

              {/* Tagline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
                {t.hero.tagline}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {t.hero.subline}
              </p>

              {/* Primary Search Bar - One primary action */}
              <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 border border-slate-200">
                <div className="flex items-center gap-2 flex-1 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={t.hero.searchPlaceholder}
                    className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-44 border-b sm:border-b-0 border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs sm:text-sm text-slate-700 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="All">{t.hero.allDistricts}</option>
                    {districtsList.slice(1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  {t.hero.searchBtn}
                </button>
              </form>

              {/* Quick Category Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400">{t.hero.quickChips}</span>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {t.nav.jobs}
                </button>
                <button
                  onClick={() => onNavigate('jobs', { type: 'internship' })}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {t.nav.internships}
                </button>
                <button
                  onClick={() => onNavigate('books')}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {t.nav.books}
                </button>
                <button
                  onClick={() => onNavigate('employers')}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {t.nav.employers}
                </button>
              </div>

              {/* Secondary link for employers */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <span>{language === 'rw' ? 'Uri umukoresha?' : 'Hiring in Rwanda?'}</span>
                <button
                  onClick={() => onNavigate('post-advert')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  {language === 'rw' ? 'Shyiraho itangazo ubu' : 'Post an Advert (from 10,000 RWF)'} &rarr;
                </button>
              </div>

            </div>

            {/* Right Col: High-Fidelity Hero Visual */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
                <img
                  src="/src/assets/images/hero_kigali_workplace_1790885227399.jpg"
                  alt="Young Rwandan professionals collaborating in Kigali innovation hub"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-xs text-white">
                    <div className="font-bold">Kigali Innovation Hub & Workspace</div>
                    <div className="text-slate-300 text-[11px]">Connecting Rwandan talent to accredited employers nationwide.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUSTED EMPLOYERS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t.sections.trustedEmployers}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
          {['Irembo GovTech', 'Bank of Kigali', 'Ampersand', 'One Acre Fund', 'Inkomoko', 'RBC Rwanda'].map((name, i) => (
            <div 
              key={i} 
              className="py-3 px-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-bold text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 WHAT AKAZI OFFERS & CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesOffersSection onNavigate={onNavigate} />
      </section>

      {/* 3. FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.sections.featuredJobs}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {language === 'rw' ? 'Imirimo Yatoranyijwe Idasanzwe' : 'Featured & Verified Positions'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.sections.featuredJobsDesc}
            </p>
          </div>

          <button
            onClick={() => onNavigate('jobs')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>{t.sections.viewAllJobs}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredJobs.map(job => (
            <JobCard key={job.id} advert={job} onSelect={onSelectJob} />
          ))}
        </div>
      </section>

      {/* 4. LATEST JOBS & LATEST INTERNSHIPS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Col: Latest Jobs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {t.sections.latestJobs}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.sections.latestJobsDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('jobs')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{t.sections.viewAllJobs}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestJobs.map(job => (
                <JobCard key={job.id} advert={job} onSelect={onSelectJob} />
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('jobs')}
                className="px-6 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors shadow-2xs cursor-pointer"
              >
                {t.common.loadMore} &rarr;
              </button>
            </div>
          </div>

          {/* Right Col: Internships & Traineeships Strip */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.sections.internships}</span>
                </div>
                <button
                  onClick={() => onNavigate('jobs', { type: 'internship' })}
                  className="text-[11px] text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  {language === 'rw' ? 'Reba byose' : 'View all'}
                </button>
              </div>

              <div className="space-y-3">
                {internships.map(intern => (
                  <div
                    key={intern.id}
                    onClick={() => onSelectJob(intern)}
                    className="p-3 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/10 cursor-pointer transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {intern.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>{intern.companyName}</span>
                      <span className="text-emerald-700 font-semibold">{intern.district}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('jobs', { type: 'internship' })}
                  className="w-full py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer text-center"
                >
                  {t.sections.viewAllInternships}
                </button>
              </div>
            </div>

            {/* Quick Job Alert CTA Box */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 text-white space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <BellRing className="w-4 h-4" />
                <span>{t.sections.jobAlertsTitle}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.sections.jobAlertsDesc}
              </p>
              <button
                onClick={onOpenAlertModal}
                className="w-full py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                {t.sections.subscribeBtn}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. BOOK OF THE WEEK (AUTHOR SPOTLIGHT) */}
      {featuredBook && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-4 flex justify-center">
                <div className="relative group max-w-xs shadow-xl rounded-lg overflow-hidden border border-amber-200 bg-white">
                  <img
                    src={featuredBook.coverUrl}
                    alt={featuredBook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-2 text-center text-[11px] font-semibold text-amber-900 bg-amber-100">
                    {language === 'rw' ? 'Igitabo cy\'Icyumweru' : 'Author Spotlight'}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.sections.bookOfWeek}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {featuredBook.title}
                </h3>

                <div className="text-xs text-slate-600 font-medium">
                  By <strong className="text-slate-900">{featuredBook.author}</strong> · 
                  <span className="ml-1 text-slate-500">{featuredBook.genre}</span> · 
                  <span className="ml-1 text-emerald-800 font-bold font-mono tabular-nums">{featuredBook.priceRwf.toLocaleString()} RWF</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredBook.synopsis}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={featuredBook.buyLink || `https://wa.me/250788785514`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    {language === 'rw' ? 'Gura Iki Gitabo (WhatsApp)' : 'Order via Author WhatsApp'}
                  </a>
                  <button
                    onClick={() => onNavigate('books')}
                    className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    {t.sections.viewAllBooks} &rarr;
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 6. HOW IT WORKS (3 STEPS FOR SEEKERS, 3 FOR POSTERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900">
            {t.sections.howItWorks}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'rw'
              ? 'Inzira yoroshye kandi yihuse yo kubona akazi cyangwa guha akazi abashoboye mu Rwanda.'
              : 'Akazi connects talent and opportunity with three simple taps.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Seekers Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>{t.sections.forSeekers}</span>
              <span className="text-xs font-semibold text-emerald-600 font-mono">100% FREE</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  1
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Shakisha Akazi' : 'Search & Filter'}</div>
                  <p className="text-slate-500 mt-0.5">Browse verified jobs and internships by district, field, and salary.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  2
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Saba Ako Kanya' : 'Apply Directly'}</div>
                  <p className="text-slate-500 mt-0.5">Attach your CV and cover note with no login or hidden charge.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  3
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Kurikirana n\'Ubutumwa' : 'Get Hired & Grow'}</div>
                  <p className="text-slate-500 mt-0.5">Receive interview invitations directly from verified employers.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('jobs')}
              className="w-full mt-2 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 rounded-lg transition-colors cursor-pointer text-center"
            >
              {language === 'rw' ? 'Tangira Gushakisha' : 'Browse All Jobs'} &rarr;
            </button>
          </div>

          {/* Posters Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>{t.sections.forPosters}</span>
              <span className="text-xs font-semibold text-slate-500 font-mono">FROM 10,000 RWF</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  1
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Hitamo Paki' : 'Select Package'}</div>
                  <p className="text-slate-500 mt-0.5">Choose Basic, Standard, or Featured with clear fixed RWF pricing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  2
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Kwishyura kuri MoMo' : 'Pay via Mobile Money'}</div>
                  <p className="text-slate-500 mt-0.5">Instant MTN MoMo or Airtel Money payment with automatic receipt.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  3
                </div>
                <div>
                  <div className="font-bold text-slate-900">{language === 'rw' ? 'Isuzuma ry\'Amasaha 24' : '24h Review & Publish'}</div>
                  <p className="text-slate-500 mt-0.5">Moderated to verify trust, then published to thousands of qualified candidates.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('post-advert')}
              className="w-full mt-2 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-center"
            >
              {language === 'rw' ? 'Shyiraho Itangazo Ubu' : 'Post an Advert'} &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'rw' ? 'Icyo Abakoresha n\'Abasaba Akazi Batuvugaho' : 'Verified Community Stories'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real outcomes from Rwandan job seekers, employers, and authors.
            </p>
          </div>
          <button
            onClick={() => onNavigate('testimonials')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'rw' ? 'Soma Byose' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.filter(t => t.approved).slice(0, 3).map(test => (
            <div key={test.id} className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{language === 'rw' && test.quoteRw ? test.quoteRw : test.quote}"
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{test.name}</div>
                  <div className="text-[11px] text-slate-500">{test.role} · {test.organization}</div>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 uppercase">
                  {test.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CAREER ADVICE LATEST 3 ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.sections.careerAdvice}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'rw' ? 'Inama zo kwandika CV no gutsinda ibizamini by\'akazi mu Rwanda.' : 'Free practical guides, CV templates, and interview strategies.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('advice')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'rw' ? 'Reba Inama Zose' : 'Browse Guides'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map(art => (
            <div 
              key={art.id} 
              onClick={() => onNavigate('advice')}
              className="smoky-job-card group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[380px]"
            >
              {/* Image filling width and reaching half */}
              <div className="relative w-full h-48 overflow-hidden shrink-0 bg-slate-900">
                {art.imageUrl && (
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
                {/* Smoky gradient layer */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
                
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {art.category}
                  </span>
                </div>
              </div>

              {/* Contents overlaid at the bottom with dark smoky design */}
              <div className="relative -mt-8 z-10 px-5 pb-5 pt-3.5 bg-linear-to-b from-slate-900/95 via-slate-950 to-slate-950 border-t border-slate-800/80 rounded-t-2xl backdrop-blur-md flex-1 flex flex-col justify-between shadow-[0_-12px_24px_-8px_rgba(0,0,0,0.6)] space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-emerald-400">
                    {art.readTime}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                    {language === 'rw' ? art.titleRw : art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'rw' ? art.summaryRw : art.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
