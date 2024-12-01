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
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Carousel />
      <Service />
      <AboutUs />
      <Categories />
      <Courses />
      <Team />
      <Testimonial />
      {/* <Footer /> */}
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
