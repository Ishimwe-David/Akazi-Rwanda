import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { X, Bell, CheckCircle, MessageSquare } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultKeyword?: string;
  defaultDistrict?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose,
  defaultKeyword = '',
  defaultDistrict = 'All Districts (Rwanda)'
}) => {
  const { language, createJobAlert } = useApp();
  const t = translations[language];

  const [keywords, setKeywords] = useState(defaultKeyword);
  const [district, setDistrict] = useState(defaultDistrict);
  const [channel, setChannel] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
  const [destination, setDestination] = useState('+250 78');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createJobAlert({
      keywords: keywords || 'All Opportunities',
      category: 'all',
      district,
      channel,
      destination,
      frequency
    });
    try {
      await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, channel, category: 'all', district }),
      });
    } catch (err) {
      console.warn('Backend alert logging offline, local state preserved:', err);
    }
    setIsSuccess(true);
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

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'rw' ? 'Kumenyeshwa Byashyizweho!' : 'Job Alert Activated!'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'rw'
                ? `Uzajya uhita ubona amatangazo ahuye na "${keywords || 'byose'}" kuri ${destination} buri ${frequency === 'daily' ? 'munsi' : 'cyumweru'}.`
                : `You will receive verified opportunities matching "${keywords || 'all'}" sent to ${destination} on a ${frequency} basis.`}
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
              >
                {language === 'rw' ? 'Bikorewe' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3 text-emerald-600">
              <Bell className="w-5 h-5" />
              <h2 className="text-base font-bold text-slate-900">
                {language === 'rw' ? 'Kwakira Amatangazo Mashya' : 'Create Free Job Alert'}
              </h2>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {language === 'rw'
                ? 'Bona imirimo ijyanye n\'ibyo ushaka bitakugoye, uhite uyisaba mbere y\'uko itariki ntirarengwa igera.'
                : 'Get new verified job and internship openings delivered straight to your WhatsApp or Email.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ijambo Shingiro (Urugero: IT, Accounting, Nurse)' : 'Keywords (e.g. Software, Finance, Agronomy)'}
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. Software Engineer, Marketing, Logistics..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Akarere wifuza' : 'Target District'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Kigali, Musanze, Huye, Rubavu, etc."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'rw' ? 'Aho wifuza ko byoherezwa' : 'Delivery Channel'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setChannel('whatsapp');
                      if (!destination.startsWith('+250')) setDestination('+250 78');
                    }}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      channel === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChannel('email');
                      setDestination('your@email.com');
                    }}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      channel === 'email'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChannel('sms');
                      if (!destination.startsWith('+250')) setDestination('+250 78');
                    }}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      channel === 'sms'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    SMS
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {channel === 'email' ? 'Email Address' : 'Phone Number (WhatsApp/SMS)'}
                </label>
                <input
                  type={channel === 'email' ? 'email' : 'tel'}
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {language === 'rw' ? 'Hagarika' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer"
                >
                  {language === 'rw' ? 'Emeza Ubutumwa (Ku Buntu)' : 'Set Free Alert'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
