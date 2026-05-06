import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, PackagePlus, Tag,
  ClipboardList, ArrowRight, Users, Ticket,
  Image, Star, Truck, Mail, Menu, LogOut,
} from 'lucide-react';
import '../styles/AdminSidebar.css';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'All Products',  icon: Package,     path: '/admin/products'        },
      { label: 'Add Product',   icon: PackagePlus, path: '/admin/products/add'    },
      { label: 'Categories',    icon: Tag,         path: '/admin/categories'      },
    ],
  },
  {
    label: 'Orders',
    items: [
      { label: 'All Orders',    icon: ClipboardList, path: '/admin/orders',        badge: 12 },
      { label: 'Order Detail',  icon: ArrowRight,    path: '/admin/orders/detail'  },
    ],
  },
  {
    label: 'Users',
    items: [
      { label: 'All Users', icon: Users, path: '/admin/users' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { label: 'Coupons',  icon: Ticket, path: '/admin/coupons'           },
      { label: 'Banners',  icon: Image,  path: '/admin/banners'           },
      { label: 'Reviews',  icon: Star,   path: '/admin/reviews', badge: 5 },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Delivery Zones', icon: Truck, path: '/admin/delivery'            },
      { label: 'Messages',       icon: Mail,  path: '/admin/messages', badge: 3  },
    ],
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { pathname }                  = useLocation();
  const navigate                      = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile hamburger (shown on small screens) */}
      <button
        className="admin-mobile-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{
          display:         'none',
          position:        'fixed',
          top:             16,
          left:            16,
          zIndex:          999,
          background:      'var(--ink)',
          border:          '1px solid rgba(255,255,255,0.1)',
          borderRadius:    'var(--r-sm)',
          padding:         8,
          cursor:          'pointer',
          color:           'var(--text-on-dark)',
        }}
      >
        <Menu size={20} />
      </button>

      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>

        {/* ── Header ── */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <span className="admin-brand-name">🌸 Bouquet D'Amour</span>
            <span className="admin-brand-label">Admin Panel</span>
          </div>
          <button
            className="admin-sidebar-toggle"
            onClick={() => setCollapsed(p => !p)}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* ── Navigation ── */}
        <div className="admin-sidebar-scroll">
          {NAV_SECTIONS.map((section, si) => (
            <div key={section.label} className="admin-nav-group">
              {si > 0 && <div className="admin-nav-divider" />}
              <span className="admin-nav-group-label">{section.label}</span>

              {section.items.map(({ label, icon: Icon, path, badge }) => (
                <div
                  key={path}
                  className={`admin-nav-item ${pathname === path ? 'active' : ''}`}
                  onClick={() => handleNav(path)}
                  title={collapsed ? label : ''}
                >
                  <span className="admin-nav-icon">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span className="admin-nav-label">{label}</span>
                  {badge && <span className="admin-nav-badge">{badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Footer: Logout ── */}
        <div className="admin-sidebar-footer">
          <div
            className="admin-nav-item"
            onClick={() => {
              localStorage.removeItem('flowerToken');
              navigate('/');
            }}
            title={collapsed ? 'Logout' : ''}
          >
            <span className="admin-nav-icon">
              <LogOut size={16} strokeWidth={1.8} />
            </span>
            <span className="admin-nav-label">Logout</span>
          </div>
        </div>

      </aside>
    </>
  );
}
