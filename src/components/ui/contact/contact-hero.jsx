import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

function GradientBars() {
  const numBars = 15;

  const calculateHeight = (index, total) => {
    const position = index / (total - 1);
    const distanceFromCenter = Math.abs(position - 0.5);
    const heightPct = Math.pow(distanceFromCenter * 2, 1.2);
    return 28 + (100 - 28) * heightPct;
  };

  return (
    <div className="ch-bars-wrapper">
      {Array.from({ length: numBars }).map((_, i) => (
        <div
          key={i}
          className="ch-bar"
          style={{
            transform: `scaleY(${calculateHeight(i, numBars) / 100})`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

function TrustBadge() {
  const dots = ["#C2385A", "#D4A840", "#296843", "#C2385A"];
  return (
    <div className="ch-trust-badge">
      <div className="ch-trust-dots">
        {dots.map((color, i) => (
          <span
            key={i}
            className="ch-trust-dot"
            style={{ background: color, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
      <span className="ch-trust-text">
        <strong>500+</strong> happy customers love our bouquets
      </span>
    </div>
  );
}

export default function ContactHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`ch-section ${visible ? "ch-visible" : ""}`}>
      {/* Dark base */}
      <div className="ch-base" />

      {/* Animated gradient bars */}
      <GradientBars />

      {/* Vignette overlay so text stays readable */}
      <div className="ch-vignette" />

      {/* Content */}
      <div className="ch-content">
        <TrustBadge />

        <h1 className="ch-heading">
          <span className="ch-heading-serif">We'd Love to</span>
          <span className="ch-heading-italic">Hear From You</span>
        </h1>

        <p className="ch-sub">
          Custom orders, questions, or just a floral hello —<br />
          reach out and let's create something beautiful together.
        </p>

        {/* CTA buttons */}
        <div className="ch-actions">
          <a href="mailto:support@bouquetdamour.com" className="ch-btn-primary">
            <Mail size={16} strokeWidth={2} />
            Send a Message
          </a>
          <a href="tel:+919876543210" className="ch-btn-outline">
            <Phone size={16} strokeWidth={2} />
            Call Us
          </a>
        </div>

        {/* Quick info pills */}
        <div className="ch-info-pills">
          <span className="ch-pill">
            <MapPin size={13} strokeWidth={2} />
            Chandigarh, India
          </span>
          <span className="ch-pill-divider" />
          <span className="ch-pill">
            <Mail size={13} strokeWidth={2} />
            support@bouquetdamour.com
          </span>
        </div>

        {/* Socials */}
        <div className="ch-socials">
          <a href="#" className="ch-social-link" aria-label="Instagram">
            <FaInstagram size={19} />
          </a>
          <a href="#" className="ch-social-link" aria-label="Phone">
            <Phone size={19} strokeWidth={1.8} />
          </a>
          <a href="#" className="ch-social-link" aria-label="Email">
            <Mail size={19} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}
