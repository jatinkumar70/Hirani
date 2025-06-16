"use client";

import { MapPin, Heart, Bed, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <h1 className="text-[#2D3648] text-4xl font-normal mb-4">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Address Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className=" items-start">
            <MapPin size={34} className="text-[#2D3648] mb-4 mr-2" />
            <div>
              <h2 className="text-[#D4AF37] text-3xl font-medium mb-2">
                Address
              </h2>
              <p className="text-gray-600 text-sm">
                Prime Business Centre - B-1602
                <br />
                قرية جميرا الدائرية - Dubai - United Arab Emirates
              </p>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className=" items-start">
            <Heart size={34} className="text-[#2D3648] mb-4 mr-2" />
            <div>
              <h2 className="text-[#D4AF37] text-3xl font-medium mb-2">
                Support
              </h2>
              <p className="text-gray-600 text-sm">
                wecare@bnbme.me
                <br />
                Available 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Reservation Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className=" items-start">
            <Bed size={34} className="text-[#2D3648] mb-4 mr-2" />
            <div>
              <h2 className="text-[#D4AF37] text-3xl font-medium mb-2">
                Reservation Request
              </h2>
              <p className="text-gray-600 text-sm">
                reservations@bnbme.me
                <br />
                Available 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className=" items-start">
            <Phone size={34} className="text-[#2D3648] mb-4 mr-2" />
            <div>
              <h2 className="text-[#D4AF37] text-3xl font-medium mb-2">
                Contact Info
              </h2>
              <p className="text-gray-600 text-sm">
                800BNBME(26263)
                <br />
                Call: Mon. to Fr. 9AM-7PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[#2D3648] text-4xl font-normal mb-6">
          Find Us Here
        </h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57832.99570166994!2d55.173720285588054!3d25.048926306928994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6dce28555555%3A0x6a1b1da39029baa6!2sPrime%20Business%20Centre!5e0!3m2!1sen!2sin!4v1745391951257!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  );
}
