import type { Metadata } from "next";
import { InclusionsDownload } from "@/components/inclusions-download";
import { InclusionList, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/signature-inclusions",
  title: "Signature Inclusions — Premium Finish Pathway | King Style Homes",
  description:
    "Signature inclusions from King Style Homes — premium finishes, fixtures, structural details and warranties built into every Signature-tier build in Western Sydney.",
  image: pageImages.inclusionsHero,
  keywords: [
    "signature inclusions",
    "premium home inclusions western sydney",
    "king style signature pathway",
  ],
});

export default function SignatureInclusionsPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Signature inclusions"
        title="Premium inclusions with a signature finish"
        intro="The Signature Inclusions page builds on King Style's premium specification language with elevated details, refined finishes and carefully coordinated selections."
        image={pageImages.aboutFeatureTwo}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[60px]">Refined selections, clearly documented</h2>
          <div>
            <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
              Signature inclusions highlight the same detailed approach to approvals, structure, finishes, bathrooms, electrical and warranties with an elevated presentation for premium projects.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Elevated details", "Coordinated selections", "Premium finish path"].map((item) => (
                <div key={item} className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                  <p className="text-[18px] font-light uppercase tracking-[0.5px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <InclusionList signature />
      </SandSection>
      <InclusionsDownload variant="signature" />
    </InteriorPage>
  );
}
