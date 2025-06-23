"use client";

import { MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Images } from "../../../../asserts/Import/Images";
import { LogoIcon } from "../../../common/Logo/LogoIcon";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import { cn } from "../../../lib/utils";
import { SearchBar } from "../../NewSearchComp/search-bar";
import { Button } from "../../ui/Button/Button";
import NewSidebar from "../NewSidebar/NewSidebar";
import { UserDropdown } from "../Topbar/component/UserDropDown/UserDropDown";

export default function Topbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { user, logout } = useAuth();
  const isHotelPage = pathname?.startsWith("/search");
  const [dropdownOpen, setDropdownOpen] = useState({
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

  // Handle scroll events with requestAnimationFrame for better performance
  useEffect(() => {
    let animationFrame: number;

    const handleScroll = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const scrollThreshold = 50;
        const isScrolled = window.scrollY > scrollThreshold;

        // Only update if there's a change to prevent unnecessary renders
        if (!searchExpanded && !activeSection && isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      });
    };

    // For property pages, initialize as scrolled to show compact mode first
    if (isHotelPage) {
      setScrolled(true);
    } else {
      // For home page, check initial scroll position
      const initialScrolled = window.scrollY > 50;
      setScrolled(initialScrolled);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [activeSection, isHotelPage, scrolled, searchExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight * 0.09;
      setScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Remove other dependencies to prevent re-running

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
      setTimeout(() => {
        // Use animation frame for smoother state changes
        requestAnimationFrame(() => {
          setSearchExpanded(false);

          // Always ensure scrolled is true after closing search to show compact bar
          setScrolled(true);
        });
      }, 120);
    }
  };

  useEffect(() => {
    // Only auto-advance to checkOut if the user hasn't manually closed the search
    if (activeSection === false && checkIn && searchExpanded) {
      setActiveSection(false);
    }
  }, [checkIn, searchExpanded]);

  return (
    <>
      {/* Full screen overlay when search is expanded */}
      {searchExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => closeSearch()}
        />
      )}

      <header
        ref={navbarRef}
        className={cn(
          "bg-gray-100 fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 ease-out will-change-transform",
          searchExpanded
            ? "h-auto shadow-xl"
            : scrolled
              ? "h-auto shadow-md"
              : "h-auto"
        )}>
        <div
          className={cn(
            "bg-gray-100 py-0 transition-all duration-300 ease-out",
            scrolled || searchExpanded ? "shadow-lg" : "shadow-none"
          )}>
          <div className="w-full px-1 py-2.5 mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-gray-700 hover:text-gray-900 lg:hidden mr-4"
                onClick={() => setSidebarOpen((prev) => !prev)}>
                {sidebarOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
                <span className="sr-only">Menu</span>
              </button>

              <LogoIcon width={80} height={50} src={Images.Logo.src} />
            </div>

            <div
              className={cn(
                "hidden lg:flex items-center gap-4 relative -right-[24%] -translate-x-1/2 transition-all duration-300",
                !isHotelPage
                  ? "opacity-100"
                  : scrolled && !searchExpanded && showSearch
                    ? "opacity-0"
                    : "opacity-100"
              )}>
              {["Dubai", "Riyadh"].map((city) => (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase()}`}
                  className="flex text-white text-sm font-medium gap-2 hover:text-primary items-center">
                  <MapPin size={20} />
                  <span>{city}</span>
                </Link>
              ))}
            </div>

            <div className="flex gap-6 items-center">
              {pathname === "/bnbme-your-home" ? (
                <Button
                  className="bg-green-500 text-white w-auto hover:bg-green-600"
                  size="sm">
                  <FaWhatsapp className="h-6 w-6 mr-2" />
                  800bnbme
                </Button>
              ) : (
                <span
                  className="text-gray-100 text-md cursor-pointer font-medium hidden lg:inline-block"
                  onClick={handleRoute}>
                  bnbme your home
                </span>
              )}
              <UserDropdown
                handleToggle={() => handleToggleDropdown("user")}
                open={dropdownOpen.user}
                isUser={user}
                handleSignOut={logout}
                isColor={false}
              />
            </div>
          </div>

          {showSearch && (
            <div
              className={cn(
                "flex items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform overflow-visible",
                searchExpanded && (!scrolled || searchExpanded)
                  ? "max-h-[300px] opacity-100 transform translate-y-0"
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
                  "hidden lg:flex transition-all mr-auto duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                  (scrolled && !searchExpanded) ||
                    (pathname !== "/" && pathname !== "/search")
                    ? "opacity-100 transform -translate-y-0  scale-100"
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
          searchExpanded ? "pt-[200px]" : scrolled ? "pt-[80px]" : "pt-[120px]"
        )}
      />
    </>
  );
}
