// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import React from "react";
// import { countries } from "../../../../../data/country";

// export const CountryDropdown: React.FC<{
//   open: boolean;
//   handleToggle: () => void;
// }> = ({ open, handleToggle }) => {
 
//   const dropdownVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.95,
//       y: -10,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.2,
//         ease: "easeInOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.95,
//       y: -10,
//       transition: {
//         duration: 0.2,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const selectedLanguage = countries.find((opt) => opt.code === language);
//   return (
//     <div
//       className="flex cursor-pointer items-center relative"
//       onClick={handleToggle}>
//       <Image
//         width={50}
//         height={50}
//         src={selectedLanguage?.icon || ""}
//         alt="Selected Language"
//         className="h-4 w-6 object-cover"
//       />
//       {open && (
//         <motion.div
//           className="bg-white rounded-md shadow-lg text-gray-800 w-48 -translate-x-1/2 absolute right-0 top-8 transform z-50"
//           variants={dropdownVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit">
//           {countries.map((option, index) => (
//             <div
//               key={index}
//               className="flex border-b border-gray-200 cursor-pointer gap-4 hover:bg-gray-100 items-center last:border-1 px-4 py-5"
//               onClick={() => setLanguage(option.code as "en" | "ar")}>
//               <Image
//                 width={30}
//                 height={30}
//                 src={option.icon}
//                 alt={`${option.label} flag`}
//                 className="h-3 w-5 object-cover"
//               />
//               <span className="text-sm">{option.label}</span>
//             </div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };
