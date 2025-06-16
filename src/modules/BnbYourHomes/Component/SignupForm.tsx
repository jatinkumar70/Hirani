"use client";

/* eslint-disable @next/next/no-img-element */
import type React from "react";
import { useState, useEffect } from "react";
import { countries } from "../../../constants/flags";
import axios from "axios";
import { apiBaseurl } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface SignUpFormProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  referral: string | null;
}

export const SignUpForm = ({
  isSubmitted,
  setIsSubmitted,
  referral,
}: SignUpFormProps) => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
    property_location: "",
    referralCode: referral || "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
  });
  const [userIp, setUserIp] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageReferral = searchParams.get("referral");

  // Reset form when isSubmitting changes from true to false
  useEffect(() => {
    if (!isSubmitting) {
      resetForm();
    }
  }, [isSubmitting]);

  //* Function to get user IP address
  const getUserIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return null;
    }
  };

  //* Function to track BNI clicks
  const trackBniClick = async (
    type: string | null = null,
    ip: string | null = null
  ) => {
    try {
      const payload = {
        bni_clicks_uuid: "",
        ip: ip,
        type,
        referral: referral || null,
        status: "ACTIVE",
      };

      //* Fire and forget - don't await the response
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/dataManagement/upsert-bni-click`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      //* Just log the error but don't interrupt user flow
      console.error("Error tracking BNI click:", error);
    }
  };

  useEffect(() => {
    //* Get user IP and track initial page visit
    const initTracking = async () => {
      try {
        const ip = await getUserIp();
        setUserIp(ip);

        //* Only track if we successfully got an IP
        if (ip) {
          //* Track initial page visit with the IP we just retrieved
          trackBniClick("List Your Property", ip);
        } else {
          console.error("Could not retrieve IP address for tracking");
        }
      } catch (error) {
        console.error("Error in initial tracking:", error);
      }
    };

    initTracking();
  }, []);

  const resetForm = () => {
    setFormData(initialFormState);
    setFormErrors({ email: "", phone: "" });
    // Reset any attachments if needed
  };

  const locations = [
    "Business Bay",
    "City Walk",
    "DIFC",
    "Downtown",
    "Dubai Marina",
    "Jumeirah Lake Towers",
    "Palm Jumeirah",
    "JBR",
    "Bluewaters",
    "JVC",
  ];

  const selectedCountry =
    countries.find((country) => country.code === formData.countryCode) ||
    countries[3];

  const toggleCountryDropdown = () => {
    setIsLocationDropdownOpen(false); // Close location dropdown
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const selectCountry = (code: string) => {
    setFormData((prev) => ({ ...prev, countryCode: code }));
    setIsCountryDropdownOpen(false);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Only allow digits
    return /^\d{9,15}$/.test(phone);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));
    setFormErrors((prev) => ({
      ...prev,
      email: validateEmail(email) ? "" : "Please enter a valid email",
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value;
    // Remove leading 0 if present
    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }

    setFormData((prev) => ({ ...prev, phone }));

    setFormErrors((prev) => ({
      ...prev,
      phone: validatePhone(phone) ? "" : "Please enter a valid phone number",
    }));
  };

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, property_location: location }));
    setIsLocationDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      // First, ensure we have the user's IP address
      let currentIp = userIp;
      if (!currentIp) {
        currentIp = await getUserIp();
        setUserIp(currentIp);
      }

      // Track the form submission click with the current IP and page name
      if (currentIp) {
        await trackBniClick("List Your Property", currentIp);
      }

      // Now submit the form data
      const response = await axios.post(
        `${apiBaseurl}/dataManagement/enquiry-request`,
        {
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          property_location: formData.property_location,
          referralCode: referral || pageReferral,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to submit enquiry");
      }

      setIsSubmitted(true);
      window.history.pushState(
        {},
        "",
        window.location.pathname + "?enquiry=success"
      );
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize form validation to avoid unnecessary recalculations
  const isFormValid =
    formData.name.trim() !== "" &&
    validateEmail(formData.email) &&
    formData.property_location !== "";

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsCountryDropdownOpen(false);
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isSubmitted) {
    return (
      <div
        id="signup-form"
        className="bg-white/80 bg-opacity-0 rounded-xl p-8 shadow-lg w-full max-w-2xl mx-auto text-center flex items-center justify-center h-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Sign up today and start earning with a trusted property management
          Company
        </h2>
      </div>
    );
  }

  return (
    <div
      id="signup-form"
      className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg w-full max-w-xl mx-auto mr-10">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
        Sign up today and start <span className="text-bnbme-gold">earning</span>{" "}
        with a trusted property management company
      </h2>

      <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnbme-gold focus:border-transparent"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full py-3 px-4 border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-bnbme-gold focus:border-transparent`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <div className="col-span-1">
            <label
              htmlFor="countryCode"
              className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <div className="relative w-full dropdown-container">
              <div
                className="flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4"
                onClick={toggleCountryDropdown}>
                <img
                  src={selectedCountry.flag?.src || "/placeholder.svg"}
                  alt={`${selectedCountry.name} flag`}
                  className="w-4 h-4 rounded-sm mr-1"
                />
                <span className="text-sm">{selectedCountry.code}</span>
                <svg
                  className="h-4 w-4 text-gray-500 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>

              {isCountryDropdownOpen && (
                <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-[350px]">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => selectCountry(country.code)}
                      className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center justify-between w-full">
                      <div className="flex items-center min-w-0 flex-1">
                        <img
                          src={country.flag?.src || "/placeholder.svg"}
                          alt={`${country.name} flag`}
                          className="w-4 h-4 rounded-sm mr-3 flex-shrink-0"
                        />
                        <span className="text-sm font-medium truncate">
                          {country.name}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm ml-3 flex-shrink-0">
                        {country.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Your Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full py-3 px-4 border ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-bnbme-gold focus:border-transparent`}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700">
            Property Location
          </label>
          <div className="relative dropdown-container">
            <div
              className="flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4"
              onClick={() => {
                setIsCountryDropdownOpen(false); // Close country dropdown
                setIsLocationDropdownOpen(!isLocationDropdownOpen);
              }}>
              <span className="text-sm">
                {formData.property_location || "Select a location"}
              </span>
              <svg
                className="h-4 w-4 text-gray-500 ml-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>

            {isLocationDropdownOpen && (
              <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-full">
                {locations.map((location) => (
                  <div
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center w-full">
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-2xl text-lg font-semibold shadow-md transition-transform transform ${
            isFormValid
              ? "bg-[#D4B779] hover:bg-[#A99260] text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
          disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Enquire Now"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
