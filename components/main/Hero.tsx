"use client";

import React from "react";
import HeroContent from "../sub/HeroContent";
import StarsCanvas from "@/components/main/StarBackground";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <StarsCanvas />

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </section>
  );
};

export default Hero;
