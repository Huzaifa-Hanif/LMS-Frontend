import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const Logo = () => {
  return (
    // <Link href={"/dashboard"}>
    //   <Image height={130} width={130} alt="logo" src="/logo.svg" />
    // </Link>
    <Link
      href="/"
      className="navbar-brand d-flex align-items-center px-4 px-lg-5"
    >
      <h2 className="m-0 text-primary">
        <FontAwesomeIcon icon={faBook} className="me-3" />
        LMS
      </h2>
    </Link>
  );
};
