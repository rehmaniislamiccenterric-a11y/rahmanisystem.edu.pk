'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const whatsappNumber = '923004122318';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Assalamu Alaikum. I would like to inquire about admissions at Rahmani Islamic Center & Wa Raast Education System.'
  )}`;

  return (
    <aside 
      aria-label="Contact options"
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 group flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappFloating}
        className="flex items-center space-x-2 rtl:space-x-reverse bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform group-hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
          {t.whatsappFloating}
        </span>
      </a>
    </aside>
  );
}
