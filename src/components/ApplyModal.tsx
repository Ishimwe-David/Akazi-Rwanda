import React, { useState } from 'react';
import { Advert } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  X, 
  Upload, 
  CheckCircle, 
  ShieldCheck, 
  FileText, 
  Lock, 
  AlertCircle 
} from 'lucide-react';

interface ApplyModalProps {
  advert: Advert;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ advert, isOpen, onClose }) => {
  const { language, submitApplication } = useApp();
  const t = translations[language];

  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+250 78');
  const [coverNote, setCoverNote] = useState('');
  const [cvFileName, setCvFileName] = useState('My_Updated_Resume_2026.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) {
      setErrorMsg(language === 'rw' ? 'Nyamuneka shyiramo amazina yawe' : 'Please provide your full name');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg(language === 'rw' ? 'Shyiramo email yizewe' : 'Please provide a valid email address');
      return;
    }
    if (phone.length < 8) {
      setErrorMsg(language === 'rw' ? 'Shyiramo numero ya telefone' : 'Please provide a valid phone number');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitApplication({
        advertId: advert.id,
        jobTitle: advert.title,
        companyName: advert.companyName,
        applicantName,
        email,
        phone,
        cvFileName: cvFileName || 'Resume.pdf',
        coverNote
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {language === 'rw' ? 'Ubusabe Bwakiriwe Neza!' : 'Application Submitted!'}
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {language === 'rw'
                ? `Ubusabe bwawe bwoze muri ${advert.companyName} ku mwanya wa "${advert.title}". Buri gihe bisuzumwa n'umukoresha bitarenze iminsi 7.`
                : `Your application has been delivered to ${advert.companyName} for "${advert.title}". The hiring team has received your CV.`}
            </p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
              {language === 'rw'
                ? 'Icyitonderwa: Nta mafaranga uzigera wishyuzwa. Ubumenyi bwawe n\'impano byonyine nibyo bishingirwaho.'
                : 'Reminder: Akazi applications are 100% free. Never pay anyone claiming to guarantee placement.'}
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'rw' ? 'Funga' : 'Done & Return to Jobs'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="mb-5 pr-8">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                {language === 'rw' ? 'Gusaba Akazi Ako Kanya' : 'Direct Application'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                {advert.title}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                <span>{advert.companyName}</span>
                <span className="mx-1.5">·</span>
                <span>{advert.district}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Amazina Yombi *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Marie Claire Uwase"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'rw' ? 'Email *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="uwase@example.rw"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'rw' ? 'Telefone (MoMo / WhatsApp) *' : 'Phone (WhatsApp/MoMo) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ohereza CV (PDF cyangwa DOCX) *' : 'Attach CV / Resume (PDF or DOCX, max 5MB) *'}
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-3.5 text-center bg-slate-50 hover:bg-emerald-50/20 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleSimulateUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate max-w-xs">{cvFileName}</span>
                    <span className="text-[11px] text-slate-400">({language === 'rw' ? 'Kanda uhindure' : 'Click to change'})</span>
                  </div>
                </div>
              </div>

              {/* Brief Cover Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ubutumwa bugufi (Cover Note) - Ntabwo ari itegeko' : 'Brief Cover Note (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={language === 'rw' ? 'Sobanura muri make impamvu wifuza uyu mwanya...' : 'Highlight 2-3 key accomplishments relevant to this position...'}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Security & Privacy note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'rw'
                    ? 'Amakuru yawe arinzwe hakurikijwe itegeko No. 058/2021 ryerekeye kurinda amakuru bwite.'
                    : 'Your information is kept strictly private and shared only with the hiring employer.'}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-4 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'rw' ? 'Hagarika' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {isSubmitting 
                    ? (language === 'rw' ? 'Biri koherezwa...' : 'Submitting...') 
                    : (language === 'rw' ? 'Ohereza Ubusabe (Ku Buntu)' : 'Submit Application (Free)')}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
