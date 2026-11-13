'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Image as ImageIcon, 
  Video, 
  Play, 
  X, 
  ZoomIn, 
  Sparkles,
  ExternalLink,
  Film
} from 'lucide-react';

export default function GalleryPage() {
  const { isUrdu } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeMedia, setActiveMedia] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'ALL', labelEn: 'All Media', labelUr: 'تمام تصاویر و ویڈیوز' },
    { id: 'RAHMANI_ISLAMIC', labelEn: 'Rahmani Islamic Center', labelUr: 'رحمانی اسلامک سنٹر' },
    { id: 'WA_EDUCATION', labelEn: 'Wa Education System', labelUr: 'وا ایجوکیشن سسٹم' },
    { id: 'CEREMONIES', labelEn: 'Ceremonies & Awards', labelUr: 'تقریبات و اسناد' },
    { id: 'CAMPUS', labelEn: 'Campus & Library', labelUr: 'کیمپس و ماحول' },
  ];

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      try {
        const url = selectedCategory === 'ALL'
          ? '/api/gallery'
          : `/api/gallery?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, [selectedCategory]);

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
          {isUrdu ? 'ملٹی میڈیا نمائش' : 'Visual Highlights'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
          {isUrdu ? 'تصاویر و ویڈیوز گیلری' : 'Photo & Video Gallery'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {isUrdu 
            ? 'رحمانی اسلامک سنٹر اور وا ایجوکیشن سسٹم کے تعلیمی، تربیتی اور سائنسی لمحات کے تصویری و ویڈیو مناظر' 
            : 'Explore moments of Quran memorization, science laboratory experiments, ceremonies, and campus life.'}
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
                ? 'bg-navy-900 text-gold-400 shadow-md scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isUrdu ? cat.labelUr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading gallery items...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">
            {isUrdu ? 'اس زمرے میں کوئی میڈیا فائل دستیاب نہیں ہے۔' : 'No items found in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={item.mediaUrl}
                  alt={isUrdu ? item.titleUr : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
                
                {/* Media Type Badge / Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  {item.mediaType === 'YOUTUBE' || item.mediaType === 'VIDEO' ? (
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-navy-950/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-navy-950/80 text-white backdrop-blur-sm">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 className="font-bold text-navy-950 text-sm group-hover:text-gold-600 transition-colors">
                  {isUrdu ? item.titleUr : item.titleEn}
                </h3>
                {(item.captionEn || item.captionUr) && (
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                    {isUrdu ? item.captionUr : item.captionEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            className="bg-navy-950 border border-navy-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-navy-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {isUrdu ? activeMedia.titleUr : activeMedia.titleEn}
              </h3>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-full bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 flex-grow flex items-center justify-center bg-black overflow-y-auto">
              {activeMedia.mediaType === 'YOUTUBE' && activeMedia.youtubeUrl ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={activeMedia.youtubeUrl.replace('watch?v=', 'embed/')}
                    title={activeMedia.titleEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={activeMedia.mediaUrl}
                  alt={isUrdu ? activeMedia.titleUr : activeMedia.titleEn}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl"
                />
              )}
            </div>

            {/* Modal Caption */}
            {(activeMedia.captionEn || activeMedia.captionUr) && (
              <div className="p-4 sm:p-6 bg-navy-900 border-t border-navy-800 text-xs sm:text-sm text-slate-300">
                <p>{isUrdu ? activeMedia.captionUr : activeMedia.captionEn}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
