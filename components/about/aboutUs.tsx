// import "../img/carousel-1.jpg"
import Link from "next/link";
// import Image from "next/image";
export default function AboutTopSection() {
  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h1 className="display-3 text-white animated slideInDown">About Us</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  < Link className="text-white" href="#">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="text-white" href="#">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  About
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
