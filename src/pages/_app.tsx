import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "sonner";
import { Layout } from "../components/Layout/Layout";
import { AmenitiesProvider } from "../contexts/AmenitiesContext";
import { AuthProvider } from "../contexts/AuthProvider/AuthProvider";
import "../styles/global.css";
import DefaultSEO from "../components/SEO/DefaultSEO";
import ScriptLoader from "../components/SEO/ScriptLoader";
import Script from "next/script";
import { LocationProvider } from "../contexts/AuthProvider/LocationContext";

const isProduction = process.env.ENVIRONMENT === "production";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <DefaultSEO />
        <LocationProvider>
          <AuthProvider>
            <AmenitiesProvider>
              <Layout>
                <Toaster position="top-right" richColors />
                <Component {...pageProps} />
              </Layout>
            </AmenitiesProvider>
          </AuthProvider>
        </LocationProvider>
      </CookiesProvider>

      <>
        <ScriptLoader
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MGHXMP9"
        />

        {/* Google Tag Manager */}
        <Script
          id="tagManagerLayer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MGHXMP9');`,
          }}
        />
      </>
    </>
  );
}
