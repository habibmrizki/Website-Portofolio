"use client";

import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type SocialLink = {
  name: string;
  displayName: string;
  subText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  color: string;
  gradient: string;
  isPrimary?: boolean;
};

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/habib-rizki/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@habibmr",
    icon: Instagram,
    url: "https://www.instagram.com/gaha.prakoso/",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "YouTube",
    displayName: "Youtube",
    subText: "@habibmr",
    icon: Youtube,
    url: "https://www.youtube.com/@habibrizki3357",
    color: "#FF0000",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@habibmr",
    icon: Github,
    url: "https://github.com/habibmrizki",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "Discord",
    displayName: "Discord",
    subText: "@habibmr",
    icon: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <path d="M20.317 4.369A19.791 19.791 0 0015.885 3c-.191.347-.403.813-.552 1.18a18.27 18.27 0 00-6.666 0c-.149-.367-.366-.833-.558-1.18a19.736 19.736 0 00-4.438 1.372C.533 9.046-.32 13.58.099 18.057a19.9 19.9 0 005.993 3.034c.483-.658.913-1.354 1.283-2.086-.706-.267-1.38-.6-2.02-.985.17-.125.336-.255.496-.389 3.894 1.823 8.11 1.823 11.958 0 .162.134.328.264.498.389-.64.385-1.316.718-2.024.985.37.732.8 1.428 1.285 2.086a19.866 19.866 0 005.99-3.034c.5-5.177-.838-9.67-3.241-13.688zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.211 0 2.177 1.095 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.334.955-2.419 2.157-2.419 1.211 0 2.177 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
      </svg>
    ),
    url: "https://discord.com/users/398117605870796801",
    gradient: "from-[#5865F2] via-[#4752C4] to-[#3C45A5]",
    color: "#5865F2",
  },
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find((l) => l.isPrimary);
  const instagram = socialLinks.find((l) => l.name === "Instagram");
  const youtube = socialLinks.find((l) => l.name === "YouTube");
  const github = socialLinks.find((l) => l.name === "GitHub");
  const discord = socialLinks.find((l) => l.name === "Discord");

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  if (!linkedIn) return null;

  const secondRow = [instagram, youtube].filter((l): l is SocialLink =>
    Boolean(l),
  );

  const thirdRow = [github, discord].filter((l): l is SocialLink => Boolean(l));

  return (
    <div className="w-full flex flex-col gap-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 py-7 backdrop-blur-xl mt-6 shadow-xl">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2.5">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LINKEDIN - PRIMARY */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 shadow-md opacity-100"
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${linkedIn.gradient}`}
          />

          <div className="relative flex items-center gap-4">
            <div className="relative p-2.5 rounded-lg bg-white/5 border border-white/10">
              <linkedIn.icon
                className="w-6 h-6"
                style={{ color: linkedIn.color }}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-100 group-hover:text-white transition-colors">
                {linkedIn.displayName}
              </span>
              <span className="text-xs text-gray-400">{linkedIn.subText}</span>
            </div>
          </div>

          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </a>

        {/* SECOND ROW: INSTAGRAM & YOUTUBE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {secondRow.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 shadow-md opacity-100"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
              />

              <div className="relative p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                <link.icon className="w-5 h-5" style={{ color: link.color }} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-100 group-hover:text-white transition-colors truncate">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate">{link.subText}</span>
              </div>

              <ExternalLink className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-colors shrink-0" />
            </a>
          ))}
        </div>

        {/* THIRD ROW: GITHUB & DISCORD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {thirdRow.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 shadow-md opacity-100"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
              />

              <div className="relative p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                <link.icon className="w-5 h-5" style={{ color: link.color }} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-100 group-hover:text-white transition-colors truncate">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate">{link.subText}</span>
              </div>

              <ExternalLink className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
