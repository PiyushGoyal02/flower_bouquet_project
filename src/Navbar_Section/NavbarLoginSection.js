import "../CSS_CODE/NavbarloginSectionCSS.css";
import BouquetLogo from "../Assests/bouquetD_AMOUR_LOGO.png";

function NavbarloginSection() {

  return (
    <nav className="navbar-homepage-container">

      {/* Left Logo */}
      <div className="navbar-homepage-logo-container">
        <img
          src={BouquetLogo}
          alt="Bouquet D'Amour Logo"
          className="navbar-homepage-logo"
        />
      </div>

      {/* Right Side */}
      <div className="navbar-homepage-rightside">
        <a href="/aboutsection">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}

export default NavbarloginSection;