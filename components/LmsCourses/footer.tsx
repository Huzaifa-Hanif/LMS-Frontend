import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Quick Link</h4>
              <Link className="btn btn-link" href="">
                About Us
              </Link>
              <Link className="btn btn-link" href="">
                Contact Us
              </Link>
              <Link className="btn btn-link" href="">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" href="">
                Terms & Condition
              </Link>
              <Link className="btn btn-link" href="">
                FAQs & Help
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>168, Shadman II
                Shadman 2 Shadman, Lahore, Punjab 54000
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+92 333751 1654
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>
                lms.ncba&e.onmicrosoft.com
              </p>
              <div className="d-flex pt-2">
                <Link
                  className="btn btn-outline-light btn-social"
                  href="https://www.twitter.com"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  className="btn btn-outline-light btn-social"
                  href="https://facebook.com"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  className="btn btn-outline-light btn-social"
                  href="https://youtube.com"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link
                  className="btn btn-outline-light btn-social"
                  href="https://linkedin.com"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt="Course 1"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt="Course 2"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt="Course 3"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt="Course 4"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt="Course 5"
                    width={150}
                    height={100}
                  />
                </div>
                <div className="col-4">
                  <Image
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt="Course 6"
                    width={150}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p>Don't search the key! The Door of Success is always open.</p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  className="form-control border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="lms.ncba.onmicrosoft.com"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <Link className="border-bottom" href="#">
                  Online LMS
                </Link>
                , All Rights Reserved. Designed By
                <a
                  className="border-bottom"
                  href="https://www.linkedin.com/in/huzaifa-hanif-b46b88206/"
                >
                  NCBA Developers team
                </a>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link href="">Home</Link>
                  <Link href="">Cookies</Link>
                  <Link href="">Help</Link>
                  <Link href="">FQAs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
