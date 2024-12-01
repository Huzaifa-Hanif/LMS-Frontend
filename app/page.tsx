import Head from "next/head";
// import Header from '../../components/Header';
import Carousel from "@/components/home/carousel";
import Header from "@/components/home/HeaderWebsite";
import Service from "@/components/home/service";
import AboutUs from "@/components/home/aboutUs";
import Categories from "@/components/home/categories";
import Courses from "@/components/home/courses";
import Team from "@/components/home/team";
import Testimonial from "@/components/home/testimonial";
import Navbar from "@/components/navbar";
import InstructorSlider from "@/components/home/instructor-slider";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Service />
      <AboutUs />
      <Categories />
      <Courses />
      <Team />
      {/* <InstructorSlider /> */}
      {/* <Testimonial /> */}
      <Testimonial />
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
