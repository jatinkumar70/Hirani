"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Hero from "../../../asserts/img/10.webp";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Button } from "../../components/ui/Button/Button";
import Link from "next/link";

export default function ConnectWithUsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <Image
        src={Hero.src}
        alt="Luxury Hotel Pool"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col md:flex-row">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          {/* Back Button - Moved outside the sections for proper z-index */}

          {/* Logo and Text */}
          <h1 className="text-white text-center lg:text-left text-3xl md:text-5xl font-semibold mb-4 lg:mt-8 md:mt-0">
            bnbme
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            <h1 className="text-white text-4xl lg:text-6xl font-semibold lg:font-normal mb-4">
              Find a place to stay
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/3 lg:bg-black/60 py-4 flex items-center justify-center">
          <div className="w-full h-full space-y-6 px-4 lg:p-8 lg:backdrop-blur-sm">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white hidden lg:flex items-center gap-4 hover:opacity-80 transition-opacity z-50">
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4">
              <h2 className="text-white text-4xl hidden lg:block lg:mt-[20%] text-center font-semibold mb-8">
                Register
              </h2>

              <Button className="w-full bg-white text-gray-800 font-semibold py-6 px-4 rounded-lg hover:bg-white/90 transition-colors">
                <Link className="text-xl" href="/register">
                  Register with email
                </Link>
              </Button>

              <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-white/60">Or</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>

              <Button className="w-full bg-white text-gray-800 font-semibold py-6 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                <FcGoogle size={20} />
                Continue with Google
              </Button>

              <Button className="w-full bg-black text-white font-semibold py-6 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-black/90 transition-colors border border-white/20">
                <FaApple size={20} />
                Continue with Apple
              </Button>

              <Button className="w-full bg-[#1877F2] text-white font-semibold py-6 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1877F2]/90 transition-colors">
                <FaFacebook size={20} />
                Continue with Facebook
              </Button>

              <p className="text-center text-white/80 text-sm mt-6">
                I already have an account.{" "}
                <Link
                  href="/login"
                  className="text-white underline hover:text-white/80 transition-colors">
                  Log in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
