import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ReportModal } from './components/ReportModal';
import { AlertModal } from './components/AlertModal';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { PostAdvertPage } from './pages/PostAdvertPage';
import { EmployersPage } from './pages/EmployersPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BooksPage } from './pages/BooksPage';
import { AdvicePage } from './pages/AdvicePage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminConsolePage } from './pages/AdminConsolePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { PartnerPortalPage } from './pages/PartnerPortalPage';
import { Advert } from './types';
import { CheckCircle2 } from 'lucide-react';

const getRouteFromUrl = (): string => {
  try {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (
      pathname === '/admin-login' || 
      pathname === '/admin/login' || 
      pathname === '/secure-admin' ||
      pathname.endsWith('/admin-login') ||
      hash.includes('admin-login') || 
      search.includes('admin=login')
    ) {
      return 'admin-login';
    }

    if (
      pathname === '/admin' || 
      pathname === '/admin-console' || 
      pathname.endsWith('/admin') ||
      hash.includes('admin-console') ||
      hash.includes('/admin')
    ) {
      return 'admin-login';
    }
  } catch (e) {
    /* ignore */
  }
  return 'home';
};

const MainApp: React.FC = () => {
  const { toastMessage, isAdminLoggedIn, theme } = useApp();

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const initial = getRouteFromUrl();
    if (initial === 'admin-login' && isAdminLoggedIn) {
      return 'admin-console';
    }
    return initial;
  });
  const [routeParams, setRouteParams] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<Advert | null>(null);

  // Modals
  const [applyModalJob, setApplyModalJob] = useState<Advert | null>(null);
  const [reportModalJob, setReportModalJob] = useState<Advert | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const updateBrowserUrl = (route: string) => {
    try {
      if (route === 'admin-login') {
        window.history.pushState({ route }, '', '/admin-login');
      } else if (route === 'admin-console') {
        window.history.pushState({ route }, '', '/admin-console');
      } else if (route === 'home') {
        window.history.pushState({ route }, '', '/');
      } else {
        window.history.pushState({ route }, '', `/#/${route}`);
      }
    } catch (e) {
      try {
        if (route === 'admin-login') {
          window.location.hash = '/admin-login';
        } else if (route === 'admin-console') {
          window.location.hash = '/admin-console';
        } else if (route === 'home') {
          window.location.hash = '';
        }
      } catch (err) {
        /* ignore */
      }
    }
  };

  const handleNavigate = (route: string, params?: any) => {
    if (route === 'admin' || route === 'admin-login') {
      if (isAdminLoggedIn) {
        setCurrentRoute('admin-console');
        updateBrowserUrl('admin-console');
      } else {
        setCurrentRoute('admin-login');
        updateBrowserUrl('admin-login');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (route === 'admin-dashboard' || route === 'admin-console') {
      if (isAdminLoggedIn) {
        setCurrentRoute('admin-console');
        updateBrowserUrl('admin-console');
      } else {
        setCurrentRoute('admin-login');
        updateBrowserUrl('admin-login');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentRoute(route);
    setRouteParams(params || null);
    updateBrowserUrl(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for browser URL back/forward navigation or direct URL entry
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = getRouteFromUrl();
      if (detected === 'admin-login') {
        if (isAdminLoggedIn) {
          setCurrentRoute('admin-console');
        } else {
          setCurrentRoute('admin-login');
        }
      } else if (currentRoute === 'admin-login' || currentRoute === 'admin-console') {
        setCurrentRoute(detected);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAdminLoggedIn, currentRoute]);

  const handleSelectJob = (advert: Advert) => {
    setSelectedJob(advert);
    setCurrentRoute('job-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener: Ctrl+Shift+A or Alt+A to trigger private admin portal URL
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        handleNavigate('admin-login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  // Dedicated Full-Page Admin Login Portal (Isolated from public website)
  if (currentRoute === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => handleNavigate('admin-console')}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-250 ${
      theme === 'dark' 
        ? 'bg-[#0B0F19] text-slate-100 selection:bg-emerald-900 selection:text-emerald-200' 
        : theme === 'white' 
        ? 'bg-white text-slate-950 selection:bg-emerald-100 selection:text-emerald-900' 
        : 'bg-[#F8FAFC] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900'
    }`}>
      
      {/* Top Bar Header */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectJob={handleSelectJob}
            onOpenAlertModal={() => setAlertModalOpen(true)}
          />
        )}

        {currentRoute === 'jobs' && (
          <JobsPage
            initialFilter={routeParams}
            onSelectJob={handleSelectJob}
            onNavigatePost={() => handleNavigate('post-advert')}
          />
        )}

        {currentRoute === 'job-detail' && selectedJob && (
          <JobDetailPage
            advert={selectedJob}
            onBack={() => handleNavigate('jobs')}
            onOpenApply={(job) => setApplyModalJob(job)}
            onOpenReport={(job) => setReportModalJob(job)}
            onSelectSimilarJob={handleSelectJob}
          />
        )}

        {currentRoute === 'post-advert' && (
          <PostAdvertPage
            onSuccess={(slug) => handleNavigate('dashboard')}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'employers' && (
          <EmployersPage 
            onNavigatePost={() => handleNavigate('post-advert')} 
            onNavigatePortal={() => handleNavigate('partner-portal')}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'help' && <HelpPage />}

        {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentRoute === 'contact' && <ContactPage />}

        {currentRoute === 'testimonials' && <TestimonialsPage />}

        {currentRoute === 'books' && (
          <BooksPage onNavigatePost={() => handleNavigate('post-advert')} />
        )}

        {currentRoute === 'advice' && <AdvicePage />}

        {currentRoute === 'dashboard' && (
          <DashboardPage
            onSelectJob={handleSelectJob}
            onNavigatePost={() => handleNavigate('post-advert')}
            onNavigateJobs={() => handleNavigate('jobs')}
          />
        )}

        {/* Private Partner Portal for authorized employers & authors */}
        {currentRoute === 'partner-portal' && (
          <PartnerPortalPage
            onSelectJob={handleSelectJob}
            onNavigatePost={() => handleNavigate('post-advert')}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* Private Full Control Admin Console */}
        {currentRoute === 'admin-console' && (
          isAdminLoggedIn ? (
            <AdminConsolePage
              onSelectJob={handleSelectJob}
              onNavigateHome={() => handleNavigate('home')}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={() => handleNavigate('admin-console')}
              onNavigateHome={() => handleNavigate('home')}
            />
          )
        )}
      </main>

      {/* Global Modals */}
      {applyModalJob && (
        <ApplyModal
          advert={applyModalJob}
          isOpen={Boolean(applyModalJob)}
          onClose={() => setApplyModalJob(null)}
        />
      )}

      {reportModalJob && (
        <ReportModal
          advert={reportModalJob}
          isOpen={Boolean(reportModalJob)}
          onClose={() => setReportModalJob(null)}
        />
      )}

      <AlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Public Footer (Staff portal link completely removed) */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
