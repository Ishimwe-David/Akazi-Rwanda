import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  Briefcase, 
  Menu, 
  X, 
  Plus, 
  Bookmark, 
  ShieldCheck, 
  ChevronDown,
  BookOpen,
  HelpCircle,
  FileText,
  MessageSquareQuote,
  LogOut,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, params?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { 
    language, 
    setLanguage, 
    theme,
    setTheme,
    isAdminLoggedIn, 
    adminLogout, 
    savedJobIds 
  } = useApp();
  
  const t = translations[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ======================================================== */}
          {/* ZONE 1: BRAND LOGO */}
          {/* ======================================================== */}
          <div className="flex items-center gap-8 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
              title="Akazi.com Rwanda - Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base shadow-xs group-hover:bg-emerald-700 transition-colors">
                A
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Akazi<span className="text-emerald-600">.com</span>
              </span>
            </button>

            {/* ======================================================== */}
            {/* ZONE 2: SMART NAVIGATION (Clean, Uncluttered) */}
            {/* ======================================================== */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              
              {/* Jobs */}
              <button
                onClick={() => onNavigate('jobs')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'jobs'
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
                }`}
              >
                {t.nav.jobs}
              </button>

              {/* Employers */}
              <button
                onClick={() => onNavigate('employers')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'employers'
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
                }`}
              >
                {t.nav.employers}
              </button>

              {/* Books */}
              <button
                onClick={() => onNavigate('books')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'books'
                    ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
                }`}
              >
                {t.nav.books}
              </button>

              {/* Smart "More" Dropdown */}
              <div className="relative" ref={resourcesRef}>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    resourcesOpen || ['advice', 'help', 'about', 'contact', 'testimonials'].includes(currentRoute)
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{language === 'rw' ? 'Ibindi' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {resourcesOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    
                    <button
                      onClick={() => {
                        onNavigate('advice');
                        setResourcesOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                    >
                      <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                          {t.nav.advice}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'rw' ? 'Uko wandika CV n\'inama z\'akazi' : 'Free CV templates & career guides'}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('help');
                        setResourcesOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                          {t.nav.help} & FAQs
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'rw' ? 'Ubufasha, umutekano no kwishyura' : 'Candidate safety, payments & policies'}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('testimonials');
                        setResourcesOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                    >
                      <MessageSquareQuote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                          {t.nav.testimonials}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'rw' ? 'Ubuhamya bw\'abakoresha n\'abasaba' : 'Stories from verified users in Rwanda'}
                        </div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                    <div className="grid grid-cols-2 gap-1 px-2 pt-1 text-xs">
                      <button
                        onClick={() => {
                          onNavigate('about');
                          setResourcesOpen(false);
                        }}
                        className="text-left px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-850 rounded-md cursor-pointer font-medium"
                      >
                        {t.nav.aboutUs}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('contact');
                          setResourcesOpen(false);
                        }}
                        className="text-left px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-850 rounded-md cursor-pointer font-medium"
                      >
                        {t.nav.contactUs}
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* ======================================================== */}
          {/* ZONE 3: ACTIONS & SETTINGS */}
          {/* ======================================================== */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Theme Settings: Light, Dark (Smoky), White */}
            <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-amber-600 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700'
                }`}
                title="Light Setting (Natural Slate Mode)"
                aria-label="Light Setting"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-emerald-400 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700'
                }`}
                title="Dark Setting (Smoky Obsidian Mode)"
                aria-label="Dark Setting"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('white')}
                className={`flex items-center gap-1 px-2 py-1 text-[10px] font-extrabold rounded-md transition-colors cursor-pointer ${
                  theme === 'white'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700'
                }`}
                title="White Setting (Crisp Minimalist Mode)"
                aria-label="White Setting"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>WHT</span>
              </button>
            </div>

            {/* Minimalist Language Switch */}
            <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                    : 'hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  language === 'rw'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs font-bold'
                    : 'hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700'
                }`}
                title="Ikinyarwanda"
              >
                RW
              </button>
            </div>

            {/* Saved Jobs shortcut badge */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Saved opportunities and applications"
            >
              <Bookmark className="w-4 h-4" />
              {savedJobIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>

            {/* If Admin is logged in via private portal, show private console shortcut */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => onNavigate('admin-dashboard')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer"
                  title="Full Control Admin Console"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Console</span>
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={adminLogout}
                  className="text-slate-400 hover:text-rose-400 p-0.5 cursor-pointer"
                  title="Exit Admin Session"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Standout Primary Action Button */}
            <button
              onClick={() => onNavigate('post-advert')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t.nav.postAdvert}</span>
            </button>

          </div>

          {/* ======================================================== */}
          {/* MOBILE TOGGLE BUTTON */}
          {/* ======================================================== */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'white' : 'light';
                setTheme(nextTheme);
              }}
              className="px-2.5 py-1.5 text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              title={`Switch Lighting Mode (Currently: ${theme.toUpperCase()})`}
              aria-label={`Switch Lighting Mode (Currently: ${theme.toUpperCase()})`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              ) : theme === 'white' ? (
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              )}
              <span className="text-[10px] font-extrabold uppercase tracking-wider">{theme}</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              className="px-2 py-1.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE DRAWER */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          
          {/* Theme Quick Bar in Mobile Menu */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span>Appearance Setting:</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setTheme('light')}
                className={`px-2 py-1 rounded text-xs font-semibold ${theme === 'light' ? 'bg-white text-slate-900 shadow-xs' : ''}`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 rounded text-xs font-semibold ${theme === 'dark' ? 'bg-slate-900 text-emerald-400 shadow-xs' : ''}`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('white')}
                className={`px-2 py-1 rounded text-xs font-semibold ${theme === 'white' ? 'bg-white text-slate-950 shadow-xs' : ''}`}
              >
                White
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('jobs');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              {t.nav.jobs}
            </button>
            <button
              onClick={() => {
                onNavigate('employers');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              {t.nav.employers}
            </button>
            <button
              onClick={() => {
                onNavigate('books');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              {t.nav.books}
            </button>
            <button
              onClick={() => {
                onNavigate('advice');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              {t.nav.advice}
            </button>
            <button
              onClick={() => {
                onNavigate('help');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              {t.nav.help} & FAQs
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onNavigate('post-advert');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 text-center"
            >
              + {t.nav.postAdvert}
            </button>

            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg text-center"
            >
              Saved Opportunities ({savedJobIds.length})
            </button>

            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  onNavigate('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg text-center"
              >
                Admin Management Console
              </button>
            )}
          </div>

        </div>
      )}

    </header>
  );
};
