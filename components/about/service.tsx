// import "../img/carousel-1.jpg"
import Link from "next/link";
// import Image from "next/image";
export default function Service() {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                  <h5 className="mb-3">Skilled Instructors</h5>
                  <p>From all over the world</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                  <h5 className="mb-3">Online classNamees</h5>
                  <p>Access the Course Content</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-home text-primary mb-4"></i>
                  <h5 className="mb-3">Assignments</h5>
                  <p>Assignments and quizes will be conducted accordingly</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-book-open text-primary mb-4"></i>
                  <h5 className="mb-3">Content Library</h5>
                  <p>Access Books, Notes , Video Lectures and Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
