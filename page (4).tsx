'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Bell, 
  Calendar, 
  Tag, 
  Sparkles, 
  AlertTriangle, 
  GraduationCap, 
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function NewsPage() {
  const { isUrdu } = useLanguage();
  const [news, setNews] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'ALL', labelEn: 'All Updates', labelUr: 'تمام اعلانات' },
    { id: 'ADMISSION', labelEn: 'Admissions', labelUr: 'داخلہ اطلاعات' },
    { id: 'ACHIEVEMENT', labelEn: 'Achievements', labelUr: 'کامیابیاں و اعزازات' },
    { id: 'EVENT', labelEn: 'Events', labelUr: 'تقریبات' },
    { id: 'NOTICE', labelEn: 'General Notices', labelUr: 'عمومی نوٹس' },
  ];

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const url = selectedCategory === 'ALL'
          ? '/api/news'
          : `/api/news?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.announcements) {
          setNews(data.announcements);
        }
      } catch (err) {
        console.error('Fetch news error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
          <Bell className="w-4 h-4 text-gold-600" />
          <span>{isUrdu ? 'اعلانات و سرکلرز' : 'Institutional Bulletin'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
          {isUrdu ? 'خبریں، اعلانات اور نوٹس بورڈ' : 'News & Announcements'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {isUrdu
            ? 'داخلہ معلومات، امتحانی نتائج، سالانہ دستار بندی اور دیگر اہم ادارہ جاتی اطلاعات'
            : 'Stay informed with latest admission notifications, academic competitions, and institutional updates.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-navy-900 text-gold-400 shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isUrdu ? cat.labelUr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* News List */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading announcements...</div>
      ) : news.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            {isUrdu ? 'کوئی اعلان دستیاب نہیں ہے۔' : 'No announcements currently listed.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => {
            const isUrgent = item.priority === 'URGENT';
            return (
              <article
                key={item.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl ${
                  isUrgent ? 'border-amber-400 shadow-amber-500/10' : 'border-slate-200 shadow-md'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        isUrgent 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : 'bg-navy-100 text-navy-800'
                      }`}>
                        {item.category}
                      </span>
                      {isUrgent && (
                        <span className="flex items-center text-[11px] font-bold text-red-600 animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1" />
                          {isUrdu ? 'اہم اطلاع' : 'Important Alert'}
                        </span>
                      )}
                    </div>

                    <span className="flex items-center text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1 text-gold-500" />
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-navy-950 leading-snug">
                      {isUrdu ? item.titleUr : item.titleEn}
                    </h2>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {isUrdu ? item.summaryUr : item.summaryEn}
                    </p>
                    {(item.contentEn || item.contentUr) && (
                      <p className="text-slate-500 text-xs sm:text-sm pt-2 border-t border-slate-100 leading-relaxed">
                        {isUrdu ? item.contentUr : item.contentEn}
                      </p>
                    )}
                  </div>

                  {/* Action Link if Admission category */}
                  {item.category === 'ADMISSION' && (
                    <div className="pt-2">
                      <Link
                        href="/admissions"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md"
                      >
                        <GraduationCap className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
                        {isUrdu ? 'آن لائن داخلہ فارم پر جائیں' : 'Proceed to Admission Application'}
                      </Link>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
