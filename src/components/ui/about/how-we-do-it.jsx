import { motion } from "framer-motion";
import {
  ShoppingCart,
  CheckCircle2,
  Users,
  Scissors,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Order Placement",
    Icon: ShoppingCart,
    desc: "Begin by placing your order on our website or simply send us a message via WhatsApp — quick and effortless.",
  },
  {
    number: "02",
    title: "Order Confirmation",
    Icon: CheckCircle2,
    desc: "Once your payment is received, your order enters our system and is officially marked as 'Pending'.",
  },
  {
    number: "03",
    title: "Trusted Partners",
    Icon: Users,
    desc: "As your delivery date approaches, we assign your order to one of our skilled partner florists across India.",
  },
  {
    number: "04",
    title: "Craftsmanship",
    Icon: Scissors,
    desc: "Our dedicated florists carefully hand-assemble your bouquet, ensuring every petal and ribbon is perfect.",
  },
  {
    number: "05",
    title: "Quality Assurance",
    Icon: ShieldCheck,
    desc: "Before dispatch, we conduct a thorough quality check to confirm your order meets our freshness standards.",
  },
  {
    number: "06",
    title: "Order Delivered",
    Icon: PackageCheck,
    desc: "Ding dong! Your bouquet arrives at your doorstep, packed with love and ready to create a beautiful memory.",
    badge: "Final Step",
  },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export default function HowWeDoIt() {
  return (
    <section
      style={{
        background: "var(--sec-categories)",
        padding: "88px 24px 96px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Hover styles ── */}
      <style>{`
        .how-card { position: relative; overflow: visible; }
        .how-card:hover { border-color: rgba(255,255,255,0.18) !important; }

        .how-card .card-corner { opacity: 0; transition: opacity 0.22s ease; }
        .how-card:hover .card-corner { opacity: 1; }

        .how-card .card-glow { opacity: 0; transition: opacity 0.3s ease; }
        .how-card:hover .card-glow { opacity: 1; }

        .how-card .card-inner-glow { opacity: 0; transition: opacity 0.3s ease; }
        .how-card:hover .card-inner-glow { opacity: 1; }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "56px" }}
        >
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--rose)", marginBottom: "10px",
          }}>
            Our Process
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            color: "var(--text-on-dark)",
            fontFamily: "var(--font-heading)",
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}>
            How We Do It
          </h2>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          className="how-we-do-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {steps.map(({ number, title, Icon, desc, badge }) => (
            <motion.div
              key={number}
              variants={cardVariants}
              className="how-card"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "0",
                transition: "border-color 0.3s",
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className="card-glow"
                style={{
                  position: "absolute", inset: "-1px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Inner glow */}
              <div
                className="card-inner-glow"
                style={{
                  position: "absolute", inset: 0,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* White corner squares (the dark-grid signature effect) */}
              {[
                { top: "-5px", left: "-5px" },
                { top: "-5px", right: "-5px" },
                { bottom: "-5px", left: "-5px" },
                { bottom: "-5px", right: "-5px" },
              ].map((pos, ci) => (
                <div
                  key={ci}
                  className="card-corner"
                  style={{
                    position: "absolute",
                    width: "10px", height: "10px",
                    background: "var(--rose-light)",
                    pointerEvents: "none",
                    zIndex: 2,
                    ...pos,
                  }}
                />
              ))}

              {/* Card header */}
              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", alignItems: "flex-start", gap: "14px",
                padding: "24px 24px 0",
              }}>
                {/* Icon box */}
                <div style={{
                  width: "42px", height: "42px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "12px",
                  background: "rgba(194,56,90,0.12)",
                  border: "1px solid rgba(194,56,90,0.3)",
                }}>
                  <Icon size={18} color="var(--rose-light)" strokeWidth={1.8} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <h3 style={{
                      fontSize: "1rem", fontWeight: 600,
                      color: "var(--text-on-dark)",
                      margin: 0, lineHeight: 1.3,
                    }}>
                      {title}
                    </h3>
                    {badge && (
                      <span style={{
                        fontSize: "0.62rem", fontWeight: 700,
                        letterSpacing: "0.08em",
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(194,56,90,0.5)",
                        color: "var(--rose-light)",
                        lineHeight: 1.5,
                      }}>
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Step number */}
                  <span style={{
                    fontSize: "0.68rem",
                    color: "rgba(255,250,248,0.3)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}>
                    STEP {number}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div style={{
                position: "relative", zIndex: 1,
                padding: "14px 24px 24px",
                fontSize: "0.875rem",
                color: "var(--text-on-dark-muted)",
                lineHeight: 1.75,
              }}>
                {desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px)  { .how-we-do-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 641px) and (max-width: 1024px) { .how-we-do-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
