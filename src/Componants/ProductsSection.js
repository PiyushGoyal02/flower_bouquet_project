import "../CSS_CODE/ProductsSectionCSS.css";
import { FaStar } from "react-icons/fa";
import Footer from "../Componants/Footer";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState } from "react";
import { Navbar } from "../components/ui/mini-navbar";
import { useNavigate } from "react-router-dom";

import PopularBouquetsHomepageFirst from "../Assests/PopularBouquetsHomepageFirst.jpeg";
import PopularBouquetsHomepageSecond from "../Assests/PopularBouquetsHomepageSecond.jpeg";
import PopularBouquetsHomepageThird from "../Assests/PopularBouquetsHomepageThird.jpeg";
import RedFlowerBouquet from "../Assests/Screenshot from 2025-11-15 16-08-04.png";
import RedRiddhiSiddhiFlower from "../Assests/RedRiddhiSiddhiBouquet.png";
import MeronFlowers from "../Assests/MaronFlower.png";
import WhineAndWhite from "../Assests/WhineAndWhiteFlowers.png";
import MultiFlower from "../Assests/_ (1).jpeg";
import MultiFlowerTwo from "../Assests/_ (3).jpeg";

function ProductsSection() {
  const navigate = useNavigate();

  const AllProductsDetails = [
    {
      id: 1,
      type: "Valentine",
      name: "Rose bouquet",
      price: 999,
      oldPrice: 1599,
      rating: 4.5,
      image: PopularBouquetsHomepageFirst,
    },
    {
      id: 2,
      type: "Birthday",
      name: "White and pink rose bouquet",
      price: 799,
      oldPrice: 1000,
      rating: 4.2,
      image: PopularBouquetsHomepageSecond,
    },
    {
      id: 3,
      type: "New Born Baby",
      name: "Multi colored bouquet",
      price: 999,
      oldPrice: 1299,
      rating: 4.8,
      image: PopularBouquetsHomepageThird,
    },
    {
      id: 4,
      type: "Anniversary",
      name: "Red roses premium bouquet",
      price: 1299,
      oldPrice: 1799,
      rating: 4.7,
      image: RedFlowerBouquet,
    },
    {
      id: 5,
      type: "Congratulations",
      name: "Yellow roses bouquet",
      price: 699,
      oldPrice: 899,
      rating: 4.3,
      image: WhineAndWhite,
    },
    {
      id: 6,
      type: "Get Well Soon",
      name: "Fresh mixed flowers bouquet",
      price: 899,
      oldPrice: 1199,
      rating: 4.1,
      image: RedRiddhiSiddhiFlower,
    },
    {
      id: 7,
      type: "Love",
      name: "Luxury maroon bouquet",
      price: 1199,
      oldPrice: 1599,
      rating: 4.6,
      image: MeronFlowers,
    },
    {
      id: 8,
      type: "Festival",
      name: "Special festive bouquet",
      price: 999,
      oldPrice: 1499,
      rating: 4.4,
      image: MultiFlower,
    },
    {
      id: 9,
      type: "Wedding",
      name: "Royal wedding bouquet",
      price: 1899,
      oldPrice: 2499,
      rating: 4.9,
      image: MultiFlowerTwo,
    },
    {
      id: 6,
      type: "Get Well Soon",
      name: "Fresh mixed flowers bouquet",
      price: 899,
      oldPrice: 1199,
      rating: 4.1,
      image: RedRiddhiSiddhiFlower,
    },
    {
      id: 7,
      type: "Love",
      name: "Luxury maroon bouquet",
      price: 1199,
      oldPrice: 1599,
      rating: 4.6,
      image: MeronFlowers,
    },
    {
      id: 8,
      type: "Festival",
      name: "Special festive bouquet",
      price: 999,
      oldPrice: 1499,
      rating: 4.4,
      image: MultiFlower,
    },
    {
      id: 9,
      type: "Wedding",
      name: "Royal wedding bouquet",
      price: 1899,
      oldPrice: 2499,
      rating: 4.9,
      image: MultiFlowerTwo,
    },
  ];

  const [likeHeartIcon, setLikeHeartIcon] = useState({});

  const handleWishlistClick = (product) => {

    setLikeHeartIcon((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
    // navigate("/productlikesection", { state: product });
  };

  return (
    <div>
      <Navbar />

      <div className="products-container">
        <div className="products-grid">
          {AllProductsDetails.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <div
                  className="product-image-wrapper"
                  // onClick={() => handleProductClick(product)}
                >
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="wishlist-section">
                    {likeHeartIcon[product.id] ? (
                      <IoMdHeart
                        className="wishlist-icon active"
                        onClick={() => handleWishlistClick(product)}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        className="wishlist-icon"
                        onClick={() => handleWishlistClick(product)}
                      />
                    )}
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-top">
                    <p className="product-type">{product.type}</p>

                    <p className="product-rating">
                      <FaStar className="star-icon" />
                      <span className="rating-text">{product.rating}</span>
                    </p>
                  </div>

                  <h3 className="product-name">{product.name}</h3>

                  <div className="price-section">
                    <p className="product-price">₹{product.price}</p>
                    <del className="old-price">₹{product.oldPrice}</del>
                  </div>

                  <button className="AddToCartButtonForProducts">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductsSection;