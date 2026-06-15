import type { Metadata } from "next";
import { DesignGrid, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { homeDesigns } from "@/data/site-content";

export const metadata: Metadata = { title: "Home Designs | King Style Homes" };

export default function HomeDesignsPage() {
  const homeDesignListings = homeDesigns.filter((design) => design.category !== "Display Home");

  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Home designs"
        title="Explore homes shaped for modern family living"
        intro="Browse King Style Homes' single-storey and double-storey designs, each crafted with practical layouts, refined facades and quality inclusions."
        image={homeDesigns.find((design) => design.slug === "lume-31")?.image}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[64px]">
            Single storey and double storey options.
          </h2>
          <div>
            <p className="font-body max-w-[780px] text-[18px] leading-7 text-amali-gray">
              The live King Style collection includes compact narrow-frontage solutions and generous five-bedroom family plans. Each design can be used as a starting point for a more tailored build.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                [String(homeDesignListings.length), "design directions"],
                ["Single + double", "storey options"],
                ["Custom", "build inspiration"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                  <p className="text-[30px] font-light uppercase leading-none">{value}</p>
                  <p className="font-body mt-2 text-[11px] uppercase tracking-[1.2px] text-amali-slate">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DesignGrid designs={homeDesignListings} />
      </SandSection>
    </InteriorPage>
  );
}
