import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '2349038768321';
  const defaultMessage = encodeURIComponent(
    'Hello Brownie Forex Academy, I would like to inquire about your trading mentorship programs.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div
      id="whatsapp-floating-widget"
      role="complementary"
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 pointer-events-auto select-none transition-all"
    >
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div
          className="hidden sm:flex items-center gap-2.5 bg-[#0e1626]/95 text-white px-3.5 py-2.5 rounded-xl border border-[#25D366]/40 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-4"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
              Direct Mentorship Line
            </span>
            <span className="text-xs text-neutral-200 font-medium">
              Chat with Brownie Fx (+234 903 876 8321)
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 p-1 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Close notification"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Circular Green WhatsApp Button */}
      <a
        id="whatsapp-fab-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] border-2 border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Open WhatsApp chat with Brownie Forex Academy"
      >
        {/* Subtle breathing pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10 drop-shadow-md group-hover:scale-105 transition-transform" />

        {/* Active online green indicator */}
        <span
          className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#00E676] border-2 border-[#080808] rounded-full z-20"
          title="Online"
        />
      </a>
    </div>
  );
};
