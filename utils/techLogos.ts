// Utility for mapping technology names to logo file paths in /public

export interface TechLogoMap {
  [key: string]: string;
}

// Dictionary mapping technology names  to logo paths
const techLogoDictionary: TechLogoMap = {
  react: "/React.svg",
  "react.js": "/React.svg",
  reactjs: "/React.svg",
  "next.js": "/Next.js.svg",
  nextjs: "/Next.js.svg",
  next: "/next.png",
  vue: "/Vue.js.svg",
  "vue.js": "/Vue.js.svg",
  vuejs: "/Vue.js.svg",
  tailwinds: "/Tailwind CSS.svg",
  tailwind: "/Tailwind CSS.svg",
  "tailwind css": "/Tailwind CSS.svg",
  tailwindcss: "/Tailwind CSS.svg",
  bootstrap: "/Bootstrap.svg",
  javascript: "/JavaScript.svg",
  js: "/js.png",
  typescript: "/ts.png",
  ts: "/ts.png",
  html: "/HTML5.svg",
  html5: "/HTML5.svg",
  css: "/CSS3.svg",
  css3: "/CSS3.svg",
  supabase: "/supabase.svg",
  postgresql: "/PostgresSQL.svg",
  postgres: "/PostgresSQL.svg",
  go: "/Go.svg",
  golang: "/Go.svg",
  docker: "/Docker.svg",
  linux: "/Linux.svg",
  express: "/express.svg",
  "express.js": "/express.png",
  expressjs: "/express.png",
  node: "/node-js.png",
  "node.js": "/node-js.png",
  nodejs: "/node-js.png",
  mongodb: "/mongodb.png",
  firebase: "/Firebase.png",
  mysql: "/mysql.png",
  prisma: "/prisma.webp",
  graphql: "/graphql.png",
  figma: "/figma.png",
  redux: "/redux.png",
  "react query": "/reactquery.png",
  "framer motion": "/framer.png",
  stripe: "/stripe.webp",
  tauri: "/tauri.svg",
  "react native": "/ReactNative .png",
};

/**
 * Returns the logo image path for a given technology name.
 * Returns null if no matching logo is found.
 */
export function getTechLogoPath(techName: string): string | null {
  if (!techName) return null;
  const normalized = techName.trim().toLowerCase();
  return techLogoDictionary[normalized] || null;
}
