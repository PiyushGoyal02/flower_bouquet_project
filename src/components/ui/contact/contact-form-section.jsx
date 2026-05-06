import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { storeContactFormApi } from "../../../api/usersApi";

const contactDetails = [
  { Icon: Phone,  label: "Phone",    value: "+91 98765 43210",              href: "tel:+919876543210" },
  { Icon: Mail,   label: "Email",    value: "support@bouquetdamour.com",    href: "mailto:support@bouquetdamour.com" },
  { Icon: MapPin, label: "Location", value: "Chandigarh, India",            href: null },
];

const EMPTY = { firstname: "", lastname: "", email: "", subject: "", message: "" };

export default function ContactFormSection() {

  const [FormData, setFormData] = useState(EMPTY);
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const handleChange = (e) => (
    setFormData((pre) => ({...pre, [e.target.name]: e.target.value}))
  )

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);

    const token = localStorage.getItem("flowerToken");
    if (!token) {
      toast.error("Please login first to send a message.");
      setBusy(false);
      return;
    }

    try {
      await storeContactFormApi(FormData);
      setSent(true);
      setFormData(EMPTY);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.log("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="cfs-section">
      <div className="cfs-inner">

        {/* ── Left: Info ── */}
        <div className="cfs-left">
          <span className="cfs-eyebrow">Get In Touch</span>

          <h2 className="cfs-heading">
            We're Always<br />Here For You
          </h2>

          <p className="cfs-desc">
            Whether it's a custom bouquet, a bulk order for your event, or just a floral question —
            Siddhi and the team are happy to help. Reach out and we'll get back to you within 2 hours.
          </p>

          <div className="cfs-details-block">
            <h3 className="cfs-details-heading">Contact Details</h3>
            <ul className="cfs-details-list">
              {contactDetails.map(({ Icon, label, value, href }) => (
                <li key={label} className="cfs-detail-row">
                  <span className="cfs-detail-icon-wrap">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <span className="cfs-detail-text">
                    <strong>{label}:&nbsp;</strong>
                    {href
                      ? <a href={href} className="cfs-detail-link">{value}</a>
                      : value
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: Form card ── */}
        <div className="cfs-form-card">

          {sent ? (
            <div className="cfs-success">
              <div className="cfs-success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 2 hours. Thank you for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handlerSubmit} className="cfs-form" noValidate>

              {/* Row: first + last name */}
              <div className="cfs-row">
                <div className="cfs-field">
                  <label htmlFor="cfs-firstname" className="cfs-label">First Name</label>
                  <input
                    id="cfs-firstname" name="firstname" type="text"
                    placeholder="First Name" className="cfs-input"
                    required value={FormData.firstname} onChange={handleChange}
                  />
                </div>
                <div className="cfs-field">
                  <label htmlFor="cfs-lastname" className="cfs-label">Last Name</label>
                  <input
                    id="cfs-lastname" name="lastname" type="text"
                    placeholder="Last Name" className="cfs-input"
                    required value={FormData.lastname} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cfs-field">
                <label htmlFor="cfs-email" className="cfs-label">Email</label>
                <input
                  id="cfs-email" name="email" type="email"
                  placeholder="your@email.com" className="cfs-input"
                  required value={FormData.email} onChange={handleChange}
                />
              </div>

              <div className="cfs-field">
                <label htmlFor="cfs-subject" className="cfs-label">Subject</label>
                <input
                  id="cfs-subject" name="subject" type="text"
                  placeholder="Custom bouquet, bulk order…" className="cfs-input"
                  required value={FormData.subject} onChange={handleChange}
                />
              </div>

              <div className="cfs-field">
                <label htmlFor="cfs-message" className="cfs-label">Message</label>
                <textarea
                  id="cfs-message" name="message"
                  placeholder="Tell us about your order or question…"
                  className="cfs-textarea"
                  required value={FormData.message} onChange={handleChange}
                />
              </div>

              <button type="submit" className="cfs-submit" disabled={busy}>
                {busy
                  ? <span className="cfs-spinner" />
                  : "Send Message"
                }
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
