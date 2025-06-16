import { motion } from "framer-motion";
import { MoreVertical, Star, X, MoveRight, Repeat, Calendar, Trash, HelpCircle } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { Button } from "../../../components/ui/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/Dropdowns/dropdown-menu";

interface TripCardProps {
  image: StaticImageData;
  title: string;
  dateRange: string;
  location: string;
  beds: number;
  bedrooms: number;
  guests: number;
  price: number;
  status: string;
  showRating?: boolean;
  showActions?: boolean;
  isUpcoming?: boolean;
  onDismissRating?: () => void;
}

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function TripCard({
  image,
  title,
  dateRange,
  location,
  beds,
  bedrooms,
  guests,
  price,
  status,
  showRating = false,
  showActions = false,
  isUpcoming = false,
  onDismissRating,
}: TripCardProps) {
  return (
    <div className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm transition hover:shadow-md">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dateRange} • {location}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {beds} beds • {bedrooms} bedrooms • {guests} guests
                </p>
                <p className="mt-2 text-sm text-gray-600">{status}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-lg text-gray-800">${price}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-lg border border-gray-300 shadow-lg">
                    <motion.div initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants}>
                      {isUpcoming ? (
                        <>
                          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
                            <Repeat className="h-4 w-4 text-blue-600" /> Book again
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
                            <HelpCircle className="h-4 w-4 text-green-600" /> Contact Customer Service
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md">
                            <Trash className="h-4 w-4" /> Remove booking
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md">
                            <X className="h-4 w-4" /> Cancel booking
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
                            <Calendar className="h-4 w-4 text-blue-600" /> Edit dates
                          </DropdownMenuItem>
                        </>
                      )}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Move the rating section below the flex container */}
        {showRating && (
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold">Rate your experience</span>
            </div>
            {onDismissRating && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-200 rounded-full"
                onClick={onDismissRating}
              >
                <X className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>
        )}
      </div>

      {showActions && (
        <div className="border-t p-6 bg-white bg-gray-50">
          <div className="flex justify-center">
            <Button className="gap-2 bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-900">
              Actions required
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
