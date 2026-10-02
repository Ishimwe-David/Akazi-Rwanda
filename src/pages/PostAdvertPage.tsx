import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { AdvertType, District, JobCategory, EmploymentType, ExperienceLevel } from '../types';
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  Building, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  MessageCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface PostAdvertPageProps {
  onSuccess: (slug: string) => void;
  onNavigateHome: () => void;
}

export const PostAdvertPage: React.FC<PostAdvertPageProps> = ({ onSuccess, onNavigateHome }) => {
  const { language, packages, addons, createAdvert, showToast } = useApp();
  const t = translations[language];

  // Stepper state (1: Type, 2: Package, 3: Details, 4: Payment, 5: Confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [advertType, setAdvertType] = useState<AdvertType>('job');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('featured');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['urgent_badge']);

  // Details
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [rdbTin, setRdbTin] = useState('');
  const [category, setCategory] = useState<JobCategory>('technology');
  const [district, setDistrict] = useState<District>('Gasabo');
  const [sector, setSector] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('mid');
  const [educationLevel, setEducationLevel] = useState('Bachelor\'s Degree or equivalent');
  const [openings, setOpenings] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [salaryMin, setSalaryMin] = useState<number | undefined>(800000);
  const [salaryMax, setSalaryMax] = useState<number | undefined>(1200000);
  const [isSalaryHidden, setIsSalaryHidden] = useState(false);
  const [deadline, setDeadline] = useState('2026-11-15');
  const [applicationMethod, setApplicationMethod] = useState<'on_site' | 'link' | 'email'>('on_site');
  const [applicationEmail, setApplicationEmail] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');
  const [posterEmail, setPosterEmail] = useState('');
  const [posterPhone, setPosterPhone] = useState('+250 78');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'card' | 'bank_invoice'>('mtn_momo');
  const [paymentPhone, setPaymentPhone] = useState('+250 788 123 456');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdAdvertSlug, setCreatedAdvertSlug] = useState('');
  const [receiptTxId, setReceiptTxId] = useState('');

  // Calculations
  const currentPackage = packages.find(p => p.id === selectedPackageId) || packages[0];
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const a = addons.find(item => item.id === addonId);
    return sum + (a ? a.priceRwf : 0);
  }, 0);
  const grandTotalRwf = currentPackage.priceRwf + addonsTotal;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !companyName.trim() || !posterEmail.trim() || !posterPhone.trim()) {
      showToast(language === 'rw' ? 'Nyamuneka uzuza amakuru yose asabwa' : 'Please complete all required fields');
      return;
    }
    setCurrentStep(4);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const responsibilities = responsibilitiesText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
      
      const requirements = requirementsText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const startsAt = new Date().toISOString().slice(0, 10);
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + currentPackage.durationDays);
      const expiresAt = expDate.toISOString().slice(0, 10);

      const newAdv = createAdvert(
        {
          type: advertType,
          title,
          companyName,
          companyLogo: companyLogo || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
          rdbTin,
          isVerified: Boolean(rdbTin),
          category,
          district,
          sector,
          employmentType,
          experienceLevel,
          educationLevel,
          openings,
          description,
          responsibilities: responsibilities.length > 0 ? responsibilities : ['Execute core deliverables and milestones in Kigali', 'Collaborate with cross-functional teams'],
          requirements: requirements.length > 0 ? requirements : ['Demonstrated experience in similar roles in Rwanda', 'Strong work ethics and team collaboration'],
          salaryMin: isSalaryHidden ? undefined : salaryMin,
          salaryMax: isSalaryHidden ? undefined : salaryMax,
          isSalaryHidden,
          deadline,
          applicationMethod,
          applicationEmail: applicationEmail || posterEmail,
          applicationUrl,
          packageId: selectedPackageId,
          addons: selectedAddons,
          featured: selectedPackageId === 'featured' || selectedPackageId === 'book_featured',
          urgent: selectedAddons.includes('urgent_badge'),
          homepageBanner: selectedAddons.includes('homepage_banner'),
          startsAt,
          expiresAt,
          posterEmail,
          posterPhone
        },
        paymentMethod,
        paymentPhone
      );

      setIsProcessingPayment(false);
      setCreatedAdvertSlug(newAdv.slug);
      setReceiptTxId(`TX-${Date.now().toString().slice(-6)}`);
      setCurrentStep(5);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.postAdvert.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.postAdvert.subtitle}
        </p>

        {/* 24-hour Review Trust Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium mt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.postAdvert.reviewNotice}</span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center justify-center max-w-3xl mx-auto">
        {[
          { num: 1, label: 'Type' },
          { num: 2, label: 'Package' },
          { num: 3, label: 'Details' },
          { num: 4, label: 'Payment' },
          { num: 5, label: 'Done' }
        ].map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                  currentStep === step.num
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : currentStep > step.num
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">{step.label}</span>
            </div>
            {idx < 4 && (
              <div className={`w-12 sm:w-20 h-0.5 mb-4 mx-1 ${currentStep > idx + 1 ? 'bg-slate-900' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1: CHOOSE TYPE */}
      {currentStep === 1 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <h2 className="text-lg font-bold text-slate-900">
            {t.postAdvert.step1}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'job', title: 'Single Job Advert', desc: 'Standard professional or technical opening in Rwanda' },
              { id: 'internship', title: 'Internship / Trainee', desc: 'Practical placement for students & TVET graduates' },
              { id: 'book', title: 'Author Book Listing', desc: 'Promote a book, excerpt, and reader contact' },
              { id: 'business', title: 'Business / Company Advert', desc: 'Service notices, tenders, or firm announcements' },
            ].map(type => (
              <div
                key={type.id}
                onClick={() => setAdvertType(type.id as AdvertType)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  advertType === type.id
                    ? 'border-emerald-600 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">{type.title}</div>
                <div className="text-xs text-slate-500 mt-1 leading-snug">{type.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue to Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CHOOSE PACKAGE & ADDONS */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="text-xs text-slate-500 font-mono">
              Step 2 of 4: Select Package
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages
              .filter(p => advertType === 'book' ? p.type === 'book' : p.type === 'job')
              .map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col justify-between cursor-pointer transition-all ${
                    selectedPackageId === pkg.id
                      ? 'border-emerald-600 ring-2 ring-emerald-100 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pkg.isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      Recommended
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{pkg.description}</p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {pkg.priceRwf.toLocaleString()} <span className="text-xs font-semibold text-slate-500">RWF</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Duration: {pkg.durationDays} calendar days
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2 text-xs text-slate-600">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div 
                      className={`w-full py-2 text-xs font-semibold rounded-lg text-center transition-colors ${
                        selectedPackageId === pkg.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {selectedPackageId === pkg.id ? 'Selected' : 'Select Package'}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Add-ons selection */}
          <div className="max-w-5xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Optional Add-on Boosts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {addons.map(addon => (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all flex items-start gap-3 ${
                    selectedAddons.includes(addon.id)
                      ? 'border-emerald-600 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => {}}
                    className="mt-0.5 text-emerald-600 rounded cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{addon.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{addon.description}</div>
                    <div className="text-xs font-semibold text-emerald-700 font-mono mt-1">
                      +{addon.priceRwf.toLocaleString()} RWF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Continue */}
          <div className="max-w-5xl mx-auto flex items-center justify-between pt-2">
            <div className="text-xs">
              <span className="text-slate-500">Subtotal: </span>
              <strong className="text-base font-bold text-slate-900 font-mono tabular-nums">
                {grandTotalRwf.toLocaleString()} RWF
              </strong>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue to Advert Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: FILL FORM & LIVE PREVIEW */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Packages</span>
            </button>
            <div className="text-xs text-slate-500 font-mono">
              Step 3 of 4: Advert Content
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            
            {/* Form Column */}
            <form onSubmit={handleDetailsSubmit} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Advert Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Accountant / Logistics Supervisor"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Inkomoko Rwanda"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    RDB TIN (For Verified Badge)
                  </label>
                  <input
                    type="text"
                    value={rdbTin}
                    onChange={(e) => setRdbTin(e.target.value)}
                    placeholder="9-digit RDB TIN"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District in Rwanda *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value as District)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {['Gasabo', 'Kicukiro', 'Nyarugenge', 'Musanze', 'Huye', 'Rubavu', 'Rwamagana', 'Bugesera', 'Muhanga', 'Remote / All Rwanda'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sector / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="e.g. Kimihurura, Kiyovu, Muhoza"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JobCategory)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="technology">Technology & Software</option>
                    <option value="finance_banking">Finance & Banking</option>
                    <option value="ngo_development">NGO & Development</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education_teaching">Education & Teaching</option>
                    <option value="hospitality_tourism">Hospitality & Tourism</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="construction_engineering">Construction & Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Description & Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the organization, goals of the position, and work environment..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="Manage client financial ledgers&#10;Coordinate with RRA tax department&#10;Lead quarterly reconciliation"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Candidate Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder="Bachelor's degree in related field&#10;3+ years experience in Kigali&#10;Fluency in English & Kinyarwanda"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Poster Contact Details */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 mb-2">
                  Poster Verification Contact
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Your Email (for receipts) *</label>
                    <input
                      type="email"
                      required
                      value={posterEmail}
                      onChange={(e) => setPosterEmail(e.target.value)}
                      placeholder="hr@yourfirm.rw"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Phone Number (MTN MoMo) *</label>
                    <input
                      type="tel"
                      required
                      value={posterPhone}
                      onChange={(e) => setPosterPhone(e.target.value)}
                      placeholder="+250 788 000 000"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Review & Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Card Preview
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <span>{companyName || 'Your Company Name'}</span>
                      {rdbTin && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="text-[11px] text-slate-400">{district}, Rwanda</div>
                  </div>
                  {selectedPackageId === 'featured' && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Featured
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {title || 'Job Title Will Appear Here'}
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{employmentType}</span>
                  <span>·</span>
                  <span>{category}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3">
                  {description || 'Your role description will be visible to job seekers across all Rwandan districts.'}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Deadline: {deadline}</span>
                  <span className="text-emerald-700 font-semibold">Apply Now &rarr;</span>
                </div>
              </div>

              {/* WhatsApp Help Trigger */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-emerald-900">Need help posting?</div>
                  <div className="text-emerald-700 text-[11px]">Chat with our Kigali support team.</div>
                </div>
                <a
                  href="https://wa.me/250788785514"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer shrink-0"
                >
                  WhatsApp Us
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & PAYMENT (MOMO / AIRTEL / CARD / INVOICE) */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="text-xs text-slate-500 font-mono">
              Step 4 of 4: Final Payment
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Review Advert & Complete Payment
          </h2>

          {/* Order Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Advert:</span>
              <strong className="text-slate-900">{title}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Package:</span>
              <span className="font-semibold text-slate-900">{currentPackage.name} ({currentPackage.priceRwf.toLocaleString()} RWF)</span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Add-ons:</span>
                <span className="text-slate-900">+{addonsTotal.toLocaleString()} RWF</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold">
              <span>Total Payable (RWF):</span>
              <span className="font-mono text-emerald-800 tabular-nums">{grandTotalRwf.toLocaleString()} RWF</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Payment Method
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'mtn_momo', label: 'MTN Mobile Money', icon: Smartphone, desc: 'Instant push prompt' },
                { id: 'airtel_money', label: 'Airtel Money', icon: Smartphone, desc: 'Instant USSD' },
                { id: 'card', label: 'Visa / Mastercard', icon: CreditCard, desc: 'Online card gateway' },
              ].map(method => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-emerald-600 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{method.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{method.desc}</div>
                </div>
              ))}
            </div>

            {/* Mobile Money Phone Input */}
            {(paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && (
              <div className="pt-2 space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {paymentMethod === 'mtn_momo' ? 'MTN MoMo Number' : 'Airtel Money Number'}
                </label>
                <input
                  type="tel"
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  placeholder="+250 78..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-400">
                  You will receive an instant payment authorization prompt on your handset.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Secured & Encrypted RWF Gateway
            </div>

            <button
              onClick={handleProcessPayment}
              disabled={isProcessingPayment}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing MoMo...</span>
                </>
              ) : (
                <>
                  <span>Pay {grandTotalRwf.toLocaleString()} RWF</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* STEP 5: CONFIRMATION & RECEIPT */}
      {currentStep === 5 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-5 shadow-sm">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Advert Received & Payment Confirmed!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your advert <strong className="text-slate-900">"{title}"</strong> has been received by the Akazi moderation team. We inspect every advert within 24 hours to ensure high trust for job seekers.
          </p>

          {/* Receipt details */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Receipt Ref:</span>
              <strong className="text-slate-900">{receiptTxId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="text-emerald-800 font-bold">{grandTotalRwf.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Channel:</span>
              <span>{paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="text-amber-700 font-bold">Under 24h Review</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
            <button
              onClick={() => onSuccess(createdAdvertSlug)}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              View My Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
