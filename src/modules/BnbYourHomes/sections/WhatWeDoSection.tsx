import React from 'react';
import ServiceCard from '../Component/ServiceCard';
import prop3 from '../../../../asserts/bnb-icons/prop3.webp';
import prop8 from '../../../../asserts/bnb-icons/prop8.png';
import prop4 from '../../../../asserts/bnb-icons/prop4.webp';

const WhatWeDoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4">What does <span className="text-[#D4B779]">bnbme</span> do?</h2>
        </div>

        <div className="max-w-7xl text-center mx-auto mb-12">
          <p className="text-center text-xl text-gray-700 leading-relaxed">
            We are a <span className="text-[#D4B779] font-medium">leading property management company</span> in Dubai specializing in short-term rentals. If you are a property owner looking for a professional and experienced <span className="text-[#D4B779] font-medium">short-term rental management company</span> in Dubai, then bnbme holiday homes is the right choice for you. We offer a comprehensive range of services to help you maximize your rental income and ensure guest satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Market"
            image={prop8.src}
            features={[
              'We market on 100+ online travel agent websites',
              'VIP Travel Agents and Concierge Services',
              'Screening of Guests',
              'Dynamic Pricing Algorithm'
            ]}
          />

          <ServiceCard
            title="Maintain"
            image={prop4.src}
            features={[
              'Housekeeping',
              '4 PPM (Planned Preventive Maintenance)',
              'Regular Deep Cleaning',
              'Pest Control'
            ]}
          />

          <ServiceCard
            title="Manage"
            image={prop3.src}
            features={[
              'Regular guest walk with DTCM',
              'Personalized Check-in',
              'Liaise with Local Vendors',
              'WOW Guest Experience',
              'Well-Trained Management',
              'Linen Management & Inventory Control'
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;