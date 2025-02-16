import React from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
// import heroImage from "@/public/hero.png";

const hero = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[650px] relative">
      <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
        <div className="text-center md:text-left space-y-6">
          <p className="text-orange-600 uppercase font-semibold">100% </p>
          <h1 className="text-5xl font-semibold lg:text-6xl !leading-tight">
            Find your dream job
          </h1>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo.
          </p>
          <button className="primary-btn">Get Started</button>
          <button className="px-8 py-3 bg-white text-blue-500 rounded-full">
            Learn More
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          src={"/hero.png"}
          width={500}
          height={500}
          alt="hero"
          className="w-[350px] md:w-[550px] xl:w-[700px]"
        />
      </div>
    </div>
  );
};

export default hero;
