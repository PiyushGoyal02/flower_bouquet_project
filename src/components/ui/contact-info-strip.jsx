import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const strips = [
  {
    Icon: Phone,
    title: "Call Us Directly",
    desc: "Reach Siddhi and the team for custom orders, bulk arrangements, or same-day urgent deliveries. We pick up.",
    value: "+91 98765 43210",
    gradientFrom: "#C2385A",
    gradientTo: "#D4A840",
  },
  {
    Icon: Mail,
    title: "Email Your Order",
    desc: "Send your requirements anytime. We respond within 2 hours during business hours for all custom bouquet requests.",
    value: "support@bouquetdamour.com",
    gradientFrom: "#D4A840",
    gradientTo: "#296843",
  },
  {
    Icon: MapPin,
    title: "Visit Our Studio",
    desc: "Come explore our fresh flower studio in Chandigarh. Walk-ins welcome — we'd love to show you our collection.",
    value: "Chandigarh, India",
    gradientFrom: "#296843",
    gradientTo: "#C2385A",
  },
];

export default function ContactInfoStrip() {
  return (
    <div className="cis-wrapper">
      {strips.map(({ Icon, title, desc, value, gradientFrom, gradientTo }, idx) => (
        <div key={idx} className="cis-card-outer">

          {/* Skewed gradient panel */}
          <span
            className="cis-skew-panel"
            style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
          />
          {/* Blurred glow duplicate */}
          <span
            className="cis-skew-glow"
            style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
          />

          {/* Blob decorations */}
          <span className="cis-blob cis-blob-top" />
          <span className="cis-blob cis-blob-bottom" />

          {/* Content */}
          <div className="cis-content">
            <span className="cis-icon-wrap">
              <Icon size={26} strokeWidth={1.8} />
            </span>
            <h3 className="cis-title">{title}</h3>
            <p className="cis-desc">{desc}</p>
            <span className="cis-value">{value}</span>
          </div>

        </div>
      ))}
    </div>
  );
}
