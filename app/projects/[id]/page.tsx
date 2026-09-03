"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Layers,
  Star,
} from "lucide-react";
import { supabase } from "@/services/supabase";
import { getTechLogoPath } from "@/utils/techLogos";

interface ProjectDetailData {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  image?: string;
  live_demo_url?: string;
  demo_url?: string;
  link?: string;
  github_url?: string;
  github?: string;
  total_tech?: number;
  total_technology?: number;
  total_features?: number;
  total_feature?: number;
  technologies?: string[] | string;
  tech_stack?: string[] | string;
  technology?: string[] | string;
  key_features?: string[] | string;
  features?: string[] | string;
  keyFeatures?: string[] | string;
}

function parseArrayField(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.filter((item) => typeof item === "string" && item.trim() !== "");
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => typeof item === "string" && item.trim() !== "");
        }
      } catch {
        // Fallback to split if JSON parse fails
      }
    }
    return trimmed
      .split(/,|\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function formatExternalUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return undefined;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<ProjectDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectDetail() {
      if (!id) return;
      setLoading(true);

      const decodedParam = decodeURIComponent(id).toLowerCase().trim();

      // 1. Try matching by direct database ID
      const { data: directData } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (directData) {
        setProject(directData);
        setLoading(false);
        return;
      }

      // 2. Fallback: Fetch all projects and match by title slug
      const { data: allProjects } = await supabase
        .from("projects")
        .select("*");

      if (allProjects && allProjects.length > 0) {
        const matched = allProjects.find((p: ProjectDetailData) => {
          if (!p.title) return false;
          const slug = p.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return slug === decodedParam;
        });

        if (matched) {
          setProject(matched);
        }
      }
      setLoading(false);
    }

    fetchProjectDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-400 gap-4">
        <p className="text-lg text-slate-300 font-medium">Project tidak ditemukan.</p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 rounded-xl text-sm font-medium transition-all border border-slate-700/50"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Derived fields from Supabase response
  const imageUrl = project.image_url || project.image || "/placeholder.png";
  const rawLiveDemoUrl = project.live_demo_url || project.demo_url || project.link;
  const rawGithubUrl = project.github_url || project.github;
  const liveDemoUrl = formatExternalUrl(rawLiveDemoUrl);
  const githubUrl = formatExternalUrl(rawGithubUrl);

  const technologiesList = parseArrayField(
    project.technologies || project.tech_stack || project.technology
  );
  const keyFeaturesList = parseArrayField(
    project.key_features || project.features || project.keyFeatures
  );

  const totalTech =
    project.total_tech ??
    project.total_technology ??
    technologiesList.length;

  const totalFeatures =
    project.total_features ??
    project.total_feature ??
    keyFeaturesList.length;

  return (
    <div className="min-h-screen mt-20 md:mt-24 text-slate-200 px-4 sm:px-8 lg:px-16 xl:px-24 py-10 font-sans relative z-10 max-w-7xl mx-auto">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8 flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131527]/80 hover:bg-slate-800/80 border border-slate-700/60 text-slate-200 font-medium transition-all backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="text-slate-400 font-medium">Projects</span>
        <span className="text-slate-500">&gt;</span>
        <span className="text-slate-200 font-medium">{project.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Main Information */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text gradient-to-r from-purple-200 via-pink-200 to-indigo-200 mb-3 tracking-tight">
              {project.title}
            </h1>
            {/* Glowing Accent Line */}
            <div className="h-1.5 w-24 gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)] mb-6" />
            <p className="text-slate-300 leading-relaxed text-sm md:text-base font-normal">
              {project.description}
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#131527]/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-lg hover:border-slate-700/60 transition-all">
              <div className="p-3 bg-indigo-950/60 text-indigo-400 rounded-xl border border-indigo-800/40 shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white leading-none">
                  {totalTech}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-1">Total Teknologi</p>
              </div>
            </div>

            <div className="bg-[#131527]/70 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-lg hover:border-slate-700/60 transition-all">
              <div className="p-3 bg-purple-950/60 text-purple-400 rounded-xl border border-purple-800/40 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white leading-none">
                  {totalFeatures}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-1">Fitur Utama</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 bg-[#131527]/90 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 text-sm font-semibold rounded-xl transition-all backdrop-blur-md shadow-lg shadow-indigo-950/30 hover:shadow-indigo-500/10"
              >
                <ExternalLink className="w-4 h-4 text-indigo-400" /> Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 bg-[#131527]/90 border border-slate-700/80 hover:border-slate-500 text-slate-200 text-sm font-semibold rounded-xl transition-all backdrop-blur-md shadow-lg"
              >
                <Github className="w-4 h-4 text-slate-300" /> Github
              </a>
            )}
          </div>

          {/* Technologies Used Section */}
          {technologiesList.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3 text-sm tracking-wide">
                <Code2 className="w-4 h-4 text-indigo-400" /> Technologies Used
              </div>
              <div className="flex flex-wrap gap-2.5">
                {technologiesList.map((tech, idx) => {
                  const logoPath = getTechLogoPath(tech);
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#131527]/80 border border-indigo-900/50 text-indigo-200 text-xs font-medium rounded-xl backdrop-blur-md hover:border-indigo-700/60 transition-colors shadow-sm"
                    >
                      {logoPath ? (
                        <Image
                          src={logoPath}
                          alt={tech}
                          width={18}
                          height={18}
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Preview Image & Key Features */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-800/80 bg-[#131527]/40 shadow-2xl">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>

          {keyFeaturesList.length > 0 && (
            <div className="bg-[#131527]/70 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <h3 className="flex items-center gap-2.5 text-white font-bold text-lg mb-5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Key
                Features
              </h3>
              <ul className="space-y-4">
                {keyFeaturesList.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
