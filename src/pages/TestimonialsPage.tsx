import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Testimonial } from '../types';
import { Star, Plus, CheckCircle, MessageSquare } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { language, testimonials, submitTestimonial, showToast } = useApp();
  const t = translations[language];

  const [activeCategory, setActiveCategory] = useState<'all' | 'seeker' | 'employer' | 'student' | 'author'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<'seeker' | 'employer' | 'student' | 'author'>('seeker');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);

  const filteredTestimonials = testimonials.filter(t => {
    if (!t.approved) return false;
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTestimonial({
      name,
      role,
      organization,
      category,
      quote,
      rating
    });
    setShowSubmitModal(false);
    setName('');
    setRole('');
    setOrganization('');
    setQuote('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'rw' ? 'Ubuhamya bw\'Abakoresha n\'Abasaba Akazi' : 'Community Testimonials & Reviews'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real stories from verified job seekers, hiring directors, students, and authors across Rwanda.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="self-start sm:self-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'rw' ? 'Tanga Ubuhamya' : 'Share Your Story'}</span>
        </button>
      </div>

      {/* Category Filter Chips (Segmented) */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: 'all', label: language === 'rw' ? 'Byose' : 'All Stories' },
          { id: 'seeker', label: 'Job Seekers' },
          { id: 'employer', label: 'Employers & HR' },
          { id: 'student', label: 'Students & TVET' },
          { id: 'author', label: 'Book Authors' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{language === 'rw' && item.quoteRw ? item.quoteRw : item.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900">{item.name}</div>
                <div className="text-[11px] text-slate-500">{item.role} · {item.organization}</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Submit Your Experience
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All stories are reviewed by our moderator before being published on Akazi.com.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diane Mugeni"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Role *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Talent Lead or Software Dev"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization *</label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. BK, Irembo, or Univ of Rwanda"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="seeker">Job Seeker</option>
                    <option value="employer">Employer / HR</option>
                    <option value="student">Student / Intern</option>
                    <option value="author">Book Author</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Good</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Quote / Testimonial *</label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share how Akazi helped you hire or land an opportunity..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                >
                  Submit Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
