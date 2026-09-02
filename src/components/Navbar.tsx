import React, { useState, useEffect } from 'react';
import { Menu, X, PlayCircle, MessageSquare, ChevronRight, ShieldCheck, Briefcase } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { ACADEMY_CONFIG } from '../data/academyData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string; isHot?: boolean; isVip?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'partnership', label: 'Capital Partnership', isVip: true },
    { id: 'about', label: 'About BFXA' },
    { id: 'founder', label: 'Founder' },
    { id: 'simulator', label: 'Simulator', isHot: true },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md py-2.5 shadow-2xl border-b border-[#22222a]'
          : 'bg-[#080808] py-4 border-b border-[#18181f]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-left focus:outline-none"
        >
          <Logo size={isScrolled ? 'sm' : 'md'} showTagline={!isScrolled} />
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#121217] px-3 py-1.5 rounded-full border border-[#242430]">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-black bg-gold-gradient font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-[#1a1a24]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.isVip && <Briefcase className={`w-3 h-3 ${isActive ? 'text-black' : 'text-[#F5C542]'}`} />}
                  {item.label}
                  {item.isHot && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-black' : 'bg-[#00C853] animate-pulse'
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop Right CTA Action */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('simulator')}
            className="px-3.5 py-2 rounded-xl bg-[#181820] hover:bg-[#22222c] text-white text-xs font-mono font-bold border border-[#333] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-[#00C853]" />
            <span>Practice Simulator</span>
          </button>

          <button
            onClick={() => handleNavClick('courses')}
            className="px-4 py-2 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-mono font-bold text-xs shadow-md transition-opacity cursor-pointer"
          >
            Start Learning
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('simulator')}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#181820] text-[#00C853] border border-[#333] flex items-center justify-center cursor-pointer"
            aria-label="Open Trading Simulator"
            title="Open Simulator"
          >
            <PlayCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#14141a] text-white border border-[#2a2a36] focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#F5C542]" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e13] border-b border-[#22222c] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 mb-5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-mono text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-gold-gradient text-black font-bold'
                      : 'text-neutral-200 hover:bg-[#181822]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.isVip && <Briefcase className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#F5C542]'}`} />}
                    {item.label}
                    {item.isVip && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40">
                        INVEST
                      </span>
                    )}
                    {item.isHot && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40">
                        SIMULATOR
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1f1f28]">
            <button
              onClick={() => handleNavClick('courses')}
              className="w-full py-2.5 px-3 rounded-xl bg-gold-gradient text-black font-mono font-bold text-xs text-center"
            >
              Start Learning
            </button>

            <a
              href={ACADEMY_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#00C853] text-white font-mono font-bold text-xs text-center flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
