"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjusted from 4 to 3
    centerMode: true,
    centerPadding: "30px",
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Testimonial
          </h6>
          <h1 className="mb-5">Our Students Say!</h1>
        </div>
        <div className="testimonial-carousel">
          <Slider {...settings}>
            {/* Imran Khan */}
            <div className="testimonial-item text-center">
              <Image
                className="border rounded-circle p-2 mx-auto mb-3"
                src="/img/imran khan.jpg"
                width={80}
                height={80}
                alt="Imran Khan"
              />
              <h5 className="mb-0">Imran Khan</h5>
              <p>Professor, Oxford University</p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  One of the best experiences I ever had in academics.
                </p>
              </div>
            </div>

            {/* Chris Evans */}
            <div className="testimonial-item text-center">
              <Image
                className="border rounded-circle p-2 mx-auto mb-3"
                src="/img/chris evans.jpg"
                width={80}
                height={80}
                alt="Chris Evans"
              />
              <h5 className="mb-0">Chris Evans</h5>
              <p>Lecturer, Harvard University</p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  The innovative teaching methods here have truly enhanced my
                  academic journey. I highly recommend this institution to
                  anyone seeking excellence.
                </p>
              </div>
            </div>

            {/* Suneel Munj */}
            <div className="testimonial-item text-center">
              <Image
                className="border rounded-circle p-2 mx-auto mb-3"
                src="/img/Suneel Sarfraz Munj.png"
                width={80}
                height={80}
                alt="Suneel Munj"
              />
              <h5 className="mb-0">Suneel Munj</h5>
              <p>Dean, Stanford University</p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">
                  A transformative academic environment where innovation and
                  collaboration thrive. My time here was incredibly rewarding.
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
