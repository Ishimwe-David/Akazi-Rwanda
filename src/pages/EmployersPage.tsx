import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Check, 
  ArrowRight, 
  Send, 
  Briefcase, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2,
  FileSpreadsheet,
  Key
} from 'lucide-react';
import { ServicesOffersSection } from '../components/ServicesOffersSection';

interface EmployersPageProps {
  onNavigatePost: () => void;
  onNavigatePortal?: () => void;
  onNavigate?: (route: string, params?: any) => void;
}

export const EmployersPage: React.FC<EmployersPageProps> = ({ onNavigatePost, onNavigatePortal, onNavigate }) => {
  const { language, packages, showToast } = useApp();
  const t = translations[language];

  const [quoteOrgName, setQuoteOrgName] = useState('');
  const [quoteContactName, setQuoteContactName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('+250 78');
  const [quoteHiringNeeds, setQuoteHiringNeeds] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const bundlePackages = packages.filter(p => p.id.startsWith('bundle'));

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    showToast(language === 'rw' ? 'Icyifuzo cyo gushaka abakozi cyakiriwe!' : 'Recruitment consultancy request submitted! Our team will contact you.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Value Pitch Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'rw' ? 'Urubuga rw\'Abakoresha mu Rwanda' : 'Akazi for Employers & Institutions'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {language === 'rw'
              ? 'Shaka Abakozi Bashoboye Kandi Bakwiriye, Byihuse Kandi Bidahenze.'
              : 'Hire Verified Rwandan Talent Faster. Zero Friction, Transparent Pricing.'}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'rw'
              ? 'Akazi gafasha ibigo bya Leta, ibyigenga n\'imiryango itegamiye kuri Leta kugera ku nzobere n\'abanyeshuri basoje amashuri mu Rwanda hose. Buri tangazo rihita rigera ku basaba akazi bakwiriye.'
              : 'Akazi connects government agencies, corporations, NGOs, and growing SMEs with accredited professionals across Kigali and all 30 Rwandan districts. Every advert is verified for high candidate trust.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigatePost}
              className="px-6 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>{language === 'rw' ? 'Shyiraho Itangazo Ryambere' : 'Post Single Advert (from 10k RWF)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onNavigatePortal && (
              <button
                onClick={onNavigatePortal}
                className="px-5 py-3 text-xs font-semibold text-slate-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authorized Partner Portal</span>
              </button>
            )}
            <a
              href="#bundles"
              className="px-5 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            >
              View Employer Bundles
            </a>
          </div>
        </div>

        {/* High-Fidelity Office Visual */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="/src/assets/images/employer_rwanda_office_1790885250817.jpg"
              alt="Rwandan hiring managers in modern Kigali office"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-white text-xs">
                <div className="font-bold">Kigali Corporate Hiring Hub</div>
                <div className="text-slate-300 text-[11px]">Streamlined shortlisting & applicant tracking for Rwandan teams.</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Core Employer Tools Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'rw' ? 'Ibikoresho Bihariye By\'Abakoresha' : 'Complete Toolkit for Rwandan Hiring Teams'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Built specifically to save time, eliminate fake candidate noise, and maintain audit records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">RDB Verified Employer Badge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify your RDB TIN number once and receive an accredited badge that increases qualified candidate applications by over 60%.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Candidate Pipeline & Shortlisting</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review applicant CVs in one place, change candidate statuses from submitted to shortlisted, and export full applicant CSVs for your HR committee.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Multi-Channel Broadcast</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Targeted distribution across Akazi email digests, verified WhatsApp job subscriber lists, and social media channels across Rwanda.
            </p>
          </div>
        </div>
      </div>

      {/* Services & What Akazi Offers */}
      <ServicesOffersSection onNavigate={onNavigate || onNavigatePost} />

      {/* 3. Employer Bundles Section */}
      <div id="bundles" className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Volume Savings
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Employer Subscription Bundles
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Designed for organizations hiring regularly throughout the fiscal year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {bundlePackages.map(pkg => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-600 p-6 flex flex-col justify-between transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Volume Discount
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{pkg.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {pkg.priceRwf.toLocaleString()} <span className="text-xs font-semibold text-slate-500">RWF</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Valid for {pkg.durationDays} calendar days
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={onNavigatePost}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Purchase Bundle via MoMo or Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Request Recruitment / Headhunting Consultancy Form */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        <div className="max-w-xl">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Recruitment Consultancy
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Need Full Recruitment & Shortlisting Support?
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Our expert talent consultants handle end-to-end headhunting, background checks, technical assessment administration, and candidate interview shortlisting.
          </p>
        </div>

        {quoteSubmitted ? (
          <div className="p-6 bg-emerald-100/60 rounded-xl border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Request Received</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our Senior Talent Consultant in Kigali will review your specifications and reply with a tailored proposal and SLA within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={quoteOrgName}
                  onChange={(e) => setQuoteOrgName(e.target.value)}
                  placeholder="e.g. Kigali Logistics Ltd"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hiring Manager Name *
                </label>
                <input
                  type="text"
                  required
                  value={quoteContactName}
                  onChange={(e) => setQuoteContactName(e.target.value)}
                  placeholder="e.g. Patrick Mugabo"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  placeholder="patrick@company.rw"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={quotePhone}
                  onChange={(e) => setQuotePhone(e.target.value)}
                  placeholder="+250 788 000 000"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Describe the Roles & Expected Timeline *
              </label>
              <textarea
                required
                rows={3}
                value={quoteHiringNeeds}
                onChange={(e) => setQuoteHiringNeeds(e.target.value)}
                placeholder="Number of vacancies, required technical stack or qualifications, target starting date..."
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Custom Recruitment Quote</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
