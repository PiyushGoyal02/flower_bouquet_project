import "../CSS_CODE/AboutSectionCSS.css"
import { HeroSection03 } from "../components/ui/hero-03";
import { Navbar } from "../components/ui/mini-navbar";
import Footer from "./Footer";
import StatsCards from "../components/ui/stats-cards";
import WhatWeDoSection from "../components/ui/what-we-do-section";
import JourneyTimeline from "../components/ui/journey-timeline";
import TeamMarquee from "../components/ui/team-marquee";
import HowWeDoIt from "../components/ui/how-we-do-it";
import TrustBadges from "../components/ui/trust-badges";
import FAQSection from "../components/ui/faq-section";
import BrandQuote from "../components/ui/brand-quote";

function AboutSection (){
    return (
        <div>
            <Navbar />
            <HeroSection03 />

            <div className="ContainerAboutSection">

                {/* 1. What We Do — mission & vision */}
                <WhatWeDoSection />

                {/* 2. Stats — numbers that matter */}
                <StatsCards />

                {/* 3. Our Journey — brand history timeline */}
                <JourneyTimeline />

                {/* 4. Team — the people behind it */}
                <TeamMarquee />

                {/* 5. How We Do It — our process */}
                <HowWeDoIt />

                {/* 6. Why Choose Us — trust badges */}
                <TrustBadges />

                {/* 7. FAQ — common questions */}
                <FAQSection />

                {/* 8. Brand Quote — closing statement */}
                <BrandQuote />

                {/* Footer */}
                <Footer/>
            </div>
        </div>
    )
}

export default AboutSection;
