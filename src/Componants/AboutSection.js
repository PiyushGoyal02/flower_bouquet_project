import "../CSS_CODE/AboutSectionCSS.css"
import { HeroSection03 } from "../components/ui/about/hero-03";
import { Navbar } from "../components/ui/shared/mini-navbar";
import Footer from "./Footer";
import StatsCards from "../components/ui/about/stats-cards";
import WhatWeDoSection from "../components/ui/about/what-we-do-section";
import JourneyTimeline from "../components/ui/about/journey-timeline";
import TeamMarquee from "../components/ui/about/team-marquee";
import HowWeDoIt from "../components/ui/about/how-we-do-it";
import TrustBadges from "../components/ui/about/trust-badges";
import FAQSection from "../components/ui/about/faq-section";
import BrandQuote from "../components/ui/about/brand-quote";

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
