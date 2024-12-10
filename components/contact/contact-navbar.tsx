// import "../Image/carousel-1.jpg"
import Link from "next/link";
import Image from "next/image";


export default function Contactnavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>LMS
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link href="index.html" className="nav-item nav-link active">
              Home
            </Link>
            <Link href="/about" className="nav-item nav-link">
              About
            </Link>
            <Link href="/search" className="nav-item nav-link">
              Courses
            </Link>

            <Link href="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
          <Link
            href=""
            className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
          >
            Register<i className="fa fa-arrow-right ms-3"></i>
          </Link>
        </div>
      </nav>
    </>
  );
}
