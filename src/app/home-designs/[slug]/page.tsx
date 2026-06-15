import type { Metadata } from "next";
import Link from "next/link";
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

  const customisationIdeas = [
    "Facade and material direction",
    "Kitchen, bathroom and joinery selections",
    "Storage, study and retreat adjustments",
    "Lighting, electrical and smart-home allowances",
  ];
  const recommendedInclusions =
    design.category === "Display Home"
      ? ["Display-home finish references", "Premium bathroom selections", "Lighting and room-scale review"]
      : ["Standard inclusions review", "Signature finish upgrade pathway", "Site-specific allowance check"];

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
            <div className="font-body mt-6 rounded-[24px] border border-amali-dark/10 bg-white/70 p-6 text-[16px] leading-7 text-amali-gray">
              <p className="mb-3 text-[11px] uppercase tracking-[1.4px] text-amali-slate">
                Best suited for
              </p>
              {design.bestFor}
            </div>
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
            {design.designConsiderations.map((item) => (
              <div key={item} data-luxury-card className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-[18px] font-light uppercase leading-tight tracking-[0.5px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Customise the plan
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Shape {design.name} around your site and lifestyle.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            Treat this design as a starting point. King Style can review the
            facade, inclusions, internal zoning and site requirements so the
            final home feels resolved for the way you live.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {customisationIdeas.map((item, index) => (
            <article
              data-luxury-card
              key={item}
              className="rounded-[26px] border border-amali-dark/10 bg-white p-7 shadow-[0_20px_70px_rgba(26,32,38,0.07)]"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.5px] text-amali-slate">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-[21px] font-light uppercase leading-tight tracking-[0.5px]">
                {item}
              </h3>
            </article>
          ))}
        </div>
      </SandSection>
      <SandSection className="bg-amali-dark text-white">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Recommended next step
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Review the inclusions before you price the build.
            </h2>
          </div>
          <div>
            <p className="font-body text-[17px] leading-7 text-white/70">
              Inclusions make the biggest difference to the finished feel of
              the home. Review what is already covered, then decide whether a
              signature finish pathway suits your project.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {recommendedInclusions.map((item) => (
                <div
                  key={item}
                  data-luxury-card
                  className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
                >
                  <p className="text-[17px] font-light uppercase leading-tight tracking-[0.5px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/standard-inclusions"
                className="rounded-full bg-amali-sand px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-amali-dark transition-transform hover:scale-[1.02]"
              >
                View inclusions
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-white/15 px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-white transition-colors hover:bg-white hover:text-amali-dark"
              >
                Discuss this design
              </Link>
            </div>
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-8 text-[32px] font-light uppercase">Explore more designs</h2>
        <DesignGrid
          designs={homeDesigns
            .filter((item) => item.slug !== design.slug && item.category !== "Display Home")
            .slice(0, 3)}
        />
      </SandSection>
    </InteriorPage>
  );
}
