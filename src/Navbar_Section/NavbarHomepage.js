import "../CSS_CODE/Navbar_HomepageCSS.css";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import BouquetLogo from "../Assests/bouquetD_AMOUR_LOGO.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarHomepage({ likeHeartIcon }) {

  // const [isPersonalDetailVisible, setIsPersonalDetailVisible] = useState(false);

  // const handlePersonalDetailClick = () => {
  //   setIsPersonalDetailVisible(!isPersonalDetailVisible);
  // };

  const navigator = useNavigate();

  // ✅ Count wishlist items
  const wishlistCount = Object.values(likeHeartIcon || {}).filter(Boolean).length;

  return (
    <nav className="navbar-homepage-container">

      {/* Left Side */}
      <div className="navbar-homepage-leftside">
        <a href="/homepage">Home</a>
        <a href="/aboutsection">About</a>
        <a href="/contact">Contact</a>
        <a href="/products">Products</a>
      </div>

      {/* Center Logo */}
      <div className="navbar-homepage-logo-container">
        <img
          src={BouquetLogo}
          alt="Bouquet D'Amour Logo"
          className="navbar-homepage-logo"
        />
      </div>

      {/* Right Side Icons */}
      <div className="navbar-homepage-rightside">

        <IoPersonOutline
          // onMouseDown={handlePersonalDetailClick}
          className="icon-tag"
        />

        <MdOutlineShoppingCart className="icon-tag" />

        <IoMdSearch className="icon-tag" />

        <div className="wishlist-count">
          <IoMdHeartEmpty onClick={() => navigator('/productlikesection')} className="icon-tag" />
          <span className="icon-tag-heart">{wishlistCount}</span>
        </div>

      </div>

    </nav>
  );
}

export default NavbarHomepage;