/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowRight,
  ChevronDown,
  Home,
  MapPin,
  ShoppingCart,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdCallReceived } from "react-icons/md";
import { Images } from "../../../asserts/Import/Images";
import { Button } from "../ui/Button/Button";
import { countries } from "../../data/country";

type MenuIcons = {
  [key in
    | "Home"
    | "Dubai"
    | "Riyadh"
    | "London"
    | "Contact"
    | "Shop"]: React.ReactElement;
};

export const Sidebar: React.FC<{ open: boolean; onToggle: () => void }> = ({
  open,
  onToggle,
}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false); // State for the modal
  const [selectedLanguage, setSelectedLanguage] = useState(countries[0]); // Default language

  const isRouteActive = (href: string) => router.pathname === href;

  const menuIcons: MenuIcons = {
    Home: <Home className="text-primary" />,
    Dubai: <MapPin className="text-primary" />,
    Riyadh: <MapPin className="text-primary" />,
    London: <MapPin className="text-primary" />,
    Contact: <MdCallReceived className="text-primary" />,
    Shop: <ShoppingCart className="text-primary" />,
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleLanguageChange = (country: (typeof countries)[0]) => {
    setSelectedLanguage(country);
    setModalOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform z-[1000]  ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 w-full`}>
      {/* Logo Section */}
      <div className="flex items-center px-3 py-4 bg-primary gap-28">
        <button onClick={onToggle} aria-label="Close menu">
          <X size={35} className="text-gray-800" />
        </button>
        <Link
          href="/"
          className="text-white font-bold text-xl flex items-center gap-2">
          <Image
            width={130}
            height={50}
            title="Company_logo"
            src={"/img/logos/logo_black.webp"}
            alt={"Company_logo"}
          />
        </Link>
      </div>
      {/* Menu Items */}
      <nav className="flex flex-col justify-between h-[90%]">
        {/* Top Menu Items */}
        <div className="flex flex-col gap-2">
          <Link href="/" passHref>
            <div
              className={`flex items-center gap-4 px-3 py-4 cursor-pointer text-xl font-semibold ${
                isRouteActive("/") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={onToggle}>
              {menuIcons.Home}
              <span className="text-gray-700">Home</span>
            </div>
          </Link>
          <div
            className={`flex items-center gap-4 px-3 py-4 cursor-pointer text-xl font-semibold ${
              isRouteActive("/dubai") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={onToggle}>
            {menuIcons.Dubai}
            <span className="text-gray-700">Dubai</span>
          </div>
          <div
            className={`flex items-center gap-4 px-3 py-4 cursor-pointer text-xl font-semibold ${
              isRouteActive("/riyadh") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={onToggle}>
            {menuIcons.Riyadh}
            <span className="text-gray-700">Riyadh</span>
          </div>
          <div
            className={`flex items-center gap-4 px-3 py-4 cursor-pointer text-xl font-semibold ${
              isRouteActive("/london") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={onToggle}>
            {menuIcons.London}
            <span className="text-gray-700">London</span>
          </div>
        </div>

        {/* Bottom Menu Items */}
        <div className="flex flex-col gap-3">
          <Link href={"/bnbme-your-homes"}>
            <Button
              className="w-auto text-xl px-3 text-gray-800 mt-2 flex items-center justify-between"
              size="lg">
              Bnbme your home
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>

          <div>
            <div
              className={`flex items-center justify-between gap-4 px-3 py-4 cursor-pointer text-xl font-semibold`}>
              <span className="text-gray-700">Language</span>

              {/* Open Modal Button */}
              <Button
                variant={"outline"}
                className="w-80 text-lg border px-0 gap-4 p-6 border-gray-800 text-gray-800 mt-2 flex items-center justify-between"
                size="lg"
                onClick={toggleModal}>
                <span className="flex items-center gap-2">
                  <Image
                    width={30}
                    height={30}
                    src={selectedLanguage.icon}
                    alt={`${selectedLanguage.label}-flag`}
                    className="w-10 h-6 mr-2"
                  />
                  {selectedLanguage.label}
                </span>

                <ChevronDown size={25} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h2 className="text-xl font-semibold mb-4">Select Language</h2>
            <div className="flex flex-col gap-2">
              {countries.map((country) => (
                <div
                  key={country.label}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => handleLanguageChange(country)}>
                  <img
                    src={country.icon}
                    alt={country.label}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">{country.label}</span>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 w-full"
              size="lg"
              variant="outline"
              onClick={toggleModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};
