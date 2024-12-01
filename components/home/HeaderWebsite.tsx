"use client";
import React, { useState } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link
        href="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          <FontAwesomeIcon icon={faBook} className="me-3" />
          LMS
        </h2>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        onClick={toggleMenu}
        aria-controls="navbarCollapse"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`navbar-collapse `}
        style={{ display: isOpen ? "block" : "none" }}
        id="navbarCollapse"
      >
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link href="/" className="nav-item text-blue-400 nav-link active">
            Home
          </Link>
          <Link href="/about" className="nav-item nav-link">
            About
          </Link>
          <Link href="/courses" className="nav-item nav-link">
            Courses
          </Link>
          <div className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </Link>
            <div className="dropdown-menu fade-down m-0">
              <Link href="/team" className="dropdown-item">
                Our Team
              </Link>
              <Link href="/testimonial" className="dropdown-item">
                Testimonial
              </Link>
              <Link href="/404" className="dropdown-item">
                404 Page
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-item nav-link">
            Contact
          </Link>
        </div>
        <Link
          href="/login"
          className="btn btn-primary py-4 px-lg-5 items-center d-none d-lg-flex"
        >
          Join Now<i className="fa fa-arrow-right ms-3"></i>
        </Link>
      </div>
    </nav>
  );
}
