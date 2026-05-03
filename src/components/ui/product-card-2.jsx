import * as React from "react";
import { motion } from "framer-motion";

/* ─── Price formatter (INR) ──────────────────────── */
const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 })
    .format(amount);

/* ─── Single product card ────────────────────────── */
const ProductCard = React.forwardRef(function ProductCard(
  { imageUrl, name, tagline, price, isCouponPrice = false, originalPrice, offerText, style, ...props },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        borderRadius: "16px",
        border: "1px solid #f0e0e6",
        background: "#fff",
        padding: "24px 20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(192,57,90,0.07)",
        width: "100%",
        height: "100%",
        fontFamily: "'Poppins', sans-serif",
        cursor: "pointer",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {/* Image */}
      <div style={{ position: "relative", marginBottom: "16px", display: "flex", height: "170px", width: "100%", alignItems: "center", justifyContent: "center" }}>
        <motion.img
          src={imageUrl}
          alt={name}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
          style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "10px" }}
        />
      </div>

      {/* Name + tagline */}
      <div style={{ display: "flex", flexGrow: 1, flexDirection: "column", alignItems: "center", gap: "6px", width: "100%" }}>
        <h3 style={{ margin: 0, fontSize: "0.97rem", fontWeight: 600, color: "#1a0a0a", lineHeight: 1.4 }}>{name}</h3>
        <p  style={{ margin: 0, fontSize: "0.8rem", color: "#9a6a55", lineHeight: 1.5 }}>{tagline}</p>
      </div>

      {/* Pricing */}
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1a0a0a" }}>{formatPrice(price)}</span>
          {isCouponPrice && (
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#c0395a" }}>Coupon Price</span>
          )}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          borderRadius: "9999px", background: "#fff5f7",
          padding: "4px 14px", fontSize: "0.75rem",
        }}>
          {originalPrice && (
            <span style={{ color: "#b0a0a5", textDecoration: "line-through" }}>{formatPrice(originalPrice)}</span>
          )}
          <span style={{ fontWeight: 700, color: "#c07830" }}>{offerText}</span>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

/* ─── Product data ───────────────────────────────── */
const products = [
  {
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=500&fit=crop&q=80",
    name: "Classic Red Roses",
    tagline: "12 handpicked long-stem roses",
    price: 1499,
    originalPrice: 2499,
    offerText: "40% Off",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1548460606-cb2dd5ac78c4?w=500&h=500&fit=crop&q=80",
    name: "Pink Tulip Bouquet",
    tagline: "Fresh spring tulips, same-day delivery",
    price: 999,
    originalPrice: 1799,
    isCouponPrice: true,
    offerText: "Use Code BLOOM50",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&h=500&fit=crop&q=80",
    name: "Sunny Sunflowers",
    tagline: "Bright & cheerful — perfect gift",
    price: 1299,
    originalPrice: 1999,
    offerText: "35% Off",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=500&h=500&fit=crop&q=80",
    name: "Mixed Luxury Bouquet",
    tagline: "Premium seasonal blooms, gift-wrapped",
    price: 1899,
    originalPrice: 2999,
    offerText: "Save ₹1,100",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop&q=80",
    name: "Exotic Orchid Arrangement",
    tagline: "Rare orchids that last for weeks",
    price: 2299,
    originalPrice: 3499,
    offerText: "34% Off",
  },
];

/* ─── Animation variants ─────────────────────────── */
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

/* ─── Main export ────────────────────────────────── */
export default function ProductGrid() {
  return (
    <div style={{ width: "100%", background: "#fff", padding: "64px 24px 72px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#c0395a" }}>
            Shop Our Collection
          </h2>
          <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#9a6a55", maxWidth: "440px", margin: "10px auto 0", lineHeight: 1.65 }}>
            Fresh blooms, handcrafted bouquets, and exclusive deals — delivered to your door.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((product, i) => (
            <motion.div key={i} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export { ProductCard };
