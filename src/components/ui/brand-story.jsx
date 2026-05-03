import { MorphingText } from "./liquid-text";

const MORPH_TEXTS = [
  "Fresh Blooms",
  "Crafted Daily",
  "Delivered with Love",
  "450+ Cities",
  "Since 2019",
  "Sai Floritech",
  "Bouquet D'Amour",
];

const STATS = [
  { number: "500+",   label: "Bouquets Made" },
  { number: "450+",   label: "Cities Served" },
  { number: "5 Yrs",  label: "Of Experience" },
  { number: "1-Day",  label: "Delivery" },
];

export default function BrandStory() {
  return (
    <section
      style={{
        background:  "var(--sec-brandstory)",
        padding:     "90px 24px 100px",
        overflow:    "hidden",
        position:    "relative",
        fontFamily:  "'Poppins', sans-serif",
      }}
    >
      {/* Soft radial glow behind the text */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          top:          "50%",
          left:         "50%",
          transform:    "translate(-50%, -55%)",
          width:        "700px",
          height:       "500px",
          borderRadius: "50%",
          background:   "radial-gradient(ellipse, rgba(192,57,90,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Label ── */}
      <p
        style={{
          textAlign:     "center",
          fontSize:      "0.72rem",
          fontWeight:    700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "var(--rose)",
          marginBottom:  "20px",
        }}
      >
        Who We Are
      </p>

      {/* ── Morphing headline ── */}
      <MorphingText
        texts={MORPH_TEXTS}
        color="var(--rose-light)"
        style={{ marginBottom: "56px" }}
      />

      {/* ── Two-column layout: description + stats ── */}
      <div
        className="brand-story-grid"
        style={{
          maxWidth:           "1080px",
          margin:             "0 auto",
          display:            "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                "60px",
          alignItems:         "center",
        }}
      >
        {/* Left — company description */}
        <div>
          <h3
            style={{
              fontSize:      "clamp(1.4rem, 2.8vw, 2rem)",
              fontWeight:    700,
              color:         "var(--text-on-dark)",
              marginBottom:  "20px",
              lineHeight:    1.25,
              letterSpacing: "-0.01em",
            }}
          >
            India's Most Loved<br />
            <span style={{ color: "var(--rose)" }}>Floral Brand</span>
          </h3>

          <p
            style={{
              fontSize:     "0.97rem",
              color:        "var(--text-on-dark-body)",
              lineHeight:   1.85,
              marginBottom: "16px",
            }}
          >
            Bouquet D'Amour, owned and managed by{" "}
            <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>
              Sai Floritech Private Limited
            </span>
            , is a floral e-commerce brand that has been crafting heartfelt
            bouquets since 2019. Every arrangement is handpicked, freshly
            assembled, and packed with emotion — because we believe flowers
            speak louder than words.
          </p>

          <p
            style={{
              fontSize:   "0.97rem",
              color:      "var(--text-on-dark-body)",
              lineHeight: 1.85,
              marginBottom: "16px",
            }}
          >
            From our workshop in{" "}
            <span style={{ color: "var(--rose-light)", fontWeight: 500 }}>
              Fatehabad, Haryana
            </span>
            , we deliver blooms of joy to over{" "}
            <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>
              450 cities across India
            </span>{" "}
            — with same-day delivery available in major metros. Whether it's
            a grand wedding, a quiet anniversary, or a spontaneous "thinking
            of you" moment, we have the perfect bouquet for you.
          </p>

          <p
            style={{
              fontSize:   "0.97rem",
              color:      "var(--text-on-dark-body)",
              lineHeight: 1.85,
            }}
          >
            Our expert florists source the finest seasonal flowers daily,
            ensuring every petal is at its freshest. Sustainability,
            craftsmanship, and genuine care are at the heart of everything
            we do.
          </p>

          {/* Contact line */}
          <div
            style={{
              marginTop:   "28px",
              display:     "flex",
              gap:         "8px",
              alignItems:  "center",
              fontSize:    "0.82rem",
              color:       "var(--text-on-dark-muted)",
            }}
          >
            <span>✉</span>
            <span>siddhibouquet3542@gmail.com</span>
            <span style={{ margin: "0 6px", opacity: 0.4 }}>·</span>
            <span>📞 +91 96857 21458</span>
          </div>
        </div>

        {/* Right — stats grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "20px",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                background:   "rgba(255,255,255,0.04)",
                border:       "1px solid var(--rose-shadow)",
                borderRadius: "18px",
                padding:      "28px 24px",
                textAlign:    "center",
                transition:   "border-color 0.3s, background 0.3s",
                cursor:       "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(192,57,90,0.45)";
                e.currentTarget.style.background  = "rgba(192,57,90,0.07)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--rose-shadow)";
                e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
              }}
            >
              <div
                style={{
                  fontSize:      "clamp(2rem, 3.5vw, 2.6rem)",
                  fontWeight:    800,
                  color:         "var(--rose)",
                  lineHeight:    1,
                  marginBottom:  "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontSize:      "0.72rem",
                  fontWeight:    600,
                  color:         "var(--text-on-dark-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Responsive: stack on mobile ── */}
      <style>{`
        @media (max-width: 720px) {
          .brand-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
