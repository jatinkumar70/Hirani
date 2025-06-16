/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/Button/Button';

const HeroImageSection = () => {
  return (
    <section className="relative py-4 sm:py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="rounded-xl h-[40vh] sm:h-[50vh] md:h-[60vh] mx-2 sm:m-8 overflow-hidden relative">
          <img
            src="https://v1.bnbmehomes.com/assets/img/home_slider/WhatsApp.jpeg"
            alt="Dubai skyline at sunset"
            className="w-full h-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:pl-12 bg-black/20">
            <p className="text-white text-2xl sm:text-3xl font-normal mb-4 sm:mb-6">
              A legendary welcome, every time
            </p>
            <div>
              <Link href="/">
                <Button className="bg-[#D4B779] px-4 text-white text-md font-bold rounded-3xl hover:bg-[#c4a86c] transition-colors">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImageSection;