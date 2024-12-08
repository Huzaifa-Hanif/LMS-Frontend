"use client";
import styles from "./login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./login.css";
import { useAuth } from "../(auth)/auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { DecodeToken } from "../utils/decodeToken";
import Link from "next/link";
import clsx from "clsx";
// import { useAuth } from "./hooks/useAuth";
// import Header from '../../components/Header';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const {
    loading,
    register: registerUser,
    signin,
    passwordReset,
    activateUser,
  } = useAuth();
  const handleSignUp = () => {
    setIsSignUp(true);
    signInFormik.resetForm();
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    signUpFormik.resetForm();
  };
  const signUpFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await registerUser(values);
      if (response.status == 400) {
        toast.error(response.response.data.message ?? response.response.data!);
      } else if (response.status == "success") {
        toast.success(response.message);
        router.push("/login");
      } else {
        toast.success(response.message);
        router.push("/login");
      }
      // } catch (error) {
      // console.error("Error:", error);
      // toast.error("Something went wrong!");
      // }
    },
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required"),
    //   password: Yup.string().required("Password is required"),
    // }),
    onSubmit: async (values) => {
      try {
        const resp = await signin(values, (field: any, error: any) => {
          console.log(error, "errro");
          toast.error(error.message);
        });
        if (resp?.accessToken) {
          let user = await DecodeToken(resp?.accessToken);

          Cookies.set("accessToken", resp.accessToken, {
            expires: 7,
            path: "/",
          });
          localStorage.setItem("accessToken", resp.accessToken);
          toast.success("Login Successfully !!");
          router.push("/dashboard");
        }
        if (resp?.status == 200) {
          toast.success("Login Successfully !!");
        }
        if (resp && resp.error === "not_confirmed") {
          toast.error("Please verify your email address before proceeding");
          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`
          ); // Redirect with email as a query parameter
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    },
  });
  const { socialActions, loadingGoogle, loadingFacebook } = useAuth();

  const handleGoogleLogin = () => {
    socialActions("google");
  };

  const handleFacebookLogin = () => {
    socialActions("facebook");
  };

  return (
    <div className=" justify-center flex flex-1">
      <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
        <div
          className={`${styles["form-container"]} px-6 ${styles["sign-up"]}`}
        >
          <form onSubmit={signUpFormik.handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialIcons}>
              <button
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                // className={styles.socialBtn}
              >
                <i className="fa-brands fa-google"></i>
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={loadingFacebook}
                className={styles.icon}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              {/* <button
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                className={styles.icon}
              >
                <i className="fa-brands fa-google"></i>{" "}
                {loadingGoogle ? "Loading..." : "Login with Google"}
              </button> */}
              {/* <button
                onClick={handleFacebookLogin}
                disabled={loadingFacebook}
                className={styles.icon}
              >
                <i className="fa-brands fa-facebook-f"></i>{" "}
                {loadingFacebook ? "Loading..." : "Login with Facebook"}
              </button> */}

              {/* <a href="#" className={styles.icon}>
                <i className="fa-brands fa-youtube"></i>
              </a> */}
            </div>
            <span>or use your email for register</span>
            {/* <input type="text" placeholder="Full Name" /> */}
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              style={{
                border:
                  signUpFormik.touched.fullName && signUpFormik.errors.fullName
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signUpFormik.values.fullName}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.fullName && signUpFormik.errors.fullName ? (
              <div className={`absolute mb-[25px] left-7 ${styles.error}`}>
                {signUpFormik.errors.fullName}
              </div>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              name="email"
              style={{
                border:
                  signUpFormik.touched.email && signUpFormik.errors.email
                    ? "1px solid red"
                    : "1px solid transparent",
                marginTop: "20px",
              }}
              value={signUpFormik.values.email}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.email && signUpFormik.errors.email ? (
              <div className={`absolute mt-[110px] left-7 ${styles.error}`}>
                {signUpFormik.errors.email}
              </div>
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="password"
              style={{
                marginTop: "20px",
                border:
                  signUpFormik.touched.password && signUpFormik.errors.password
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signUpFormik.values.password}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.password && signUpFormik.errors.password ? (
              <div className={`absolute mt-[250px] left-7 ${styles.error}`}>
                {signUpFormik.errors.password}
              </div>
            ) : null}
            <button
              className={clsx(styles.primaryBtn, "mt-[30px]")}
              type="submit"
            >
              Sign Up
            </button>

            {/* <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button> */}
          </form>
        </div>

        <div
          className={`${styles["form-container"]} px-6 ${styles["sign-in"]}`}
        >
          <form onSubmit={signInFormik.handleSubmit}>
            <h1>Sign In</h1>
            <div className={styles.socialIcons}>
              <button
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                // className={styles.socialBtn}
              >
                <i className="fa-brands fa-google"></i>
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={loadingFacebook}
                className={styles.icon}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </button>
            </div>
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              data-testid="email-input"
              name="email"
              style={{
                border:
                  signInFormik.touched.email && signInFormik.errors.email
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signInFormik.values.email}
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
            />
            {signInFormik.touched.email && signInFormik.errors.email ? (
              <div
                data-testid="email-error"
                className={` absolute mt-[5px] left-7 ${styles.error}`}
              >
                {signInFormik.errors.email}
              </div>
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="password"
              data-testid="password-input"
              style={{
                marginTop: "25px",
                border:
                  signInFormik.touched.password && signInFormik.errors.password
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signInFormik.values.password}
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
            />
            {signInFormik.touched.password && signInFormik.errors.password ? (
              <div
                data-testid="password-error"
                className={`absolute mt-[140px] left-7 ${styles.error}`}
              >
                {signInFormik.errors.password}
              </div>
            ) : null}
            <Link href="#">Forgot Password?</Link>
            <button
              className={clsx(styles.primaryBtn, "login-submit-button")}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>

        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
            >
              <h1>Welcome Back!</h1>

              <p>Enter your personal details to use all of site features.</p>
              <button
                className={clsx(styles.primaryBtn)}
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>

            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
            >
              <h1 style={{ color: "white" }}>Enter your credentials</h1>

              <p>Explore the Magical Treasure of Knowledge</p>
              <button
                className={clsx(styles.primaryBtn)}
                onClick={handleSignUp}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
