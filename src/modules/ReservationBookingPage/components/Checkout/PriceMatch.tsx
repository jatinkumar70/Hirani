"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";

export function PriceMatch() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => setIsLiked((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-2xl shadow-sm border border-black/20">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-medium">Price match</h2>
          <p className="text-base text-gray-500">
            This property&apos;s price is the best you can find.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLikeToggle}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Tag
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }`}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
