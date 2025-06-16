"use client";

import type React from "react";

import { useState } from "react";
import { type FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { countries } from "../../../../constants/flags";
import { Button } from "../../../../components/ui/Button/Button";
import {
  createBooking,
  initiatePayment,
} from "../../../../lib/Booking/fetchApi";
import { showErrorToast } from "../../../../utils/toaster/toast";
import { format } from "date-fns";
import { BookingConfirmationPopover } from "./BookingConfirmationPopover";
import Link from "next/link";
import { whatsappUrl } from "../../../../constants/constants";
import formatWhatsAppMessage from "../../../../constants/WhatsappFormat/WhatsappFormat";

interface CheckoutFormProps {
  propertyId: string;
  propertyName: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: {
    adults: number;
    kids: number;
    infants: number;
    pets: number;
  };
  priceBreakup: any;
  currency?: string;
  voucherCode: string;
  onRequest: boolean;
  onRequestPrice: number;
  onRequestPropertySlug: string;
}

interface FormValues {
  firstName: string;
  familyName: string;
  email: string;
  phone: string;
  countryCode: string;
  terms: boolean;
  notifications: boolean;
}
export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  propertyId,
  propertyName,
  startDate,
  endDate,
  guests,
  priceBreakup,
  currency = "AED",
  voucherCode,
  onRequest,
  onRequestPrice,
  onRequestPropertySlug,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationsAccepted, setNotificationsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const propertyNameformattedTitle = propertyName.includes("|")
    ? propertyName.split("|")[1].trim()
    : propertyName;

  const initialValues: FormValues = {
    firstName: "",
    familyName: "",
    email: "",
    phone: "",
    countryCode: countries[3].code,
    terms: false,
    notifications: false,
  };

  const handleSubmit = async (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
      setErrors,
      setStatus,
    }: FormikHelpers<FormValues>
  ) => {
    if (!propertyId) {
      console.error("Missing propertyId:", propertyId);
      showErrorToast(
        "Property ID is missing. Please refresh the page and try again."
      );
      setSubmitting(false);
      return;
    }

    if (!startDate) {
      console.error("Missing startDate:", startDate);
      showErrorToast("Please select a check-in date.");
      setSubmitting(false);
      return;
    }

    if (!endDate) {
      console.error("Missing endDate:", endDate);
      showErrorToast("Please select a check-out date.");
      setSubmitting(false);
      return;
    }

    // Validate date range
    if (startDate >= endDate) {
      showErrorToast("Check-out date must be after check-in date.");
      setSubmitting(false);
      return;
    }

    // For regular bookings (not on-request), we need priceBreakup
    if (!onRequest && (!priceBreakup || priceBreakup.total === undefined)) {
      console.error("Missing priceBreakup for regular booking:", priceBreakup);
      showErrorToast(
        "Price information is missing. Please refresh and try again."
      );
      setSubmitting(false);
      return;
    }

    //* For regular bookings (not on-request), we need priceBreakup
    if (!onRequest && !priceBreakup) {
      showErrorToast(
        "Price information is missing. Please refresh and try again."
      );
      setSubmitting(false);
      return;
    }

    setIsPopoverOpen(true);
    setIsSubmitting(true);
    setBookingStatus("loading");

    try {
      //** Use actual priceBreakup for regular bookings, default for on-request
      const finalPriceBreakup = onRequest ? "" : priceBreakup;

      //** Create booking payload
      const bookingPayload = {
        booking_uuid: null,
        from_date: format(startDate, "yyyy-MM-dd"),
        to_date: format(endDate, "yyyy-MM-dd"),
        property_details_uuid: propertyId,
        user_uuid: null,
        user_name: `${values.firstName} ${values.familyName}`,
        email: values.email,
        mobile: `${values.countryCode}${values.phone}`,
        voucher_code: voucherCode || "",
        street_address: null,
        unit_or_suite: null,
        city: null,
        province_or_state: null,
        postal_code: null,
        country: null,
        is_refundable: false,
        no_of_pats: guests.pets,
        total_nights: Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ),
        total_price: onRequest ? onRequestPrice : finalPriceBreakup.total || 0,
        price_breakup: {
          per_night_price: finalPriceBreakup.per_night_price || "0",
          accommodation_fee: finalPriceBreakup.accommodation_fee || "0",
          cleaning_fee: finalPriceBreakup.cleaning_fee || "0",
          pet_charges: finalPriceBreakup.pet_charges || "0",
          damage_waiver: finalPriceBreakup.damage_waiver || "0",
          tourism_fee: finalPriceBreakup.tourism_fee || "0",
          service_fee: finalPriceBreakup.service_fee || "0",
          vat: finalPriceBreakup.vat || "0",
          total: finalPriceBreakup.total || "0",
        },
        total_adult: guests.adults,
        total_children: guests.kids + guests.infants,
        guest_details: [
          {
            name: null,
            age: null,
            mobile_no: null,
            email: null,
          },
        ],
        status: "INQUIRY",
      };

      //* Create booking
      const bookingResponse = await createBooking(bookingPayload);
      if (!bookingResponse || !bookingResponse.booking_uuid) {
        showErrorToast("Failed to create booking. Please try again");
        setBookingStatus("error");
        setIsPopoverOpen(true);
        setStatus({ success: false });
      }

      setBookingStatus("loading");
      setIsPopoverOpen(true);
      setStatus({ success: true });

      const handleOnRequestBookingSuccess = () => {
        setBookingStatus("idle");
        setIsPopoverOpen(true);
        setStatus({ success: true });

        // Format professional WhatsApp message
        const professionalMessage = formatWhatsAppMessage(
          `${values.firstName} ${values.familyName}`,
          values.email,
          values.phone,
          values.countryCode,
          startDate,
          endDate,
          onRequestPropertySlug // Make sure this variable is available
        );

        setTimeout(() => {
          resetForm();
          // Redirect to WhatsApp with professional message
          window.location.href = `${whatsappUrl}?text=${professionalMessage}`;
        }, 3000);
      };

      //* For on-request properties, we might not need payment processing
      if (onRequest) {
        //* Handle on-request booking completion
        if (!bookingResponse || !bookingResponse.booking_uuid) {
          setBookingStatus("error");
          setIsPopoverOpen(true);
          setStatus({ success: false });
        } else {
          handleOnRequestBookingSuccess();
        }
        return;
      }

      //* Wait a moment to show success state before redirecting
      try {
        //* Get the base URL dynamically
        const baseUrl = window.location.origin;
        const returnUrl = `${baseUrl}/payment`;
        //* Initiate payment
        const paymentPayload = {
          record_uuid: bookingResponse.booking_uuid,
          record_type: "BOOKING",
          amount: Number(priceBreakup.total),
          currency: currency,
          return_url: returnUrl,
          payment_provider: "STRIPE",
          placeholder: propertyNameformattedTitle,
        };

        const paymentResponse = await initiatePayment(paymentPayload);

        if (paymentResponse && paymentResponse.url) {
          //* Reset form before redirecting
          resetForm();
          //* Redirect to payment page
          window.location.href = paymentResponse.url;
        } else {
          throw new Error("Failed to initiate payment");
        }
      } catch (error) {
        console.error("Payment initiation failed:", error);
        showErrorToast("Payment initiation failed. Please try again.");

        //* Redirect to error page
        window.location.href = `${window.location.origin}/payment?status=failed`;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      setBookingStatus("error");
      setErrorMessage(error.message || "Failed to process booking");
      setIsPopoverOpen(true);
      setStatus({ success: false, error: error.message });

      //* Set form-level error if needed
      if (error.message.includes("email")) {
        setErrors({ email: error.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      familyName: Yup.string()
        .min(2, "Family name must be at least 2 characters")
        .required("Family name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .min(7, "Phone number must be at least 7 characters")
        .required("Phone number is required"),
      terms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
    }),
    onSubmit: handleSubmit,
  });

  const handleClosePopover = () => {
    if (bookingStatus !== "loading") {
      setIsPopoverOpen(false);
      setBookingStatus("idle");
    }
  };

  const selectedCountry =
    countries.find((country) => country.code === formik.values.countryCode) ||
    countries[3];

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const selectCountry = (code: string) => {
    formik.setFieldValue("countryCode", code);
    setIsCountryDropdownOpen(false);
  };

  const toggleTerms = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    formik.setFieldValue("terms", newValue);
  };

  const toggleNotifications = () => {
    const newValue = !notificationsAccepted;
    setNotificationsAccepted(newValue);
    formik.setFieldValue("notifications", newValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    //** Remove +91 if it exists
    if (value.startsWith("+91")) {
      value = value.slice(3);
    }

    //** Remove leading 0
    if (value.startsWith("0")) {
      value = value.slice(1);
    }

    //** Allow only numeric values and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      formik.setFieldValue("phone", value); //** Update Formik's state
    }
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white border border-black/20 p-6 rounded-2xl shadow-sm">
        <h2 className="text-gray-800 text-xl font-medium mb-5">
          Contact details
        </h2>

        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-base text-gray-800 block font-medium">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="Type your name as spelled in your passport."
              className={`w-full border text-gray-800 border-black/20 p-3 rounded-xl placeholder:text-gray-600 placeholder:text-sm ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="familyName"
              className="text-base text-gray-800 block font-medium">
              Family name
            </label>
            <input
              id="familyName"
              name="familyName"
              placeholder="Type your name as spelled in your passport."
              className={`w-full border text-gray-800 border-black/20 p-3 rounded-xl placeholder:text-gray-600 placeholder:text-sm ${
                formik.touched.familyName && formik.errors.familyName
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.familyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.familyName && formik.errors.familyName && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.familyName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-base text-gray-800 block font-medium">
              Phone number
            </label>
            <div className="flex gap-2">
              <div className="w-28 relative">
                <div
                  className="flex border border-black/20 p-3 rounded-xl text-gray-800 w-full cursor-pointer items-center"
                  onClick={toggleCountryDropdown}>
                  <Image
                    width={20}
                    height={20}
                    src={
                      selectedCountry.flag ||
                      "/placeholder.svg?height=20&width=20" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={`${selectedCountry.name} flag`}
                    className="rounded-sm mr-2"
                  />
                  <span className="text-sm">{selectedCountry.code}</span>
                  <ChevronDown className="h-4 text-gray-500 w-4 ml-1" />
                </div>

                {isCountryDropdownOpen && (
                  <div className="bg-white border border-black/10 rounded-xl shadow-lg w-64 absolute max-h-60 mt-1 overflow-y-auto z-10">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center"
                        onClick={() => selectCountry(country.code)}>
                        <Image
                          width={20}
                          height={20}
                          src={
                            country.flag ||
                            `/placeholder.svg?height=20&width=20&text=${
                              country.code || "/placeholder.svg"
                            }`
                          }
                          alt={`${country.name} flag`}
                          className="rounded-sm mr-3"
                        />
                        <span className="text-sm font-medium">
                          {country.name}
                        </span>
                        <span className="text-gray-500 text-sm ml-auto">
                          {country.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                id="phone"
                name="phone"
                placeholder="000000000"
                value={formik.values.phone}
                onChange={handlePhoneChange}
                onBlur={formik.handleBlur}
                className={`flex-1 border w-full text-gray-800 border-black/20 p-3 rounded-xl placeholder:text-gray-500 placeholder:text-sm ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              We&apos;ll send booking confirmations and updates to this number.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-base text-gray-800 block font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="username@gmail.com"
              className={`w-full border text-gray-800 border-black/20 p-3 rounded-xl placeholder:text-gray-500 placeholder:text-sm ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Your email will be used to verify your account and keep it safe.
            </p>
          </div>

          <div className="pt-2 space-y-4">
            <div className="flex gap-3 items-start">
              <div
                className="flex h-5 cursor-pointer items-center relative"
                onClick={toggleTerms}>
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <div
                  className={`h-5 w-5 border rounded flex items-center justify-center transition-colors ${
                    formik.values.terms
                      ? "bg-primary-gold border-primary-gold"
                      : "bg-gray-100 border-black/20"
                  }`}>
                  {formik.values.terms && (
                    <Check className="h-3.5 text-white w-3.5" />
                  )}
                </div>
              </div>
              <label
                htmlFor="terms"
                className="text-gray-800 text-sm cursor-pointer"
                onClick={toggleTerms}>
                Agree with our{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-xs">{formik.errors.terms}</p>
            )}

            <div className="flex gap-3 items-start">
              <div
                className="flex h-5 cursor-pointer items-center relative"
                onClick={toggleNotifications}>
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={formik.values.notifications}
                  onChange={formik.handleChange}
                  className="sr-only"
                />
                <div
                  className={`h-5 w-5 border rounded flex items-center justify-center transition-colors ${
                    formik.values.notifications
                      ? "bg-primary-gold border-primary-gold"
                      : "bg-gray-100 border-black/20"
                  }`}>
                  {formik.values.notifications && (
                    <Check className="h-3.5 text-white w-3.5" />
                  )}
                </div>
              </div>
              <label
                htmlFor="notifications"
                className="text-gray-800 text-sm cursor-pointer"
                onClick={toggleNotifications}>
                I want to be notified about news and offers
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className={`rounded-xl w-full mt-4 py-6 
    ${
      onRequest
        ? "bg-primary-gold text-white hover:opacity-90"
        : "bg-black text-white hover:bg-gray-800"
    }`}
            disabled={formik.isSubmitting || !formik.isValid}>
            {formik.isSubmitting
              ? "Processing..."
              : `${onRequest ? "Request for booking" : "Confirm and pay"}`}
          </Button>
        </div>
      </form>

      {isPopoverOpen && (
        <BookingConfirmationPopover
          isOpen={isPopoverOpen}
          onClose={handleClosePopover}
          status={bookingStatus}
          errorMessage={errorMessage}
          onRequest={onRequest}
        />
      )}
    </>
  );
};
