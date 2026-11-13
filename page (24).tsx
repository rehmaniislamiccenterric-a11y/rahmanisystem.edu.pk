'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Atom, 
  MapPin, 
  CheckCircle2, 
  UserCheck,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  const { t, isUrdu } = useLanguage();

  return (
    <div className="space-y-20 lg:space-y-24 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-navy-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2000&q=80"
            alt="Campus Architecture & Library"
            className="w-full h-full object-cover opacity-20 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/80" />
          <div className="absolute inset-0 bg-islamic-pattern opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
              {isUrdu ? 'ہمارا تعارف و تاریخ' : 'Our Legacy & Vision'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {isUrdu ? 'ہمارے بارے میں' : 'About Our Institution'}
            </h1>
            <p className="urdu-title text-xl sm:text-2xl text-gold-300 font-serif">
              {isUrdu ? 'رحمانی اسلامک سنٹر اینڈ وا راست ایجوکیشن سسٹم کا سفر' : 'The Journey of Rahmani Islamic Center & Wa Raast Education System'}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isUrdu
                ? 'ماڈل ٹاؤن، جے بلاک، لاہور میں قائم یہ ادارہ قرآنی علوم کی پختہ تربیت اور جدید سائنسی و حسابی مضامین کے امتزاج کا ایک منفرد مرکز ہے۔'
                : 'Located in Model Town, J Block, Lahore, Pakistan, our institution brings together authentic Quranic memorization and contemporary academic rigor under a single harmonized campus.'}
            </p>
          </div>
        </div>
      </section>

      {/* DEDICATED FOUNDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-14 border border-gold-500/40 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-academic-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Founder Photograph Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-academic-500 rounded-3xl blur-md opacity-60 group-hover:opacity-85 transition duration-300" />
                <div className="relative w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden border-4 border-gold-400 shadow-2xl bg-navy-900">
                  <img
                    src="/images/founder.jpg"
                    alt={t.founderName}
                    className="w-full h-auto object-cover object-top filter brightness-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-black uppercase tracking-wider shadow">
                      {t.founderDesignation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <UserCheck className="w-4 h-4 text-gold-400" />
                <span>{t.founderBadge}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {t.founderName}
                </h2>
                <p className="urdu-title text-2xl sm:text-3xl text-gold-300 font-serif">
                  {t.founderNameUrdu}
                </p>
                <div className="inline-block px-3 py-1 rounded-lg bg-navy-800 border border-gold-500/40 text-gold-400 text-xs font-bold tracking-wide">
                  {t.founderDesignation} • Rahmani Islamic Center & Wa Raast Education System
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {t.founderIntro}
              </p>

              <div className="p-4 rounded-2xl bg-navy-900/90 border-l-4 rtl:border-l-0 rtl:border-r-4 border-gold-500 text-xs sm:text-sm text-slate-200">
                <p className="italic font-serif">
                  {isUrdu
                    ? '”ہماری اولین ترجیح نونہالانِ امت کو قرآنِ کریم کے حفظ اور فہم کے ساتھ ساتھ سائنسی اور جدید علوم میں وہ کمال عطا کرنا ہے جس سے وہ دنیا اور آخرت دونوں میں سرخرو ہوں۔“'
                    : '“Our paramount aspiration is to nurture young hearts with Quranic memorization and character, while arming their intellect with modern scientific excellence so they stand distinguished in every sphere of life.”'}
                </p>
                <span className="block text-gold-400 font-bold mt-2">
                  — {t.founderName} ({t.founderDesignation})
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* History & Institutional Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
              {isUrdu ? 'تاریخ اور پس منظر' : 'Our History & Background'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 leading-snug">
              {isUrdu 
                ? 'ایک وژن سے شروع ہونے والا بااعتماد تعلیمی سفر' 
                : 'Founded on the Vision of Quranic Excellence & Modern Knowledge'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isUrdu
                ? 'رحمانی اسلامک سنٹر کا قیام اس دیرینہ ضرورت کو پورا کرنے کے لیے عمل میں لایا گیا تھا کہ جہاں بچے حفظِ قرآن کے ساتھ ساتھ جدید دنیا میں آگے بڑھنے کے لیے ضروری سائنسی اور ریاضیاتی صلاحیتوں سے بھی آراستہ ہوں۔ بعد ازاں، وا راست ایجوکیشن سسٹم کو بطور اکیڈمک ونگ منسلک کیا گیا تاکہ حفظ مکمل کرنے والے طلباء کا ایک سال بھی ضائع نہ ہو اور وہ تیز رفتاری سے اسکولی تعلیم میں اول پوزیشن حاصل کریں۔'
                : 'Rahmani Islamic Center was founded to address a critical educational gap: allowing children to memorize the Holy Quran without disconnecting from modern academic progress. Wa Raast Education System was established as its academic partner stream, offering a specialized bridge curriculum where young Huffaz master science, mathematics, and English with accelerated speed.'}
            </p>
            <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 text-xs text-navy-950 font-medium">
              <MapPin className="w-4 h-4 inline-block mr-1 rtl:mr-0 rtl:ml-1 text-gold-600" />
              {isUrdu ? 'کیمپس: ماڈل ٹاؤن، جے بلاک، لاہور، پاکستان' : 'Campus: Model Town, J Block, Lahore, Pakistan'}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Students, teachers, and leadership in educational seminar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-navy-950/80 p-8 sm:p-10 rounded-3xl border border-gold-500/30 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                {isUrdu ? 'ہمارا وژن (Vision)' : 'Our Vision'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isUrdu
                  ? '”قرآنی تعلیم اور جدید تعلیمی کمال کا حسین امتزاج۔“ ہم ایک ایسی نسل کی آبیاری کر رہے ہیں جو دل میں اللہ اور اس کے رسول ﷺ کا خوف و محبت رکھتی ہو اور عقل و فہم میں جدید دور کی قیادت کی اہل ہو۔'
                  : '“Quranic Education with Modern Academic Excellence.” We envision an enlightened generation firmly grounded in divine revelation and equipped to lead in scientific, analytical, and professional spheres globally.'}
              </p>
            </div>

            <div className="bg-navy-950/80 p-8 sm:p-10 rounded-3xl border border-sky-500/30 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-academic-400 flex items-center justify-center">
                <Atom className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {isUrdu ? 'ہمارا مشن (Mission)' : 'Our Mission'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isUrdu
                  ? 'طلباء کو حسنِ تجوید و حفظ کے ساتھ ساتھ فزکس، کیمسٹری، بیالوجی، میتھ اور انگریزی میں اعلیٰ معیار کی تعلیم فراہم کرنا، نیز اخلاقِ حسنہ اور سیرت النبی ﷺ کے سانچے میں ان کے کردار کو ڈھالنا۔'
                  : 'To provide structured, compassionate Quranic memorization alongside state-of-the-art laboratory sciences, conceptual mathematics, and language proficiency within a safe, nurturing, and disciplined campus.'}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
