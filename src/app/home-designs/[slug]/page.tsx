import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignGrid, DesignStats, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { homeDesigns } from "@/data/site-content";

export function generateStaticParams() {
  return homeDesigns.map((design) => ({ slug: design.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const design = homeDesigns.find((item) => item.slug === slug);
  return { title: design ? `${design.name} | King Style Homes` : "Home Design" };
}

export default async function HomeDesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = homeDesigns.find((item) => item.slug === slug);
  if (!design) notFound();

  return (
    <InteriorPage>
      <InteriorHero
        eyebrow={design.category}
        title={design.name}
        intro={design.summary}
        image={design.image}
      />
      <SandSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-slate">
              Design overview
            </p>
            <h2 className="mt-4 text-[36px] font-light uppercase leading-none md:text-[58px]">
              A considered {design.category.toLowerCase()} design
            </h2>
          </div>
          <div>
            <p className="font-body text-[19px] leading-7 text-amali-gray">{design.description}</p>
            <DesignStats design={design} />
            <div className="mt-8 grid gap-3">
              {design.highlights.map((highlight) => (
                <p key={highlight} className="font-body rounded-full border border-amali-dark/10 bg-white/70 px-4 py-3 text-[12px] uppercase tracking-[1px] text-amali-slate">
                  {highlight}
                </p>
              ))}
            </div>
          </div>
        </div>
      </SandSection>
      <SandSection className="bg-amali-dark text-white">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Tailor this design
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Use {design.name} as the starting point for your site.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Facade direction", "Family zoning", "Selections pathway"].map((item) => (
              <div key={item} data-luxury-card className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-[18px] font-light uppercase leading-tight tracking-[0.5px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-8 text-[32px] font-light uppercase">Explore more designs</h2>
        <DesignGrid designs={homeDesigns.filter((item) => item.slug !== design.slug).slice(0, 3)} />
      </SandSection>
    </InteriorPage>
  );
}
