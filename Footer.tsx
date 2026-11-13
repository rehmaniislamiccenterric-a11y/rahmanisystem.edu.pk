'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Atom, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  const { t, isUrdu } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Institutional Identity with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gold-500/50 shadow-md bg-white p-0.5 flex-shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Rahmani Islamic Center & Wa Raast Education System Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                  {isUrdu ? 'رحمانی اسلامک سنٹر' : 'Rahmani Islamic Center'}
                </h3>
                <p className="text-academic-400 text-xs font-medium">
                  {isUrdu ? '& وا راست ایجوکیشن سسٹم' : '& Wa Raast Education System'}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-gold-400">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>{isUrdu ? 'قرآنی اقدار کے ساتھ جدید سائنسی علوم' : 'Quranic Values & Modern Academic Rigor'}</span>
            </div>
          </div>

          {/* Col 2: Two Departments */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider border-b border-navy-800 pb-2">
              {t.departments}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link 
                  href="/rahmani-islamic-center" 
                  className="group flex items-start space-x-2 rtl:space-x-reverse text-slate-300 hover:text-gold-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">{t.navRahmani}</span>
                    <span className="text-slate-400 text-[11px]">
                      {isUrdu ? 'ناظرہ، حفظ القرآن، تجوید و اخلاقی تربیت' : 'Nazra, Hifz-ul-Quran, Tajweed & Character'}
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/wa-education-system" 
                  className="group flex items-start space-x-2 rtl:space-x-reverse text-slate-300 hover:text-academic-400 transition-colors"
                >
                  <Atom className="w-4 h-4 text-academic-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">{t.navWaEducation}</span>
                    <span className="text-slate-400 text-[11px]">
                      {isUrdu ? 'سائنس، ریاضی، انگریزی اور عملی سائنسی لیب' : 'Science, Mathematics, Labs & Modern Learning'}
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider border-b border-navy-800 pb-2">
              {t.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {[
                { href: '/', label: t.navHome },
                { href: '/about', label: t.navAbout },
                { href: '/admissions', label: t.navAdmissions },
                { href: '/activities', label: t.navActivities },
                { href: '/gallery', label: t.navGallery },
                { href: '/news', label: t.navNews },
                { href: '/contact', label: t.navContact },
                { href: '/admin/login', label: t.navAdmin },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-gold-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Campus & Official Contact Numbers */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider border-b border-navy-800 pb-2">
              {t.connectWithUs}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{t.modelTownLocation}</span>
              </div>

              {/* Both Official Contact Numbers */}
              <div className="space-y-1.5 p-3 rounded-xl bg-navy-900/90 border border-navy-800">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gold-400 font-semibold text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-academic-500 flex-shrink-0" />
                  <span>{isUrdu ? 'سرکاری رابطہ نمبرز:' : 'Official Contact Numbers:'}</span>
                </div>
                <div className="space-y-1 font-mono text-xs pl-5 rtl:pl-0 rtl:pr-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px] font-sans">Phone 1:</span>
                    <a href="tel:+923004122318" className="text-white hover:text-gold-400 font-bold transition-colors">
                      +92 300 4122318
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px] font-sans">Phone 2:</span>
                    <a href="tel:03004136938" className="text-white hover:text-gold-400 font-bold transition-colors">
                      0300 4136938
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/923004122318" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:underline font-mono"
                >
                  WhatsApp: +92 300 4122318
                </a>
              </div>

              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>admissions@rahmanisystem.edu.pk</span>
              </div>
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{t.visitingHoursVal}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-900 bg-black/40 py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-center sm:text-left rtl:sm:text-right">
            © {new Date().getFullYear()} {t.allRightsReserved}
          </p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href="/admissions" className="text-gold-400 hover:underline">
              {t.applyNow}
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">
              {t.navContact}
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-white">
              {t.navAdmin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
