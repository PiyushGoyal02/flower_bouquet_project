import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import { getAllCategoriesApi, getAllProductsApi } from '../../api/adminAPIs';
import '../styles/AdminDashboard.css';
import '../styles/Categories.css';

// Per-category visual metadata (icon + gradient)
const CATEGORY_META = {
  Valentine:        { icon: '💝', gradient: 'linear-gradient(90deg, #FBDEE8 0%, #E89BB0 100%)' },
  Birthday:         { icon: '🎂', gradient: 'linear-gradient(90deg, #FBF3DC 0%, #E8C76A 100%)' },
  Wedding:          { icon: '💍', gradient: 'linear-gradient(90deg, #EFF8F3 0%, #A8D5BA 100%)' },
  Anniversary:      { icon: '🥂', gradient: 'linear-gradient(90deg, #FFE8D6 0%, #E8B07A 100%)' },
  Sympathy:         { icon: '🌸', gradient: 'linear-gradient(90deg, #EDE2F5 0%, #B89BCC 100%)' },
  'Get Well':       { icon: '🌻', gradient: 'linear-gradient(90deg, #FFF5DC 0%, #F5C77A 100%)' },
  Congratulations:  { icon: '🎉', gradient: 'linear-gradient(90deg, #FFE0E9 0%, #FF93B5 100%)' },
  Chocolate:        { icon: '🍫', gradient: 'linear-gradient(90deg, #F0DDC9 0%, #B8865B 100%)' },
};

const DEFAULT_META = {
  icon:     '🌷',
  gradient: 'linear-gradient(90deg, #FBDEE8 0%, #E89BB0 100%)',
};

export default function Categories() {
  const [collapsed, setCollapsed]   = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Fetch categories + products in parallel; products are used to count items per category
        const [catsRes, prodsRes] = await Promise.all([
          getAllCategoriesApi(),
          // tolerate 404 (no products yet) — return empty array
          getAllProductsApi().catch(() => ({ data: { products: [] } })),
        ]);
        if (cancelled) return;

        const names    = catsRes?.data?.categories || [];
        const products = prodsRes?.data?.products  || [];

        // Count products per category
        const counts = products.reduce((acc, p) => {
          if (p?.category) acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {});

        const list = names.map((name, idx) => ({
          id:       idx + 1,
          name,
          products: counts[name] || 0,
          ...(CATEGORY_META[name] || DEFAULT_META),
        }));

        setCategories(list);
      } catch (error) {
        if (cancelled) return;
        if (error?.response?.status !== 404) {
          const msg = error?.response?.data?.message || 'Failed to load categories';
          toast.error(msg);
        }
        setCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // const handleAdd = () => {
  //   // TODO: wire up add-category modal once backend endpoint exists
  //   console.log('Add new category');
  // };

  // const handleEdit = (id) => {
  //   // TODO: wire up edit-category modal once backend endpoint exists
  //   console.log('Edit category:', id);
  // };

  // const handleDelete = (id) => {
  //   // TODO: wire up delete-category API once backend endpoint exists
  //   if (window.confirm('Delete this category?')) {
  //     console.log('Delete category:', id);
  //   }
  // };

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">Categories</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content cat-content">

          {/* Header */}
          <div className="cat-header">
            <h1 className="cat-page-title">Categories</h1>
            <button type="button" className="cat-add-btn">
              <Plus size={16} strokeWidth={2.4} />
              <span>Add Category</span>
            </button>
          </div>

          {/* States */}
          {loading ? (
            <p className="cat-loading">Loading categories…</p>
          ) : categories.length === 0 ? (
            <p className="cat-loading">
              No categories yet. Add a product to create your first category.
            </p>
          ) : (
            <div className="cat-grid">
              {categories.map(({ id, name, products, icon, gradient }) => (
                <div key={id} className="cat-card">
                  <div className="cat-banner" style={{ background: gradient }}>
                    <span className="cat-emoji" role="img" aria-label={name}>
                      {icon}
                    </span>
                  </div>

                  <div className="cat-meta">
                    <h3 className="cat-name">{name}</h3>
                    <p className="cat-count">{products} {products === 1 ? 'product' : 'products'}</p>
                  </div>

                  <div className="cat-actions">
                    <button
                      type="button"
                      className="cat-btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="cat-btn-delete"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
