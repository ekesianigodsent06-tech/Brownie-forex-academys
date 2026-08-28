import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, MapPin, Instagram, Facebook, Send as TelegramIcon } from 'lucide-react';
import { ACADEMY_CONFIG, COURSES } from '../data/academyData';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    courseInterest: COURSES[0]?.title || 'Forex Fundamentals',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('Please enter your phone/WhatsApp number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            Admissions & Support
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight">
            GET IN TOUCH WITH BROWNIE FX
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
            Have questions regarding enrollment, 1-on-1 mentorship, or course schedules? Reach out through our official channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="bg-[#0e0e13] border border-[#262632] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 ambient-glow-green pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center text-[#00C853]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-white">Direct WhatsApp Desk</div>
                  <div className="text-xs font-mono text-[#00C853] font-semibold">Fastest Response Time</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Connect directly with admissions for instant onboarding assistance, tuition details, and community access.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#17171e] border border-[#2c2c38] flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#00C853]" />
                    <span>WhatsApp:</span>
                  </span>
                  <a
                    href={ACADEMY_CONFIG.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C853] font-bold hover:underline"
                  >
                    {ACADEMY_CONFIG.contact.whatsappDisplay}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#17171e] border border-[#2c2c38] flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span>Voice Call:</span>
                  </span>
                  <a
                    href={`tel:${ACADEMY_CONFIG.contact.hotlineInternational}`}
                    className="text-white font-bold hover:text-[#F5C542] hover:underline"
                  >
                    {ACADEMY_CONFIG.contact.hotlineDisplay}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#17171e] border border-[#2c2c38] flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#008f3a]" />
                    <span>Campus:</span>
                  </span>
                  <span className="text-[#F5C542] font-semibold text-right">Kubwa, Abuja, Nigeria</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={ACADEMY_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={ACADEMY_CONFIG.contact.whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3 rounded-xl bg-[#1f1f2a] hover:bg-[#282836] border border-[#39394c] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#00C853]" />
                  <span>WhatsApp Community</span>
                </a>
              </div>
            </div>

            {/* Email & Info Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                Official Academy Channels
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <Mail className="w-5 h-5 text-[#856514] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">Official Email</div>
                  <a
                    href={`mailto:${ACADEMY_CONFIG.contact.email}`}
                    className="text-xs font-bold text-neutral-900 hover:text-[#856514] font-mono break-all"
                  >
                    {ACADEMY_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Campus Address */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <MapPin className="w-5 h-5 text-[#008f3a] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">Physical Campus Address</div>
                  <div className="text-xs font-semibold text-neutral-800 font-sans leading-relaxed">
                    {ACADEMY_CONFIG.contact.location}
                  </div>
                </div>
              </div>

              {/* Hotline Call */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <Phone className="w-5 h-5 text-[#856514] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">Official Hotline</div>
                  <a
                    href={`tel:${ACADEMY_CONFIG.contact.hotlineInternational}`}
                    className="text-xs font-bold text-neutral-900 hover:text-[#856514] font-mono"
                  >
                    {ACADEMY_CONFIG.contact.hotlineDisplay}
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-mono text-neutral-500 mb-3">Official Communities & Socials:</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={ACADEMY_CONFIG.contact.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center gap-2 text-neutral-700 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span className="truncate">{ACADEMY_CONFIG.contact.socials.instagram.handle}</span>
                  </a>
                  <a
                    href={ACADEMY_CONFIG.contact.socials.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center gap-2 text-neutral-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span className="truncate">{ACADEMY_CONFIG.contact.socials.facebook.handle}</span>
                  </a>
                  <a
                    href={ACADEMY_CONFIG.contact.socials.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center gap-2 text-neutral-700 transition-colors"
                  >
                    <span className="text-xs font-bold text-black">TT</span>
                    <span className="truncate">{ACADEMY_CONFIG.contact.socials.tiktok.handle}</span>
                  </a>
                  <a
                    href={ACADEMY_CONFIG.contact.socials.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center gap-2 text-neutral-700 transition-colors"
                  >
                    <TelegramIcon className="w-4 h-4 text-sky-500" />
                    <span className="truncate">{ACADEMY_CONFIG.contact.socials.telegram.handle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enrollment Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-md">
            <h3 className="font-display font-black text-2xl text-neutral-900 mb-2">
              Send an Admission Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6">
              Complete the form below to receive syllabus breakdowns and registration instructions.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00C853] mx-auto" />
                <h4 className="font-display font-bold text-xl text-neutral-900">Inquiry Received!</h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry for <em>{formData.courseInterest}</em> has been registered. An admissions advisor will contact you at <strong>{formData.email}</strong> or WhatsApp (<strong>{formData.phoneNumber}</strong>).
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        courseInterest: COURSES[0]?.title || 'Forex Fundamentals',
                        message: '',
                      });
                    }}
                    className="py-2 px-4 rounded-xl bg-neutral-900 text-white text-xs font-mono font-bold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-[#E53935]/15 border border-[#E53935]/40 text-[#E53935] text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-neutral-700 font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#D4AF37] bg-neutral-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#D4AF37] bg-neutral-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 font-bold mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 903 876 8321"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#D4AF37] bg-neutral-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 font-bold mb-1">
                    Course of Interest
                  </label>
                  <select
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#D4AF37] bg-neutral-50 focus:bg-white cursor-pointer"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                    <option value="1-on-1 VIP Mentorship">1-on-1 VIP Mentorship with Brownie FX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 font-bold mb-1">
                    Trading Background & Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your prior trading experience or specific topics you want to master..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#D4AF37] bg-neutral-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#F5C542]" />
                  <span>Submit Inquiry</span>
                </button>

                <div className="text-[10px] font-mono text-neutral-400 text-center pt-2">
                  🔒 Your information is confidential and used exclusively for admissions coordination.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
