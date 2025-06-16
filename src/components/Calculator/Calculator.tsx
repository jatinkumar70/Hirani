"use client";

import { useState, useEffect } from "react";
import {
  getCities,
  getAreasByCity,
  propertyData as propertyDataList,
} from "./profit-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card/Card";
import { Label } from "../ui/Label/Label";
import { Button } from "../ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog/Dialog";

export default function PriceCalculator() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedBedroom, setSelectedBedroom] = useState<string>("");
  const [selectedBathroom, setSelectedBathroom] = useState<string>("");
  const [areas, setAreas] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isBedroomDropdownOpen, setIsBedroomDropdownOpen] = useState(false);
  const [isBathroomDropdownOpen, setIsBathroomDropdownOpen] = useState(false);
  const [selectedPropertyData, setSelectedPropertyData] = useState<
    | {
      rev1: string;
      rev2: string;
      occu_rate: string;
      currency: string;
    }
    | undefined
  >(undefined);

  const cities = getCities();

  useEffect(() => {
    if (selectedCity) {
      setAreas(getAreasByCity(selectedCity));
      setSelectedArea("");
      setSelectedBedroom("");
      setSelectedBathroom("");
      setBedrooms([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedArea) {
      const areaData = propertyDataList.find(
        (item) => item.city === selectedCity && item.area === selectedArea
      );
      const bedroomOptions = areaData
        ? areaData.item.map((item) => item.bedroom)
        : [];
      setBedrooms(bedroomOptions);
      setSelectedBedroom("");
    }
  }, [selectedCity, selectedArea]);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsCityDropdownOpen(false);
        setIsAreaDropdownOpen(false);
        setIsBedroomDropdownOpen(false);
        setIsBathroomDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCalculate = () => {
    if (selectedCity && selectedArea && selectedBedroom) {
      const areaData = propertyDataList.find(
        (item) => item.city === selectedCity && item.area === selectedArea
      );
      const bedroomData = areaData?.item.find(
        (item) => item.bedroom === selectedBedroom
      );
      if (bedroomData) {
        setSelectedPropertyData(bedroomData);
        setDialogOpen(true);
      }
    }
  };

  return (
    <div className="max-w-md rounded-xl shadow-2xl bg-white mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Price Calculator</CardTitle>
          <CardDescription>
            Select property details to calculate potential revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative w-full dropdown-container">
              <div
                className="flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4"
                onClick={() => {
                  setIsAreaDropdownOpen(false);
                  setIsBedroomDropdownOpen(false);
                  setIsBathroomDropdownOpen(false);
                  setIsCityDropdownOpen(!isCityDropdownOpen);
                }}>
                <span className="text-sm">
                  {selectedCity || "Select city"}
                </span>
                <svg
                  className="h-4 w-4 text-gray-500 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>

              {isCityDropdownOpen && (
                <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-full">
                  {cities.map((city) => (
                    <div
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center w-full">
                      <span className="text-sm font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <div className="relative w-full dropdown-container">
              <div
                className={`flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4 ${
                  !selectedCity ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (!selectedCity) return;
                  setIsCityDropdownOpen(false);
                  setIsBedroomDropdownOpen(false);
                  setIsBathroomDropdownOpen(false);
                  setIsAreaDropdownOpen(!isAreaDropdownOpen);
                }}>
                <span className="text-sm">
                  {selectedArea || "Select area"}
                </span>
                <svg
                  className="h-4 w-4 text-gray-500 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>

              {isAreaDropdownOpen && (
                <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-full">
                  {areas.map((area) => (
                    <div
                      key={area}
                      onClick={() => {
                        setSelectedArea(area);
                        setIsAreaDropdownOpen(false);
                      }}
                      className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center w-full">
                      <span className="text-sm font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedroom">Bedroom</Label>
              <div className="relative w-full dropdown-container">
                <div
                  className={`flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4 ${
                    !selectedArea ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (!selectedArea) return;
                    setIsCityDropdownOpen(false);
                    setIsAreaDropdownOpen(false);
                    setIsBathroomDropdownOpen(false);
                    setIsBedroomDropdownOpen(!isBedroomDropdownOpen);
                  }}>
                  <span className="text-sm">
                    {selectedBedroom || "Select bedroom"}
                  </span>
                  <svg
                    className="h-4 w-4 text-gray-500 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>

                {isBedroomDropdownOpen && (
                  <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-full">
                    {bedrooms.map((bedroom) => (
                      <div
                        key={bedroom}
                        onClick={() => {
                          setSelectedBedroom(bedroom);
                          setIsBedroomDropdownOpen(false);
                        }}
                        className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center w-full">
                        <span className="text-sm font-medium">{bedroom}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathroom">Bathroom</Label>
              <div className="relative w-full dropdown-container">
                <div
                  className={`flex border border-gray-300 rounded-lg text-gray-800 w-full cursor-pointer items-center focus:ring-2 focus:ring-bnbme-gold focus:border-transparent h-[50px] px-4 ${
                    !selectedBedroom ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (!selectedBedroom) return;
                    setIsCityDropdownOpen(false);
                    setIsAreaDropdownOpen(false);
                    setIsBedroomDropdownOpen(false);
                    setIsBathroomDropdownOpen(!isBathroomDropdownOpen);
                  }}>
                  <span className="text-sm">
                    {selectedBathroom || "Select bathroom"}
                  </span>
                  <svg
                    className="h-4 w-4 text-gray-500 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>

                {isBathroomDropdownOpen && (
                  <div className="bg-white border border-black/10 rounded-xl shadow-lg absolute max-h-60 mt-1 overflow-y-auto z-50 w-full">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        onClick={() => {
                          setSelectedBathroom(num.toString());
                          setIsBathroomDropdownOpen(false);
                        }}
                        className="flex p-2.5 cursor-pointer hover:bg-gray-50 items-center w-full">
                        <span className="text-sm font-medium">{num}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-black mt-4"
            onClick={handleCalculate}
            disabled={!selectedBedroom}>
            Calculate
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] overflow-hidden bg-gradient-to-b from-white to-gray-50 border border-gray-200 shadow-lg">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Revenue Projection
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Projection for{" "}
              <span className="font-medium text-gray-900">{selectedCity}</span>,{" "}
              <span className="font-medium text-gray-900">{selectedArea}</span>,{" "}
              <span className="font-medium text-gray-900">
                {selectedBedroom}
              </span>
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {selectedPropertyData && (
            <div className="mt-6 space-y-6 animate-in fade-in-50 duration-500">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md border border-gray-200">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50 blur-xl"></div>
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-tr from-blue-600/10 to-purple-600/10 opacity-30 blur-xl"></div>
                <h3 className="mb-4 text-sm font-medium text-blue-600 tracking-wider uppercase">
                  Potential Revenue Range
                </h3>
                <div className="flex items-baseline flex-wrap md:flex-nowrap">
                  <span className="text-2xl font-bold text-gray-900 animate-in slide-in-from-left-5 duration-700 whitespace-nowrap">
                    <span className="text-lg">AED</span>{" "}
                    {selectedPropertyData.rev1} -{" "}
                    <span className="text-lg">AED</span>{" "}
                    {selectedPropertyData.rev2}
                  </span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-in slide-in-from-left duration-1500"></div>
                </div>
              </div>

              <div className="w-1/3 rounded-xl bg-gradient-to-br from-white to-gray-50 p-3 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-blue-600/20 hover:shadow-lg animate-in fade-in-50 duration-700 delay-200">
                <p className="text-xs font-medium text-blue-600 tracking-wider uppercase">
                  Occupancy Rate
                </p>
                <p className="mt-0.5 text-lg font-semibold text-gray-900">
                  {selectedPropertyData.occu_rate}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 animate-in fade-in-50 duration-700 delay-300 border border-gray-200">
                <p className="text-sm text-gray-600">
                  Based on Dubai&apos;s current market trends and historical
                  data.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
