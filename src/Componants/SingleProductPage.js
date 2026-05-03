import { useState } from "react";
import "../CSS_CODE/SingleProductPage.CSS.css";
import { Navbar } from "../components/ui/mini-navbar";
import Footer from "../Componants/Footer";
import { BiBookmarkHeart } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdWorkspacePremium } from "react-icons/md";
import { TbLock } from "react-icons/tb";

import PopularBouquetsHomepageFirst from "../Assests/PopularBouquetsHomepageFirst.jpeg";

function SingleProductPage() {
  const product = {
    images: [
      PopularBouquetsHomepageFirst,
      PopularBouquetsHomepageFirst,
      PopularBouquetsHomepageFirst,
      PopularBouquetsHomepageFirst,
    ],
    title: "Artificial Crochet Flower Bouquet",
    rating: 4,
    reviews: 1199,
    price: 350,
    mrp: 999,
    stock: true,
    description:
      "Beautiful handmade artificial crochet flowers bouquet. Perfect for gifting, home decor, birthdays and special occasions.",
    highlights: [
      "Handmade Crochet Flowers",
      "Perfect for Birthday & Anniversary",
      "Premium Gift Wrapping",
      "Long Lasting Artificial Flowers",
    ],
  };

  // const [hoverIcon, setHoverIcon] = useState(false);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="product-page">
      <Navbar />

      <div className="product-container">
        {/* LEFT IMAGE SECTION */}

        <div className="gallery">
          <div className="thumbnails">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className="thumbnail"
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImage} alt="product" />
          </div>
        </div>

        <div className="product-details">
          {/* TITLE */}
          <div className="title-section">
            <h1 className="product-title">{product.title}</h1>

            <div
              className="KissIcon"
            >
              <BiBookmarkHeart />
            </div>
          </div>

          {/* RATING */}
          <div className="rating">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
            <span> ({product.reviews} reviews)</span>
          </div>

          {/* PRICE */}
          <div className="price-section">
            <span className="price">₹{product.price}</span>

            <span className="mrp">₹{product.mrp}</span>

            <span className="discount">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              OFF
            </span>
          </div>

          {/* STOCK */}
          <div className="stock">
            {product.stock ? "In Stock" : "Out of Stock"}
          </div>

          {/* DELIVERY */}
          <div className="delivery-text">
            🌿 Delivery within 4-5 working days
          </div>

          {/* SERVICES */}
          <div className="services-section">
            <div className="service-card">
              <TbTruckDelivery className="service-icon" />
              <p>
                Bouquet D'Amour <br />
                Delivered
              </p>
            </div>

            <div className="service-card">
              <MdWorkspacePremium className="service-icon" />
              <p>Top Brand</p>
            </div>

            <div className="service-card">
              <TbLock className="service-icon" />
              <p>
                Secure <br />
                Transaction
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="description">{product.description}</p>

          {/* PRODUCT HIGHLIGHTS */}
          <div className="highlights">
            <h3>Product Highlights</h3>

            <ul>
              {product.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* MESSAGE CARD BUTTON */}
          <div className="message-toggle">
            <button
              onClick={() => setShowMessage(!showMessage)}
              className="message-btn"
            >
              💌 Add Message Card
            </button>
          </div>

          {/* TEXTAREA SHOW ON CLICK */}
          {showMessage && (
            <div className="message-box">
              <textarea
                placeholder="Write your message for the bouquet..."
                maxLength="200"
              />

              <button className="message-btn textareaSubmitButton">
                Submit
              </button>
            </div>
          )}

          {/* QUANTITY */}
          <div className="quantity">
            <button onClick={decreaseQty}>-</button>

            <span>{quantity}</span>

            <button onClick={increaseQty}>+</button>
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button className="cart-btn">Add To Cart</button>

            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SingleProductPage;
