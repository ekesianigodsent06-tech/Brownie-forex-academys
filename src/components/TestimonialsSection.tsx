import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  PlusCircle, 
  MessageSquare, 
  X, 
  Send, 
  Filter,
  Sparkles,
  ShieldCheck,
  Globe2,
  Loader2
} from 'lucide-react';
import { TESTIMONIALS, ACADEMY_CONFIG } from '../data/academyData';
import { TestimonialItem } from '../types';
import { subscribeToStudentReviews, submitStudentReview } from '../lib/firebase';

export const TestimonialsSection: React.FC = () => {
  const [cloudReviews, setCloudReviews] = useState<TestimonialItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | '5_STAR' | 'FUNDED' | 'GOLD_SYNTHETICS' | 'BEGINNER'>('ALL');
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    location: '',
    role: 'Funded Account Trader',
    courseTaken: 'Gold (XAU/USD) Sniper Mastery',
    experienceLevel: 'Transformed to Consistent Profitability',
    headline: '',
    content: '',
    rating: 5,
  });

  // Subscribe to real-time reviews from Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToStudentReviews(
      (newCloudReviews) => {
        setCloudReviews(newCloudReviews);
      },
      (error) => {
        console.warn('Using local curated reviews fallback:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Merge cloud real-time reviews with Nigerian baseline cohort reviews (avoiding duplicates)
  const allReviews: TestimonialItem[] = React.useMemo(() => {
    if (cloudReviews.length === 0) {
      return TESTIMONIALS;
    }
    const cloudIds = new Set(cloudReviews.map((r) => r.id));
    const nonDuplicatedDefaults = TESTIMONIALS.filter((t) => !cloudIds.has(t.id));
    return [...cloudReviews, ...nonDuplicatedDefaults];
  }, [cloudReviews]);

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName.trim() || !formData.content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save globally to Firebase Firestore
      await submitStudentReview({
        studentName: formData.studentName.trim(),
        role: formData.role || 'Verified Nigerian Trader',
        experienceLevel: formData.experienceLevel || 'Academy Alumni',
        location: formData.location.trim() || 'Nigeria',
        courseTaken: formData.courseTaken,
        headline: formData.headline.trim() || 'Genuine Trading Transformation',
        content: formData.content.trim(),
        rating: formData.rating,
        date: new Date().toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }),
        isVerified: true,
        isPlaceholder: false,
      });

      // Reset Form & Close Modal
      setFormData({
        studentName: '',
        location: '',
        role: 'Funded Account Trader',
        courseTaken: 'Gold (XAU/USD) Sniper Mastery',
        experienceLevel: 'Transformed to Consistent Profitability',
        headline: '',
        content: '',
        rating: 5,
      });

      setIsModalOpen(false);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 6000);
    } catch (err) {
      console.error('Failed to submit review to Firestore', err);
      alert('Unable to publish review to cloud database right now. Please try again or send via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter logic
  const filteredReviews = allReviews.filter((rev) => {
    if (selectedFilter === '5_STAR') return rev.rating === 5;
    if (selectedFilter === 'FUNDED') return rev.role.toLowerCase().includes('funded') || rev.content.toLowerCase().includes('funded');
    if (selectedFilter === 'GOLD_SYNTHETICS') {
      const text = `${rev.courseTaken || ''} ${rev.content} ${rev.role}`.toLowerCase();
      return text.includes('gold') || text.includes('synthetic') || text.includes('vix') || text.includes('xau');
    }
    if (selectedFilter === 'BEGINNER') return rev.experienceLevel.toLowerCase().includes('beginner');
    return true;
  });

  // Calculate average rating
  const averageRating = (
    allReviews.reduce((acc, curr) => acc + curr.rating, 0) / (allReviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews" className="w-full bg-[#080808] text-white py-16 sm:py-24 border-t border-[#1C1C24] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 ambient-glow-green pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#00C853] text-black px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-bounce max-w-md">
            <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">Review Published to Cloud Database!</div>
              <div className="text-xs opacity-90">Your verified review is now live and visible to all students and visitors worldwide.</div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F5C542] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#00C853] animate-pulse" />
              Live Real-Time Nigerian Student Reviews
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              STUDENT RESULTS & REVIEWS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2">
              Verified testimonials and trading transformations from real Nigerian students enrolled in <span className="text-[#D4AF37] font-semibold">Brownie Fx</span> Gold, BTC/USD & Synthetic Indices mentorship programs.
            </p>
          </div>

          {/* Action button to leave a review */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5C542] text-black font-display font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              Submit Your Review
            </button>
            <a
              href={`https://wa.me/${ACADEMY_CONFIG.contact.whatsappInternational.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Coach Brownie Fx! I would like to share my student review & trading results for Brownie Forex Academy.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#14141A] border border-[#262630] text-neutral-300 hover:text-white hover:border-[#00C853] font-mono text-xs transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#00C853]" />
              WhatsApp Review Desk
            </a>
          </div>
        </div>

        {/* Rating Metrics & Summary Card */}
        <div className="bg-[#0e0e14] border border-[#20202A] rounded-2xl p-6 sm:p-8 mb-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Score */}
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-[#20202A] pb-6 md:pb-0 md:pr-6">
            <div className="text-4xl sm:text-5xl font-display font-black text-gold-gradient">
              {averageRating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F5C542]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5C542]" />
                ))}
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1">
                Based on <span className="text-white font-bold">{allReviews.length} real student reviews</span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-[#20202A] pb-6 md:pb-0 md:pr-6">
            <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#00C853]" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">Live Cloud Verified Storage</div>
              <div className="text-xs text-neutral-400">All submissions sync in real-time across Nigeria & globally.</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="text-xs font-mono text-neutral-400 w-full mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Filter Reviews:
            </div>
            {[
              { id: 'ALL', label: 'All Reviews' },
              { id: '5_STAR', label: '5-Star Ratings' },
              { id: 'FUNDED', label: 'Funded Traders' },
              { id: 'GOLD_SYNTHETICS', label: 'Gold & Synthetics' },
              { id: 'BEGINNER', label: 'Beginner Cohort' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#D4AF37] text-black font-bold shadow-sm'
                    : 'bg-[#181822] text-neutral-400 hover:text-white border border-[#262634]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((test) => (
            <div
              key={test.id}
              className="bg-[#0F0F16] rounded-2xl border border-[#242432] p-6 sm:p-7 shadow-lg hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors" />

              <div>
                {/* Header: Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#F5C542]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5C542]" />
                    ))}
                  </div>
                  {test.isVerified && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Nigerian Student
                    </div>
                  )}
                </div>

                {/* Headline */}
                {test.headline && (
                  <h4 className="font-display font-bold text-base text-white mb-2 leading-snug">
                    "{test.headline}"
                  </h4>
                )}

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  {test.content}
                </p>
              </div>

              {/* Student Bio & Metadata */}
              <div className="pt-4 border-t border-[#1F1F2C]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#181822] border border-[#D4AF37]/50 flex items-center justify-center text-[#F5C542] font-display font-bold text-sm flex-shrink-0">
                    {test.studentName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm text-white truncate flex items-center gap-1.5">
                      {test.studentName}
                    </div>
                    
                    <div className="text-[11px] text-[#F5C542]/90 font-mono truncate">
                      {test.role}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-neutral-400 font-mono mt-1">
                      {test.location && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-neutral-500" />
                          {test.location}
                        </span>
                      )}
                      <span>•</span>
                      <span>{test.date}</span>
                    </div>

                    {test.courseTaken && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-[#161622] px-2 py-0.5 rounded border border-[#282838] truncate max-w-full">
                        <GraduationCap className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                        <span className="truncate">{test.courseTaken}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Review CTA Box */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#12121A] to-[#0A0A0E] border border-[#2A2A38] text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 trading-grid-pattern opacity-10 pointer-events-none" />
          <Quote className="w-10 h-10 text-[#D4AF37]/30 mx-auto mb-3" />
          <h3 className="font-display font-black text-2xl text-white mb-2">
            Are You an Active or Former Brownie Forex Academy Student?
          </h3>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto mb-6">
            Your authentic review encourages new traders in Nigeria and helps us maintain our guaranteed profit and institutional trading standard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F5C542] text-black font-display font-bold text-sm transition-all shadow-lg shadow-[#D4AF37]/25 cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              Write & Publish Your Review
            </button>
            <a
              href={`mailto:${ACADEMY_CONFIG.contact.email}?subject=Student%20Review%20Submission%20-%20Brownie%20Forex%20Academy`}
              className="px-6 py-3 rounded-xl bg-[#1C1C26] hover:bg-[#252534] text-white border border-[#303042] font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#00C853]" />
              Email Review Directly
            </a>
          </div>
        </div>

      </div>

      {/* ================= REVIEW SUBMISSION MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0F0F16] border border-[#2E2E3E] rounded-3xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1C1C26] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#F5C542] text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Live Student Portal
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                Share Your Trading Review
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your review will be saved to the live cloud database and visible to all visitors.
              </p>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#161622] px-3 py-2 rounded-xl border border-[#2A2A3A]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (hoverRating || formData.rating) >= star
                              ? 'fill-[#F5C542] text-[#F5C542]'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-[#F5C542] font-semibold">
                    {formData.rating === 5
                      ? '5 Stars (Exceptional)'
                      : formData.rating === 4
                      ? '4 Stars (Very Good)'
                      : `${formData.rating} Stars`}
                  </span>
                </div>
              </div>

              {/* Full Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    placeholder="e.g. Chukwuma Obi"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    City / State in Nigeria *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Lagos, Nigeria"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] font-sans"
                  />
                </div>
              </div>

              {/* Role & Course Taken */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Trader Status
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                  >
                    <option value="Funded Account Trader">Funded Account Trader</option>
                    <option value="Gold (XAU/USD) Specialist">Gold (XAU/USD) Specialist</option>
                    <option value="Synthetic Indices Trader">Synthetic Indices Trader</option>
                    <option value="Academy Graduate">Academy Graduate</option>
                    <option value="Full-Time Professional Trader">Full-Time Professional Trader</option>
                    <option value="Beginner Cohort Student">Beginner Cohort Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Specialized Course
                  </label>
                  <select
                    name="courseTaken"
                    value={formData.courseTaken}
                    onChange={handleInputChange}
                    className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                  >
                    <option value="Gold (XAU/USD) Sniper Mastery">Gold (XAU/USD) Sniper Mastery</option>
                    <option value="Synthetic Indices (Volatility 75, Boom & Crash)">Synthetic Indices Mastery</option>
                    <option value="Price Action & Institutional Order Flow">Price Action & Order Flow</option>
                    <option value="Bitcoin (BTC/USD) Crypto Liquidity Strategy">Bitcoin (BTC/USD) Strategy</option>
                    <option value="1-on-1 VIP Mentorship with Brownie Fx">1-on-1 VIP Mentorship</option>
                    <option value="Risk Management & Guaranteed Profit Rules">Risk Management & Profit Rules</option>
                  </select>
                </div>
              </div>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Review Headline *
                </label>
                <input
                  type="text"
                  name="headline"
                  required
                  placeholder="e.g. Secured consistent Gold profits and passed evaluation!"
                  value={formData.headline}
                  onChange={handleInputChange}
                  className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Detailed Review */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Detailed Experience & Feedback *
                </label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  placeholder="Tell other students how Coach Brownie Fx's lessons, Gold & Synthetic strategies, and discipline transformed your trading..."
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full bg-[#161622] border border-[#2A2A3A] rounded-xl p-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              {/* Guarantee Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="confirmReview"
                  required
                  defaultChecked
                  className="mt-1 accent-[#D4AF37] rounded"
                />
                <label htmlFor="confirmReview" className="text-[11px] text-neutral-400 leading-tight">
                  I confirm that this review represents my authentic trading experience with Brownie Forex Academy.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-mono cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5C542] text-black font-display font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing to Cloud...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
