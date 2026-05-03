import React, { useMemo } from "react";

/* ─── Testimonial data ───────────────────────────── */
const row1 = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&fit=crop",
    name: "Priya Sharma",
    handle: "@priyasharma",
    review: "The red roses arrived perfectly fresh and beautifully arranged. My husband was absolutely speechless!",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&fit=crop",
    name: "Arjun Mehta",
    handle: "@arjunm",
    review: "Same-day delivery was seamless. The mixed bouquet looked even better in person than on the website.",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop",
    name: "Neha Kapoor",
    handle: "@nehakapoor",
    review: "Ordered wedding floral arrangements and they exceeded every expectation. Truly handcrafted with love!",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&fit=crop",
    name: "Rohan Verma",
    handle: "@rohanv",
    review: "Fresh tulips for my mom's birthday — she cried happy tears. Will definitely order again.",
  },
];

const row2 = [
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&fit=crop",
    name: "Sneha Iyer",
    handle: "@snehai",
    review: "The orchid arrangement stayed fresh for over two weeks. Premium quality at a very fair price.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&fit=crop",
    name: "Karan Singh",
    handle: "@karanflowers",
    review: "Gifted a sunflower bouquet to my girlfriend. She said it was the sweetest thing anyone had done for her.",
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop",
    name: "Meera Joshi",
    handle: "@meeraj",
    review: "Eco-friendly packaging, fresh blooms, and super fast delivery. This is now my go-to flower shop!",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop",
    name: "Dev Patel",
    handle: "@devpatel",
    review: "Anniversary bouquet was stunning. The team even added a personalised note — such a thoughtful touch.",
  },
];

/* ─── VerifyIcon ─────────────────────────────────── */
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 48 48" style={{ display: "inline-block", flexShrink: 0 }}>
    <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884" />
    <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926" />
  </svg>
);

/* ─── Single testimonial card ────────────────────── */
const TestimonialCard = ({ card }) => (
  <div style={{
    padding: "18px",
    borderRadius: "14px",
    margin: "0 10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    width: "280px",
    flexShrink: 0,
    background: "var(--card-bg)",
  }}>
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <img
        src={card.image}
        alt={card.name}
        style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-heading)" }}>{card.name}</span>
          <VerifyIcon />
        </div>
        <span style={{ fontSize: "0.73rem", color: "var(--ink-hint)" }}>{card.handle}</span>
      </div>
    </div>
    <p style={{ marginTop: "14px", fontSize: "0.83rem", lineHeight: 1.65, color: "var(--text-body)" }}>
      {card.review}
    </p>
  </div>
);

/* ─── Scrolling row ──────────────────────────────── */
const MarqueeRow = ({ data, reverse = false, speed = 28 }) => {
  const doubled = useMemo(() => [...data, ...data], [data]);
  const animName = reverse ? "rc-scroll-reverse" : "rc-scroll";
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "80px", background: "linear-gradient(to right, var(--sec-reviews), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ display: "flex", padding: reverse ? "6px 0 14px" : "14px 0 6px", width: "max-content", animation: `${animName} ${speed}s linear infinite` }}>
        {doubled.map((c, i) => <TestimonialCard key={i} card={c} />)}
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "80px", background: "linear-gradient(to left, var(--sec-reviews), transparent)", zIndex: 2, pointerEvents: "none" }} />
    </div>
  );
};

/* ─── Main export ────────────────────────────────── */
export default function ReviewCards() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes rc-scroll         { 0% { transform: translateX(0);    } 100% { transform: translateX(-50%); } }
        @keyframes rc-scroll-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0);    } }
      `}</style>

      <div style={{ width: "100%", background: "var(--sec-reviews)", padding: "64px 0 72px", fontFamily: "'Poppins', sans-serif" }}>

        {/* Heading */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px", padding: "0 24px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text-heading)", textAlign: "center", fontFamily: "var(--font-heading)" }}>
            What Our Customers Say
          </h2>
          <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", maxWidth: "460px", lineHeight: 1.65 }}>
            Real love stories, shared by the people who matter most — our customers.
          </p>
        </div>

        <MarqueeRow data={row1} reverse={false} speed={30} />
        <MarqueeRow data={row2} reverse={true}  speed={28} />
      </div>
    </>
  );
}
