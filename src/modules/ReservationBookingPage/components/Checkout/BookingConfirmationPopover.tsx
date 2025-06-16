"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Clock } from "lucide-react";
import { Dialog, DialogContent } from "../../../../components/ui/Dialog/Dialog";

type BookingStatus = "idle" | "loading" | "success" | "error";

interface BookingConfirmationPopoverProps {
  isOpen: boolean;
  status: BookingStatus;
  errorMessage?: string;
  onClose: () => void;
  onRequest?: boolean;
}

export function BookingConfirmationPopover({
  isOpen,
  status,
  errorMessage,
  onClose,
  onRequest = false,
}: BookingConfirmationPopoverProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <div className="relative mb-6">
                {/* Rotating Loader */}
                <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {onRequest
                  ? "Submitting Your Inquiry..."
                  : "Redirecting you to payment..."}
              </h3>
              <p className="text-gray-600 text-center">
                {onRequest
                  ? "Please wait while we process your request"
                  : "Please wait..."}
              </p>
            </motion.div>
          )}

          {status === "idle" && onRequest && (
            <motion.div
              key="success-inquiry"
              className="flex flex-col items-center justify-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}>
              {/* Success Icon with Animation */}
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}>
                  <Check className="w-12 h-12 text-green-600" />
                </motion.div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Inquiry Submitted Successfully!
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">
                      Your booking request has been sent to our team
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">
                      We&apos;ll get back to you within 24 hours
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    <strong>What&apos;s next?</strong>
                    <br />
                    Our property specialists will review your request and
                    contact you with availability, pricing, and booking details
                    for your selected dates.
                  </p>
                </div>

                <p className="text-gray-500 text-xs mt-4">
                  Urgent Request Redirecting to Whatsapp in a few seconds...
                </p>
              </motion.div>
            </motion.div>
          )}

          {status === "idle" && !onRequest && (
            <motion.div
              key="success-payment"
              className="flex flex-col items-center justify-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}>
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}>
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">
                Redirecting you to payment...
              </h3>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              className="flex flex-col items-center justify-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {onRequest ? "Inquiry Failed" : "Booking Failed"}
              </h3>
              <p className="text-gray-600 text-center">
                {errorMessage ||
                  `There was an error processing your ${
                    onRequest ? "inquiry" : "booking"
                  }. Please try again.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
