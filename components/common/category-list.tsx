"use client";

import React, { useEffect, useRef, useState } from "react";
import { CategoryItem } from "@/components/categories/CategoryItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: null | undefined;
}

interface CategoryListProps {
  categories: Category[];
  title?: string;
}

const CategoryList = ({ categories, title }: CategoryListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const position = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      setShowLeftArrow(position > 0);
      setShowRightArrow(position < maxScroll - 10);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative space-y-6 py-4">
      {title && (
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            {title}
          </h2>
        </div>
      )}

      <div className="relative group">
        {/* Botón izquierdo */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Desplazar a la izquierda"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </button>
        )}

        {/* Categorías */}
        <div
          ref={containerRef}
          className="no-scrollbar flex space-x-6 overflow-x-auto scroll-smooth px-4 pb-4"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              slug={category.slug}
              image={category.image}
              // index={index}
              letter={category.name[0]}
            />
          ))}
        </div>

        {/* Botón derecho */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Desplazar a la derecha"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-colors">
              <ChevronRight className="h-5 w-5" />
            </div>
          </button>
        )}

        {/* Degradados en los bordes */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        )}
        {showRightArrow && (
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export { CategoryList };
