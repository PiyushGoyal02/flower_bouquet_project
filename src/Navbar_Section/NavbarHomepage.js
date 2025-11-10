import "../CSS_CODE/Navbar_HomepageCSS.css";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import BouquetLogo from "../Assests/bouquetD_AMOUR_LOGO.png";

function NavbarHomepage() {
  return (
    <nav className="navbar-homepage-container">
      {/* Left Side */}
      <div className="navbar-homepage-leftside">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
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
        <IoPersonOutline className="icon-tag" />
        <MdOutlineShoppingCart className="icon-tag" />
        <IoMdSearch className="icon-tag" />
      </div>
    </nav>
  );
}

export default NavbarHomepage;
