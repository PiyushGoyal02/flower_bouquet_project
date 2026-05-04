import { motion } from "framer-motion";
import {
  Leaf,
  Truck,
  ShieldCheck,
  MapPin,
  Scissors,
  Clock,
} from "lucide-react";

const badges = [
  {
    Icon: Leaf,
    title: "100% Fresh, Daily",
    desc: "Every bouquet is assembled on the day of delivery — never stored, always fresh from our partner florists.",
    accent: "var(--green)",
    accentBg: "var(--green-light)",
  },
  {
    Icon: Truck,
    title: "Same-Day Delivery",
    desc: "Order before noon and we'll deliver to major metros the very same day — no exceptions, no excuses.",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    Icon: ShieldCheck,
    title: "5 Years of Trust",
    desc: "Since 2019 we've served 2,800+ families. Every promise we make, we keep — that's our track record.",
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
  },
  {
    Icon: MapPin,
    title: "450+ Cities Covered",
    desc: "From Fatehabad to Mumbai, Chennai to Chandigarh — our network reaches every corner of India.",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    Icon: Scissors,
    title: "Custom Arrangements",
    desc: "Your colour palette, your favourite flowers, your message. We craft bouquets that tell your unique story.",
    accent: "var(--green)",
    accentBg: "var(--green-light)",
  },
  {
    Icon: Clock,
    title: "On-Time, Every Time",
    desc: "Late flowers ruin the moment. Our logistics team tracks every order to guarantee punctual delivery.",
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export default function TrustBadges() {
  return (
    <section
      style={{
        background: "var(--sec-marquee-1)",
        padding: "96px 24px 104px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--rose)", marginBottom: "12px",
          }}>
            Why Choose Us
          </p>
          <h2 style={{
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            fontFamily: "var(--font-heading)",
            margin: "0 0 14px",
            lineHeight: 1.2,
          }}>
            A Brand Built on Trust & Quality
          </h2>
          <p style={{
            fontSize: "0.92rem",
            color: "var(--text-muted)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            At Bouquet D'Amour, every decision we make puts your happiness and the freshness of your flowers first.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="trust-badges-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {badges.map(({ Icon, title, desc, accent, accentBg }, i) => (
            <motion.div
              key={i}
              variants={card}
              className="trust-badge-card"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "18px",
                padding: "28px 26px",
                boxShadow: "var(--card-shadow)",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "var(--card-shadow)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div style={{
                width: "48px", height: "48px",
                borderRadius: "14px",
                background: accentBg,
                border: `1.5px solid ${accent}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "18px",
              }}>
                <Icon size={22} color={accent} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-heading)",
                fontFamily: "var(--font-heading)",
                margin: "0 0 10px",
                lineHeight: 1.3,
              }}>
                {title}
              </h3>

              {/* Description */}
              <p style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
              }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 600px)  { .trust-badges-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 601px) and (max-width: 960px) { .trust-badges-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
