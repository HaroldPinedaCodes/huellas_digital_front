"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { HeroBlock } from "@/types/blocks";

export function HeroSection({ data }: { data: HeroBlock }) {
  const {
    heading,
    subHeading,
    image,
    mobileImage,
    link,
    textAlignment = "left", // Default values
    verticalAlignment = "center",
  } = data;

  console.log("data...", data);

  if (!image?.length) return null;

  const alignmentClasses = {
    left: "md:ml-24",
    right: "md:ml-auto md:mr-24",
    center: "mx-auto text-center",
  };

  const verticalClasses = {
    top: "justify-start items-start pt-40",
    center: "justify-center items-center",
    bottom: "justify-end items-end pb-40",
  };

  return (
    <header className="relative h-[812px] md:h-[600px] overflow-hidden">
      <Image
        alt={image[0].alternativeText ?? "Hero desktop"}
        className="absolute inset-0 hidden md:block object-cover w-full h-full mt-24"
        height={1080}
        src={image[0].url}
        width={1920}
        priority
      />
      {mobileImage?.[0] && (
        <Image
          alt={mobileImage[0].alternativeText ?? "Hero mobile"}
          className="absolute inset-0 md:hidden object-cover w-full h-full mt-16"
          height={812}
          src={mobileImage[0].url}
          width={375}
          priority
        />
      )}
      <div
        className={clsx(
          "relative z-10 flex flex-col h-full p-6 md:p-12",
          alignmentClasses[textAlignment],
          verticalClasses[verticalAlignment],
          "w-full md:w-1/2"
        )}
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight">
            {heading}
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-700">
            {subHeading}
          </p>
          <Link
            className="mt-8 inline-block px-8 py-4 text-base font-medium text-black bg-[#FBBC05] rounded-md hover:bg-[#fac533] transition-colors"
            href={link.url}
          >
            {link.text}
          </Link>
        </div>
      </div>
    </header>
  );
}
