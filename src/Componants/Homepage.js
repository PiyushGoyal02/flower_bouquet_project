import "../CSS_CODE/HomepageCSS.css"
import NavbarHomepage from "../Navbar_Section/NavbarHomepage";
import headingpicture from "../Assests/homepageimageheading.png"
import PopularBouquetsHomepageFirst from "../Assests/PopularBouquetsHomepageFirst.jpeg"
import PopularBouquetsHomepageSecond from "../Assests/PopularBouquetsHomepageSecond.jpeg"
import PopularBouquetsHomepageThird from "../Assests/PopularBouquetsHomepageThird.jpeg"


function Homepage(){

    const ImageText = [
        {
            imageSrc: {PopularBouquetsHomepageFirst},
            text: "Roses Bouquet",
            description: "A beautiful bouquet of red roses.",
            price: "1500 Rs."
        },
        {
            imageSrc: {PopularBouquetsHomepageSecond},
            text: "White and Pink Roses Bouquet",
            description: "A lovely bouquet of white and pink roses.",
            price: "1000 Rs."
        },
        {
            imageSrc: {PopularBouquetsHomepageThird},
            text: "Multi Colored Bouquet",
            description: "A vibrant bouquet of multi-colored flowers.",
            price: "1200 Rs."
        }
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
                            <div className="Bouquet-text-price"></div>
                                <p className="Bouquet-text">{item.text}</p>
                                <p className="Bouquet-description">{item.description}</p>
                                <p className="Bouquet-price">{item.price}</p>
                            </div>
                    ))}
                
                </div>                
            </div>
        </div>
    )
}

export default Homepage;