import type { Metadata } from "next";
import { DesignGrid, FaqList, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { displayCenters, homeDesigns, pageImages } from "@/data/site-content";

export const metadata: Metadata = { title: "Display Centers | King Style Homes" };

export default function DisplayCentersPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Display centers"
        title="Experience the details in person"
        intro="Step into King Style Homes' display spaces and experience the craftsmanship, innovation and design detail behind the Sydney TCE display home."
        image={pageImages.displayHero}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[62px]">
            Walk through the finish before you build.
          </h2>
          <p className="font-body max-w-[780px] text-[18px] leading-7 text-amali-gray">
            Display visits help you understand scale, materials, facade presence
            and the level of detail that shapes a King Style home.
          </p>
        </div>
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          {displayCenters.map((center) => (
            <article data-luxury-card key={center.name} className="rounded-[30px] border border-amali-dark/10 bg-white p-7 text-amali-dark shadow-[0_24px_90px_rgba(26,32,38,0.09)] md:p-8">
              <p className="font-body text-[11px] uppercase tracking-[1.4px] text-amali-slate">Visit our display centres</p>
              <h2 className="mt-4 text-[34px] font-light uppercase">{center.name}</h2>
              <p className="font-body mt-4 text-[18px] leading-7 text-amali-gray">{center.address}</p>
              <p className="font-body mt-2 text-[15px] uppercase tracking-[1px] text-amali-slate">{center.phone}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {["Premium finishes", "Facade details", "Selections guidance"].map((item) => (
                  <span key={item} className="font-body rounded-full bg-amali-sand px-4 py-2 text-[11px] uppercase tracking-[1.1px] text-amali-slate">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <DesignGrid designs={homeDesigns.filter((item) => item.category === "Display Home")} />
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-8 text-[34px] font-light uppercase md:text-[54px]">Display home FAQs</h2>
        <FaqList />
      </SandSection>
    </InteriorPage>
  );
}
