import AboutStart from "@/components/about/about-start";
import AboutTopSection from "@/components/about/aboutUs";
import Contactheader from "@/components/contact/contact-header";
import Contactinfo from "@/components/contact/contact-info";
import Contactnavbar from "@/components/contact/contact-navbar";
import Contactsendusinfo from "@/components/contact/contact-send-us-info";
import Footer from "@/components/Footer";
import Service from "@/components/home/service";
import Team from "@/components/home/team";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <div>
      {/* <Contactnavbar /> */}
      <Navbar />
      
      {/* <AboutTopSection /> */}
      <Contactheader />
      {/* <Contactinfo /> */}
      <Contactsendusinfo />

      {/* <Service />
      <AboutStart />
      <Team /> */}
      
      <Footer />
      {/* Add other components here */}

      <Link
        href="#"
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
      >
        <i className="bi bi-arrow-up"></i>
      </Link>
    </div>
  );
}
