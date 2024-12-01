"use client";
import React, { useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const VerificationContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResendVerification = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Verification email resent. Please check your inbox!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("An error occurred while resending the verification email.");
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      handleResendVerification();
    }
  }, [email, handleResendVerification]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>
        Please verify your email address to proceed. If you haven&apos;t
        received the verification email, click the button below to resend it.
      </p>
      <button onClick={handleResendVerification}>
        Resend Verification Email
      </button>
      <button onClick={() => window.history.back()}>Back to Login</button>
    </div>
  );
};

const VerificationPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerificationContent />
  </Suspense>
);

export default VerificationPage;

// "use client";
// import React, { useEffect, useCallback } from "react";
// import { useSearchParams } from "next/navigation";

// const VerificationPage = () => {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const handleResendVerification = useCallback(async () => {
//     try {
//       const response = await fetch("/api/auth/resend-verification", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         alert("Verification email resent. Please check your inbox!");
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || "Failed to resend verification email.");
//       }
//     } catch (error) {
//       console.error("Error resending verification email:", error);
//       alert("An error occurred while resending the verification email.");
//     }
//   }, [email]);

//   useEffect(() => {
//     if (email) {
//       handleResendVerification();
//     }
//   }, [email, handleResendVerification]);

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>
//         Please verify your email address to proceed. If you haven&apos;t
//         received the verification email, click the button below to resend it.
//       </p>
//       <button onClick={handleResendVerification}>
//         Resend Verification Email
//       </button>
//       <button onClick={() => window.history.back()}>Back to Login</button>
//     </div>
//   );
// };

// export default VerificationPage;
