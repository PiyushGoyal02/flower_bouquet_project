import { Flower2, MessageCircle } from "lucide-react";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.768l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

function Separator({ style }) {
  return (
    <div
      style={{
        flexShrink: 0,
        background: "#e5e7eb",
        height: "1px",
        width: "100%",
        ...style,
      }}
    />
  );
}

export function HeroSection03() {
  const headingStyle = {
    fontSize: "clamp(3.5rem, 9vw, 10rem)",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "0.08em",
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    color: "#1a0a0a",
    display: "flex",
    alignItems: "center",
  };

  const descStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    lineHeight: "1.6rem",
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />


      {/* ── Main ── */}
      <main style={{ position: "relative", paddingTop: "80px", paddingBottom: "80px", zIndex: 1 }}>

        {/* Big heading rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "0 24px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <p style={{ ...descStyle, textAlign: "right", maxWidth: "200px" }}>
              India's premier floral brand, crafting bouquets with love for every occasion — owned by Sai Floritech Pvt. Ltd.
            </p>
            <h1 style={headingStyle}>FRESH</h1>
          </div>

          {/* Row 2 — B[flower]UQUETS */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <h1 style={headingStyle}>
              <span>B</span>
              <Flower2
                style={{
                  width: "clamp(3.2rem, 8vw, 9.5rem)",
                  height: "clamp(3.2rem, 8vw, 9.5rem)",
                  color: "#c0395a",
                  flexShrink: 0,
                }}
              />
              <span>UQUETS</span>
            </h1>
            <p style={{ ...descStyle, paddingTop: "32px", maxWidth: "200px" }}>
              Open to all forms of floral collaboration — delivering across 450+ cities in India, regardless of location.
            </p>
          </div>

          {/* Row 3 — CRAFTED [heart] LOVE */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <h1 style={headingStyle}>
              <span>CRAFTED</span>
              {/* Heart — large screens */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "clamp(3.5rem, 8vw, 9.5rem)", height: "clamp(3.5rem, 8vw, 9.5rem)", flexShrink: 0 }}
                viewBox="0 0 24 24"
                fill="#f43f5e"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
              <span>LOVE</span>
            </h1>
          </div>
        </div>

        {/* ── Info row: separator + location + brand name ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "0 32px",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Separator style={{ maxWidth: "768px", margin: "24px auto" }} />
            <div
              style={{
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                fontFamily: "'Poppins', sans-serif",
                color: "#1a0a0a",
                letterSpacing: "0.05em",
              }}
            >
              PAN INDIA DELIVERY · 450+ CITIES
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 100,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#1a0a0a",
                }}
              >
                FLORIST
              </span>
              <span
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 3rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#ea580c",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                sai
              </span>
            </div>
          </div>
        </div>

        {/* ── Portfolio image + tagline ── */}
        <div
          style={{
            padding: "48px 80px 0",
            gap: "24px",
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "336px",
              height: "192px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              border: "1px solid #f0e4e8",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=700&h=400&fit=crop&q=80"
              alt="Bouquet D'Amour — handcrafted bouquets"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <p style={{ ...descStyle, paddingTop: "32px", maxWidth: "300px", lineHeight: "1.75" }}>
            From classic red roses to exotic orchids — each arrangement is handcrafted daily by our expert florists. Bringing emotion and elegance to every doorstep across India.
          </p>
        </div>

        {/* ── Social icons ── */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#1a0a0a", cursor: "pointer" }}><InstagramIcon /></span>
          <span style={{ color: "#1a0a0a", cursor: "pointer" }}><XIcon /></span>
          <MessageCircle style={{ width: "20px", height: "20px", color: "#1a0a0a", cursor: "pointer" }} />
        </div>

        {/* ── Award badge (fixed right edge) ── */}
        <div
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "144px",
            display: "flex",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#1a0a0a",
              color: "#ffffff",
              padding: "24px 10px",
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                display: "block",
              }}
            >
              Top Florist
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}
