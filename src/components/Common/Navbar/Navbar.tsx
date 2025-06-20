"use client";

import { MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Images } from "../../../../asserts/Import/Images";
import { LogoIcon } from "../../../common/Logo/LogoIcon";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/Button/Button";
import NewSidebar from "../NewSidebar/NewSidebar";
import { UserDropdown } from "../Topbar/component/UserDropDown/UserDropDown";
import { SearchBar } from "../../NewSearchComp/search-bar";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { user, logout } = useAuth();
  const currentRouter = pathname;
  const isHotelPage = pathname?.startsWith("/property/");
  const [dropdownOpen, setDropdownOpen] = useState<{
    currency: boolean;
    country: boolean;
    user: boolean;
  }>({
    currency: false,
    country: false,
    user: false,
  });
  const showSearch = pathname === "/" || isHotelPage;
  const navbarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<boolean>(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);

  const handleToggleDropdown = (type: "currency" | "country" | "user") => {
    setDropdownOpen((prev) => ({
      currency: type === "currency" ? !prev.currency : false,
      country: type === "country" ? !prev.country : false,
      user: type === "user" ? !prev.user : false,
    }));
  };

  // Handle scroll events with throttling for better performance
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollThreshold = 50;
          const isScrolled = lastScrollY > scrollThreshold;

          // Only update if there's a change to prevent unnecessary renders
          if (!searchExpanded && !activeSection && isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // For property pages, initialize as scrolled to show compact mode first
    if (isHotelPage && !searchExpanded) {
      setScrolled(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchExpanded, activeSection, scrolled, isHotelPage]);

  // Close expanded search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchExpanded &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        // Only close the active section, but keep the search expanded
        closeSearch(false);
      }
    };

    if (searchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchExpanded]);

  const handleRoute = () => {
    window.location.href = "/bnbme-your-home";
  };

  const handleCompactSearchClick = () => {
    // Immediately set scrolled to false for a smoother transition
    setScrolled(false);

    // Use a single animation frame for better performance
    requestAnimationFrame(() => {
      setSearchExpanded(true);

      // Set active section with a slight delay for a sequential feel
      setTimeout(() => {
        setActiveSection(true);
      }, 150);
    });
  };

  const closeSearch = (collapseSearch = true) => {
    // First, reset the active section
    setActiveSection(false);

    if (collapseSearch) {
      // Use a slight delay before collapsing for a more elegant transition
      const timer = setTimeout(() => {
        setSearchExpanded(false);

        // Restore scrolled state based on actual scroll position
        const scrollThreshold = 50;
        setScrolled(window.scrollY > scrollThreshold);

        clearTimeout(timer);
      }, 120);
    }
  };

  useEffect(() => {
    // Only auto-advance to checkOut if the user hasn't manually closed the search
    if (activeSection === false && checkIn && searchExpanded) {
      setActiveSection(false);
    }
  }, [checkIn, searchExpanded, activeSection]);

  const cityLinks = useMemo(() => {
    return ["North India", "North East"].map((city) => (
      <Link
        key={city}
        href={`/city/${city.toLowerCase()}`}
        className="flex text-gray-700 text-sm font-medium gap-2 hover:text-primary items-center">
        <MapPin size={20} />
        <span>{city}</span>
      </Link>
    ));
  }, []);

  return (
    <>
      {/* Full screen overlay when search is expanded */}
      {searchExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => closeSearch()}
          aria-hidden="true"
        />
      )}

      <header
        ref={navbarRef}
        className={cn(
          "bg-white fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 ease-out",
          searchExpanded
            ? "h-auto shadow-xl"
            : scrolled
              ? "h-auto shadow-md"
              : "h-auto"
        )}>
        <div
          className={cn(
            "bg-white py-0 transition-all duration-300 ease-out",
            scrolled || searchExpanded ? "shadow-lg" : "shadow-none"
          )}>
          <div
            className={`${isHotelPage
              ? "w-full max-w-[1200px] mx-auto px-4 py-2 mt-2"
              : "w-full max-w-screen-xl md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto px-6 lg:px-10 py-2 mt-2"
              } flex items-center justify-between`}>
            <div className="flex items-center">
              <button
                className="text-gray-700 hover:text-gray-900 lg:hidden mr-4"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-expanded={sidebarOpen}
                aria-label="Toggle navigation menu">
                {sidebarOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
                <span className="sr-only">Menu</span>
              </button>

              <LogoIcon width={80} height={50} src={Images.LogoGold.src} />
            </div>

            <div
              className={cn(
                "hidden lg:flex items-center gap-4 ml-12 transition-all duration-300",
                // Hide cityLinks when searchbar is in compact mode (scrolled) but show when search is expanded
                scrolled && showSearch && !searchExpanded
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              )}>
              {cityLinks}
            </div>

            <div className="flex gap-6 items-center">
              {/* {currentRouter === "/bnbme-your-home" ? (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/971504522981">
                  <Button
                    className="bg-green-500 hidden lg:flex items-center text-white w-auto hover:bg-green-600"
                    size="sm">
                    <FaWhatsapp className="h-6 w-6 mr-2" />
                    800bnbme
                  </Button>
                </Link>
              ) : ( */}
              <span
                className="text-gray-700 text-md cursor-pointer font-medium hidden lg:inline-block"
                onClick={handleRoute}>
                H & RA Northern India
              </span>
              {/* )} */}
              <UserDropdown
                handleToggle={() => handleToggleDropdown("user")}
                open={dropdownOpen.user}
                isUser={user}
                handleSignOut={logout}
                isColor={true}
              />
            </div>
          </div>

          {showSearch && (
            <div
              className={cn(
                "transition-all duration-400 ease-out overflow-visible",
                !scrolled || searchExpanded
                  ? "max-h-[300px] opacity-100 transform translate-y-2"
                  : "max-h-0 opacity-0 transform translate-y-[-20px] pointer-events-none"
              )}>
              <SearchBar
                className="mt-4 mb-4"
                variant="default"
                initialSection={activeSection ? "location" : null}
                onSearch={(searchParams) => {
                  setActiveSection(false);
                }}
              />
            </div>
          )}

          {showSearch && (
            <div
              onClick={handleCompactSearchClick}
              className="w-full flex justify-center">
              <SearchBar
                scrolled={scrolled && !searchExpanded}
                isActivePage={isHotelPage}
                className={cn(
                  "hidden lg:flex transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                  (scrolled && !searchExpanded) ||
                    (pathname !== "/" && pathname === "/property/[slug]")
                    ? "opacity-100 transform -translate-y-0 scale-100"
                    : "opacity-0 transform translate-y-5 scale-98 pointer-events-none absolute"
                )}
              />
            </div>
          )}
        </div>
      </header>

      <NewSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Add padding to account for the expanded navbar height */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          searchExpanded
            ? "pt-[200px]"
            : scrolled
              ? "pt-[80px]"
              : isHotelPage || pathname === "/"
                ? "pt-[140px]"
                : "pt-[70px]"
        )}
      />
    </>
  );
}
