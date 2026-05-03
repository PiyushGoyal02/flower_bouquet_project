import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Flower2, Truck, Clock, Leaf } from "lucide-react";

const cyclingImages = [
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1548460606-cb2dd5ac78c4?w=300&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=300&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300&fit=crop&q=80",
];

const features = [
  { Icon: Flower2, label: "450+ Cities",  desc: "Pan-India delivery"      },
  { Icon: Clock,   label: "Same-Day",     desc: "In major metros"          },
  { Icon: Truck,   label: "Since 2019",   desc: "5 years of craftsmanship" },
  { Icon: Leaf,    label: "Eco Packed",   desc: "Sustainable packaging"    },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0  },
};

export default function WhatWeDoSection() {
  const [imgIdx, setImgIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setImgIdx(p => (p + 1) % cyclingImages.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        background: "var(--sec-categories)",
        padding: "96px 24px 100px",
        overflow: "hidden",
        position: "relative",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Radial rose glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -55%)",
          width: "700px", height: "480px",
          background: "radial-gradient(ellipse, rgba(194,56,90,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Badge ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(194,56,90,0.12)",
            border: "1px solid rgba(194,56,90,0.32)",
            color: "var(--rose-light)",
            borderRadius: "9999px",
            padding: "5px 18px",
            fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            <Flower2 size={11} color="var(--rose-light)" />
            Who We Are
          </span>
        </motion.div>

        {/* ── Headline with cycling image ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            flexWrap: "wrap", gap: "0.3em",
            textAlign: "center", marginBottom: "12px",
          }}
        >
          {["We", "Craft"].map((word, i) => (
            <span key={i} style={{
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              fontWeight: 300, lineHeight: 1.1,
              color: "var(--text-on-dark)",
              letterSpacing: "-0.015em",
            }}>{word}</span>
          ))}

          {/* Cycling flower image pill — the hero-page concept */}
          <span style={{
            display: "inline-block",
            width:  "clamp(2.8rem, 6.5vw, 5.2rem)",
            height: "clamp(2.8rem, 6.5vw, 5.2rem)",
            borderRadius: "9999px",
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid rgba(194,56,90,0.45)",
            boxShadow: "0 0 18px rgba(194,56,90,0.3)",
            verticalAlign: "middle",
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIdx}
                src={cyclingImages[imgIdx]}
                alt="flower"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{    opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.65 }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </AnimatePresence>
          </span>

          {["Blooms"].map((word, i) => (
            <span key={i} style={{
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              fontWeight: 300, lineHeight: 1.1,
              color: "var(--text-on-dark)",
              letterSpacing: "-0.015em",
            }}>{word}</span>
          ))}

          <span style={{
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 700, lineHeight: 1.1,
            color: "var(--rose)",
            letterSpacing: "-0.015em",
          }}>
            with Love
          </span>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
            color: "var(--text-on-dark-body)",
            lineHeight: 1.9,
            maxWidth: "640px",
            margin: "0 auto 52px",
          }}
        >
          <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>Bouquet D'Amour</span>, owned and managed by{" "}
          <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>Sai Floritech Private Limited</span>, is a floral
          e-commerce brand that has been handcrafting heartfelt bouquets since 2019 — delivering joy to over
          450 cities across India. Every arrangement is made with care, emotion, and the finest fresh flowers.
        </motion.p>

        {/* ── Feature pills ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.38 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: "16px",
            justifyContent: "center", marginBottom: "52px",
          }}
        >
          {features.map(({ Icon, label, desc }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "14px 22px",
              transition: "border-color 0.25s, background 0.25s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(194,56,90,0.4)";
              e.currentTarget.style.background  = "rgba(194,56,90,0.07)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
            }}
            >
              <Icon size={18} color="var(--rose)" />
              <div>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "var(--text-on-dark)", lineHeight: 1.2 }}>
                  {label}
                </p>
                <p style={{ margin: 0, fontSize: "0.7rem", color: "var(--text-on-dark-muted)", marginTop: "2px" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => navigate('/products')}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 34px",
              background: "linear-gradient(135deg, var(--rose), var(--rose-hover))",
              color: "var(--white)",
              border: "none", borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "0.9rem", fontWeight: 700,
              fontFamily: "var(--font-body)",
              boxShadow: "var(--btn-primary-shadow)",
              transition: "transform 200ms, box-shadow 200ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = "translateY(-2px)";
              e.currentTarget.style.boxShadow  = "var(--btn-primary-shadow-hover)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = "translateY(0)";
              e.currentTarget.style.boxShadow  = "var(--btn-primary-shadow)";
            }}
          >
            Shop Our Collection <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
