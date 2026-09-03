"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import Certificate from "../sub/Certificate";
import { ChevronDown, ChevronUp, Award } from "lucide-react";

interface CertificateType {
  id: string;
  title: string;
  image_url: string;
}

let cachedCertificates: CertificateType[] | null = null;

export default function PortofolioCertificates() {
  const [certificates, setCertificates] = useState<CertificateType[]>(
    cachedCertificates || [],
  );
  const [loading, setLoading] = useState(!cachedCertificates);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 4;

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from("portfolio_certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        cachedCertificates = data || [];
        setCertificates(data || []);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const handleToggleShow = () => {
    if (showAll) {
      setShowAll(false);
      const el = document.getElementById("portofolio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setShowAll(true);
    }
  };

  if (loading) {
    return (
      <section className="py-10 flex flex-col items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full flex flex-col items-center gap-3 animate-pulse"
            >
              <div className="w-full aspect-4/3 rounded-2xl  border border-purple-500/10 bg-slate-800/40" />
              <div className="h-4 w-3/4 bg-slate-800/50 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center gap-3">
        <Award className="w-12 h-12 text-purple-400/50 mb-1" />
        <p className="text-base font-medium">No certificates found.</p>
      </div>
    );
  }

  const visibleCertificates = showAll
    ? certificates
    : certificates.slice(0, INITIAL_COUNT);

  return (
    <section className="py-10 flex flex-col items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {visibleCertificates.map((cert) => (
          <Certificate
            key={cert.id}
            ImgSertif={cert.image_url}
            title={cert.title}
          />
        ))}
      </div>

      {certificates.length > INITIAL_COUNT && (
        <button
          onClick={handleToggleShow}
          className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 text-purple-200 text-sm font-semibold transition-all backdrop-blur-sm hover:bg-purple-900/50 cursor-pointer"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show More ({certificates.length - INITIAL_COUNT} More){" "}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </section>
  );
}
