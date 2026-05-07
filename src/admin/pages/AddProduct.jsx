import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, ChevronDown, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminDashboard.css';
import '../styles/AddProduct.css';
import { addProductApi } from "../../api/adminAPIs";

const CATEGORIES   = ['Valentine', 'Birthday', 'Wedding', 'Anniversary', 'Sympathy', 'Get Well', 'Congratulations', 'Chocolate'];
const STOCK_STATUS = ['In Stock', 'Out Of Stock'];

const MAX_IMAGES   = 5;
const MAX_SIZE_MB  = 5;
const ACCEPTED     = ['image/png', 'image/jpeg', 'image/jpg'];

const EMPTY_FORM = {
  productName:        '',
  descriptionText:    '',
  category:           'Valentine',
  originalPrice:      '',
  discountPrice:      '',
  discountPercentage: '',
  productsquantity:   '',
  deliveryTime:       '4-5 Working Days',
  stockStatus:        'In Stock',
  productHighlights:  [],
};

const MAX_HIGHLIGHTS = 10;

export default function AddProduct() {
  const navigate                         = useNavigate();
  const [collapsed, setCollapsed]        = useState(false);
  const [form, setForm]                  = useState(EMPTY_FORM);
  const [images, setImages]              = useState([]); // [{file, preview}]
  const [dragOver, setDragOver]          = useState(false);
  const [submitting, setSubmitting]      = useState(false);
  const [highlightDraft, setHighlightDraft] = useState('');
  const fileInputRef                     = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ── Highlights (chip input) ─────────────────────── */
  const addHighlight = () => {
    const value = highlightDraft.trim();
    if (!value) return;
    if (form.productHighlights.length >= MAX_HIGHLIGHTS) {
      toast.error(`Max ${MAX_HIGHLIGHTS} highlights allowed`);
      return;
    }
    if (form.productHighlights.includes(value)) {
      toast.error('Highlight already added');
      return;
    }
    setForm((p) => ({ ...p, productHighlights: [...p.productHighlights, value] }));
    setHighlightDraft('');
  };

  const removeHighlight = (idx) => {
    setForm((p) => ({
      ...p,
      productHighlights: p.productHighlights.filter((_, i) => i !== idx),
    }));
  };

  const handleHighlightKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHighlight();
    }
  };

  /* ── Image handling ──────────────────────────────── */
  const validateAndAdd = (files) => {
    const list = Array.from(files);
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const next = [];
    for (const file of list.slice(0, remaining)) {
      if (!ACCEPTED.includes(file.type)) {
        toast.error(`${file.name} — only PNG/JPG allowed`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} — exceeds ${MAX_SIZE_MB}MB`);
        continue;
      }
      next.push({ file, preview: URL.createObjectURL(file) });
    }

    if (next.length) setImages((prev) => [...prev, ...next]);
  };

  const handleFilePick = (e) => {
    if (e.target.files?.length) validateAndAdd(e.target.files);
    e.target.value = ''; // allow re-pick of same file
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) validateAndAdd(e.dataTransfer.files);
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ['productName', 'descriptionText', 'category',
                      'originalPrice', 'discountPrice', 'productsquantity',
                      'deliveryTime', 'stockStatus'];
    const missing  = required.filter((k) => !String(form[k]).trim());
    if (missing.length) {
      toast.error(`Please fill: ${missing.join(', ')}`);
      return;
    }
    if (images.length === 0) {
      toast.error('Please upload at least 1 product image');
      return;
    }

    setSubmitting(true);

    // Build FormData — backend uses multer.array("productImages", 5)
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'productHighlights') {
        fd.append('productHighlights', JSON.stringify(v));
      } else {
        fd.append(k, v);
      }
    });
    images.forEach(({ file }) => fd.append('productImages', file));

    try {
      const { data } = await addProductApi(fd);
      toast.success(data?.message || 'Product added successfully');
      images.forEach(({ preview }) => URL.revokeObjectURL(preview));
      setForm(EMPTY_FORM);
      setImages([]);
      navigate('/admin/products');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to add product';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => navigate('/admin/products');

  return (
    <div className="admin-layout">
      <AdminSidebar onCollapse={setCollapsed} />

      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar-title">Add Product</span>
          <div className="admin-topbar-right">
            <div className="admin-topbar-avatar">A</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content apform-content">

          <h1 className="apform-page-title">Add New Product</h1>

          <form onSubmit={handleSubmit} noValidate>

            {/* ── Card: Basic details ─────────────────── */}
            <section className="apform-card">
              <header className="apform-card-header">
                <h2 className="apform-card-title">Basic details</h2>
              </header>

              <div className="apform-grid">

                {/* Product name (full row) */}
                <div className="apform-field apform-col-2">
                  <label className="apform-label" htmlFor="productName">Product name</label>
                  <input
                    id="productName"
                    name="productName"
                    type="text"
                    className="apform-input"
                    placeholder="e.g. Red Rose Bliss"
                    value={form.productName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price | MRP */}
                <div className="apform-field">
                  <label className="apform-label" htmlFor="discountPrice">Price (₹)</label>
                  <input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    min="0"
                    className="apform-input"
                    placeholder="849"
                    value={form.discountPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="apform-field">
                  <label className="apform-label" htmlFor="originalPrice">MRP (₹)</label>
                  <input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0"
                    className="apform-input"
                    placeholder="1099"
                    value={form.originalPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Stock qty | Category */}
                <div className="apform-field">
                  <label className="apform-label" htmlFor="productsquantity">Stock qty</label>
                  <input
                    id="productsquantity"
                    name="productsquantity"
                    type="number"
                    min="0"
                    className="apform-input"
                    placeholder="25"
                    value={form.productsquantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="apform-field">
                  <label className="apform-label" htmlFor="category">Category</label>
                  <div className="apform-select-wrap">
                    <select
                      id="category"
                      name="category"
                      className="apform-input apform-select"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="apform-select-chevron"
                    />
                  </div>
                </div>

                {/* Description (full row) */}
                <div className="apform-field apform-col-2">
                  <label className="apform-label" htmlFor="descriptionText">Description</label>
                  <textarea
                    id="descriptionText"
                    name="descriptionText"
                    className="apform-input apform-textarea"
                    placeholder="Describe this bouquet…"
                    value={form.descriptionText}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Drag & drop image upload (full row) */}
                <div className="apform-field apform-col-2">
                  <div
                    className={`apform-dropzone ${dragOver ? 'apform-dropzone-active' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    <UploadCloud size={28} strokeWidth={1.6} className="apform-dropzone-icon" />
                    <p className="apform-dropzone-title">Drag &amp; drop product images</p>
                    <p className="apform-dropzone-sub">
                      PNG, JPG up to {MAX_SIZE_MB}MB each — max {MAX_IMAGES} images
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      multiple
                      onChange={handleFilePick}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Previews */}
                  {images.length > 0 && (
                    <div className="apform-previews">
                      {images.map(({ preview, file }, idx) => (
                        <div key={preview} className="apform-preview">
                          <img src={preview} alt={file.name} />
                          <button
                            type="button"
                            className="apform-preview-remove"
                            onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                            aria-label="Remove image"
                          >
                            <X size={12} strokeWidth={2.4} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* ── Card: Additional details ────────────── */}
            <section className="apform-card">
              <header className="apform-card-header">
                <h2 className="apform-card-title">Additional details</h2>
              </header>

              <div className="apform-grid">

                <div className="apform-field">
                  <label className="apform-label" htmlFor="deliveryTime">Delivery time</label>
                  <input
                    id="deliveryTime"
                    name="deliveryTime"
                    type="text"
                    className="apform-input"
                    placeholder="4-5 Working Days"
                    value={form.deliveryTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="apform-field">
                  <label className="apform-label" htmlFor="stockStatus">Stock status</label>
                  <div className="apform-select-wrap">
                    <select
                      id="stockStatus"
                      name="stockStatus"
                      className="apform-input apform-select"
                      value={form.stockStatus}
                      onChange={handleChange}
                      required
                    >
                      {STOCK_STATUS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="apform-select-chevron"
                    />
                  </div>
                </div>

                <div className="apform-field">
                  <label className="apform-label" htmlFor="discountPercentage">Discount %</label>
                  <input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    className="apform-input"
                    placeholder="20"
                    value={form.discountPercentage}
                    onChange={handleChange}
                  />
                </div>

                <div className="apform-field apform-col-2">
                  <label className="apform-label" htmlFor="productHighlightInput">
                    Product highlights
                    <span className="apform-label-hint">
                      press Enter or click + to add ({form.productHighlights.length}/{MAX_HIGHLIGHTS})
                    </span>
                  </label>

                  <div className="apform-chip-input-row">
                    <input
                      id="productHighlightInput"
                      type="text"
                      className="apform-input"
                      placeholder="e.g. Fresh, handpicked roses 🌸"
                      value={highlightDraft}
                      onChange={(e) => setHighlightDraft(e.target.value)}
                      onKeyDown={handleHighlightKeyDown}
                    />
                    <button
                      type="button"
                      className="apform-chip-add-btn"
                      onClick={addHighlight}
                      aria-label="Add highlight"
                    >
                      <Plus size={16} strokeWidth={2.4} />
                    </button>
                  </div>

                  {form.productHighlights.length > 0 && (
                    <ul className="apform-chip-list">
                      {form.productHighlights.map((h, idx) => (
                        <li key={`${h}-${idx}`} className="apform-chip">
                          <span className="apform-chip-text">{h}</span>
                          <button
                            type="button"
                            className="apform-chip-remove"
                            onClick={() => removeHighlight(idx)}
                            aria-label={`Remove ${h}`}
                          >
                            <X size={12} strokeWidth={2.4} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </section>

            {/* Action buttons */}
            <div className="apform-actions">
              <button
                type="button"
                className="apform-btn apform-btn-cancel"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apform-btn apform-btn-save"
                disabled={submitting}
              >
                {submitting ? 'Saving…' : 'Save Product'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
