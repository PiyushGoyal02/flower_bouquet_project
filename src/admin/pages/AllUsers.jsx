import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import UserDetailModal from '../components/UserDetailModal';
import { getAllUsersApi } from '../../api/usersApi';
import '../styles/AdminDashboard.css';
import '../styles/AllUsers.css';
// import '../styles/ProductModals.css';
import '../styles/UserDetailModal.css';

// Backend user → UI shape
const mapUser = (u) => ({
  id:           u._id,
  name:         u.username || 'Unknown User',
  email:        u.email || '—',
  phone:        u.phoneNumber || u.phone || '—',
  address:      u.address || '—',
  profileImage: u.profileImage || u.avatar || '',
  gender:       u.gender || '',
  status:       u.isBlocked ? 'Blocked' : 'Active',
  orders:       Array.isArray(u.ordersList) ? u.ordersList.length : (u.orders || 0),
  ordersList:   u.ordersList || [],
  messages:     u.contactSubmissions || u.messages || [],
});

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function AllUsers() {
  const [collapsed, setCollapsed]   = useState(false);
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [viewTarget, setViewTarget] = useState(null);

  /* Fetch users on mount */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getAllUsersApi();
        if (cancelled) return;
        const list = (data?.users || []).map(mapUser);
        setUsers(list);
      } catch (error) {
        if (cancelled) return;
        if (error?.response?.status !== 404) {
          const msg = error?.response?.data?.message || 'Failed to load users';
          toast.error(msg);
        }
        setUsers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const handleView = (user) => {
    setViewTarget(user);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">All Users</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content au-content">

          <h1 className="au-page-title">All Users</h1>

          {/* Search */}
          <div className="au-search">
            <span className="au-search-icon">
              <Search size={16} strokeWidth={2} />
            </span>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="au-search-input"
            />
          </div>

          {/* Table */}
          <div className="au-table-card">
            <table className="au-table">
              <thead>
                <tr>
                  <th className="au-th-name">Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Status</th>
                  <th className="au-th-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="au-empty">Loading users…</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="au-empty">
                      {users.length === 0 ? 'No users found.' : 'No users match your search.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="au-user-cell">
                          <span className="au-avatar">
                            {u.profileImage
                              ? <img src={u.profileImage} alt={u.name} />
                              : initials(u.name)
                            }
                          </span>
                          <span className="au-user-name">{u.name}</span>
                        </div>
                      </td>
                      <td className="au-email">{u.email}</td>
                      <td className="au-orders">{u.orders}</td>
                      <td>
                        <span
                          className={`au-status ${
                            u.status === 'Active'
                              ? 'au-status-active'
                              : 'au-status-blocked'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="au-view-btn"
                          onClick={() => handleView(u)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* User detail modal */}
      {viewTarget && (
        <UserDetailModal
          user={viewTarget}
          onClose={() => setViewTarget(null)}
        />
      )}
    </div>
  );
}
