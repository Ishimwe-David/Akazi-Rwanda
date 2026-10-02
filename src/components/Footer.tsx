import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { LegalModal } from './LegalModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink,
  Lock,
  FileText,
  Scale
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenAdminAccess?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage } = useApp();
  const t = translations[language];

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'rules'>('privacy');

  const handleOpenLegal = (tab: 'privacy' | 'terms' | 'rules') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anti-Scam Banner - Core Value: Trust is the product */}
        <div className="mb-10 p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white tracking-wide uppercase">
                {language === 'rw' ? 'Umutekano n\'Icyizere Ku Basaba Akazi' : 'Zero Application Fees Guarantee'}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.footer.antiScam}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('help')}
            className="self-start sm:self-center px-3.5 py-1.5 text-xs font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            {language === 'rw' ? 'Soma Amabwiriza' : 'Safety Guide'}
          </button>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-sm">
          
          {/* Col 1: Brand & Principles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base">
                A
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Akazi<span className="text-emerald-400">.com</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              {t.footer.tagline}
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'rw' ? 'Ibyerekezo By\'Ibanze' : 'Quick Navigation'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.jobs}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.internships}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.books}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advice')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.advice}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.testimonials}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Employers & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'rw' ? 'Abakoresha n\'Amategeko' : 'Employers & Legal'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('post-advert')} className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer">
                  + {t.nav.postAdvert}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('employers')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.employers} (Bundles & Quotes)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partner-portal')} className="hover:text-white text-emerald-400/90 transition-colors cursor-pointer">
                  Partner Portal (Authorized Passkey)
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  {t.footer.privacy} (Law No. 058/2021)
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenLegal('rules')} className="hover:text-white transition-colors cursor-pointer">
                  {t.footer.advertRules}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.contactDirect}
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <a 
                href="tel:+250788785514"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono tabular-nums">{t.footer.phone}</span>
              </a>
              <a 
                href="https://wa.me/250788785514" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: +250 788 785 514</span>
              </a>
              <a 
                href="mailto:info@akazi.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.footer.email}</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-slate-400 leading-snug">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright on Left, Privacy & Terms of Use IN THE MIDDLE, Language & Staff on Right */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>© 2026 Akazi.com. {t.footer.rights}</span>
          </div>

          {/* MIDDLE: Privacy, Terms of Use (Fits neatly in the center) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-300">
            <button
              onClick={() => handleOpenLegal('privacy')}
              className="hover:text-emerald-400 transition-colors cursor-pointer hover:underline underline-offset-4 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.footer.privacy}</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleOpenLegal('terms')}
              className="hover:text-emerald-400 transition-colors cursor-pointer hover:underline underline-offset-4 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.footer.terms}</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleOpenLegal('rules')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer hover:underline underline-offset-4 text-[11px]"
            >
              <span>{t.footer.advertRules}</span>
            </button>
          </div>

          {/* Right: Language & Staff portal */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500">Language:</span>
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-300'}`}
              >
                EN
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={() => setLanguage('rw')}
                className={`cursor-pointer ${language === 'rw' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-300'}`}
              >
                RW
              </button>
            </div>
          </div>
        </div>

        {/* Very Bottom Centered Legal Compliance Strip */}
        <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <button
              onClick={() => handleOpenLegal('privacy')}
              className="hover:text-emerald-400 transition-colors cursor-pointer font-medium"
            >
              {language === 'rw' 
                ? 'Politiki y\'Amakuru Bwite (Itegeko No. 058/2021 ryerekeye kurinda amakuru bwite)' 
                : 'Privacy Policy (Rwanda Law No. 058/2021 on Personal Data Protection)'}
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleOpenLegal('terms')}
              className="hover:text-emerald-400 transition-colors cursor-pointer font-medium"
            >
              {language === 'rw' 
                ? 'Amategeko y\'Imikoreshereze (Terms of Use & Fair Recruitment Standard)' 
                : 'Terms of Use & Fair Recruitment Standard'}
            </button>
            <span className="text-slate-700">·</span>
            <span>Kigali, Rwanda</span>
          </div>
        </div>

      </div>

      {/* Interactive Comprehensive Legal Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </footer>
  );
};
