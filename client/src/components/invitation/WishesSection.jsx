import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { MessageSquare, Heart, Send, Sparkles, User, CheckCircle2, Loader2 } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import { useWeddingData } from "../../context/WeddingDataContext";
import { template2Service } from "../../services/template2Service";

export default function WishesSection() {
  const weddingData = useWeddingData();
  const [wishesList, setWishesList] = useState(weddingData.initialWishes || []);
  const [guestName, setGuestName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Keep wishes list synced when weddingData loads/updates from DB
  useEffect(() => {
    if (weddingData.initialWishes && weddingData.initialWishes.length > 0) {
      setWishesList(weddingData.initialWishes);
    }
  }, [weddingData.initialWishes]);

  const handleSendWish = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setErrorMessage("");
    setIsSubmitting(true);

    const newWish = {
      id: `wish-${Date.now()}`,
      name: guestName.trim(),
      relation: relation.trim() || "Well Wisher",
      message: message.trim(),
      date: "Just now",
    };

    // Optimistic UI update
    setWishesList((prev) => [newWish, ...prev]);

    // Golden celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F48FB1", "#D8A84E", "#FFB6C9", "#C94F7C"],
    });

    const slugOrId = weddingData.slug || weddingData._id;

    if (slugOrId) {
      try {
        const res = await template2Service.addWish(slugOrId, {
          name: newWish.name,
          relation: newWish.relation,
          message: newWish.message,
        });

        if (res?.data && Array.isArray(res.data)) {
          setWishesList(res.data);
        }
      } catch (err) {
        console.warn("Could not persist wish to remote server:", err);
      }
    }

    setGuestName("");
    setRelation("");
    setMessage("");
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 4500);
  };

  return (
    <section
      id="wishes"
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] py-6 sm:py-8 px-4 bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${ASSETS.carpet})`,
      }}
    >
      {/* Dark Translucent Layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D232A]/85 via-[#3D232A]/90 to-[#3D232A]/95 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center justify-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-center"
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#D8A84E]/40 text-[#F3E5AB]">
            <Heart className="w-3.5 h-3.5 text-[#FFB6C9] fill-[#FFB6C9]" />
            <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              Showers of Blessings
            </span>
          </div>

          <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl text-gold-gradient drop-shadow-md leading-tight">
            Warm Wishes & Blessings
          </h2>

          <p className="font-display text-xs sm:text-sm text-[#FFE4EC]/80 max-w-xl mx-auto italic">
            Leave your heartfelt blessings and warm wishes for {weddingData.brideName} & {weddingData.groomName} as they begin their royal fairytale.
          </p>
        </motion.div>

        {/* Content Layout: Wish Submission Form + Live Wish Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full text-left items-start">
          {/* Form Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl royal-glass-dark border border-[#D8A84E]/50 shadow-xl"
          >
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-[#D8A84E]/30">
              <MessageSquare className="w-4 h-4 text-[#D8A84E]" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">
                Send Your Blessing
              </h3>
            </div>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 p-2.5 rounded-xl bg-emerald-900/70 border border-emerald-500 text-emerald-200 text-xs font-body flex items-center space-x-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Your blessing has been published.</span>
              </motion.div>
            )}

            {errorMessage && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-900/60 border border-red-500 text-red-200 text-xs font-body">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSendWish} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-cinzel text-[10px] font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul & Priya"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm sm:text-xs"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-[10px] font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Friend / Family"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-[10px] font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1">
                  Your Wish / Blessing *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Write your heartfelt wishes for the couple..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm sm:text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D8A84E] via-[#F3E5AB] to-[#D8A84E] text-[#3D232A] font-cinzel font-bold text-xs tracking-widest uppercase shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-1.5 disabled:opacity-60 min-h-[42px]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? "Publishing..." : "Publish Blessing"}</span>
              </button>
            </form>
          </motion.div>

          {/* Wish Wall Scroll Stream (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-2.5 max-h-[300px] sm:max-h-[340px] overflow-y-auto pr-1.5 custom-scrollbar"
          >
            {wishesList.length === 0 ? (
              <div className="p-6 rounded-2xl border border-[#D8A84E]/30 bg-black/30 text-center font-display text-xs text-[#FFE4EC]/70 italic">
                Be the first to shower the royal couple with your warm blessings!
              </div>
            ) : (
              wishesList.map((w, idx) => (
                <div
                  key={w._id || w.id || idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-white/10 border border-[#D8A84E]/30 backdrop-blur-md hover:border-[#D8A84E]/60 transition-all shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#D8A84E]/20 text-[#D8A84E] flex items-center justify-center font-cinzel font-bold text-[11px] border border-[#D8A84E]/40 shrink-0">
                        {(w.name || "G").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-body text-xs sm:text-sm font-bold text-[#F3E5AB]">
                          {w.name}
                        </h4>
                        <span className="font-cinzel text-[9px] text-[#FFE4EC]/70 uppercase tracking-wider block">
                          {w.relation || "Well Wisher"}
                        </span>
                      </div>
                    </div>
                    <span className="font-cinzel text-[9px] text-[#D8A84E]/80 shrink-0">
                      {w.date || (w.createdAt ? new Date(w.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Just now")}
                    </span>
                  </div>

                  <p className="font-body text-xs text-[#FFE4EC]/90 leading-relaxed italic pl-9">
                    "{w.message}"
                  </p>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
