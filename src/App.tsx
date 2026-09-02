import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowRight, PlayCircle, ShieldCheck, Sparkles, BookOpen, ChevronRight, Activity, Award, CheckCircle, Loader2, Briefcase } from 'lucide-react';
import { PageId, Course } from './types';
import { ACADEMY_CONFIG, COURSES } from './data/academyData';
import { Navbar } from './components/Navbar';
import { InteractiveHeroChart } from './components/InteractiveHeroChart';
import { AnimatedStats } from './components/AnimatedStats';
import { WhyAcademy } from './components/WhyAcademy';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

// Code-split heavy interactive sections to dramatically speed up initial mobile page load (LCP & TBT)
const CourseCatalog = lazy(() => import('./components/CourseCatalog').then(m => ({ default: m.CourseCatalog })));
const CourseModal = lazy(() => import('./components/CourseModal').then(m => ({ default: m.CourseModal })));
const SimulatorView = lazy(() => import('./components/SimulatorView').then(m => ({ default: m.SimulatorView })));
const MarketDashboard = lazy(() => import('./components/MarketDashboard').then(m => ({ default: m.MarketDashboard })));
const PositionCalculator = lazy(() => import('./components/PositionCalculator').then(m => ({ default: m.PositionCalculator })));
const CapitalPartnershipSection = lazy(() => import('./components/CapitalPartnershipSection').then(m => ({ default: m.CapitalPartnershipSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const FounderSection = lazy(() => import('./components/FounderSection').then(m => ({ default: m.FounderSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then(m => ({ default: m.FaqSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const LegalViews = lazy(() => import('./components/LegalViews').then(m => ({ default: m.LegalViews })));

// Lightweight fallback loader for lazy-loaded sections
const SectionLoadingFallback = () => (
  <div className="w-full py-16 flex items-center justify-center text-neutral-400">
    <div className="flex items-center gap-2 font-mono text-xs">
      <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
      <span>Loading content...</span>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Sync hash routing if user uses browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'courses', 'about', 'founder', 'simulator', 'faq', 'contact', 'partnership', 'privacy', 'terms', 'risk'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* Main Responsive Sticky Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Page Routing Views */}
      <main className="flex-1 w-full">
        <Suspense fallback={<SectionLoadingFallback />}>
          {/* ======================= HOME PAGE ======================= */}
          {currentPage === 'home' && (
            <div>
              {/* HERO SECTION */}
              <section className="relative w-full pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden border-b border-[#1f1f28]">
                {/* Background ambient gradient glows (0-cost GPU) */}
                <div className="absolute top-0 left-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
                <div className="absolute top-1/3 right-10 w-96 h-96 ambient-glow-green pointer-events-none" />
                <div className="absolute inset-0 trading-grid-pattern opacity-40 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    {/* Left Hero Column: Typography & CTAs (6 Cols) */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161f] border border-[#D4AF37]/40 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                        <span className="font-mono text-xs font-bold text-[#F5C542] tracking-wider uppercase">
                          Official Brownie Forex Academy
                        </span>
                      </div>

                      <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
                        MASTER THE MARKET. <br />
                        <span className="text-gold-gradient">GUARANTEED PROFIT.</span>
                      </h1>

                      <div className="space-y-2">
                        <p className="text-sm sm:text-base lg:text-lg font-mono font-bold text-[#F5C542] tracking-wider uppercase">
                          {ACADEMY_CONFIG.slogan}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                          {ACADEMY_CONFIG.tagline}. Specializing exclusively in Gold (XAU/USD), Bitcoin (BTC/USD), and Synthetic Indices with institutional sniper precision.
                        </p>
                      </div>

                      {/* Hero Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                        <button
                          onClick={() => navigateTo('courses')}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-[#D4AF37]/25 transition-all cursor-pointer group"
                        >
                          <span>Start Learning</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => navigateTo('partnership')}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0f1728] hover:bg-[#18233c] text-white font-mono font-bold text-sm border border-[#D4AF37]/50 hover:border-[#D4AF37] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-md"
                        >
                          <Briefcase className="w-4 h-4 text-[#F5C542] group-hover:scale-110 transition-transform" />
                          <span>Capital Partnership</span>
                        </button>

                        <button
                          onClick={() => navigateTo('simulator')}
                          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#14141c] hover:bg-[#1f1f2a] text-white font-mono font-bold text-sm border border-[#333342] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
                        >
                          <PlayCircle className="w-4 h-4 text-[#00C853] group-hover:scale-110 transition-transform" />
                          <span>Simulator</span>
                        </button>
                      </div>

                      {/* Trust Badges Bar */}
                      <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                          <span>Zero Risk Practice</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#F5C542]" />
                          <span>Institutional SMC Rules</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                          <span>Mentorship by {ACADEMY_CONFIG.founder.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Hero Column: Large Animated Candlestick Chart (6 Cols) */}
                    <div className="lg:col-span-6">
                      <InteractiveHeroChart />
                    </div>
                  </div>
                </div>
              </section>

              {/* ANIMATED STATISTICS SECTION */}
              <AnimatedStats />

              {/* WHY BROWNIE FOREX ACADEMY (WHITE THEME SECTION) */}
              <WhyAcademy onNavigate={navigateTo} />

              {/* FEATURED COURSES PREVIEW (LUXURY PEARL TO ROYAL BLUE GRADIENT SECTION) */}
              <section className="w-full bg-gradient-to-b from-[#edf1f7] via-[#f3f6fa] to-[#e2e8f4] text-neutral-900 pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-neutral-200/80 relative overflow-hidden">
                {/* Soft ambient pearl and gold glows */}
                <div className="absolute top-10 left-1/3 w-96 h-96 ambient-glow-gold pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-2 uppercase">
                        Curriculum Highlights
                      </div>
                      <h2 className="font-display font-black text-3xl sm:text-4xl text-neutral-900">
                        FEATURED FOREX MASTERCLASSES
                      </h2>
                    </div>

                    <button
                      onClick={() => navigateTo('courses')}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#856514] hover:text-black transition-colors"
                    >
                      <span>View All 6 Courses</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COURSES.slice(0, 3).map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#D4AF37]/20 text-[#856514]">
                              {course.level}
                            </span>
                            <span className="text-xs font-mono text-neutral-500">{course.duration}</span>
                          </div>

                          <h3 className="font-display font-bold text-lg text-neutral-900 mb-2 group-hover:text-[#856514] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                            {course.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <span className="text-xs font-mono text-neutral-500">{course.modulesCount} Modules</span>
                          <button
                            onClick={() => setSelectedCourse(course)}
                            className="text-xs font-mono font-bold text-neutral-900 hover:text-[#856514] flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore Syllabus</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= LUXURY GRADIENT TRANSITION DIVIDER (OFF-WHITE TO DEEP ROYAL BLUE) ================= */}
              <div className="w-full relative h-28 sm:h-36 bg-gradient-to-b from-[#e2e8f4] via-[#1a2d54] to-[#0a1128] overflow-hidden flex items-center justify-center">
                {/* Subtle gold ray & atmospheric lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none" />
                <div className="w-full max-w-7xl px-4 sm:px-6 flex items-center justify-between opacity-70">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
                  <div className="mx-4 px-4 py-1 rounded-full bg-[#0d1b3a]/90 border border-[#D4AF37]/50 shadow-lg text-[11px] font-mono font-bold text-[#F5C542] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span>Institutional Trading Tools</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
                </div>
              </div>

              {/* INTERACTIVE POSITION CALCULATOR (ROYAL BLUE LUXURY THEME) */}
              <PositionCalculator />

              {/* INTERACTIVE DEMO SIMULATOR SECTION (DEEP SAPPHIRE & MIDNIGHT BLUE) */}
              <section className="w-full bg-gradient-to-b from-[#080d1e] via-[#0b1428] to-[#07090f] py-16 sm:py-24 border-t border-[#1e293b]/60 relative overflow-hidden">
                <div className="absolute top-1/4 right-0 w-96 h-96 ambient-glow-blue pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/40 text-[#00C853] font-mono text-xs font-bold mb-3 uppercase">
                    Hands-On Sandbox
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                    LIVE INTERACTIVE TRADING SIMULATOR
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl mx-auto">
                    Practice BUY & SELL executions, lot sizing calculations, and trade management with $10,000 in simulated balance.
                  </p>
                </div>

                <SimulatorView />
              </section>

              {/* MARKET DASHBOARD & SESSIONS */}
              <MarketDashboard />

              {/* CAPITAL PARTNERSHIP AND INVESTMENT (INSTITUTIONAL PAMM) */}
              <CapitalPartnershipSection onBackToHome={() => navigateTo('home')} />

              {/* TESTIMONIALS SECTION */}
              <TestimonialsSection />

              {/* FAQ SECTION */}
              <FaqSection />
            </div>
          )}

          {/* ======================= CAPITAL PARTNERSHIP PAGE ======================= */}
          {currentPage === 'partnership' && (
            <CapitalPartnershipSection onBackToHome={() => navigateTo('home')} />
          )}

          {/* ======================= COURSES PAGE ======================= */}
          {currentPage === 'courses' && (
            <CourseCatalog onSelectCourse={(course) => setSelectedCourse(course)} />
          )}

          {/* ======================= ABOUT PAGE ======================= */}
          {currentPage === 'about' && <AboutSection onNavigate={navigateTo} />}

          {/* ======================= FOUNDER PAGE ======================= */}
          {currentPage === 'founder' && <FounderSection onNavigate={navigateTo} />}

          {/* ======================= SIMULATOR PAGE ======================= */}
          {currentPage === 'simulator' && (
            <div className="py-12">
              <SimulatorView />
            </div>
          )}

          {/* ======================= FAQ PAGE ======================= */}
          {currentPage === 'faq' && <FaqSection />}

          {/* ======================= CONTACT PAGE ======================= */}
          {currentPage === 'contact' && <ContactSection />}

          {/* ======================= LEGAL PAGES ======================= */}
          {['privacy', 'terms', 'risk'].includes(currentPage) && (
            <LegalViews type={currentPage as 'privacy' | 'terms' | 'risk'} />
          )}
        </Suspense>
      </main>

      {/* Course Detail Syllabus Modal */}
      <Suspense fallback={null}>
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      </Suspense>

      {/* Floating Action WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
