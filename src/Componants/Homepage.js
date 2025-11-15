import "../CSS_CODE/HomepageCSS.css"
import SiddhiPic from "../Assests/SiddhiPic.jpeg"
import NavbarHomepage from "../Navbar_Section/NavbarHomepage";
import headingpicture from "../Assests/homepageimageheading.png"
import PopularBouquetsHomepageFirst from "../Assests/PopularBouquetsHomepageFirst.jpeg"
import PopularBouquetsHomepageSecond from "../Assests/PopularBouquetsHomepageSecond.jpeg"
import PopularBouquetsHomepageThird from "../Assests/PopularBouquetsHomepageThird.jpeg"
import RedFlowerBouquet from "../Assests/Screenshot from 2025-11-15 16-08-04.png"
import LeavesPic from "../Assests/LeavesImage.png"
import RedRiddhiSiddhiFlower from "../Assests/RedRiddhiSiddhiBouquet.png"
import MeronFlowers from "../Assests/MaronFlower.png"
import WhineAndWhite from "../Assests/WhineAndWhiteFlowers.png"
import MultiFlower from "../Assests/_ (1).jpeg"
import MultiFlowerTwo from "../Assests/_ (3).jpeg"
import Footer from "./Footer"


function Homepage(){

    const ImageText = [
        {
            imageSrc: {PopularBouquetsHomepageFirst},
            text: "Roses Bouquet",
            description: "Beautiful red roses.",
            price: "1500 Rs."
        },
        {
            imageSrc: {PopularBouquetsHomepageSecond},
            text: "White and Pink Roses Bouquet",
            description: "Lovely white and pink roses.",
            price: "1000 Rs."
        },
        {
            imageSrc: {PopularBouquetsHomepageThird},
            text: "Multi Colored Bouquet",
            description: "Vibrant bouquet multi-colored.",
            price: "1200 Rs."
        }
    ]

    const ThreeAndThreeImages = [
        {
            imageSrc: {MultiFlower},
            text: "Roses Bouquet",
            description: "Beautiful red roses."
        },
        {
            imageSrc: {RedRiddhiSiddhiFlower},
            text: "Red Roses Bouquet",
            description: "Loyal And Lovely Red Roses."
        },
        {
            imageSrc: {MultiFlowerTwo},
            text: "Multi Colored Bouquet",
            description: "Vibrant bouquet multi-colored."
        },
        {
            imageSrc: {MeronFlowers},
            text: "Wine and White Bouquet",
            description: "Wine and Peasceful White Roses."
        },
        {
            imageSrc: {PopularBouquetsHomepageSecond},
            text: "White and Pink Roses Bouquet",
            description: "Lovely white and pink roses."
        },
        {
            imageSrc: {WhineAndWhite},
            text: "Wine and White Bouquet",
            description: "Wine and Peasceful White Roses."
        },
    ]


    return (
        <div className="Homepage-main-div">
            <NavbarHomepage/>
            
            <div>
                <img src={headingpicture} alt="Homepage Heading" className="homepage-heading-image"/>
            </div>

            <div className="Popular-Bouquets-section">
                {/* Popular-Bouquets-header */}
                <div className="Popular-Bouquets-header">
                    <h2 className="Popular-Bouquets-text">Popular Bouquets</h2>
                    <button className="search-more-button-homepage">
                        Search more
                    </button>
                </div>

                {/* Flower's Bouquets Images and With text */}
                <div className="Popular-Bouquets-Images-with-text">
                    {ImageText.map((item, index) => (
                        <div key={index} className="Bouquet-item">
                            <img 
                                src={Object.values(item.imageSrc)[0]} 
                                alt={item.text} 
                                className="Bouquet-image"
                            />

                            <div className="Bouquet-text-box">
                                <p className="Bouquet-text">{item.text}</p>
                                <p className="Bouquet-description">{item.description}</p>
                                <p className="Bouquet-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>

            {/* Flower About Section Siddhi Pic */}
            <div className="Flower-About-Section">

                {/* Left Side */}
                <div className="About-Flower-Workshop-LeftSection">
                    <div className="About-Flower-Workshop-Text">
                        <h2>About Our Flower Workshop</h2>
                        <p>
                            Our floristry workshop creates stylish and delicate bouquets for any occasion.<br/>
                            Every bouquet is made with love from fresh flowers delivered daily.<br/>
                            We value beauty, quality, and attention to detail —<br/>
                            so each bouquet becomes a special gift filled with emotion.<br/>
                        </p>
                    </div>
                    <img
                        src={LeavesPic}
                        alt="Leaves Decoration"
                        className="Leaves-Decoration-Image"
                    />
                </div>

                {/* Right Side */}
                <div className="Right-Images-Wrapper">
                    <img src={SiddhiPic} className="Siddhi-Image" />

                    <img src={RedFlowerBouquet} className="Red-Flower-Bouquet-Image" />
                </div>

            </div>

            {/* Four Pictures Div */}
            <div className="Four-Pictures-Div">
                <div className="Four-Pictures-Header">
                    <h2 className="Special_Bouquet">Special Bouquet's</h2>
                    <button className="Find-more-button-homepage">
                        Find more
                    </button>
                </div>

                {/* Three And Three Images */}
                <div className="popular-bouquets-container">
                    {ThreeAndThreeImages.map((item, index) => (
                        <div key={index} className="bouquet-card-item">
                            <img 
                                src={Object.values(item.imageSrc)[0]} 
                                alt={item.text} 
                                className="bouquet-card-image"
                            />

                            <div className="bouquet-card-content">
                                <p className="bouquet-card-title">{item.text}</p>
                                <p className="bouquet-card-description">{item.description}</p>
                                <p className="bouquet-card-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="Contact-Section-Homepage">
                    <div>
                        <p>Stay up to date <br/> with our news</p>
                    </div>

                    <div>
                        <div className="Contact-Input-Button-Homepage">
                            <input type="name" placeholder="Enter your name" className="Contact-Input-Homepage"/>
                            <input type="email" placeholder="Enter your email" className="Contact-Input-Homepage"/>
                            <button className="Contact-Button-Homepage">Subscribe</button>
                        </div>
                        <div>
                            <p className="Contact-Extra-Text">
                                Subscribe now and be the first to receive our latest bouquet collections, special offers, and exclusive festival discounts!
                            </p>
                        </div>
                    </div>
                    
                </div>
                
                <Footer/>


            </div>

        </div>
    )
}

export default Homepage;