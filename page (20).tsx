'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  GraduationCap, 
  User, 
  Phone, 
  MapPin, 
  BookOpen, 
  Atom, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Mail,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdmissionsPage() {
  const { t, isUrdu } = useLanguage();
  const ArrowIcon = isUrdu ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    photoUrl: '',
    fatherContact: '',
    whatsappNumber: '',
    email: '',
    address: '',
    previousSchool: '',
    previousClass: '',
    currentLevel: '',
    department: 'RAHMANI_ISLAMIC',
    admissionProgram: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);

  // Dynamic program options per department
  const rahmaniPrograms = [
    { value: 'Hifz-ul-Quran (Full-time Memorization & Daur)', labelEn: 'Hifz-ul-Quran (Full-time Memorization & Daur)', labelUr: 'حفظ القرآن الکریم (مکمل وقت و پختہ دور)' },
    { value: 'Nazra Quran with Certified Ahkam-e-Tajweed', labelEn: 'Nazra Quran with Certified Ahkam-e-Tajweed', labelUr: 'ناظرہ قرآن کریم بمع تجوید و مخارج' },
    { value: 'Advanced Tajweed & Melodic Qirat Specialization', labelEn: 'Advanced Tajweed & Melodic Qirat Specialization', labelUr: 'حسنِ قرأت و تجوید کورس' },
    { value: 'Basic Islamic Education & Character Grooming', labelEn: 'Basic Islamic Education & Character Grooming', labelUr: 'بنیادی دینی تعلیمات، مسنون دعائیں و اخلاقی تربیت' },
  ];

  const waPrograms = [
    { value: 'Accelerated Academic Bridge for Huffaz (Science & Math)', labelEn: 'Accelerated Academic Bridge for Huffaz (Science & Math)', labelUr: 'حفاظ کے لیے خصوصی اکیڈمک برج کورس (سائنس و ریاضی)' },
    { value: 'Primary Science & Mathematical Foundations (Grade 1-5)', labelEn: 'Primary Science & Mathematical Foundations (Grade 1-5)', labelUr: 'پرائمری سائنس، ریاضی اور انگریزی فاؤنڈیشن (اول تا پنجم)' },
    { value: 'Middle School STEM Stream (Grade 6-8)', labelEn: 'Middle School STEM Stream (Grade 6-8)', labelUr: 'مڈل اسکول سائنس و ریاضی اسٹریم (ششم تا ہشتم)' },
    { value: 'Matriculation Science Preparation (Physics, Chem, Bio, Math)', labelEn: 'Matriculation Science Preparation (Physics, Chem, Bio, Math)', labelUr: 'میٹرک سائنس پریپریشن (فزکس، کیمسٹری، بیالوجی، میتھ)' },
  ];

  const currentProgramList = formData.department === 'RAHMANI_ISLAMIC' ? rahmaniPrograms : waPrograms;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // If changing department, reset admissionProgram to default first option
      if (name === 'department') {
        const nextList = value === 'RAHMANI_ISLAMIC' ? rahmaniPrograms : waPrograms;
        return {
          ...prev,
          department: value,
          admissionProgram: nextList[0].value,
        };
      }
      return { ...prev, [name]: value };
    });
  };

  // Set initial program if empty
  React.useEffect(() => {
    if (!formData.admissionProgram) {
      setFormData(prev => ({
        ...prev,
        admissionProgram: rahmaniPrograms[0].value,
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Required validation
    if (!formData.studentName.trim() || !formData.fatherName.trim() || !formData.dob || !formData.fatherContact.trim() || !formData.whatsappNumber.trim() || !formData.address.trim()) {
      setErrorMessage(t.formRequiredError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmissionSuccess({
        ...formData,
        referenceNumber: data.referenceNumber,
        date: new Date().toLocaleDateString(),
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (cErr) {
        // ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setSubmissionSuccess(null);
    setFormData({
      studentName: '',
      fatherName: '',
      dob: '',
      gender: 'Male',
      photoUrl: '',
      fatherContact: '',
      whatsappNumber: '',
      email: '',
      address: '',
      previousSchool: '',
      previousClass: '',
      currentLevel: '',
      department: 'RAHMANI_ISLAMIC',
      admissionProgram: rahmaniPrograms[0].value,
      additionalNotes: '',
    });
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-3 no-print">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-gold-600" />
            <span>{isUrdu ? 'تعلیمی سال 2026-2027 کے داخلے' : 'Session 2026-2027 Admissions'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            {t.admPageTitle}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {t.admPageSubtitle}
          </p>
        </div>

        {/* SUCCESS CONFIRMATION RECEIPT VIEW */}
        {submissionSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-gold-400 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            
            <div className="text-center space-y-3 pb-6 border-b border-slate-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
                {t.submissionSuccessTitle}
              </h2>
              <p className="text-slate-600 text-sm">
                {t.submissionSuccessMsg}
              </p>
              
              {/* Reference Badge */}
              <div className="inline-block px-5 py-2.5 rounded-xl bg-gold-50 border-2 border-gold-500 mt-2">
                <span className="text-xs uppercase tracking-wider text-gold-800 block font-semibold">
                  {t.refNumberLabel}
                </span>
                <span className="text-xl sm:text-2xl font-black text-navy-950 font-mono tracking-widest">
                  {submissionSuccess.referenceNumber}
                </span>
              </div>
              <p className="text-xs text-amber-700 italic">
                {t.keepRefNotice}
              </p>
            </div>

            {/* Printable Application Slip Summary */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-bold text-navy-950 text-base">
                  {isUrdu ? 'رحمانی اسلامک سنٹر اینڈ وا راست ایجوکیشن سسٹم' : 'Rahmani Islamic Center & Wa Raast Education System'}
                </span>
                <span className="text-slate-500 font-mono">{submissionSuccess.date}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block">{t.studentFullName}</span>
                  <span className="font-bold text-navy-950 text-base">{submissionSuccess.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.fatherName}</span>
                  <span className="font-bold text-navy-950 text-base">{submissionSuccess.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.dob} / {t.gender}</span>
                  <span className="font-medium text-slate-800">{submissionSuccess.dob} ({submissionSuccess.gender})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.fatherContact} / WhatsApp</span>
                  <span className="font-medium text-slate-800">{submissionSuccess.fatherContact} / {submissionSuccess.whatsappNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.preferredDept}</span>
                  <span className="font-bold text-navy-950">
                    {submissionSuccess.department === 'RAHMANI_ISLAMIC' ? t.deptRahmaniOption : t.deptWaOption}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.admissionProgram}</span>
                  <span className="font-bold text-gold-700">{submissionSuccess.admissionProgram}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block">{t.residentialAddress}</span>
                  <span className="font-medium text-slate-800">{submissionSuccess.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
                <strong>Next Step:</strong> Our admissions counselor will contact you at <strong>{submissionSuccess.whatsappNumber}</strong> within 2 business days to schedule the on-campus interview and baseline evaluation at Model Town, Lahore.
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 no-print">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-navy-800 shadow-md"
              >
                <Printer className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.printReceipt}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
              >
                <RefreshCw className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t.submitAnother}
              </button>
            </div>

          </div>
        ) : (
          /* MULTI-SECTION ADMISSION FORM */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-10">
            
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3 rtl:space-x-reverse">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SECTION 1: Student Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse pb-3 border-b border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-navy-950">
                  {t.stepStudent}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.studentFullName}
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Muhammad Abdullah"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.fatherName}
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.dob}
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.gender}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm bg-white"
                  >
                    <option value="Male">{t.genderMale}</option>
                    <option value="Female">{t.genderFemale}</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.studentPhoto}
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/student-photo.jpg (Direct image link or leave empty)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-xs sm:text-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">{t.photoHint}</p>
                </div>
              </div>
            </div>

            {/* SECTION 2: Parent / Guardian Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse pb-3 border-b border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-navy-950">
                  {t.stepParent}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.fatherContact}
                  </label>
                  <input
                    type="tel"
                    name="fatherContact"
                    value={formData.fatherContact}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.whatsappNumber}
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.emailAddress}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="parent.name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.residentialAddress}
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="House / Street, Block, Town, Lahore"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Academic Background & Dynamic Program Selection */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse pb-3 border-b border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-navy-950">
                  {t.stepAcademic}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.prevSchool}
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="e.g. Model Town Public School / Madrasa"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.prevClass}
                  </label>
                  <input
                    type="text"
                    name="previousClass"
                    value={formData.previousClass}
                    onChange={handleChange}
                    placeholder="e.g. Class 4 / Nazra Complete / Hafiz"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                {/* Preferred Department Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.preferredDept}
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-navy-800 focus:outline-none text-sm font-bold bg-white text-navy-950"
                  >
                    <option value="RAHMANI_ISLAMIC">{t.deptRahmaniOption}</option>
                    <option value="WA_EDUCATION">{t.deptWaOption}</option>
                  </select>
                </div>

                {/* Dynamic Program Options based on Department! */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.admissionProgram}
                  </label>
                  <select
                    name="admissionProgram"
                    value={formData.admissionProgram}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gold-500 focus:outline-none text-sm font-bold bg-white text-navy-950"
                  >
                    {currentProgramList.map((prog, idx) => (
                      <option key={idx} value={prog.value}>
                        {isUrdu ? prog.labelUr : prog.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.additionalNotes}
                  </label>
                  <textarea
                    rows={3}
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Any specific educational history, medical notes, or shift preferences..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Submission Notice */}
            <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-navy-950">
                {isUrdu ? 'پرائیویسی اور تصدیق کا بیان:' : 'Privacy & Child Protection Notice:'}
              </p>
              <p>
                {isUrdu
                  ? 'طلباء کی فراہم کردہ تمام معلومات محفوظ ادارہ جاتی ڈیٹا بیس میں رکھی جاتی ہیں اور صرف مجاز انتظامیہ کو دستیاب ہوتی ہیں۔'
                  : 'All submitted student and parent contact details are securely stored in the institutional database and accessed strictly by authorized administration.'}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-navy-950 text-base font-extrabold shadow-xl shadow-gold-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span>{t.submitApplication}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
