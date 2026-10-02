import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Advert, JobCategory, District, EmploymentType, ExperienceLevel } from '../types';
import { JobCard } from '../components/JobCard';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Sparkles, 
  Clock, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface JobsPageProps {
  initialFilter?: {
    keyword?: string;
    district?: string;
    type?: string;
    category?: string;
  };
  onSelectJob: (advert: Advert) => void;
  onNavigatePost: () => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ 
  initialFilter, 
  onSelectJob, 
  onNavigatePost 
}) => {
  const { language, adverts } = useApp();
  const t = translations[language];

  const [keyword, setKeyword] = useState(initialFilter?.keyword || '');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialFilter?.district || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter?.category || 'all');
  const [selectedType, setSelectedType] = useState<string>(initialFilter?.type || 'all');
  const [selectedExp, setSelectedExp] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'closing_soon'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const districts: { id: string; label: string }[] = [
    { id: 'all', label: language === 'rw' ? 'Uturere Twose' : 'All Districts' },
    { id: 'Gasabo', label: 'Gasabo (Kigali)' },
    { id: 'Kicukiro', label: 'Kicukiro (Kigali)' },
    { id: 'Nyarugenge', label: 'Nyarugenge (Kigali)' },
    { id: 'Musanze', label: 'Musanze (Northern)' },
    { id: 'Huye', label: 'Huye (Southern)' },
    { id: 'Rubavu', label: 'Rubavu (Western)' },
    { id: 'Rwamagana', label: 'Rwamagana (Eastern)' },
    { id: 'Bugesera', label: 'Bugesera (Eastern)' },
    { id: 'Muhanga', label: 'Muhanga (Southern)' },
    { id: 'Remote / All Rwanda', label: 'Remote / All Rwanda' },
  ];

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: language === 'rw' ? 'Ibyiciro Byose' : 'All Categories' },
    { id: 'technology', label: 'Software & Technology' },
    { id: 'finance_banking', label: 'Banking, Finance & Accounting' },
    { id: 'ngo_development', label: 'NGO & Community Development' },
    { id: 'healthcare', label: 'Healthcare & Public Health' },
    { id: 'education_teaching', label: 'Education & Teaching' },
    { id: 'hospitality_tourism', label: 'Hospitality & Tourism' },
    { id: 'agriculture', label: 'Agriculture & Agronomy' },
    { id: 'construction_engineering', label: 'Engineering & Construction' },
  ];

  const filteredAdverts = useMemo(() => {
    return adverts.filter(adv => {
      // Must be live
      if (adv.status !== 'live') return false;

      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchesTitle = adv.title.toLowerCase().includes(q) || (adv.titleRw && adv.titleRw.toLowerCase().includes(q));
        const matchesCompany = adv.companyName.toLowerCase().includes(q);
        const matchesDesc = adv.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesDesc) return false;
      }

      // District
      if (selectedDistrict !== 'all' && adv.district !== selectedDistrict) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && adv.category !== selectedCategory) {
        return false;
      }

      // Type
      if (selectedType !== 'all') {
        if (selectedType === 'internship' && adv.type !== 'internship' && adv.employmentType !== 'internship') return false;
        if (selectedType !== 'internship' && adv.employmentType !== selectedType) return false;
      }

      // Experience
      if (selectedExp !== 'all' && adv.experienceLevel !== selectedExp) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'closing_soon') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [adverts, keyword, selectedDistrict, selectedCategory, selectedType, selectedExp, sortBy]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedDistrict('all');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedExp('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {language === 'rw' ? 'Imirimo n\'Aho Kwimenyereza mu Rwanda' : 'Jobs & Internships in Rwanda'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'rw'
              ? 'Amatangazo yose arasuzumwa mbere yo gushyirwaho. Gusaba akazi ni ubuntu 100%.'
              : 'Every advert is reviewed before going live. Free to browse and apply, zero candidate fees.'}
          </p>
        </div>

        {/* Post Advert CTA */}
        <button
          onClick={onNavigatePost}
          className="self-start sm:self-auto px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          + {t.nav.postAdvert}
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        
        {/* Search row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden p-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary filters row (Desktop & Mobile Drawer) */}
        <div className={`pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs ${mobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
          
          {/* Segmented controls for Job Type */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'all', label: language === 'rw' ? 'Byose' : 'All Types' },
              { id: 'full-time', label: 'Full-time' },
              { id: 'internship', label: 'Internships' },
              { id: 'contract', label: 'Contract' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedType === type.id
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-slate-500">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="font-medium text-slate-800 bg-transparent border-0 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="closing_soon">Closing Soon</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count & Active Filters Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <strong className="font-semibold text-slate-900 font-mono tabular-nums">{filteredAdverts.length}</strong> opportunities
        </div>

        {(keyword || selectedDistrict !== 'all' || selectedCategory !== 'all' || selectedType !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.common.resetFilters}</span>
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      {filteredAdverts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAdverts.map(job => (
            <JobCard key={job.id} advert={job} onSelect={onSelectJob} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {t.common.noResults}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try broadening your search query or reset the district and category filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {t.common.resetFilters}
          </button>
        </div>
      )}

    </div>
  );
};
