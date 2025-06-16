import type { StaticImageData } from "next/image"

export interface CategoryImage {
  id: string
  image: StaticImageData
}

export interface Category {
  id: string
  title: string
  images: CategoryImage[]
}

