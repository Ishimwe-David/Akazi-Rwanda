import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { BookItem } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  MessageCircle, 
  PlusCircle, 
  Search, 
  ExternalLink,
  PhoneCall,
  X 
} from 'lucide-react';

interface BooksPageProps {
  onNavigatePost: () => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ onNavigatePost }) => {
  const { language, books } = useApp();
  const t = translations[language];

  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const liveBooks = books.filter(b => b.status === 'live');
  const featuredBook = liveBooks.find(b => b.isFeaturedWeek) || liveBooks[0];

  const filteredBooks = liveBooks.filter(b => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header & Author CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rwanda Authors & Literature Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'rw' ? 'Ibitabo Byanditswe n\'Abanyarwanda' : 'Books by Rwandan Authors & Leaders'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified books on Rwandan history, entrepreneurship, governance, technology, and fiction.
          </p>
        </div>

        <button
          onClick={onNavigatePost}
          className="self-start sm:self-auto px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'rw' ? 'Shyiraho Igitabo cyawe (8k RWF)' : 'List Your Book (from 8,000 RWF)'}</span>
        </button>
      </div>

      {/* Featured Book of the Week Spotlight */}
      {featuredBook && (
        <div className="bg-linear-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex justify-center">
              <img
                src={featuredBook.coverUrl}
                alt={featuredBook.title}
                referrerPolicy="no-referrer"
                className="w-48 sm:w-56 rounded-xl shadow-xl border border-amber-200 object-cover cursor-pointer hover:scale-102 transition-transform"
                onClick={() => setSelectedBook(featuredBook)}
              />
            </div>

            <div className="md:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-200/70 text-amber-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Book of the Week (Author Spotlight)</span>
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {featuredBook.title}
              </h2>

              <div className="text-xs text-slate-600 font-medium">
                Author: <strong className="text-slate-900">{featuredBook.author}</strong> · 
                <span className="ml-1 text-slate-500">{featuredBook.genre}</span> · 
                <span className="ml-1 text-emerald-800 font-bold font-mono tabular-nums">{featuredBook.priceRwf.toLocaleString()} RWF</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {featuredBook.synopsis}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={featuredBook.buyLink || `https://wa.me/${featuredBook.phoneContact.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Order via WhatsApp ({featuredBook.phoneContact})</span>
                </a>

                <button
                  onClick={() => setSelectedBook(featuredBook)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  Read Synopsis & Bio
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search book title, author, or genre..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-56 bg-slate-100 overflow-hidden flex items-center justify-center relative">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold font-mono">
                  {book.priceRwf.toLocaleString()} RWF
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] text-amber-800 font-semibold uppercase tracking-wider">
                  {book.genre} · {book.language}
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <div className="text-xs text-slate-500">
                  By {book.author}
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-1">
                  {book.synopsis}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Author</span>
                </span>
                <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                  Details &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedBook.coverUrl}
                alt={selectedBook.title}
                referrerPolicy="no-referrer"
                className="w-36 rounded-lg shadow-md border border-slate-200 shrink-0"
              />
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-800">{selectedBook.genre}</span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{selectedBook.title}</h3>
                <div className="text-xs text-slate-600">
                  Author: <strong className="text-slate-900">{selectedBook.author}</strong>
                </div>
                <div className="text-sm font-bold text-emerald-800 font-mono">
                  {selectedBook.priceRwf.toLocaleString()} RWF
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Synopsis</h4>
                <p>{selectedBook.synopsis}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">About the Author</h4>
                <p>{selectedBook.authorBio}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                Notice: Akazi does not process book sale payments directly in v1. We connect readers directly with Rwandan authors and official bookshops.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <a
                href={selectedBook.buyLink || `https://wa.me/${selectedBook.phoneContact.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Contact Author on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
