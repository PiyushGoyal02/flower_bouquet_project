import React from "react";
import { Link } from "react-router-dom";
import { Mail, Flower2 } from "lucide-react";

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.768l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  { icon: <InstagramIcon />, href: "https://instagram.com",              label: "Instagram" },
  { icon: <XIcon />,         href: "https://twitter.com",               label: "X"         },
  { icon: <Mail size={22}/>, href: "mailto:siddhibouquet3542@gmail.com", label: "Email"     },
];

const navLinks = [
  { label: "Home",     to: "/homepage"     },
  { label: "About",    to: "/aboutsection" },
  { label: "Products", to: "/products"     },
  { label: "Contact",  to: "/contact"      },
];

const brandName        = "Bouquet D'Amour";
const brandDescription = "Fresh, handcrafted bouquets made with love — delivered across 450+ cities in India. Perfect for weddings, birthdays, and every special moment.";
const creatorName      = "Sai Floritech Pvt. Ltd.";

function Footer() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        marginTop: 0,
        overflow: "hidden",
      }}
    >
      <footer
        style={{
          borderTop: "1px solid #f0dde2",
          background: "#ffffff",
          marginTop: "60px",
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Main container ── */}
        <div
          style={{
            maxWidth: "80rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "0 auto",
            minHeight: "38rem",
            position: "relative",
            padding: "40px 16px",
            boxSizing: "border-box",
          }}
        >
          {/* ── Brand + social + nav ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Brand name */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}
              >
                <span
                  style={{
                    color: "#1a0a0a",
                    fontSize: "1.875rem",
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {brandName}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "#9a7070",
                  fontWeight: 500,
                  textAlign: "center",
                  maxWidth: "400px",
                  margin: "0 0 20px",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  padding: "0 16px",
                }}
              >
                {brandDescription}
              </p>

              {/* Social icons */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "28px",
                  marginTop: "4px",
                  gap: "20px",
                }}
              >
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    style={{
                      color: "#9a7070",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c0395a";
                      e.currentTarget.style.transform = "scale(1.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9a7070";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Nav links */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "16px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "0 16px",
                }}
              >
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    style={{
                      color: "#9a7070",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#c0395a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#9a7070"; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Copyright row ── */}
          <div
            style={{
              marginTop: "80px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "#9a7070",
                textAlign: "center",
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <span
              style={{
                fontSize: "0.875rem",
                color: "#c0b0b0",
              }}
            >
              Crafted with ♥ by {creatorName}
            </span>
          </div>
        </div>

        {/* ── Large ghost brand text ── */}
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(26,10,10,0.16), rgba(26,10,10,0.07), transparent)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "130px",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            userSelect: "none",
            textAlign: "center",
            whiteSpace: "nowrap",
            fontSize: "clamp(2.6rem, 11vw, 9rem)",
            maxWidth: "95vw",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* ── Floating flower icon card ── */}
        <div
          style={{
            position: "absolute",
            bottom: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.68)",
            border: "2px solid #f0dde2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            zIndex: 10,
            boxShadow: "0 0 24px rgba(192,57,90,0.1)",
            transition: "border-color 0.3s",
            cursor: "default",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c0395a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f0dde2"; }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              background: "linear-gradient(135deg, #1a0a0a, rgba(26,10,10,0.85))",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Flower2
              style={{
                width: "52px",
                height: "52px",
                color: "#ffffff",
                filter: "drop-shadow(0 0 8px rgba(192,57,90,0.6))",
              }}
            />
          </div>
        </div>

        {/* ── Horizontal divider line ── */}
        <div
          style={{
            position: "absolute",
            bottom: "130px",
            left: "50%",
            transform: "translateX(-50%)",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f0dde2 40%, #f0dde2 60%, transparent)",
            width: "100%",
            pointerEvents: "none",
          }}
        />

        {/* ── Bottom fade shadow ── */}
        <div
          style={{
            background:
              "linear-gradient(to top, #ffffff 45%, rgba(255,255,255,0.85), rgba(255,255,255,0.2))",
            filter: "blur(16px)",
            position: "absolute",
            bottom: "110px",
            width: "100%",
            height: "88px",
            pointerEvents: "none",
          }}
        />
      </footer>
    </section>
  );
}

export default Footer;
