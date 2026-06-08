"use client";

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import type {
  Application as PixiApplication,
  Container as PixiContainer,
  DisplacementFilter as PixiDisplacementFilter,
  Sprite as PixiSprite,
} from "pixi.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie, { AnimationItem } from "lottie-web";
import { ChevronRight, Volume2, VolumeX, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ASSET_BASE = "https://amaliproperties.com/wp-content";
const HERO_IMAGE = "/hero-villa-screenshot.png";
const FLY_THROUGH_VIDEO = "/amali-fly-through.mp4";

const villaGalleryImages = [
  {
    src: "/amali-villa-evening-front.jpeg",
    alt: "Illuminated modern white home exterior at dusk",
  },
  {
    src: "/amali-villa-evening-entrance.jpeg",
    alt: "Modern home facade with arched windows illuminated at dusk",
  },
];

const homeSlides = [
  {
    label: "Homes",
    cta: "Explore Home Designs",
    href: "https://amaliproperties.com/the-villas/",
    image: HERO_IMAGE,
  },
];

const visionImages = [
  {
    src: `${ASSET_BASE}/uploads/2025/06/GF-Living-Room_View-2_1-1.png.webp`,
    className: "col-span-7 md:col-span-4 md:pt-20 lg:pt-28",
    frame: "h-[180px] sm:h-[390px]",
  },
  {
    src: `${ASSET_BASE}/uploads/2025/06/Copy-of-olga-thelavart-1nrY9CLAGcI-unsplash-1.png.webp`,
    className:
      "col-span-3 col-start-10 md:col-span-2 md:col-start-11 -mt-16 md:-mt-24",
    frame: "aspect-[265/360]",
  },
  {
    src: `${ASSET_BASE}/uploads/2025/06/Copy-of-Screenshot-2023-12-10-at-8.41.15-PM-1.png.webp`,
    className: "col-span-3 md:col-span-2",
    frame: "aspect-[190/260]",
  },
  {
    src: `${ASSET_BASE}/uploads/2025/06/DM_GF_Dining-1.png.webp`,
    className: "col-span-9 col-start-4 md:col-span-5 md:col-start-8",
    frame: "aspect-[500/380]",
  },
];

const teaserCards = [
  {
    eyebrow: "King Style Homes",
    title: "Custom Builds",
    href: "https://amaliproperties.com/island/amali-island-welcome/",
    image: `${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`,
  },
  {
    eyebrow: "King Style Homes",
    title: "House & Land",
    href: "https://amaliproperties.com/residences/residences-teaser/",
    image: `${ASSET_BASE}/uploads/2026/02/View-8_Penthouse.jpg`,
  },
  {
    eyebrow: "King Style Homes",
    title: "Renovations",
    href: "https://amaliproperties.com/the-villas/",
    image: `${ASSET_BASE}/uploads/2025/08/CAM-3A_-1.png`,
  },
];

const mapHotspots = [
  { label: "Display Centers", left: "33%", top: "48%", align: "top" },
  { label: "Home Designs", left: "57%", top: "46%", align: "bottom" },
  { label: "Inclusions", left: "46%", top: "55%", align: "top" },
  { label: "Sydney Projects", left: "25%", top: "58%", align: "top" },
];

const menuGroups = [
  {
    label: "Home Designs",
    href: "https://amaliproperties.com/canal/",
    links: [
      {
        label: "Explore our designs",
        href: "https://amaliproperties.com/residences/residences-teaser/",
      },
    ],
  },
  {
    label: "Services",
    href: "https://amaliproperties.com/island/",
    links: [
      {
        label: "Custom home builds",
        href: "https://amaliproperties.com/island/amali-island-welcome/",
      },
      {
        label: "House and land packages",
        href: "https://amaliproperties.com/island/island-villas/",
      },
      {
        label: "Renovations and extensions",
        href: "https://amaliproperties.com/island/clubhouse/",
      },
    ],
  },
  {
    label: "Inclusions",
    href: "https://amaliproperties.com/the-villas/",
    links: [
      {
        label: "Standard inclusions",
        href: "https://amaliproperties.com/the-villas/",
      },
      {
        label: "Signature inclusions",
        href: "https://amaliproperties.com/bespoke-villa/villa-elaine/",
      },
    ],
  },
];

const singleLinks = [
  { label: "Home", href: "https://amaliproperties.com/" },
  { label: "About Us", href: "https://amaliproperties.com/about-amali/" },
  { label: "Display Centers", href: "https://amaliproperties.com/locations/" },
  { label: "Contact Us", href: "https://amaliproperties.com/contact/" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://amaliproperties.com/",
      url: "https://amaliproperties.com/",
      name: "Home - King Style Homes",
      description:
        "King Style Homes designs and constructs custom homes that blend style, functionality, and exceptional craftsmanship.",
      inLanguage: "en-AU",
      isPartOf: { "@id": "https://amaliproperties.com/#website" },
      thumbnailUrl: `${ASSET_BASE}/uploads/2026/03/View-8_Penthouse-1.jpg`,
    },
    {
      "@type": "Organization",
      "@id": "https://amaliproperties.com/#organization",
      name: "King Style Homes",
      url: "https://amaliproperties.com/",
      logo: `${ASSET_BASE}/uploads/2025/11/Amali-brandmark.jpg`,
    },
  ],
};

function useLottie(path: string, loop = false, autoplay = true) {
  const ref = useRef<HTMLDivElement | null>(null);
  const animation = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    animation.current = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop,
      autoplay,
      path,
    });

    return () => {
      animation.current?.destroy();
      animation.current = null;
    };
  }, [autoplay, loop, path]);

  return { ref, animation };
}

function useHomeReveals() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

function Logo({ dark = false }: { dark?: boolean }) {
  const { ref: lightRef } = useLottie("/lottie/logo.json", false, true);

  return (
    <a
      href="https://amaliproperties.com"
      className={`focus-ring pointer-events-auto relative flex h-[58px] w-[132px] flex-col items-center justify-center text-center transition-colors duration-500 sm:w-[190px] ${
        dark ? "text-amali-dark" : "text-white"
      }`}
      title="King Style Homes"
    >
      <span ref={lightRef} className="absolute inset-0 block opacity-0" />
      <span className="relative block text-[26px] font-light uppercase leading-none tracking-[9px] sm:text-[34px] sm:tracking-[12px]">
        King
      </span>
      <span className="relative mt-2 block text-[7px] font-bold uppercase leading-none tracking-[4px] sm:text-[8px]">
        Style Homes
      </span>
      <span className="sr-only">King Style Homes</span>
    </a>
  );
}

