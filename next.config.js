/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "yt3.ggpht.com",
      "gw.alipayobjects.com",
      "i.ytimg.com",
      "cdn.pixabay.com",
      "auto.economictimes.indiatimes.com",
      "flagcdn.com",
      "bnbapi.bnbmehomes.in",
      "v1.bnbmehomes.com",
      "bnbmetestapi.bnbmehomes.in",
      "img.youtube.com",
      "ota-test-edgenroots.s3.ap-south-1.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "blogapi.bnbmehomes.in",
    ],
  },

  // Internationalization Configuration (i18n)
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  env: {
    ENVIRONMENT: process.env.NODE_ENV,
  },

  async redirects() {
    return [
      {
        source:
          "/property/address-beach-resort-one-bedroom-apartment-with-beach-access-gym",
        destination:
          "/property/bnbme-address-beach-apt-near-bluewaters-jbr-241572",
        permanent: true,
      },
      {
        source: "/booking-confirmation/70484511",
        destination: "/bnbme_booking_confirm.pdf",
        permanent: true,
      },
      {
        source: "/booking-confirmation/70484511/bnbme_booking_confirm.pdf",
        destination: "/bnbme_booking_confirm.pdf",
        permanent: true,
      },
      {
        source: "/property/spectacular-1br-community-view",
        destination:
          "/property/bnbmehomes-spectacular-1br-community-view-241592",
        permanent: true,
      },
      {
        source:
          "/property/azizi-riviera-45-one-bedroom-apartment-with-gym-pool",
        destination:
          "/property/bnbme-elegant-apt-w-pool-gym-near-downtown-262899",
        permanent: true,
      },
      {
        source:
          "/property/burj-royale-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbmehomes-1-br-exquisite-suite-nr-burj-khalifa-241603",
        permanent: true,
      },
      {
        source:
          "/property/damac-esclusiva-one-bedroom-apartment-with-swimming-pool",
        destination: "/property/bnbme-248699",
        permanent: true,
      },
      {
        source:
          "/property/downtown-views-ii-one-bedroom-apartment-with-swimming-pool-gym",
        destination:
          "/property/bnbme-modern-apt-2km-to-dubai-mall-3km-to-difc-242566",
        permanent: true,
      },
      {
        source:
          "/property/dunya-tower-one-bedroom-apartment-with-swimming-pool-gym",
        destination:
          "/property/bnbmehomes-dt-living-nxt-to-address-fountain-241642",
        permanent: true,
      },
      {
        source:
          "/property/golfville-at-dubai-hills-estate-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbme---luxury-residence-nr-the-scenic-golf-course-245292",
        permanent: true,
      },
      {
        source:
          "/property/la-fontana-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbmehomes-lavish-1br-apt-near-ski-dubai-241429",
        permanent: true,
      },
      {
        source: "/property/la-vie-one-bed-room-apartment-with-gym-pool",
        destination: "/property/bnbmehomes-pvt-beach-mins-to-ain-dubai-242567",
        permanent: true,
      },
      {
        source:
          "/property/the-lofts-emaar-one-bedroom-apartment-with-pool-and-gym",
        destination:
          "/property/bnbmehomes-duplex-apt-nr-burj-k-dubai-mall-241425",
        permanent: true,
      },
      {
        source: "/property/mag-900-one-bedroom-apartment-with-a-city-view",
        destination:
          "/property/bnbme-stylish-apt-with-city-view-free-parking-257870",
        permanent: true,
      },
      {
        source:
          "/property/merano-tower-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbmehomes-stay-w-skyline-views-business-bay-242568",
        permanent: true,
      },
      {
        source: "/property/noora-tower-one-bedroom-apartment-with-pool-and-gym",
        destination:
          "/property/bnbmehomes-classic-1br-8-mins-to-burj-khalifa-242569",
        permanent: true,
      },
      {
        source:
          "/property/rahaal-madinat-jumeirah-living-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbme-vibrant-apt-nr-burj-al-arab-w-pool-access-241602",
        permanent: true,
      },
      {
        source: "/property/riviera-one-bedroom-apartment",
        destination:
          "/property/bnbmehomes-1br-suite-near-riyadh-intl-convention-235360",
        permanent: true,
      },
      {
        source:
          "/property/saba-2-tower-one-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbmehomes-1br-nr-ain-dubai-dubai-marina-mall-241578",
        permanent: true,
      },
      {
        source:
          "/property/sobha-creek-vistas-one-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbmehomes-primestay-perfect-for-corporate-stays-241452",
        permanent: true,
      },
      {
        source: "/property/the-court-tower-one-bedroom-apartment",
        destination:
          "/property/bnbmehomes-sophisticated-living-in-business-bay-242570",
        permanent: true,
      },
      {
        source:
          "/property/tiara-residence-one-bedroom-apartment-with-beach-access-gym",
        destination:
          "/property/bnbme-urban-nest-in-heart-of-palm-w-pool-bar-241415",
        permanent: true,
      },
      {
        source:
          "/property/tiara-residence-one-bedroom-apartment-with-beach-access-gym-1",
        destination:
          "/property/bnbme-seaside-suite-w-pvt-beach-palm-jumeirah-241443",
        permanent: true,
      },
      {
        source:
          "/property/urban-oasis-by-missoni-one-bedroom-apartment-with-pool-gym",
        destination:
          "/property/bnbme-luxurious-canal-view-apt-w-pool-gym-250822",
        permanent: true,
      },
      {
        source:
          "/property/damac-zada-tower-one-bedroom-apartment-with-swimming-pool-and-gym-1",
        destination:
          "/property/bnbmehomes-business-bay-beauty-nr-dubai-mall-242571",
        permanent: true,
      },
      {
        source:
          "/property/damac-zada-tower-one-bedroom-apartment-with-swimming-pool-and-gym",
        destination:
          "/property/bnbme-artistic-apt-near-dubai-canal-downtown-242572",
        permanent: true,
      },
      {
        source:
          "/property/al-murjan-tower-two-bedroom-apartment-with-swimming-pool-gym",
        destination:
          "/property/bnbmehomes-designer-interiors-with-marina-view-241448",
        permanent: true,
      },
      {
        source:
          "/property/anantara-south-residences-1-two-bedroom-apartment-with-beach-access-gym",
        destination:
          "/property/bnbme-beachfront-bliss-apt-in-anantara-resort-243843",
        permanent: true,
      },
      {
        source: "/property/anbar-tower-two-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbmehomes-marvellous-marina-gem-nr-ain-dubai-241435",
        permanent: true,
      },
      {
        source:
          "/property/blvd-heights-downtown-two-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbme-poolside-ultra-lavish-duplex-blvd-heights-241643",
        permanent: true,
      },
      {
        source: "/property/damac-towers-two-bedroom-apartment-with-pool-gym",
        destination: "/property/bnbme-249035",
        permanent: true,
      },
      {
        source: "/property/luxury-2br-downtown-dubai-apt-with-gym",
        destination:
          "/property/bnbme-luxury-2br-downtown-dubai-apt-with-gym-244551",
        permanent: true,
      },
      {
        source:
          "/property/gold-crest-views-2-two-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbmehomes-cozy-modern-jlt-suite-metro-nearby-241416",
        permanent: true,
      },
      {
        source: "/property/golf-tower-1-two-bedroom-apartment-with-gym-pool",
        destination:
          "/property/bnbme-stylish-apt-w-lake-golf-course-views-262167",
        permanent: true,
      },
      {
        source: "/property/miska-3-two-bedroom-apartment-with-pool",
        destination:
          "/property/bnbme-elegant-apt-w-gym---9-min-to-burj-khalifa-249062",
        permanent: true,
      },
      {
        source:
          "/property/noora-tower-two-bedroom-apartment-with-swimming-pool",
        destination:
          "/property/bnbme-noora-tower-s-gem-w-pool-business-bay-241599",
        permanent: true,
      },
      {
        source:
          "/property/ocean-heights-two-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbmehomes-54th-floor-sea-view-heart-of-marina-242508",
        permanent: true,
      },
      {
        source:
          "/property/oxford-terraces-two-bedroom-apartment-with-private-jacuzzi",
        destination:
          "/property/bnbme-modern-apt-nr-circle-mall-w-pvt-jacuzzi-255718",
        permanent: true,
      },
      {
        source:
          "/property/paramount-hotel-midtown-two-bedroom-apartment-with-pool",
        destination:
          "/property/bnbme-paramount-towers-hollywood-glamour-242509",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-modern-2-br-w-pvt-entrance-riyadh",
        destination:
          "/property/bnbmehomes-2br-posh-suite-nr-king-khalid-airport-233704",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-lux-2-br-in-al-malqa-riyadh",
        destination:
          "/property/bnbmehomes-spacious-serenity-nr-wonder-garden-233703",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-2b-lux-apt-al-malqa-riyadh",
        destination:
          "/property/bnbmehomes-2br-w-pvt-terrace-nr-kingdom-arena-233707",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-grand-2br-mins-to-blvd-city-kafd",
        destination:
          "/property/bnbmehomes-grand-2br-near-blvd-city-kafd-233718",
        permanent: true,
      },
      {
        source:
          "/property/bnbmehomes-luxurious-2br-mins-to-king-khalid-intl-airport-metro-station",
        destination:
          "/property/bnbmehomes-lux-2br-mins-to-king-k-intl-airport-233833",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-perfect-suite-near-metro-station",
        destination:
          "/property/bnbmehomes-perfect-suite-near-metro-station-233842",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-charming-2-br-apt-in-alyasmin-b10",
        destination:
          "/property/bnbmehomes-classy-home-mins-to-wonder-garden-233714",
        permanent: true,
      },
      {
        source:
          "/property/silverene-tower-two-bedroom-apartment-with-swimming-pool-gym",
        destination:
          "/property/bnbme-mesmerizing-canal-view-apt-in-dubai-marina-245594",
        permanent: true,
      },
      {
        source: "/property/the8-two-bedroom-apartment-with-beach-access-gym-1",
        destination:
          "/property/bnbmehomes-breathtaking-sea-views-w-pvt-beach-241645",
        permanent: true,
      },
      {
        source: "/property/the8-two-bedroom-apartment-with-beach-access-gym",
        destination:
          "/property/bnbme-beachfront-luxury-w-infinity-pool-on-palm-241601",
        permanent: true,
      },
      {
        source:
          "/property/t-ria-apartments-a-b-two-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbme-large-family-apt-near-mall-of-the-emirates-241581",
        permanent: true,
      },
      {
        source:
          "/property/damac-esclusiva-two-bedroom-apartment-with-maids-room",
        destination: "/property/bnbme---256551",
        permanent: true,
      },
      {
        source: "/property/damac-towers-two-bedroom-apartment-with-maid-s-room",
        destination:
          "/property/bnbme-suite-w-maid-s-room-nr-king-khalid-mosque-245224",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-comfort-stay-w-cinema-maid-room",
        destination:
          "/property/bnbmehomes-2br-lux-suite-with-cinema-maid-room-233727",
        permanent: true,
      },
      {
        source: "/property/alkhawaled-7-three-bedroom-apartment",
        destination: "/property/bnbme-kafd-255681",
        permanent: true,
      },
      {
        source:
          "/property/damac-towers-paramount-three-bedroom-apartment-with-pool-gym",
        destination:
          "/property/luxury-burj-views-3br-apartment-near-downtown-262760",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-3-br-lux-apt-al-qirawan-riyadh",
        destination:
          "/property/bnbmehomes-3br-suite-near-riyadh-park-kafd-233691",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-3br-suite-with-private-balcony",
        destination:
          "/property/bnbmehomes-3br-suite-with-private-balcony-233713",
        permanent: true,
      },
      {
        source: "/property/riviera-three-bedroom-apartment-near-riyadh-blvd",
        destination:
          "/property/bnbmehomes-suite-nr-boulevard-riyadh-city-236541",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-3br-with-pvt-rooftop-in-al-malqa",
        destination:
          "/property/bnbmehomes-3br-with-pvt-rooftop-in-al-malqa-233742",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-luxurious-3-br-haven-in-aqiq-riyadh",
        destination:
          "/property/bnbmehomes-3-br-elite-suite-near-kingdom-tower-233698",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-enjoy-fancy-decor-in-our-lux-stay",
        destination:
          "/property/bnbmehomes-enjoy-fancy-decor-in-our-lux-stay-233832",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-3br-w-pvt-terrace-nr-kingdom-arena",
        destination:
          "/property/bnbmehomes-3br-w-pvt-terrace-nr-kingdom-arena-233735",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-best-place-for-your-next-staycation",
        destination:
          "/property/bnbmehomes-best-place-for-your-next-staycation-233748",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-3br-suite-w-metro-nearby",
        destination: "/property/bnbmehomes-3br-suite-w-metro-nearby-233745",
        permanent: true,
      },
      {
        source: "/property/alajlan-riviera-5-three-bedroom-apartment",
        destination:
          "/property/bnbme-chic-3-br-oasis-near-boulevard-riyadh-city-247458",
        permanent: true,
      },
      {
        source:
          "/property/urbana-i-emaar-south-three-bedroom-apartment-with-gym-and-pool",
        destination:
          "/property/bnbmehomes-elegant-3br-near-al-maktoum-airport-242513",
        permanent: true,
      },
      {
        source:
          "/property/blvd-heights-downtown-three-bedroom-apartment-with-maid-s-room-swimming-pool",
        destination:
          "/property/bnbmehomes-duplex-in-dt-w-spacious-backyard-241444",
        permanent: true,
      },
      {
        source:
          "/property/burj-vista-tower-1-downtown-three-bedroom-apartment-with-maid-s-room-swimming-pool",
        destination:
          "/property/bnbme-lux-apt-with-fountain-burj-khalifa-views-252707",
        permanent: true,
      },
      {
        source:
          "/property/damac-waves-tower-b-three-bedroom-apartment-with-maid-s-room-canal-view",
        destination:
          "/property/elegant-3br-maid-s-breathtaking-marina-views-265294",
        permanent: true,
      },
      {
        source:
          "/property/forte-tower-2-three-bedroom-apartment-with-maid-s-room-gym-and-swimming-pool",
        destination:
          "/property/bnbmehomes-rare-haven-w-burj-view-opera-district-242522",
        permanent: true,
      },
      {
        source:
          "/property/grande-signature-residence-three-bedroom-apartment-with-maids-room-gym-pool",
        destination:
          "/property/bnbme-luxe-apt-w-stunning-burj-fountain-views-257064",
        permanent: true,
      },
      {
        source:
          "/property/grande-signature-residence-three-bedroom-apartment-with-maids-room-gym-pool-1",
        destination:
          "/property/bnbme-experience-luxury-w-burj-k-fountain-vws-266362",
        permanent: true,
      },
      {
        source:
          "/property/harbour-gate-tower-2-three-bedroom-apartment-with-maid-s-room-and-pool",
        destination:
          "/property/bnbme-serene-apt-in-creek-harbour-w-maid-s-room-244298",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-pvt-rooftop-bliss-with-maid-s-quarter",
        destination:
          "/property/bnbmehomes-3br-suite-w-pvt-terrace-maid-room-233721",
        permanent: true,
      },
      {
        source: "/property/bnbmehomes-cozy-stay-w-maid-room-nr-granada-mall",
        destination:
          "/property/bnbmehomes-cozy-stay-w-maid-room-nr-granada-mall-233728",
        permanent: true,
      },
      {
        source:
          "/property/ubora-towers-three-bedroom-apartment-with-maid-s-room-swimming-pool",
        destination:
          "/property/bnbmehomes-a-must-grab-deal-in-dt-w-maid-s-room-241596",
        permanent: true,
      },
      {
        source:
          "/property/murjan-6-four-bedroom-apartment-with-gym-swimming-pool",
        destination:
          "/property/bnbme-night-life-beach-access-in-jbr-sea-view-241428",
        permanent: true,
      },
      {
        source: "/property/sun-villa-four-bedroom-villa-with-gym-pool",
        destination:
          "/property/bnbme-luxe-villa-w-terrace-nr-global-village-265629",
        permanent: true,
      },
      {
        source:
          "/property/downtown-views-ii-four-bedroom-apartment-with-maid-s-room-swimming-pool",
        destination:
          "/property/bnbme-luxury-high-rise-x-burj-khalifa-views-258012",
        permanent: true,
      },
      {
        source:
          "/property/downtown-views-ii-four-bedroom-apartment-with-maid-s-room-swimming-pool-1",
        destination:
          "/property/bnbme-modern-high-rise-apt-w-burj-khalifa-views-264895",
        permanent: true,
      },
      {
        source:
          "/property/lamtara-2-four-bedroom-apartment-with-maid-s-room-pool",
        destination: "/property/bnbme-5min-burj-al-arab-5-secret-beach-249424",
        permanent: true,
      },
      {
        source: "/property/-2",
        destination: "/property/one-bedroom-apartment-228802",
        permanent: true,
      },
      {
        source:
          "/property/bayz-by-danube-properties-studio-apartment-with-gym-and-pool",
        destination:
          "/property/luxury-rooftop-pool-apt-in-vibrant-business-bay-242525",
        permanent: true,
      },
      {
        source: "/property/binghatti-lavender-studio-apartment-with-gym-pool",
        destination:
          "/property/bnbme-modern-studio-in-jvc-w-pool-city-view-257738",
        permanent: true,
      },
      {
        source:
          "/property/damac-hills-carson-tower-b-bellavista-tower-b-studio-apartment-with-gym-and-pool-1",
        destination:
          "/property/bnbmehomes-damac-hills-studio-w-city-view-241594",
        permanent: true,
      },
      {
        source:
          "/property/damac-hills-carson-tower-b-bellavista-tower-b-studio-apartment-with-gym-and-pool",
        destination: "/property/bnbmehomes-luxurious-st-apt-in-damac-241574",
        permanent: true,
      },
      {
        source: "/property/rare-find-on-the-palm-jumeirah",
        destination:
          "/property/bnbmehomes-rare-find-on-the-palm-jumeirah-241434",
        permanent: true,
      },
      {
        source:
          "/property/gold-crest-views-2-studio-apartment-with-gym-and-pool",
        destination:
          "/property/bnbme-chic-studio-in-jlt-nr-marina-w-pool-gym-252444",
        permanent: true,
      },
      {
        source: "/property/luma21-studio-apartment-with-gym-and-pool",
        destination:
          "/property/chic-artistic-studio-in-jvc-gym-rooftop-pool-265307",
        permanent: true,
      },
      {
        source: "/property/merano-tower-studio-apartment-with-gym-pool",
        destination:
          "/property/bnbmehomes-apt-in-business-bay---heart-of-dubai-242526",
        permanent: true,
      },
      {
        source: "/property/palm-views-west-studio-apartment-with-gym-and-pool",
        destination:
          "/property/bnbme-chic-studio-with-sea-view-nr-nakheel-mall-245850",
        permanent: true,
      },
      {
        source:
          "/property/palm-views-west-studio-apartment-with-gym-and-pool-1",
        destination:
          "/property/bnbme-chic-studio-in-palm-w-balcony-sea-views-266910",
        permanent: true,
      },
      {
        source: "/property/palm-view-west-studio-with-sea-view-gym-pool",
        destination:
          "/property/sea-view-luxury-studio-in-palm-near-nakheel-mall-257873",
        permanent: true,
      },
      {
        source: "/property/serenity-lakes-5-studio-with-swimming-pool-gym-1",
        destination:
          "/property/bnbme-luxe-studio-in-jvc-nr-circle-mall-w-pool-257872",
        permanent: true,
      },
      {
        source: "/property/the-palm-tower-studio-with-swimming-pool-gym",
        destination:
          "/property/bnbme-garden-dream-in-heart-of-palm-w-pool-bar-242528",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/city/saudi",
        destination: "/city/riyadh",
        permanent: true,
      },
      {
        source: "/public/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/blog/debunking-myths-about-holiday-homes",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
  // Custom HTTP Headers for Security and Caching
  async headers() {
    return [
      // Cache Control for Static Assets
      {
        source:
          "/:path*{.js,.css,.png,.jpg,.jpeg,.gif,.svg,.ico,.woff2,.woff,.ttf,.otf,.mp4,.webm,.wav,.mp3}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year caching
          },
        ],
      },
      // Security Headers
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self)", // Example: Allow geolocation only for the same origin
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
