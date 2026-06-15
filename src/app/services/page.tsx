import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteriorHero, InteriorPage, SandSection, ServicesGrid } from "@/components/site-shell";
import { capabilities, pageImages, services } from "@/data/site-content";

export const metadata: Metadata = { title: "Services | King Style Homes" };

export default function ServicesPage() {
  const serviceAnchors = services.map((service) => ({
    id: service.title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    label: service.title,
  }));

  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Our services"
        title="One team for every way you build"
        intro="King Style Homes offers custom home builds, duplex and multi-dwelling projects, granny flats, house and land packages, renovations, extensions and complete turn-key delivery."
        image={pageImages.servicesHero}
      />
      <SandSection>
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Services
            </p>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[64px]">
              Built around your site, budget and lifestyle.
            </h2>
          </div>
          <div className="max-w-[860px]">
            <p className="font-body text-[18px] leading-7 text-amali-gray md:text-[21px] md:leading-8">
              From new homes to duplex projects, granny flats and turn-key
              delivery, each service is structured around clear guidance from
              concept through approvals, selections, construction and handover.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["Western Sydney focus", "Approval guidance", "Turn-key delivery"].map((item) => (
                <span
                  key={item}
                  className="font-body rounded-full border border-amali-dark/10 bg-white/55 px-4 py-2 text-[12px] uppercase tracking-[1.2px] text-amali-slate"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-white transition-transform hover:scale-[1.02]"
              >
                Get a free quote
              </Link>
              <Link
                href="/home-designs"
                className="rounded-full border border-amali-dark/15 px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-amali-dark transition-colors hover:bg-white"
              >
                View home designs
              </Link>
            </div>
          </div>
        </div>
        <nav
          aria-label="Service sections"
          className="mb-10 flex gap-3 overflow-x-auto rounded-[26px] border border-amali-dark/10 bg-white/60 p-3 shadow-[0_18px_60px_rgba(26,32,38,0.05)]"
        >
          {serviceAnchors.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-body shrink-0 rounded-full border border-amali-dark/10 bg-amali-sand/80 px-5 py-3 text-[11px] uppercase tracking-[1.2px] text-amali-slate transition-colors hover:bg-white hover:text-amali-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ServicesGrid />
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Service pathways
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              The right path depends on the block and brief.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            Each service below is treated as a practical pathway, pairing
            design intent with the site, approvals, selections and handover
            decisions that make the project real.
          </p>
        </div>
        <div className="grid gap-5">
          {services.map((service, index) => {
            const anchor = serviceAnchors[index];
            const reverse = index % 2 === 1;

            return (
              <article
                id={anchor.id}
                data-luxury-card
                key={service.title}
                className="grid scroll-mt-28 overflow-hidden rounded-[32px] border border-amali-dark/10 bg-white shadow-[0_24px_90px_rgba(26,32,38,0.08)] lg:grid-cols-2"
              >
                <div className={`relative min-h-[340px] ${reverse ? "lg:order-2" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/58 via-transparent to-transparent" />
                  <p className="absolute bottom-6 left-6 rounded-full border border-white/25 bg-white/15 px-5 py-3 text-[11px] uppercase tracking-[1.3px] text-white backdrop-blur-md">
                    {service.title}
                  </p>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="font-body text-[12px] uppercase tracking-[1.7px] text-amali-slate">
                    Best for
                  </p>
                  <h3 className="mt-4 text-[30px] font-light uppercase leading-none md:text-[46px]">
                    {service.title}
                  </h3>
                  <p className="font-body mt-6 text-[17px] leading-7 text-amali-gray">
                    {service.bestFor}
                  </p>
                  <p className="font-body mt-5 border-t border-amali-dark/10 pt-5 text-[15px] leading-6 text-amali-gray">
                    {service.siteConsiderations}
                  </p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.included.map((item) => (
                      <span
                        key={item}
                        className="font-body rounded-full bg-amali-sand/75 px-4 py-3 text-[11px] uppercase tracking-[1px] text-amali-slate"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact-us"
                    className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-amali-dark py-3 pl-6 pr-3 text-[12px] uppercase tracking-[1.4px] text-white"
                  >
                    Discuss this pathway
                    <span className="flex size-9 items-center justify-center rounded-full bg-white text-amali-dark">
                      <ArrowUpRight className="size-4" strokeWidth={1.6} />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Capability
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Practical proof behind the service list.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            The strongest builder pages answer the questions clients are
            already carrying: can the team handle my site, my approval pathway,
            my selections and my budget? These are the King Style areas to make
            clear before enquiry.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              data-luxury-card
              key={capability.title}
              className="rounded-[26px] border border-amali-dark/10 bg-white p-7 shadow-[0_20px_70px_rgba(26,32,38,0.07)]"
            >
              <h3 className="text-[24px] font-light uppercase leading-none tracking-[0.6px]">
                {capability.title}
              </h3>
              <p className="font-body mt-5 text-[16px] leading-7 text-amali-gray">
                {capability.text}
              </p>
              <p className="font-body mt-6 rounded-2xl bg-amali-sand/70 p-4 text-[13px] uppercase leading-5 tracking-[1px] text-amali-slate">
                {capability.proof}
              </p>
            </article>
          ))}
        </div>
      </SandSection>
      <SandSection className="bg-amali-dark text-white">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Service detail
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              What clients should understand before they call.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-white/70">
            Each service can now carry clearer decision-making content:
            who it suits, what is included, what site factors matter and what
            outcome the client should expect.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <article
              data-luxury-card
              key={service.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
            >
              <h3 className="text-[26px] font-light uppercase leading-none tracking-[0.7px]">
                {service.title}
              </h3>
              <p className="font-body mt-5 text-[16px] leading-7 text-white/70">
                {service.siteConsiderations}
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {service.included.map((item) => (
                  <span
                    key={item}
                    className="font-body rounded-full border border-white/10 bg-white/10 px-4 py-3 text-[11px] uppercase tracking-[1px] text-amali-sand"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[30px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
          <div>
            <p className="font-body text-[12px] uppercase tracking-[1.6px] text-amali-sand">
              Next step
            </p>
            <h3 className="mt-3 text-[28px] font-light uppercase leading-none md:text-[40px]">
              Start with your site and project type.
            </h3>
          </div>
          <Link
            href="/contact-us"
            className="rounded-full bg-amali-sand px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-amali-dark transition-transform hover:scale-[1.02]"
          >
            Request a consultation
          </Link>
        </div>
      </SandSection>
    </InteriorPage>
  );
}
