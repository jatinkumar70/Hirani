"use client";

import React, { useState } from "react";
import { PropertyOwnerFaqs, GuestFaqs } from "../../data/FaqData";
import { ChevronDown, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../../components/ui/Dialog/Dialog";
import { Input } from "../../components/ui/Input/Input";
import { usePathname } from "next/navigation";

const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pathname = usePathname(); // 👈 Get the current path
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="container lg:w-2/3 mt-5 lg:mt-0 w-full mx-auto p-4 rounded-lg">
      <h2 className="text-4xl py-6 font-normal text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>
      <h3 className="text-2xl font-medium text-gray-600 mb-8  pb-4">
        Property Owner FAQs
      </h3>
      <ul className="space-y-4 mb-12">
        {PropertyOwnerFaqs.map((faq) => (
          <li key={faq.id} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full text-left flex justify-between items-center text-lg font-normal text-[#A89160] transition duration-300 hover:text-[#9E7F43]">
              {faq.question}
              <span
                className={`text-gray-500 transform transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""
                  }`}>
                <ChevronDown />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === faq.id ? "max-h-40" : "max-h-0"
                }`}>
              <p className="my-10 font-light text-gray-600">{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>

      {pathname !== "/bnbme-your-home" && (
        <>
          {" "}
          <h3 className="text-2xl font-medium text-gray-600 mb-8  pb-4">
            Guest FAQs
          </h3>
          <ul className="space-y-4">
            {GuestFaqs.map((faq) => (
              <li key={faq.id} className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left flex justify-between items-center text-lg font-normal text-[#A89160] transition duration-300 ">
                  {faq.question}
                  <span
                    className={`text-gray-500 transform transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""
                      }`}>
                    <ChevronDown />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === faq.id ? "max-h-40" : "max-h-0"
                    }`}>
                  <p className="my-10 font-light text-gray-600">{faq.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FAQ;
