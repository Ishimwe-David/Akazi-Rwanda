import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, Scale, X, Lock, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'rules';
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTab = 'privacy' 
}) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'rules'>(initialTab);

  // Sync tab when opened with new initialTab
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {language === 'rw' ? 'Amategeko n\'Umutekano kuri Akazi.com' : 'Legal & Trust Framework · Akazi.com Rwanda'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'rw' 
                  ? 'Ubwubahirize bw\'Itegeko No. 058/2021 ryerekeye kurinda amakuru bwite n\'umutekano' 
                  : 'Compliance with Rwanda Law No. 058/2021 & National Fair Recruitment Standards'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'rw' ? 'Politiki y\'Amakuru Bwite' : 'Privacy Policy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'rw' ? 'Amategeko y\'Imikoreshereze' : 'Terms of Use'}</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'rw' ? 'Amabwiriza y\'Amatangazo' : 'Advert & Safety Rules'}</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs">
                <strong>Legal Basis:</strong> Akazi.com operates in strict compliance with <strong>Law No. 058/2021 of 13/10/2021 relating to the protection of personal data and privacy in the Republic of Rwanda</strong>.
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  1. Information We Collect
                </h3>
                <p>
                  When applying for a position, job seekers provide contact information (full name, phone number, email address) and CV attachments. We do not require account registration, passwords, or banking credentials from job seekers.
                </p>
                <p>
                  For employers and authors, we collect official organization details, RDB registration TIN numbers where applicable, and contact representative information for invoice and MoMo verification.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  2. Purpose & Use of Personal Data
                </h3>
                <p>
                  Candidate data is strictly processed to transmit job applications directly to the verified employer who published the advert. Akazi.com never sells, leases, or trades candidate profiles or CVs to commercial third-party marketing firms.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  3. Data Retention & Right to Erasure
                </h3>
                <p>
                  In accordance with Article 40 of Law No. 058/2021, candidates have the right to request deletion of their submitted resumes or contact history at any time by emailing <code>privacy@akazi.com</code> or sending a written notice via our WhatsApp helpline (+250 788 785 514).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  4. Security Standards
                </h3>
                <p>
                  Uploaded CVs and application records are encrypted in transit via SSL/TLS and stored on secured cloud infrastructure with restricted moderator access protocols.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF USE */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs">
                <strong>Zero Application Fees Guarantee:</strong> Charging job seekers or students any money to apply, interview, or undergo medical checks for a job listed on Akazi is illegal and strictly forbidden.
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing Akazi.com or submitting adverts, applications, or bookstore items, you agree to abide by these Terms of Use and Rwandan applicable commercial regulations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  2. Employer & Poster Obligations
                </h3>
                <p>
                  Employers guarantee that all published vacancies represent genuine, currently open livelihood opportunities with accurate descriptions, legal working conditions under the Rwandan Labor Code, and truthful remuneration details.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  3. Pricing & Payments
                </h3>
                <p>
                  All advert pricing is denominated in Rwandan Francs (RWF) with zero hidden transaction costs. Advert listing fees paid via MTN MoMo, Airtel Money, or bank transfer are non-refundable once an advert is vetted and goes live, except where an advert is rejected by our moderation team and the poster declines to submit corrections.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  4. Author Bookstore Marketplace
                </h3>
                <p>
                  Authors maintain full copyright of their original publications. Akazi facilitates author spotlight promotion and direct reader-to-author WhatsApp connection without taking publisher royalties.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ADVERT RULES & SAFETY */}
          {activeTab === 'rules' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Prohibited Listings (Zero Tolerance Policy)
                </h3>
                <p>
                  To preserve the highest degree of trust in Rwanda, the following categories are strictly barred from publication on Akazi:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
                    <span className="font-bold text-rose-600">✕</span>
                    <span>Multi-Level Marketing (MLM), pyramid structures, or referral fee programs.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
                    <span className="font-bold text-rose-600">✕</span>
                    <span>Any vacancy demanding candidate deposits, training purchases, or badge fees.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
                    <span className="font-bold text-rose-600">✕</span>
                    <span>Unregistered overseas agency jobs without verified legal clearance.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
                    <span className="font-bold text-rose-600">✕</span>
                    <span>Deceptive, misleading, or ambiguous business opportunities.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Reporting Suspicious Listings
                </h3>
                <p>
                  Any visitor can click &ldquo;Report Advert&rdquo; on any vacancy card. If three verified reports are logged against an advert, it is automatically quarantined pending investigation by our Kigali compliance officer.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Official Policy Updated: January 2026 · Kigali, Rwanda</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
          >
            {language === 'rw' ? 'Nabyumvise (Funga)' : 'Understood · Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
