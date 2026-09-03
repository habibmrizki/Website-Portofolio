"use client";

import React, { useState, useEffect } from "react";
import { Box, AppBar, Tabs, Tab } from "@mui/material";
import { Code, Award, Boxes } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import PortfolioCertificates from "./PortofolioCertificates";
import TechStackSection from "./TechStackSection";
import PortofolioProjects from "./PortofolioProjects";

export default function PortfolioTabs() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div
      id="portofolio"
      className="scroll-mt-24 md:px-[10%] px-[5%] w-full mt-12 bg-transparent"
    >
      {/* Header */}
      <div className="text-center pb-10">
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-4xl font-bold text-transparent bg-clip-text gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Portfolio Showcase
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      <Box data-aos="fade-up" data-aos-delay="300" sx={{ width: "100%" }}>
        <AppBar position="static" sx={{ bgcolor: "transparent" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "16px",
              gap: 5,

              "& .MuiTabs-flexContainer": {
                gap: "12px",
              },

              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {[
              { label: "Projects", icon: <Code /> },
              { label: "Certificates", icon: <Award /> },
              { label: "Tech Stack", icon: <Boxes /> },
            ].map((item) => (
              <Tab
                key={item.label}
                icon={item.icon}
                label={item.label}
                iconPosition="top"
                sx={{
                  textTransform: "none",
                  borderRadius: "16px",
                  minHeight: 72,
                  fontWeight: 600,
                  color: "#9ca3af",
                  background: "rgba(88, 28, 135, 0.25)",
                  transition: "all 0.3s ease",

                  "&.Mui-selected": {
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.6))",
                    color: "#fff",
                    boxShadow: "0 0 25px rgba(139,92,246,0.4)",
                  },
                }}
              />
            ))}
          </Tabs>
        </AppBar>

        {/* Animated Tab Content Transition */}
        <div className="relative min-h-[300px] mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {value === 0 && <PortofolioProjects />}
              {value === 1 && <PortfolioCertificates />}
              {value === 2 && <TechStackSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Box>
    </div>
  );
}
