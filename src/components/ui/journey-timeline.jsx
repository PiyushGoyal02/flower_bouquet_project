import { motion } from "framer-motion";
import { Flower2, ShoppingBag, Globe, Star, Heart, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    content:
      "Bouquet D'Amour was founded in Fatehabad, Haryana under Sai Floritech Private Limited. What started as a passion project — handcrafting bouquets for local occasions — quickly blossomed into something much bigger.",
    Icon: Flower2,
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    year: "2020",
    title: "First 100 Happy Customers",
    content:
      "Through WhatsApp orders and heartfelt word-of-mouth, we reached our first 100 satisfied customers. Every bouquet was personally assembled and delivered — a promise we still keep today.",
    Icon: Heart,
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    year: "2021",
    title: "Going Online",
    content:
      "We launched the Bouquet D'Amour e-commerce platform, making it possible to order fresh, handcrafted flowers from anywhere in India — with just a few clicks.",
    Icon: ShoppingBag,
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
  },
  {
    year: "2022",
    title: "100 Cities & Growing",
    content:
      "Our delivery network crossed 100 cities as we partnered with skilled florists across India. Same-day delivery launched in major metros, bringing freshness right to your door.",
    Icon: Globe,
    accent: "var(--green)",
    accentBg: "var(--green-light)",
  },
  {
    year: "2023",
    title: "450+ Cities Across India",
    content:
      "A major milestone — Bouquet D'Amour now delivers to over 450 cities pan-India. From Fatehabad to Mumbai, Chennai to Delhi, every city gets access to our handcrafted blooms.",
    Icon: Star,
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
  },
  {
    year: "2024",
    title: "2,800+ Families Served",
    content:
      "Over 2,800 customers have trusted us for weddings, anniversaries, birthdays, and quiet \"thinking of you\" moments. We're grateful for every bouquet that became part of someone's story.",
    Icon: Sparkles,
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
];

export default function JourneyTimeline() {
  return (
    <section
      style={{
        background: "var(--sec-workshop)",
        padding: "96px 24px 100px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--rose)", marginBottom: "12px",
          }}>
            Our Story
          </p>
          <h2 style={{
            fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            fontFamily: "var(--font-heading)",
            lineHeight: 1.2,
            margin: 0,
          }}>
            Our Journey, Petal by Petal
          </h2>
          <p style={{
            marginTop: "14px",
            fontSize: "0.92rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "14px auto 0",
          }}>
            From a small workshop in Fatehabad to 450+ cities across India — every year brought a new chapter.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative", paddingLeft: "32px" }}>

          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "10px",
            top: "6px",
            bottom: "6px",
            width: "2px",
            background: "linear-gradient(to bottom, var(--rose-light), var(--border-light) 80%, transparent)",
            borderRadius: "2px",
          }} />

          {milestones.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ position: "relative", marginBottom: i < milestones.length - 1 ? "44px" : 0 }}
            >
              {/* Dot on the line */}
              <div style={{
                position: "absolute",
                left: "-27px",
                top: "18px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: item.accentBg,
                border: `2px solid ${item.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
                <item.Icon size={9} color={item.accent} />
              </div>

              {/* Year badge */}
              <span style={{
                display: "inline-block",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: item.accent,
                background: item.accentBg,
                padding: "3px 10px",
                borderRadius: "9999px",
                marginBottom: "6px",
              }}>
                {item.year}
              </span>

              {/* Title */}
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-heading)",
                fontFamily: "var(--font-heading)",
                margin: "0 0 10px",
                lineHeight: 1.3,
              }}>
                {item.title}
              </h3>

              {/* Card */}
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "14px",
                  padding: "18px 22px",
                  boxShadow: "var(--card-shadow)",
                  transition: "var(--card-transition)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "var(--card-shadow)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <p style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                }}>
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