function MenuButton({
  isOpen,
  onClick,
  dark = false,
}: {
  isOpen: boolean;
  onClick: () => void;
  dark?: boolean;
}) {
  const { ref, animation } = useLottie("/lottie/hamburger.json", false, false);
  const wasOpen = useRef(false);

  useEffect(() => {
    const anim = animation.current;
    if (!anim) return;
    if (isOpen) {
      anim.playSegments([0, 100], true);
    } else if (wasOpen.current) {
      anim.playSegments([100, 300], true);
      window.setTimeout(() => anim.goToAndStop(0, true), 240);
    } else {
      anim.goToAndStop(0, true);
    }
    wasOpen.current = isOpen;
  }, [animation, isOpen]);

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={`focus-ring relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ${
        dark ? "text-amali-dark" : "text-white"
      }`}
    >
      <span ref={ref} className="absolute inset-2 opacity-0" />
      <span className="relative block h-5 w-5" aria-hidden>
        <span
          className={`absolute left-0 top-[6px] h-px w-full bg-current transition-transform duration-300 ${
            isOpen ? "translate-y-[4px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300 ${
            isOpen ? "-translate-y-[4px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

function ArrowButton({
  children,
  tone = "light",
  onClick,
  href,
}: {
  children: ReactNode;
  tone?: "light" | "slate" | "dark" | "sand";
  onClick?: () => void;
  href?: string;
}) {
  const classes =
    tone === "slate"
      ? "bg-amali-slate text-white"
      : tone === "dark"
        ? "bg-amali-dark text-white"
        : tone === "sand"
          ? "bg-[#1a20260f] text-amali-dark"
          : "glass-pill text-white";
  const iconBg =
    tone === "light" ? "bg-white text-amali-dark" : "bg-white text-amali-dark";

  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap text-[12px] font-normal uppercase leading-none tracking-[1.6px] sm:text-[14px]">
        {children}
      </span>
      <span
        className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <ChevronRight aria-hidden className="size-4" strokeWidth={1.7} />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`focus-ring group inline-flex min-w-fit shrink-0 items-center gap-5 overflow-hidden rounded-[60px] py-2 pl-8 pr-2 transition-transform duration-300 hover:scale-[1.02] ${classes}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring group inline-flex min-w-fit shrink-0 items-center gap-5 overflow-hidden rounded-[60px] py-2 pl-8 pr-2 transition-transform duration-300 hover:scale-[1.02] ${classes}`}
    >
      {content}
    </button>
  );
}

function Header({ onRegister }: { onRegister: () => void }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("Home Designs");
  const [onLightSection, setOnLightSection] = useState(false);
  const useDarkHeader = onLightSection && !open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const updateTheme = () => {
      const locations = document.getElementById("locations");
      const y = window.scrollY;
      const onMap =
        locations &&
        y >= locations.offsetTop - 80 &&
        y <= locations.offsetTop + locations.offsetHeight - 80;

      setOnLightSection(!onMap && y > window.innerHeight * 0.94);
    };
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-[5px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-5 pt-5 sm:px-8 lg:px-10 lg:pt-10">
        <div className="pointer-events-auto">
          <div
            className={`relative flex flex-row-reverse items-center rounded-[40px] py-1 pl-2 pr-1 backdrop-blur-[20px] transition-colors duration-500 lg:flex-row lg:gap-1 ${
              useDarkHeader ? "bg-amali-dark/10" : "bg-white/20"
            }`}
          >
            <MenuButton
              isOpen={open}
              dark={useDarkHeader}
              onClick={() => setOpen((value) => !value)}
            />
            <button
              type="button"
              onClick={onRegister}
              className="focus-ring hidden rounded-[40px] bg-amali-sand px-5 py-3 text-[12px] uppercase leading-none tracking-[1.2px] text-amali-dark transition-colors hover:bg-amali-dark hover:text-white lg:block"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="focus-ring flex size-9 items-center justify-center rounded-full bg-amali-sand text-amali-dark lg:hidden"
              aria-label="Enquire"
            >
              <ChevronRight aria-hidden className="size-4 rotate-[-35deg]" />
            </button>
          </div>
        </div>
        <div className="pointer-events-auto absolute left-1/2 top-5 -translate-x-1/2 lg:top-10">
          <Logo dark={useDarkHeader} />
        </div>
        <div className="pointer-events-auto ml-auto hidden lg:block">
          <AudioToggle dark={useDarkHeader} />
        </div>
      </header>

      <nav
        className={`fixed left-5 top-20 z-50 max-h-[calc(100dvh-100px)] w-[calc(100vw-40px)] overflow-auto rounded-[40px] bg-white/20 px-6 pb-10 pt-12 text-white backdrop-blur-[24px] transition-all duration-500 lg:left-10 lg:top-24 lg:w-auto lg:min-w-[480px] lg:px-16 lg:pb-14 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-5 whitespace-nowrap">
          {menuGroups.map((group) => (
            <li key={group.label} className="overflow-hidden">
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between gap-12 text-left text-[28px] font-light uppercase leading-[0.9] tracking-[1.14px] transition-opacity hover:opacity-70 sm:text-[38px] lg:text-[50px]"
                onClick={() =>
                  setExpanded((value) =>
                    value === group.label ? "" : group.label,
                  )
                }
              >
                <span>{group.label}</span>
                <span className="relative size-6 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-white" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-px bg-white transition-transform duration-300 ${
                      expanded === group.label ? "rotate-90" : ""
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  expanded === group.label
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="font-body min-h-0 space-y-3 overflow-hidden pt-4 text-[16px] font-light leading-none tracking-[0.42px]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="focus-ring relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="my-6 h-px bg-white/20" />
        <ul className="space-y-4 text-[28px] font-light uppercase leading-none tracking-[1.14px] lg:text-[36px]">
          {singleLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="focus-ring transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.instagram.com/amaliproperties/"
          className="focus-ring font-body mt-9 flex items-center gap-3 text-[15px] tracking-[0.4px]"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white">
            IG
          </span>
          King Style Homes
        </a>
      </nav>
    </>
  );
}

function AudioToggle({ dark = false }: { dark?: boolean }) {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOn((value) => !value)}
      className={`focus-ring flex items-center gap-[18px] rounded-full transition-colors duration-500 ${
        dark ? "text-amali-dark" : "text-white"
      }`}
      aria-label={on ? "Mute ambience" : "Play ambience"}
    >
      <span className="flex size-10 items-center justify-center rounded-full border border-current">
        {on ? (
          <Volume2 aria-hidden className="size-4" strokeWidth={1.5} />
        ) : (
          <VolumeX aria-hidden className="size-4" strokeWidth={1.5} />
        )}
      </span>
      <span className="sr-only">{on ? "Ambience on" : "Ambience off"}</span>
    </button>
  );
}

function createFlowDisplacementMap(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return canvas;

  const imageData = context.createImageData(size, size);
  const data = imageData.data;
  const center = size / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = (x - center) / center;
      const dy = (y - center) / center;
      const flowDistance = Math.abs(dx);
      const crossDistance = Math.abs(dy);
      const index = (y * size + x) * 4;

      let offsetX = 0;
      let offsetY = 0;

      if (flowDistance < 0.98 && crossDistance < 0.72) {
        const head = Math.max(0, 1 - Math.max(0, dx + 0.78) / 1.76);
        const tail = Math.max(0, 1 - Math.max(0, -dx - 0.2) / 0.72);
        const crossFalloff = Math.exp(-crossDistance * crossDistance * 9.4);
        const flowFalloff = Math.exp(-flowDistance * flowDistance * 1.55);
        const brokenEdge =
          0.72 +
          0.2 * Math.sin((dx + dy) * 13.5) +
          0.08 * Math.sin((dx - dy) * 29);
        const envelope =
          Math.max(0, head * tail * crossFalloff * flowFalloff * brokenEdge);
        const stream =
          Math.sin(dx * 23 + Math.sin(dy * 10) * 1.2) * 0.58 +
          Math.sin(dx * 41 - dy * 11) * 0.27 +
          Math.sin((dx + dy) * 68) * 0.15;
        const shear =
          Math.sin(dx * 15 + dy * 24) * 0.48 +
          Math.sin(dx * 37 - dy * 15) * 0.2;

        offsetX = stream * envelope * 54;
        offsetY = (shear * envelope + dy * envelope * 0.72) * 42;
      }

      data[index] = 128 + offsetX;
      data[index + 1] = 128 + offsetY;
      data[index + 2] = 128;
      data[index + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

function createFlowHighlightMap(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const center = size / 2;
  context.clearRect(0, 0, size, size);

  const glow = context.createRadialGradient(
    center * 0.52,
    center * 0.5,
    size * 0.04,
    center,
    center,
    center * 1.18,
  );
  glow.addColorStop(0, "rgba(255,255,255,0.2)");
  glow.addColorStop(0.3, "rgba(119,179,207,0.1)");
  glow.addColorStop(0.68, "rgba(5,35,50,0.1)");
  glow.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);

  return canvas;
}

function HeroWaterCanvas({ image }: { image: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!host || reduceMotion.matches) return;

    const heroSection = host.closest<HTMLElement>("[data-hero-section]");
    let app: PixiApplication | null = null;
    let imageLayer: PixiContainer | null = null;
    let heroSprite: PixiSprite | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let cancelled = false;
    let activeFilterCount = 0;
    let poolIndex = 0;
    let lastFlowAngle = 0;
    let lastPointer: { x: number; y: number } | null = null;
    let lastRipple = { time: 0, x: 0, y: 0 };

    type Ripple = {
      active: boolean;
      age: number;
      duration: number;
      filter: PixiDisplacementFilter;
      highlight: PixiSprite;
      map: PixiSprite;
      originX: number;
      originY: number;
      driftX: number;
      driftY: number;
      maxScaleX: number;
      maxScaleY: number;
      strength: number;
    };

    let ripples: Ripple[] = [];

    const fitHeroSprite = () => {
      if (!host || !app || !heroSprite) return;

      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      app.renderer.resize(width, height);

      const textureWidth = heroSprite.texture.width;
      const textureHeight = heroSprite.texture.height;
      const scale = Math.max(width / textureWidth, height / textureHeight);

      heroSprite.scale.set(scale);
      heroSprite.position.set(
        (width - textureWidth * scale) / 2,
        (height - textureHeight * scale) / 2,
      );

      app.stage.filterArea = app.screen;
      if (imageLayer) {
        imageLayer.filterArea = app.screen;
      }
      app.render();
    };

    const syncFilters = () => {
      if (!imageLayer) return;

      const activeFilters = ripples
        .filter((ripple) => ripple.active)
        .map((ripple) => ripple.filter);

      if (activeFilters.length !== activeFilterCount) {
        imageLayer.filters = activeFilters;
        activeFilterCount = activeFilters.length;
        host.classList.toggle("is-rippling", activeFilterCount > 0);
      }
    };

    const spawnRipple = (
      x: number,
      y: number,
      speed: number,
      angle: number,
    ) => {
      if (!ripples.length) return;

      const ripple = ripples[poolIndex];
      poolIndex = (poolIndex + 1) % ripples.length;

      const size = 460 + speed * 340;
      const flowAngle = Number.isFinite(angle) ? angle : lastFlowAngle;
      lastFlowAngle = flowAngle;
      const directionX = Math.cos(flowAngle);
      const directionY = Math.sin(flowAngle);
      const angleVariation = (Math.random() - 0.5) * 0.32;

      ripple.active = true;
      ripple.age = 0;
      ripple.duration = 1800 + speed * 460;
      ripple.originX = x;
      ripple.originY = y;
      ripple.driftX = directionX * (58 + speed * 112);
      ripple.driftY = directionY * (34 + speed * 70);
      ripple.maxScaleX = (size / 512) * (2.34 + speed * 0.94);
      ripple.maxScaleY = (size / 512) * (0.92 + speed * 0.32);
      ripple.strength = 36 + speed * 44;
      ripple.map.position.set(x, y);
      ripple.map.rotation = flowAngle + angleVariation;
      ripple.map.scale.set(0.04, 0.018);
      ripple.highlight.position.set(x, y);
      ripple.highlight.rotation = ripple.map.rotation;
      ripple.highlight.scale.set(0.05, 0.022);
      ripple.highlight.alpha = 0;
      ripple.filter.scale.x = 0;
      ripple.filter.scale.y = 0;
      syncFilters();
      app?.ticker.start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const rect = host.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        lastPointer = null;
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const previous = lastPointer ?? { x, y };
      const velocityX = x - previous.x;
      const velocityY = y - previous.y;
      const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 58);
      const angle =
        Math.abs(velocityX) + Math.abs(velocityY) > 0.5
          ? Math.atan2(velocityY, velocityX)
          : lastFlowAngle;
      const now = performance.now();
      const distance = Math.hypot(x - lastRipple.x, y - lastRipple.y);

      lastPointer = { x, y };

      if (now - lastRipple.time > 95 && distance > 38) {
        spawnRipple(x, y, speed, angle);
        lastRipple = { time: now, x, y };
      }
    };

    const handlePointerLeave = () => {
      lastPointer = null;
    };

    const run = async () => {
      const {
        Application,
        Assets,
        Container,
        DisplacementFilter,
        Sprite,
        Texture,
      } = await import("pixi.js");

      if (cancelled) return;

      const pixiApp = new Application();
      app = pixiApp;

      await pixiApp.init({
        antialias: true,
        autoDensity: true,
        backgroundAlpha: 0,
        powerPreference: "high-performance",
        preference: "webgl",
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        width: Math.max(1, host.clientWidth),
        height: Math.max(1, host.clientHeight),
      });

      if (cancelled) {
        pixiApp.destroy({ removeView: true }, true);
        return;
      }

      pixiApp.canvas.className = "hero-pixi-canvas";
      host.appendChild(pixiApp.canvas);

      const texture = await Assets.load(image);
      if (cancelled) {
        pixiApp.destroy({ removeView: true }, true);
        return;
      }

      imageLayer = new Container();
      heroSprite = Sprite.from(texture);
      imageLayer.addChild(heroSprite);
      pixiApp.stage.addChild(imageLayer);

      const highlightLayer = new Container();
      const mapTexture = Texture.from(createFlowDisplacementMap(), true);
      const highlightTexture = Texture.from(createFlowHighlightMap(), true);

      ripples = Array.from({ length: 5 }, () => {
        const map = Sprite.from(mapTexture);
        const highlight = Sprite.from(highlightTexture);
        const filter = new DisplacementFilter({
          sprite: map,
          scale: { x: 0, y: 0 },
          padding: 120,
        });

        map.anchor.set(0.5);
        map.position.set(-9999, -9999);
        map.scale.set(0.001);
        map.renderable = false;

        highlight.anchor.set(0.5);
        highlight.position.set(-9999, -9999);
        highlight.scale.set(0.001);
        highlight.alpha = 0;

        pixiApp.stage.addChild(map);
        highlightLayer.addChild(highlight);

        return {
          active: false,
          age: 0,
          duration: 1400,
          filter,
          highlight,
          map,
          originX: 0,
          originY: 0,
          driftX: 0,
          driftY: 0,
          maxScaleX: 1,
          maxScaleY: 1,
          strength: 0,
        };
      });

      pixiApp.stage.addChild(highlightLayer);
      fitHeroSprite();
      host.classList.add("is-ready");
      heroSection?.classList.add("is-pixi-hero-ready");

      pixiApp.ticker.add((ticker) => {
        let changedActiveState = false;

        const deltaMS = Math.min(ticker.deltaMS, 32);

        ripples.forEach((ripple) => {
          if (!ripple.active) return;

          ripple.age += deltaMS;
          const progress = Math.min(1, ripple.age / ripple.duration);
          const attackProgress = Math.min(1, progress / 0.14);
          const attack = 1 - (1 - attackProgress) ** 3;
          const expand = 1 - (1 - progress) ** 2.7;
          const release = (1 - progress) ** 1.65;
          const envelope = attack * release;
          const drift = 1 - (1 - progress) ** 2.2;
          const pulse = 0.98 + Math.sin(progress * Math.PI * 1.65) * 0.035;
          const scaleX = Math.max(0.001, ripple.maxScaleX * expand);
          const scaleY = Math.max(0.001, ripple.maxScaleY * (0.62 + expand * 0.38));
          const strength = ripple.strength * envelope;

          ripple.map.position.set(
            ripple.originX + ripple.driftX * drift,
            ripple.originY + ripple.driftY * drift,
          );
          ripple.map.scale.set(scaleX, scaleY);
          ripple.map.rotation += deltaMS * 0.000045;
          ripple.filter.scale.x = strength * pulse;
          ripple.filter.scale.y = strength * 0.92 * (1.04 - (pulse - 0.98));
          ripple.highlight.position.set(
            ripple.originX + ripple.driftX * drift * 0.92,
            ripple.originY + ripple.driftY * drift * 0.92,
          );
          ripple.highlight.scale.set(scaleX * 0.92, scaleY * 0.95);
          ripple.highlight.alpha = Math.min(0.16, envelope * 0.24);

          if (progress >= 1) {
            ripple.active = false;
            ripple.map.position.set(-9999, -9999);
            ripple.map.scale.set(0.001);
            ripple.highlight.position.set(-9999, -9999);
            ripple.highlight.scale.set(0.001);
            ripple.highlight.alpha = 0;
            ripple.filter.scale.x = 0;
            ripple.filter.scale.y = 0;
            changedActiveState = true;
          }
        });

        if (changedActiveState) {
          syncFilters();
          if (activeFilterCount === 0) {
            pixiApp.render();
            pixiApp.ticker.stop();
          }
        }
      });
      pixiApp.render();
      pixiApp.ticker.stop();

      resizeObserver = new ResizeObserver(fitHeroSprite);
      resizeObserver.observe(host);
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("pointerleave", handlePointerLeave);
    };

    run().catch(() => {
      host.classList.remove("is-ready", "is-rippling");
      heroSection?.classList.remove("is-pixi-hero-ready");
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      host.classList.remove("is-ready", "is-rippling");
      heroSection?.classList.remove("is-pixi-hero-ready");

      if (app) {
        app.destroy({ removeView: true }, true);
      }
    };
  }, [image]);

  return <div ref={hostRef} className="hero-pixi-water" aria-hidden />;
}

function HomeHero() {
  const [active, setActive] = useState(0);
  const introDone = true;
  const activeSlide = homeSlides[active];

  useEffect(() => {
    if (homeSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % homeSlides.length);
    }, 6200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      data-hero-section
      className="relative h-svh min-h-[620px] overflow-hidden bg-amali-dark"
    >
      <div className="hero-base-image absolute inset-0 z-10 overflow-hidden">
        {homeSlides.map((slide, index) => (
          <img
            key={slide.label}
            src={slide.image}
            alt=""
            aria-hidden
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`fill-media scale-[1.02] transition-opacity duration-[1400ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="hero-blur-veil absolute inset-0 z-20 overflow-hidden">
        {homeSlides.map((slide, index) => (
          <img
            key={`top-blur-${slide.label}`}
            src={slide.image}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            className={`hero-water fill-media scale-[1.08] transition-opacity duration-[1400ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="hero-wave-veil absolute inset-0 z-20" aria-hidden />
      <div className="hero-glass-wave absolute inset-x-[-8%] top-[7%] z-20 h-[46vh]" aria-hidden />
      <HeroWaterCanvas image={activeSlide.image} />
      <div className="absolute inset-0 z-20 bg-black/25" />
      <div className="water-glass absolute inset-0 z-20 opacity-55" />
      <div className="absolute inset-x-0 bottom-0 z-20 hidden h-1/2 bg-gradient-to-t from-amali-dark/65 to-transparent md:block" />

      <div
        className={`absolute inset-0 z-30 flex items-start justify-center px-6 pt-32 text-center transition-all duration-700 md:items-center md:pt-0 ${
          introDone ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="max-w-[820px] text-[36px] font-light uppercase leading-[0.86] tracking-[0.8px] text-white sm:text-[42px] md:text-[72px] md:leading-[0.89] md:tracking-[2.16px]">
          Building
          <br />
          lasting homes
        </h1>
      </div>

      <div
        className={`relative z-30 flex h-full flex-col items-center justify-center px-6 pt-20 text-center transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="hero-live-title max-w-[900px] text-[36px] font-light uppercase leading-[0.86] tracking-[0.8px] text-white sm:text-[42px] md:text-[72px] md:leading-[0.89] md:tracking-[2.16px]">
          Quality.
          <br />
          Style.
          <br />
          Excellence.
        </h2>
      </div>

      <div
        className={`hero-slider-ui absolute bottom-8 left-1/2 z-40 hidden -translate-x-1/2 transition-opacity duration-500 md:block ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-6">
          <p className="text-[16px] font-normal uppercase leading-none tracking-[1.6px] text-white">
            Explore
          </p>
          <div className="relative flex overflow-hidden rounded-[10px] bg-white/5 px-2 backdrop-blur-[10px]">
            <span
              key={active}
              className="hero-progress absolute bottom-0 left-0 top-0 bg-white/10"
            />
            {homeSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.label}
                onClick={() => setActive(index)}
                className={`focus-ring relative z-10 px-4 py-4 text-[16px] font-normal uppercase leading-none tracking-[1.6px] text-white transition-opacity ${
                  active === index ? "opacity-100" : "opacity-40"
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
          <p className="text-[16px] font-normal uppercase leading-none tracking-[1.6px] text-white">
            Designs
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-7 left-0 right-0 z-40 px-7 transition-opacity duration-500 md:hidden ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center gap-5">
          <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/20">
            <span
              key={active}
              className="hero-progress absolute inset-y-0 left-0 bg-white"
            />
          </div>
          <p className="shrink-0 text-[12px] uppercase leading-none tracking-[1.2px] text-white">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(homeSlides.length).padStart(2, "0")}
          </p>
        </div>
        <ArrowButton href={activeSlide.href}>{activeSlide.cta}</ArrowButton>
      </div>
    </section>
  );
}

function FlyThroughSection({
  mode = "standalone",
}: {
  mode?: "standalone" | "handoff";
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isHandoff = mode === "handoff";

  useEffect(() => {
    if (isHandoff) return;

    const section = sectionRef.current;
    if (!section) return;
    const video = section.querySelector<HTMLVideoElement>(".fly-video-element");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      video?.play().catch(() => {});
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".fly-video", {
        borderRadius: 24,
        opacity: 0.78,
        scale: 0.72,
        transformOrigin: "center center",
      });
      gsap.set(".fly-title", {
        opacity: 0,
        scale: 0.62,
        y: 74,
        transformOrigin: "center center",
      });
      gsap.set(".fly-title-script", {
        opacity: 0,
        scale: 0.82,
        y: 34,
      });
      gsap.set(".fly-card", { opacity: 0, y: 86 });

      const playVideo = () => {
        video?.play().catch(() => {});
      };
      const pauseVideo = (reset = false) => {
        if (!video) return;
        video.pause();
        if (reset) video.currentTime = 0;
      };

      const stickyTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
          onEnter: playVideo,
          onEnterBack: playVideo,
          onLeave: () => pauseVideo(),
          onLeaveBack: () => pauseVideo(true),
        },
      });

      stickyTimeline
        .to(".fly-video", {
          borderRadius: 0,
          opacity: 1,
          scale: 1.34,
          duration: 0.72,
        })
        .to(
          ".fly-title",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.58,
          },
          0.08,
        )
        .to(
          ".fly-title-script",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.42,
          },
          0.24,
        )
        .to(
          ".fly-card",
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          0.74,
        )
        .to(
          ".fly-video",
          {
            scale: 1.42,
            duration: 0.26,
          },
          0.74,
        );

      gsap.to(".cloud-a", {
        x: "-12vw",
        y: "-8vh",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      gsap.to(".cloud-b", {
        x: "10vw",
        y: "8vh",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isHandoff]);

  return (
    <section
      ref={sectionRef}
      id="fly-through"
      className={
        isHandoff
          ? "fly-panel pointer-events-none absolute inset-0 z-40 overflow-hidden bg-white text-amali-dark opacity-0"
          : "relative h-[245svh] overflow-visible bg-white text-amali-dark"
      }
    >
      <div
        className={`fly-panel-frame relative overflow-hidden ${
          isHandoff
            ? "h-full min-h-[620px]"
            : "sticky top-0 h-svh min-h-[620px]"
        }`}
      >
        <div
          className={
            isHandoff
              ? "fly-cloud-backdrop absolute inset-0 z-0"
              : "absolute left-1/2 top-1/2 aspect-square w-[170vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(218,208,193,0.55)_0%,rgba(255,255,255,0)_64%)]"
          }
        />
        <img
          src={`${ASSET_BASE}/uploads/2025/04/4dfe4c0468a937bf2545685b9b6f3f49-1.png`}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className={
            isHandoff
              ? "cloud-a absolute -left-[18vw] -top-[6vh] z-10 w-[102vw] opacity-[0.18] md:w-[74vw]"
              : "cloud-a absolute -left-[15vw] top-[10vh] w-[72vw] opacity-10 md:w-[50vw]"
          }
        />
        <img
          src={`${ASSET_BASE}/uploads/2025/04/4dfe4c0468a937bf2545685b9b6f3f49-1.png`}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className={
            isHandoff
              ? "cloud-b absolute -right-[24vw] bottom-[-10vh] z-10 w-[110vw] -scale-x-100 opacity-[0.2] md:w-[82vw]"
              : "cloud-b absolute -right-[28vw] bottom-[8vh] w-[90vw] -scale-x-100 opacity-10 md:w-[58vw]"
          }
        />
        <div
          className={`fly-title absolute left-1/2 z-40 w-[86%] max-w-[980px] -translate-x-1/2 -translate-y-1/2 text-center ${
            isHandoff
              ? "top-[47%] text-amali-dark/55"
              : "top-[42%] text-amali-dark"
          }`}
        >
          <p className="fly-title-main text-[30px] font-light uppercase leading-[0.86] tracking-[0.84px] md:text-[62px] md:leading-[0.94] md:tracking-[1.86px] lg:text-[76px] lg:tracking-[2.2px]">
            custom homes shaped around
            <span
              className={`fly-title-script font-script relative block text-[48px] normal-case leading-none tracking-normal md:text-[102px] lg:text-[128px] ${
                isHandoff ? "text-[#b19056]" : "-z-10 text-[#b19056]"
              }`}
            >
              You
            </span>
          </p>
        </div>
        <div
          className={
            isHandoff
              ? "fly-video absolute inset-0 z-30 h-full w-full overflow-hidden bg-amali-dark"
              : "fly-video absolute left-1/2 top-1/2 z-30 aspect-[1185/670] h-[54vh] w-[88vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-amali-dark md:h-[68vh] md:w-[86vw]"
          }
        >
          <img
            src={`${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            className={`fly-video-poster fill-media z-10 opacity-100 ${isHandoff ? "scale-[1.04]" : ""}`}
          />
          <video
            className="fly-video-element fill-media z-20 opacity-100"
            muted
            playsInline
            autoPlay={false}
            loop
            preload="auto"
            poster={`${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`}
          >
            <source
              src={FLY_THROUGH_VIDEO}
              type="video/mp4"
            />
          </video>
          <div
            className={
              isHandoff
                ? "absolute inset-0 z-30 bg-gradient-to-b from-black/20 via-black/5 to-black/45"
                : "absolute inset-0 z-30 bg-black/5"
            }
          />
        </div>
        <div
          className={`fly-card absolute bottom-6 left-5 right-5 z-50 max-w-[530px] rounded-[10px] bg-amali-dark/78 px-7 py-7 text-white md:bottom-10 md:left-10 md:right-auto md:px-12 md:py-11 ${
            isHandoff
              ? "shadow-[0_18px_46px_rgba(0,0,0,0.22)]"
              : "shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-[15px]"
          }`}
        >
          <h2 className="mb-3 text-[28px] font-light uppercase leading-[0.94] tracking-[1.02px] md:text-[34px]">
            Quality. Style.
            <br />
            Excellence.
          </h2>
          <p className="font-body text-[18px] font-normal leading-[25px] md:text-[21px] md:leading-[27px]">
            King Style Homes designs and constructs custom homes that balance
            style, functionality and exceptional craftsmanship, turning your
            vision into a refined, build-ready reality.
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroFlySequence() {
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const sequence = sequenceRef.current;
    const pin = pinRef.current;
    if (!sequence || !pin) return;

    const video = sequence.querySelector<HTMLVideoElement>(".fly-video-element");
    let handoffTimeline: gsap.core.Timeline | null = null;
    let handoffTrigger: ScrollTrigger | null = null;
    let videoActive = false;

    const setVideoActive = (active: boolean, reset = false) => {
      if (!video) return;
      if (videoActive === active) {
        if (!active && reset) video.currentTime = 0;
        return;
      }

      videoActive = active;
      if (active) {
        video.play().catch(() => {});
        return;
      }

      video.pause();
      if (reset) video.currentTime = 0;
    };

    const ctx = gsap.context(() => {
      gsap.set(".hero-sequence-hero", {
        autoAlpha: 1,
        scale: 1,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-panel", {
        autoAlpha: 0,
        scale: 0.16,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-panel-frame", {
        scale: 1.12,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-video", {
        autoAlpha: 0,
        scale: 0.16,
        y: 0,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-video-poster", {
        autoAlpha: 0,
        scale: 1,
      });
      gsap.set(".fly-video-element", {
        autoAlpha: 1,
        scale: 1,
      });
      gsap.set(".fly-title", {
        autoAlpha: 0,
        scale: 0.68,
        y: 58,
        force3D: true,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-card", {
        autoAlpha: 0,
        scale: 0.98,
        y: 54,
        force3D: true,
      });

      handoffTimeline = gsap
        .timeline({
          defaults: { ease: "none" },
          paused: true,
        })
        .to(
          ".fly-panel",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
          },
          0.04,
        )
        .to(
          ".fly-panel-frame",
          {
            scale: 1,
            duration: 0.56,
          },
          0.04,
        )
        .to(
          ".hero-sequence-hero",
          {
            opacity: 0.18,
            scale: 1.06,
            duration: 0.58,
          },
          0,
        )
        .to(
          ".fly-video",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.26,
          },
          0.78,
        )
        .to(
          ".fly-title",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.24,
          },
          0.14,
        )
        .to(
          ".fly-title",
          {
            scale: 1.34,
            y: "-6vh",
            duration: 0.34,
          },
          0.34,
        )
        .to(
          ".fly-title",
          {
            autoAlpha: 0,
            y: "-12vh",
            duration: 0.16,
          },
          0.66,
        )
        .to(
          ".fly-card",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
          },
          0.9,
        );
    }, sequence);

    const getProgress = () => {
      const start = sequence.offsetTop;
      const distance = Math.max(1, sequence.offsetHeight - window.innerHeight);
      return gsap.utils.clamp(0, 1, (window.scrollY - start) / distance);
    };

    const updateProgress = () => {
      const progress = getProgress();
      handoffTimeline?.progress(progress);
      setVideoActive(progress >= 0.7, progress < 0.08);
    };

    const refresh = () => {
      ScrollTrigger.refresh();
      updateProgress();
    };

    handoffTrigger = ScrollTrigger.create({
      trigger: sequence,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onRefresh: updateProgress,
      onUpdate: (self) => {
        handoffTimeline?.progress(self.progress);
        setVideoActive(self.progress >= 0.7, self.progress < 0.08);
      },
    });
    updateProgress();
    const refreshTimeout = window.setTimeout(refresh, 350);
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      handoffTrigger?.kill();
      setVideoActive(false, true);
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        <HomeHero />
        <FlyThroughSection />
      </>
    );
  }

  return (
    <div
      ref={sequenceRef}
      className="hero-fly-sequence relative h-[250svh] bg-amali-dark"
    >
      <div
        ref={pinRef}
        className="hero-fly-pin sticky top-0 h-svh min-h-[620px] overflow-hidden"
      >
        <div className="hero-sequence-hero absolute inset-0 z-10 will-change-transform">
          <HomeHero />
        </div>
        <FlyThroughSection mode="handoff" />
      </div>
    </div>
  );
}

function VillaGallerySection() {
  return (
    <section
      aria-label="Home exterior gallery"
      className="relative overflow-hidden bg-amali-sand pb-12 pt-16 text-amali-dark md:pb-20 md:pt-24"
    >
      <div className="amali-container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <figure className="reveal-up md:col-span-7">
            <div className="relative aspect-[1600/855] overflow-hidden bg-amali-dark/10">
              <Image
                src={villaGalleryImages[0].src}
                alt={villaGalleryImages[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
            </div>
          </figure>
          <figure className="reveal-up md:col-span-5 md:pt-24">
            <div className="relative aspect-[1600/820] overflow-hidden bg-amali-dark/10">
              <Image
                src={villaGalleryImages[1].src}
                alt={villaGalleryImages[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-amali-sand pb-24 pt-16 text-amali-dark md:pb-44 md:pt-28"
    >
      <video
        className="fill-media opacity-[0.05]"
        muted
        playsInline
        autoPlay
        loop
      >
        <source
          src={`${ASSET_BASE}/uploads/2025/05/leaf-sway-test.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="amali-container relative z-10">
        <div className="mb-12 grid grid-cols-12 gap-x-3 gap-y-8 md:mb-16 md:gap-x-6">
          <div className="reveal-up col-span-8 md:col-span-4">
            <div className="image-frame h-[180px] sm:h-[390px]">
              <img
                src={visionImages[0].src}
                alt=""
                aria-hidden
                className="fill-media"
              />
            </div>
          </div>
          <div className="reveal-up col-span-12 md:col-span-7 md:pt-24">
            <h2 className="mb-4 max-w-[760px] text-[32px] font-light uppercase leading-none tracking-[1.32px] md:text-[44px] md:leading-[0.88]">
              Building homes, creating legacies
            </h2>
            <p className="font-body max-w-[720px] text-[20px] leading-[27px] md:text-[21px]">
              King Style Homes creates spaces that go beyond walls and ceilings
              to become the backdrop of cherished memories. With personalized
              designs and meticulous craftsmanship, every home is shaped around
              the families who live in it.
            </p>
          </div>
          <div className="reveal-up col-span-4 col-start-9 -mt-16 md:col-span-1 md:col-start-12 md:-mt-24">
            <div className="image-frame aspect-[265/360]">
              <img
                src={visionImages[1].src}
                alt=""
                aria-hidden
                className="fill-media"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 gap-y-8 md:gap-x-6">
          <div className="reveal-up col-span-3 md:col-span-2">
            <div className="image-frame aspect-[190/260]">
              <img
                src={visionImages[2].src}
                alt=""
                aria-hidden
                className="fill-media"
              />
            </div>
          </div>
          <div className="reveal-up col-span-9 col-start-4 md:col-span-5 md:col-start-8">
            <div className="image-frame aspect-[500/380]">
              <img
                src={visionImages[3].src}
                alt=""
                aria-hidden
                className="fill-media"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section
      id="locations"
      className="relative aspect-[9/16] overflow-hidden bg-amali-sand text-white lg:aspect-[16/10]"
    >
      <picture className="absolute inset-0 block">
        <source
          media="(min-width: 1024px)"
          srcSet={`${ASSET_BASE}/uploads/2025/11/expanded-map-amlali-gradient-20v-3-e1764154025627.jpg`}
        />
        <img
          src={`${ASSET_BASE}/uploads/2025/12/test-5.jpg`}
          alt=""
          aria-hidden
          className="fill-media"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-amali-sand" />
      <div className="amali-container relative z-10 pt-12 md:pt-24">
        <div className="mx-auto max-w-[930px] text-left md:text-center">
          <h2 className="reveal-up mb-4 text-[30px] font-light uppercase leading-[1.04] tracking-[1.3px] md:text-[44px] lg:text-[62px] lg:leading-[0.84]">
            Built with local Sydney insight
          </h2>
          <p className="reveal-up font-body max-w-[760px] text-[18px] leading-[24px] md:mx-auto md:text-[21px] md:leading-[27px]">
            Based in Sydney, King Style Homes understands local requirements,
            communities and lifestyles, guiding every project from design
            decisions through to a smooth handover.
          </p>
        </div>
      </div>
      {mapHotspots.map((point) => (
        <div
          key={point.label}
          className="map-point absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ left: point.left, top: point.top }}
        >
          <span className="mx-auto block size-[10px] rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.18)]" />
          <span
            className={`absolute left-1/2 w-max -translate-x-1/2 text-center text-[18px] uppercase leading-none tracking-[1.8px] ${
              point.align === "top"
                ? "bottom-[calc(100%+15px)]"
                : "top-[calc(100%+15px)]"
            }`}
          >
            {point.label}
          </span>
        </div>
      ))}
    </section>
  );
}

function TeasersSection() {
  return (
    <section
      id="properties"
      className="relative -mt-16 overflow-hidden rounded-b-[25px] bg-amali-sand pb-10 text-amali-dark md:-mt-24"
    >
      <div className="flex justify-center overflow-hidden pt-8 text-center md:pt-16">
        <p className="pointer-events-none text-[30vw] font-light uppercase leading-none opacity-10 md:text-[24vw]">
          King Style Homes
        </p>
      </div>
      <div className="amali-container -mt-4 mb-10 md:-mt-8 md:mb-16">
        <div className="grid grid-cols-12 items-center gap-5">
          <div className="reveal-up col-span-12 md:col-span-7">
            <h2 className="text-[30px] font-light uppercase leading-[0.9] tracking-[0.9px] md:text-[44px] lg:text-[72px] lg:leading-[0.89]">
              Home building
              <br />
              <span className="font-normal">With purpose</span>
            </h2>
          </div>
          <div className="reveal-up col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <p className="mb-5 text-[18px] font-light uppercase leading-[18px] tracking-[0.2px] lg:text-[20px] lg:leading-[20px]">
              Explore tailored services for every stage of your build
            </p>
            <ArrowButton
              tone="sand"
              href="https://amaliproperties.com/about-amali/"
            >
              Build with us
            </ArrowButton>
          </div>
        </div>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3 md:gap-0 md:rounded-b-[30px]">
          {teaserCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="focus-ring group relative overflow-hidden rounded-[15px] md:rounded-none"
            >
              <div className="relative aspect-[290/200] w-full overflow-hidden md:aspect-[455/600]">
                <img
                  src={card.image}
                  alt=""
                  aria-hidden
                  className="fill-media transition-transform duration-700 group-hover:scale-[1.12]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/55" />
              <div className="absolute bottom-0 left-0 right-0 pb-7 text-center text-white md:pb-10">
                <p className="mb-2 text-[14px] font-light uppercase leading-none tracking-[0.42px] opacity-45 md:text-[16px]">
                  {card.eyebrow}
                </p>
                <p className="text-[26px] font-light uppercase leading-none tracking-[0.8px] md:text-[42px] md:tracking-[1.28px]">
                  {card.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ onRegister }: { onRegister: () => void }) {
  return (
    <footer className="relative bg-amali-dark pb-16 pt-20 text-white md:pb-12">
      <div className="amali-container mb-12 md:mb-24">
        <div className="mb-16 flex justify-center">
          <Logo />
        </div>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative h-full lg:pl-12 after:absolute after:bottom-0 after:left-12 after:hidden after:h-px after:w-3/4 after:bg-white/10 lg:after:block">
              <p className="mb-6 text-[32px] font-light uppercase leading-none tracking-[2.1px] lg:text-[54px] lg:tracking-[2.7px]">
                Build
                <br />
                with us
              </p>
              <ArrowButton tone="slate" onClick={onRegister}>
                Get in touch
              </ArrowButton>
            </div>
          </div>
          <div className="lg:col-span-4">
            <h2 className="mb-2 text-[42px] font-light uppercase leading-none tracking-[2.1px] lg:text-[54px] lg:tracking-[2.7px]">
              Where
              <br />
              next?
            </h2>
            <div>
              {[
                ["About Us", "https://amaliproperties.com/about-amali/"],
                ["Get In Touch", "https://amaliproperties.com/contact/"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="focus-ring group flex items-center justify-between gap-5 border-b border-white py-5 text-[24px] uppercase leading-none tracking-[1.2px] lg:text-[26px] lg:tracking-[1.3px]"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-3">
                    {label}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-x-3">
                    <ChevronRight className="size-4" strokeWidth={1.5} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 px-7 pt-8 lg:px-14 lg:pt-0">
        <div className="flex flex-col items-center justify-between gap-5 text-center text-[13px] leading-none tracking-[0.64px] lg:flex-row lg:text-left">
          <p>King Style Homes 2026. All rights reserved.</p>
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-5">
            <a href="https://amaliproperties.com/terms-conditions/">
              Terms &amp; Conditions
            </a>
            <a href="https://amaliproperties.com/privacy-policy/">
              Privacy Policy
            </a>
            <a href="https://amaliproperties.com/cookies-policy/">
              Cookies Policy
            </a>
            <a href="https://amaliproperties.com/credits/">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setError("");
    setEmail("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setError("");
  }

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-5 py-8 backdrop-blur-[10px] transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="register-title"
    >
      <div className="relative max-h-[90dvh] w-full max-w-[720px] overflow-auto rounded-[34px] bg-white px-7 py-9 text-amali-dark shadow-2xl sm:px-12 sm:py-12">
        <button
          type="button"
          aria-label="Close enquiry form"
          onClick={handleClose}
          className="focus-ring absolute right-5 top-5 flex size-10 items-center justify-center rounded-full text-amali-gray transition-colors hover:bg-amali-dark hover:text-white"
        >
          <X aria-hidden className="size-5" />
        </button>
        <div className="max-w-[520px]">
          <p className="font-body mb-4 text-[13px] uppercase tracking-[1.6px] text-amali-slate">
            King Style Homes
          </p>
          <h2
            id="register-title"
            className="text-[32px] font-light uppercase leading-none tracking-[1.7px] sm:text-[42px]"
          >
            Get In Touch
          </h2>
          <p className="font-body mt-5 text-[18px] font-light leading-[26px] text-amali-gray">
            Tell us about the home you want to build.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-[28px] bg-amali-sand/55 p-7">
            <p className="text-[22px] font-light uppercase tracking-[1.4px]">
              Thank you
            </p>
            <p className="font-body mt-3 text-[17px] leading-7 text-amali-ink">
              Your enquiry has been received. This clone keeps the form
              frontend-only for now.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10">
            <label
              htmlFor="email"
              className="font-body block text-[16px] font-light text-amali-ink"
            >
              Your email address
              <span className="ml-1 text-amali-slate">(Required)</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="font-body mt-3 h-14 w-full rounded-full border border-amali-sand bg-white px-6 text-[18px] text-amali-dark outline-none transition-colors focus:border-amali-slate"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "email-error" : undefined}
            />
            {error ? (
              <p id="email-error" className="font-body mt-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="focus-ring mt-8 inline-flex items-center gap-5 overflow-hidden rounded-full bg-amali-dark py-3 pl-8 pr-3 text-white transition-transform hover:scale-[1.02]"
            >
              <span className="text-[13px] uppercase tracking-[1.4px]">
                Send enquiry
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-amali-slate">
                <ChevronRight aria-hidden className="size-4" />
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AmaliLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  useHomeReveals();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#content"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-amali-dark"
      >
        Skip to content
      </a>
      <Header onRegister={() => setModalOpen(true)} />
      <main id="content" className="bg-amali-dark">
        <HeroFlySequence />
        <VillaGallerySection />
        <VisionSection />
        <MapSection />
        <TeasersSection />
      </main>
      <SiteFooter onRegister={() => setModalOpen(true)} />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
