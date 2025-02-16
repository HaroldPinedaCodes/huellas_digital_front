"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// import clsx from "clsx";
import type { HeroBlock } from "@/types/blocks";
import { motion } from "framer-motion";

export function HeroSection({ data }: { data: HeroBlock }) {
  const { heading, subHeading, image, mobileImage, link } = data;

  return (
    <header className="relative min-h-[800px] w-full overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-blue-50">
        {/* Soft watercolor effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFE5EC]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E6FFFA]/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full min-h-[800px] items-center">
          {/* Text Content */}
          <div className="pt-20 lg:pt-0 max-w-xl">
            {/* Line Accent */}
            <div className="inline-block mb-6">
              <div className="h-16 w-1.5 bg-gradient-to-b from-teal-400 to-blue-400 rounded-full" />
            </div>

            {/* Heading */}
            <h1 className="text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-gray-900">
              {heading}
            </h1>

            {/* Subheading */}
            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-lg">
              {subHeading}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={link?.url || "#"}
                className="inline-flex px-8 py-4 text-white text-lg font-medium
                         bg-gradient-to-r from-blue-500 to-teal-400 
                         rounded-full shadow-lg hover:shadow-xl
                         transform hover:-translate-y-0.5 
                         transition-all duration-200"
              >
                Agenda tu cita
              </Link>
              <Link
                href="/services"
                className="inline-flex px-8 py-4 text-gray-700 text-lg font-medium
                         bg-white/80 backdrop-blur-sm 
                         rounded-full shadow-md hover:shadow-lg
                         transform hover:-translate-y-0.5 
                         transition-all duration-200"
              >
                Explorar servicios
              </Link>
            </div>
          </div>

          {/* Image Container with Blend Effect */}
          <div className="relative h-full min-h-[500px] lg:min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background blend effect for image */}
              <div className="absolute right-0 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-white/10 to-white/30 rounded-full blur-2xl" />

              {/* Image */}
              <Image
                alt={image[0]?.alternativeText ?? "Veterinario con mascota"}
                src={image[0]?.url}
                fill
                className="object-contain object-center"
                priority
                quality={95}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
