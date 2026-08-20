import SupportHeader from "../components/SupportHeader";
import FAQSection from "../components/FAQSection";
import ContactCards from "../components/ContactCards";
import ContactForm from "../components/ContactForm";

export default function Support() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <SupportHeader />

      {/* Main Support Layout */}
      <div className="w-full flex flex-col gap-8">
        {/* Contact Details & Cards */}
        <section aria-labelledby="contact-details-heading">
          <ContactCards />
        </section>

        {/* FAQs Section */}
        <section aria-labelledby="faq-heading">
          <FAQSection />
        </section>

        {/* Get in Touch Message Form */}
        <section aria-labelledby="contact-form-heading">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
