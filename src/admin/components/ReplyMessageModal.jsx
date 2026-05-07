import React, { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReplyMessageModal({ message, onClose, onSent }) {
  const [subject, setSubject] = useState('');
  const [body, setBody]       = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (message) {
      const safeSubject = message.subject || message.text?.slice(0, 60) || 'your message';
      setSubject(`Re: ${safeSubject}`);
      setBody(
        `Hi ${message.name?.split(' ')[0] || 'there'},\n\n` +
        `Thank you for reaching out to Bouquet D'Amour.\n\n` +
        `\n\n` +
        `Best regards,\nBouquet D'Amour Team`,
      );
    }
  }, [message]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!message) return null;

  const handleSend = (e) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error('Subject cannot be empty');
      return;
    }
    if (!body.trim()) {
      toast.error('Reply message cannot be empty');
      return;
    }

    setSending(true);

    // Open default mail client with prefilled message
    const mailto =
      `mailto:${encodeURIComponent(message.email)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    // TODO: also call backend reply API to log/save the reply
    console.log('Reply sent →', { to: message.email, subject, body });

    toast.success(`Reply opened in your mail client`);
    setSending(false);
    onSent?.(message.id);
    onClose();
  };

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div
        className="pmodal rmm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rmm-title"
      >
        <header className="pmodal-header">
          <h2 id="rmm-title" className="pmodal-title">Reply to {message.name}</h2>
          <button
            type="button"
            className="pmodal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <form onSubmit={handleSend} className="pmodal-body rmm-body">

          {/* Original message preview */}
          <div className="rmm-original">
            <div className="rmm-original-head">
              <span className="rmm-original-from">{message.name}</span>
              <span className="rmm-original-date">{message.date}</span>
            </div>
            <p className="rmm-original-email">{message.email}</p>
            <p className="rmm-original-text">{message.text}</p>
          </div>

          {/* To (read-only) */}
          <div className="rmm-field">
            <label className="rmm-label">To</label>
            <input
              type="email"
              className="rmm-input rmm-input-readonly"
              value={message.email}
              readOnly
            />
          </div>

          {/* Subject */}
          <div className="rmm-field">
            <label className="rmm-label" htmlFor="rmm-subject">Subject</label>
            <input
              id="rmm-subject"
              type="text"
              className="rmm-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Re: your enquiry"
              required
            />
          </div>

          {/* Body */}
          <div className="rmm-field">
            <label className="rmm-label" htmlFor="rmm-body">Message</label>
            <textarea
              id="rmm-body"
              className="rmm-input rmm-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your reply…"
              required
            />
          </div>

          <footer className="pmodal-footer rmm-footer">
            <button
              type="button"
              className="pmodal-btn pmodal-btn-ghost"
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pmodal-btn pmodal-btn-primary rmm-send-btn"
              disabled={sending}
            >
              <Send size={14} strokeWidth={2} />
              <span>{sending ? 'Opening…' : 'Send Reply'}</span>
            </button>
          </footer>

        </form>
      </div>
    </div>
  );
}
