import { MapPin, Calendar } from "lucide-react";
import { Card } from "../../../components/ui/Card/Card";
import { Button } from "../../../components/ui/Button/Button";
import { Badge } from "../../../components/ui/Badge/Badge";

interface BookingRowProps {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
}

export function BookingRow({
  id,
  hotelName,
  location,
  checkIn,
  checkOut,
  price,
  status,
}: BookingRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="p-4 border-2 rounded-lg border-primary-gold hover:border-dark-gold transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-indigo-900">{hotelName}</h3>
          <div className="flex items-center text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {new Date(checkIn).toLocaleDateString()} -{" "}
              {new Date(checkOut).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge className={`${getStatusColor(status)} text-white mb-2`}>
            {status}
          </Badge>
          <span className="text-lg font-bold text-dark-gold">${price}</span>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-indigo-900 text-indigo-900 hover:bg-primary-gold hover:border-primary-gold hover:text-white">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
