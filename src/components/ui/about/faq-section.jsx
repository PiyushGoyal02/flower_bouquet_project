import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Fixed spiral config — tuned for the brand
const SPIRAL = {
  points: 620,
  dotRadius: 1.6,
  duration: 3.6,
  color: "#C2385A",
  opacityMin: 0.18,
  opacityMax: 0.72,
  sizeMin: 0.55,
  sizeMax: 1.45,
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our catalogue, add your favourites to the cart, and checkout — it takes under 2 minutes. Prefer chatting? Send us your order on WhatsApp and we'll handle the rest.",
  },
  {
    q: "Do you offer same-day delivery?",
    a: "Yes! Orders placed before 12 noon qualify for same-day delivery in major metros — Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, and more. Available slots are shown at checkout.",
  },
  {
    q: "Which cities do you deliver to?",
    a: "We deliver to 450+ cities across India — from Fatehabad to Kanyakumari. Simply enter your pincode at checkout to confirm availability in your area.",
  },
  {
    q: "Can I customise my bouquet?",
    a: "Absolutely. Choose the 'Custom Order' option on the site or WhatsApp us with your preferred flowers, colours, and occasion. Our florists will craft it exactly to your vision.",
  },
  {
    q: "What is your cancellation & refund policy?",
    a: "Cancellations are accepted up to 4 hours before the scheduled delivery for a full refund. After that, a 20% processing fee applies. Damaged or incorrect orders are replaced at no charge.",
  },
  {
    q: "How are the flowers packaged?",
    a: "Every bouquet is hand-assembled on the day of dispatch and packed in eco-friendly kraft paper with moisture-retaining floral foam to keep petals fresh throughout transit.",
  },
  {
    q: "Can I schedule delivery for a specific date & time?",
    a: "Yes — pick your preferred delivery date at checkout. City-specific time slots (morning / afternoon / evening) appear automatically once you enter your pincode.",
  },
  {
    q: "Do you handle bulk or wedding orders?",
    a: "We love weddings! Contact our team at least 7–10 days in advance for large floral arrangements. We'll assign a dedicated coordinator to manage design, logistics, and delivery.",
  },
];

// ── Single FAQ accordion card ────────────────────────────────────────────────
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-card"
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.025)",
        padding: "20px 22px",
        transition: "border-color 0.25s, background 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.background = "rgba(255,255,255,0.045)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          gap: "14px",
        }}
      >
        {/* Number + question */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: "0.65rem",
            color: "rgba(255,250,248,0.28)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            flexShrink: 0,
          }}>
            {String(index).padStart(2, "0")}
          </span>
          <span style={{
            fontSize: "0.93rem",
            fontWeight: 600,
            color: "var(--text-on-dark)",
            fontFamily: "var(--font-heading)",
            lineHeight: 1.4,
          }}>
            {q}
          </span>
        </div>

        {/* Toggle icon */}
        <div style={{
          flexShrink: 0,
          width: "28px", height: "28px",
          borderRadius: "50%",
          border: `1px solid ${open ? "rgba(194,56,90,0.5)" : "rgba(255,255,255,0.14)"}`,
          background: open ? "rgba(194,56,90,0.14)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: open ? "var(--rose-light)" : "rgba(255,250,248,0.5)",
          transition: "border-color 0.2s, background 0.2s, color 0.2s",
        }}>
          {open
            ? <Minus size={13} strokeWidth={2.2} />
            : <Plus  size={13} strokeWidth={2.2} />
          }
        </div>
      </button>

      {/* Answer — animated */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              margin: "14px 0 2px 36px",
              fontSize: "0.875rem",
              color: "var(--text-on-dark-muted)",
              lineHeight: 1.82,
              fontFamily: "var(--font-body)",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function FAQSection() {
  const spiralRef = useRef(null);

  // Build spiral SVG once on mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const { points: N, dotRadius: DOT, duration, color,
            opacityMin, opacityMax, sizeMin, sizeMax } = SPIRAL;
    const CENTER = SIZE / 2;
    const MAX_R = CENTER - 4 - DOT;
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width",   String(SIZE));
    svg.setAttribute("height",  String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
      const idx  = i + 0.5;
      const frac = idx / N;
      const r    = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx",      (CENTER + r * Math.cos(theta)).toFixed(3));
      c.setAttribute("cy",      (CENTER + r * Math.sin(theta)).toFixed(3));
      c.setAttribute("r",       String(DOT));
      c.setAttribute("fill",    color);
      c.setAttribute("opacity", "0.6");

      // Pulse: radius
      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute("values",       `${DOT * sizeMin};${DOT * sizeMax};${DOT * sizeMin}`);
      animR.setAttribute("dur",          `${duration}s`);
      animR.setAttribute("begin",        `${(frac * duration).toFixed(3)}s`);
      animR.setAttribute("repeatCount",  "indefinite");
      animR.setAttribute("calcMode",     "spline");
      animR.setAttribute("keySplines",   "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animR);

      // Pulse: opacity
      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values",       `${opacityMin};${opacityMax};${opacityMin}`);
      animO.setAttribute("dur",          `${duration}s`);
      animO.setAttribute("begin",        `${(frac * duration).toFixed(3)}s`);
      animO.setAttribute("repeatCount",  "indefinite");
      animO.setAttribute("calcMode",     "spline");
      animO.setAttribute("keySplines",   "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animO);

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, []);

  return (
    <section
      style={{
        background: "var(--sec-categories)",
        padding: "96px 24px 104px",
        fontFamily: "var(--font-body)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Spiral background ── */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.25,
          maskImage: "radial-gradient(circle at center, rgba(255,255,255,1), rgba(255,255,255,0.1) 60%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(circle at center, rgba(255,255,255,1), rgba(255,255,255,0.1) 60%, transparent 76%)",
        }}
      >
        <div ref={spiralRef} />
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: "920px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "36px",
            marginBottom: "44px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p style={{
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--rose-light)", marginBottom: "10px",
            }}>
              Got Questions?
            </p>
            <h2 style={{
              fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
              fontWeight: 800,
              color: "var(--text-on-dark)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              margin: 0,
            }}>
              FAQ
            </h2>
            <p style={{
              marginTop: "12px",
              fontSize: "0.9rem",
              color: "var(--text-on-dark-muted)",
              lineHeight: 1.75,
              maxWidth: "380px",
            }}>
              Everything you need to know about ordering, delivery, and our flowers.
            </p>
          </div>
        </motion.div>

        {/* FAQ grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
          ))}
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 700px) { .faq-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
