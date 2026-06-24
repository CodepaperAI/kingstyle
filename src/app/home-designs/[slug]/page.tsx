import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  DesignGrid,
  DesignStats,
  InteriorHero,
  InteriorPage,
  SandSection,
} from "@/components/site-shell";
import {
  designArchetypes,
  getArchetypeDesigns,
  getDesignArchetype,
  homeDesigns,
  isDesignArchetypeSlug,
  type DesignArchetype,
  type HomeDesign,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  homeBuilderSchema,
  productSchema,
} from "@/lib/schema";
import { jsonLd } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  const designs = homeDesigns.map((d) => ({ slug: d.slug }));
  const archetypes = designArchetypes.map((a) => ({ slug: a.slug }));
  return [...designs, ...archetypes];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isDesignArchetypeSlug(slug)) {
    const archetype = getDesignArchetype(slug);
    if (!archetype) return {};
    return buildMetadata({
      path: `/home-designs/${archetype.slug}`,
      title: archetype.seoTitle,
      description: archetype.seoDescription,
      keywords: archetype.seoKeywords,
    });
  }

  const design = homeDesigns.find((d) => d.slug === slug);
  if (!design) return {};

  return buildMetadata({
    path: `/home-designs/${design.slug}`,
    title: `${design.name} — ${design.category} Home Design | King Style Homes`,
    description: design.description,
    image: design.image,
    imageAlt: `${design.name} ${design.category} home design`,
    keywords: [
      design.name.toLowerCase(),
      `${design.category.toLowerCase()} home design`,
      `${design.beds} bedroom home design`,
      `${design.frontage} frontage home`,
      "king style homes",
    ],
  });
}

export default async function HomeDesignPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  if (isDesignArchetypeSlug(slug)) {
    const archetype = getDesignArchetype(slug);
    if (!archetype) notFound();
    return <ArchetypeTemplate archetype={archetype} />;
  }

  const design = homeDesigns.find((item) => item.slug === slug);
  if (!design) notFound();

  return <HomeDesignTemplate design={design} />;
}

function HomeDesignTemplate({ design }: { design: HomeDesign }) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            homeBuilderSchema(),
            productSchema(design),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Home Designs", path: "/home-designs" },
              { name: design.name, path: `/home-designs/${design.slug}` },
            ]),
          ]),
        }}
      />
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

function ArchetypeTemplate({ archetype }: { archetype: DesignArchetype }) {
  const matches = getArchetypeDesigns(archetype);
  const otherArchetypes = designArchetypes.filter((a) => a.slug !== archetype.slug);
  const heroImage = matches[0]?.image;

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            homeBuilderSchema(),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Home Designs", path: "/home-designs" },
              { name: archetype.name, path: `/home-designs/${archetype.slug}` },
            ]),
          ]),
        }}
      />
      <InteriorHero
        eyebrow="Design collection"
        title={archetype.name}
        intro={archetype.intro}
        image={heroImage}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
            {matches.length} matching design{matches.length === 1 ? "" : "s"} in the King Style collection.
          </h2>
          <div>
            <p className="font-body max-w-[780px] text-[18px] leading-7 text-amali-gray">
              {archetype.intro}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                <p className="text-[30px] font-light uppercase leading-none">{matches.length}</p>
                <p className="font-body mt-2 text-[11px] uppercase tracking-[1.2px] text-amali-slate">
                  in this collection
                </p>
              </div>
              <div className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                <p className="text-[30px] font-light uppercase leading-none">12</p>
                <p className="font-body mt-2 text-[11px] uppercase tracking-[1.2px] text-amali-slate">
                  Western Sydney suburbs served
                </p>
              </div>
              <div className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                <p className="text-[30px] font-light uppercase leading-none">Custom</p>
                <p className="font-body mt-2 text-[11px] uppercase tracking-[1.2px] text-amali-slate">
                  every design is the starting point
                </p>
              </div>
            </div>
          </div>
        </div>
        <DesignGrid designs={matches} />
      </SandSection>

      <SandSection className="bg-amali-dark text-white">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Other collections
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Browse other ways to filter the King Style range.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-white/70">
            Every home design is a starting point. Whether you&apos;re filtering by storey,
            frontage or bedroom count, we tailor the chosen plan around your site.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {otherArchetypes.map((a) => (
            <Link
              key={a.slug}
              href={`/home-designs/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-white backdrop-blur transition-colors hover:bg-white hover:text-amali-dark"
            >
              <span className="font-body text-[14px] uppercase tracking-[1px]">
                {a.name}
              </span>
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </Link>
          ))}
        </div>
      </SandSection>
    </InteriorPage>
  );
}
