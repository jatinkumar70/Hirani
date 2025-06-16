"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  index: number
  image: string
}

export function FeatureCard({ title, description, index, image }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 lg:w-[70%] w-[90%] lg:text-left text-center bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="mb-4 relative h-32 w-32 mx-auto lg:mx-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  )
}

