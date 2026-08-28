import React from 'react';
import officialLogoImg from '../assets/images/brownie_forex_logo_1787673242393.jpg';
import squareLogoImg from '../assets/images/brownie_logo_square_1787673269042.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'compact' | 'symbol' | 'card' | 'header';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'header',
}) => {
  // Dimensions based on size prop
  const sizeMap = {
    sm: { img: 'h-8 sm:h-9', title: 'text-xs sm:text-sm', sub: 'text-[9px]' },
    md: { img: 'h-9 sm:h-11', title: 'text-sm sm:text-base', sub: 'text-[10px]' },
    lg: { img: 'h-12 sm:h-14', title: 'text-lg sm:text-xl', sub: 'text-xs' },
    xl: { img: 'h-16 sm:h-20', title: 'text-2xl sm:text-3xl', sub: 'text-sm' },
    hero: { img: 'h-28 sm:h-36 w-auto max-w-full', title: 'text-3xl sm:text-4xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  // If symbol/square emblem variant requested
  if (variant === 'symbol') {
    return (
      <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
        <img
          src={squareLogoImg}
          alt="Brownie Forex Academy Emblem"
          width={44}
          height={44}
          loading="eager"
          decoding="async"
          className={`${currentSize.img} object-contain rounded-xl shadow-lg border border-[#D4AF37]/30`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // If card / full banner showcase variant requested
  if (variant === 'card') {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#080808] shadow-2xl p-2 group ${className}`}>
        <img
          src={officialLogoImg}
          alt="Brownie Forex Academy Official Logo"
          width={400}
          height={200}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Header / Full prominent Logo with crystal clear Academy Name & Emblem
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      <div className="relative flex-shrink-0">
        <img
          src={squareLogoImg}
          alt="Brownie Forex Academy BFXA Emblem"
          width={44}
          height={44}
          loading="eager"
          decoding="async"
          className={`${currentSize.img} w-auto object-contain rounded-xl shadow-md border border-[#D4AF37]/40 p-0.5 bg-[#111116]`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-black tracking-tight uppercase leading-none text-white ${currentSize.title}`}>
            Brownie Forex <span className="text-[#F5C542]">Academy</span>
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40 leading-none">
            BFXA
          </span>
        </div>

        {showTagline && (
          <span className={`font-mono text-neutral-400 font-semibold tracking-wider uppercase mt-1 flex items-center gap-1.5 ${currentSize.sub}`}>
            <span className="text-[#00C853] font-bold">Knowledge Today, Financial Freedom Tomorrow</span>
          </span>
        )}
      </div>
    </div>
  );
};
