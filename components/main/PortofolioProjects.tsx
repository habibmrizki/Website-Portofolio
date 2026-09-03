"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, FolderKanban } from "lucide-react";
import { supabase } from "@/services/supabase";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  image?: string;
  live_demo_url?: string;
  demo_url?: string;
  link?: string;
}

let cachedProjects: Project[] | null = null;

function formatExternalUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return "#";
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function getProjectSlug(title: string, fallbackId: string): string {
  if (!title) return fallbackId;
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || fallbackId;
}

export default function PortofolioProjects() {
  const [projects, setProjects] = useState<Project[]>(cachedProjects || []);
  const [loading, setLoading] = useState(!cachedProjects);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        cachedProjects = data;
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#131527]/50 border border-purple-500/10 rounded-2xl p-4 flex flex-col justify-between animate-pulse"
          >
            <div>
              <div className="w-full h-48 rounded-xl bg-slate-800/60 mb-4" />
              <div className="h-6 w-3/4 bg-slate-800/70 rounded-md mb-3" />
              <div className="h-4 w-full bg-slate-800/40 rounded-md mb-2" />
              <div className="h-4 w-2/3 bg-slate-800/40 rounded-md mb-6" />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
              <div className="h-4 w-20 bg-slate-800/50 rounded-md" />
              <div className="h-8 w-24 bg-slate-800/60 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center gap-3">
        <FolderKanban className="w-12 h-12 text-purple-400/50 mb-1" />
        <p className="text-base font-medium">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {projects.map((project) => {
        const rawDemoUrl = project.live_demo_url || project.demo_url || project.link;
        const liveDemoUrl = formatExternalUrl(rawDemoUrl);
        const imageUrl = project.image_url || project.image || "/placeholder.png";
        const slug = getProjectSlug(project.title, project.id);

        return (
          <div
            key={project.id}
            className="bg-[#131527]/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm group hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <div>
              {/* Preview Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900 mb-4">
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                {project.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                Live Demo <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href={`/projects/${slug}`}
                className="inline-flex items-center gap-1 px-4 py-2 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-semibold rounded-lg transition-all"
              >
                Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
