import axios from "axios";
import { apiBaseurl } from "../../api";

interface IProps {
  latitude: string;
  longitude: string;
  startDate: string;
  endDate: string;
}
export const searchProperty = async (searchParams: IProps) => {
  const { latitude, longitude, startDate, endDate } = searchParams;
  try {
    const response = await axios.get(
      `${apiBaseurl}/api/v1/property/search-property?from_date=${startDate}&to_date=${endDate}&latitude=${latitude}&longitude=${longitude}`
    );
    if (response.data.currentRecords.length > 0) {
      return response.data.currentRecords || [];
    } else {
      throw new Error(`Failed to fetch data: Status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
