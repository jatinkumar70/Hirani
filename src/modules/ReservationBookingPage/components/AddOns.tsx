import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  CalendarX,
  Car,
  Check,
  Clock,
  Info,
  Users,
} from "lucide-react";
import Image from "next/image";
import bottlesImage from "../../../../asserts/bottle.jpeg";
import FloatingWhatsAppButton from "../../../components/whatsapp/FloatingWhatsAppButton ";
import { cn } from "../../../lib/utils";
import { AddOn } from "../../../types/types";

interface AddOnsProps {
  selectedAddOns: AddOn[];
  onSelectAddOns: (addOns: AddOn[]) => void;
}

export function AddOns({ selectedAddOns, onSelectAddOns }: AddOnsProps) {
  // const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const addOns: AddOn[] = [
    {
      id: "early-checkout",
      title: "Early check-in or late checkout",
      description: "You can choose either early check-in or late checkout",
      icon: <Clock className="w-5 h-5" />,
      includedWithPremium: true,
      price: 0,
    },
    {
      id: "free-cancellation",
      title: "Free cancelation",
      description: "Please give appropriate notice as stated in your package",
      icon: <CalendarX className="w-5 h-5" />,
      includedWithPremium: true,
      price: 0,
    },
    {
      id: "bag-dropoff",
      title: "Early bag drop-off",
      description: "You can drop the bags as early as you want",
      icon: <Briefcase className="w-5 h-5" />,
      price: 10,
    },
    {
      id: "concierge",
      title: "Personal concierge",
      description: "Someone always there if you need help",
      icon: <Users className="w-5 h-5" />,
      price: 20,
    },
    {
      id: "housekeeping",
      title: "Daily housekeeping",
      description: "Come back to a fresh house every day",
      icon: <Building2 className="w-5 h-5" />,
      price: 10,
    },
    {
      id: "airport-pickup",
      title: "Airport pickup",
      description: "Only for airports in the same city",
      icon: <Car className="w-5 h-5" />,
      price: 20,
    },
  ];
  const basePrice = 700;
  const toggleAddOn = (addOn: AddOn) => {
    if (selectedAddOns.some((selected) => selected.id === addOn.id)) {
      onSelectAddOns(
        selectedAddOns.filter((selected) => selected.id !== addOn.id)
      );
    } else {
      onSelectAddOns([...selectedAddOns, addOn]);
    }
  };

  const totalPrice = selectedAddOns.reduce((total, id) => {
    const addon = addOns.find((addon) => addon === id);
    return total + (addon?.price || 0);
  }, basePrice);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-base lg:text-3xl font-bold mb-2">
            Select add-ons
          </h1>
          <p className="text-sm lg:text-xl text-gray-600">
            Every price is calculated per day
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Total price</p>
          <p className="text-xl lg:text-3xl font-bold">${totalPrice}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        {addOns.map((addon, index) => (
          <motion.div
            key={addon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-xl border-2 cursor-pointer transition-colors",
              selectedAddOns.some((selected) => selected.id === addon.id)
                ? "border-black bg-gradient-to-t from-[#D4B779] to-[#FDF7D4]"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => toggleAddOn(addon)}>
            <div className="flex items-start gap-4 relative w-full p-4">
              {/* Responsive Image */}
              <Image
                src={bottlesImage}
                alt="bottles"
                width={0}
                height={0}
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 170px"
                className="w-20 sm:w-24 md:w-28 lg:w-40 h-auto rounded-lg"
              />

              {/* Content Section */}
              <div className="my-auto flex flex-col items-start gap-2 w-full p-2">
                <div className="">{addon.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="font-semibold flex gap-1 text-xs sm:text-sm md:text-base lg:text-lg">
                      {addon.title}
                      <Info size={12} className="my-auto" />
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-800">
                      {addon.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price/Label Section */}
              <div className="mt-auto ml-auto p-4 absolute lg:bottom-0 -bottom-4 right-0">
                {addon.includedWithPremium ? (
                  <span className="text-xs sm:text-sm md:text-base text-gray-800 font-bold">
                    Included with Premium
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    +${addon.price}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute lg:top-4 top-2 right-4">
              <div
                className={cn(
                  "w-5 h-5 border-2 rounded transition-colors flex items-center justify-center",
                  selectedAddOns.some((selected) => selected.id === addon.id)
                    ? "border-black bg-black"
                    : "border-gray-300"
                )}
                aria-selected={selectedAddOns.some(
                  (selected) => selected.id === addon.id
                )}>
                {selectedAddOns.some(
                  (selected) => selected.id === addon.id
                ) && <Check size={16} className="text-white" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <FloatingWhatsAppButton />
    </div>
  );
}
