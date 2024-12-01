// import "../Image/carousel-1.jpg"
import Link from "next/link";
import Image from "next/image";
export default function AboutStart() {
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
                  className="Image-fluid position-absolute w-100 h-100"
                  src="/img/portrate.jpg"
                  alt=""
                  fill
                  // height={50}
                  // width={50}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to Online Learning Management system.
              </h1>
              <p className="mb-4">
                &quot;Welcome to our Online Learning Management System, a
                dynamic platform designed to empower learners and educators
                alike. Our LMS offers a streamlined and interactive environment
                where students can access top-quality courses led by skilled
                instructors from around the world.
              </p>
              <p className="mb-4">
                With a focus on flexibility and accessibility, our system
                supports a range of educational needs, whether you&apos;re
                looking for certification, upskilling, or exploring new
                knowledge areas. Courses are enriched with multimedia resources,
                quizzes, and assignments, ensuring an engaging and comprehensive
                learning experience. Join us to unlock your potential with a
                community committed to learning and growth.
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
                    Online classNamees
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Certificates
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
                    Online classNamees
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    International Certificate
                  </p>
                </div>
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
