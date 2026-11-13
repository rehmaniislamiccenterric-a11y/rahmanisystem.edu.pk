'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calendar, 
  Tag, 
  Sparkles, 
  Play, 
  GraduationCap, 
  Search, 
  Filter,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function ActivitiesPage() {
  const { t, isUrdu } = useLanguage();
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'ALL', labelEn: 'All Activities', labelUr: 'تمام سرگرمیاں' },
    { id: 'Quran Recitation', labelEn: 'Quran Recitation', labelUr: 'حسنِ قرأت' },
    { id: 'Hifz Activities', labelEn: 'Hifz Activities', labelUr: 'حفظِ قرآن کی سرگرمیاں' },
    { id: 'Quran Completion Ceremonies', labelEn: 'Quran Completion Ceremonies', labelUr: 'تکمیلِ حفظ تقریبات' },
    { id: 'Science Experiments', labelEn: 'Science Experiments', labelUr: 'سائنسی تجربات' },
    { id: 'Mathematics Activities', labelEn: 'Mathematics Activities', labelUr: 'ریاضیاتی سرگرمیاں' },
    { id: 'Sports', labelEn: 'Sports & Fitness', labelUr: 'کھیل و جسمانی چستی' },
  ];

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      try {
        const url = selectedCategory === 'ALL' 
          ? '/api/activities' 
          : `/api/activities?category=${encodeURIComponent(selectedCategory)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.activities) {
          setActivities(data.activities);
        }
      } catch (err) {
        console.error('Fetch activities error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, [selectedCategory]);

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Filter Bar */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
          {isUrdu ? 'کیمپس لائف اور تقریبات' : 'Daily Campus Life & Events'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
          {t.activitiesTitle}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.activitiesSubtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-navy-900 text-gold-400 shadow-md scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isUrdu ? cat.labelUr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            {isUrdu ? 'اس کیٹیگری میں فی الحال کوئی سرگرمی موجود نہیں ہے۔' : 'No activities currently listed in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act) => (
            <div 
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={act.mediaUrl}
                  alt={isUrdu ? act.titleUr : act.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-navy-950/85 text-white backdrop-blur-md">
                    {act.category}
                  </span>
                </div>
              </div>

              <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gold-500" />
                    <span>{act.activityDate || 'Recent'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-gold-600 transition-colors leading-snug">
                    {isUrdu ? act.titleUr : act.titleEn}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {isUrdu ? act.descriptionUr : act.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Admission Prompt */}
      <div className="bg-gradient-to-r from-navy-950 to-navy-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold font-serif text-gold-400">
            {isUrdu ? 'کیا آپ اپنے بچے کو ان سرگرمیوں کا حصہ بنانا چاہتے ہیں؟' : 'Inspire Your Child with Holistic Learning'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            {isUrdu ? 'آج ہی رحمانی اسلامک سنٹر اور وا ایجوکیشن سسٹم میں داخلے کے لیے درخواست دیں۔' : 'Enroll your child in our twin educational wings in Model Town, Lahore.'}
          </p>
        </div>
        <Link
          href="/admissions"
          className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm shadow-md flex-shrink-0"
        >
          {t.applyNow}
        </Link>
      </div>

    </div>
  );
}
