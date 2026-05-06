import React, { useState } from 'react';
import { Package, ShoppingBag, Users, IndianRupee } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminDashboard.css';

const STATS = [
  { label: 'Total Revenue',  value: '₹1,24,800', sub: '+12% this month',  icon: IndianRupee,  color: 'gold'  },
  { label: 'Total Orders',   value: '248',        sub: '12 pending',       icon: ShoppingBag,  color: 'rose'  },
  { label: 'Total Products', value: '86',         sub: '4 out of stock',   icon: Package,      color: 'green' },
  { label: 'Total Users',    value: '1,340',      sub: '+28 this week',    icon: Users,        color: 'muted' },
];

const ORDERS = [
  { id: '#ORD-1021', customer: 'Priya Sharma',   product: 'Red Rose Bouquet',    amount: '₹1,299', status: 'delivered'  },
  { id: '#ORD-1022', customer: 'Ananya Gupta',   product: 'Sunflower Mix',        amount: '₹899',   status: 'pending'    },
  { id: '#ORD-1023', customer: 'Rahul Mehta',    product: 'White Lily Basket',    amount: '₹1,599', status: 'processing' },
  { id: '#ORD-1024', customer: 'Sneha Kapoor',   product: 'Pink Carnations',      amount: '₹749',   status: 'delivered'  },
  { id: '#ORD-1025', customer: 'Vikram Joshi',   product: 'Wedding Centerpiece',  amount: '₹3,200', status: 'pending'    },
];

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">Dashboard</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">

          {/* Stats */}
          <div className="admin-stats-grid">
            {STATS.map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="admin-stat-card">
                <div className="admin-stat-top">
                  <span className="admin-stat-label">{label}</span>
                  <div className={`admin-stat-icon ${color}`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="admin-stat-value">{value}</div>
                <div className="admin-stat-sub">{sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="admin-section-heading">Recent Orders</div>
          <div className="admin-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map(({ id, customer, product, amount, status }) => (
                  <tr key={id}>
                    <td style={{ color: 'var(--rose)', fontWeight: 600 }}>{id}</td>
                    <td>{customer}</td>
                    <td>{product}</td>
                    <td>{amount}</td>
                    <td>
                      <span className={`admin-status-badge ${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
