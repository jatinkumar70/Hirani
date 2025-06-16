import { MapPin, Hotel, Edit } from "lucide-react";
import { Card } from "../../../components/ui/Card/Card";
import { Button } from "../../../components/ui/Button/Button";
import { Badge } from "../../../components/ui/Badge/Badge";

interface PropertyRowProps {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "active" | "pending" | "inactive";
  bookings: number;
  revenue: number;
}

export function PropertyRow({
  id,
  name,
  location,
  type,
  status,
  bookings,
  revenue,
}: PropertyRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="p-4 border rounded-lg border-primary-gold hover:border-dark-gold transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-indigo-900">{name}</h3>
          <div className="flex items-center text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
              {type}
            </Badge>
            <Badge
              className={`${getStatusColor(status)} text-white capitalize`}>
              {status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-500 mb-1">
            Total Bookings:{" "}
            <span className="font-semibold text-indigo-900">{bookings}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Total Revenue:{" "}
            <span className="font-semibold text-amber-500">
              ${revenue.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-dark-gold hover:bg-dak-gold text-white">
              <Hotel className="mr-2 h-4 w-4" /> Manage
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-black text-gray-800 hover:bg-black hover:text-white">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
