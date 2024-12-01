"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Link from "next/link";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="w-full overflow-hidden p-0 mb-5">
      <Slider {...settings} className="header-carousel position-relative">
        {/* First Slide */}
        <div className="position-relative w-full h-screen">
          <Image
            src="/img/background.jpg"
            alt="background image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    The Best Online Learning Platform
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Success at your doorstep
                  </p>
                  <a
                    href="/about"
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Read More
                  </a>
                  {!user ? (
                    <Link
                      href="/login"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Join Now
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Contact Us
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Slide */}
        <div className="position-relative w-full h-screen">
          <Image
            src="/img/carousel-1.jpg"
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
            quality={80}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ backgroundColor: "rgba(24, 29, 56, .7)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    Get Educated Online From Your Home
                  </h1>
                  <p className="fs-5 text-white mb-4 pb-2">
                    Success at your Doorstep
                  </p>
                  <Link
                    href="/about"
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Read More
                  </Link>
                  {!user ? (
                    <Link
                      href="/login"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Join Now
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Contact Us
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
