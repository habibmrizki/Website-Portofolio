"use client";

import Image from "next/image";

interface Props {
  TechStackIcon: string;
  Language: string;
}

export default function TechStackIcon({ TechStackIcon, Language }: Props) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 flex flex-col items-center gap-3 hover:scale-105 cursor-pointer">
      <Image
        src={TechStackIcon}
        alt={Language}
        width={80}
        height={80}
        className="h-16 w-16 object-contain"
      />
      <span className="text-slate-300 font-semibold">{Language}</span>
    </div>
  );
}
