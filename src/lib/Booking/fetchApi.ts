import { IInventoryPrice } from "../../types/types";
import { showErrorToast, showSuccessToast } from "../../utils/toaster/toast";

interface InventoryParams {
  propertyId: string;
  fromDate: string;
  toDate: string;
}

interface ChargesParams extends InventoryParams {
  pets: number;
  refundable: boolean;
  voucherCode?: string;
}

// Fetch inventory data
export async function fetchInventory({
  propertyId,
  fromDate,
  toDate,
}: InventoryParams): Promise<IInventoryPrice[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/inventory/get-inventory?property_details_uuid=${propertyId}&from_date=${fromDate}&to_date=${toDate}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch inventory: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
}

// Fetch charges breakup
export async function fetchChargesBreakup({
  propertyId,
  fromDate,
  toDate,
  pets,
  refundable,
  voucherCode,
}: ChargesParams): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/payments/get-charges-breakup?from_date=${fromDate}&to_date=${toDate}&property_details_uuid=${propertyId}&voucher_code=${voucherCode}&no_of_pats=${pets}&is_refundable=${refundable}`,
      { cache: "no-store" } // Don't cache price data
    );

    const data = await response.json(); // Read JSON once

    if (!response.ok) {
      if (data.message === "This property is not pet-friendly") {
        showErrorToast("This property is not pet-friendly");
      }
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching charges breakup:", error);
    throw error;
  }
}

// Book property
export async function bookProperty(bookingData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/inventory/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await response.json(); // Read JSON once

    if (!response.ok) {
      showErrorToast("Booking failed. Please try again.");
    }

    return data.data;
  } catch (error) {
    console.error("Error during booking:", error);
    throw error;
  }
}

// Initiate payment

export async function createBooking(bookingData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/inventory/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await response.json(); // Read JSON once

    if (data.message === "is_refundable is required")
      showErrorToast(data.message);

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   showErrorToast(errorData.message || "Failed to create booking");
    // }

    return data.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function initiatePayment(paymentData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/payments/initiate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );

    const data = await response.json(); // Read JSON once

    if (!response.ok) {
      const errorData = await response.json();
      showErrorToast(
        errorData.message || "Payment initiation failed. Please try again."
      );
    }

    return data.data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
}
