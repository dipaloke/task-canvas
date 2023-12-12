import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//cn function enabling us to safely combine dynamic tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
