"use client";

import { useEffect } from "react";
import {
  X,
  MapPin,
  Home,
  Search,
  Calendar,
  Info,
  Phone,
  Settings,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { LogoIcon } from "../../../common/Logo/LogoIcon";
import { Images } from "../../../../asserts/Import/Images";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSidebar({ isOpen, onClose }: SidebarProps) {
  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "z-[1000] fixed top-0 left-0 bottom-0 w-[300px] bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        <div className="flex flex-col h-auto z-[1000]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center" onClick={onClose}>
              <LogoIcon width={120} height={50} src={Images.LogoGold.src} />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-7 w-7" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                onClick={onClose}>
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <div className="pt-2 pb-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                  Locations
                </div>
                <Link
                  href="/city/dubai"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <MapPin className="h-5 w-5" />
                  <span>Dubai</span>
                </Link>
                <Link
                  href="/city/riyadh"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <MapPin className="h-5 w-5" />
                  <span>Riyadh</span>
                </Link>
                <Link
                  href="/city/london"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <MapPin className="h-5 w-5" />
                  <span>London</span>
                </Link>
              </div>

              <div className="pt-2 pb-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                  Booking
                </div>
                <Link
                  href="/search"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </Link>
                {/* <Link
                  href="/calendar"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </Link> */}
              </div>

              <div className="pt-2 pb-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                  More
                </div>
                <Link
                  href="/about-us"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <Info className="h-5 w-5" />
                  <span>About Us</span>
                </Link>

                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md"
                  onClick={onClose}>
                  <LogIn className="h-5 w-5" />
                  <span>Log in / Sign up</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex flex-col gap-4">
            <Link
              href="/bnbme-your-home"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-dark-gold text-white rounded-md hover:bg-dark-gold transition-colors"
              onClick={onClose}>
              <Home className="h-5 w-5" />
              <span>bnbme your home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
