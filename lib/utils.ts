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
