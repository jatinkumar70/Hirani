import { LocationDetails } from "../components/Common/CompactSearchBar/types";
import { api } from "../utils/api";

export async function fetchLocationById(id: string): Promise<LocationDetails> {
  if (!id) throw new Error("Place ID is required");

  try {
    const res = await api.get(`/google/get-google-nearby?place_id=${id}`);
    const finalData = res.data.data;
    const addressComponents = finalData.address_components || [];

    const getAddressPart = (types: string[]) => {
      const component = addressComponents.find((comp: any) =>
        types.every((type) => comp?.types?.includes(type))
      );
      return component ? component.long_name : "";
    };

    // Construct address parts
    const addressLine1Parts = [
      finalData.name,
      getAddressPart(["premise"]),
      getAddressPart(["street_number"]),
      getAddressPart(["route"]),
    ].filter(Boolean);

    const fullAddress = [
      addressLine1Parts.join(", "),
      getAddressPart(["country", "political"]),
    ]
      .filter(Boolean)
      .join(" - ");

    return {
      placeId: finalData.place_id || id,
      addressLine1: addressLine1Parts.join(", "),
      addressLine2: getAddressPart(["route"]),
      city: getAddressPart(["locality", "political"]),
      state: getAddressPart(["administrative_area_level_1", "political"]),
      pinCode: getAddressPart(["postal_code"]),
      country: getAddressPart(["country", "political"]),
      longitude: finalData.geometry?.location?.lng || 0,
      latitude: finalData.geometry?.location?.lat || 0,
      rating: finalData.rating || 0,
      fullAddress,
      addressParts: addressLine1Parts,
    };
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw new Error("Failed to fetch location details");
  }
}
