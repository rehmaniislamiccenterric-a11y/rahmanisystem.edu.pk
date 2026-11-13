'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('rahmani_lang') as Language | null;
    if (saved === 'en' || saved === 'ur') {
      setLanguageState(saved);
      document.documentElement.setAttribute('dir', saved === 'ur' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', saved);
    } else {
      // Default to English with LTR
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rahmani_lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'ur' : 'en';
    setLanguage(next);
  };

  const t = translations[language];
  const isUrdu = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isUrdu }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
