import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Camera, CirclePlay } from "lucide-react";
import { DesignStats, FaqList, InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { homeDesigns, pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/display-centers",
  title: "Display Centres — Sydney TCE | King Style Homes",
  description:
    "Walk through the Sydney TCE display home — a finished King Style build that lets you experience the scale, finish quality and inclusions in person before you commit.",
  image: pageImages.displayHero,
  keywords: [
    "display home western sydney",
    "sydney tce display home",
    "king style display centre",
    "home builder display home",
  ],
});

export default function DisplayCentersPage() {
  const displayHome = homeDesigns.find((item) => item.category === "Display Home");

  if (!displayHome) notFound();

  const galleryPhotos = [
    {
      title: "Bathroom finishes",
      image: "/display-centers/06-3OCT2024-6-8-r.jpg",
      alt: `${displayHome.name} bathroom with marble-look tiles, black fixtures and illuminated mirror`,
    },
    {
      title: "Entry hallway",
      image: "/display-centers/07-3OCT2024-6-11-r.jpg",
      alt: `${displayHome.name} entry hallway with timber front door and display niches`,
    },
    {
      title: "Bathroom detail",
      image: "/display-centers/08-3OCT2024-6-17-r.jpg",
      alt: `${displayHome.name} bathroom detail with marble-look finishes and black fixtures`,
    },
    {
      title: "Kitchen and dining",
      image: "/display-centers/16-3OCT2024-6-43-r.jpg",
      alt: `${displayHome.name} kitchen and dining area with island bench and warm feature columns`,
    },
    {
      title: "Living area",
      image: "/display-centers/18-3OCT2024-6-60-r.jpg",
      alt: `${displayHome.name} living area with feature television wall and marble-look flooring`,
    },
    {
      title: "Main bedroom",
      image: "/display-centers/28-3OCT2024-6-78-r.jpg",
      alt: `${displayHome.name} main bedroom with balcony glazing and soft green feature wall`,
    },
    {
      title: "Theatre room",
      image: "/display-centers/31-3OCT2024-6-87-r.jpg",
      alt: `${displayHome.name} theatre room with tiered seating platform and feature lighting`,
    },
  ];
  const walkthroughVideo = "/display-centers/sydney-tce-walkthrough.mp4";
  const inspectionItems = [
    "Facade and street presence",
    "Kitchen finishes and joinery",
    "Bathroom fixtures and tiling",
    "Lighting and electrical detail",
    "Flooring, stairs and glazing",
    "Room scale and storage",
  ];

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
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="relative min-h-[430px] overflow-hidden rounded-[34px] shadow-[0_28px_100px_rgba(26,32,38,0.12)] md:min-h-[620px] lg:min-h-[720px]">
            <Image
              src={displayHome.image}
              alt={`${displayHome.name} display home exterior`}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/72 via-amali-dark/8 to-transparent" />
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
          <div className="pt-2 lg:sticky lg:top-32">
            <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-slate">
              Display overview
            </p>
            <h3 className="mt-5 text-[38px] font-light uppercase leading-none md:text-[62px]">
              {displayHome.name}
            </h3>
            <p className="font-body mt-6 text-[19px] leading-8 text-amali-gray">
              {displayHome.summary}
            </p>
            <p className="font-body mt-5 text-[17px] leading-7 text-amali-gray">
              {displayHome.description}
            </p>
            <DesignStats design={displayHome} />
            <div className="mt-8 grid gap-3">
              {displayHome.highlights.map((highlight) => (
                <p key={highlight} className="font-body rounded-full border border-amali-dark/10 bg-white/55 px-4 py-3 text-[12px] uppercase tracking-[1px] text-amali-slate">
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
            <Link
              href="/contact-us"
              className="ml-0 mt-4 inline-flex items-center justify-between gap-5 rounded-full border border-amali-dark/15 py-3 pl-7 pr-3 text-[12px] uppercase tracking-[1.4px] text-amali-dark transition-colors hover:bg-white md:ml-3"
            >
              Book a display visit
              <span className="flex size-9 items-center justify-center rounded-full bg-amali-dark text-white">
                <ArrowUpRight className="size-5" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
                Gallery
              </p>
              <h2 className="text-[34px] font-light uppercase leading-none md:text-[54px]">
                Photos and walkthrough media.
              </h2>
            </div>
            <p className="font-body max-w-[780px] text-[17px] leading-7 text-amali-gray">
              Browse the Sydney TCE interior photography and walkthrough video
              to see the finishes, room scale and detailed selections beyond
              the facade.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <figure className="relative min-h-[360px] overflow-hidden rounded-[30px] md:min-h-[520px]">
              <Image
                src={galleryPhotos[0].image}
                alt={galleryPhotos[0].alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-white/15 px-5 py-3 text-[11px] uppercase tracking-[1.3px] text-white backdrop-blur-md">
                {galleryPhotos[0].title}
              </figcaption>
            </figure>
            <div className="grid gap-5">
              <figure className="relative min-h-[240px] overflow-hidden rounded-[30px]">
                <Image
                  src={galleryPhotos[1].image}
                  alt={galleryPhotos[1].alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-3 text-[11px] uppercase tracking-[1.3px] text-white backdrop-blur-md">
                  <Camera className="size-4" strokeWidth={1.5} />
                  {galleryPhotos[1].title}
                </figcaption>
              </figure>
              <div className="relative overflow-hidden rounded-[30px] bg-amali-dark text-white">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={displayHome.image}
                  className="aspect-video w-full object-cover"
                >
                  <source src={walkthroughVideo} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/20 bg-amali-dark/55 px-5 py-3 text-white backdrop-blur-md">
                  <CirclePlay className="size-5 text-amali-sand" strokeWidth={1.4} />
                  <p className="text-[11px] uppercase tracking-[1.4px]">
                    Walkthrough video
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryPhotos.slice(2).map((photo) => (
              <figure
                key={photo.image}
                className="relative min-h-[280px] overflow-hidden rounded-[30px] md:min-h-[340px]"
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/55 via-transparent to-transparent" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-3 text-[11px] uppercase tracking-[1.3px] text-white backdrop-blur-md">
                  <Camera className="size-4" strokeWidth={1.5} />
                  {photo.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
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
            <p className="font-body mt-6 max-w-[680px] text-[17px] leading-7 text-white/68">
              Use the visit to compare the parts of a finished home that are
              difficult to judge from renders alone: proportions, surfaces,
              storage, light, movement and finish quality.
            </p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-amali-sand py-3 pl-6 pr-3 text-[12px] uppercase tracking-[1.4px] text-amali-dark"
            >
              Book a visit
              <span className="flex size-9 items-center justify-center rounded-full bg-amali-dark text-white">
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </span>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {inspectionItems.map((item, index) => (
              <div
                key={item}
                data-luxury-card
                className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
              >
                <p className="font-body text-[12px] uppercase tracking-[1.5px] text-amali-sand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-7 text-[19px] font-light uppercase leading-tight tracking-[0.5px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {displayHome.designConsiderations.map((item) => (
            <div
              key={item}
              data-luxury-card
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <p className="text-[18px] font-light uppercase leading-tight tracking-[0.5px]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-8 text-[34px] font-light uppercase md:text-[54px]">Display home FAQs</h2>
        <FaqList />
      </SandSection>
    </InteriorPage>
  );
}
