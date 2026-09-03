"use client";

import TechStackIcon from "../sub/TechStackIcon";

const techs = [
  { icon: "/Next.js.svg", name: "Next.js" },
  { icon: "/React.svg", name: "React" },
  { icon: "/Vue.js.svg", name: "Vue" },
  { icon: "/Go.svg", name: "Go" },
  { icon: "/supabase.svg", name: "Supabase" },
  { icon: "/JavaScript.svg", name: "JavaScript" },
  { icon: "/CSS3.svg", name: "CSS" },
  { icon: "/HTML5.svg", name: "HTML" },
  { icon: "/PostgresSQL.svg", name: "PostgresSQL" },
  { icon: "/Linux.svg", name: "Linux" },
  { icon: "/Tailwind CSS.svg", name: "Tailwind CSS" },
  { icon: "/Bootstrap.svg", name: "Bootstrap" },
];

export default function TechStackSection() {
  return (
    <section
      className="py-10 px-4 sm:px-6"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {techs.map((tech) => (
          <div key={tech.name}>
            <TechStackIcon TechStackIcon={tech.icon} Language={tech.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
