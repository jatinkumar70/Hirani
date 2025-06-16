import axios from "axios";
import { apiBaseurl } from "../../api";

export const getCalenderId = async (startDate: string, endDate: string) => {
    try {
        const response = await axios.get(`${apiBaseurl}/api/v1/property/get-calendar?from_date=${startDate}&to_date=${endDate}`)
        if (response.data.currentRecords.length > 0) {
            return response.data.currentRecords || [];
        } else {
            throw new Error(`Failed to fetch data: Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};