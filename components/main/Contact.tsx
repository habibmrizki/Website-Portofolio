"use client";

import { useState, useEffect } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import SocialLinks from "../sub/SocialLink";

import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Message sent successfully 🚀");

      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section id="contact" className="w-full">
      <div
        data-aos="fade-up"
        className="w-full max-w-2xl h-full flex flex-col gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl p-8"
      >
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl font-semibold text-white mb-2"
        >
          Get in Touch
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-gray-300 mb-8"
        >
          Have something to discuss? Send me a message and lets talk.
        </p>

        <form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="200"
          className="space-y-5"
        >
          {/* NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              value={name}
              data-aos="fade-up"
              data-aos-delay="250"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div className="relative ">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              value={email}
              data-aos="fade-up"
              data-aos-delay="300"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full pl-10 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4.5 text-gray-400 w-5 h-5" />
            <textarea
              value={message}
              data-aos="fade-up"
              data-aos-delay="350"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full pl-10 p-4 min-h-[140px] resize-none rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            data-aos="zoom-in"
            data-aos-delay="400"
            className="w-full h-12 gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6"></div>

        <SocialLinks />
      </div>
    </section>
  );
};

export default Contact;
