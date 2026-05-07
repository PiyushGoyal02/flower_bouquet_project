import React, { useState, useMemo } from 'react';
import { Search, Reply } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import ReplyMessageModal from '../components/ReplyMessageModal';
import '../styles/AdminDashboard.css';
import '../styles/ContactMessages.css';
import '../styles/ProductModals.css';
import '../styles/ReplyMessageModal.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    name: 'Sunita Verma',
    email: 'sunita@email.com',
    text: 'Can I schedule a weekly flower subscription for my office?',
    date: '5 May, 11:20 AM',
    read: false,
  },
  {
    id: 2,
    name: 'Rahul Gupta',
    email: 'rahul@email.com',
    text: 'Do you take bulk orders for weddings? Need 50+ bouquets.',
    date: '4 May, 3:45 PM',
    read: true,
  },
  {
    id: 3,
    name: 'Meera Iyer',
    email: 'meera@email.com',
    text: 'I want a custom anniversary bouquet with red roses and lilies. Can you suggest a design?',
    date: '4 May, 10:08 AM',
    read: false,
  },
  {
    id: 4,
    name: 'Arjun Patel',
    email: 'arjun@email.com',
    text: 'Order #ORD-1042 was delivered today — beautiful arrangement, thank you!',
    date: '3 May, 6:32 PM',
    read: true,
  },
  {
    id: 5,
    name: 'Neha Khurana',
    email: 'neha@email.com',
    text: 'Can you deliver to Mohali Phase 11? My pin code is 160062.',
    date: '3 May, 1:15 PM',
    read: false,
  },
];

const FILTERS = [
  { key: 'all',    label: 'All'    },
  { key: 'unread', label: 'Unread' },
  { key: 'read',   label: 'Read'   },
];

export default function ContactMessages() {
  const [collapsed, setCollapsed]   = useState(false);
  const [filter, setFilter]         = useState('all');
  const [search, setSearch]         = useState('');
  const [messages, setMessages]     = useState(INITIAL_MESSAGES);
  const [replyTarget, setReplyTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return messages.filter((m) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'unread' && !m.read) ||
        (filter === 'read'   &&  m.read);
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.text.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, messages]);

  const handleReply = (msg) => {
    setReplyTarget(msg);
  };

  const handleSent = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">Messages</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content cm-content">

          {/* Header */}
          <div className="cm-header">
            <h1 className="cm-page-title">
              Contact Messages
              {unreadCount > 0 && (
                <span className="cm-header-badge">{unreadCount} new</span>
              )}
            </h1>
          </div>

          {/* Toolbar */}
          <div className="cm-toolbar">
            <div className="cm-search">
              <span className="cm-search-icon">
                <Search size={16} strokeWidth={2} />
              </span>
              <input
                type="text"
                className="cm-search-input"
                placeholder="Search by name, email or message…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="cm-filter-pills">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`cm-filter-pill ${filter === f.key ? 'cm-filter-pill-active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message list */}
          <div className="cm-list">
            {filtered.length === 0 ? (
              <p className="cm-empty">No messages found.</p>
            ) : (
              filtered.map((m) => (
                <article
                  key={m.id}
                  className={`cm-card ${!m.read ? 'cm-card-unread' : ''}`}
                >
                  <div className="cm-card-top">
                    <div className="cm-sender">
                      <h3 className="cm-name">{m.name}</h3>
                      <span className="cm-email">{m.email}</span>
                    </div>
                    <span className="cm-date">{m.date}</span>
                  </div>

                  <p className="cm-text">{m.text}</p>

                  <div className="cm-card-actions">
                    <button
                      type="button"
                      className="cm-reply-btn"
                      onClick={() => handleReply(m)}
                    >
                      <Reply size={14} strokeWidth={2} />
                      <span>Reply</span>
                    </button>

                    <span className={`cm-pill ${m.read ? 'cm-pill-read' : 'cm-pill-unread'}`}>
                      {m.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </main>

      {/* Reply modal */}
      {replyTarget && (
        <ReplyMessageModal
          message={replyTarget}
          onClose={() => setReplyTarget(null)}
          onSent={handleSent}
        />
      )}
    </div>
  );
}
