import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Article } from '../types';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Send,
  BookOpen
} from 'lucide-react';

export const AdvicePage: React.FC = () => {
  const { language, articles, showToast } = useApp();
  const t = translations[language];

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0]);
  const [cvName, setCvName] = useState('');
  const [cvContact, setCvContact] = useState('');
  const [cvRoleTarget, setCvRoleTarget] = useState('');
  const [cvPackage, setCvPackage] = useState('standard_review');
  const [cvRequested, setCvRequested] = useState(false);

  const handleCvServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCvRequested(true);
    showToast(language === 'rw' ? 'Icyifuzo cyo gutegura CV cyakiriwe!' : 'CV writing consultation request submitted! Our career advisor will contact you.');
  };

  const handleDownloadTemplate = () => {
    // Generate clean text CV template
    const templateContent = `=====================================================
RWANDAN STANDARD PROFESSIONAL CV TEMPLATE (2026)
Compliant with RDB & Kigali Employer Standards
=====================================================

1. PERSONAL DETAILS
--------------------
Full Name: [Your First & Last Name]
Location: Kigali, Rwanda (District, Sector)
Phone: +250 78X XXX XXX (Active WhatsApp / MoMo)
Email: professional.name@gmail.com
LinkedIn: linkedin.com/in/yourprofile

2. PROFESSIONAL PROFILE SUMMARY
-------------------------------
Results-driven [Job Title] with [Number] years of hands-on experience in [Industry/Field] in Rwanda. Proven ability in [Key Competency 1] and [Key Competency 2]. Fluent in English, Kinyarwanda, and French.

3. CORE COMPETENCIES
--------------------
- Competency 1 (e.g., Financial Reconciliation / Full Stack Web Development)
- Competency 2 (e.g., Project Management & Stakeholder Engagement)
- Competency 3 (e.g., Regulatory Compliance & Data Reporting)

4. PROFESSIONAL EXPERIENCE
--------------------------
[Company Name] | Kigali, Rwanda
[Your Job Title] | [Start Date] - Present
- Spearheaded [Achievement with specific metrics, e.g. improved delivery speed by 35%].
- Managed cross-functional coordination with [Key Departments].
- Ensured strict compliance with Rwandan institutional guidelines.

[Previous Company Name] | Kigali, Rwanda
[Junior Job Title] | [Start Date] - [End Date]
- Supported day-to-day operations and reporting.

5. EDUCATION & QUALIFICATIONS
-----------------------------
Bachelor of Science in [Field of Study] | [Graduation Year]
University of Rwanda / [Institution Name], Rwanda

6. PROFESSIONAL CERTIFICATIONS & LANGUAGES
------------------------------------------
- Rwanda TVET Board (RTB) / CPA / PMP (If applicable)
- Languages: English (Fluent), Kinyarwanda (Native), French (Working Proficiency)

7. VERIFIED PROFESSIONAL REFEREES
---------------------------------
1. [Name], [Job Title], [Company], Phone: +250 78X XXX XXX, Email: referee1@org.rw
2. [Name], [Job Title], [Company], Phone: +250 78X XXX XXX, Email: referee2@org.rw
`;

    const blob = new Blob([templateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Akazi_Rwanda_Standard_CV_Template.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('CV Template downloaded!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          Career Guidance & CV Hub
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {language === 'rw' ? 'Inama z\'Umwuga & Imitegurire ya CV' : 'Career Advice & Professional CV Resources'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Free guides, accredited Rwandan resume templates, and optional 1-on-1 CV review services.
        </p>
      </div>

      {/* Free CV Template Download Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Free Community Resource
            </span>
            <h2 className="text-lg sm:text-xl font-bold mt-0.5">
              Official Rwandan Standard CV Template (2026 Edition)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Designed according to recruitment guidelines of top Rwandan banks, Irembo, development NGOs, and the Rwanda Development Board (RDB).
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadTemplate}
          className="w-full md:w-auto px-6 py-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 font-mono"
        >
          <Download className="w-4 h-4" />
          <span>Download Free Template (.txt)</span>
        </button>
      </div>

      {/* Articles Section: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Article Selector List */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Featured Career Guides
          </h2>

          <div className="space-y-3">
            {articles.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/20 shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-emerald-700 uppercase">{art.category}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                    {language === 'rw' ? art.titleRw : art.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'rw' ? art.summaryRw : art.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Article Reading Pane */}
        {selectedArticle && (
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
            {selectedArticle.imageUrl && (
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-xl border border-slate-100 mb-4"
              />
            )}

            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold uppercase">
              <span>{selectedArticle.category}</span>
              <span>·</span>
              <span>Published on {selectedArticle.publishedAt}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {language === 'rw' ? selectedArticle.titleRw : selectedArticle.title}
            </h2>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line pt-2">
              {selectedArticle.content}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Authored by Akazi Career Advisory Board, Kigali</span>
              <button
                onClick={handleDownloadTemplate}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Download Matching CV Template &rarr;
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Paid Optional CV Writing & Career Coaching Service Form */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Professional CV Services
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Need Expert 1-on-1 CV Optimization?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Work directly with a certified Rwandan HR specialist to tailor your resume for senior or international opportunities.
          </p>
        </div>

        {cvRequested ? (
          <div className="p-6 bg-emerald-100/60 rounded-xl border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Consultation Request Received</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our Senior Career Advisor will review your profile and reach out via WhatsApp/email with service details and review timings.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCvServiceSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={cvName}
                  onChange={(e) => setCvName(e.target.value)}
                  placeholder="e.g. Samuel Kayitare"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={cvContact}
                  onChange={(e) => setCvContact(e.target.value)}
                  placeholder="+250 788 000 000"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Roles / Industry</label>
                <input
                  type="text"
                  required
                  value={cvRoleTarget}
                  onChange={(e) => setCvRoleTarget(e.target.value)}
                  placeholder="e.g. Senior Accountant or IT Project Manager"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Package</label>
                <select
                  value={cvPackage}
                  onChange={(e) => setCvPackage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="standard_review">Standard CV Polish (15,000 RWF)</option>
                  <option value="executive_rewrite">Executive CV + Cover Letter (30,000 RWF)</option>
                  <option value="interview_prep">Interview Coaching Session (25,000 RWF)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Consultation</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
