import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  DesignGrid,
  InteriorHero,
  InteriorPage,
  SandSection,
} from "@/components/site-shell";
import {
  getDesignsForSuburb,
  getSuburb,
  servicePath,
  serviceSlug,
  services,
  suburbs,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  homeBuilderSchema,
  serviceSchema,
} from "@/lib/schema";
import { jsonLd } from "@/lib/utils";

type ServiceSuburbProps = {
  params: Promise<{ slug: string; suburb: string }>;
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    suburbs.map((suburb) => ({
      slug: serviceSlug(service),
      suburb: suburb.slug,
    })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServiceSuburbProps): Promise<Metadata> {
  const { slug, suburb: suburbSlug } = await params;
  const service = services.find((s) => serviceSlug(s) === slug);
  const suburb = getSuburb(suburbSlug);
  if (!service || !suburb) return {};

  const title = `${service.title} in ${suburb.name}, NSW | King Style Homes`;
  const description = `${service.title} in ${suburb.name} (${suburb.postcode}) by King Style Homes. ${service.text}`.slice(
    0,
    160,
  );

  return buildMetadata({
    path: `${servicePath(service)}/${suburb.slug}`,
    title,
    description,
    image: service.image,
    imageAlt: `${service.title} in ${suburb.name}`,
    keywords: [
      `${service.title.toLowerCase()} ${suburb.name.toLowerCase()}`,
      `${service.title.toLowerCase()} ${suburb.lga.toLowerCase()}`,
      `home builder ${suburb.name.toLowerCase()}`,
      `${suburb.name.toLowerCase()} ${suburb.postcode}`,
      "king style homes",
    ],
  });
}

export default async function ServiceSuburbPage({ params }: ServiceSuburbProps) {
  const { slug, suburb: suburbSlug } = await params;
  const service = services.find((s) => serviceSlug(s) === slug);
  const suburb = getSuburb(suburbSlug);
  if (!service || !suburb) notFound();

  const popularDesigns = getDesignsForSuburb(suburb);
  const otherServicesInSuburb = services.filter(
    (s) => serviceSlug(s) !== serviceSlug(service),
  );
  const nearbySuburbs = suburbs
    .filter((s) => s.slug !== suburb.slug)
    .slice(0, 6);

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            homeBuilderSchema(),
            serviceSchema(service, suburb),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: servicePath(service) },
              { name: suburb.name, path: `${servicePath(service)}/${suburb.slug}` },
            ]),
          ]),
        }}
      />

      <InteriorHero
        eyebrow={`${service.title} · ${suburb.name}, ${suburb.postcode}`}
        title={`${service.title} in ${suburb.name}`}
        intro={`${service.text} Delivered across ${suburb.name} and the surrounding ${suburb.lga} LGA.`}
        image={service.image}
      />

      <SandSection>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Why {suburb.name}
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              {service.title} built for {suburb.name} blocks.
            </h2>
            <p className="font-body mt-6 text-[18px] leading-7 text-amali-gray">{suburb.blurb}</p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-amali-dark py-3 pl-6 pr-3 text-[12px] uppercase tracking-[1.4px] text-white"
            >
              Talk to King Style about {suburb.name}
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-amali-dark">
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </span>
            </Link>
          </div>
          <div className="grid gap-5">
            <article
              data-luxury-card
              className="rounded-[30px] border border-amali-dark/10 bg-white p-7 shadow-[0_22px_80px_rgba(26,32,38,0.08)] md:p-9"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                Best suited for
              </p>
              <p className="font-body mt-5 text-[18px] leading-8 text-amali-gray">{service.bestFor}</p>
            </article>
            <article
              data-luxury-card
              className="rounded-[30px] border border-amali-dark/10 bg-white p-7 shadow-[0_22px_80px_rgba(26,32,38,0.08)] md:p-9"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                Site considerations in {suburb.name}
              </p>
              <p className="font-body mt-5 text-[18px] leading-8 text-amali-gray">{service.siteConsiderations}</p>
            </article>
            <article
              data-luxury-card
              className="rounded-[30px] border border-amali-dark/10 bg-white p-7 shadow-[0_22px_80px_rgba(26,32,38,0.08)] md:p-9"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                What&apos;s included
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <p
                    key={item}
                    className="font-body rounded-full bg-amali-sand/75 px-5 py-4 text-[12px] uppercase leading-tight tracking-[1.1px] text-amali-slate"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </article>
            <article
              data-luxury-card
              className="rounded-[30px] border border-amali-dark/10 bg-white p-7 shadow-[0_22px_80px_rgba(26,32,38,0.08)] md:p-9"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                Outcome
              </p>
              <p className="font-body mt-5 text-[18px] leading-8 text-amali-gray">{service.outcome}</p>
            </article>
          </div>
        </div>
      </SandSection>

      {popularDesigns.length > 0 ? (
        <SandSection className="pt-0">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
                Designs that fit {suburb.name}
              </p>
              <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
                Start with a design that suits the block.
              </h2>
            </div>
            <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
              These King Style designs map best to the frontages and family sizes we see most in
              {" "}{suburb.name}. Each can be customised further for your specific site and brief.
            </p>
          </div>
          <DesignGrid designs={popularDesigns} />
        </SandSection>
      ) : null}

      <SandSection className="bg-amali-dark text-white">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              {service.title} across Western Sydney
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Same service, other suburbs.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-white/70">
            We deliver {service.title.toLowerCase()} across every suburb in the King Style service
            area. Compare against the closest alternatives below.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nearbySuburbs.map((s) => (
            <Link
              key={s.slug}
              href={`${servicePath(service)}/${s.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-white backdrop-blur transition-colors hover:bg-white hover:text-amali-dark"
            >
              <span className="font-body text-[14px] uppercase tracking-[1px]">
                {service.title.split(" ")[0]} in {s.name}
                <span className="font-body block text-[10px] tracking-[1.2px] text-amali-sand group-hover:text-amali-slate">
                  {s.postcode} · {s.lga}
                </span>
              </span>
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </Link>
          ))}
        </div>
      </SandSection>

      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Other services in {suburb.name}
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              We do more than {service.title.toLowerCase()}.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            Every King Style service pathway is available in {suburb.name}. Pick the one that fits
            your block and brief.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherServicesInSuburb.map((s) => (
            <Link
              key={s.title}
              href={`${servicePath(s)}/${suburb.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-amali-dark/10 bg-white/70 px-5 py-4 text-amali-dark transition-colors hover:bg-amali-dark hover:text-white"
            >
              <span className="font-body text-[14px] uppercase tracking-[1px]">
                {s.title}
                <span className="font-body block text-[10px] tracking-[1.2px] text-amali-slate group-hover:text-amali-sand">
                  In {suburb.name}
                </span>
              </span>
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </Link>
          ))}
        </div>
      </SandSection>
    </InteriorPage>
  );
}
