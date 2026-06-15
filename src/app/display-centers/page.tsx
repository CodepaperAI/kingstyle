import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { DesignStats, FaqList, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { homeDesigns, pageImages } from "@/data/site-content";

export const metadata: Metadata = { title: "Display Centers | King Style Homes" };

export default function DisplayCentersPage() {
  const displayHome = homeDesigns.find((item) => item.category === "Display Home");

  if (!displayHome) notFound();

  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Display centers"
        title="Experience Sydney TCE in person"
        intro={displayHome.summary}
        image={pageImages.displayHero}
      />
      <SandSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Current display home
            </p>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[62px]">
              Walk through the finish before you build.
            </h2>
          </div>
          <p className="font-body max-w-[860px] text-[18px] leading-7 text-amali-gray md:text-[21px] md:leading-8">
            {displayHome.description}
          </p>
        </div>
        <article data-luxury-card className="overflow-hidden rounded-[34px] border border-amali-dark/10 bg-white text-amali-dark shadow-[0_28px_100px_rgba(26,32,38,0.11)]">
          <div className="grid lg:grid-cols-[1.14fr_0.86fr]">
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px] lg:min-h-[680px]">
              <Image
                src={displayHome.image}
                alt={`${displayHome.name} display home exterior`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/75 via-amali-dark/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-[11px] uppercase tracking-[1.4px] text-white backdrop-blur-md md:left-8 md:top-8">
                {displayHome.category}
              </div>
              <div className="absolute bottom-6 left-5 right-5 text-white md:bottom-9 md:left-8 md:right-8">
                <p className="font-body mb-3 text-[12px] uppercase tracking-[1.7px] text-amali-sand">
                  Featured walkthrough
                </p>
                <h3 className="text-[44px] font-light uppercase leading-none tracking-[1px] md:text-[72px]">
                  {displayHome.name}
                </h3>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:p-12">
              <div>
                <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-slate">
                  Display overview
                </p>
                <h3 className="mt-5 text-[34px] font-light uppercase leading-none md:text-[52px]">
                  A finished home you can read by touch, scale and detail.
                </h3>
                <p className="font-body mt-6 text-[17px] leading-7 text-amali-gray">
                  {displayHome.summary}
                </p>
                <DesignStats design={displayHome} />
              </div>
              <div>
                <div className="grid gap-3">
                  {displayHome.highlights.map((highlight) => (
                    <p key={highlight} className="font-body rounded-full border border-amali-dark/10 bg-amali-sand/55 px-4 py-3 text-[12px] uppercase tracking-[1px] text-amali-slate">
                      {highlight}
                    </p>
                  ))}
                </div>
                <Link
                  href={`/home-designs/${displayHome.slug}`}
                  className="mt-8 inline-flex items-center justify-between gap-5 rounded-full bg-amali-dark py-3 pl-7 pr-3 text-[12px] uppercase tracking-[1.4px] text-white transition-transform hover:scale-[1.02]"
                >
                  View design details
                  <span className="flex size-9 items-center justify-center rounded-full bg-white text-amali-dark">
                    <ArrowUpRight className="size-5" strokeWidth={1.5} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </SandSection>
      <SandSection className="!bg-amali-dark !text-white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              What to inspect
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              See the decisions that shape the finished home.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {displayHome.highlights.map((item) => (
              <div key={item} data-luxury-card className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-[19px] font-light uppercase leading-tight tracking-[0.5px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-8 text-[34px] font-light uppercase md:text-[54px]">Display home FAQs</h2>
        <FaqList />
      </SandSection>
    </InteriorPage>
  );
}
