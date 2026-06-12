import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero, InteriorPage, SandSection, ServicesGrid } from "@/components/site-shell";
import { pageImages } from "@/data/site-content";

export const metadata: Metadata = { title: "Services | King Style Homes" };

export default function ServicesPage() {
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
        <ServicesGrid />
      </SandSection>
    </InteriorPage>
  );
}
