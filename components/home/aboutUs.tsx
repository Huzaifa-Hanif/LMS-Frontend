// import "../img/carousel-1.jpg"
import Image from "next/image";
import Link from "next/link";
export default function AboutUs() {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div className="position-relative h-100">
                <Image
                  src="/img/portrate.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  // quality={100}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">Welcome to LMS</h1>
              <p className="mb-4">
                "Welcome to our Online Learning Management System, a dynamic
                platform designed to empower learners and educators alike. Our
                LMS offers a streamlined and interactive environment where
                students can access top-quality courses led by skilled
                instructors from around the world.
              </p>
              <p className="mb-4">
                {" "}
                With a focus on flexibility and accessibility, our system
                supports a range of educational needs, whether you're looking
                for certification, upskilling, or exploring new knowledge areas.
                Courses are enriched with multimedia resources, quizzes, and
                assignments, ensuring an engaging and comprehensive learning
                experience. Join us to unlock your potential with a community
                committed to learning and growth."
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Online Classes
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    International Certificate
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Online Classes
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    International Certificate
                  </p>
                </div>
              </div>
              <Link className="btn btn-primary py-3 px-5 mt-2" href="/about">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
