import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Heart,
  Send,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
  MessageSquare,
  Users,
} from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

export default function RSVPSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    attending: "yes",
    guestCount: "1",
    dietary: "Vegetarian",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger golden celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F48FB1", "#D8A84E", "#FFB6C9", "#C94F7C", "#F3E5AB"],
    });
  };

  return (
    <section
      id="rsvp"
      className="relative w-full py-24 px-4 bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${ASSETS.carpet})`,
      }}
    >
      {/* Dark Royal Layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D232A]/85 via-[#3D232A]/90 to-[#3D232A]/95 pointer-events-none" />

      {/* Main Luxury Ending Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full mx-auto p-8 sm:p-14 text-center rounded-3xl royal-glass-dark border border-[#D8A84E]/50 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        {/* Top Ornament */}
        <div className="flex items-center justify-center space-x-3 mb-6 text-[#D8A84E]">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D8A84E]" />
          <Sparkles className="w-5 h-5" />
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F3E5AB]">
            Join The Celebration
          </span>
          <Sparkles className="w-5 h-5" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D8A84E]" />
        </div>

        <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient drop-shadow-md my-4">
          We Can't Wait To Celebrate
        </h2>

        <div className="flex items-center justify-center my-4">
          <Heart className="w-6 h-6 text-[#FFB6C9] fill-[#FFB6C9] animate-pulse" />
        </div>

        <h3 className="font-script text-4xl sm:text-5xl text-[#FFB6C9]">
          {weddingData.brideName} & {weddingData.groomName}
        </h3>

        <div className="my-6 space-y-2">
          <p className="font-cinzel text-sm sm:text-base font-semibold text-[#F3E5AB] tracking-widest uppercase">
            {weddingData.formattedDate}
          </p>
          <p className="font-body text-sm text-[#FFE4EC]/90">
            {weddingData.venue}, {weddingData.city}
          </p>
        </div>

        <p className="font-display text-base sm:text-lg text-[#FFE4EC]/80 italic max-w-md mx-auto my-6">
          "Your presence and blessings will add warmth and splendor to our special day."
        </p>

        {/* RSVP Primary CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D8A84E] via-[#F3E5AB] to-[#D8A84E] text-[#3D232A] font-cinzel font-bold text-sm tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#FFFDF9]/60 cursor-pointer"
          >
            Respond To Invitation (RSVP)
          </button>
        </div>

        {/* Host Contact Info */}
        <div className="mt-12 pt-6 border-t border-[#D8A84E]/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body text-[#F3E5AB]/90">
          <div className="flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4 text-[#D8A84E]" />
            <span>RSVP Helpline: {weddingData.rsvpContact.phone1}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-[#D8A84E]" />
            <span>{weddingData.rsvpContact.email}</span>
          </div>
        </div>
      </motion.div>

      {/* Interactive RSVP Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#3D232A] border border-[#D8A84E]/60 text-white shadow-2xl overflow-hidden"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="text-center space-y-1 mb-6">
                    <span className="font-cinzel text-xs text-[#D8A84E] uppercase tracking-widest">
                      Wedding Guest RSVP
                    </span>
                    <h3 className="font-script text-4xl text-[#FFB6C9]">
                      Kindly Respond
                    </h3>
                    <p className="font-body text-xs text-[#FFE4EC]/70">
                      Please respond before {weddingData.rsvpContact.deadline}
                    </p>
                  </div>

                  {/* Guest Name */}
                  <div>
                    <label className="block font-cinzel text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.guestName}
                      onChange={(e) =>
                        setFormData({ ...formData, guestName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm"
                    />
                  </div>

                  {/* Attending Status */}
                  <div>
                    <label className="block font-cinzel text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                      Will You Attend? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, attending: "yes" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                          formData.attending === "yes"
                            ? "bg-[#D8A84E] text-[#3D232A] border-[#D8A84E]"
                            : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                        }`}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, attending: "no" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                          formData.attending === "no"
                            ? "bg-rose-900/80 text-white border-rose-500"
                            : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {/* Guest Count */}
                  {formData.attending === "yes" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-cinzel text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guestCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guestCount: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#3D232A] border border-[#D8A84E]/40 text-white focus:outline-none focus:border-[#D8A84E] font-body text-sm cursor-pointer"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4+">4+ Family Members</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-cinzel text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                          Dietary Preference
                        </label>
                        <select
                          value={formData.dietary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dietary: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#3D232A] border border-[#D8A84E]/40 text-white focus:outline-none focus:border-[#D8A84E] font-body text-sm cursor-pointer"
                        >
                          <option value="Vegetarian">Pure Vegetarian</option>
                          <option value="Jain">Jain Food</option>
                          <option value="Vegan">Vegan</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Blessing / Warm Wishes Message */}
                  <div>
                    <label className="block font-cinzel text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                      Warm Wishes / Blessings
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your blessings for Rohan & Ananya..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D8A84E] to-[#F3E5AB] text-[#3D232A] font-cinzel font-bold text-sm tracking-widest uppercase shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit RSVP Response</span>
                  </button>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D8A84E]/20 text-[#D8A84E] flex items-center justify-center mx-auto border border-[#D8A84E]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-script text-5xl text-gold-gradient">
                    Thank You!
                  </h3>
                  <p className="font-body text-sm text-[#FFE4EC]">
                    Dear <span className="font-bold text-[#F3E5AB]">{formData.guestName}</span>, your response has been recorded with honor. We look forward to celebrating with you!
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 border border-[#D8A84E]/40 text-xs font-cinzel uppercase tracking-widest hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
