'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Atom, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Globe, 
  GraduationCap, 
  Lock,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { t, toggleLanguage, isUrdu } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDeptDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t.navHome },
    { href: '/about', label: t.navAbout },
    { 
      label: isUrdu ? 'شعبہ جات' : 'Departments', 
      isDropdown: true,
      children: [
        { href: '/rahmani-islamic-center', label: t.navRahmani, icon: BookOpen, accent: 'text-gold-500' },
        { href: '/wa-education-system', label: t.navWaEducation, icon: Atom, accent: 'text-academic-500' },
      ]
    },
    { href: '/admissions', label: t.navAdmissions },
    { href: '/activities', label: t.navActivities },
    { href: '/gallery', label: t.navGallery },
    { href: '/news', label: t.navNews },
    { href: '/contact', label: t.navContact },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-navy-950 text-navy-200 text-xs py-2 border-b border-navy-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gold-400" />
              {t.locationShort}
            </span>
            <div className="flex items-center space-x-3 rtl:space-x-reverse text-slate-300 font-mono">
              <Phone className="w-3.5 h-3.5 text-academic-500" />
              <a href="tel:+923004122318" className="hover:text-gold-400 transition-colors">
                +92 300 4122318
              </a>
              <span className="text-slate-500">/</span>
              <a href="tel:03004136938" className="hover:text-gold-400 transition-colors">
                0300 4136938
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gold-500/20 text-gold-300 border border-gold-500/30">
              {t.heroBadge}
            </span>
            <Link 
              href="/admin/login" 
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-slate-500" />
              {t.navAdmin}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/20 border-b border-navy-800/80 py-2.5' 
            : 'bg-navy-900 text-white border-b border-navy-800 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Institution Brand with Official Logo */}
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold-500/50 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white p-0.5 flex-shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Rahmani Islamic Center & Wa Raast Education System"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div>
                <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center flex-wrap gap-1">
                  <span className="text-gold-400 font-serif">Rahmani</span>
                  <span className="text-slate-400 text-xs font-normal">|</span>
                  <span className="text-academic-400 font-sans">Wa Raast Education</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-300 tracking-wide font-normal">
                  {isUrdu ? 'رحمانی اسلامک سنٹر اینڈ وا راست ایجوکیشن سسٹم' : 'Model Town, Lahore'}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 rtl:space-x-reverse">
              {navLinks.map((link, idx) => {
                if (link.isDropdown && link.children) {
                  return (
                    <div key={idx} className="relative group">
                      <button
                        onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          pathname.includes('rahmani') || pathname.includes('wa-education')
                            ? 'text-gold-400 bg-navy-800/80'
                            : 'text-slate-200 hover:text-white hover:bg-navy-800/50'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 ml-1 rtl:ml-0 rtl:mr-1 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-64 pt-2 hidden group-hover:block transition-all duration-200">
                        <div className="bg-navy-900 border border-navy-700/80 rounded-xl shadow-xl p-2 space-y-1">
                          {link.children.map((child, cIdx) => {
                            const IconComponent = child.icon;
                            return (
                              <Link
                                key={cIdx}
                                href={child.href}
                                className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-navy-800 hover:text-white transition-colors"
                              >
                                <IconComponent className={`w-4 h-4 ${child.accent}`} />
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href!}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-gold-400 bg-navy-800/80 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-navy-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher & Action CTA */}
            <div className="hidden lg:flex items-center space-x-3 rtl:space-x-reverse">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLanguage}
                title="Switch Language"
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg border border-navy-700 bg-navy-800/60 hover:bg-navy-800 text-slate-200 hover:text-white text-xs font-medium transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-gold-400" />
                <span>{t.switchLang}</span>
              </button>

              {/* Apply for Admission Button */}
              <Link
                href="/admissions"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 text-xs font-bold shadow-md shadow-gold-500/10 hover:shadow-gold-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
                {t.applyNow}
              </Link>
            </div>

            {/* Mobile Controls (Language + Hamburger) */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse lg:hidden">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-md border border-navy-700 bg-navy-800 text-slate-200 text-xs font-medium"
              >
                {t.switchLang}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-950 border-b border-navy-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Phone Contacts */}
            <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-3.5 h-3.5 text-academic-500" />
                <span className="font-semibold text-gold-400">Call Us:</span>
              </div>
              <div className="flex justify-between font-mono pt-1">
                <a href="tel:+923004122318" className="text-white hover:text-gold-400 font-semibold underline">
                  +92 300 4122318
                </a>
                <a href="tel:03004136938" className="text-white hover:text-gold-400 font-semibold underline">
                  0300 4136938
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navHome}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navAbout}
              </Link>
              <div className="pl-3 rtl:pl-0 rtl:pr-3 py-1 space-y-1 border-l-2 rtl:border-l-0 rtl:border-r-2 border-navy-800 my-1">
                <Link
                  href="/rahmani-islamic-center"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm text-gold-400 hover:bg-navy-800"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.navRahmani}</span>
                </Link>
                <Link
                  href="/wa-education-system"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm text-academic-400 hover:bg-navy-800"
                >
                  <Atom className="w-4 h-4" />
                  <span>{t.navWaEducation}</span>
                </Link>
              </div>
              <Link
                href="/admissions"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navAdmissions}
              </Link>
              <Link
                href="/activities"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navActivities}
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navGallery}
              </Link>
              <Link
                href="/news"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navNews}
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
              >
                {t.navContact}
              </Link>
              <Link
                href="/admin/login"
                className="block px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:bg-navy-800 flex items-center"
              >
                <Lock className="w-3.5 h-3.5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.navAdmin}
              </Link>
            </div>

            <div className="pt-3 border-t border-navy-800">
              <Link
                href="/admissions"
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm shadow-md"
              >
                <GraduationCap className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.applyNow}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
