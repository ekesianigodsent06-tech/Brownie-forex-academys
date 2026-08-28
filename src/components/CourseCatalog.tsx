import React, { useState } from 'react';
import { BookOpen, Clock, Layers, CheckCircle2, ArrowRight, Search, Sparkles, MessageSquare, DollarSign, ShieldCheck, CreditCard, UserCheck, HelpCircle } from 'lucide-react';
import { COURSES, ACADEMY_CONFIG, REGISTRATION_GUIDE } from '../data/academyData';
import { Course } from '../types';

interface CourseCatalogProps {
  onSelectCourse: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onSelectCourse }) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter((course) => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-12 sm:py-20 space-y-16 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            Academic Curriculum & Pricing
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight">
            FOREX TRADING COURSES
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-3 leading-relaxed">
            Step-by-step masterclasses designed to transform beginners into confident, risk-managed market analysts.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-sm">
          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, price action, pips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:bg-white text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => {
            const levelColor =
              course.level === 'Beginner'
                ? 'bg-[#00C853]/15 text-[#008f3a] border-[#00C853]/30'
                : course.level === 'Intermediate'
                ? 'bg-[#D4AF37]/20 text-[#856514] border-[#D4AF37]/40'
                : 'bg-purple-100 text-purple-800 border-purple-200';

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Decorative Banner Visual */}
                  <div className="h-40 bg-gradient-to-br from-[#121216] via-[#1a1a24] to-[#0a0a0e] p-5 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 trading-grid-pattern opacity-30 pointer-events-none" />
                    <div className="absolute -right-6 -top-6 w-24 h-24 ambient-glow-gold" />

                    <div className="flex items-center justify-between relative z-10">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase border ${levelColor}`}>
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-300">
                        <Clock className="w-3.5 h-3.5 text-[#F5C542]" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Tuition / Fee</div>
                        <div className="text-base sm:text-lg font-mono font-black text-[#F5C542]">
                          {course.price}
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-[#00C853] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {course.modulesCount} Modules
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-[#856514] transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>

                    {course.priceNote && (
                      <div className="text-[11px] font-mono text-[#856514] font-semibold mb-3">
                        ✓ {course.priceNote}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Topics Snapshot */}
                    <div className="space-y-1.5 mb-5 border-t border-neutral-100 pt-3">
                      {course.topics.slice(0, 3).map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                      {course.topics.length > 3 && (
                        <div className="text-[11px] font-mono text-neutral-400 pl-5">
                          +{course.topics.length - 3} more modules in syllabus
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2 border-t border-neutral-100 mt-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>View Details & Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5C542]" />
                  </button>

                  <a
                    href={`https://wa.me/${ACADEMY_CONFIG.contact.whatsappInternational}?text=Hello%20Brownie%20Forex%20Academy%2C%20I%20am%20interested%20in%20enrolling%20in%20the%20${encodeURIComponent(course.title)}%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#00C853]/15 hover:bg-[#00C853]/25 text-[#008f3a] border border-[#00C853]/30 transition-colors cursor-pointer"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REGISTRATION INSTRUCTIONS & ONBOARDING GUIDE SECTION */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/30 text-[#008f3a] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" /> Admissions Guide
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900 uppercase">
              {REGISTRATION_GUIDE.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 font-medium">
              {REGISTRATION_GUIDE.subtitle}
            </p>
          </div>

          {/* 4 Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {REGISTRATION_GUIDE.steps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3 relative flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#F5C542] font-mono font-black text-sm flex items-center justify-center mb-3 shadow-md">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-display font-bold text-base text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-700 font-medium mt-2 leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 pt-3 border-t border-neutral-200">
                  {step.details}
                </div>
              </div>
            ))}
          </div>

          {/* Accepted Payment Methods & Hotline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-2xl bg-[#0c0c10] text-white border border-[#262632]">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono font-bold text-[#F5C542] uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Accepted Payment Methods
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {REGISTRATION_GUIDE.paymentMethods.map((pm, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#171720] border border-[#2c2c3c] text-xs">
                    <div className="font-bold text-white mb-1">{pm.name}</div>
                    <div className="text-[11px] text-neutral-400 font-mono leading-tight">{pm.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center space-y-3">
              <div className="text-xs font-mono text-neutral-400 text-center sm:text-right">
                Official Admissions Desk
              </div>
              <a
                href={REGISTRATION_GUIDE.enrollmentHotline.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Register on WhatsApp ({ACADEMY_CONFIG.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

