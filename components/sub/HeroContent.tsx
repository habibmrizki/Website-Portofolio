"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";

const HeroContent = () => {
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-between px-6 sm:px-12 lg:px-20 mt-32 sm:mt-40 w-full relative z-10"
    >
      {/* Left Text Content  */}
      <div className="h-full w-full md:w-1/2 flex flex-col gap-5 justify-center text-left items-start z-10">
        {/* Welcome Badge */}
        <motion.div
          variants={slideInFromTop}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="Welcome-box flex items-center py-2 px-3.5 border border-purple-500/40 opacity-90 
             rounded-full cursor-pointer gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-950/80 
             hover:from-purple-900 hover:to-indigo-900 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-md"
        >
          <SparklesIcon className="text-purple-300 mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          <h1 className="Welcome-text text-xs sm:text-sm text-white font-medium tracking-wide">
            Fullstack Developer Portfolio
          </h1>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-[600px] w-auto h-auto"
        >
          <span>
            Providing
            <span className="text-transparent bg-clip-text gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              {" "}
              the best{" "}
            </span>
            project experience
          </span>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-3 max-w-[600px] leading-relaxed"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-row items-center gap-4 mt-2 flex-wrap"
        >
          <button
            onClick={() => handleScrollTo("portofolio")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Learn More!</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400/60 backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            <Send className="w-4 h-4 text-purple-300" />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>

      {/* Right Column: Hero Visual Graphic */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full md:w-1/2 h-full hidden md:flex justify-end items-center z-10"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
          className="object-contain filter drop-shadow-[0_0_35px_rgba(168,85,247,0.25)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
