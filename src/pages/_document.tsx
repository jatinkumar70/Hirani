/* eslint-disable @next/next/next-script-for-ga */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

interface MyDocumentProps {
  canonicalUrl: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const canonicalUrl = `https://www.bnbmehomes.com${ctx.asPath}`;

    return { ...initialProps, canonicalUrl };
  }

  render() {
    const { canonicalUrl } = this.props;

    const hreflangs = [{ href: "https://www.bnbmehomes.com/", hrefLang: "en" }];

    // JSON-LD structured data for homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "bnbmehomes",
      url: "https://www.bnbmehomes.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.bnbmehomes.com/",
        "query-input": "required name=search_term_string",
      },
    };

    const isProduction = process.env.NODE_ENV === "production";

    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href={"/logo_white.png"} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="canonical" href={canonicalUrl} />
          {hreflangs.map(({ href, hrefLang }) => (
            <link
              key={hrefLang}
              rel="alternate"
              href={href}
              hrefLang={hrefLang}
            />
          ))}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preload"
            href="/fonts/Inter-ExtraBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Tajawal-Bold.ttf"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Tajawal-Medium.ttf"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-ExtraBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
         

          {/* Add structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MGHXMP9"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
