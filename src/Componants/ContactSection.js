import "../CSS_CODE/ContactSectionCSS.css";
import NavbarHomepage from "../Navbar_Section/NavbarHomepage";
import { RiMegaphoneLine } from "react-icons/ri";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import Footer from "../Componants/Footer"
import ConatctInfoImage from "../Assests/ChatGPT Image Mar 7, 2026, 06_08_53 PM (2).png"

function ContactSection() {
  return (
    <div>
      <NavbarHomepage />

     <div className="contact-image-container">
        <img
          src={ConatctInfoImage}
          className="Contact-Info-Image"
          alt="Contact Information"
        />
      </div>

      <div className="Contact-Section-Wrapper">
        <div className="Contact-Container">
          {/* Left Form */}
          <div className="Contact-Form">
            <div className="Contact-Row">
              <input
                type="email"
                placeholder="Email"
                className="Formdata-Details"
              />
              <input
                type="number"
                placeholder="Phone"
                className="Formdata-Details"
              />
            </div>

            <input
              type="text"
              placeholder="Name"
              className="Formdata-Details"
            />

            <textarea placeholder="Message" className="Formdata-Details" />

            <button className="Submit-Button">Submit Button</button>
          </div>

          {/* Right Newsletter */}
          <div className="Newsletter-Card">
            <h2>Our Newsletter</h2>

            <p>
              Stay updated with our latest news and offers. Subscribe to our
              newsletter by entering your email below.
            </p>

            <input
              type="email"
              placeholder="Email"
              className="Email-FormData-Details"
            />

            <button className="Submit-Button">Subscribe</button>
          </div>
        </div>

        {/* Contact Section Details */}
        <div className="contact-info-section">
          <div className="contact-info-container">
            {/* Phone Card */}
            <div className="contact-card primary-card">
              <div className="card-header">
                <RiMegaphoneLine className="icon-box" />
                <h3>+91 98765 43210</h3>
              </div>

              <p>
                Contact us anytime for bouquet orders and special flower
                arrangements for your loved ones.
              </p>
            </div>
            {/* Email Card */}
            <div className="contact-card secondary-card">
              <div className="card-header">
                <HiOutlineMailOpen className="icon-box" />
                <h3>support@bouquetdamour.com</h3>
              </div>

              <p>
                Send us your custom bouquet request and we will respond quickly
                with the best flower options.
              </p>
            </div>

            {/* Address Card */}
            <div className="contact-card light-card">
              <div className="card-header">
                <IoLocationOutline className="icon-box" />
                <h3>Chandigarh, India</h3>
              </div>

              <p>
                Visit our flower studio to explore premium bouquets designed for
                every special occasion.
              </p>
            </div>
          </div>
        </div>

        {/* Google Map Address */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.3680297391043!2d76.76082893799986!3d30.708052521335944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fec4f0682d721%3A0xde63ff21f0727c86!2sSector%2045-B%2C%20Chandigarh%2C%20160047!5e0!3m2!1sen!2sin!4v1772876263380!5m2!1sen!2sin"
            width="1350"
            height="480"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ContactSection;
