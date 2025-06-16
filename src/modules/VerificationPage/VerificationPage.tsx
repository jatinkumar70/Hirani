"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Plus,
  PenLine,
  Bed,
  BedDouble,
  Users,
  Bath,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/ui/Dialog/Dialog";
import { Button } from "../../components/ui/Button/Button";
import { Checkbox } from "../../components/ui/Checkbox/Checkbox";
import { HotelsImage, Images } from "../../../asserts/Import/Images";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import { DateRangeSlider } from "../../components/ui/DateRangeSlider/DateRangeSlider";
import router, { useRouter } from "next/router";

interface GuestInfo {
  firstName: string;
  lastName: string;
  passportId: string;
}

const inputClass = "mt-1 border-2 border-black rounded-md h-12 w-full px-3";
const labelClass = "text-sm font-semibold";
const buttonClass =
  "w-auto mx-auto h-10 border-2 border-gray-900 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50";

const FormField = ({
  id,
  label,
  subLabel,
  type = "text",
}: {
  id: string;
  label: string;
  subLabel?: string;
  type?: string;
}) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <input id={id} type={type} className={inputClass} />
    {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
  </div>
);

const CheckboxField = ({ id, label }: { id: string; label: any }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={id}
      className="cursor-pointer h-4 w-4 rounded border border-primary-gold text-primary-gold bg-primary-gold"
    />
    <label htmlFor={id} className={`${labelClass} cursor-pointer`}>
      {label}
    </label>
  </div>
);

const PreviewItem = ({
  label,
  editable = false,
}: {
  label: string;
  editable?: boolean;
}) => (
  <div className="flex items-center justify-between gap-3">
    <p className={`text-xs ${editable ? "underline" : ""}`}>{label}</p>
    {editable && <Pencil size={17} className="cursor-pointer" />}
  </div>
);

export default function BookingForm() {
  const [phoneNumber, setPhoneNumber] = useState("+44 789234567");
  const [email, setEmail] = useState("somename@mail.com");
  const [editingField, setEditingField] = useState<"phone" | "email" | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<GuestInfo[]>([
    { firstName: "", lastName: "", passportId: "" },
  ]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleAddGuest = useCallback(() => {
    setGuests((prev) => [
      ...prev,
      { firstName: "", lastName: "", passportId: "" },
    ]);
  }, []);

  return (
    <div className="pt-28 pb-6 bg-[#f9f9f9]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-screen-xl 2xl:max-w-screen-3xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl font-semibold">
          Chic Apartment Overlooking Iconic Dubai Creek
        </h1>
        <span className="text-sm">Property address</span>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className=" mt-6 bg-white flex items-start justify-between flex-col lg:flex-row  gap-20  border border-gray-300 shadow-lg p-4 rounded-md ">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 w-full lg:w-[40%] order-2 lg:order-1">
            <FormField
              id="arrivalFlight"
              label="Arrival Flight number (Optional)"
              subLabel="If you booked a flight in"
            />
            <FormField
              id="departureFlight"
              label="Departure Flight number (Optional)"
              subLabel="If you booked a flight out"
            />
            <FormField id="firstName" label="Guest 1 First name" />
            <FormField id="lastName" label="Guest 1 Last name" />
            <FormField id="passport" label="Passport or ID number of guest 1" />
            <FormField id="purpose" label="Purpose of Visit" />

            <div className="grid grid-cols-2 gap-4">
              <FormField id="country" label="Country of Residence" />
              <FormField id="city" label="City of Residence" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button
                variant={"default"}
                size={"lg"}
                className="text-gray-800 font-semibold flex items-center">
                <Upload size={20} className="mr-3" /> Upload attachment
              </Button>
              <Button
                size={"lg"}
                className="w-full text-gray-800 font-semibold flex items-center border-2 border-black"
                onClick={handleAddGuest}>
                <Plus size={20} className="mr-3" /> Add guest
              </Button>
            </div>

            <div className="space-y-3">
              <CheckboxField
                id="rules"
                label={
                  <>
                    Agree with the{" "}
                    <span className="underline">House rules</span>
                  </>
                }
              />
              <CheckboxField
                id="experience"
                label="Would you like to help us in curated experiences?"
              />
            </div>

            <button className="w-full h-10 bg-black text-white rounded-lg hover:bg-black/90">
              Save details
            </button>
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 w-full lg:w-[27%] order-1 lg:order-2">
            <Image
              src={HotelsImage.Hotel1}
              alt="Room preview"
              width={300}
              height={300}
              className="object-cover w-full aspect-[3/3]"
            />

            <div className="space-y-6">
              <p className="text-xs">
                Experience chic sophistication with stunning views.
              </p>

              <div className="flex items-center justify-evenly text-md lg:text-xs">
                <div className="flex flex-col items-start gap-1">
                  <Bed className="w-6 h-6 lg:w-4 lg:h-4" />
                  <span>2 bed</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <BedDouble className="w-6 h-6 lg:w-4 lg:h-4" />
                  <span>1 bedrooms</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Users className="w-6 h-6 lg:w-4 lg:h-4" />
                  <span>4 guests</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Bath className="w-6 h-6 lg:w-4 lg:h-4" />
                  <span>2 baths</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold">
                    {startDate && endDate
                      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      : "27-30th of June, 2024"}
                  </span>
                  <Pencil
                    size={17}
                    className="cursor-pointer"
                    onClick={() => setIsDatePickerOpen(true)}
                  />
                </div>
                <div className="flex gap-3">
                  {editingField === "phone" ? (
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onBlur={() => setEditingField(null)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setEditingField(null)
                      }
                      autoFocus
                    />
                  ) : (
                    <p
                      className="text-xs underline cursor-pointer"
                      onClick={() => setEditingField("phone")}>
                      {phoneNumber}
                    </p>
                  )}
                  <Pencil
                    size={17}
                    className="cursor-pointer"
                    onClick={() => setEditingField("phone")}
                  />
                </div>
                <div className="flex gap-3">
                  {editingField === "email" ? (
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEditingField(null)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setEditingField(null)
                      }
                      autoFocus
                    />
                  ) : (
                    <p
                      className="text-xs underline cursor-pointer"
                      onClick={() => setEditingField("email")}>
                      {email}
                    </p>
                  )}
                  <Pencil
                    size={17}
                    className="cursor-pointer"
                    onClick={() => setEditingField("email")}
                  />
                </div>
              </div>

              <DateRangeSlider
                isOpen={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />

              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setShowCancelDialog(true)}
                className={buttonClass}>
                Cancel booking
              </Button>

              {showCancelDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg max-w-[350px]">
                    <h2 className="text-lg font-semibold">Are you sure?</h2>
                    <p className="text-sm text-gray-800 mt-2">
                      If you cancel this booking you might not find availability
                      again.
                    </p>
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={() => setShowCancelDialog(false)}
                        className="flex-1 text-sm font-semibold rounded-md">
                        Don&apos;t cancel
                      </button>
                      <button
                        onClick={() => {
                          setShowCancelDialog(false);
                          router.push("/");
                        }}
                        className="flex-1 h-10 bg-black text-white rounded-md">
                        Cancel booking
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <FloatingWhatsAppButton />
    </div>
  );
}
