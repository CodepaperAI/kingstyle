import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { servicePath, serviceSlug, services, suburbs } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  homeBuilderSchema,
  serviceSchema,
} from "@/lib/schema";
import { jsonLd } from "@/lib/utils";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  return services.find((service) => serviceSlug(service) === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: serviceSlug(service),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found | King Style Homes" };
  }

  return buildMetadata({
    path: servicePath(service),
    title: `${service.title} in Western Sydney | King Style Homes`,
    description: service.text,
    image: service.image,
    imageAlt: service.title,
    keywords: [
      service.title.toLowerCase(),
      `${service.title.toLowerCase()} western sydney`,
      `${service.title.toLowerCase()} sydney`,
      "king style homes",
    ],
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const relatedServices = services.filter(
    (item) => serviceSlug(item) !== serviceSlug(service),
  );

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            homeBuilderSchema(),
            serviceSchema(service),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: servicePath(service) },
            ]),
          ]),
        }}
      />
      <InteriorHero
        eyebrow="Service landing page"
        title={service.title}
        intro={service.text}
        image={service.image}
      />
      <SandSection>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Best suited for
            </p>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[58px]">
              A clear pathway before you commit.
            </h2>
            <p className="font-body mt-6 text-[18px] leading-7 text-amali-gray">
              {service.bestFor}
            </p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-amali-dark py-3 pl-6 pr-3 text-[12px] uppercase tracking-[1.4px] text-white"
            >
              Talk to King Style
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
                Site considerations
              </p>
              <p className="font-body mt-5 text-[18px] leading-8 text-amali-gray">
                {service.siteConsiderations}
              </p>
            </article>
            <article
              data-luxury-card
              className="rounded-[30px] border border-amali-dark/10 bg-white p-7 shadow-[0_22px_80px_rgba(26,32,38,0.08)] md:p-9"
            >
              <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                What is included
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
                Client outcome
              </p>
              <p className="font-body mt-5 text-[18px] leading-8 text-amali-gray">
                {service.outcome}
              </p>
            </article>
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="grid overflow-hidden rounded-[34px] border border-amali-dark/10 bg-white shadow-[0_24px_90px_rgba(26,32,38,0.08)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
              Service details
            </p>
            <h2 className="mt-5 text-[34px] font-light uppercase leading-none md:text-[52px]">
              Useful decisions to make early.
            </h2>
            <div className="mt-7 grid gap-3">
              {service.details.map((detail) => (
                <p
                  key={detail}
                  className="font-body rounded-full border border-amali-dark/10 bg-amali-sand/70 px-5 py-4 text-[12px] uppercase tracking-[1.1px] text-amali-slate"
                >
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Available in
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              {service.title} across Western Sydney.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            See suburb-specific information for {service.title.toLowerCase()} in the King Style
            service area.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {suburbs.map((suburb) => (
            <Link
              key={suburb.slug}
              href={`${servicePath(service)}/${suburb.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-amali-dark/10 bg-white/70 px-5 py-4 text-amali-dark transition-colors hover:bg-amali-dark hover:text-white"
            >
              <span className="font-body text-[14px] uppercase tracking-[1px]">
                {service.title.split(" ")[0]} in {suburb.name}
                <span className="font-body block text-[10px] tracking-[1.2px] text-amali-slate group-hover:text-amali-sand">
                  {suburb.postcode} · {suburb.lga}
                </span>
              </span>
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </Link>
          ))}
        </div>
      </SandSection>
      <SandSection className="bg-amali-dark text-white">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              More services
            </p>
            <h2 className="text-[34px] font-light uppercase leading-none md:text-[52px]">
              Explore another pathway.
            </h2>
          </div>
          <Link
            href="/services"
            className="font-body text-[12px] uppercase tracking-[1.4px] text-white/72 hover:text-white"
          >
            Services overview
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedServices.slice(0, 3).map((item) => (
            <Link
              data-luxury-card
              key={item.title}
              href={servicePath(item)}
              className="group rounded-[26px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-colors hover:bg-white hover:text-amali-dark"
            >
              <p className="font-body text-[11px] uppercase tracking-[1.4px] text-amali-sand transition-colors group-hover:text-amali-slate">
                Service
              </p>
              <h3 className="mt-5 text-[24px] font-light uppercase leading-none tracking-[0.6px]">
                {item.title}
              </h3>
              <p className="font-body mt-5 line-clamp-3 text-[15px] leading-6 text-white/68 transition-colors group-hover:text-amali-gray">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </SandSection>
    </InteriorPage>
  );
}
