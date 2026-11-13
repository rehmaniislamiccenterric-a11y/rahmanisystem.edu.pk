'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Atom, 
  Microscope, 
  Calculator, 
  Languages, 
  GraduationCap, 
  CheckCircle2, 
  Lightbulb, 
  Laptop, 
  BookOpen,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function WaEducationSystemPage() {
  const { isUrdu } = useLanguage();
  const ArrowIcon = isUrdu ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-20 lg:space-y-24 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-navy-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=80"
            alt="Wa Raast Education System Science Laboratory & Academic Classrooms"
            className="w-full h-full object-cover opacity-25 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-academic-900/80" />
          <div className="absolute inset-0 bg-science-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-academic-500/20 border border-academic-500/30 text-academic-300 text-xs font-semibold">
              <Atom className="w-4 h-4 text-academic-400" />
              <span>{isUrdu ? 'جدید اکیڈمک و سائنسی شعبہ' : 'Academic & Science Department'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {isUrdu ? 'وا راست ایجوکیشن سسٹم' : 'Wa Raast Education System'}
            </h1>

            <p className="text-xl sm:text-2xl text-academic-300 font-medium">
              {isUrdu ? 'حفظ القرآن کے بعد جدید علوم اور سائنسی مہارت کا درخشاں سفر' : 'Accelerated Academic Pathway for Quranic Scholars & Future Leaders'}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isUrdu
                ? 'وا راست ایجوکیشن سسٹم رحمانی اسلامک سنٹر کا جدید اکیڈمک شعبہ ہے جو حفظ القرآن مکمل کرنے والے اور عام طلباء کو سائنس، ریاضی، انگریزی اور کمپیوٹر میں کمال درجے کی تدریس فراہم کرتا ہے۔ ہمارا مقصد ایسے باصلاحیت نوجوان تیار کرنا ہے جو دینی اقدار کے ساتھ سائنسی میدانوں میں صفِ اول پر ہوں۔'
                : 'Wa Raast Education System is the dedicated academic branch associated with Rahmani Islamic Center. It provides an accelerated, rigorous academic curriculum designed for students who complete Hifz-ul-Quran as well as academic learners, mastering Science, Math, English, and analytical problem-solving.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-academic-500 hover:bg-academic-600 text-white font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isUrdu ? 'اکیڈمک شعبے میں داخلہ لیں' : 'Apply for Wa Raast Academic Stream'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Hifz-to-Academic Bridge Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-academic-600 uppercase tracking-wider">
              {isUrdu ? 'ہماری منفرد تعلیمی حکمتِ عملی' : 'Our Unique Pedagogical Bridge'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              {isUrdu ? 'حفظ کے بعد تعلیمی خلاء کا خاتمہ اور ایکسلریٹڈ لرننگ' : 'No Academic Gap: Harnessing the Memorization Superpower'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {isUrdu
                ? 'حفظِ قرآن کے دوران بچوں کا دماغ غیر معمولی یادداشت، یکسوئی اور نظم و ضبط کا عادی ہو جاتا ہے۔ وا راست ایجوکیشن سسٹم اسی ذہنی صلاحیت کو استعمال کر کے کم وقت میں سائنسی اور حسابی مضامین کی بنیادی اور اعلیٰ تعلیم ممکن بناتا ہے۔ طلباء بورڈ کے امتحانات اور مقابلہ جاتی مقابلوں میں بہترین کارکردگی دکھاتے ہیں۔'
                : 'During Hifz, students cultivate exceptional concentration, memory retention, and mental discipline. Wa Raast Education System channels this enhanced cognitive capacity into fast-track mathematics, scientific inquiry, and language fluency, allowing students to seamlessly catch up and excel in board exams.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                isUrdu ? 'عملی لیبارٹری مشقیں' : 'Interactive Lab Experiments',
                isUrdu ? 'تصوراتی ریاضی کی تدریس' : 'Conceptual Math Problem Solving',
                isUrdu ? 'انگریزی گفتگو اور تحریر' : 'Spoken English & Creative Writing',
                isUrdu ? 'سمارٹ ملٹی میڈیا کلاس رومز' : 'Smart Multimedia Classrooms',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-academic-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1000&q=80"
                alt="Science Experiment Lab at Wa Raast Education System"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Disciplines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-academic-600 uppercase tracking-wider">Academic Disciplines</span>
          <h2 className="text-3xl font-extrabold text-navy-950">
            {isUrdu ? 'وا راست ایجوکیشن سسٹم کے بنیادی مضامین' : 'Core Academic Subjects & Modules'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: isUrdu ? 'سائنسی تعلیم و لیبارٹری' : 'Science Education & Practical Labs',
              desc: isUrdu ? 'فزکس، کیمسٹری اور بیالوجی کے بنیادی اور عملی تصورات کی تفہیم سائنسی تجربات کے ذریعے کی جاتی ہے۔' : 'Hands-on laboratory stations, physics mechanics, chemistry reactions, and biology cell models.',
              icon: Microscope,
            },
            {
              title: isUrdu ? 'ریاضی اور منطقی سوچ' : 'Mathematics, Algebra & Logic',
              desc: isUrdu ? 'تصوراتی ریاضی، الجبرا، جیومیٹری اور حسابی مسائل کو حل کرنے کی جدید تیز رفتار تکنیک۔' : 'Conceptual arithmetic, algebraic equations, geometry, and real-world mathematical logic drills.',
              icon: Calculator,
            },
            {
              title: isUrdu ? 'انگریزی زبان کی مہارت' : 'English Language & Communication',
              desc: isUrdu ? 'گرائمر، ذخیرہ الفاظ، روانی سے گفتگو اور تخلیقی مضامین نویسی کی اعلیٰ تربیت۔' : 'Grammar foundations, vocabulary building, conversational confidence, and creative composition.',
              icon: Languages,
            },
            {
              title: isUrdu ? 'اردو ادب و انشا' : 'Urdu Literature & Expression',
              desc: isUrdu ? 'قومی زبان اردو کا درست تلفظ، خطاطی، انشا پردازی اور کلاسیکی و جدید ادبی ذخیرہ۔' : 'Refined Urdu syntax, calligraphy, essay writing, and appreciation of national literature.',
              icon: BookOpen,
            },
            {
              title: isUrdu ? 'کمپیوٹر سائنس و ڈیجیٹل اسکلز' : 'Computer Science & Digital Literacy',
              desc: isUrdu ? 'بنیادی کمپیوٹر آپریٹنگ، کوڈنگ لاجک، ٹائپنگ اسپیڈ اور ڈیجیٹل ٹیکنالوجی کے اخلاقی استعمال کا شعور۔' : 'Computer fundamentals, introductory programming logic, digital research, and safe tech ethics.',
              icon: Laptop,
            },
            {
              title: isUrdu ? 'عملی سائنسی پراجیکٹس' : 'Practical Projects & Discovery Fairs',
              desc: isUrdu ? 'سالانہ سائنسی نمائش، ماڈل سازی، اور طلباء کے خود ساختہ سائنسی پراجیکٹس کی حوصلہ افزائی۔' : 'Annual STEM science fairs, model building, robotic car kits, and student team demonstrations.',
              icon: Lightbulb,
            },
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-sky-100 p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-academic-600 flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Admission CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-sky-500/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {isUrdu ? 'وا راست ایجوکیشن سسٹم میں داخلے کے لیے تیار ہیں؟' : 'Ready to Enroll in Wa Raast Education System?'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              {isUrdu
                ? 'آن لائن داخلہ فارم مکمل کیجیے اور ایڈمشن ٹیسٹ و انٹرویو کے لیے اپنی تاریخ کا تعین کیجیے۔'
                : 'Submit an online application today to register for the academic bridge program in Model Town, Lahore.'}
            </p>
          </div>
          <Link
            href="/admissions"
            className="flex-shrink-0 inline-flex items-center px-6 py-3.5 rounded-xl bg-academic-500 hover:bg-academic-600 text-white font-bold text-sm shadow-md"
          >
            <span>{isUrdu ? 'آن لائن داخلہ فارم کھولیں' : 'Open Admission Form'}</span>
            <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
