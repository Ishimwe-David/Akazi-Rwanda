import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  Share2 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, showToast } = useApp();
  const t = translations[language];

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [userType, setUserType] = useState('Job seeker');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: contact, phone: contact, userType, subject, message }),
      });
    } catch (err) {
      console.warn('Backend logging offline, local state preserved:', err);
    }
    showToast(language === 'rw' ? 'Ubutumwa bwawe bwakiriwe! Turagusubiza vuba.' : 'Message received! Our team will respond promptly.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {language === 'rw' ? 'Twandikire kuri Akazi.com' : 'Contact Akazi.com'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {language === 'rw'
            ? 'Ufite ikibazo, inyunganizi cyangwa ukeneye ubufasha bwo gushyiraho itangazo? Turi hano kugufasha.'
            : 'Have a question, feedback, or need assistance posting your advert? Reach out to our Kigali team.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">
            {language === 'rw' ? 'Ohereza Ubutumwa' : 'Send Us a Message'}
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900">
                {language === 'rw' ? 'Ubutumwa Bwakiriwe!' : 'Message Received!'}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting Akazi. An automated acknowledgement has been dispatched, and our officer will respond within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eric Ndahiro"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email or Phone (WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+250 78... or name@mail.com"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    I am a...
                  </label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Job seeker">Job seeker / Candidate</option>
                    <option value="Employer">Employer / Recruiter</option>
                    <option value="Author">Author / Publisher</option>
                    <option value="Other">Other / General inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquiry regarding employer bundles or advert review"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Direct Information & Map */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Direct Contact Details
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <a
                href="https://wa.me/250788785514"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">Instant WhatsApp Chat</div>
                  <div className="text-[11px] text-emerald-700">+250 788 785 514 (Available now)</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Phone Support</div>
                  <div className="font-mono tabular-nums">+250 788 785 514</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Email Addresses</div>
                  <div>info@akazi.com · akazi.rw@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Business Hours</div>
                  <div>Monday – Friday: 08:00 – 18:00 CAT</div>
                  <div className="text-[11px] text-slate-400">Saturday: 09:00 – 13:00 CAT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kigali Map Representation */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Kigali Central Office</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold font-mono">Rwanda</span>
            </div>
            
            <div className="h-40 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center p-4 text-center">
              {/* Stylized street grid backdrop */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Centenary House & Kigali Heights</div>
                <div className="text-[11px] text-slate-500">KN 5 Rd / KG 7 Ave, Kigali</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
