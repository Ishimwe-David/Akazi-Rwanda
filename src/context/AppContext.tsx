import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Advert,
  Package,
  Addon,
  BookItem,
  Application,
  JobAlert,
  Testimonial,
  Article,
  Language,
  UserRole,
  PaymentTransaction,
  UserAccount,
  AccountApprovalRequest
} from '../types';
import {
  INITIAL_PACKAGES,
  INITIAL_ADDONS,
  INITIAL_ADVERTS,
  INITIAL_BOOKS,
  INITIAL_TESTIMONIALS,
  INITIAL_ARTICLES
} from '../data/seedData';

interface ReportItem {
  id: string;
  advertId: string;
  advertTitle: string;
  reason: string;
  details: string;
  reporterContact: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark' | 'white';
  setTheme: (theme: 'light' | 'dark' | 'white') => void;
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  
  // Moderator & Partner Role Control
  accountRequests: AccountApprovalRequest[];
  activePartner: AccountApprovalRequest | null;
  partnerLogin: (passkey: string) => boolean;
  partnerLogout: () => void;
  submitAccountRequest: (req: Omit<AccountApprovalRequest, 'id' | 'status' | 'submittedAt'>) => void;
  approveAccountRequest: (requestId: string, customPasskey?: string) => string;
  rejectAccountRequest: (requestId: string, reason: string) => void;
  revokeAccountRequest: (requestId: string) => void;

