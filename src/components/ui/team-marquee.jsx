import { motion } from "framer-motion";
import { Marquee } from "./marquee";
import { Quote } from "lucide-react";
import piyushImg from "../../Assests/team_images/piyush.png";
import ishikaImg from "../../Assests/team_images/ishika.png";
import trishaImg from "../../Assests/team_images/trisha.png";
import saniyaImg from "../../Assests/team_images/saniya.png";
import gouravImg from "../../Assests/team_images/gourav.png";

const teamMembers = [
  {
    name: "Piyush Goyal",
    role: "Co-Founder & CEO",
    since: "Since 2019",
    image: piyushImg,
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    name: "Ishika",
    role: "Lead Florist",
    since: "Since 2020",
    image: ishikaImg,
    accent: "var(--green)",
    accentBg: "var(--green-light)",
  },
  {
    name: "Trisha",
    role: "Customer Relations",
    since: "Since 2021",
    image: trishaImg,
    accent: "var(--rose)",
    accentBg: "var(--rose-pale)",
  },
  {
    name: "Saniya",
    role: "Operations Manager",
    since: "Since 2021",
    image: saniyaImg,
    accent: "var(--gold)",
    accentBg: "var(--gold-light)",
  },
  {
    name: "Gourav",
    role: "Logistics & Delivery Head",
    since: "Since 2022",
    image: gouravImg,
    accent: "var(--green)",
    accentBg: "var(--green-light)",
  },
];

function TeamCard({ name, role, since, image, accent, accentBg }) {
  return (
    <div
      className="team-card"
      style={{
        width: "210px",
        flexShrink: 0,
        borderRadius: "20px",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow)",
        margin: "0 10px",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "var(--card-shadow)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Photo */}
      <div style={{ width: "100%", height: "240px", overflow: "hidden", position: "relative" }}>
        <img
          src={image}
          alt={name}
          className="team-card-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1)",
            transition: "filter 0.4s ease",
          }}
        />
        {/* Role badge overlay */}
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accent,
            background: accentBg,
            padding: "3px 9px",
            borderRadius: "9999px",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
          className="team-card-badge"
        >
          {since}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <p style={{
          margin: 0,
          fontSize: "0.92rem",
          fontWeight: 700,
          color: "var(--text-heading)",
          fontFamily: "var(--font-heading)",
          lineHeight: 1.3,
        }}>
          {name}
        </p>
        <p style={{
          margin: "4px 0 0",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
        }}>
          {role}
        </p>
      </div>
    </div>
  );
}

export default function TeamMarquee() {
  return (
    <section
      style={{
        background: "var(--sec-workshop)",
        padding: "96px 0 100px",
        fontFamily: "var(--font-body)",
        overflow: "hidden",
      }}
    >
      {/* Hover CSS */}
      <style>{`
        .team-card:hover .team-card-img { filter: grayscale(0) !important; }
        .team-card:hover .team-card-badge { opacity: 1 !important; }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{ textAlign: "center", marginBottom: "56px", padding: "0 24px" }}
      >
        <p style={{
          fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--rose)", marginBottom: "12px",
        }}>
          Our People
        </p>
        <h2 style={{
          fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
          fontWeight: 700,
          color: "var(--text-heading)",
          fontFamily: "var(--font-heading)",
          margin: "0 0 14px",
          lineHeight: 1.2,
        }}>
          The Hands Behind Every Bouquet
        </h2>
        <p style={{
          fontSize: "0.92rem",
          color: "var(--text-muted)",
          maxWidth: "480px",
          margin: "0 auto",
          lineHeight: 1.75,
        }}>
          From the florist who selects each stem to the coordinator who ensures it arrives on time — meet the team that makes it all happen.
        </p>
      </motion.div>

      {/* Marquee */}
      <Marquee
        direction="left"
        duration={38}
        pauseOnHover={true}
        fade={true}
        fadeAmount={10}
        style={{ paddingBottom: "8px" }}
      >
        {teamMembers.map((member, i) => (
          <TeamCard key={i} {...member} />
        ))}
      </Marquee>

      {/* Testimonial quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.2 }}
        style={{
          maxWidth: "600px",
          margin: "56px auto 0",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}>
          <div style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: "var(--rose-pale)",
            border: "1px solid var(--rose-pale)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Quote size={18} color="var(--rose)" strokeWidth={1.8} />
          </div>
        </div>

        <p style={{
          fontSize: "1.05rem",
          fontStyle: "italic",
          color: "var(--text-body)",
          lineHeight: 1.85,
          margin: "0 0 20px",
          fontFamily: "var(--font-heading)",
        }}>
          "Every bouquet we make carries a piece of our heart. We don't just arrange flowers — we help people say what words often can't."
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <img
            src={piyushImg}
            alt="Piyush Goyal"
            style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "top",
              border: "2px solid var(--rose-pale)",
            }}
          />
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>
              Piyush Goyal
            </p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Co-Founder & CEO, Bouquet D'Amour
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
