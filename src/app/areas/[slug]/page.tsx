import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  DesignGrid,
  FaqList,
  InteriorHero,
  InteriorPage,
  SandSection,
} from "@/components/site-shell";
import {
  getDesignsForSuburb,
  getSuburb,
  servicePath,
  services,
  suburbs,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  homeBuilderSchema,
  placeSchema,
  serviceSchema,
} from "@/lib/schema";
import { jsonLd } from "@/lib/utils";
import { faqs } from "@/data/site-content";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return suburbs.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const suburb = getSuburb(slug);
  if (!suburb) return {};

  return buildMetadata({
    path: `/areas/${suburb.slug}`,
    title: `Custom Home Builder in ${suburb.name}, NSW | King Style Homes`,
    description: `${suburb.highlight} ${suburb.blurb}`.slice(0, 160),
    image: suburb.image,
    imageAlt: `Home builds in ${suburb.name}, ${suburb.lga} LGA`,
    keywords: [
      `home builder ${suburb.name.toLowerCase()}`,
      `custom home ${suburb.name.toLowerCase()}`,
      `knockdown rebuild ${suburb.name.toLowerCase()}`,
      `duplex builder ${suburb.name.toLowerCase()}`,
      `granny flat ${suburb.name.toLowerCase()}`,
      `${suburb.name.toLowerCase()} ${suburb.postcode}`,
    ],
  });
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const suburb = getSuburb(slug);
  if (!suburb) notFound();

  const popularDesigns = getDesignsForSuburb(suburb);
  const nearby = suburbs.filter((s) => s.slug !== suburb.slug);

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            homeBuilderSchema(),
            placeSchema(suburb),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Service Areas", path: "/areas" },
              { name: suburb.name, path: `/areas/${suburb.slug}` },
            ]),
            ...services.map((service) => serviceSchema(service, suburb)),
            faqSchema(faqs),
          ]),
        }}
      />

      <InteriorHero
        eyebrow={`${suburb.name}, ${suburb.lga} LGA · NSW ${suburb.postcode}`}
        title={`Custom home builder in ${suburb.name}`}
        intro={suburb.highlight}
        image={suburb.image}
      />

      <SandSection>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-slate">
              About {suburb.name}
            </p>
            <h2 className="mt-4 text-[36px] font-light uppercase leading-none md:text-[58px]">
              {suburb.name}, built by King Style.
            </h2>
          </div>
          <div>
            <p className="font-body text-[19px] leading-7 text-amali-gray">{suburb.blurb}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <p className="font-body rounded-full border border-amali-dark/10 bg-white/70 px-4 py-3 text-[12px] uppercase tracking-[1px] text-amali-slate">
                {suburb.lga} LGA
              </p>
              <p className="font-body rounded-full border border-amali-dark/10 bg-white/70 px-4 py-3 text-[12px] uppercase tracking-[1px] text-amali-slate">
                Postcode {suburb.postcode}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-white transition-transform hover:scale-[1.02]"
              >
                Talk to King Style
              </Link>
              <Link
                href="/home-designs"
                className="rounded-full border border-amali-dark/15 px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-amali-dark transition-colors hover:bg-white"
              >
                View all home designs
              </Link>
            </div>
          </div>
        </div>
      </SandSection>

      <SandSection className="bg-amali-dark text-white">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Services in {suburb.name}
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Every King Style pathway, delivered in {suburb.name}.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[17px] leading-7 text-white/70">
            Custom builds, knockdown rebuilds, duplexes, granny flats, renovations, house and
            land — pick the pathway that fits your block, brief and budget.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`${servicePath(service)}/${suburb.slug}`}
              data-luxury-card
              className="group rounded-[26px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-colors hover:bg-white hover:text-amali-dark"
            >
              <p className="font-body text-[11px] uppercase tracking-[1.4px] text-amali-sand transition-colors group-hover:text-amali-slate">
                Service in {suburb.name}
              </p>
              <h3 className="mt-5 text-[22px] font-light uppercase leading-[1.05] tracking-[0.5px]">
                {service.title}
              </h3>
              <p className="font-body mt-5 line-clamp-3 text-[14px] leading-6 text-white/68 transition-colors group-hover:text-amali-gray">
                {service.text}
              </p>
              <p className="font-body mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[1.4px] text-amali-sand transition-colors group-hover:text-amali-dark">
                View {service.title.split(" ")[0]} in {suburb.name}
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </p>
            </Link>
          ))}
        </div>
      </SandSection>

      {popularDesigns.length > 0 ? (
        <SandSection>
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
                Popular designs in {suburb.name}
              </p>
              <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
                Designs that suit {suburb.name} blocks.
              </h2>
            </div>
            <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
              We&apos;ve highlighted the King Style designs that map best to the frontages and
              family sizes we see most in {suburb.name}. Every one can be tailored further to
              your specific site.
            </p>
          </div>
          <DesignGrid designs={popularDesigns} />
        </SandSection>
      ) : null}

      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Nearby suburbs
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Building across {suburb.lga === "The Hills" ? "The Hills District" : "the Blacktown LGA"} and beyond.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            We work across Western Sydney&apos;s growth corridor. Browse other suburbs where King
            Style is actively delivering custom homes, duplexes and rebuilds.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {nearby.map((n) => (
            <Link
              key={n.slug}
              href={`/areas/${n.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-amali-dark/10 bg-white/70 px-5 py-4 text-amali-dark transition-colors hover:bg-amali-dark hover:text-white"
            >
              <span className="font-body text-[14px] uppercase tracking-[1px]">
                {n.name}
                <span className="font-body block text-[10px] tracking-[1.2px] text-amali-slate group-hover:text-amali-sand">
                  {n.postcode} · {n.lga}
                </span>
              </span>
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </Link>
          ))}
        </div>
      </SandSection>

      <SandSection className="bg-amali-dark text-white">
        <div className="mb-10">
          <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
            Common questions
          </p>
          <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
            What clients ask before they call.
          </h2>
        </div>
        <FaqList />
      </SandSection>
    </InteriorPage>
  );
}
