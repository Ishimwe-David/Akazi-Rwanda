import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Advert } from '../types';
import { JobCard } from '../components/JobCard';
import { 
  Building2, 
  Key, 
  ShieldCheck, 
  Users, 
  FileText, 
  Plus, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface PartnerPortalPageProps {
  onSelectJob: (advert: Advert) => void;
  onNavigatePost: () => void;
  onNavigateHome: () => void;
}

export const PartnerPortalPage: React.FC<PartnerPortalPageProps> = ({
  onSelectJob,
  onNavigatePost,
  onNavigateHome
}) => {
  const {
    activePartner,
    partnerLogin,
    partnerLogout,
    submitAccountRequest,
    adverts,
    applications,
    books,
    updateApplicationStatus,
    showToast
  } = useApp();

  const [passkeyInput, setPasskeyInput] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Request form state
  const [orgName, setOrgName] = useState('');
  const [repName, setRepName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tin, setTin] = useState('');
  const [role, setRole] = useState<'poster' | 'author'>('poster');
  const [description, setDescription] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    partnerLogin(passkeyInput);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !repName || !phone || !email) {
      showToast('Please fill in required fields');
      return;
    }

    submitAccountRequest({
      userId: `user-${Date.now()}`,
      name: repName,
      email,
      phone,
      requestedRole: role,
      organizationName: orgName,
      rdbTin: tin || undefined,
      description: description || 'Authorized account request'
    });

    setShowRequestForm(false);
    setOrgName('');
    setRepName('');
    setEmail('');
    setPhone('');
    setTin('');
    setDescription('');
  };

  // If NOT authenticated as a partner:
  if (!activePartner) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <Key className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Authorized Partner Workspace
            </h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Access is strictly reserved for verified employers and book publishers authorized by the Akazi.com moderation team.
            </p>
          </div>

          {!showRequestForm ? (
            <div className="space-y-6">
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Enter Partner Passkey</span>
                    <span className="text-[11px] text-emerald-600 font-mono">
                      e.g., AKZ-EMP-2026 or AKZ-PUB-9120
                    </span>
                  </label>
                  <input
                    type="text"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="e.g. AKZ-EMP-2026"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono uppercase text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Organization Workspace</span>
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 text-center space-y-2">
                <p className="text-xs text-slate-500">
                  Don't have an authorization passkey yet?
                </p>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer underline"
                >
                  Submit Organization Verification Request
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4 pt-2">
              <div className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Request Moderator Approval & Passkey</span>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Back to Passkey Entry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Type</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="poster">Employer / Company</option>
                    <option value="author">Book Author / Publisher</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Publisher Name *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Bank of Kigali or Author Name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Representative Name *</label>
                  <input
                    type="text"
                    required
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">RDB TIN (Optional)</label>
                  <input
                    type="text"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    placeholder="9-digit TIN"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone (with WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 ..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="careers@company.rw"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Needs / Publication Brief</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your open roles or publications for moderator verification..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs h-20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Submit for Moderator Verification
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // When AUTHENTICATED as partner:
  const partnerAdverts = adverts.filter(a => 
    a.companyName.toLowerCase().includes(activePartner.organizationName.toLowerCase()) ||
    activePartner.organizationName.toLowerCase().includes(a.companyName.toLowerCase())
  );

  const partnerApplications = applications.filter(app => 
    partnerAdverts.some(adv => adv.id === app.advertId)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Partner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl border border-emerald-100">
            {activePartner.requestedRole === 'author' ? <BookOpen className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                {activePartner.organizationName}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                Verified Partner
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
              <span>Authorized: {activePartner.name}</span>
              {activePartner.rdbTin && <span className="font-mono">TIN: {activePartner.rdbTin}</span>}
              <span className="font-mono text-emerald-700">Passkey: {activePartner.passkey}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigatePost}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Listing</span>
          </button>

          <button
            onClick={partnerLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Exit Partner Session"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Listings
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {partnerAdverts.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Published under {activePartner.organizationName}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Candidate Submissions
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {partnerApplications.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            CVs received directly
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Account Status
          </div>
          <div className="text-base font-extrabold text-emerald-700 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>RDB Verified Employer</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Moderator endorsed
          </div>
        </div>
      </div>

      {/* Applications Received */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Applicant Submissions ({partnerApplications.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Direct candidate pipeline</span>
        </div>

        {partnerApplications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {partnerApplications.map(app => (
              <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{app.applicantName}</div>
                  <div className="text-slate-600 mt-0.5">
                    For position: <span className="font-semibold text-slate-800">{app.jobTitle}</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-3 mt-1 font-mono text-[11px]">
                    <span>Email: {app.email}</span>
                    <span>Phone: {app.phone}</span>
                    <span>CV File: {app.cvFileName}</span>
                  </div>
                  {app.coverNote && (
                    <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg mt-2 max-w-lg">
                      "{app.coverNote}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                    app.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {app.status}
                  </span>

                  <button
                    onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-500">
            No applications received for your vacancies yet.
          </div>
        )}
      </div>

      {/* Organization's Listings */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Your Published Listings ({partnerAdverts.length})</span>
        </h2>

        {partnerAdverts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerAdverts.map(adv => (
              <JobCard key={adv.id} advert={adv} onSelect={onSelectJob} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            You haven't posted any active vacancies yet. Click "Post New Listing" to publish an advert.
          </div>
        )}
      </div>

    </div>
  );
};
