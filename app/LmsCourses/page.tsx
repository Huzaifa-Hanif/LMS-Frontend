import AboutStart from "@/components/about/about-start";
import AboutTopSection from "@/components/about/aboutUs";
import Footer from "@/components/Footer";
import Courses from "@/components/home/courses";
import Service from "@/components/home/service";
import Team from "@/components/home/team";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

export default function LmsCourses() {
  return (
    <div>
      <Navbar />
      <AboutTopSection />
      <Courses />
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
