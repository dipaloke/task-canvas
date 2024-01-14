import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//cn function enabling us to safely combine dynamic tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//takes path as string, retuns a combination of (process.env.NEXT_PUBLIC_APP_URL) and combines path.
// stripe checkout redirect path
export function absoluteUrl(path: string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
