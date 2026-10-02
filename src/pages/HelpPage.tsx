import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  Search, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  FileText, 
  MessageCircle, 
  Mail, 
  Phone 
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'seekers' | 'posters'>('seekers');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const seekerFaqs = [
    {
      q: 'Do job seekers ever have to pay to view or apply for jobs on Akazi?',
      qRw: 'Ese umuntu ushaka akazi hari icyo yishyura kuri Akazi?',
      a: 'Never. Browsing, searching, applying, and saving jobs on Akazi is 100% free forever. If any employer or individual contacts you claiming to represent Akazi and requests application fees, medical exam money, or interview deposits, do not pay them—report them immediately using the "Report Advert" button.'
    },
    {
      q: 'Do I need an account to apply for a job?',
      qRw: 'Ese nkeneye gufungura konti kugira ngo nsabe akazi?',
      a: 'No account is required! You can apply directly in under 60 seconds by attaching your CV and providing your contact phone number. If you choose to switch to a "Job Seeker" view in the top bar, you can save jobs and track your applications seamlessly.'
    },
    {
      q: 'What formats are supported for CV upload?',
      qRw: 'Ni ubuhe bwoko bwa CV bwemewe kohereza?',
      a: 'We accept PDF (.pdf) and Microsoft Word (.doc, .docx) files up to 5 MB. PDF is strongly recommended to preserve formatting across all devices.'
    },
    {
      q: 'How do I know if an advert is genuine?',
      qRw: 'Namenya nte ko itangazo ari iry\'ukuri?',
      a: 'Every single advert on Akazi is reviewed by our Kigali moderation team before going live. Look for the green "RDB Verified" badge, which confirms the company’s official tax registration and legal standing in Rwanda.'
    }
  ];

  const posterFaqs = [
    {
      q: 'How does payment work for posting an advert?',
      qRw: 'Kwishyura itangazo bikorwa bite?',
      a: 'We support instant Mobile Money (MTN MoMo and Airtel Money in RWF) as well as Visa/Mastercard and official bank invoice transfers for institutions. Upon submitting your advert, an automatic USSD prompt is pushed to your phone.'
    },
    {
      q: 'How long does moderation review take?',
      qRw: 'Gusuzuma itangazo bimara igihe kingana iki?',
      a: 'Our review team inspects listings within 24 hours (usually under 4 hours during business days). Once approved, your advert is published immediately and you receive an SMS/email confirmation.'
    },
    {
      q: 'What happens if my advert is rejected?',
      qRw: 'Bigenda bite iyo itangazo ryanzwe?',
      a: 'If an advert fails to meet our quality standards (e.g., missing requirements or unverified contact info), you will receive a specific feedback reason with a 1-click option to edit and resubmit at no additional charge. If you decline to resubmit, full refunds are processed.'
    },
    {
      q: 'Can I renew an expired advert?',
      qRw: 'Ese nshobora kongerera igihe itangazo ryarangiye?',
      a: 'Yes. From your Poster Dashboard, you can renew any advert for another 30 calendar days with one click, preserving your previous candidate applications.'
    }
  ];

  const currentFaqs = activeTab === 'seekers' ? seekerFaqs : posterFaqs;

  const filteredFaqs = currentFaqs.filter(faq => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {language === 'rw' ? 'Ubufasha n\'Ibibazo Bikunze Kubazwa (FAQ)' : 'Help Center & Frequently Asked Questions'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          {language === 'rw'
            ? 'Bona ibisubizo byihuse ku bijyanye no gusaba akazi, gushyiraho amatangazo, umutekano no kwishyura.'
            : 'Find answers on applying, posting adverts, Mobile Money payments, and candidate safety.'}
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>
      </div>

      {/* Tabs: Seekers vs Posters */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => {
              setActiveTab('seekers');
              setOpenFaqIndex(0);
            }}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'seekers'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.sections.forSeekers}
          </button>
          <button
            onClick={() => {
              setActiveTab('posters');
              setOpenFaqIndex(0);
            }}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'posters'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.sections.forPosters}
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openFaqIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                className="w-full text-left p-4.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
              >
                <span className="font-bold text-xs sm:text-sm text-slate-900">
                  {language === 'rw' && faq.qRw ? faq.qRw : faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4.5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust & Safety Notice Box */}
      <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {language === 'rw' ? 'Umutekano n\'Icyizere Ni Byo Dushyize Imbere' : 'Akazi Safety & Anti-Scam Standard'}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Never pay any application fee. Review our compliance with Rwanda Law No. 058/2021 relating to personal data protection.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/250788785514"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          WhatsApp Support
        </a>
      </div>

      {/* Direct Contact Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
          <Phone className="w-4 h-4 text-emerald-600 mx-auto" />
          <div className="text-xs font-bold text-slate-900">Phone Support</div>
          <div className="text-xs text-slate-500 font-mono">+250 788 785 514</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
          <MessageCircle className="w-4 h-4 text-emerald-600 mx-auto" />
          <div className="text-xs font-bold text-slate-900">Official WhatsApp</div>
          <div className="text-xs text-slate-500">Live 8am - 6pm CAT</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
          <Mail className="w-4 h-4 text-emerald-600 mx-auto" />
          <div className="text-xs font-bold text-slate-900">Helpdesk Email</div>
          <div className="text-xs text-slate-500">info@akazi.com</div>
        </div>
      </div>

    </div>
  );
};
