"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Input } from "../ui/Input/Input"

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export const CallBackForm=()=> {
  const [contactPreference, setContactPreference] = useState<"phone" | "email">("phone")

  return (
    <div className=" w-full bg-gray-50 flex  justify-end">
      <motion.div
        className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1 className="text-3xl font-semibold text-center mb-6" variants={item}>
          Request a call back
        </motion.h1>

        <motion.form
          className="space-y-4"
          variants={item}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your name
            </label>
            <div className="mt-1 border border-black rounded-md">
              <Input
              type="text"
              id="name"
              required
              // className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
            />
            </div>
            
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <div className="mt-1 border border-black rounded-md">
              <Input
              type="email"
              id="email"
              required
              // className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
            />
            </div>
            
            <p className="text-xs text-gray-500">We will send you the confirmation in your email.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone number
            </label>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white pl-9 pr-2 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                  defaultValue="+44"
                >
                  <option value="+44">+44</option>
                  <option value="+1">+1</option>
                  <option value="+33">+33</option>
                </select>
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Image
                    src="https://v0.dev/placeholder.svg"
                    alt="UK flag"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                </div>
              </div>
              <div className="border border-black rounded-md">
                <Input
                type="tel"
                id="phone"
                required
                // className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
              />
              </div>
              
            </div>
            <p className="text-xs text-gray-500">Use the phone number you would like us to contact you in</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Property location
            </label>
            <select
              id="location"
              required
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 appearance-none bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select location
              </option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="birmingham">Birmingham</option>
              <option value="leeds">Leeds</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="phone-preference"
                name="contact-preference"
                className="w-4 h-4 border-gray-300 text-gray-800 focus:ring-black"
                checked={contactPreference === "phone"}
                onChange={() => setContactPreference("phone")}
              />
              <label htmlFor="phone-preference" className="text-sm">
                I prefer to be contacted by phone
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="email-preference"
                name="contact-preference"
                className="w-4 h-4 border-gray-300 text-gray-800 focus:ring-black"
                checked={contactPreference === "email"}
                onChange={() => setContactPreference("email")}
              />
              <label htmlFor="email-preference" className="text-sm">
                I prefer to be contacted by email
              </label>
            </div>
          </div>

          <motion.div className="mt-6" variants={item}>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}

