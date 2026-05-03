import "../CSS_CODE/AboutSectionCSS.css"
import { HeroSection03 } from "../components/ui/hero-03";
import Footer from "./Footer";
import WhatWeDoImage from "../Assests/WhatWeDoGirlImage.png"
import WeLoveMadeItFlowerImage from "../Assests/WeLoveMadeItFlowerImage.png"
import OurServicesImage from "../Assests/OurSericesFlowerImage.png"
import HappinesDayDeliveryImage from "../Assests/HappinessDayDeliveryImage.png"

function AboutSection (){

    const HowWeDoItSection = [
        {
            number: "I",
            heading: "Order Placement",
            description: "Begin by placing your order on our website or simply send us a message via WhatsApp."
        },
        {
            number: "II",
            heading: "Order Confirmation",
            description: "Once your payment is received, your order is officially in our system, marked as 'Pending."
        },
        {
            number: "III",
            heading: "Trusted Partners",
            description: "As the delivery date approaches, we entrust your order to our skilled partner florists who excel in their craft."
        },
        {
            number: "IV",
            heading: "Craftsmanship in Progress",
            description: "Our dedicated florists carefully prepare your order, ensuring every detail is tended to before it's ready for delivery."
        },
        {
            number: "V",
            heading: "Quality Assurance",
            description: "Before it heads your way, we conduct a thorough quality check to ensure your order is in perfect condition."
        },
        {
            number: "VI",
            heading: "Order Delivered",
            description: "Ding dong! Your order has arrived. Following this, we'll send you an email to gather your feedback and improve our services further. Your satisfaction is our top priority!"
        },
    ]

    return (
        <div>
            <HeroSection03 />

            <div className="ContainerAboutSection">
                {/* What we Do Image and Text 1st */}
                <div className="What-We-Do-Container">
  
                    <div className="What-We-Do-Image-Container">
                        <img
                            src={WhatWeDoImage}
                            alt="What We Do"
                            className="What-We-Do-Image"
                        />
                    </div>

                    <div className="What-We-Do-Text-Container">
                        
                        <p className="What-We-Do-Heading">
                            What We Do
                        </p>

                        <p className="What-We-Do-Description">
                        Bouquet'D AMOUR, owner and managed by  
                        <span className="What-We-Do-Company">
                            Sai Floritech <br/> Private Limited
                        </span>
                        is a floral e-commerce brand that <br/>
                        thrives on delivering flowers and gifts to more than <br />
                        450 cities across India. But wait, don't plan to end <br />
                        it just there—we're currently working on expanding <br />
                        our services!
                        </p>

                    </div>
                </div>

                {/* We Love Made It Image and Text 2nd */}
                <div className="We-Love-Made-It-Container">

                    <div className="We-Love-Made-It-Text-Container">

                        <p className="We-Love-Made-It-Heading">
                        Products We Love Made By <br />
                        Flower Shop Across The <br />
                        Country.
                        </p>

                        <p className="We-Love-Made-It-Description">
                        We’re proud of our products and their magnificent <br />
                        designs. Our flowers are made by expert florists <br />
                        working in flower shops that are more than a decade <br />
                        old. BloomsFlora believes in delivering only the best <br />
                        flowers & gifts to you.
                        </p>

                    </div>

                    <div className="We-Love-Made-It-Image-Container">
                        <img
                        src={WeLoveMadeItFlowerImage}
                        alt="We Love Made It Flower"
                        className="We-Love-Made-It-Image"
                        />
                    </div>

                </div>

                {/* Our Services Contant 3rd */}
                <div className="Our-Services-Container">

                    <div className="Our-Services-Image-Container">
                        <img
                        src={OurServicesImage}
                        alt="Our Services Flower"
                        className="Our-Services-Image"
                        />
                    </div>

                    <div className="Our-Services-Text-Container">

                        <p className="Our-Services-Heading">
                        Our Services
                        </p>

                        <p className="Our-Services-Description">
                            At Bouquet'D Amour, we pride ourselves on offering a <br />
                            wide range of services to meet all your floral and <br />
                            gifting needs. From delivering flowers and gifts to <br />
                            personalized gifts like mugs, weekly flower <br />
                            subscriptions, and special birthday bundles, we've got <br />
                            it all!
                        </p>

                    </div>

                </div>

                {/* How We Do It Section 4th */}
                <div className="How-We-Do-It-Section">
                    <h2 className="How-We-Do-It-Heading">How We Do It</h2>

                    <div className="How-We-Do-It-Grid">
                        {
                            HowWeDoItSection.map((item, index) => (
                                <div key={index} className="How-We-Do-It-Container">
                                    <div className="Number-and-Heading-Container">
                                        <p className="Roman-Number">{item.number}</p>
                                        <h3 className="HeadingText">{item.heading}</h3>
                                    </div>
                                    <p className="DescriptionText">{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* A Brand Built on Trust & Quality */}
                <div className="Brand-Built-on-Trust-Quality-Container">
                    <h2>A Brand Built on Trust & Quality</h2>
                    <p>
                        "At Bouquet'D Amour, we've meticulously crafted our brand on the pillars of trust and unwavering quality. Our commitment to excellence shines through in every <br/>
                        facet of our services, from the moment you place an order to the final delivery at your doorstep. With a diverse range of offerings, including flowers, gifts, <br/>
                        personalized treasures, and more, our dedication to your satisfaction remains unwavering. We pride ourselves on being a trusted partner in making your <br/>
                        special moments memorable and delivering floral and gifting experiences that exceed expectations."
                    </p>
                </div>

                {/* Happiness Day Delivery Day Image */}
                <img
                    src={HappinesDayDeliveryImage}
                    alt="Happiness Day Delivery"
                    className="Happiness-Day-Delivery-Image"
                />

                {/* Footer Section */}
                <Footer/>
            </div>
        </div>
    )
}

export default AboutSection;