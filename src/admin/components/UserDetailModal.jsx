import React, { useEffect } from 'react';
import { X, Mail, Phone, MapPin, Package, MessageSquare } from 'lucide-react';

const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');

const orderStatusClass = (s) => {
  const k = String(s).toLowerCase();
  if (k.includes('deliver')) return 'udm-order-status-delivered';
  if (k.includes('cancel'))  return 'udm-order-status-cancelled';
  if (k.includes('process')) return 'udm-order-status-processing';
  return 'udm-order-status-pending';
};

export default function UserDetailModal({ user, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const orders   = user.ordersList || [];
  const messages = user.messages   || [];

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div
        className="pmodal udm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="udm-title"
      >
        <header className="pmodal-header">
          <h2 id="udm-title" className="pmodal-title">User Details</h2>
          <button
            type="button"
            className="pmodal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="pmodal-body udm-body">

          {/* Profile header */}
          <div className="udm-profile">
            <div className="udm-avatar">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="udm-profile-info">
              <h3 className="udm-name">{user.name}</h3>
              <p className="udm-sub-email">{user.email}</p>
              <span
                className={`udm-status ${
                  user.status === 'Active'
                    ? 'udm-status-active'
                    : 'udm-status-blocked'
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="udm-profile-stats">
              <div>
                <span className="udm-stat-value">{user.orders}</span>
                <span className="udm-stat-label">Orders</span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <section className="udm-section">
            <h4 className="udm-section-title">Contact Information</h4>
            <div className="udm-contact-grid">
              <div className="udm-contact-item">
                <span className="udm-contact-icon"><Mail size={16} strokeWidth={2} /></span>
                <div>
                  <p className="udm-contact-label">Email</p>
                  <p className="udm-contact-value">{user.email}</p>
                </div>
              </div>

              <div className="udm-contact-item">
                <span className="udm-contact-icon"><Phone size={16} strokeWidth={2} /></span>
                <div>
                  <p className="udm-contact-label">Phone</p>
                  <p className="udm-contact-value">{user.phone || '—'}</p>
                </div>
              </div>

              <div className="udm-contact-item udm-contact-full">
                <span className="udm-contact-icon"><MapPin size={16} strokeWidth={2} /></span>
                <div>
                  <p className="udm-contact-label">Address</p>
                  <p className="udm-contact-value">{user.address || '—'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Order details */}
          <section className="udm-section">
            <h4 className="udm-section-title">
              <Package size={15} strokeWidth={2} />
              Order Details
              <span className="udm-count-pill">{orders.length}</span>
            </h4>

            {orders.length === 0 ? (
              <p className="udm-empty">No orders yet.</p>
            ) : (
              <ul className="udm-order-list">
                {orders.map((o) => (
                  <li key={o.id} className="udm-order-item">
                    <div className="udm-order-main">
                      <p className="udm-order-id">{o.id}</p>
                      <p className="udm-order-product">{o.product}</p>
                      <p className="udm-order-date">{o.date}</p>
                    </div>
                    <div className="udm-order-right">
                      <span className={`udm-order-status ${orderStatusClass(o.status)}`}>
                        {o.status}
                      </span>
                      <p className="udm-order-amount">{formatPrice(o.amount)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Messages */}
          <section className="udm-section">
            <h4 className="udm-section-title">
              <MessageSquare size={15} strokeWidth={2} />
              Messages
              <span className="udm-count-pill">{messages.length}</span>
            </h4>

            {messages.length === 0 ? (
              <p className="udm-empty">No messages from this user.</p>
            ) : (
              <ul className="udm-msg-list">
                {messages.map((m) => (
                  <li key={m.id} className="udm-msg-item">
                    <div className="udm-msg-head">
                      <span className="udm-msg-subject">{m.subject}</span>
                      <span className="udm-msg-date">{m.date}</span>
                    </div>
                    <p className="udm-msg-text">{m.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

        </div>

        <footer className="pmodal-footer">
          <button
            type="button"
            className="pmodal-btn pmodal-btn-ghost"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
