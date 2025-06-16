import { toast } from "sonner";

// ✅ Show success notification
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    duration: 3000,
  });
};

// ✅ Show error notification
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-center",
    duration: 3000,
  });
};
export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: "top-center",
    duration: 3000,
  });
};
