import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, MessageSquare } from 'lucide-react';
import { FAQS, ACADEMY_CONFIG } from '../data/academyData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'General', 'Enrollment', 'Trading & Simulator', 'Curriculum'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            Frequently Asked Questions
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight">
            EVERYTHING YOU NEED TO KNOW
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-xl mx-auto">
            Got questions about enrolling, coursework, or the interactive simulator? Find clear answers below.
          </p>
        </div>

        {/* Search & Category filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-[#D4AF37] text-neutral-900 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/80 transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-neutral-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D4AF37]/20 text-[#856514]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#111116] border border-[#262630] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="font-display font-bold text-lg text-white">Still have questions?</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Speak directly with Brownie Forex Academy support via WhatsApp or email.
            </p>
          </div>

          <a
            href={ACADEMY_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-mono font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer flex-shrink-0 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp ({ACADEMY_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
