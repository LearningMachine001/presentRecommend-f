import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface GiftItem {
  name: string
  brand: string
  price: number
  productUrl: string
  imageUrl: string
}
