import Link from "next/link";
import Script from "next/script";
import Head from "next/head";

// import "../../css/bootstrap.min.css";
import "../../css/style.css";
import "../lib/animate/animate.min.css";
import "../lib/owlcarousel/assets/owl.carousel.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {
  faMagnifyingGlass,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "@/components/home/HeaderWebsite";
import Footer from "@/components/home/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
      />
      <Header />

      <div>{children}</div>
      <Footer />
      <Script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
      <Script src="lib/wow/wow.min.js" strategy="lazyOnload" />
      <Script src="lib/easing/easing.min.js" strategy="lazyOnload" />
      <Script src="lib/waypoints/waypoints.min.js" strategy="lazyOnload" />
      <Script src="lib/owlcarousel/owl.carousel.min.js" strategy="lazyOnload" />
      <Script src="js/main.js" strategy="lazyOnload" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
};

export default DashboardLayout;
