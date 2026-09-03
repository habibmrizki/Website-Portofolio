"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sparkles, Send } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/#home", sectionId: "home" },
  { name: "About", href: "/#about-me", sectionId: "about-me" },
  { name: "Portfolio", href: "/#portofolio", sectionId: "portofolio" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ["home", "about-me", "portofolio", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    setMobileMenuOpen(false);
    if (isHome) {
      isManualScrolling.current = true;
      setActiveSection(sectionId);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);

      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`w-full h-[70px] fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030014]/85 backdrop-blur-xl border-b border-purple-500/15 shadow-[0_10px_30px_rgba(3,0,20,0.8)]"
          : "bg-[#030014]/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand Logo & Name */}
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group z-10 outline-none focus:outline-none focus-visible:outline-none select-none"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden p-px gradient-to-r from-purple-500 via-indigo-500 to-cyan-400">
            <div className="w-full h-full bg-[#030014] rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/NavLogo.png"
                alt="Habib Logo"
                width={40}
                height={40}
                className="object-cover group-hover:rotate-180 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          <span className="font-bold text-lg tracking-wide text-transparent bg-clip-text gradient-to-r from-white via-slate-200 to-purple-300 hidden sm:inline-block">
            Habib <span className="text-purple-400 font-light">Dev</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 bg-[#030014]/80 border border-purple-500/20 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(112,66,248,0.15)]">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.sectionId;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 select-none ${
                    isActive
                      ? "text-white gradient-to-r from-purple-600/70 to-indigo-600/70 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full text-white gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 outline-none focus:outline-none focus-visible:outline-none select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>Lets Talk</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden z-20 p-2 text-slate-300 hover:text-white bg-purple-950/40 border border-purple-500/30 rounded-xl backdrop-blur-md outline-none focus:outline-none focus-visible:outline-none select-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-purple-300" />
          ) : (
            <Menu className="w-6 h-6 text-purple-300" />
          )}
        </button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[70px] bg-[#030014]/95 border-b border-purple-500/20 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 duration-300">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className="text-slate-200 hover:text-purple-300 text-base font-medium py-2.5 px-4 rounded-xl hover:bg-purple-950/40 border border-transparent hover:border-purple-500/20 transition-all flex items-center justify-between outline-none focus:outline-none select-none"
              >
                <span>{item.name}</span>
                <span className="text-xs text-purple-400/60">➔</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-slate-800/80 mt-2">
              <Link
                href="/#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl text-white gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/30 shadow-lg shadow-purple-950/50 outline-none focus:outline-none select-none"
              >
                <Send className="w-4 h-4 text-purple-200" />
                <span>Contact Me</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
