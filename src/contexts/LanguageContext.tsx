// "use client";
// import React, { createContext, useState, useContext, useEffect } from "react";

// // Define Language Context
// interface LanguageContextProps {
//   language: "en" | "ar";
//   direction: "ltr" | "rtl";
//   setLanguage: (lang: "en" | "ar") => void;
// }

// // Create Context
// const LanguageContext = createContext<LanguageContextProps | undefined>(
//   undefined
// );

// export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [language, setLanguage] = useState<"en" | "ar">("en");
//   const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

//   // Handle language change
//   const handleLanguageChange = (lang: "en" | "ar") => {
//     setLanguage(lang);
//     setDirection(lang === "ar" ? "rtl" : "ltr");
//     document.documentElement.lang = lang;
//     document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
//   };

//   // Load saved language preference
//   useEffect(() => {
//     const savedLang = localStorage.getItem("language") as "en" | "ar";
//     if (savedLang) handleLanguageChange(savedLang);
//   }, []);

//   return (
//     <LanguageContext.Provider
//       value={{ language, direction, setLanguage: handleLanguageChange }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // Custom hook
// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useLanguage must be used within a LanguageProvider");
//   }
//   return context;
// };
