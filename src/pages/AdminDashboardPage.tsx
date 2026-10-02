import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Advert } from '../types';
import { 
  ShieldCheck, 
  DollarSign, 
  Check, 
  X, 
  AlertTriangle, 
  Building2, 
  Download, 
  Edit3, 
  RefreshCw, 
  LogOut, 
  Search, 
  Clock, 
  CheckCircle2, 
  Smartphone,
  Eye,
  ArrowLeft,
  Users
} from 'lucide-react';

interface AdminDashboardPageProps {
  onSelectJob: (advert: Advert) => void;
  onExit: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ 
  onSelectJob, 
  onExit 
}) => {
  const { 
    language,
    adminLogout,
    adverts,
    packages,
    transactions,
    reports,
    accountRequests,
    applications,
    approveAdvert,
    rejectAdvert,
    renewAdvert,
    updatePackagePrice,
    approveAccountRequest,
    rejectAccountRequest,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState<'reviews' | 'accounts' | 'pricing' | 'transactions' | 'reports'>('reviews');

  // Rejection modal state for advert
  const [rejectAdvertId, setRejectAdvertId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Incomplete requirements or unverified employer contact.');

  // Editing price state
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [newPriceInput, setNewPriceInput] = useState<number>(0);

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState('');

  const pendingReviewAdverts = adverts.filter(a => a.status === 'pending_review');
  const pendingAccounts = accountRequests.filter(r => r.status === 'pending');
  const totalRevenueRwf = transactions.reduce((sum, tx) => sum + (tx.status === 'completed' ? tx.amountRwf : 0), 0);

  const handleExportCsv = () => {
    if (applications.length === 0) {
      showToast('No candidate applications recorded yet.');
      return;
    }
    const headers = ['ID', 'Job Title', 'Company', 'Applicant', 'Email', 'Phone', 'Status', 'Submitted At'];
    const rows = applications.map(a => [
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
    link.download = `Akazi_Admin_Master_Applicants_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Applicant master records exported to CSV!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Private Admin Identity */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Akazi Admin Control Console</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 font-mono">
                Private Access
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Full administrative authority over adverts, employer permissions, live pricing, and financial audits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Master CSV</span>
          </button>
          <button
            onClick={() => {
              adminLogout();
              onExit();
            }}
            className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Console</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-400 font-medium">Pending Advert Reviews</div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1 tabular-nums">
            {pendingReviewAdverts.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Target: &lt;24 hours review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-400 font-medium">Pending Account Permissions</div>
          <div className="text-2xl font-extrabold text-blue-600 font-mono mt-1 tabular-nums">
            {pendingAccounts.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-blue-500" />
            <span>Companies & Publishers</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-400 font-medium">Platform Revenue (MTN/Airtel)</div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1 tabular-nums">
            {totalRevenueRwf.toLocaleString()} <span className="text-xs font-sans text-slate-500">RWF</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {transactions.length} verified transactions
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-400 font-medium">Total Live Listings</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1 tabular-nums">
            {adverts.filter(a => a.status === 'live').length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            100% Verified & Compliant
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'reviews', label: `24h Advert Queue (${pendingReviewAdverts.length})` },
          { id: 'accounts', label: `Employer & Publisher Permissions (${pendingAccounts.length})` },
          { id: 'pricing', label: 'Pricing Manager (No Code)' },
          { id: 'transactions', label: `Transactions (${transactions.length})` },
          { id: 'reports', label: `Reports (${reports.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`pb-3 px-3 transition-colors cursor-pointer whitespace-nowrap ${
              activeSection === tab.id
                ? 'border-b-2 border-emerald-600 text-emerald-800 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: ADVERT REVIEW QUEUE */}
      {activeSection === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              24-Hour Moderation Review Queue
            </h2>
          </div>

          {pendingReviewAdverts.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
              {pendingReviewAdverts.map(adv => (
                <div key={adv.id} className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-bold text-slate-900">{adv.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Company: <strong>{adv.companyName}</strong> (TIN: {adv.rdbTin || 'None provided'}) · District: {adv.district}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Package: <span className="font-semibold capitalize text-emerald-700">{adv.packageId}</span> · Contact: {adv.posterPhone} ({adv.posterEmail})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => approveAdvert(adv.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                      <button
                        onClick={() => setRejectAdvertId(adv.id)}
                        className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs cursor-pointer"
                      >
                        Reject with Reason
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                    <div><strong>Job Scope:</strong> {adv.description}</div>
                    {adv.requirements.length > 0 && (
                      <div><strong>Requirements:</strong> {adv.requirements.join('; ')}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              Review queue is clear! All submitted adverts have been inspected and published.
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: EMPLOYER & PUBLISHER PERMISSION REQUESTS */}
      {activeSection === 'accounts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Employer & Book Publisher Account Permissions
            </h2>
          </div>

          {pendingAccounts.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
              {pendingAccounts.map(req => (
                <div key={req.id} className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">{req.organizationName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                          Role: {req.requestedRole}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Contact Person: <strong>{req.name}</strong> · {req.email} · Phone: <span className="font-mono">{req.phone}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        RDB TIN Registration: <strong>{req.rdbTin || 'Not Provided'}</strong> · Submitted on {new Date(req.submittedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => approveAccountRequest(req.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Grant Dashboard Access</span>
                      </button>
                      <button
                        onClick={() => rejectAccountRequest(req.id, 'Unable to verify official RDB business registration.')}
                        className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded-lg text-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                    <strong>Organization Profile:</strong> {req.description}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              All employer and author permission requests have been verified and granted access!
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: LIVE PRICING MANAGER (NO CODE CHANGES) */}
      {activeSection === 'pricing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Live Pricing Manager (Edit Directly Without Code Changes)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Section 2.3 Business Rule: "Admin can edit all prices from the dashboard with no code change."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {packages.map(pkg => {
              const isEditing = editingPackageId === pkg.id;
              return (
                <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">{pkg.name}</div>
                  <div className="text-slate-500 text-[11px]">{pkg.durationDays} days active</div>

                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <input
                        type="number"
                        value={newPriceInput}
                        onChange={(e) => setNewPriceInput(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white font-mono"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updatePackagePrice(pkg.id, newPriceInput);
                            setEditingPackageId(null);
                          }}
                          className="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold cursor-pointer"
                        >
                          Save Price
                        </button>
                        <button
                          onClick={() => setEditingPackageId(null)}
                          className="px-2 py-1 text-slate-600 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                        {pkg.priceRwf.toLocaleString()} RWF
                      </span>
                      <button
                        onClick={() => {
                          setEditingPackageId(pkg.id);
                          setNewPriceInput(pkg.priceRwf);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-200 cursor-pointer"
                        title="Edit Price"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: TRANSACTIONS & REVENUE */}
      {activeSection === 'transactions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Payment Transactions (MTN MoMo, Airtel, Cards)
            </h2>
            <div className="text-xs font-mono font-bold text-emerald-800">
              Total: {totalRevenueRwf.toLocaleString()} RWF
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2 pr-4">Tx ID</th>
                  <th className="py-2 pr-4">Advert Title</th>
                  <th className="py-2 pr-4">Channel</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">MoMo Phone / Provider Ref</th>
                  <th className="py-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 pr-4 font-bold text-slate-900">{tx.id}</td>
                    <td className="py-2.5 pr-4 font-sans text-slate-700">{tx.advertTitle}</td>
                    <td className="py-2.5 pr-4 uppercase text-slate-600">{tx.method.replace('_', ' ')}</td>
                    <td className="py-2.5 pr-4 font-bold text-emerald-800 tabular-nums">
                      {tx.amountRwf.toLocaleString()} RWF
                    </td>
                    <td className="py-2.5 pr-4 text-slate-500">{tx.phoneNumber || tx.providerRef}</td>
                    <td className="py-2.5 text-right text-slate-400">
                      {new Date(tx.paidAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: COMMUNITY REPORTS */}
      {activeSection === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Flagged Adverts & Scam Detection Reports
          </h2>
          {reports.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {reports.map(rep => (
                <div key={rep.id} className="py-3 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Advert: {rep.advertTitle}</span>
                    <span className="text-rose-600 uppercase font-mono">{rep.reason}</span>
                  </div>
                  <div className="text-slate-600">{rep.details}</div>
                  <div className="text-[11px] text-slate-400">
                    Reported by: {rep.reporterContact || 'Anonymous'} · {new Date(rep.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-500">
              No reports active. All community trust indicators are clear.
            </div>
          )}
        </div>
      )}

      {/* Rejection Modal */}
      {rejectAdvertId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Reject Advert with Constructive Feedback
            </h3>
            <p className="text-xs text-slate-500">
              The poster will receive this explanation with a free link to edit and resubmit.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectAdvertId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rejectAdvert(rejectAdvertId, rejectReason);
                  setRejectAdvertId(null);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded cursor-pointer"
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
