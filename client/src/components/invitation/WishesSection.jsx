import React, { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { MessageSquare, Heart, Send, Sparkles, User, CheckCircle2 } from "lucide-react";
import ASSETS from "../../assets/assetUrls";
import weddingData from "../../data/weddingData";

export default function WishesSection() {
  const [wishesList, setWishesList] = useState(weddingData.initialWishes);
  const [guestName, setGuestName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    const newWish = {
      id: Date.now(),
      name: guestName.trim(),
      relation: relation.trim() || "Well Wisher",
      message: message.trim(),
      date: "Just now",
    };

    setWishesList([newWish, ...wishesList]);
    setGuestName("");
    setRelation("");
    setMessage("");
    setIsSuccess(true);

    // Trigger golden celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F48FB1", "#D8A84E", "#FFB6C9", "#C94F7C"],
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section
      id="wishes"
      className="relative w-full py-24 px-4 bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${ASSETS.carpet})`,
      }}
    >
      {/* Dark Translucent Layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D232A]/85 via-[#3D232A]/90 to-[#3D232A]/95 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D8A84E]/40 text-[#F3E5AB]">
            <Heart className="w-4 h-4 text-[#FFB6C9] fill-[#FFB6C9]" />
            <span className="font-cinzel text-xs font-semibold tracking-widest uppercase">
              Showers of Blessings
            </span>
          </div>

          <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient drop-shadow-md">
            Warm Wishes & Blessings
          </h2>

          <p className="font-display text-base sm:text-lg text-[#FFE4EC]/80 max-w-xl mx-auto italic">
            Leave your heartfelt blessings and warm wishes for {weddingData.brideName} & {weddingData.groomName} as they begin their royal fairytale.
          </p>
        </motion.div>

        {/* Content Layout: Wish Submission Form + Live Wish Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
          {/* Form Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl royal-glass-dark border border-[#D8A84E]/50 shadow-xl"
          >
            <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-[#D8A84E]/30">
              <MessageSquare className="w-5 h-5 text-[#D8A84E]" />
              <h3 className="font-cinzel text-base font-bold text-[#F3E5AB] uppercase tracking-wider">
                Send Your Blessing
              </h3>
            </div>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-xl bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs font-body flex items-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Your wish has been added to the royal guestbook.</span>
              </motion.div>
            )}

            <form onSubmit={handleSendWish} className="space-y-4">
              <div>
                <label className="block font-cinzel text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul & Priya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm"
                />
              </div>

              <div>
                <label className="block font-cinzel text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1.5">
                  Relationship / Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's Friend / Family"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm"
                />
              </div>

              <div>
                <label className="block font-cinzel text-xs font-semibold text-[#F3E5AB] uppercase tracking-wider mb-1.5">
                  Your Wish / Blessing *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your wishes for the couple..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D8A84E]/40 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A84E] transition-colors font-body text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D8A84E] via-[#F3E5AB] to-[#D8A84E] text-[#3D232A] font-cinzel font-bold text-xs tracking-widest uppercase shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish Blessing</span>
              </button>
            </form>
          </motion.div>

          {/* Wish Wall Scroll Stream (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {wishesList.map((w) => (
              <div
                key={w.id}
                className="p-5 rounded-2xl bg-white/10 border border-[#D8A84E]/30 backdrop-blur-md hover:border-[#D8A84E]/60 transition-all shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#D8A84E]/20 text-[#D8A84E] flex items-center justify-center font-cinzel font-bold text-xs border border-[#D8A84E]/40">
                      {w.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-body text-sm font-bold text-[#F3E5AB]">
                        {w.name}
                      </h4>
                      <span className="font-cinzel text-[10px] text-[#FFE4EC]/70 uppercase tracking-wider block">
                        {w.relation}
                      </span>
                    </div>
                  </div>
                  <span className="font-cinzel text-[10px] text-[#D8A84E]/80">
                    {w.date}
                  </span>
                </div>

                <p className="font-body text-sm text-[#FFE4EC]/90 leading-relaxed italic pl-10">
                  "{w.message}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
