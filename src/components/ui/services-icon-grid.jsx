import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Flower2,
  Heart,
  Gift,
  Truck,
  Scissors,
  Star,
  RefreshCw,
  Package,
  MessageCircle,
  Cake,
} from "lucide-react";

const services = [
  {
    Icon: Flower2,
    name: "Fresh Bouquets",
    desc: "Handcrafted daily",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
    href: "/products",
  },
  {
    Icon: Heart,
    name: "Wedding Flowers",
    desc: "Grand arrangements",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
    href: "/products",
  },
  {
    Icon: Cake,
    name: "Birthday Gifts",
    desc: "Make it special",
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
    href: "/products",
  },
  {
    Icon: Star,
    name: "Anniversary",
    desc: "Celebrate milestones",
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
    href: "/products",
  },
  {
    Icon: Truck,
    name: "Same-Day Delivery",
    desc: "Major metros covered",
    accent: "var(--green)",
    accentBg: "var(--green-light)",
    href: "/products",
  },
  {
    Icon: Scissors,
    name: "Custom Orders",
    desc: "Your vision, our craft",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
    href: "/contact",
  },
  {
    Icon: RefreshCw,
    name: "Weekly Blooms",
    desc: "Subscription plans",
    accent: "var(--green)",
    accentBg: "var(--green-light)",
    href: "/contact",
  },
  {
    Icon: Package,
    name: "Gift Hampers",
    desc: "Flowers + surprises",
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
    href: "/products",
  },
  {
    Icon: Gift,
    name: "Personalised Gifts",
    desc: "Mugs, cards & more",
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
    href: "/products",
  },
  {
    Icon: MessageCircle,
    name: "WhatsApp Orders",
    desc: "Quick & easy",
    accent: "var(--green)",
    accentBg: "var(--green-light)",
    href: "/contact",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

export default function ServicesIconGrid() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: "var(--sec-products)",
        padding: "80px 24px 88px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--rose)", marginBottom: "12px",
          }}>
            What We Offer
          </p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            fontFamily: "var(--font-heading)",
            margin: "0 0 12px",
          }}>
            A World of Floral Services
          </h2>
          <p style={{
            fontSize: "0.92rem",
            color: "var(--text-muted)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}>
            From everyday bouquets to grand wedding arrangements — everything floral, delivered across 450+ cities.
          </p>
        </motion.div>

        {/* ── Icon Grid ── */}
        <motion.div
          className="services-icon-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "28px 20px",
          }}
        >
          {services.map((svc, i) => (
            <motion.button
              key={i}
              variants={item}
              whileHover={{ scale: 1.06, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={() => navigate(svc.href)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                fontFamily: "var(--font-body)",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "20px",
                  background: svc.accentBg,
                  border: `1.5px solid ${svc.accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "box-shadow 0.25s, border-color 0.25s",
                  boxShadow: "0 2px 8px rgba(28,8,16,0.05)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 6px 20px ${svc.accent}33`;
                  e.currentTarget.style.borderColor = `${svc.accent}66`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(28,8,16,0.05)";
                  e.currentTarget.style.borderColor = `${svc.accent}22`;
                }}
              >
                <svc.Icon size={28} color={svc.accent} strokeWidth={1.8} />
              </div>

              {/* Name */}
              <span style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-heading)",
                textAlign: "center",
                lineHeight: 1.3,
              }}>
                {svc.name}
              </span>

              {/* Sub-label */}
              <span style={{
                fontSize: "0.68rem",
                color: "var(--text-hint)",
                textAlign: "center",
                marginTop: "-4px",
              }}>
                {svc.desc}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 480px)  { .services-icon-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 481px) and (max-width: 720px)  { .services-icon-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 721px) and (max-width: 1024px) { .services-icon-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
