"use client";

import { ShoppingBag, Stethoscope, Calendar, ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const Hero3 = () => {
  // Referencias para las animaciones
  const bgRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuramos la timeline principal
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
        duration: 1,
      },
    });

    // Animaciones secuenciales
    tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 0.5 })
      .fromTo(
        titleRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
        }
      )
      .fromTo(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.4"
      )
      .fromTo(
        featuresRef.current?.children || [],
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.5,
        },
        "-=0.2"
      )
      .fromTo(
        imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
        },
        "-=1"
      );

    // Hover animations para los botones
    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      Array.from(buttons).forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
          });
        });
      });
    }
  }, []);

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Background Pattern */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-100 opacity-50"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24">
          {/* Main Content */}
          <div className="text-center lg:text-left flex flex-col-reverse md:flex-row lg:flex lg:items-center lg:justify-between">
            <div className="lg:mt-20 lg:w-1/2">
              <div ref={titleRef}>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Todo lo que tu</span>
                  <span className="block text-primary-600">
                    mascota necesita,
                  </span>
                  <span className="block">sin salir de casa</span>
                </h1>
              </div>

              <p
                ref={subtitleRef}
                className="mt-6 text-lg leading-8 text-gray-600"
              >
                Desde alimentos premium hasta atención veterinaria, encuentra
                todo lo que tu mascota necesita en un solo lugar.
              </p>

              {/* Features */}
              <div
                ref={featuresRef}
                className="mt-4 lg:mt-10 grid grid-cols-3 gap-4 sm:grid-cols-3"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-primary-500" />
                  <span className="text-sm text-gray-600">
                    Productos Premium
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-primary-500" />
                  <span className="text-sm text-gray-600">
                    Atención Veterinaria
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary-500" />
                  <span className="text-sm text-gray-600">Agenda Online</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                ref={ctaRef}
                className="mt-4 lg:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link href="/appointments">
                  <button className="inline-flex items-center px-6 py-3 border border-primary-500 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Agendar Consulta
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div ref={imageRef} className=" lg:mt-0 lg:w-1/2">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <Image
                  src="/hero11.png"
                  alt="Mascotas felices"
                  width={300}
                  height={300}
                  className="w-full pt-8 px-12 lg:p-16 pb-4 rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3;
