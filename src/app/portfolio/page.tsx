import type { Metadata } from "next";
import Image from "next/image";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { homeDesigns } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/portfolio",
  title: "Portfolio — Facade & Design Gallery | King Style Homes",
  description:
    "A visual portfolio of King Style Homes designs — facades, materials and finishes across single-storey, double-storey and narrow-frontage builds in Western Sydney.",
  keywords: [
    "king style homes portfolio",
    "home builder portfolio western sydney",
    "facade gallery sydney",
  ],
});

export default function PortfolioPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Portfolio"
        title="Facades, plans and display inspiration"
        intro="Explore the King Style Homes design collection through real facade imagery from the live home designs and display-home pages."
        image={homeDesigns.find((design) => design.slug === "sydney-tce")?.image}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[62px]">
            A visual library of facades, proportions and finishes.
          </h2>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            Use the collection as a mood board for your build conversation:
            facade style, street presence, material tone and the level of
            refinement you want to carry through the home.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {homeDesigns.map((design, index) => (
            <article
              data-luxury-card
              key={design.slug}
              className={index % 3 === 0 ? "md:col-span-2" : ""}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  index % 3 === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={design.image}
                  alt={`${design.name} project`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 text-white md:p-8">
                  <p className="font-body text-[11px] uppercase tracking-[1.5px] text-white/65">
                    {design.category}
                  </p>
                  <h2 className="mt-2 text-[30px] font-light uppercase tracking-[1px]">
                    {design.name}
                  </h2>
                  <p className="font-body mt-3 max-w-[620px] text-[15px] leading-6 text-white/75">
                    {design.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {design.highlights.slice(0, 2).map((item) => (
                      <span key={item} className="font-body rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[1px] text-white/80 backdrop-blur">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SandSection>
    </InteriorPage>
  );
}
