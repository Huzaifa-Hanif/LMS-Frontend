// components/InstructorSlider.js
"use client";
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image'; // Import the Image component from Next.js

const instructors = [
  { name: 'Instructor 1', designation: 'Expert', image: '/img/team-1.jpg' },
  { name: 'Instructor 2', designation: 'Expert', image: '/img/team-2.jpg' },
  { name: 'Instructor 3', designation: 'Expert', image: '/img/team-3.jpg' },
  { name: 'Instructor 4', designation: 'Expert', image: '/img/team-4.jpg' },
];

const InstructorSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">Instructors</h6>
          <h1 className="mb-5">Expert Instructors</h1>
        </div>
        <Slider {...settings}>
          {instructors.map((instructor, index) => (
            <div key={index} className="team-item bg-light">
              <div className="overflow-hidden">
                <Image 
                  className="img-fluid" 
                  src={instructor.image} 
                  alt={instructor.name} 
                  width={300} // Replace with the actual width of your images
                  height={300} // Replace with the actual height of your images
                />
              </div>
              <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#"><i className="fab fa-twitter"></i></Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#"><i className="fab fa-instagram"></i></Link>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">{instructor.name}</h5>
                <small>{instructor.designation}</small>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default InstructorSlider;
