"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Ticket, X } from "lucide-react";
import { Button } from "../../../../components/ui/Button/Button";
import { useState } from "react";

interface PromoCodeProps {
  isApplying: boolean;
  isApplied: boolean;
  voucherCode: string;
  onApplyVoucher: (code: string) => void;
  onRemoveVoucher: () => void;
}

export function PromoCode({
  isApplying,
  isApplied,
  voucherCode,
  onApplyVoucher,
  onRemoveVoucher,
}: PromoCodeProps) {
  const [inputVoucher, setInputVoucher] = useState("");

  const handleApplyCode = () => {
    if (!inputVoucher.trim()) return;
    onApplyVoucher(inputVoucher);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-black/20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-gray-800">Promo codes</h2>
        <Ticket className="h-4 w-4 text-gray-500" />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {isApplied ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {voucherCode}
                  </p>
                  <p className="text-xs text-green-600">Promo code applied</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveVoucher}
                className="h-8 w-8 p-0 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 w-full mb-4">
              <div className="relative">
                <input
                  placeholder="promo code"
                  className="w-full border border-black/20 p-3 rounded-lg pr-24"
                  value={inputVoucher}
                  onChange={(e) => setInputVoucher(e.target.value)}
                />
                {inputVoucher && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-28 top-1/2 transform -translate-y-1/2 h-8 text-gray-600 hover:text-gray-800"
                    onClick={() => setInputVoucher("")}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-10 bg-primary-gold text-white ${
                    isApplying ? "w-auto px-4" : ""
                  }`}
                  onClick={handleApplyCode}
                  disabled={!inputVoucher.trim() || isApplying}>
                  {isApplying ? "Applying..." : "Apply"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Enter a valid promo code to get discounts on your booking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
