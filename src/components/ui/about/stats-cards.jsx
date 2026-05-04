import { Flower2, MapPin, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    Icon: Flower2,
    iconColor: "var(--rose)",
    iconBg: "var(--rose-pale)",
    title: "Bouquets Delivered",
    value: "500+",
    trend: "+18.4%",
    trendUp: true,
    trendColor: "var(--rose)",
    trendBg: "#fff0f3",
    dateRange: "Since our founding in 2019",
  },
  {
    Icon: MapPin,
    iconColor: "var(--green)",
    iconBg: "var(--green-light)",
    title: "Cities Covered",
    value: "450+",
    trend: "+12.5%",
    trendUp: true,
    trendColor: "var(--green)",
    trendBg: "var(--green-light)",
    dateRange: "Across India, pan-city delivery",
  },
  {
    Icon: Star,
    iconColor: "var(--gold)",
    iconBg: "var(--gold-light)",
    title: "Happy Customers",
    value: "2,800+",
    trend: "+8.2%",
    trendUp: true,
    trendColor: "var(--gold-dark)",
    trendBg: "var(--gold-light)",
    dateRange: "From Jan 2024 – present",
  },
];

export default function StatsCards() {
  return (
    <div style={{
      width: "100%",
      background: "var(--bg-section-rose)",
      padding: "72px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

        {/* Section label */}
        <p style={{
          textAlign: "center",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--rose)",
          marginBottom: "12px",
          fontFamily: "var(--font-body)",
        }}>
          By The Numbers
        </p>

        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "var(--text-heading)",
          fontFamily: "var(--font-heading)",
          marginBottom: "48px",
        }}>
          Our Growth, Your Happiness
        </h2>

        {/* Cards grid */}
        <div className="stats-cards-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                boxShadow: "var(--card-shadow)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
                transition: "var(--card-transition)",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                e.currentTarget.style.transform = "var(--card-transform-hover)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "var(--card-shadow)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top row: icon + badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                {/* Icon */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: s.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <s.Icon size={20} color={s.iconColor} />
                </div>

                {/* Trend badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  background: s.trendBg,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: s.trendColor,
                }}>
                  <TrendingUp size={11} color={s.trendColor} />
                  {s.trend}
                </div>
              </div>

              {/* Middle: title + value */}
              <div style={{ flexGrow: 1 }}>
                <p style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  margin: "0 0 6px",
                }}>
                  {s.title}
                </p>
                <p style={{
                  fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
                  fontWeight: 800,
                  color: "var(--text-heading)",
                  margin: "0 0 20px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </p>
              </div>

              {/* Bottom: date range */}
              <div style={{
                paddingTop: "14px",
                borderTop: "1px solid var(--border-light)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--text-hint)",
              }}>
                {s.dateRange}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 720px) {
          .stats-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 721px) and (max-width: 960px) {
          .stats-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
