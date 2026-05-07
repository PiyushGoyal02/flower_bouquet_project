import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteProductApi } from '../../api/adminAPIs';

export default function DeleteProductModal({ product, onClose, onConfirm }) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await deleteProductApi(product.id);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
    setSubmitting(false);
    onConfirm?.(product.id);
    onClose();
  };

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div
        className="pmodal pmodal-delete"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="del-title"
      >
        <header className="pmodal-header">
          <h2 id="del-title" className="pmodal-title">Delete Product</h2>
          <button
            type="button"
            className="pmodal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="pmodal-body pmodal-delete-body">

          {/* Warning icon + heading */}
          <div className="pmodal-warn-icon">
            <AlertTriangle size={26} strokeWidth={2} />
          </div>

          <h3 className="pmodal-warn-heading">Are you sure?</h3>
          <p className="pmodal-warn-para">
            This action cannot be undone. The product will be permanently removed from your store.
          </p>

          {/* Product preview card */}
          <div className="pmodal-product-card">
            <div className="pmodal-product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="pmodal-product-info">
              <p className="pmodal-product-name">{product.name}</p>
              <div className="pmodal-product-meta">
                <span className="pmodal-product-price">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span className="pmodal-product-dot">•</span>
                <span className="pmodal-product-cat">{product.category}</span>
                <span className="pmodal-product-dot">•</span>
                <span className="pmodal-product-stock">Stock: {product.stock}</span>
              </div>
            </div>
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
            type="button"
            className="pmodal-btn pmodal-btn-danger"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </footer>
      </div>
    </div>
  );
}