  adverts: Advert[];
  packages: Package[];
  addons: Addon[];
  books: BookItem[];
  testimonials: Testimonial[];
  articles: Article[];
  savedJobIds: string[];
  applications: Application[];
  alerts: JobAlert[];
  transactions: PaymentTransaction[];
  reports: ReportItem[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Actions
  toggleSaveJob: (advertId: string) => void;
  isJobSaved: (advertId: string) => boolean;
  submitApplication: (app: Omit<Application, 'id' | 'submittedAt' | 'status'>) => boolean;
  createAdvert: (advert: Omit<Advert, 'id' | 'slug' | 'createdAt' | 'views' | 'applicationsCount' | 'status'>, paymentMethod: 'mtn_momo' | 'airtel_money' | 'card' | 'bank_invoice', phoneForPayment?: string) => Advert;
  approveAdvert: (id: string) => void;
  rejectAdvert: (id: string, reason: string) => void;
  renewAdvert: (id: string) => void;
  updatePackagePrice: (packageId: string, newPriceRwf: number) => void;
  submitTestimonial: (t: Omit<Testimonial, 'id' | 'approved' | 'createdAt'>) => void;
  approveTestimonial: (id: string) => void;
  createJobAlert: (alert: Omit<JobAlert, 'id' | 'createdAt'>) => void;
  reportAdvert: (advertId: string, reason: string, details: string, contact: string) => void;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  incrementAdvertViews: (advertId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Toast Notification System (Available to all actions)
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('akazi_lang');
    return (saved === 'rw' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('akazi_lang', lang);
  };

  // 1.5 Theme Settings: Light, Dark, White
  const [theme, setThemeState] = useState<'light' | 'dark' | 'white'>(() => {
    const saved = localStorage.getItem('akazi_theme');
    return (saved === 'dark' || saved === 'white' || saved === 'light') ? saved : 'light';
  });

  const setTheme = (newTheme: 'light' | 'dark' | 'white') => {
    setThemeState(newTheme);
    localStorage.setItem('akazi_theme', newTheme);
    const msg = newTheme === 'dark' 
      ? (language === 'rw' ? 'Mwahisemo uburyo bwijimye (Dark Mode)' : 'Switched to Dark Mode (Smoky Obsidian)') 
      : newTheme === 'white' 
      ? (language === 'rw' ? 'Mwahisemo uburyo bw\'umweru (White Mode)' : 'Switched to Pure White Mode') 
      : (language === 'rw' ? 'Mwahisemo uburyo busanzwe (Light Mode)' : 'Switched to Light Mode');
    showToast(msg);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('white', 'light');
      document.body.style.backgroundColor = '#0B0F19';
      document.body.style.color = '#F8FAFC';
    } else if (theme === 'white') {
      root.classList.remove('dark');
      root.classList.add('white');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#020617';
    } else {
      root.classList.remove('dark', 'white');
      root.classList.add('light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  // 2. Private Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('akazi_admin_session') === 'active';
  });

  const adminLogin = (password: string) => {
    const trimmed = password.trim();
    if (trimmed === 'admin2026' || trimmed === 'akazi2026' || trimmed === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('akazi_admin_session', 'active');
      showToast(language === 'rw' ? 'Winjiye mu buyobozi bukuru (Admin Console)' : 'Authenticated into Akazi Admin Management Portal');
      return true;
    }
    showToast(language === 'rw' ? 'Ijambobanga ry\'ubuyobozi si ryo' : 'Invalid admin security credentials');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('akazi_admin_session');
    showToast(language === 'rw' ? 'Wasohotse mu buyobozi' : 'Exited Admin Console');
  };

  // Account Requests (Organizations & Authors requesting dashboard permission)
  const [accountRequests, setAccountRequests] = useState<AccountApprovalRequest[]>(() => {
    const saved = localStorage.getItem('akazi_account_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'req-001',
        userId: 'user-poster-kigali-fresh',
        name: 'Jean-Damascene Rurangwa',
        email: 'hiring@kigalifresh.rw',
        phone: '+250 788 443 112',
        requestedRole: 'poster',
        organizationName: 'Kigali Fresh Agribusiness Ltd',
        rdbTin: '109847291',
        description: 'Commercial agribusiness hiring 12 agronomists and packaging engineers in Musanze and Rwamagana.',
        status: 'pending',
        submittedAt: '2026-09-30T10:15:00Z'
      },
      {
        id: 'req-002',
        userId: 'user-author-habimana',
        name: 'Gisele Umubyeyi',
        email: 'gisele.umubyeyi@kigalibooks.rw',
        phone: '+250 788 901 234',
        requestedRole: 'author',
        organizationName: 'Great Lakes Heritage Publications',
        rdbTin: '104829103',
        description: 'Author and publisher of Kinyarwanda children educational literature seeking homepage book showcase.',
        status: 'approved',
        passkey: 'AKZ-PUB-9120',
        grantedAt: '2026-10-01T09:00:00Z',
        submittedAt: '2026-10-01T08:30:00Z'
      },
      {
        id: 'req-003',
        userId: 'user-irembo-hr',
        name: 'Aline Uwase',
        email: 'careers@irembo.gov.rw',
        phone: '+250 788 234 567',
        requestedRole: 'poster',
        organizationName: 'Irembo GovTech Rwanda',
        rdbTin: '102938475',
        description: 'Verified GovTech agency hiring software engineers, security leads and product managers.',
        status: 'approved',
        passkey: 'AKZ-EMP-2026',
        grantedAt: '2026-09-28T11:00:00Z',
        submittedAt: '2026-09-28T09:00:00Z'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('akazi_account_requests', JSON.stringify(accountRequests));
  }, [accountRequests]);

  // Active Partner session (Employer or Publisher using authorized passkey)
  const [activePartner, setActivePartner] = useState<AccountApprovalRequest | null>(() => {
    const saved = localStorage.getItem('akazi_active_partner');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const partnerLogin = (passkey: string): boolean => {
    const cleanKey = passkey.trim().toUpperCase();
    const match = accountRequests.find(r => r.status === 'approved' && r.passkey?.toUpperCase() === cleanKey);
    if (match) {
      setActivePartner(match);
      localStorage.setItem('akazi_active_partner', JSON.stringify(match));
      showToast(language === 'rw' 
        ? `Murakaza neza! Winjiye muri portal ya ${match.organizationName}` 
        : `Authorized! Accessed partner workspace for ${match.organizationName}`);
      return true;
    }
    showToast(language === 'rw' 
      ? 'Umufunguzo (Passkey) ntiwemewe cyangwa nturasinyirwa n\'umuyobozi' 
      : 'Invalid or unapproved partner passkey. Contact the moderator.');
    return false;
  };

  const partnerLogout = () => {
    setActivePartner(null);
    localStorage.removeItem('akazi_active_partner');
    showToast(language === 'rw' ? 'Wasohotse muri portal' : 'Logged out from partner workspace');
  };

  const submitAccountRequest = (reqData: Omit<AccountApprovalRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newReq: AccountApprovalRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setAccountRequests(prev => [newReq, ...prev]);
    showToast(language === 'rw' 
      ? 'Ubusabe bwo kwemererwa bwoherejwe! Umuyobozi (Moderator) arabusuzuma.' 
      : 'Verification request submitted! Moderator will review and issue your partner passkey.');
  };

  const approveAccountRequest = (requestId: string, customPasskey?: string): string => {
    const generatedKey = customPasskey?.trim() || `AKZ-${Math.random() > 0.5 ? 'EMP' : 'PUB'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const grantedTime = new Date().toISOString();

    setAccountRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'approved' as const,
          passkey: generatedKey,
          grantedAt: grantedTime
        };
      }
      return r;
    }));

    const req = accountRequests.find(r => r.id === requestId);
    showToast(`Permission granted to ${req?.organizationName || 'account'}! Passkey issued: ${generatedKey}`);
    return generatedKey;
  };

  const rejectAccountRequest = (requestId: string, reason: string) => {
    setAccountRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected' as const, rejectionReason: reason } : r));
    showToast(`Access request rejected. Reason: ${reason}`);
  };

  const revokeAccountRequest = (requestId: string) => {
    setAccountRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'rejected' as const,
          rejectionReason: 'Access revoked by administrator'
        };
      }
      return r;
    }));
    // If the revoked partner is currently active, logout
    if (activePartner?.id === requestId) {
      partnerLogout();
    }
    showToast('Partner authorization passkey revoked.');
  };

  // 3. Adverts
  const [adverts, setAdverts] = useState<Advert[]>(() => {
    const saved = localStorage.getItem('akazi_adverts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ADVERTS;
  });

  // 4. Packages
  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('akazi_packages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PACKAGES;
  });

  // 5. Addons
  const [addons] = useState<Addon[]>(INITIAL_ADDONS);

  // 6. Books
  const [books, setBooks] = useState<BookItem[]>(() => {
    const saved = localStorage.getItem('akazi_books');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BOOKS;
  });

  // 7. Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('akazi_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TESTIMONIALS;
  });

  // 8. Articles
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);

  // 9. Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('akazi_saved_jobs');
    return saved ? JSON.parse(saved) : ['adv-001', 'adv-003'];
  });

  // 10. Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('akazi_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'app-sample-1',
        advertId: 'adv-001',
        jobTitle: 'Senior Full Stack Software Engineer (FinTech & GovTech)',
        companyName: 'Irembo GovTech',
        applicantName: 'David Ishimwe',
        email: 'ishimwedavid140@gmail.com',
        phone: '+250 788 785 514',
        cvFileName: 'David_Ishimwe_Fullstack_CV.pdf',
        coverNote: 'Experienced building responsive Rwandan GovTech & digital financial interfaces.',
        status: 'shortlisted',
        submittedAt: '2026-09-28T14:00:00Z'
      }
    ];
  });

  // 11. Alerts
  const [alerts, setAlerts] = useState<JobAlert[]>(() => {
    const saved = localStorage.getItem('akazi_alerts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'alt-01',
        keywords: 'Software, Technology',
        category: 'technology',
        district: 'Kigali',
        channel: 'whatsapp',
        destination: '+250 788 785 514',
        frequency: 'daily',
        createdAt: '2026-09-20'
      }
    ];
  });

  // 12. Transactions
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('akazi_transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tx-1001',
        advertId: 'adv-001',
        advertTitle: 'Senior Full Stack Software Engineer',
        amountRwf: 45000,
        method: 'mtn_momo',
        phoneNumber: '+250788123456',
        providerRef: 'MOMO-RW-98234812',
        status: 'completed',
        paidAt: '2026-09-25T08:05:00Z'
      }
    ];
  });

  // 13. Reports
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('akazi_reports');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('akazi_adverts', JSON.stringify(adverts));
  }, [adverts]);

  useEffect(() => {
    localStorage.setItem('akazi_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('akazi_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('akazi_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('akazi_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('akazi_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('akazi_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('akazi_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('akazi_reports', JSON.stringify(reports));
  }, [reports]);

  // Methods
  const toggleSaveJob = (advertId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(advertId);
      if (exists) {
        showToast(language === 'rw' ? 'Umurimo wakuwe mu byo wambitse' : 'Job removed from saved list');
        return prev.filter(id => id !== advertId);
      } else {
        showToast(language === 'rw' ? 'Umurimo wabitswe neza!' : 'Job saved to your list!');
        return [...prev, advertId];
      }
    });
  };

  const isJobSaved = (advertId: string) => savedJobIds.includes(advertId);

  const submitApplication = (appData: Omit<Application, 'id' | 'submittedAt' | 'status'>) => {
    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);

    // Increment application count on advert
    setAdverts(prev => prev.map(adv => adv.id === appData.advertId ? {
      ...adv,
      applicationsCount: adv.applicationsCount + 1
    } : adv));

    showToast(language === 'rw' ? 'Ubusabe bwawe bwakiriwe neza! Nta kiguzi wishyuzwa.' : 'Application submitted successfully! Free of charge.');
    return true;
  };

  const createAdvert = (
    advertData: Omit<Advert, 'id' | 'slug' | 'createdAt' | 'views' | 'applicationsCount' | 'status'>,
    paymentMethod: 'mtn_momo' | 'airtel_money' | 'card' | 'bank_invoice',
    phoneForPayment?: string
  ) => {
    const id = `adv-${Date.now()}`;
    const slug = `${advertData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id.slice(-4)}`;
    
    // Calculate total price based on package + addons
    const selectedPkg = packages.find(p => p.id === advertData.packageId) || packages[0];
    let totalPrice = selectedPkg.priceRwf;
    advertData.addons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) totalPrice += addon.priceRwf;
    });

    const newAdvert: Advert = {
      ...advertData,
      id,
      slug,
      status: 'pending_review', // Section 6.2: Awaiting Payment -> Pending Review -> Live
      views: 0,
      applicationsCount: 0,
      createdAt: new Date().toISOString()
    };

    // If it's a book advert, also create an entry in books list
    if (advertData.type === 'book') {
      const newBook: BookItem = {
        id: `book-${Date.now()}`,
        slug,
        title: advertData.title,
        author: advertData.companyName,
        genre: 'General & Professional',
        language: 'English & Kinyarwanda',
        priceRwf: 10000,
        coverUrl: advertData.companyLogo || '/src/assets/images/book_rwanda_innovation_1790885239551.jpg',
        synopsis: advertData.description,
        authorBio: `Published author in Kigali. Contact: ${advertData.posterPhone}`,
        phoneContact: advertData.posterPhone,
        buyLink: advertData.applicationUrl || `https://wa.me/${advertData.posterPhone.replace(/[^0-9]/g, '')}`,
        isFeaturedWeek: advertData.packageId === 'book_featured',
        status: 'pending_review',
        createdAt: new Date().toISOString()
      };
      setBooks(prev => [newBook, ...prev]);
    }

    // Record Transaction
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      advertId: id,
      advertTitle: advertData.title,
      amountRwf: totalPrice,
      method: paymentMethod,
      phoneNumber: phoneForPayment || advertData.posterPhone,
      providerRef: `${paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: 'completed',
      paidAt: new Date().toISOString()
    };

    setTransactions(prev => [newTx, ...prev]);
    setAdverts(prev => [newAdvert, ...prev]);

    showToast(language === 'rw' 
      ? 'Kwishyura byagenze neza! Itangazo ryashyizwe mu gusuzumwa (masaha 24).' 
      : 'Payment confirmed! Advert submitted for 24h moderation review.');

    return newAdvert;
  };

  const approveAdvert = (id: string) => {
    setAdverts(prev => prev.map(adv => adv.id === id ? { ...adv, status: 'live' as const } : adv));
    setBooks(prev => prev.map(b => b.id === id ? { ...b, status: 'live' as const } : b));
    showToast(language === 'rw' ? 'Itangazo ryemejwe kandi riri live!' : 'Advert approved and now live!');
  };

  const rejectAdvert = (id: string, reason: string) => {
    setAdverts(prev => prev.map(adv => adv.id === id ? { ...adv, status: 'rejected' as const, rejectionReason: reason } : adv));
    showToast(language === 'rw' ? 'Itangazo ryanzwe ryoherejwe gusubirwamo.' : 'Advert rejected with feedback reason.');
  };

  const renewAdvert = (id: string) => {
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 30);
    setAdverts(prev => prev.map(adv => adv.id === id ? {
      ...adv,
      status: 'live' as const,
      startsAt: now.toISOString().slice(0, 10),
      expiresAt: expires.toISOString().slice(0, 10)
    } : adv));
    showToast(language === 'rw' ? 'Itangazo ryavuguruwe indi minsi 30!' : 'Advert renewed for another 30 days!');
  };

  const updatePackagePrice = (packageId: string, newPriceRwf: number) => {
    setPackages(prev => prev.map(pkg => pkg.id === packageId ? { ...pkg, priceRwf: newPriceRwf } : pkg));
    showToast(language === 'rw' ? 'Ibiciro byavuguruwe neza!' : 'Package price updated successfully!');
  };

  const submitTestimonial = (t: Omit<Testimonial, 'id' | 'approved' | 'createdAt'>) => {
    const newTest: Testimonial = {
      ...t,
      id: `test-${Date.now()}`,
      approved: false, // Moderator must approve before showing publicly
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setTestimonials(prev => [newTest, ...prev]);
    showToast(language === 'rw' ? 'Ubuhamya bwakiriwe, buzagaragara bumaze kwemezwa.' : 'Testimonial submitted! It will appear once approved by moderator.');
  };

  const approveTestimonial = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
    showToast('Testimonial approved!');
  };

  const createJobAlert = (alertData: Omit<JobAlert, 'id' | 'createdAt'>) => {
    const newAlert: JobAlert = {
      ...alertData,
      id: `alt-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setAlerts(prev => [newAlert, ...prev]);
    showToast(language === 'rw' ? 'Ubutumwa bwo kukumenyesha bwashyizweho neza!' : 'Job alert activated! You will receive new matches.');
  };

  const reportAdvert = (advertId: string, reason: string, details: string, contact: string) => {
    const adv = adverts.find(a => a.id === advertId);
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      advertId,
      advertTitle: adv ? adv.title : 'Advert',
      reason,
      details,
      reporterContact: contact,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);

    // Section 6.3 Trust rule: 3 reports auto-hide pending review
    const allReportsForAdvert = [...reports, newReport].filter(r => r.advertId === advertId);
    if (allReportsForAdvert.length >= 3) {
      setAdverts(prev => prev.map(a => a.id === advertId ? { ...a, status: 'pending_review' as const } : a));
      showToast(language === 'rw' ? 'Itangazo ryahagaritswe by\'agateganyo kubera amakuru yatanzwe.' : 'Advert temporarily hidden pending investigation after 3 reports.');
    } else {
      showToast(language === 'rw' ? 'Ubutumwa bwawe bwakiriwe. Turasuzuma iri tangazo.' : 'Report submitted. Our moderation team will investigate.');
    }
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status } : app));
    showToast(`Candidate marked as ${status}`);
  };

  const incrementAdvertViews = (advertId: string) => {
    setAdverts(prev => prev.map(adv => adv.id === advertId ? { ...adv, views: adv.views + 1 } : adv));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        accountRequests,
        activePartner,
        partnerLogin,
        partnerLogout,
        submitAccountRequest,
        approveAccountRequest,
        rejectAccountRequest,
        revokeAccountRequest,
        adverts,
        packages,
        addons,
        books,
        testimonials,
        articles,
        savedJobIds,
        applications,
        alerts,
        transactions,
        reports,
        toastMessage,
        showToast,
        toggleSaveJob,
        isJobSaved,
        submitApplication,
        createAdvert,
        approveAdvert,
        rejectAdvert,
        renewAdvert,
        updatePackagePrice,
        submitTestimonial,
        approveTestimonial,
        createJobAlert,
        reportAdvert,
        updateApplicationStatus,
        incrementAdvertViews
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
