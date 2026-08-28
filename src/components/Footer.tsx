import React from 'react';
import { Mail, Phone, MessageSquare, ShieldAlert, ArrowUp, Instagram, Facebook, Send as TelegramIcon } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { ACADEMY_CONFIG } from '../data/academyData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-[#1e1e26] text-neutral-300 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1b1b22]">
          {/* Col 1: Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              {ACADEMY_CONFIG.subTagline} Built on strict risk management, structured price action analysis, and zero-risk simulator practice.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={ACADEMY_CONFIG.contact.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#14141a] hover:bg-[#00C853] hover:text-white border border-[#2b2b36] flex items-center gap-2 text-xs font-mono text-neutral-300 transition-colors"
                title="WhatsApp Community"
              >
                <MessageSquare className="w-4 h-4 text-[#00C853]" />
                <span>WhatsApp Group</span>
              </a>

              <a
                href={ACADEMY_CONFIG.contact.telegramCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#14141a] hover:bg-[#229ED9] hover:text-white border border-[#2b2b36] flex items-center gap-2 text-xs font-mono text-neutral-300 transition-colors"
                title="Telegram Community"
              >
                <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
                <span>Telegram</span>
              </a>

              <a
                href={`mailto:${ACADEMY_CONFIG.contact.email}`}
                className="w-9 h-9 rounded-xl bg-[#14141a] hover:bg-[#D4AF37] hover:text-black border border-[#2b2b36] flex items-center justify-center text-neutral-400 transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  Curriculum & Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  About BFXA Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('founder')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer text-[#F5C542]"
                >
                  Founder (Lucy / Brownie_Fx)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('simulator')}
                  className="hover:text-[#00C853] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Practice Simulator</span>
                  <span className="px-1 py-0.2 text-[9px] bg-[#00C853]/20 text-[#00C853] rounded">DEMO</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  FAQ & Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  Contact & Campus Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              Institutional Info
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => handleNav('risk')}
                  className="hover:text-[#E53935] text-neutral-400 transition-colors cursor-pointer"
                >
                  Risk Disclosure & Regulatory Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-white text-neutral-400 transition-colors cursor-pointer"
                >
                  Terms of Service & Code of Conduct
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white text-neutral-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>

          </div>
        </div>

        {/* Mandatory Educational Disclaimer Banner */}
        <div className="py-6 border-b border-[#1b1b22] text-[11px] font-mono text-neutral-400 leading-relaxed">
          <p>
            <strong className="text-neutral-300">REGULATORY & RISK DISCLAIMER:</strong> {ACADEMY_CONFIG.disclaimer}
          </p>
        </div>

        {/* Bottom Strip: Copyright & Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {ACADEMY_CONFIG.foundedYear} Brownie Forex Academy (BFXA). Founded by {ACADEMY_CONFIG.founder.fullName} ({ACADEMY_CONFIG.founder.professionalName}) • Abuja, Nigeria
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-[#F5C542] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
