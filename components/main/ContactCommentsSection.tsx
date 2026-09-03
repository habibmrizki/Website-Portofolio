"use client";
import { useEffect } from "react";
import Contact from "./Contact";
import Comments from "./Comment";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCommentsSection = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <section
      id="contact"
      className="w-full flex gap-6 flex-col justify-center h-full py-24 md:px-[10%] px-[5%] mt-12"
    >
      <div data-aos="fade-up" data-aos-delay="100" className="text-center ">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text gradient-to-r from-[#6366f1] to-[#a855f7]">
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-slate-400 text-center text-sm md:text-base "
        >
          Got a question? Send me a message, and I&apos;ll get back to you soon.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4  items-stretch">
        <Contact />
        <Comments />
      </div>
    </section>
  );
};

export default ContactCommentsSection;
