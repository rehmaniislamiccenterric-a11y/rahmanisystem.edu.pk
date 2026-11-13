'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  ShieldCheck, 
  Users, 
  Compass,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function RahmaniIslamicCenterPage() {
  const { isUrdu } = useLanguage();
  const ArrowIcon = isUrdu ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-20 lg:space-y-24 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-navy-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=2000&q=80"
            alt="Rahmani Islamic Center Quran Memorization"
            className="w-full h-full object-cover opacity-20 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/80" />
          <div className="absolute inset-0 bg-islamic-pattern opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>{isUrdu ? 'اسلامی و قرآنی شعبہ' : 'Islamic Education Department'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
              {isUrdu ? 'رحمانی اسلامک سنٹر' : 'Rahmani Islamic Center'}
            </h1>

            <p className="urdu-title text-xl sm:text-2xl text-gold-300 font-serif">
              {isUrdu ? 'حفظ القرآن، تجوید اور اخلاقی تربیت کا معتبر ادارہ' : 'Dedicated to Hifz-ul-Quran, Tajweed & Character Excellence'}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isUrdu 
                ? 'رحمانی اسلامک سنٹر ماڈل ٹاؤن لاہور میں بچوں کو قرآن مجید کی درست تجوید، پختہ حفظ اور اخلاقِ حسنہ کی تربیت فراہم کرتا ہے۔ ہمارے مستند اساتذہ محبت اور شفقت کے ساتھ بچوں کے دلوں میں عشقِ رسول ﷺ اور قرآنی اقدار کو راسخ کرتے ہیں۔'
                : 'Rahmani Islamic Center in Model Town Lahore offers personalized, compassionate Quranic education. We mentor young minds through rigorous Tajweed, disciplined Hifz-ul-Quran memorization, and foundational Sunnah etiquette.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {isUrdu ? 'حفظ القرآن میں داخلہ لیں' : 'Apply for Hifz / Nazra Admission'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Educational Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Curriculum & Disciplines</span>
          <h2 className="text-3xl font-extrabold text-navy-950">
            {isUrdu ? 'رحمانی اسلامک سنٹر کے تدریسی شعبہ جات' : 'Key Areas of Islamic Learning'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: isUrdu ? 'ناظرہ قرآن کریم بمع تجوید' : 'Nazra Quran with Tajweed',
              desc: isUrdu ? 'حروفِ تہجی کے درست مخارج، صفات اور ترتیل کے بنیادی قواعد کے ساتھ قرآن پاک کا آغاز۔' : 'Mastery of Arabic phonetics, correct articulation points (Makharij), and melodic fluency.',
              points: [isUrdu ? 'مخارج کی عملی مشق' : 'Practical Makharij training', isUrdu ? 'قواعدِ تجوید کا انفرادی جائزہ' : 'Personalized recitation critique', isUrdu ? 'تلاوت میں روانی' : 'Fluency & confidence building'],
              icon: BookOpen,
            },
            {
              title: isUrdu ? 'حفظ القرآن الکریم' : 'Hifz-ul-Quran (Full-Time)',
              desc: isUrdu ? '30 پاروں کا مکمل حفظ، یومیہ سبق، سبقی اور منزل کا پختہ دور تاکہ حفظ عمر بھر کے لیے محفوظ رہے۔' : 'Full-time memorization with structured daily Sabaq (new lesson), Sabqi (recent paras), and Manzil revision.',
              points: [isUrdu ? 'چھوٹے گروپس اور انفرادی توجہ' : 'Low student-to-teacher ratio', isUrdu ? 'پختہ دور اور منزل کا نظام' : 'Systematic retention monitoring', isUrdu ? 'سالانہ تکمیلِ حفظ و دستار بندی' : 'Annual graduation & Sanad'],
              icon: Award,
            },
            {
              title: isUrdu ? 'حسنِ قرأت و تجوید کورس' : 'Advanced Tajweed Mastery',
              desc: isUrdu ? 'طلباء کو حسنِ صوت، وقف و ابتدا اور بین الاقوامی معیار کی تلاوت کی خصوصی مہارت۔' : 'Advanced vocal modulation, Waqf & Ibtida rules, and recitation according to authentic Riwayah.',
              points: [isUrdu ? 'بین الاقوامی مسابقات کی تیاری' : 'Qirat competition preparation', isUrdu ? 'مستند قراء کی رہنمائی' : 'Mentorship by certified Qura', isUrdu ? 'صوتی حسن و ترنم' : 'Aesthetic vocal refinement'],
              icon: Sparkles,
            },
            {
              title: isUrdu ? 'بنیادی دینی و فقہی تعلیم' : 'Essential Islamic Studies',
              desc: isUrdu ? 'طہارت، وضو، نماز، روزمرہ کی دعائیں، بنیادی عقائد اور فرائض و واجبات کی تفہیم۔' : 'Foundational Fiqh of Taharah, Salah, essential Sunnah supplications, and core Aqeedah.',
              points: [isUrdu ? 'عملی وضو و نماز کی تربیت' : 'Hands-on Salah workshops', isUrdu ? 'مسنون دعائیں اور اذکار' : 'Daily Masnoon Adhkar', isUrdu ? 'حلال و حرام کی تمیز' : 'Ethical consciousness'],
              icon: Compass,
            },
            {
              title: isUrdu ? 'اخلاق و سیرت النبی ﷺ' : 'Islamic Character & Seerah',
              desc: isUrdu ? 'رسول اللہ ﷺ کی سیرتِ طیبہ سے رہنمائی، والدین کا ادب، بڑوں کا احترام اور سچائی کی عملی تربیت۔' : 'Inculcating moral fortitude, filial respect, truthfulness, humility, and civic empathy.',
              points: [isUrdu ? 'ہفتہ وار اخلاقی نشستیں' : 'Weekly Tarbiyah circles', isUrdu ? 'والدین اور اساتذہ کا ادب' : 'Etiquette with elders', isUrdu ? 'معاشرتی ذمہ داری کا احساس' : 'Community brotherhood'],
              icon: HeartHandshake,
            },
            {
              title: isUrdu ? 'روزمرہ سرگرمیاں اور تربیتی جائزے' : 'Daily Routine & Progress Review',
              desc: isUrdu ? 'صبح سویرے ذکر و اذکار، باقاعدہ تلاوت، وقفہ اور والدین کے ساتھ باقاعدہ رابطہ۔' : 'Disciplined daily schedule with early morning revision, spiritual focus, and transparent parent reporting.',
              points: [isUrdu ? 'ماہانہ تعلیمی رپورٹ' : 'Monthly progress cards', isUrdu ? 'والدین و اساتذہ رابطہ' : 'Regular parent conferences', isUrdu ? 'صحت مند جسمانی چستی' : 'Physical well-being breaks'],
              icon: Clock,
            },
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-gold-200/70 p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 font-serif">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                  <div className="pt-2 space-y-2">
                    {card.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center text-xs text-slate-700 space-x-2 rtl:space-x-reverse">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pathway to Academic Stream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white border border-gold-500/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              {isUrdu ? 'حفظ کے بعد کا مرحلہ' : 'Next Step After Memorization'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {isUrdu ? 'حفظ مکمل کرنے کے بعد وا راست ایجوکیشن سسٹم میں تسلسل' : 'Seamless Transition to Wa Raast Education System'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isUrdu
                ? 'ہمارے ہاں حفظ مکمل کرنے والے طلباء کو اسکولنگ میں کوئی سال ضائع کیے بغیر وا راست ایجوکیشن سسٹم کے ذریعے سائنس، ریاضی اور انگریزی کے تیز رفتار نصاب میں شامل کیا جاتا ہے۔'
                : 'Students graduating with Hifz-ul-Quran from Rahmani Islamic Center smoothly progress into Wa Raast Education System for accelerated academic excellence in Science, Math, and English without losing academic years.'}
            </p>
          </div>
          <Link
            href="/wa-education-system"
            className="flex-shrink-0 inline-flex items-center px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm shadow-md"
          >
            <span>{isUrdu ? 'وا راست ایجوکیشن سسٹم دیکھیے' : 'Explore Wa Raast Education'}</span>
            <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
