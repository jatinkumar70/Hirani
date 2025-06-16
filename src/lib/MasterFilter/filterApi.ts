import type { FilterState } from "../../components/FilterModal/types";
import { ILocationDetails } from "../../models/Location.model";
import { showErrorToast } from "../../utils/toaster/toast";

// Create a cache to prevent duplicate API calls
const apiCache = {
  filterResults: null as any,
  amenities: null as any,
  lastFilterQuery: "",
};

export async function MasterFilter(
  FilterData: Partial<FilterState>,
  forceRefresh = false,
  locationDetails?: any
) {
  try {
    const queryParams = new URLSearchParams();

    if (
      FilterData.priceRange &&
      FilterData.priceRange.min !== undefined &&
      FilterData.priceRange.min !== null
    )
      queryParams.append("min", FilterData.priceRange.min.toString());

    if (
      FilterData.priceRange &&
      FilterData.priceRange.max !== undefined &&
      FilterData.priceRange.max !== null
    )
      queryParams.append("max", FilterData.priceRange.max.toString());

    if (FilterData.bedrooms !== undefined && FilterData.bedrooms !== null)
      queryParams.append("bedrooms", FilterData.bedrooms.toString());

    if (FilterData.beds !== undefined && FilterData.beds !== null)
      queryParams.append("total_beds", FilterData.beds.toString());

    if (FilterData.bathrooms !== undefined && FilterData.bathrooms !== null)
      queryParams.append("bathroom_full", FilterData.bathrooms.toString());

    if (FilterData.amenities?.length) {
      FilterData.amenities.forEach((amenity) =>
        queryParams.append("amenities", amenity)
      );
    }

    // Add city parameter if locationDetails exists and has data
    if (locationDetails && locationDetails) {
      queryParams.append("city", locationDetails);
    }

    const queryString = queryParams.toString();

    // Check if we already have this exact query in cache
    if (
      !forceRefresh &&
      queryString === apiCache.lastFilterQuery &&
      apiCache.filterResults
    ) {
      return apiCache.filterResults;
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/property/search-property?radius=10&${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache control to prevent browser caching
      cache: "no-store",
    });

    const data = await response.json();

    // Update cache
    apiCache.filterResults = data.data;
    apiCache.lastFilterQuery = queryString;

    return data.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

export async function MasterAmenities(forceRefresh = false) {
  try {
    // Return cached amenities if available
    if (!forceRefresh && apiCache.amenities) {
      return apiCache.amenities;
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/property/get-master-amenities?is_transform_data=true&pageNo=1&itemPerPage=200`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache control to prevent browser caching
      cache: "no-store",
    });

    const data = await response.json();

    if (data.message === "Token not found.") {
      showErrorToast("Token not found.");
    }

    // Update cache
    apiCache.amenities = data.data;

    return data.data;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw error;
  }
}
