import "../CSS_CODE/FooterCSS.css"

function Footer(){
    return (
        <div>
            {/* Footer Section */}
                <footer className="footer-container">

                    {/* Left Section */}
                    <div className="footer-about">
                        <h3>Bouquet D'Amour</h3>
                        <p>
                            Fresh, handcrafted bouquets made with love.  
                            We deliver happiness wrapped in flowers —  
                            perfect for every occasion.
                        </p>
                    </div>

                    {/* Middle Links */}
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Profile</li>
                            <li>Products</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>Contact</h4>
                        <p>📍 Fatehabad, Haryana, India</p>
                        <p>📞 +91 96857 21458</p>
                        <p>✉️ siddhibouquet3542@gmail.com</p>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-newsletter">
                        <h4>Newsletter</h4>
                        <input type="email" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>

                </footer>

                <div className="footer-bottom">
                    <p>© 2025 Bouquet D'Amour — All Rights Reserved.</p>
                </div>
        </div>
    )
}

export default Footer;