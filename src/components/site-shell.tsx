"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Bath, BedDouble, CarFront, Menu, Ruler } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  faqs,
  HomeDesign,
  homeDesigns,
  inclusionFeatureItems,
  inclusionGroups,
  servicePath,
  services,
} from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  ["Home Designs", "/home-designs"],
  ["Display Centers", "/display-centers"],
  ["Services", "/services"],
  ["Inclusions", "/standard-inclusions"],
  ["Contact Us", "/contact-us"],
] as const;

const footerNavigation = [...navigation, ["Blog", "/blog"]] as const;

const inclusionLinks = [
  ["Standard Inclusions", "/standard-inclusions"],
  ["Signature Inclusions", "/signature-inclusions"],
] as const;

const serviceLinks = services.map((service) => ({
  label: service.title,
  href: servicePath(service),
}));

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kingstyle_homes/",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kingstylehomes/",
    Icon: FacebookIcon,
  },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.25 8.7h2.1V5.2h-2.75c-3.05 0-4.65 1.75-4.65 4.55v2.05H6.75v3.65h2.2V21h3.85v-5.55h3.05l.55-3.65h-3.6V10.1c0-.95.45-1.4 1.45-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InteriorHeader() {
  return (
    <header data-luxury-header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-amali-dark/82 px-4 py-3 text-white shadow-xl backdrop-blur-xl md:px-6">
        <Link href="/" className="relative block h-[36px] w-[132px]">
          <Image
            src="/kingstyle-logo-wordmark-transparent.png"
            alt="King Style Homes"
            fill
            sizes="132px"
            className="object-contain"
            quality={100}
          />
        </Link>
        <nav className="hidden items-center gap-5 text-[11px] uppercase tracking-[1.2px] lg:flex">
          {navigation.map(([label, href]) => (
            label === "Services" ? (
              <details key={href} className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 transition-opacity hover:opacity-55">
                  <span>{label}</span>
                  <span className="text-[13px] leading-none transition-transform group-open:rotate-180">
                    ˅
                  </span>
                </summary>
                <div className="absolute left-1/2 top-8 grid w-72 -translate-x-1/2 gap-1 rounded-xl border border-white/10 bg-amali-dark/95 p-3 shadow-2xl backdrop-blur-xl">
                  <Link
                    href="/services"
                    className="rounded-lg px-3 py-3 text-[11px] uppercase tracking-[1.2px] text-amali-sand hover:bg-white/10"
                  >
                    Services overview
                  </Link>
                  {serviceLinks.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-lg px-3 py-3 text-[11px] uppercase leading-tight tracking-[1.2px] hover:bg-white/10"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : label === "Inclusions" ? (
              <details key={href} className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 transition-opacity hover:opacity-55">
                  <span>{label}</span>
                  <span className="text-[13px] leading-none transition-transform group-open:rotate-180">
                    ˅
                  </span>
                </summary>
                <div className="absolute left-1/2 top-8 grid w-56 -translate-x-1/2 gap-1 rounded-xl border border-white/10 bg-amali-dark/95 p-3 shadow-2xl backdrop-blur-xl">
                  {inclusionLinks.map(([childLabel, childHref]) => (
                    <Link
                      key={childHref}
                      href={childHref}
                      className="rounded-lg px-3 py-3 text-[11px] uppercase tracking-[1.2px] hover:bg-white/10"
                    >
                      {childLabel}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={href} href={href} className="transition-opacity hover:opacity-55">
                {label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <details className="group relative lg:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/20">
              <Menu className="size-4" />
            </summary>
            <nav className="absolute right-0 top-12 grid w-56 gap-1 rounded-xl border border-white/10 bg-amali-dark/95 p-3 shadow-2xl backdrop-blur-xl">
              {navigation.map(([label, href]) => (
                label === "Services" ? (
                  <div key={href} className="rounded-lg px-3 py-3">
                    <Link href="/services" className="text-[11px] uppercase tracking-[1.2px]">
                      {label}
                    </Link>
                    <div className="mt-2 grid gap-1 border-l border-white/15 pl-3">
                      {serviceLinks.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-[10px] uppercase leading-tight tracking-[1.1px] text-white/72 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : label === "Inclusions" ? (
                  <div key={href} className="rounded-lg px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[1.2px]">{label}</p>
                    <div className="mt-2 grid gap-1 border-l border-white/15 pl-3">
                      {inclusionLinks.map(([childLabel, childHref]) => (
                        <Link
                          key={childHref}
                          href={childHref}
                          className="py-2 text-[10px] uppercase tracking-[1.1px] text-white/72 hover:text-white"
                        >
                          {childLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg px-3 py-3 text-[11px] uppercase tracking-[1.2px] hover:bg-white/10"
                  >
                    {label}
                  </Link>
                )
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`King Style Homes on ${label}`}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white hover:text-amali-dark"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </nav>
          </details>
          <div className="hidden items-center gap-2 md:flex">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`King Style Homes on ${label}`}
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-amali-dark"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <Link
            href="/contact-us"
            className="hidden rounded-full bg-amali-sand px-4 py-3 text-[11px] uppercase tracking-[1.2px] text-amali-dark sm:block"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  intro,
  image = "/hero-villa-screenshot.jpg",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
}) {
  return (
    <section data-luxury-hero className="relative flex min-h-[72svh] items-end overflow-hidden bg-amali-dark px-5 pb-14 pt-36 text-white md:px-12 md:pb-20">
      <Image
        data-luxury-hero-image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-amali-dark/30 via-amali-dark/20 to-amali-dark/95" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_18%_100%,rgba(177,144,86,0.2),transparent_38%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.1),transparent_32%)]"
        aria-hidden
      />
      <div className="water-glass absolute inset-0 opacity-35" />
      <div className="interior-hero-caustics absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-[1560px]">
        <div data-hero-copy className="mb-5 flex flex-wrap items-center gap-3">
          <p className="font-body text-[12px] uppercase tracking-[2px] text-amali-sand">
            {eyebrow}
          </p>
          <span className="h-px w-14 bg-amali-sand/50" />
          <p className="font-body text-[11px] uppercase tracking-[1.8px] text-white/58">
            Western Sydney craftsmanship
          </p>
        </div>
        <h1 className="max-w-[1100px] break-words text-[30px] font-light uppercase leading-[0.94] tracking-[0.45px] sm:text-[42px] md:text-[76px] md:leading-[0.92] md:tracking-[1px] lg:text-[96px]">
          {title.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              data-hero-word
              className="mr-[0.22em] inline-block"
            >
              {word}
            </span>
          ))}
        </h1>
        <p data-hero-copy className="font-body mt-7 max-w-[720px] text-[16px] leading-7 text-white/78 md:text-[21px]">
          {intro}
        </p>
        <div data-hero-copy className="mt-9 flex max-w-[920px] flex-wrap gap-3">
          {["Tailored design", "Clear approvals", "Premium delivery"].map((item) => (
            <span
              key={item}
              className="font-body rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[1.3px] text-white/78 backdrop-blur-md"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InteriorFooter() {
  return (
    <footer data-luxury-section className="bg-amali-dark px-5 py-14 text-white md:px-12 md:py-20">
      <div className="mx-auto grid max-w-[1560px] gap-12 border-b border-white/15 pb-14 md:grid-cols-2">
        <div>
          <p className="text-[40px] font-light uppercase leading-[0.9] tracking-[1px] md:text-[64px]">
            Your home,
            <br />
            thoughtfully built.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 text-[12px] uppercase tracking-[1.2px]">
          {footerNavigation.map(([label, href]) => (
            <Link key={href} href={href} className="border-b border-white/15 py-3">
              {label}
            </Link>
          ))}
          <div className="col-span-2 mt-3 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`King Style Homes on ${label}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-3 text-[11px] uppercase tracking-[1.1px] transition-colors hover:bg-white hover:text-amali-dark"
              >
          <Icon className="size-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1560px] flex-col justify-between gap-3 text-[12px] text-white/55 md:flex-row">
        <p>King Style Homes 2026. All rights reserved.</p>
        <p>0421 000 100 · info@kingstylehomes.com.au</p>
      </div>
    </footer>
  );
}

export function InteriorPage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const compactMotion = window.matchMedia("(max-width: 767px)").matches;
    let removePointerListener: (() => void) | null = null;
    const removeCardListeners: Array<() => void> = [];
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 450);

    const ctx = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>("[data-luxury-hero]");
      const heroImage = root.querySelector<HTMLElement>("[data-luxury-hero-image]");
      const header = root.querySelector<HTMLElement>("[data-luxury-header]");

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set([header, "[data-hero-word]", "[data-hero-copy]"], {
              clearProps: "opacity,transform",
            });
          },
        })
        .fromTo(
          header,
          { y: -28 },
          { y: 0, duration: compactMotion ? 0.5 : 0.8 },
          compactMotion ? 0.18 : 0.34,
        )
        .fromTo(
          heroImage,
          { scale: compactMotion ? 1.08 : 1.14 },
          { scale: 1.02, duration: compactMotion ? 1.1 : 2.1 },
          0.08,
        )
        .fromTo(
          "[data-hero-word]",
          { y: compactMotion ? 18 : 36, rotateX: -10 },
          {
            y: 0,
            rotateX: 0,
            duration: compactMotion ? 0.62 : 1.05,
            stagger: compactMotion ? 0.025 : 0.055,
          },
          compactMotion ? 0.2 : 0.24,
        )
        .fromTo(
          "[data-hero-copy]",
          { y: 18 },
          {
            y: 0,
            duration: compactMotion ? 0.5 : 0.75,
            stagger: 0.12,
          },
          compactMotion ? 0.42 : 0.62,
        );

      if (hero && heroImage && !compactMotion) {
        gsap.to(heroImage, {
          yPercent: 12,
          scale: 1.09,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        if (window.matchMedia("(pointer: fine)").matches) {
          const moveX = gsap.quickTo(heroImage, "xPercent", { duration: 1.4, ease: "power3.out" });
          const onPointerMove = (event: PointerEvent) => {
            moveX(((event.clientX / window.innerWidth) - 0.5) * 2.2);
          };
          window.addEventListener("pointermove", onPointerMove, { passive: true });
          removePointerListener = () =>
            window.removeEventListener("pointermove", onPointerMove);
        }
      }

      gsap.utils.toArray<HTMLElement>("[data-luxury-section]").forEach((section) => {
        const revealItems = section.querySelectorAll<HTMLElement>(
          "[data-luxury-reveal], h2, h3, p, article, details, form, blockquote",
        );
        gsap.fromTo(
          revealItems,
          {
            autoAlpha: compactMotion ? 1 : 0,
            y: compactMotion ? 22 : 38,
            rotateX: compactMotion ? 0 : -5,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: compactMotion ? 0.72 : 1.08,
            stagger: compactMotion ? 0.045 : 0.075,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-luxury-card]").forEach((card) => {
        const image = card.querySelector<HTMLElement>("img");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        }

        if (!compactMotion && window.matchMedia("(pointer: fine)").matches) {
          gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });
          const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.55, ease: "power3.out" });
          const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.55, ease: "power3.out" });
          const y = gsap.quickTo(card, "y", { duration: 0.55, ease: "power3.out" });

          const onMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            rotateX(relY * -5.5);
            rotateY(relX * 5.5);
            y(-8);
          };

          const onLeave = () => {
            rotateX(0);
            rotateY(0);
            y(0);
          };

          card.addEventListener("pointermove", onMove, { passive: true });
          card.addEventListener("pointerleave", onLeave);
          removeCardListeners.push(() => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          });
        }
      });
    }, root);

    return () => {
      removePointerListener?.();
      removeCardListeners.forEach((remove) => remove());
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div ref={rootRef} className="interior-page">
      <InteriorHeader />
      <main>{children}</main>
      <InteriorFooter />
    </div>
  );
}

export function DesignGrid({ designs = homeDesigns }: { designs?: HomeDesign[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {designs.map((design) => (
        <Link
          data-luxury-card
          key={design.slug}
          href={`/home-designs/${design.slug}`}
          className="group overflow-hidden rounded-[30px] border border-amali-dark/10 bg-white shadow-[0_24px_90px_rgba(26,32,38,0.09)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={design.image}
              alt={`${design.name} home design`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/70 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] uppercase tracking-[1.3px] text-white backdrop-blur-md">
              {design.category}
            </div>
            <div className="absolute right-5 top-5 flex size-11 items-center justify-center md:right-6 md:top-6 md:size-14">
              <Image
                src="/kingstyle-shield-transparent.png"
                alt=""
                width={56}
                height={56}
                className="h-11 w-11 object-contain md:h-14 md:w-14"
                style={{
                  filter:
                    "contrast(1.08) saturate(1.02) drop-shadow(0 1px 1px rgba(255,255,255,0.45)) drop-shadow(0 5px 9px rgba(0,0,0,0.34))",
                }}
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
              <h2 className="text-[32px] font-light uppercase leading-none tracking-[1px]">
                {design.name}
              </h2>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-amali-dark transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-5" strokeWidth={1.5} />
              </span>
            </div>
          </div>
          <div className="p-6 text-amali-dark">
            <p className="font-body line-clamp-3 text-[15px] leading-6 text-amali-gray">
              {design.summary}
            </p>
            <DesignStats design={design} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function DesignStats({ design }: { design: HomeDesign }) {
  const formatCount = (count: number, singular: string) =>
    `${count} ${count === 1 ? singular : `${singular}s`}`;

  const stats = [
    [BedDouble, formatCount(design.beds, "bed")],
    [Bath, formatCount(design.baths, "bath")],
    [CarFront, formatCount(design.cars, "car")],
    [Ruler, design.frontage],
  ] as const;

  return (
    <div className="font-body mt-5 grid grid-cols-2 gap-2 border-t border-amali-dark/10 pt-4 text-[13px] text-amali-gray">
      {stats.map(([Icon, label]) => (
        <span key={label} className="flex items-center gap-2 rounded-full bg-amali-sand/70 px-3 py-2">
          <Icon className="size-4" strokeWidth={1.5} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function ServicesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article
          data-luxury-card
          key={service.title}
          className="luxury-service-card group flex min-h-[640px] flex-col overflow-hidden rounded-[30px] border border-amali-dark/10 bg-[#f7f2ea] text-amali-dark shadow-[0_24px_90px_rgba(26,32,38,0.1)]"
        >
          <div className="relative min-h-[275px] flex-1 overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover brightness-[0.76] saturate-[0.95] transition-transform duration-700 group-hover:scale-[1.08]"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,22,0.16)_0%,rgba(12,17,22,0.22)_42%,rgba(12,17,22,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,17,22,0.5)_0%,rgba(12,17,22,0.14)_58%,rgba(12,17,22,0.28)_100%)]" />
            <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/18 px-4 py-2 text-[11px] uppercase tracking-[1.4px] text-white backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-[18px] border border-white/10 bg-amali-dark/32 p-4 shadow-[0_16px_38px_rgba(0,0,0,0.2)] backdrop-blur-[2px]">
                <p className="font-body text-[12px] uppercase tracking-[1.6px] text-amali-sand">
                  King Style Homes
                </p>
                <h2 className="mt-3 break-words text-[24px] font-light uppercase leading-[0.98] tracking-[0.7px] text-white [text-wrap:balance] sm:text-[28px]">
                  {service.title}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex min-h-[300px] flex-col p-7 md:p-8">
            <p className="font-body text-[17px] leading-7 text-amali-gray">
              {service.text}
            </p>
            <p className="font-body mt-5 rounded-2xl border border-amali-dark/10 bg-white/55 p-4 text-[14px] leading-6 text-amali-gray">
              <span className="mb-2 block text-[10px] uppercase tracking-[1.3px] text-amali-slate">
                Best for
              </span>
              {service.bestFor}
            </p>
            <div className="mt-7 grid gap-2">
              {service.details.map((detail) => (
                <span
                  key={detail}
                  className="font-body rounded-full border border-amali-dark/10 bg-white/55 px-4 py-3 text-[11px] uppercase tracking-[1.1px] text-amali-slate"
                >
                  {detail}
                </span>
              ))}
            </div>
            <p className="font-body mt-5 border-t border-amali-dark/10 pt-5 text-[14px] leading-6 text-amali-gray">
              {service.outcome}
            </p>
            <Link
              href={servicePath(service)}
              className="mt-auto inline-flex items-center justify-between border-t border-amali-dark/10 pt-6 text-[12px] uppercase tracking-[1.4px] text-amali-dark"
            >
              View service details
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function InclusionList({ signature = false }: { signature?: boolean }) {
  return (
    <div className="space-y-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inclusionFeatureItems.map((item, index) => {
          const displayItem = signature
            ? item
                .replace("2740mm high ceilings", "3000mm high ceilings")
                .replace("Premium", "Signature")
            : item;

          return (
            <div
              data-luxury-reveal
              key={item}
              className="rounded-[24px] border border-amali-dark/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(26,32,38,0.06)] backdrop-blur"
            >
              <span className="font-body text-[12px] text-amali-slate">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-8 text-[18px] font-light uppercase leading-tight tracking-[0.5px]">
                {displayItem}
              </p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {inclusionGroups.map((group) => (
          <article data-luxury-card key={group.title} className="rounded-[28px] border border-amali-dark/10 bg-white p-7 text-amali-dark shadow-[0_22px_70px_rgba(26,32,38,0.08)] md:p-8">
            <p className="font-body mb-6 text-[11px] uppercase tracking-[1.5px] text-amali-slate">
              Specification
            </p>
            <h2 className="text-[28px] font-light uppercase leading-none tracking-[0.8px]">
              {group.title}
            </h2>
            <div className="font-body mt-5 grid gap-3 text-[15px] leading-6 text-amali-gray">
              {group.items.map((item) => (
                <p key={item} className="border-t border-amali-dark/10 pt-3">
                  {item}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function FaqList() {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details data-luxury-card key={faq.question} className="group rounded-[24px] border border-amali-dark/10 bg-white p-6 text-amali-dark shadow-[0_18px_60px_rgba(26,32,38,0.06)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[18px] font-light uppercase tracking-[0.6px]">
            {faq.question}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amali-sand text-amali-dark transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="font-body mt-4 max-w-[820px] text-[16px] leading-6 text-amali-gray">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function SandSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Skip the default bg/text utilities if the caller's className already
  // provides them — otherwise both classes end up in the class list and
  // Tailwind's specificity ordering is unreliable.
  const overridesBg = /(^|\s)bg-/.test(className);
  const overridesTextColor = /(^|\s)text-(amali|white|black|gray|slate|neutral|stone|zinc|red|green|blue|yellow|orange|pink|purple|indigo|teal|cyan|emerald|lime|fuchsia|rose|sky|violet|amber)/.test(
    className,
  );
  const bgClass = overridesBg ? "" : "bg-amali-sand";
  const textClass = overridesTextColor ? "" : "text-amali-dark";

  return (
    <section
      data-luxury-section
      className={`luxury-section relative overflow-hidden ${bgClass} px-5 py-16 ${textClass} md:px-12 md:py-24 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.6),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(177,144,86,0.13),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-[1560px]">{children}</div>
    </section>
  );
}
