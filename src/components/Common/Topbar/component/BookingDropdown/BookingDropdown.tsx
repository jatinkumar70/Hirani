"use client";
import React from "react";
import { currencies } from "../../../../../data/currency";
import { motion } from "framer-motion";
interface BookingDropdownProps {
  open: boolean;
  handleToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  motionDropdownVariants?: any;
}

export const BookingDropdown: React.FC<BookingDropdownProps> = (props) => {
  const { open, handleToggle, motionDropdownVariants } = props;
  const [selectedCurrency, setSelectedCurrency] = React.useState({
    symbol: "$",
    label: "US Dollars",
  });
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,

      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div
      className="flex cursor-pointer items-center relative"
      onClick={handleToggle}>
      <span className="text-md text-white">{selectedCurrency.symbol}</span>
      {open && (
        <motion.div
          className="bg-white rounded-md shadow-lg text-gray-800 text-md w-48 -right-3 -translate-x-1/2 absolute top-10 transform z-50"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          {currencies.map((currency, index) => (
            <div
              key={index}
              className="flex border-b border-gray-200 cursor-pointer hover:bg-gray-100 items-center last:border-1 px-4 py-4"
              onClick={() => {
                setSelectedCurrency(currency);
                !open;
              }}>
              <span className="mr-4">{currency.symbol}</span>
              <span className="text-sm">{currency.label}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
