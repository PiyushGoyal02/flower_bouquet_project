import "../CSS_CODE/ContactSectionCSS.css";
import { Navbar } from "../components/ui/shared/mini-navbar";
import Footer from "../Componants/Footer"
import ContactHero from "../components/ui/contact/contact-hero";
import ContactInfoStrip from "../components/ui/contact/contact-info-strip";
import ContactFormSection from "../components/ui/contact/contact-form-section";
import ContactMap from "../components/ui/contact/contact-map";
import ContactFaq from "../components/ui/contact/contact-faq";

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
