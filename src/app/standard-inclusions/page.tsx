import type { Metadata } from "next";
import { InclusionsDownload } from "@/components/inclusions-download";
import { InclusionList, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/standard-inclusions",
  title: "Standard Inclusions — What's Included | King Style Homes",
  description:
    "Standard inclusions from King Style Homes — plans, structural, interior finishes, bathrooms, electrical and warranties across every Western Sydney build.",
  image: pageImages.inclusionsHero,
  keywords: [
    "standard inclusions home builder",
    "home builder inclusions western sydney",
    "king style standard inclusions",
  ],
});

export default function StandardInclusionsPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Inclusions"
        title="Sydney’s best ultimate inclusions as standard"
        intro="Explore premium inclusions and specifications that elevate the smallest details of your dream home, from high ceilings and floating stairs to stone, glazing and warranty coverage."
        image={pageImages.inclusionsHero}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[60px]">Inclusions and specifications</h2>
          <div>
            <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
              Based on the live King Style inclusions page, the package covers planning, approvals, site preparation, structural items, premium finishes, electrical features, storage and warranties.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Approvals", "Premium finishes", "Warranty clarity"].map((item) => (
                <div key={item} className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                  <p className="text-[18px] font-light uppercase tracking-[0.5px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <InclusionList />
      </SandSection>
      <InclusionsDownload variant="standard" />
    </InteriorPage>
  );
}
