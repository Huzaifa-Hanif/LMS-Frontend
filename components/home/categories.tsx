// import "../img/carousel-1.jpg"
import Image from "next/image";
import Link from "next/link";
export default function Categories() {
  return (
    <>
      <div className="container-xxl py-5 category">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Categories
            </h6>
            <h1 className="mb-5">Courses Categories</h1>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 col-md-6">
              <div className="row g-3">
                <div
                  className="col-lg-12 col-md-12 wow zoomIn"
                  data-wow-delay="0.1s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="#"
                  >
                    <Image
                      src="/img/web.png"
                      alt="Cat"
                      layout="responsive"
                      width={800}
                      height={600}
                      className="img-fluid"
                    />
                    {/* <img  className="img-fluid" src="/img/cat-1.jpg" alt="" /> */}
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Web Design</h5>
                      <small className="text-primary">09 Courses</small>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="#"
                  >
                    <Image
                      src="/img/graphic design.jpg"
                      alt="Cat"
                      layout="responsive"
                      width={800}
                      height={600}
                      className="img-fluid"
                    />

                    {/* <img className="img-fluid" src="img/cat-2.jpg" alt="" /> */}
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Graphic Design</h5>
                      <small className="text-primary">12 Courses</small>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.5s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    href="#"
                  >
                    {/* <Image
                    src="/img/cat-3.jpg"
                    alt=""
                    layout="fill" 
                    objectFit="cover"
                    // quality={100} 
                  /> */}
                    <Image
                      src="/img/video edit.jpg"
                      alt="Cat"
                      layout="responsive"
                      width={800}
                      height={600}
                      className="img-fluid"
                    />

                    {/* <img className="img-fluid" src="img/cat-3.jpg" alt="" /> */}
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Video Editing</h5>
                      <small className="text-primary">19 Courses</small>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-md-6 wow zoomIn"
              data-wow-delay="0.7s"
              style={{ minHeight: "350px" }}
            >
              <Link
                className="position-relative d-block h-100 overflow-hidden"
                href="#"
              >
                <Image
                  src="/img/cloud.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  // quality={100}
                />
                {/* <Image className="img-fluid position-absolute w-100 h-100" src="img/cat-4.jpg" alt="" style={{objectFit: "cover"}} /> */}
                <div
                  className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                  style={{ margin: "1px" }}
                >
                  <h5 className="m-0">Online Marketing</h5>
                  <small className="text-primary">17Courses</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
