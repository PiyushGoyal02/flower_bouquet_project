import "../CSS_CODE/ContactSectionCSS.css";
import { Navbar } from "../components/ui/mini-navbar";
import Footer from "../Componants/Footer"
import ContactHero from "../components/ui/contact-hero";
import ContactInfoStrip from "../components/ui/contact-info-strip";
import ContactFormSection from "../components/ui/contact-form-section";
import ContactMap from "../components/ui/contact-map";
import ContactFaq from "../components/ui/contact-faq";

function ContactSection() {
  return (
    <div>
      <Navbar />

      <ContactHero />

      <ContactInfoStrip />

      <ContactFormSection />

      <ContactFaq />

      <ContactMap />

      <Footer />
    </div>
  );
}

export default ContactSection;
