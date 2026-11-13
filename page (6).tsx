'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function ContactPage() {
  const { t, isUrdu } = useLanguage();
  
  const [settings, setSettings] = useState({
    phone1: '+92 300 4122318',
    phone2: '0300 4136938',
    whatsapp: '+92 300 4122318',
    email: 'admissions@rahmanisystem.edu.pk',
    addressEn: 'Model Town, J Block, Lahore, Pakistan',
    addressUr: 'ماڈل ٹاؤن، جے بلاک، لاہور، پاکستان',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13611.85422899478!2d74.3128!3d31.4826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919041b3a16d55d%3A0xb3e648c0a2a4b87!2sModel%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.settings) {
          setSettings(prev => ({
            ...prev,
            email: data.settings.email || prev.email,
            addressEn: data.settings.addressEn || prev.addressEn,
            addressUr: data.settings.addressUr || prev.addressUr,
            googleMapsEmbed: data.settings.googleMapsEmbed || prev.googleMapsEmbed,
          }));
        }
      } catch (err) {
        console.error('Settings load error:', err);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
          {isUrdu ? 'رابطہ اور رہنمائی' : 'Get In Touch'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
          {t.contactTitle}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.contactSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info & Visiting Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
            <h2 className="text-xl font-bold text-navy-950 border-b border-slate-100 pb-4">
              {isUrdu ? 'ادارہ جاتی رابطے' : 'Official Institution Contacts'}
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">{t.campusAddress}</span>
                  <span className="text-slate-600 text-xs sm:text-sm">
                    {isUrdu ? settings.addressUr : settings.addressEn}
                  </span>
                </div>
              </div>

              {/* Both Official Contact Numbers (Clickable tel: links) */}
              <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-academic-50 text-academic-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-grow">
                  <span className="font-bold text-navy-950 block">{t.phoneNumbers}</span>
                  <div className="space-y-1.5 font-mono text-sm">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500 text-xs font-sans">Number 1:</span>
                      <a 
                        href={`tel:${settings.phone1}`}
                        className="text-navy-950 hover:text-gold-600 font-bold tracking-wide"
                      >
                        {settings.phone1}
                      </a>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500 text-xs font-sans">Number 2:</span>
                      <a 
                        href={`tel:${settings.phone2}`}
                        className="text-navy-950 hover:text-gold-600 font-bold tracking-wide"
                      >
                        {settings.phone2}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">Official WhatsApp</span>
                  <a 
                    href="https://wa.me/923004122318" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 font-mono font-bold hover:underline"
                  >
                    +92 300 4122318 (Direct Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">{t.emailInquiries}</span>
                  <span className="text-slate-600 text-xs sm:text-sm font-mono">
                    {settings.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-navy-950 block">{t.visitingHours}</span>
                  <span className="text-slate-600 text-xs sm:text-sm">
                    {t.visitingHoursVal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-base block">
                {isUrdu ? 'واٹس ایپ پر فوری رہنمائی' : 'Direct WhatsApp Inquiry'}
              </span>
              <p className="text-emerald-100 text-xs font-mono">
                +92 300 4122318
              </p>
            </div>
            <a
              href="https://wa.me/923004122318"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-emerald-800 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              aria-label="Direct WhatsApp message"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
            </a>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-navy-950">
              {t.sendUsMessage}
            </h2>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 animate-in fade-in">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span className="font-bold text-base">{t.messageSentSuccess}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-3 text-xs font-semibold underline text-emerald-700 hover:text-emerald-900"
                >
                  {isUrdu ? 'ایک اور پیغام بھیجیں' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.yourName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Muhammad Ahmad"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.yourPhone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.yourEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.inquirySubject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Hifz Admission Inquiry / Fee Structure"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.yourMessage}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your questions or message here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-gold-400" />
                  {submitting ? 'Sending...' : t.sendMessageBtn}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Google Maps Embed */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-navy-950 flex items-center">
          <MapPin className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 text-gold-600" />
          <span>{isUrdu ? 'ماڈل ٹاؤن کیمپس کا نقشہ' : 'Campus Location: Model Town, J Block, Lahore'}</span>
        </h3>
        <div className="w-full h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
          <iframe
            src={settings.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rahmani Islamic Center & Wa Raast Education System Location"
          />
        </div>
      </div>

    </div>
  );
}
