import "../CSS_CODE/HomepageCSS.css"
import SiddhiPic from "../Assests/SiddhiPic.jpeg"
import LeavesPic from "../Assests/LeavesImage.png"
import { Navbar } from "../components/ui/mini-navbar";
import { InteractiveHeroSection } from "../components/ui/interactive-hero-backgrounds";
import ElegantCarousel from "../components/ui/elegant-carousel";
import ReviewCards from "../components/ui/review-cards";
import ProductGrid from "../components/ui/product-card-2";
import { Marquee } from "../components/ui/marquee";
import ExpandCards from "../components/ui/expand-cards";
import RedFlowerBouquet from "../Assests/Screenshot from 2025-11-15 16-08-04.png"
import RedRiddhiSiddhiFlower from "../Assests/RedRiddhiSiddhiBouquet.png"
import MeronFlowers from "../Assests/MaronFlower.png"
import WhineAndWhite from "../Assests/WhineAndWhiteFlowers.png"
import MultiFlower from "../Assests/_ (1).jpeg"
import MultiFlowerTwo from "../Assests/_ (3).jpeg"
import Footer from "./Footer"
import NewsLetter from "../components/ui/pinky-news-letter";
import BrandStory from "../components/ui/brand-story";
import { useNavigate } from "react-router-dom";

function Homepage(){

    const Navigator = useNavigate();


    const ThreeAndThreeImages = [
        {
            imageSrc: {MultiFlower},
            text: "Roses Bouquet",
            description: "Beautiful handpicked red roses.",
            price: "₹1,500"
        },
        {
            imageSrc: {RedRiddhiSiddhiFlower},
            text: "Red Roses Bouquet",
            description: "Loyal and lovely long-stem red roses.",
            price: "₹1,800"
        },
        {
            imageSrc: {MultiFlowerTwo},
            text: "Multi Colored Bouquet",
            description: "Vibrant mixed blooms for any occasion.",
            price: "₹1,200"
        },
        {
            imageSrc: {MeronFlowers},
            text: "Maroon Flower Bouquet",
            description: "Deep maroon blooms, rich and elegant.",
            price: "₹1,400"
        },
        {
            imageSrc: {RedFlowerBouquet},
            text: "Premium Red Bouquet",
            description: "A premium arrangement of fresh red flowers.",
            price: "₹2,000"
        },
        {
            imageSrc: {WhineAndWhite},
            text: "Wine & White Bouquet",
            description: "A peaceful blend of wine and white roses.",
            price: "₹1,600"
        },
    ]

    return (
        <div className="Homepage-main-div">
            <Navbar />
            
            <InteractiveHeroSection />

            {/* Row 1 — scrolls LEFT, rose-pink theme */}
            <Marquee direction="left" duration={28} pauseOnHover={true} fadeAmount={8}
              style={{ background: "var(--sec-marquee-1)", padding: "14px 0" }}
            >
              {["🌹 Roses", "🌷 Tulips", "🌸 Cherry Blossom", "💐 Handcrafted Bouquets", "🎀 Anniversary Gifts", "🌺 Orchids", "💒 Wedding Arrangements", "🎁 Birthday Bouquets"].map((item) => (
                <span key={item} style={{ margin: "0 36px", fontSize: "1.15rem", fontWeight: 600, color: "var(--rose)", whiteSpace: "nowrap", letterSpacing: "0.03em" }}>
                  {item}
                </span>
              ))}
            </Marquee>

            {/* Row 2 — scrolls RIGHT, sage-green theme */}
            <Marquee direction="right" duration={24} pauseOnHover={true} fadeAmount={8}
              style={{ background: "var(--sec-marquee-2)", padding: "14px 0" }}
            >
              {["🌻 Sunflowers", "🪷 Lilies", "🌿 Fresh Daily", "🚚 Same Day Delivery", "⭐ Premium Quality", "🌼 Seasonal Specials", "💚 Bouquet D'Amour", "🌱 Eco Packaging"].map((item) => (
                <span key={item} style={{ margin: "0 36px", fontSize: "1.15rem", fontWeight: 600, color: "var(--green)", whiteSpace: "nowrap", letterSpacing: "0.03em" }}>
                  {item}
                </span>
              ))}
            </Marquee>

            <ExpandCards />

            <ElegantCarousel />

            <ProductGrid />

            <ReviewCards />

            <BrandStory />

            {/* Workshop / About Section — personal touch with real photos */}
            <div className="Flower-About-Section">

                <img src={LeavesPic} alt="" className="Leaves-Decoration-Image" aria-hidden="true" />

                <div className="About-Flower-Workshop-LeftSection">
                    <span className="About-Label">Our Story</span>

                    <div className="About-Flower-Workshop-Text">
                        <h2>About Our Flower Workshop</h2>
                        <p>
                            Our floristry workshop creates stylish and delicate bouquets for every occasion.
                            Every arrangement is made with love from fresh flowers delivered daily.
                            We believe beauty lies in the details — so each bouquet becomes a heartfelt gift filled with emotion.
                        </p>
                    </div>

                    <div className="About-Stats">
                        <div className="About-Stat">
                            <span className="About-Stat-Number">500+</span>
                            <span className="About-Stat-Label">Bouquets Made</span>
                        </div>
                        <div className="About-Stat">
                            <span className="About-Stat-Number">5 Yrs</span>
                            <span className="About-Stat-Label">Experience</span>
                        </div>
                        <div className="About-Stat">
                            <span className="About-Stat-Number">1 Day</span>
                            <span className="About-Stat-Label">Delivery</span>
                        </div>
                    </div>
                </div>

                <div className="Right-Images-Wrapper">
                    <img src={SiddhiPic}       alt="Workshop"    className="Siddhi-Image" />
                    <img src={RedFlowerBouquet} alt="Red Bouquet" className="Red-Flower-Bouquet-Image" />
                </div>
            </div>

            {/* Special Bouquets Section */}
            <div className="Four-Pictures-Div">
                <div className="Four-Pictures-Header">
                    <div>
                        <span className="Special-Bouquet-Label">Handcrafted For You</span>
                        <h2 className="Special_Bouquet">Special Bouquets</h2>
                    </div>
                    <button onClick={() => Navigator('/products')} className="Find-more-button-homepage">
                        View All
                    </button>
                </div>

                <div className="popular-bouquets-container">
                    {ThreeAndThreeImages.map((item, index) => (
                        <div key={index} className="bouquet-card-item">
                            <div className="bouquet-card-image-wrapper">
                                <img
                                    src={Object.values(item.imageSrc)[0]}
                                    alt={item.text}
                                    className="bouquet-card-image"
                                />
                            </div>
                            <div className="bouquet-card-content">
                                <p className="bouquet-card-title">{item.text}</p>
                                <p className="bouquet-card-description">{item.description}</p>
                                <div className="bouquet-card-footer">
                                    <p className="bouquet-card-price">{item.price}</p>
                                    <button className="bouquet-card-btn">Order Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <NewsLetter />

            <Footer/>

        </div>
    )
}

export default Homepage;