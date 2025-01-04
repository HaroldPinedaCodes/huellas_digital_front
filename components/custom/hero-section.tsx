// components/custom/hero-section.tsx
import Link from "next/link";
import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";
import type { HeroBlock } from "@/types/blocks";

interface HeroSectionProps {
  data: HeroBlock; // Ahora espera el tipo HeroBlock
}

export function HeroSection({ data }: HeroSectionProps) {
  const { heading, subHeading, image, link } = data;

  if (!image || image.length === 0) {
    return null;
  }

  const imageURL = getStrapiURL(image[0].url);

  return (
    <header className="relative h-[600px] overflow-hidden">
      <Image
        alt={image[0].alternativeText ?? "Hero image"}
        className="absolute inset-0 object-cover w-full h-full"
        height={1080}
        src={imageURL}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-40">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading}</p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={link.url}
        >
          {link.text}
        </Link>
      </div>
    </header>
  );
}
