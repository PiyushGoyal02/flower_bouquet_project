import { Flower, Flower2, Sun, Sparkles, Leaf, Gift, Heart } from "lucide-react";
import { ExpandingCards } from "./expanding-cards";

const flowerCards = [
  {
    id: "red-roses",
    title: "Red Roses",
    description:
      "The timeless symbol of love and passion. Handpicked and arranged fresh daily for the most romantic occasions.",
    imgSrc: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&fit=crop",
    icon: <Flower2 size={26} />,
  },
  {
    id: "pink-tulips",
    title: "Pink Tulips",
    description:
      "Delicate and charming, our pink tulips bring a fresh spring feeling — perfect for birthdays and sweet surprises.",
    imgSrc: "https://images.unsplash.com/photo-1548460606-cb2dd5ac78c4?w=800&fit=crop",
    icon: <Flower size={26} />,
  },
  {
    id: "sunflowers",
    title: "Sunflowers",
    description:
      "Bright and cheerful sunflowers that radiate warmth and happiness. Perfect for spreading joy every day.",
    imgSrc: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&fit=crop",
    icon: <Sun size={26} />,
  },
  {
    id: "white-lilies",
    title: "White Lilies",
    description:
      "Pure and elegant white lilies symbolising beauty and refined taste — ideal for weddings and memorials.",
    imgSrc: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&fit=crop",
    icon: <Sparkles size={26} />,
  },
  {
    id: "orchids",
    title: "Orchids",
    description:
      "Exotic and sophisticated orchids for those who appreciate rare beauty. A luxury gift that lasts for weeks.",
    imgSrc: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&fit=crop",
    icon: <Leaf size={26} />,
  },
  {
    id: "mixed-bouquet",
    title: "Mixed Bouquet",
    description:
      "A vibrant celebration of colours — our signature mixed bouquets are handcrafted for every special moment.",
    imgSrc: "https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=800&fit=crop",
    icon: <Gift size={26} />,
  },
  {
    id: "garden-roses",
    title: "Garden Roses",
    description:
      "Lush, fragrant garden roses bursting with petals. A romantic choice for anniversaries and heartfelt gifts.",
    imgSrc: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&fit=crop",
    icon: <Heart size={26} />,
  },
];

export default function ExpandCards() {
  return (
    <div style={{
      width: "100%",
      background: "var(--sec-categories)",
      padding: "60px 24px 64px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px",
    }}>
      {/* Section heading */}
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <h2 style={{
          margin: 0,
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 700,
          color: "var(--text-on-dark)",
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.01em",
        }}>
          Our Flower Collection
        </h2>
        <p style={{
          marginTop: "12px",
          marginBottom: 0,
          fontSize: "0.95rem",
          color: "var(--text-on-dark-muted)",
          fontFamily: "var(--font-body)",
          lineHeight: 1.65,
        }}>
          Hover or tap a card to explore each bloom — every bouquet crafted
          with intention, emotion, and freshness.
        </p>
      </div>

      {/* Expanding cards grid */}
      <ExpandingCards items={flowerCards} defaultActiveIndex={0} />
    </div>
  );
}
