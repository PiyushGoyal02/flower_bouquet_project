import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    q: "How do I place a custom bouquet order?",
    a: "Simply fill out the contact form above or call us directly at +91 98765 43210. Tell us the occasion, your preferred flowers, and budget — Siddhi will craft the perfect bouquet for you within 24 hours.",
  },
  {
    id: 2,
    q: "What is your delivery timeline?",
    a: "We offer same-day delivery for orders placed before 2:00 PM in Chandigarh. For custom or bulk orders, we recommend placing your order at least 1–2 days in advance to ensure the freshest blooms.",
  },
  {
    id: 3,
    q: "Can I visit the studio before ordering?",
    a: "Absolutely! Walk-ins are always welcome at our studio in Dev Samaj College, Sector 45-B, Chandigarh. Our hours are Mon–Sat 10 AM to 8 PM and Sunday 11 AM to 5 PM. No appointment needed.",
  },
  {
    id: 4,
    q: "How quickly do you respond to messages?",
    a: "We respond to all emails and form submissions within 2 hours during business hours. For urgent orders, calling us directly at +91 98765 43210 is the fastest way to reach us.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`cfaq-item ${isOpen ? "cfaq-item--open" : ""}`}>
      <button className="cfaq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="cfaq-question">{item.q}</span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className="cfaq-chevron"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="cfaq-body"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <p className="cfaq-answer">{item.a}</p>
      </div>
    </div>
  );
}

export default function ContactFaq() {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="cfaq-section">
      <div className="cfaq-inner">

        {/* Header */}
        <div className="cfaq-header">
          <span className="cfaq-eyebrow">Quick Answers</span>
          <h2 className="cfaq-heading">Frequently Asked Questions</h2>
          <p className="cfaq-sub">
            Can't find what you need?{" "}
            <a href="mailto:support@bouquetdamour.com" className="cfaq-sub-link">
              Email us directly
            </a>{" "}
            and we'll get back to you within 2 hours.
          </p>
        </div>

        {/* Accordion */}
        <div className="cfaq-list">
          {faqs.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
