import "../CSS_CODE/ContactSectionCSS.css";
import NavbarHomepage from "../Navbar_Section/NavbarHomepage";
import BouquetDAmour from "../Assests/BOUQUET'DAMOUR_ContactSectionImage.png";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
// import Footer from "../Componants/Footer"

function ContactSection() {
  const LftSideDetails = [
    {
      title: "Email",
      description: "info@flowerbouquet.com",
    },
    {
      title: "Phone",
      description: "+1 (555) 123-4567",
    },
    {
      title: "Location",
      description:
        "123 Flower St, Blossom City 456 Tech District, San Francisco, CA 94107 United States",
    },
  ];

  return (
    <div>
      <NavbarHomepage />

      {/* Background Image */}
      <img
        src={BouquetDAmour}
        className="BouquetDAmour"
        alt="Bouquet D'Amour"
      />

      <div className="contact-container">
        <div className="ContactInfoSection">
          {/* Left Side */}
          <div className="LeftSideContactSection">
            <h1>Get in touch</h1>

            {LftSideDetails.map((detail, index) => (
              <div key={index} className="DetailBlock">
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </div>
            ))}

            <h3>Follow us</h3>
            <div className="LogoContainer">
              <div className="LogoCircle">
                <FaInstagram />
              </div>
              <div className="LogoCircle">
                <FaFacebook />
              </div>
              <div className="LogoCircle">
                <FaWhatsapp />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="RightSideContactSection">
            <div className="InputGroup">
              <label>Your Name</label>
              <input
                className="ContactInput"
                name="name"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="InputGroup">
              <label>Email address</label>
              <input
                className="ContactInput"
                name="email"
                required
                placeholder="Your email address"
              />
            </div>

            <div className="InputGroup">
              <label>Message</label>
              <textarea
                className="ContactInput"
                name="message"
                required
                placeholder="Write something..."
              ></textarea>
            </div>

            <button className="SendMessageButton">
              Send Message
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default ContactSection;