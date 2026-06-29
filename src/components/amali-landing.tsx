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
import Link from "next/link";
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
import {
  processSteps,
  servicePath,
  services,
  testimonials,
  whyBuildItems,
} from "@/data/site-content";
import { submitLead } from "@/lib/lead-submit";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "/kingstyle-home-hero.jpeg";
const FLY_THROUGH_VIDEO = "/amali-fly-through.mp4";
const KINGSTYLE_LOGO = "/kingstyle-logo-transparent.png";
const KINGSTYLE_WORDMARK = "/kingstyle-logo-wordmark-transparent.png";
const villaGalleryImages = [
  {
    src: "/house2_beige.jpg",
    alt: "Curved modern King Style home exterior illuminated at dusk",
  },
  {
    src: "/house1_beige.jpg",
    alt: "Modern King Style home facade with arched windows at dusk",
  },
];

const homeSlides = [
  {
    label: "Homes",
    cta: "Explore Home Designs",
    href: "/home-designs",
    image: HERO_IMAGE,
  },
];

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

const mainMenuLinks = [
  { label: "Home Designs", href: "/home-designs" },
  { label: "Display Centres", href: "/display-centers" },
  { label: "Standard Inclusions", href: "/standard-inclusions" },
  { label: "Signature Inclusions", href: "/signature-inclusions" },
  { label: "Contact Us", href: "/contact-us" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://kingstylehomes.com.au/",
      url: "https://kingstylehomes.com.au/",
      name: "Home - King Style Homes",
      description:
        "King Style Homes designs and constructs custom homes that blend style, functionality, and exceptional craftsmanship.",
      inLanguage: "en-AU",
      isPartOf: { "@id": "https://kingstylehomes.com.au/#website" },
      thumbnailUrl: "https://kingstylehomes.com.au/kingstyle-home-hero.jpeg",
    },
    {
      "@type": "Organization",
      "@id": "https://kingstylehomes.com.au/#organization",
      name: "King Style Homes",
      url: "https://kingstylehomes.com.au/",
      logo: KINGSTYLE_LOGO,
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

function Logo({
  dark = false,
  full = false,
  floating = false,
}: {
  dark?: boolean;
  full?: boolean;
  floating?: boolean;
}) {
  const logoSrc = full ? KINGSTYLE_LOGO : KINGSTYLE_WORDMARK;

  if (full && floating) {
    return (
      <Link
        href="/"
        className="focus-ring pointer-events-auto block transition-[opacity,transform] duration-300 hover:scale-[1.015] hover:opacity-90"
        title="King Style Homes"
      >
        <span className="relative block h-[38px] w-[150px] sm:h-[46px] sm:w-[182px]">
          <Image
            src={KINGSTYLE_WORDMARK}
            alt="King Style Homes"
            fill
            sizes="182px"
            quality={100}
            className="object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.48)]"
            preload
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`focus-ring pointer-events-auto relative block transition-[opacity,transform] duration-300 hover:scale-[1.015] hover:opacity-90 ${
        full
          ? "h-[126px] w-[180px] sm:h-[150px] sm:w-[214px]"
          : "h-[38px] w-[138px] sm:h-[48px] sm:w-[174px]"
      }`}
      title="King Style Homes"
    >
      <Image
        src={logoSrc}
        alt="King Style Homes"
        fill
        sizes={full ? "214px" : "174px"}
        quality={100}
        className={`object-contain ${
          dark
            ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
            : "drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
        }`}
        preload={floating}
      />
    </Link>
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
    let rafId = 0;
    let lastValue = false;
    let locationsTop = 0;
    let locationsBottom = 0;
    let viewportTrigger = window.innerHeight * 0.94;

    const measure = () => {
      const locations = document.getElementById("locations");
      if (locations) {
        locationsTop = locations.offsetTop;
        locationsBottom = locationsTop + locations.offsetHeight;
      } else {
        locationsTop = 0;
        locationsBottom = 0;
      }
      viewportTrigger = window.innerHeight * 0.94;
    };

    const compute = () => {
      rafId = 0;
      const y = window.scrollY;
      const onMap =
        locationsBottom > 0 && y >= locationsTop - 80 && y <= locationsBottom - 80;
      const next = !onMap && y > viewportTrigger;
      if (next !== lastValue) {
        lastValue = next;
        setOnLightSection(next);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(compute);
    };

    measure();
    compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
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
              Free Quote
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="focus-ring flex size-9 items-center justify-center rounded-full bg-amali-sand text-amali-dark lg:hidden"
              aria-label="Get a free quote"
            >
              <ChevronRight aria-hidden className="size-4 rotate-[-35deg]" />
            </button>
          </div>
        </div>
        <div className="pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2 lg:top-8">
          <Logo dark={useDarkHeader} full floating />
        </div>
        <div className="pointer-events-auto ml-auto hidden lg:block">
          <AudioToggle dark={useDarkHeader} />
        </div>
      </header>

      <nav
        className={`fixed left-5 right-5 top-20 z-50 max-h-[calc(100dvh-100px)] overflow-auto rounded-[28px] border border-white/12 bg-amali-dark/72 p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-[26px] transition-all duration-500 sm:p-7 lg:left-10 lg:right-auto lg:top-24 lg:w-[760px] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-body mb-4 text-[11px] uppercase tracking-[1.8px] text-amali-sand">
              Menu
            </p>
            <ul className="grid gap-2">
              {mainMenuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-[17px] font-light uppercase leading-none tracking-[1px] transition-colors hover:bg-white hover:text-amali-dark sm:text-[20px]"
                  >
                    {link.label}
                    <ChevronRight className="size-4" strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-body text-[11px] uppercase tracking-[1.8px] text-amali-sand">
                Services
              </p>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="focus-ring font-body text-[11px] uppercase tracking-[1.2px] text-white/70 hover:text-white"
              >
                View all
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={servicePath(service)}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-2xl border border-white/10 px-4 py-3 text-[12px] uppercase leading-tight tracking-[1px] text-white/84 transition-colors hover:bg-white hover:text-amali-dark"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/12 pt-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`King Style Homes on ${label}`}
              className="focus-ring font-body flex items-center gap-3 rounded-full border border-white/20 px-4 py-3 text-[12px] uppercase tracking-[1px] text-white/84 transition-colors hover:bg-white hover:text-amali-dark"
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </div>
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

function FullPageWaterEffect() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const transitions = gsap.utils.toArray<HTMLElement>(
      "[data-water-transition]",
    );
    const overlay = overlayRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    if (
      !transitions.length ||
      !overlay ||
      reduceMotion ||
      !desktop
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { opacity: 0, scale: 1.08, rotate: -0.4 });

      transitions.forEach((section) => {
        const timeline = gsap.timeline({
          defaults: { ease: "sine.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top 94%",
            end: "top 18%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            overlay,
            {
              opacity: 0.42,
              scale: 1.02,
              rotate: 0.35,
              duration: 0.46,
            },
            0,
          )
          .to(
            overlay,
            {
              opacity: 0,
              scale: 1,
              rotate: -0.2,
              duration: 0.54,
            },
            0.46,
          );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={overlayRef} className="page-water-overlay" aria-hidden />
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
    let idleWaveElapsed = 0;
    let waterActive = true;
    let scrollFrame = 0;
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

    const clearRipples = () => {
      ripples.forEach((ripple) => {
        ripple.active = false;
        ripple.map?.position.set(-9999, -9999);
        ripple.map?.scale.set(0.001);
        ripple.highlight?.position.set(-9999, -9999);
        ripple.highlight?.scale.set(0.001);
        ripple.highlight.alpha = 0;
        ripple.filter.scale.x = 0;
        ripple.filter.scale.y = 0;
      });

      if (imageLayer) {
        imageLayer.filters = [];
      }
      activeFilterCount = 0;
      host.classList.remove("is-rippling");
    };

    const setWaterActive = (active: boolean) => {
      if (waterActive === active) return;
      waterActive = active;

      if (!active) {
        clearRipples();
        app?.ticker.stop();
        return;
      }

      app?.ticker.start();
    };

    let sequenceEl: HTMLElement | null = null;
    let sequenceTop = 0;
    let sequenceDistance = 1;

    const measureSequence = () => {
      sequenceEl = host.closest<HTMLElement>(".hero-fly-sequence");
      if (sequenceEl) {
        sequenceTop = sequenceEl.offsetTop;
        sequenceDistance = Math.max(1, sequenceEl.offsetHeight - window.innerHeight);
      }
    };

    const updateWaterActivity = () => {
      scrollFrame = 0;
      if (!sequenceEl) {
        setWaterActive(true);
        return;
      }

      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - sequenceTop) / sequenceDistance),
      );

      setWaterActive(progress < 0.18);
    };

    const requestWaterActivityUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateWaterActivity);
    };

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
      if (!ripples.length || !waterActive) return;

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
      ripple.duration = 2200 + speed * 620;
      ripple.originX = x;
      ripple.originY = y;
      ripple.driftX = directionX * (58 + speed * 112);
      ripple.driftY = directionY * (34 + speed * 70);
      ripple.maxScaleX = (size / 512) * (2.34 + speed * 0.94);
      ripple.maxScaleY = (size / 512) * (0.92 + speed * 0.32);
      ripple.strength = 48 + speed * 58;
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
      if (!waterActive) return;
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

      ripples = Array.from({ length: 7 }, () => {
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
        if (!waterActive) {
          return;
        }

        let changedActiveState = false;

        const deltaMS = Math.min(ticker.deltaMS, 32);
        idleWaveElapsed += deltaMS;

        if (idleWaveElapsed > 620 && host.clientWidth > 0 && host.clientHeight > 0) {
          idleWaveElapsed = 0;
          const x = host.clientWidth * (0.16 + Math.random() * 0.68);
          const y = host.clientHeight * (0.18 + Math.random() * 0.5);
          const angle = -0.08 + Math.random() * 0.16;
          spawnRipple(x, y, 0.22 + Math.random() * 0.2, angle);
        }

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
          ripple.highlight.alpha = Math.min(0.2, envelope * 0.3);

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
        }
      });
      pixiApp.render();
      pixiApp.ticker.start();

      resizeObserver = new ResizeObserver(() => {
        fitHeroSprite();
        measureSequence();
      });
      resizeObserver.observe(host);
      measureSequence();
      updateWaterActivity();
      window.addEventListener("scroll", requestWaterActivityUpdate, {
        passive: true,
      });
      window.addEventListener("resize", measureSequence);
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
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestWaterActivityUpdate);
      window.removeEventListener("resize", measureSequence);
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

function HomeHero({ onRegister }: { onRegister: () => void }) {
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
      <svg aria-hidden className="pointer-events-none absolute size-0">
        <filter id="hero-liquid-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.045"
            numOctaves="2"
            seed="7"
            result="liquidNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="liquidNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
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
      <div className="hero-floating-water absolute inset-0 z-[22]" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
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
        <div className="reveal-up mt-8 hidden items-center justify-center gap-4 md:flex">
          <ArrowButton onClick={onRegister}>Get Free Quote</ArrowButton>
          <Link
            href="/home-designs"
            className="focus-ring rounded-full border border-white/35 px-7 py-4 text-[13px] uppercase leading-none tracking-[1.5px] text-white backdrop-blur-[18px] transition-colors hover:bg-white hover:text-amali-dark"
          >
            Explore Home Designs
          </Link>
        </div>
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
        <div className="flex flex-col items-start gap-3">
          <ArrowButton onClick={onRegister}>Get Free Quote</ArrowButton>
          <a
            href={activeSlide.href}
            className="focus-ring text-[12px] uppercase leading-none tracking-[1.4px] text-white/82 underline-offset-4 hover:text-white hover:underline"
          >
            {activeSlide.cta}
          </a>
        </div>
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
            src={HERO_IMAGE}
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
            preload="metadata"
            poster={HERO_IMAGE}
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

function HeroFlySequence({ onRegister }: { onRegister: () => void }) {
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
        <HomeHero onRegister={onRegister} />
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
          <HomeHero onRegister={onRegister} />
        </div>
        <FlyThroughSection mode="handoff" />
      </div>
    </div>
  );
}

function VisionSection() {
  return (
    <section
      id="vision"
      data-water-transition
      className="relative overflow-hidden bg-amali-sand px-5 py-20 text-amali-dark md:px-12 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.68),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(177,144,86,0.14),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-[1560px]">
        <div className="mb-12 max-w-[860px]">
          <p className="reveal-up mb-5 font-body text-[12px] uppercase tracking-[2px] text-amali-slate">
            King Style story
          </p>
          <h2 className="reveal-up text-[34px] font-light uppercase leading-[0.92] tracking-[1px] md:text-[58px] lg:text-[70px]">
            Building homes, creating legacies
          </h2>
        </div>
        <div className="grid gap-5">
          <div className="grid overflow-hidden rounded-[32px] border border-amali-dark/10 bg-white/58 shadow-[0_24px_90px_rgba(26,32,38,0.08)] backdrop-blur lg:grid-cols-[1fr_0.82fr]">
            <figure className="reveal-up relative min-h-[320px] overflow-hidden md:min-h-[500px]">
              <Image
                src={villaGalleryImages[0].src}
                alt={villaGalleryImages[0].alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="reveal-up flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="font-body mb-5 text-[12px] uppercase tracking-[1.8px] text-amali-slate">
                Personal design
              </p>
              <h3 className="text-[30px] font-light uppercase leading-none tracking-[0.8px] md:text-[46px]">
                Designed around the way families live.
              </h3>
              <p className="font-body mt-6 text-[17px] leading-7 text-amali-gray md:text-[19px] md:leading-8">
                King Style Homes creates spaces that go beyond walls and
                ceilings to become the backdrop of cherished memories. Every
                brief is shaped around lifestyle, site conditions and the
                details that make a home feel personal.
              </p>
            </div>
          </div>
          <div className="grid overflow-hidden rounded-[32px] border border-amali-dark/10 bg-white/58 shadow-[0_24px_90px_rgba(26,32,38,0.08)] backdrop-blur lg:grid-cols-[0.82fr_1fr]">
            <div className="reveal-up flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="font-body mb-5 text-[12px] uppercase tracking-[1.8px] text-amali-slate">
                Crafted finish
              </p>
              <h3 className="text-[30px] font-light uppercase leading-none tracking-[0.8px] md:text-[46px]">
                Architecture with warmth, scale and detail.
              </h3>
              <p className="font-body mt-6 text-[17px] leading-7 text-amali-gray md:text-[19px] md:leading-8">
                From facade proportion to interior selections, the build is
                guided by meticulous craftsmanship and a clear process, giving
                clients confidence from early design through construction and
                handover.
              </p>
            </div>
            <figure className="reveal-up relative min-h-[320px] overflow-hidden md:min-h-[500px] lg:order-last">
              <Image
                src={villaGalleryImages[1].src}
                alt={villaGalleryImages[1].alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </figure>
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
      data-water-transition
      className="relative overflow-hidden bg-amali-dark px-5 py-20 text-white md:px-12 md:py-28"
    >
      <picture className="absolute inset-0 block">
        <source
          media="(min-width: 1024px)"
          srcSet={HERO_IMAGE}
        />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="fill-media scale-[1.04] object-center opacity-62"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-amali-dark/78 via-amali-dark/64 to-amali-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(177,144,86,0.24),transparent_30%),radial-gradient(circle_at_82%_42%,rgba(255,255,255,0.12),transparent_32%)]" />
      <div className="amali-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="reveal-up mb-5 font-body text-[12px] uppercase tracking-[2px] text-amali-sand">
              Why build with us
            </p>
            <h2 className="reveal-up text-[34px] font-light uppercase leading-[0.95] tracking-[1px] md:text-[52px] lg:text-[68px]">
              Why build with King Style Homes
            </h2>
          </div>
          <p className="reveal-up font-body max-w-[760px] text-[18px] leading-7 text-white/74 md:text-[21px] md:leading-8">
            From tailored designs to transparent communication, our Western
            Sydney and Northwest Sydney team brings quality craftsmanship, local
            knowledge and practical guidance to every stage of your
            home-building journey.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {["Tailored to you", "Quality builds", "Clear process", "Local knowledge"].map((item, index) => (
            <div
              key={item}
              data-luxury-card
              className="reveal-up rounded-[24px] border border-white/10 bg-white/[0.08] p-6 backdrop-blur-[18px]"
            >
              <p className="font-body mb-8 text-[12px] uppercase tracking-[1.6px] text-amali-sand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[20px] font-light uppercase leading-tight tracking-[0.8px]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeasersSection() {
  return (
    <section
      id="services"
      data-water-transition
      className="relative overflow-hidden bg-amali-dark pb-16 pt-20 text-white md:pb-28 md:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amali-sand/45 via-amali-dark/70 to-amali-dark"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(177,144,86,0.2),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_28%)]"
        aria-hidden
      />
      <div className="amali-container relative z-10 mb-10 md:mb-14">
        <div className="grid grid-cols-12 items-center gap-5">
          <div className="reveal-up col-span-12 md:col-span-7">
            <h2 className="text-[30px] font-light uppercase leading-[0.9] tracking-[0.9px] md:text-[44px] lg:text-[72px] lg:leading-[0.89]">
              Services for
              <br />
              <span className="font-normal">Every build</span>
            </h2>
          </div>
          <div className="reveal-up col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <p className="mb-5 text-[18px] font-light uppercase leading-[18px] tracking-[0.2px] text-white/78 lg:text-[20px] lg:leading-[20px]">
              Custom homes, duplex projects, granny flats, house and land,
              renovations and turnkey delivery.
            </p>
            <Link
              href="/services"
              className="focus-ring group inline-flex min-w-fit shrink-0 items-center gap-5 overflow-hidden rounded-[60px] border border-white/15 bg-white/12 py-2 pl-8 pr-2 text-white shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-[18px] transition-transform duration-300 hover:scale-[1.02] hover:bg-white hover:text-amali-dark"
            >
              <span className="relative z-10 whitespace-nowrap text-[12px] font-normal uppercase leading-none tracking-[1.6px] sm:text-[14px]">
                Explore services
              </span>
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-amali-dark">
                <ChevronRight aria-hidden className="size-4" strokeWidth={1.7} />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative z-10 px-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((card) => (
            <Link
              key={card.title}
              href={servicePath(card)}
              data-luxury-card
              className="focus-ring group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#111820] text-white shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
            >
              <div className="relative aspect-[290/210] w-full overflow-hidden md:aspect-[455/430]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover brightness-[0.72] saturate-[0.95] transition-transform duration-700 group-hover:scale-[1.12]"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,22,0.18)_0%,rgba(12,17,22,0.2)_35%,rgba(12,17,22,0.92)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,17,22,0.62)_0%,rgba(12,17,22,0.22)_58%,rgba(12,17,22,0.36)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
                <div className="max-w-[620px] rounded-[18px] border border-white/10 bg-amali-dark/34 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.22)] backdrop-blur-[2px] md:p-5">
                  <p className="mb-3 text-[11px] font-light uppercase leading-none tracking-[1.5px] text-amali-sand">
                    King Style Homes
                  </p>
                  <p className="text-[23px] font-light uppercase leading-[0.98] tracking-[0.7px] [text-wrap:balance] md:text-[28px] lg:text-[31px] lg:tracking-[0.9px]">
                    {card.title}
                  </p>
                  <p className="font-body mt-4 max-w-[540px] text-[15px] leading-6 text-white/88 md:text-[16px]">
                    {card.text}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-3 text-[12px] uppercase tracking-[1.5px] text-white">
                    Explore service
                    <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyKingStyleSection() {
  return (
    <section
      data-water-transition
      className="relative overflow-hidden bg-amali-dark px-5 py-20 text-white md:px-12 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(177,144,86,0.24),transparent_34%),radial-gradient(circle_at_82%_35%,rgba(255,255,255,0.09),transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-[1560px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="reveal-up text-[34px] font-light uppercase leading-[0.9] tracking-[1px] md:text-[58px] lg:text-[76px]">
            Why King Style
            <br />
            Homes
          </h2>
          <p className="reveal-up font-body max-w-[820px] text-[18px] leading-7 text-white/72 md:text-[21px] md:leading-8">
            A premium build should feel considered from the first conversation
            through to handover. King Style Homes pairs local knowledge with
            clear communication, crafted finishes and practical project
            guidance.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {whyBuildItems.map((item, index) => (
            <div
              key={item}
              data-luxury-card
              className="reveal-up rounded-[26px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-[18px] md:p-7"
            >
              <p className="mb-10 text-[13px] uppercase tracking-[1.8px] text-amali-sand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[24px] font-light uppercase leading-none tracking-[0.7px]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      data-water-transition
      className="relative overflow-hidden bg-amali-sand px-5 py-20 text-amali-dark md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="reveal-up text-[34px] font-light uppercase leading-[0.9] tracking-[1px] md:text-[58px] lg:text-[76px]">
            How it
            <br />
            works
          </h2>
          <p className="reveal-up font-body max-w-[760px] text-[18px] leading-7 text-amali-gray md:text-[21px] md:leading-8">
            A simple, transparent pathway helps buyers understand what happens
            next and reduces hesitation before the first enquiry.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              data-luxury-card
              className="reveal-up rounded-[28px] bg-white p-7 shadow-[0_22px_70px_rgba(26,32,38,0.08)]"
            >
              <p className="mb-12 text-[13px] uppercase tracking-[1.8px] text-amali-slate">
                Step {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[28px] font-light uppercase leading-none tracking-[0.8px]">
                {step.title}
              </h3>
              <p className="font-body mt-5 text-[16px] leading-7 text-amali-gray">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      data-water-transition
      className="relative overflow-hidden bg-white px-5 py-20 text-amali-dark md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="reveal-up text-[34px] font-light uppercase leading-[0.9] tracking-[1px] md:text-[58px] lg:text-[76px]">
            Client
            <br />
            words
          </h2>
          <p className="reveal-up max-w-[520px] text-[18px] font-light uppercase leading-[1.05] tracking-[0.6px] text-amali-gray">
            Real feedback that reinforces quality, communication and
            craftsmanship.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              data-luxury-card
              className="reveal-up rounded-[28px] bg-amali-sand/60 p-7"
            >
              <p className="font-body text-[18px] leading-7 text-amali-ink">
                “{testimonial.quote}”
              </p>
              <cite className="mt-8 block text-[12px] not-italic uppercase tracking-[1.5px] text-amali-slate">
                {testimonial.name}
                {testimonial.projectType ? ` // ${testimonial.projectType}` : ""}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalLeadCta({ onRegister }: { onRegister: () => void }) {
  return (
    <section
      data-water-transition
      className="relative overflow-hidden rounded-b-[25px] bg-amali-sand px-5 py-20 text-amali-dark md:px-12 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,144,86,0.22),transparent_42%)]" />
      <div className="reveal-up relative z-10 mx-auto flex max-w-[1200px] flex-col items-center rounded-[34px] bg-white/70 px-7 py-12 text-center shadow-[0_24px_80px_rgba(26,32,38,0.1)] backdrop-blur-[18px] md:px-14 md:py-16">
        <p className="mb-5 text-[13px] uppercase tracking-[1.8px] text-amali-slate">
          Start your build
        </p>
        <h2 className="max-w-[900px] text-[34px] font-light uppercase leading-[0.92] tracking-[1px] md:text-[58px]">
          Ready to build in Western or Northwest Sydney?
        </h2>
        <p className="font-body mt-6 max-w-[680px] text-[18px] leading-7 text-amali-gray">
          Share your site, timeline and design goals. King Style Homes can help
          shape the next step with clarity.
        </p>
        <div className="mt-8">
          <ArrowButton tone="dark" onClick={onRegister}>
            Get Free Quote
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ onRegister }: { onRegister: () => void }) {
  return (
    <footer
      data-water-transition
      className="relative bg-amali-dark pb-16 pt-20 text-white md:pb-12"
    >
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
                Get Free Quote
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
                ["About Us", "/about-us"],
                ["Blog", "/blog"],
                ["Get In Touch", "/contact-us"],
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
            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`King Style Homes on ${label}`}
                  className="focus-ring inline-flex items-center gap-3 rounded-full border border-white/18 px-4 py-3 text-[12px] uppercase tracking-[1px] transition-colors hover:bg-white hover:text-amali-dark"
                >
                  <Icon className="size-4" />
                  {label}
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
            <span>Terms &amp; Conditions</span>
            <span>Privacy Policy</span>
            <span>Cookies Policy</span>
            <span>Credits</span>
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setSubmitting(false);
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitLead({
        source: "Homepage free quote request",
        email,
        page: window.location.href,
      });
      setSubmitted(true);
    } catch (leadError) {
      setError(
        leadError instanceof Error
          ? leadError.message
          : "Unable to send your quote request right now.",
      );
    } finally {
      setSubmitting(false);
    }
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
            Get a Free Quote
          </h2>
          <p className="font-body mt-5 text-[18px] font-light leading-[26px] text-amali-gray">
            Tell us about the home you want to build and the team will help
            shape the next step.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-[28px] bg-amali-sand/55 p-7">
            <p className="text-[22px] font-light uppercase tracking-[1.4px]">
              Thank you
            </p>
            <p className="font-body mt-3 text-[17px] leading-7 text-amali-ink">
              Your quote request has been received. The King Style Homes team
              will be in touch with the next step.
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
              disabled={submitting}
              className="focus-ring mt-8 inline-flex items-center gap-5 overflow-hidden rounded-full bg-amali-dark py-3 pl-8 pr-3 text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              <span className="text-[13px] uppercase tracking-[1.4px]">
                {submitting ? "Sending..." : "Request quote"}
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
      <Header onRegister={() => setModalOpen(true)} />
      <FullPageWaterEffect />
      <main id="content" className="bg-amali-dark">
        <HeroFlySequence onRegister={() => setModalOpen(true)} />
        <VisionSection />
        <MapSection />
        <TeasersSection />
        <WhyKingStyleSection />
        <ProcessSection />
        <TestimonialsSection />
        <FinalLeadCta onRegister={() => setModalOpen(true)} />
      </main>
      <SiteFooter onRegister={() => setModalOpen(true)} />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
