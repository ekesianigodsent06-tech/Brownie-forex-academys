import React from 'react';
import { X, CheckCircle, Clock, Layers, Shield, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';
import { Course } from '../types';
import { ACADEMY_CONFIG } from '../data/academyData';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white text-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 relative flex flex-col">
        {/* Header Banner */}
        <div className="bg-[#0e0e12] text-white p-6 sm:p-8 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 trading-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 ambient-glow-gold pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40">
              {course.level} Level Masterclass
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00C853]" /> {course.duration}
            </span>
            <span className="text-xs font-mono text-[#F5C542] font-black ml-auto">
              Tuition: {course.price}
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
            {course.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">Tuition / Fee</div>
              <div className="text-xs font-black text-neutral-900 mt-1">{course.price}</div>
              {course.priceNote && (
                <div className="text-[10px] text-[#856514] font-mono mt-0.5">{course.priceNote}</div>
              )}
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">Prerequisites</div>
              <div className="text-xs font-semibold text-neutral-900 mt-1">{course.prerequisites}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">Target Audience</div>
              <div className="text-xs font-semibold text-neutral-900 mt-1">{course.targetAudience}</div>
            </div>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h3 className="font-display font-bold text-lg text-neutral-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#856514]" />
              Detailed Course Curriculum
            </h3>

            <div className="space-y-3">
              {course.syllabus.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70">
                  <div className="font-display font-bold text-sm text-neutral-900">{mod.title}</div>
                  <p className="text-xs text-neutral-600 mt-1 mb-2.5">{mod.description}</p>
                  <div className="space-y-1.5 pl-2 border-l-2 border-[#D4AF37]">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-2 text-xs text-neutral-800 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Covered Full List */}
          <div>
            <h3 className="font-display font-bold text-base text-neutral-900 mb-2.5">
              Core Competencies Mastered
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.topics.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 px-3 py-2 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-[#856514] flex-shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee / Disclaimer Box */}
          <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3 text-xs text-neutral-800">
            <Shield className="w-5 h-5 text-[#856514] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900">Academic Mentorship & Practice:</span> Includes lifetime access to course updates, trading journal templates, and direct support during mentor office hours.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-500">
            Admissions Desk: {ACADEMY_CONFIG.contact.hotlineDisplay}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              Close
            </button>

            <a
              href={`https://wa.me/${ACADEMY_CONFIG.contact.whatsappInternational}?text=Hello%20Brownie%20Forex%20Academy%2C%20I%20want%20to%20enroll%20in%20${encodeURIComponent(course.title)}.%20Please%20guide%20me%20on%20tuition%20and%20onboarding.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enroll on WhatsApp ({ACADEMY_CONFIG.contact.whatsappDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
