"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building, Hotel, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button/Button";
import bg from "../../../asserts/bni/bni-banner.webp";

export default function BniLandingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [userIp, setUserIp] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referral = searchParams.get("referral");

  //* Function to get user IP address
  const getUserIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return null;
    }
  };

  //* Function to track BNI clicks
  const trackBniClick = async (
    type: string | null = null,
    ip: string | null = null
  ) => {
    try {
      const payload = {
        bni_clicks_uuid: "",
        ip: ip,
        type,
        referral: referral || null,
        status: "ACTIVE",
      };

      //* Fire and forget - don't await the response
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/dataManagement/upsert-bni-click`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      //* Just log the error but don't interrupt user flow
      console.error("Error tracking BNI click:", error);
    }
  };

  useEffect(() => {
    //* Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);

    //* Get user IP and track initial page visit
    const initTracking = async () => {
      try {
        const ip = await getUserIp();
        setUserIp(ip);

        //* Only track if we successfully got an IP
        if (ip) {
          //* Track initial page visit with the IP we just retrieved
          trackBniClick("BniHomepage", ip);
        } else {
          console.error("Could not retrieve IP address for tracking");
        }
      } catch (error) {
        console.error("Error in initial tracking:", error);
      }
    };

    initTracking();

    return () => clearTimeout(timer);
  }, []);

  const handleReservation = () => {
    trackBniClick("Make a Reservation", userIp);
    router.push("/");
  };

  const handleListProperty = () => {
    trackBniClick("List Your Property", userIp);
    router.push("/bnbme-your-home/?referral=bni");
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background video or image */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={bg.src || "/placeholder.svg"}
          alt="Luxury Hotel Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-primary-gold">bnbme</span> Holiday Homes
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl font-medium mx-auto">
            Where luxury meets leisure – holiday homes tailored to your taste
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
            className="relative z-10 bg-gradient-to-b from-primary-gold via-primary-gold to-primary-gold p-1 rounded-xl max-w-md w-full overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute -inset-[100px] blur-3xl opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary-gold" />
                <div className="absolute top-1/4 right-1/4 w-60 h-60 rounded-full text-primary-gold" />
                <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full text-primary-gold" />
              </div>
            </div>

            <div className="relative bg-white backdrop-blur-sm rounded-lg p-6 border border-white/40">
              <div className="absolute top-3 right-3">
                <Sparkles className="h-5 w-5 text-primary-gold" />
              </div>

              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold flex items-center justify-center">
                  <Hotel className="h-8 w-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-black mb-2">
                Welcome to bnbme
              </h2>
              <p className="text-gray-700 text-center mb-6">
                What brings you to bnbme today?
              </p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}>
                <Button
                  onClick={handleReservation}
                  className="w-full py-6 bg-gradient-to-r from-primary-gold to-primary-gold hover:from-primary-gold hover:to-primary-gold text-white font-medium border-none">
                  <Hotel className="mr-2 h-5 w-5" />
                  Make a Reservation
                </Button>

                <Button
                  onClick={handleListProperty}
                  variant="outline"
                  className="w-full py-6 bg-transparent border border-primary-gold text-black hover:bg-primary-gold hover:text-white">
                  <Building className="mr-2 h-5 w-5" />
                  List Your Property
                </Button>
              </motion.div>

              <div className="mt-6 pt-4 border-t border-amber-700/30 text-center">
                <p className="text-black text-sm">Holiday Homes by Hoteliers</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
