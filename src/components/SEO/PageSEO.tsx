"use client";

import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import bnbmeHomePage from "../../../asserts/homepage/bnbme_home.png";
import { Images } from "../../../asserts/Import/Images";

interface PageSEOProps {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  type?: string;
  canonical?: string;
  structuredData?: Record<string, any>;
}

const PageSEO = ({
  title,
  description,
  image = Images.homePage.src,
  date,
  type = "website",
  canonical,
  structuredData,
}: PageSEOProps) => {
  const router = useRouter();
  const url = `https://www.bnbmehomes.com${canonical || router.asPath}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: image,
              width: 800,
              height: 400,
              alt: title,
              type: "image/png",
            },
          ],
          type,
          ...(date && { publishedTime: date }),
          site_name: "bnbmehomes",
        }}
        twitter={{
          handle: "@bnbmehomes",
          site: "@bnbmehomes",
          cardType: "summary_large_image",
        }}
      />
      {structuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
      )}
    </>
  );
};

export default PageSEO;
