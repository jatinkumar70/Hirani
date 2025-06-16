"use client";

import {
  Building,
  Camera,
  CreditCard,
  Edit,
  Heart,
  Home,
  Key,
  Mail,
  Phone,
  Save,
  Shield,
  User
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Images } from "../../../asserts/Import/Images";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar/Avatar";
import { Badge } from "../../components/ui/Badge/Badge";
import { Button } from "../../components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card/Card";
import { Input } from "../../components/ui/Input/Input";
import { Label } from "../../components/ui/Label/Label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs/Tabs";
import { FavoriteHotelRow } from "../../modules/MyAccountPage/components/favorite-hotel-row";
import { PropertyRow } from "../../modules/MyAccountPage/components/property-row";

// Define types for our data
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  memberSince: string;
}

interface Booking {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  imageUrl: string;
}

interface FavoriteHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
}

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "active" | "pending" | "inactive";
  bookings: number;
  revenue: number;
  imageUrl: string;
}

// Mock data
const userProfile: UserProfile = {
  id: "user-1",
  name: "Raju Solanki",
  email: "rajusolanki787@gmail.com",
  phone: "+91 8700026451",
  address: "123 Luxury Avenue, Beverly Hills, CA 90210",
  avatarUrl: "/placeholder.svg?height=300&width=300",
  memberSince: "January 2025",
};

const bookings: Booking[] = [
  {
    id: "booking-1",
    hotelName: "The Grand Palace Hotel",
    location: "Paris, France",
    checkIn: "2023-12-20",
    checkOut: "2023-12-27",
    guests: 2,
    price: 2450,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "booking-2",
    hotelName: "Seaside Luxury Resort",
    location: "Maldives",
    checkIn: "2023-10-15",
    checkOut: "2023-10-22",
    guests: 2,
    price: 3200,
    status: "completed",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "booking-3",
    hotelName: "Mountain View Lodge",
    location: "Aspen, Colorado",
    checkIn: "2023-08-05",
    checkOut: "2023-08-12",
    guests: 4,
    price: 1850,
    status: "completed",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

const favoriteHotels: FavoriteHotel[] = [
  {
    id: "hotel-1",
    name: "The Ritz-Carlton",
    location: "New York, USA",
    price: 850,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "hotel-2",
    name: "Burj Al Arab Jumeirah",
    location: "Dubai, UAE",
    price: 1200,
    rating: 5.0,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "hotel-3",
    name: "Four Seasons Hotel",
    location: "Tokyo, Japan",
    price: 750,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "hotel-4",
    name: "The Peninsula",
    location: "Hong Kong",
    price: 920,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

const properties: Property[] = [
  {
    id: "property-1",
    name: "Beachfront Villa",
    location: "Miami, Florida",
    type: "Villa",
    status: "active",
    bookings: 24,
    revenue: 45600,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "property-2",
    name: "Downtown Luxury Apartment",
    location: "Manhattan, New York",
    type: "Apartment",
    status: "active",
    bookings: 18,
    revenue: 32400,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState(userProfile);

  // // Simulating API delay
  // const [isLoading, setIsLoading] = useState(true);

  // // Simulate API call
  // useState(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // 2 seconds delay
  // });

  // if (!isLoading) {
  //   return <AccountSkeleton />;
  // }
  return (
    <div className="container mx-auto pt-32 pb-10 px-4">
      <div className="bg-gradient-to-b from-[#AA987A] to-[#D4B779] rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-[#D4B779] shadow-lg transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-amber-100 text-amber-800 text-4xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 shadow-lg cursor-pointer transition-all duration-300 hover:bg-white">
              <Camera className="h-5 w-5 text-gray-800" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-start gap-2">
              {profile.name}{" "}
              <Image
                width={24}
                height={24}
                src={Images.verifiedIcon}
                alt="verified-icon"
              />
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-white mb-4">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{profile.phone}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge className="bg-white  text-gray-800">Gold Member</Badge>
              <Badge className="bg-white  text-gray-800">
                Member since {profile.memberSince}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            className="ml-auto hidden md:flex border-white border-2 text-white"
            onClick={() => setActiveTab("profile")}>
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-indigo-50 p-1 rounded-xl">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#AA987A] data-[state=active]:text-white rounded-lg transition-all duration-300">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          {/* <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-[#AA987A] data-[state=active]:text-white rounded-lg transition-all duration-300">
            <Calendar className="mr-2 h-4 w-4" /> Bookings
          </TabsTrigger> */}
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-[#AA987A] data-[state=active]:text-white rounded-lg transition-all duration-300">
            <Heart className="mr-2 h-4 w-4" /> Favorites
          </TabsTrigger>
          <TabsTrigger
            value="properties"
            className="data-[state=active]:bg-[#AA987A] data-[state=active]:text-white rounded-lg transition-all duration-300">
            <Building className="mr-2 h-4 w-4" /> Properties
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border rounded-lg border-primary-gold hover:border-dark-gold shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#AA987A]">
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditingProfile ? "default" : "outline"}
                    className={
                      isEditingProfile
                        ? "bg-primary-gold hover:bg-primary-gold text-white"
                        : "border-2 border-black text-gray-800 hover:bg-black hover:text-white"
                    }
                    onClick={() => setIsEditingProfile(!isEditingProfile)}>
                    {isEditingProfile ? (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-800">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        disabled={!isEditingProfile}
                        className="border-gray-400 focus:border-black focus:ring-black bg-gray-200"
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-800">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled={!isEditingProfile}
                        className="border-gray-400 focus:border-black focus:ring-black bg-gray-200"
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-800">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        disabled={!isEditingProfile}
                        className="border-gray-400 focus:border-black focus:ring-black bg-gray-200"
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-800">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={profile.address}
                        disabled={!isEditingProfile}
                        className="border-gray-400 focus:border-black focus:ring-black bg-gray-200"
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border rounded-lg border-primary-gold hover:border-dark-gold shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-[#AA987A]">Security</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-black text-gray-800 justify-start">
                    <Key className="mr-2 h-4 w-4" /> Reset Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-black text-gray-800 justify-start">
                    <Shield className="mr-2 h-4 w-4" /> Two-Factor
                    Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="border rounded-lg border-primary-gold hover:border-dark-gold shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-[#AA987A]">
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-black text-gray-800 justify-start">
                    <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        {/* <TabsContent value="bookings" className="space-y-6">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                id={booking.id}
                hotelName={booking.hotelName}
                location={booking.location}
                checkIn={booking.checkIn}
                checkOut={booking.checkOut}
                price={booking.price}
                status={booking.status}
              />
            ))}
          </div>
        </TabsContent> */}

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <div className="space-y-4">
            {favoriteHotels.map((hotel) => (
              <FavoriteHotelRow
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                location={hotel.location}
                price={hotel.price}
                rating={hotel.rating}
              />
            ))}
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#AA987A]">My Properties</h2>
            <Button className="border border-black text-gray-800">
              <Link href={"/list-property"} className="flex items-center">
                <Home className="mr-2 h-4 w-4" /> Add New Property
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {properties.map((property) => (
              <PropertyRow
                key={property.id}
                id={property.id}
                name={property.name}
                location={property.location}
                type={property.type}
                status={property.status}
                bookings={property.bookings}
                revenue={property.revenue}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <div className="my-12 text-center">
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div> */}
    </div>
  );
}
