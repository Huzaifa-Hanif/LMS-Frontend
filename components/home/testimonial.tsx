"use client";
import React from "react";
import Slider from "react-slick";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,

    centerMode: true,
    centerPadding: "30px",

    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Testimonial
          </h6>
          <h1 className="mb-5">Our Students Say!</h1>
        </div>
        <Slider {...settings} className="testimonial-carousel ">
          <div className="testimonial-item text-center mr-4">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src="img/testimonial-1.jpg"
              style={{ width: "80px", height: "80px" }}
              alt="Client 1"
            />
            <h5 className="mb-0">Client Name</h5>
            <p>Profession</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src="img/testimonial-2.jpg"
              style={{ width: "80px", height: "80px" }}
              alt="Client 2"
            />
            <h5 className="mb-0">Client Name</h5>
            <p>Profession</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src="img/testimonial-3.jpg"
              style={{ width: "80px", height: "80px" }}
              alt="Client 3"
            />
            <h5 className="mb-0">Client Name</h5>
            <p>Profession</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </div>
          <div className="testimonial-item text-center">
            <img
              className="border rounded-circle p-2 mx-auto mb-3"
              src="img/testimonial-4.jpg"
              style={{ width: "80px", height: "80px" }}
              alt="Client 4"
            />
            <h5 className="mb-0">Client Name</h5>
            <p>Profession</p>
            <div className="testimonial-text bg-light text-center p-4">
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam
                amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
