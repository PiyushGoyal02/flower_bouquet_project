import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateProductApi } from "../../api/adminAPIs"

const CATEGORIES   = ['Valentine', 'Birthday', 'Wedding', 'Anniversary'];
const STOCK_STATUS = ['In Stock', 'Out Of Stock'];

export default function EditProductModal({ product, onClose, onSave }) {
  const [form, setForm]           = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        productName:        product.name           ?? '',
        discountPrice:      product.price          ?? '',
        originalPrice:      product.originalPrice  ?? product.price ?? '',
        productsquantity:   product.stock          ?? '',
        category:           product.category       ?? 'Valentine',
        descriptionText:    product.description    ?? '',
        stockStatus:        product.stock > 0 ? 'In Stock' : 'Out Of Stock',
        discountPercentage: product.discountPercentage ?? '',
      });
    }
  }, [product]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product || !form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const { data } = await updateProductApi(product.id, form);
      toast.success(data?.message || 'Product updated successfully');
      onSave?.(product.id, data?.updatedproduct || form);
      onClose();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update product';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div
        className="pmodal pmodal-edit"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
      >
        <header className="pmodal-header">
          <h2 id="edit-title" className="pmodal-title">Edit Product</h2>
          <button
            type="button"
            className="pmodal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="pmodal-body">

          {/* Header: image + name preview */}
          <div className="pmodal-edit-preview">
            <div className="pmodal-edit-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div>
              <p className="pmodal-edit-eyebrow">Editing</p>
              <p className="pmodal-edit-name">{product.name}</p>
            </div>
          </div>

          <div className="pmodal-grid">

            <div className="pmodal-field pmodal-col-2">
              <label className="pmodal-label" htmlFor="ep-productName">Product name</label>
              <input
                id="ep-productName"
                name="productName"
                type="text"
                className="pmodal-input"
                value={form.productName}
                onChange={handleChange}
              />
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-discountPrice">Price (₹)</label>
              <input
                id="ep-discountPrice"
                name="discountPrice"
                type="number"
                min="0"
                className="pmodal-input"
                value={form.discountPrice}
                onChange={handleChange}
              />
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-originalPrice">MRP (₹)</label>
              <input
                id="ep-originalPrice"
                name="originalPrice"
                type="number"
                min="0"
                className="pmodal-input"
                value={form.originalPrice}
                onChange={handleChange}
              />
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-productsquantity">Stock qty</label>
              <input
                id="ep-productsquantity"
                name="productsquantity"
                type="number"
                min="0"
                className="pmodal-input"
                value={form.productsquantity}
                onChange={handleChange}
              />
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-category">Category</label>
              <div className="pmodal-select-wrap">
                <select
                  id="ep-category"
                  name="category"
                  className="pmodal-input pmodal-select"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} strokeWidth={2} className="pmodal-select-chevron" />
              </div>
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-stockStatus">Stock status</label>
              <div className="pmodal-select-wrap">
                <select
                  id="ep-stockStatus"
                  name="stockStatus"
                  className="pmodal-input pmodal-select"
                  value={form.stockStatus}
                  onChange={handleChange}
                >
                  {STOCK_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={16} strokeWidth={2} className="pmodal-select-chevron" />
              </div>
            </div>

            <div className="pmodal-field">
              <label className="pmodal-label" htmlFor="ep-discountPercentage">Discount %</label>
              <input
                id="ep-discountPercentage"
                name="discountPercentage"
                type="number"
                min="0"
                max="100"
                className="pmodal-input"
                value={form.discountPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="pmodal-field pmodal-col-2">
              <label className="pmodal-label" htmlFor="ep-descriptionText">Description</label>
              <textarea
                id="ep-descriptionText"
                name="descriptionText"
                className="pmodal-input pmodal-textarea"
                value={form.descriptionText}
                onChange={handleChange}
              />
            </div>

          </div>

          <footer className="pmodal-footer">
            <button
              type="button"
              className="pmodal-btn pmodal-btn-ghost"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pmodal-btn pmodal-btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>
          </footer>

        </form>
      </div>
    </div>
  );
}
