'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Atom, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Award, 
  Microscope, 
  Calculator, 
  Languages, 
  HeartHandshake, 
  Star,
  Calendar,
  Layers,
  UserCheck
} from 'lucide-react';

export default function HomePage() {
  const { t, isUrdu } = useLanguage();
  const [stats, setStats] = useState({
    hifz: 240,
    academic: 410,
    faculty: 32,
    years: 12,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, actRes, testRes] = await Promise.all([
          fetch('/api/admin/settings').then(r => r.json()).catch(() => ({})),
          fetch('/api/activities?featured=true').then(r => r.json()).catch(() => ({ activities: [] })),
          fetch('/api/testimonials').then(r => r.json()).catch(() => ({ testimonials: [] })),
        ]);

        if (settingsRes?.settings) {
          setStats({
            hifz: settingsRes.settings.statHifzGraduates || 240,
            academic: settingsRes.settings.statAcademicStudents || 410,
            faculty: settingsRes.settings.statQualifiedFaculty || 32,
            years: new Date().getFullYear() - (settingsRes.settings.statEstablishedYear || 2014),
          });
        }
        if (actRes?.activities) {
          setActivities(actRes.activities.slice(0, 3));
        }
        if (testRes?.testimonials) {
          setTestimonials(testRes.testimonials);
        }
      } catch (err) {
        console.error('Data load error:', err);
      }
    }
    loadData();
  }, []);

  const ArrowIcon = isUrdu ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-20 lg:space-y-28 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center bg-navy-950 text-white overflow-hidden">
        {/* Rich Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Students learning in modern Islamic educational environment"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/80" />
          <div className="absolute inset-0 bg-islamic-pattern opacity-40 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-8">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-medium backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Bilingual Main Headings */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.heroTitle}
              </h1>
              <p className="urdu-title text-xl sm:text-2xl lg:text-3xl font-medium text-gold-300 leading-relaxed font-serif">
                {t.heroUrduSub}
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {t.heroDescription}
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-navy-950 text-base font-bold shadow-xl shadow-gold-500/20 hover:shadow-gold-500/35 transition-all transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.applyNow}
              </Link>

              <a
                href="#departments"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl border border-slate-600 hover:border-slate-400 bg-navy-900/60 hover:bg-navy-800/80 text-white text-sm font-semibold backdrop-blur-sm transition-all"
              >
                {t.explorePrograms}
                <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 text-gold-400" />
              </a>
            </div>

            {/* Real Stats Counters */}
            <div className="pt-8 border-t border-navy-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-serif">
                  {stats.hifz}+
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {t.heroStat1Label}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-academic-400">
                  {stats.academic}+
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {t.heroStat2Label}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stats.faculty}+
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {t.heroStat3Label}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-serif">
                  {stats.years}+
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {t.heroStat4Label}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL INTRODUCTION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-100 rounded-full blur-3xl -z-0 opacity-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl -z-0 opacity-40" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-gold-600" />
                <span>{t.introBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-navy-950 tracking-tight leading-snug">
                {t.introTitle}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {t.introDescription}
              </p>

              <div className="p-5 rounded-2xl bg-ivory-50 border-l-4 rtl:border-l-0 rtl:border-r-4 border-gold-500 shadow-sm">
                <p className="text-navy-900 font-serif italic text-base sm:text-lg font-medium">
                  {t.visionQuote}
                </p>
                <p className="text-xs text-gold-700 font-semibold mt-1">
                  — Model Town, J Block, Lahore, Pakistan
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80"
                  alt="Quranic reading and academic student interaction"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-950/90 to-transparent text-white text-xs">
                  <span className="font-bold text-gold-400 block">{isUrdu ? 'تربیت و تعلیم کا باہمی اشتراک' : 'Seamless Dual Integration'}</span>
                  <span>{isUrdu ? 'حفظ القرآن کے ساتھ جدید سائنسی علوم' : 'From Hifz-ul-Quran to Modern Laboratories'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 OFFICIAL FOUNDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 lg:p-14 border border-gold-500/30 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-academic-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Photograph Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-academic-500 rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-300" />
                <div className="relative w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden border-4 border-gold-400/80 shadow-2xl bg-navy-900">
                  <img
                    src="/images/founder.jpg"
                    alt={t.founderName}
                    className="w-full h-auto object-cover object-top filter brightness-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-black uppercase tracking-wider shadow">
                      {t.founderDesignation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Details & Message Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <UserCheck className="w-4 h-4 text-gold-400" />
                <span>{t.founderBadge}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {t.founderName}
                </h3>
                <p className="urdu-title text-xl sm:text-2xl text-gold-300 font-serif">
                  {t.founderNameUrdu}
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-lg bg-navy-800 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-wide">
                  {t.founderDesignation} • Rahmani Islamic Center & Wa Raast Education System
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {t.founderIntro}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-navy-800">
                <span className="flex items-center text-gold-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gold-500" />
                  {isUrdu ? 'قرآنی علوم کی پختہ تربیت' : 'Quranic Memorization & Tajweed'}
                </span>
                <span className="flex items-center text-academic-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-academic-500" />
                  {isUrdu ? 'جدید اکیڈمک و سائنسی کمال' : 'Modern Academic & Science Excellence'}
                </span>
                <span className="flex items-center text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gold-500" />
                  {isUrdu ? 'ماڈل ٹاؤن، جے بلاک، لاہور' : 'Model Town, J Block, Lahore'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TWO MAIN DEPARTMENTS (DISTINCT VISUAL ACCENTS) */}
      <section id="departments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
            {t.deptSectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            {t.deptSectionTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.deptSectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Rahmani Islamic Center */}
          <div className="bg-white rounded-3xl border border-gold-200/80 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">Department A</span>
                  <h3 className="text-2xl font-bold text-navy-950 font-serif">
                    {t.dept1Title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {t.dept1Desc}
              </p>

              <div className="space-y-3 pt-2">
                {t.dept1Points.map((point: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 rtl:space-x-reverse text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/rahmani-islamic-center"
                className="inline-flex items-center font-bold text-gold-700 hover:text-gold-800 text-sm group-hover:underline"
              >
                <span>{t.dept1Button}</span>
                <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
              </Link>
              <Link
                href="/admissions"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gold-500 text-navy-950 hover:bg-gold-600 transition-colors"
              >
                {t.applyNow}
              </Link>
            </div>
          </div>

          {/* Card 2: Wa Raast Education System */}
          <div className="bg-white rounded-3xl border border-sky-200/80 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-sky-500/20 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-academic-600 group-hover:scale-110 transition-transform">
                  <Atom className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-academic-600 tracking-wider uppercase">Department B</span>
                  <h3 className="text-2xl font-bold text-navy-950">
                    {t.dept2Title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {t.dept2Desc}
              </p>

              <div className="space-y-3 pt-2">
                {t.dept2Points.map((point: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 rtl:space-x-reverse text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-academic-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/wa-education-system"
                className="inline-flex items-center font-bold text-academic-600 hover:text-academic-700 text-sm group-hover:underline"
              >
                <span>{t.dept2Button}</span>
                <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
              </Link>
              <Link
                href="/admissions"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
              >
                {t.applyNow}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR EDUCATIONAL PROGRAMS (ICON-BASED CARDS) */}
      <section className="bg-navy-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.programsTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {t.programsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.progNazra, desc: t.progNazraDesc, icon: BookOpen, color: 'text-gold-400', border: 'hover:border-gold-500' },
              { title: t.progHifz, desc: t.progHifzDesc, icon: Award, color: 'text-amber-400', border: 'hover:border-amber-500' },
              { title: t.progTarbiya, desc: t.progTarbiyaDesc, icon: HeartHandshake, color: 'text-emerald-400', border: 'hover:border-emerald-500' },
              { title: t.progScience, desc: t.progScienceDesc, icon: Microscope, color: 'text-cyan-400', border: 'hover:border-cyan-500' },
              { title: t.progMath, desc: t.progMathDesc, icon: Calculator, color: 'text-sky-400', border: 'hover:border-sky-500' },
              { title: t.progEnglish, desc: t.progEnglishDesc, icon: Languages, color: 'text-indigo-400', border: 'hover:border-indigo-500' },
            ].map((prog, idx) => {
              const IconComp = prog.icon;
              return (
                <div 
                  key={idx}
                  className={`bg-navy-950/70 border border-navy-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${prog.border}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-4">
                    <IconComp className={`w-6 h-6 ${prog.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{prog.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{prog.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. EDUCATIONAL JOURNEY (STEP-BY-STEP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-navy-100 text-navy-800 text-xs font-semibold">
            {isUrdu ? 'تعلیمی ارتقاء' : 'Structured Roadmap'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            {t.journeyTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.journeySubtitle}
          </p>
        </div>

        <div className="relative">
          {/* Connector Line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-academic-500 to-navy-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {[
              { step: '1', title: t.journeyStep1, desc: t.journeyStep1Desc, tag: 'Rahmani' },
              { step: '2', title: t.journeyStep2, desc: t.journeyStep2Desc, tag: 'Rahmani' },
              { step: '3', title: t.journeyStep3, desc: t.journeyStep3Desc, tag: 'Character' },
              { step: '4', title: t.journeyStep4, desc: t.journeyStep4Desc, tag: 'Wa Raast' },
              { step: '5', title: t.journeyStep5, desc: t.journeyStep5Desc, tag: 'Excellence' },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center font-bold text-sm mb-4 shadow">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {item.tag}
                  </span>
                  <h4 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STUDENT ACTIVITIES PREVIEW */}
      <section className="bg-ivory-100/70 py-20 border-y border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Campus Life</span>
              <h2 className="text-3xl font-extrabold text-navy-950 tracking-tight">
                {t.activitiesTitle}
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mt-1">
                {t.activitiesSubtitle}
              </p>
            </div>
            <Link
              href="/activities"
              className="inline-flex items-center text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors"
            >
              <span>{t.viewAllActivities}</span>
              <ArrowIcon className="w-4 h-4 ml-1.5 rtl:ml-0 rtl:mr-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.length > 0 ? (
              activities.map((act) => (
                <div 
                  key={act.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={act.mediaUrl} 
                      alt={isUrdu ? act.titleUr : act.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-navy-950/80 text-white backdrop-blur-sm">
                        {act.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span>{act.activityDate || 'Recent'}</span>
                      </div>
                      <h3 className="text-base font-bold text-navy-950 group-hover:text-gold-600 transition-colors leading-snug">
                        {isUrdu ? act.titleUr : act.titleEn}
                      </h3>
                      <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                        {isUrdu ? act.descriptionUr : act.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-slate-400">
                Loading activities...
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. PARENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
            {isUrdu ? 'اعتماد اور اطمینان' : 'Parent Trust'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-gold-500">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{isUrdu ? test.quoteUr : test.quoteEn}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <h4 className="font-bold text-navy-950 text-sm">
                  {isUrdu ? test.parentNameUr : test.parentNameEn}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isUrdu ? test.studentRelationUr : test.studentRelationEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ADMISSION CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-navy-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
              {isUrdu ? 'نئے تعلیمی سیشن کے داخلے' : 'Online Admissions 2026-2027'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {t.ctaHeading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.ctaSubheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-base font-bold shadow-xl shadow-gold-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.ctaButton}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-500 text-white text-sm font-semibold transition-all hover:bg-navy-800"
              >
                {t.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
