import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Pencil, Trash2, ChevronDown, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { getAllProductsApi } from '../../api/adminAPIs';
import '../styles/AdminDashboard.css';
import '../styles/AllProducts.css';
import '../styles/ProductModals.css';

const CATEGORIES = ['All', 'Valentine', 'Birthday', 'Wedding', 'Anniversary', 'Sympathy', 'Get Well', 'Congratulations', 'Chocolate'];

// Backend product → UI shape
const mapProduct = (p) => {
  const stock = Number(p.productsquantity) || 0;
  let status;
  if (p.stockStatus === 'Out Of Stock' || stock === 0) {
    status = 'Out of Stock';
  } else if (stock <= 5) {
    status = 'Low Stock';
  } else {
    status = 'Active';
  }

  return {
    id:       p._id,
    name:     p.productName,
    image:    p.productImages?.[0] || p.images?.[0] || '',
    price:    Number(p.discountPrice) || 0,
    stock,
    category: p.category,
    status,
    raw:      p, // keep original for edit/delete modals
  };
};

const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');

const statusClass = (s) => {
  const k = s.toLowerCase();
  if (k.includes('out'))  return 'apx-status-out';
  if (k.includes('low'))  return 'apx-status-low';
  return 'apx-status-active';
};

export default function AllProducts() {
  const navigate                       = useNavigate();
  const [collapsed, setCollapsed]      = useState(false);
  const [products, setProducts]        = useState([]);
  const [loading, setLoading]          = useState(true);
  const [activeCategory, setCategory]  = useState('All');
  const [search, setSearch]            = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editTarget, setEditTarget]    = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const dropdownRef                    = useRef(null);

  /* Fetch products on mount */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getAllProductsApi();
        if (cancelled) return;
        const list = (data?.products || []).map(mapProduct);
        setProducts(list);
      } catch (error) {
        if (cancelled) return;
        // 404 = no products yet — show empty state, not error
        if (error?.response?.status !== 404) {
          const msg = error?.response?.data?.message || 'Failed to load products';
          toast.error(msg);
        }
        setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = (p.name || '').toLowerCase().includes(search.trim().toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, search]);

  const handleEdit = (product) => {
    setEditTarget(product);
  };

  const handleDelete = (product) => {
    setDeleteTarget(product);
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const selectCategory = (c) => {
    setCategory(c);
    setDropdownOpen(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">All Products</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Cream content area */}
        <div className="admin-content apx-content">

          {/* Toolbar: Search + Category dropdown + Add Product */}
          <div className="apx-toolbar">

            {/* Search */}
            <div className="apx-search">
              <span className="apx-search-icon">
                <Search size={16} strokeWidth={2} />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="apx-search-input"
              />
            </div>

            {/* Right side controls */}
            <div className="apx-toolbar-right">

              {/* Category dropdown */}
              <div
                className={`apx-dropdown ${dropdownOpen ? 'apx-dropdown-open' : ''}`}
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="apx-dropdown-trigger"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="apx-dropdown-label">
                    Category: <strong>{activeCategory}</strong>
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="apx-dropdown-chevron"
                  />
                </button>

                {dropdownOpen && (
                  <ul className="apx-dropdown-menu" role="listbox">
                    {CATEGORIES.map((c) => (
                      <li
                        key={c}
                        role="option"
                        aria-selected={activeCategory === c}
                        className={`apx-dropdown-item ${activeCategory === c ? 'apx-dropdown-item-active' : ''}`}
                        onClick={() => selectCategory(c)}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Add Product button */}
              <button
                type="button"
                className="apx-add-btn"
                onClick={handleAddProduct}
              >
                <Plus size={16} strokeWidth={2.4} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="apx-table-card">
            <table className="apx-table">
              <thead>
                <tr>
                  <th className="apx-th-name">Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th className="apx-th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="apx-empty">Loading products…</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="apx-empty">
                      {products.length === 0
                        ? 'No products yet. Click "Add Product" to create one.'
                        : 'No products match your filters.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="apx-product-cell">
                          <div className="apx-product-image">
                            {p.image ? <img src={p.image} alt={p.name} /> : null}
                          </div>
                          <span className="apx-product-name">{p.name}</span>
                        </div>
                      </td>
                      <td className="apx-price">{formatPrice(p.price)}</td>
                      <td className="apx-stock">{p.stock}</td>
                      <td>
                        <span className="apx-category-pill">{p.category}</span>
                      </td>
                      <td>
                        <span className={`apx-status ${statusClass(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div className="apx-actions">
                          <button
                            type="button"
                            className="apx-btn-edit"
                            onClick={() => handleEdit(p)}
                            aria-label="Edit product"
                          >
                            <Pencil size={14} strokeWidth={2} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="apx-btn-delete"
                            onClick={() => handleDelete(p)}
                            aria-label="Delete product"
                          >
                            <Trash2 size={14} strokeWidth={2} />
                            <span>Del</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* Modals */}
      {editTarget && (
        <EditProductModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteProductModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
