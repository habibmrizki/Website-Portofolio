import About from "@/components/main/About";
import Hero from "@/components/main/Hero";
import PortfolioTabs from "@/components/main/PortofolioTabs";
import ContactCommentsSection from "@/components/main/ContactCommentsSection";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero />
        <About />
        <PortfolioTabs />
        <ContactCommentsSection />
      </div>
    </main>
  );
}
