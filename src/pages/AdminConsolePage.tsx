import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Advert, Application } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  FileText, 
  Download, 
  Key, 
  Lock, 
  LogOut, 
  Search, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  Copy, 
  Check, 
  Send,
  Building2,
  BookOpen,
  Eye,
  Sliders,
  Sparkles,
  Phone
} from 'lucide-react';

interface AdminConsolePageProps {
  onSelectJob: (advert: Advert) => void;
  onNavigateHome: () => void;
}

export const AdminConsolePage: React.FC<AdminConsolePageProps> = ({ onSelectJob, onNavigateHome }) => {
  const {
    isAdminLoggedIn,
    adminLogout,
    adverts,
    packages,
    transactions,
    reports,
    testimonials,
    applications,
    accountRequests,
    approveAdvert,
    rejectAdvert,
    renewAdvert,
    updatePackagePrice,
    approveAccountRequest,
    rejectAccountRequest,
    revokeAccountRequest,
    approveTestimonial,
    updateApplicationStatus,
    showToast
  } = useApp();

  // Selected tab
  const [activeTab, setActiveTab] = useState<'moderation' | 'partners' | 'pricing' | 'reports' | 'applicants' | 'testimonials'>('moderation');

  // Moderation filter
  const [advertFilter, setAdvertFilter] = useState<'all' | 'pending' | 'live' | 'rejected'>('pending');

  // Rejection modal
  const [rejectAdvertId, setRejectAdvertId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Missing verified employer contact info or unverified company registration.');

  // Partner Passkey generation custom input
  const [customKeyInput, setCustomKeyInput] = useState<{ [reqId: string]: string }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Price editor
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [pkgPriceInput, setPkgPriceInput] = useState<number>(0);

  // Selected applicant filter
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Restricted Administration Access</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            You must authenticate with the master security credentials to view the back-office operations console.
          </p>
          <button
            onClick={onNavigateHome}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // Filtered Adverts
  const filteredAdverts = adverts.filter(a => {
    if (advertFilter === 'pending') return a.status === 'pending_review';
    if (advertFilter === 'live') return a.status === 'live';
    if (advertFilter === 'rejected') return a.status === 'rejected';
    return true;
  });

  const pendingReviewCount = adverts.filter(a => a.status === 'pending_review').length;
  const pendingPartnerRequests = accountRequests.filter(r => r.status === 'pending').length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const totalRevenueRwf = transactions.reduce((acc, tx) => acc + (tx.status === 'completed' ? tx.amountRwf : 0), 0);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast(`Access Key copied: ${key}`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleExportCsv = () => {
    const list = selectedJobFilter === 'all' 
      ? applications 
      : applications.filter(a => a.advertId === selectedJobFilter);

    if (list.length === 0) {
      showToast('No applications found to export.');
      return;
    }

    const headers = ['Application ID', 'Job Title', 'Company', 'Candidate Name', 'Email', 'Phone', 'Status', 'Submitted At'];
    const rows = list.map(a => [
      a.id,
      `"${a.jobTitle}"`,
      `"${a.companyName}"`,
      `"${a.applicantName}"`,
      a.email,
      a.phone,
      a.status,
      a.submittedAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Akazi_Admin_Candidates_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Candidates database exported successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner: Master Operations Hub Header */}
      <div className="bg-slate-900 rounded-2xl text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Akazi Master Operations Console · Level 4 Root Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Full Control Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Comprehensive oversight of advert moderation, employer & author partner permissions, live Rwandan Franc pricing, scam defense, and candidate records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            View Public Site
          </button>
          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 rounded-xl transition-colors cursor-pointer border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Exit Session</span>
          </button>
        </div>
      </div>

      {/* KPI Ticker Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {pendingReviewCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Adverts awaiting moderation
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Partner Requests</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            {pendingPartnerRequests}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Employers / Authors to vet
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Total Collected</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2 font-mono">
            {totalRevenueRwf.toLocaleString()} <span className="text-xs font-normal">RWF</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {transactions.length} verified transactions
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Scam Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-2">
            {pendingReportsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Auto-quarantined at 3 reports
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
        
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'moderation'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Advert Moderation Queue</span>
          {pendingReviewCount > 0 && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px]">
              {pendingReviewCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'partners'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Partner Access Permissions</span>
          {pendingPartnerRequests > 0 && (
            <span className="px-1.5 py-0.5 bg-blue-500 text-white font-bold rounded-full text-[10px]">
              {pendingPartnerRequests}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Live RWF Pricing & Revenue</span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'applicants'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Candidate Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Scam & Abuse Flags ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'testimonials'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Testimonials ({testimonials.length})</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 1. ADVERT MODERATION QUEUE */}
      {/* ======================================================== */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Queue:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                {(['pending', 'live', 'rejected', 'all'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setAdvertFilter(filter)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize cursor-pointer transition-colors ${
                      advertFilter === filter
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter === 'pending' ? `Pending Review (${pendingReviewCount})` : filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Showing {filteredAdverts.length} listings
            </div>
          </div>

          <div className="space-y-4">
            {filteredAdverts.length > 0 ? (
              filteredAdverts.map(adv => (
                <div 
                  key={adv.id} 
                  className={`bg-white rounded-2xl border p-6 space-y-4 shadow-2xs transition-all ${
                    adv.status === 'pending_review' 
                      ? 'border-amber-300 ring-2 ring-amber-100' 
                      : adv.status === 'rejected'
                      ? 'border-rose-200 opacity-80'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          adv.status === 'live'
                            ? 'bg-emerald-100 text-emerald-800'
                            : adv.status === 'pending_review'
                            ? 'bg-amber-100 text-amber-900 animate-pulse'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {adv.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 uppercase">
                          {adv.type} · {adv.category}
                        </span>
                        <span className="text-xs text-slate-400">· {adv.district}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900">
                        {adv.title}
                      </h3>
                      <div className="text-xs text-slate-600 flex items-center gap-3">
                        <span className="font-semibold text-emerald-800">{adv.companyName}</span>
                        {adv.rdbTin && (
                          <span className="font-mono text-slate-400">TIN: {adv.rdbTin}</span>
                        )}
                        <span>· Poster Phone: {adv.posterPhone}</span>
                        <span>· Email: {adv.posterEmail}</span>
                      </div>
                    </div>

                    {/* Action Buttons for Moderator */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectJob(adv)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Listing</span>
                      </button>

                      {adv.status === 'pending_review' && (
                        <>
                          <button
                            onClick={() => approveAdvert(adv.id)}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve & Publish</span>
                          </button>
                          <button
                            onClick={() => setRejectAdvertId(adv.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {adv.status === 'live' && (
                        <button
                          onClick={() => renewAdvert(adv.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Renew +30 Days</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {adv.description}
                  </p>

                  {adv.rejectionReason && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Rejection Note: </span>
                        <span>{adv.rejectionReason}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                    <div>
                      Deadline: <span className="font-semibold text-slate-700">{adv.deadline}</span> · 
                      Package: <span className="font-semibold text-slate-700">{adv.packageId}</span>
                    </div>
                    <div>
                      Views: <span className="font-semibold text-slate-700">{adv.views}</span> · 
                      Applications: <span className="font-semibold text-slate-700">{adv.applicationsCount}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
                No adverts currently in this queue view.
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PARTNER ACCESS PERMISSION CONTROL */}
      {/* ======================================================== */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>Employer & Publisher Authorization Console</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              As per Akazi.com security protocol, neither employers nor book publishers have open public login buttons. Instead, organizations apply for credentials or submit adverts. <strong>The Moderator manually reviews RDB registration & company legitimacy, then issues an Authorized Partner Passkey</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {accountRequests.map(req => (
              <div 
                key={req.id} 
                className={`bg-white rounded-2xl border p-6 space-y-4 shadow-2xs transition-all ${
                  req.status === 'pending'
                    ? 'border-blue-200 ring-2 ring-blue-50'
                    : req.status === 'approved'
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 opacity-70'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'pending'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {req.status}
                      </span>
                      <span className="text-xs font-semibold uppercase text-slate-500">
                        Requested Role: {req.requestedRole === 'poster' ? 'Employer / Hiring Organization' : 'Book Author / Publisher'}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">
                      {req.organizationName}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                      <div>
                        <span className="text-slate-400">Representative:</span> <span className="font-semibold text-slate-800">{req.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Phone:</span> <span className="font-semibold text-slate-800">{req.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Email:</span> <span className="font-semibold text-slate-800">{req.email}</span>
                      </div>
                      {req.rdbTin && (
                        <div>
                          <span className="text-slate-400">RDB TIN:</span> <span className="font-mono font-bold text-slate-800">{req.rdbTin}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400">Submitted:</span> <span>{new Date(req.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      <strong>Verification Note:</strong> {req.description}
                    </p>
                  </div>

                  {/* Actions & Passkey management */}
                  <div className="flex flex-col gap-2 shrink-0 min-w-56">
                    {req.status === 'pending' && (
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            const passkey = approveAccountRequest(req.id, customKeyInput[req.id]);
                            handleCopyKey(passkey);
                          }}
                          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Verify & Issue Passkey</span>
                        </button>

                        <button
                          onClick={() => rejectAccountRequest(req.id, 'Unable to verify commercial registration with RDB.')}
                          className="w-full py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Decline Verification
                        </button>
                      </div>
                    )}

                    {req.status === 'approved' && req.passkey && (
                      <div className="bg-emerald-100/70 border border-emerald-300 rounded-xl p-3 space-y-2">
                        <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
                          <span>Active Passkey</span>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        </div>
                        <div className="font-mono font-extrabold text-sm text-emerald-900 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200 select-all">
                          {req.passkey}
                        </div>
                        
                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            onClick={() => handleCopyKey(req.passkey!)}
                            className="flex-1 py-1 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedKey === req.passkey ? 'Copied!' : 'Copy Key'}</span>
                          </button>

                          <a
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${req.name}, your Akazi.com verified partner access has been approved! Use your secure passkey: ${req.passkey} to access your organization dashboard.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1 px-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                            title="Dispatch credentials via WhatsApp"
                          >
                            <Send className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <button
                          onClick={() => revokeAccountRequest(req.id)}
                          className="w-full text-center text-[10px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer pt-1"
                        >
                          Revoke Access Pass
                        </button>
                      </div>
                    )}

                    {req.status === 'rejected' && (
                      <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                        {req.rejectionReason}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 3. LIVE PRICING & REVENUE ENGINE */}
      {/* ======================================================== */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>Rwandan Franc (RWF) Dynamic Pricing Engine</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update live tier prices directly. Changes reflect immediately in post-advert flows and invoices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                    <span className="text-[11px] font-semibold text-slate-400 capitalize">{pkg.type}</span>
                  </div>

                  {editingPkgId === pkg.id ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={pkgPriceInput}
                          onChange={(e) => setPkgPriceInput(Number(e.target.value))}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-mono font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-xs font-bold text-slate-600">RWF</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updatePackagePrice(pkg.id, pkgPriceInput);
                            setEditingPkgId(null);
                          }}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Save Price
                        </button>
                        <button
                          onClick={() => setEditingPkgId(null)}
                          className="py-1.5 px-3 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xl font-extrabold text-slate-900 font-mono">
                        {pkg.priceRwf.toLocaleString()} <span className="text-xs font-normal text-slate-500">RWF</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingPkgId(pkg.id);
                          setPkgPriceInput(pkg.priceRwf);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Edit Price
                      </button>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500">
                    Duration: {pkg.durationDays} days · {pkg.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Ledger */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Financial Transactions Ledger</span>
              </h2>
              <div className="text-xs font-semibold text-slate-500">
                MoMo / Airtel / Card / Bank
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="py-2.5 px-3">Transaction Ref</th>
                    <th className="py-2.5 px-3">Listing Title</th>
                    <th className="py-2.5 px-3">Payment Method</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 font-mono font-semibold text-slate-900">{tx.providerRef}</td>
                      <td className="py-3 px-3 font-medium max-w-xs truncate">{tx.advertTitle}</td>
                      <td className="py-3 px-3 uppercase text-slate-500 font-semibold">{tx.method.replace('_', ' ')}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{tx.amountRwf.toLocaleString()} RWF</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{new Date(tx.paidAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CANDIDATE APPLICATIONS DATABASE */}
      {/* ======================================================== */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter by Vacancy:</span>
              <select
                value={selectedJobFilter}
                onChange={(e) => setSelectedJobFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none"
              >
                <option value="all">All Positions ({applications.length})</option>
                {adverts.map(adv => (
                  <option key={adv.id} value={adv.id}>{adv.title} ({adv.companyName})</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Selected CSV</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {applications.map(app => (
              <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{app.applicantName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      app.status === 'shortlisted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'reviewed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="text-slate-600">
                    Applied for: <span className="font-semibold text-slate-900">{app.jobTitle}</span> ({app.companyName})
                  </div>

                  <div className="text-slate-400 flex items-center gap-3 pt-0.5">
                    <span>Phone: {app.phone}</span>
                    <span>· Email: {app.email}</span>
                    <span className="font-mono">CV: {app.cvFileName}</span>
                  </div>

                  {app.coverNote && (
                    <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg mt-1 max-w-xl">
                      "{app.coverNote}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(app.id, 'reviewed')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Mark Reviewed
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 5. ABUSE & SCAM REPORTS */}
      {/* ======================================================== */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Scam Prevention & Anti-Fraud Queue</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adverts receiving 3 or more reports are quarantined from the public feed automatically. Review community reports below.
            </p>
          </div>

          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map(rep => (
                <div key={rep.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{rep.advertTitle}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 uppercase">
                      {rep.reason}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{rep.details}</p>
                  <div className="text-[11px] text-slate-400">
                    Reporter Contact: {rep.reporterContact || 'Anonymous'} · Reported at {new Date(rep.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
              No active abuse reports filed. The platform is secure.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. TESTIMONIALS QUEUE */}
      {/* ======================================================== */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Public Testimonial Approvals</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verify feedback before making it visible on the public testimonials page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map(test => (
              <div key={test.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{test.name}</div>
                    <div className="text-xs text-slate-500">{test.role} · {test.organization}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    test.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {test.approved ? 'Live' : 'Pending'}
                  </span>
                </div>

                <p className="text-xs text-slate-700 italic">
                  "{test.quote}"
                </p>

                {!test.approved && (
                  <button
                    onClick={() => approveTestimonial(test.id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Approve for Public Display
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectAdvertId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Specify Rejection Reason</h3>
            <p className="text-xs text-slate-500">
              This note will be transmitted to the employer so they can correct their listing.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 h-24"
            />
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setRejectAdvertId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rejectAdvert(rejectAdvertId, rejectReason);
                  setRejectAdvertId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
