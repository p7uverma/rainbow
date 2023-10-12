import { Metadata } from "next";
import ContactForm from "@/components/self/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactUs = () => {
  return <ContactForm />;
};

export default ContactUs;
