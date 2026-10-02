import React, { useState } from 'react';
import { Advert } from '../types';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface ReportModalProps {
  advert: Advert;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ advert, isOpen, onClose }) => {
  const { language, reportAdvert } = useApp();
  const [reason, setReason] = useState('fees_requested');
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reportAdvert(advert.id, reason, details, contact);
    try {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertId: advert.id, reason, details, contact }),
      });
    } catch (err) {
      console.warn('Backend report logging offline, local state preserved:', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'rw' ? 'Raporo Yakiriwe' : 'Report Received'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'rw'
                ? 'Urakoze kudufasha gukomeza kugira urubuga rwizewe. Ikipe yacu irakora isuzuma ryimbitse.'
                : 'Thank you for helping keep Akazi clean and trustworthy. Our moderation team will investigate this listing immediately.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                {language === 'rw' ? 'Funga' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-base font-bold text-slate-900">
                {language === 'rw' ? 'Kurega iri Tangazo' : 'Report this Advert'}
              </h2>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {language === 'rw'
                ? `Uri kurega: "${advert.title}" ryatanzwe na ${advert.companyName}.`
                : `Reporting: "${advert.title}" by ${advert.companyName}.`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Impamvu y\'Ikirego *' : 'Reason for Report *'}
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="fees_requested">
                    {language === 'rw' ? 'Bari kwaka amafaranga yo gusaba (Bitemewe)' : 'Employer is asking for money/application fee (Strictly Banned)'}
                  </option>
                  <option value="fake_job">
                    {language === 'rw' ? 'Umurimo w\'igihimbano / Ntabwo ubaho' : 'Fake job / Suspicious company'}
                  </option>
                  <option value="misleading">
                    {language === 'rw' ? 'Ibisobanuro biyobya / Amakuru atari yo' : 'Misleading requirements or compensation'}
                  </option>
                  <option value="discrimination">
                    {language === 'rw' ? 'Ivangura ritemewe n\'amategeko' : 'Discriminatory or offensive content'}
                  </option>
                  <option value="expired">
                    {language === 'rw' ? 'Itariki yararenze cyangwa umwanya waruzuye' : 'Job already filled or expired'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ibisobanuro birambuye *' : 'Additional Details *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={language === 'rw' ? 'Sobanura ibyabaye cyangwa ubutumwa baguhaye...' : 'Describe what happened (e.g. they sent a message requesting 5,000 RWF for an interview)...'}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Aho bakubona (Email cyangwa Telefone)' : 'Your Contact (Email or Phone)'}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+250 78... or your@email.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {language === 'rw' ? 'Hagarika' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
                >
                  {language === 'rw' ? 'Ohereza Ikirego' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
