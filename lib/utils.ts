import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Clock as ClockIcon,
  Check as CheckIcon,
  Cloud as CloudIcon,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];

export function getStrapiURL(path = "") {
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_UPLOAD_URL || "http://localhost:1337";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseURL}${normalizedPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (url === null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function getIcon(name: string) {
  switch (name) {
    case "CLOCK_ICON":
      return ClockIcon;
    case "CHECK_ICON":
      return CheckIcon;
    case "CLOUD_ICON":
      return CloudIcon;
    default:
      return null;
  }
}
