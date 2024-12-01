import Image from "next/image";
import Link from "next/link";

export default function Team() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Instructors
          </h6>
          <h1 className="mb-5">Expert Instructors</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid"
                  src="/img/team-1.jpg"
                  alt="Huzaifa Hanif"
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Huzaifa Hanif</h5>
                <small>BSCS-F20-360</small>
                <br></br>
                <small>Executive Engineer</small>
                <br />
                Microsoft Azure Associate.
              </div>
            </div>
          </div>

          {/* Repeat the above structure for each team member */}
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid"
                  src="/img/team-2.jpg"
                  alt="Hafiz Syed Abdulrehman"
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Hafiz Syed Abdulrehman</h5>
                <small>BSCS-F20-379</small>
                <br></br>
                <small>Software Engineer</small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid"
                  src="/img/team-3.jpg"
                  alt="Muhammad Shayan Tahir"
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Muhammad Shayan Tahir</h5>
                <small>BSCS-F20-312</small>
                <br></br>
                <small>Abacus IT Department</small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item bg-light">
              <div className="overflow-hidden">
                <Image
                  className="img-fluid"
                  src="/img/emma stone.png"
                  alt="Emma Stone"
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-23px" }}
              >
                <div className="bg-light d-flex justify-content-center pt-2 px-1">
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-sm-square btn-primary mx-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Emma Stone</h5>
                <small>Sr .NET Developer Systems Ltd</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
