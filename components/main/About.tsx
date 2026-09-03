/* eslint-disable @next/next/no-img-element */
"use client";

import React, { memo, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Code, Award, Globe, ArrowUpRight, Download } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "@/services/supabase";

const AnimatedCounter = ({
  target,
  duration = 1200,
}: {
  target: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};

const ProfileImage = memo(function ProfileImage() {
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1000"
      className="flex justify-center lg:justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2"
    >
      <div className="relative group">
        <div className="absolute -inset-6 opacity-25 z-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
        </div>

        <div className="relative">
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transition-all duration-700 group-hover:scale-105">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-700 hidden sm:block" />

            <img
              src="/image.png"
              alt="Habib Profile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const About = () => {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [certCount, setCertCount] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });

    async function fetchCounts() {
      try {
        const { count: projCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });

        const { count: cCount } = await supabase
          .from("portfolio_certificates")
          .select("*", { count: "exact", head: true });

        if (projCount !== null) setProjectCount(projCount);
        if (cCount !== null) setCertCount(cCount);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }

    fetchCounts();
  }, []);

  return (
    <section
      id="about-me"
      className="scroll-mt-24 px-6 sm:px-12 lg:px-20 max-w-9xl mx-auto py-12 flex flex-col gap-12"
    >
      {/* Upper Grid: Text & Profile Image */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text Section */}
        <div className="flex flex-col gap-7 text-center lg:text-left">
          <h2
            data-aos="fade-right"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-indigo-400 to-[#a855f7]">
              Hello, Im
            </span>
            <span className="block text-gray-200">Habib Muhammad Rizki</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify"
          >
            seorang programmer yang tertarik dalam pengembangan Front-End. Saya
            berfokus pada menciptakan pengalaman digital yang menarik dan selalu
            berusaha memberikan solusi terbaik dalam setiap proyek.
          </p>

          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full"
          >
            <a
              href="https://nyzdbfhsrvciscywmkrv.supabase.co/storage/v1/object/public/CV/CV-Habib-Muhammad-Rizki.pdf?download=CV-Habib-Muhammad-Rizki.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto"
            >
              <button className="w-full lg:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 border border-purple-400/30 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 cursor-pointer outline-none">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Download CV</span>
              </button>
            </a>

            <Link
              href="/#portofolio"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                const el = document.getElementById("portofolio");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full lg:w-auto outline-none focus:outline-none select-none"
            >
              <button className="w-full lg:w-auto px-6 py-2.5 sm:py-3 rounded-xl border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10 hover:scale-105 cursor-pointer outline-none">
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Projects</span>
              </button>
            </Link>
          </div>
        </div>

        <ProfileImage />
      </div>

      {/* Dynamic Statistics Cards Section */}
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4"
      >
        {/*TOTAL PROJECTS */}
        <div
          onClick={() => {
            document
              .getElementById("portofolio")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-[#131527]/60 border border-slate-800/80 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md cursor-pointer group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-950/60 text-purple-400 rounded-xl border border-purple-800/40">
              <Code className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-white">
              {projectCount !== null ? (
                <AnimatedCounter target={projectCount} />
              ) : (
                "..."
              )}
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                TOTAL PROJECTS
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Innovative web solutions crafted
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
          </div>
        </div>

        {/* CERTIFICATES */}
        <div
          onClick={() => {
            document
              .getElementById("portofolio")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-[#131527]/60 border border-slate-800/80 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md cursor-pointer group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-indigo-950/60 text-indigo-400 rounded-xl border border-indigo-800/40">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-white">
              {certCount !== null ? (
                <AnimatedCounter target={certCount} />
              ) : (
                "..."
              )}
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                CERTIFICATES
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Professional skills validated
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-300 transition-colors" />
          </div>
        </div>

        {/*YEARS OF EXPERIENCE */}
        <div className="bg-[#131527]/60 border border-slate-800/80 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-cyan-950/60 text-cyan-400 rounded-xl border border-cyan-800/40">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-white">
              <AnimatedCounter target={1} />
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                YEARS OF EXPERIENCE
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Continuous learning journey
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
