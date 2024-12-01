// pages/_app.tsx
import { useEffect } from "react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        await fetch("/api/checkSuperAdmin");
      } catch (error) {
        console.error("Failed to check Super Admin:", error);
      }
    };

    checkSuperAdmin();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
