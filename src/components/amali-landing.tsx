"use client";

import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie, { AnimationItem } from "lottie-web";
import { ChevronRight, Volume2, VolumeX, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ASSET_BASE = "https://amaliproperties.com/wp-content";

const homeSlides = [
  {
    label: "Residences",
    cta: "Discover Residences Living",
    href: "https://amaliproperties.com/residences/exclusive-preview/",
    image: `${ASSET_BASE}/uploads/2025/08/304c2ab2de0fb20c71345585eee16250.jpeg`,
  },
  {
    label: "Island",
    cta: "Discover Island Living",
    href: "https://amaliproperties.com/island/amali-island-welcome/",
    image: `${ASSET_BASE}/uploads/2025/08/e54dffaad952cc376cdfdedf6df45864-1-e1744725264808.jpeg`,
  },
  {
    label: "Villa",
    cta: "Discover Villa Living",
    href: "https://amaliproperties.com/the-villas/",
    image: `${ASSET_BASE}/uploads/2025/08/5ea51525d88392d94d0d5b6f5d62d01c.jpeg`,
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
    eyebrow: "Amali",
    title: "Island",
    href: "https://amaliproperties.com/island/amali-island-welcome/",
    image: `${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`,
  },
  {
    eyebrow: "Amali",
    title: "Residences",
    href: "https://amaliproperties.com/residences/residences-teaser/",
    image: `${ASSET_BASE}/uploads/2026/02/View-8_Penthouse.jpg`,
  },
  {
    eyebrow: "Amali",
    title: "Villas",
    href: "https://amaliproperties.com/the-villas/",
    image: `${ASSET_BASE}/uploads/2025/08/CAM-3A_-1.png`,
  },
];

const mapHotspots = [
  { label: "Amali Island", left: "33%", top: "48%", align: "top" },
  { label: "Amali Residences", left: "57%", top: "46%", align: "bottom" },
  { label: "Boutique", left: "46%", top: "55%", align: "top" },
  { label: "Amali Villas", left: "25%", top: "58%", align: "top" },
];

const menuGroups = [
  {
    label: "Residences",
    href: "https://amaliproperties.com/canal/",
    links: [
      {
        label: "Exclusive preview",
        href: "https://amaliproperties.com/residences/residences-teaser/",
      },
    ],
  },
  {
    label: "Island",
    href: "https://amaliproperties.com/island/",
    links: [
      {
        label: "Welcome to Amali Island",
        href: "https://amaliproperties.com/island/amali-island-welcome/",
      },
      {
        label: "The Villas",
        href: "https://amaliproperties.com/island/island-villas/",
      },
      {
        label: "Clubhouse",
        href: "https://amaliproperties.com/island/clubhouse/",
      },
    ],
  },
  {
    label: "Villas",
    href: "https://amaliproperties.com/the-villas/",
    links: [
      {
        label: "Welcome to Amali Villas",
        href: "https://amaliproperties.com/the-villas/",
      },
      {
        label: "Villa Elaine",
        href: "https://amaliproperties.com/bespoke-villa/villa-elaine/",
      },
    ],
  },
];

const singleLinks = [
  { label: "Home", href: "https://amaliproperties.com/" },
  { label: "About", href: "https://amaliproperties.com/about-amali/" },
  { label: "Locations", href: "https://amaliproperties.com/locations/" },
  { label: "Contact", href: "https://amaliproperties.com/contact/" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://amaliproperties.com/",
      url: "https://amaliproperties.com/",
      name: "Home - Amali Properties",
      description:
        "Amali is pioneering a new era of ultra-luxurious real estate to redefine luxury living, one dream at a time.",
      inLanguage: "en-GB",
      isPartOf: { "@id": "https://amaliproperties.com/#website" },
      thumbnailUrl: `${ASSET_BASE}/uploads/2026/03/View-8_Penthouse-1.jpg`,
    },
    {
      "@type": "Organization",
      "@id": "https://amaliproperties.com/#organization",
      name: "Amali Island",
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
      title="Amali Properties"
    >
      <span ref={lightRef} className="absolute inset-0 block opacity-0" />
      <span className="relative block text-[26px] font-light uppercase leading-none tracking-[9px] sm:text-[34px] sm:tracking-[12px]">
        Amali
      </span>
      <span className="relative mt-2 block text-[7px] font-bold uppercase leading-none tracking-[4px] sm:text-[8px]">
        Properties
      </span>
      <span className="sr-only">Amali Properties</span>
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
  const [expanded, setExpanded] = useState("Residences");
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
          Amali Properties
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

function HomeHero() {
  const [active, setActive] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorLayerRef = useRef<HTMLDivElement | null>(null);
  const cursorTurbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const cursorNoiseOffsetRef = useRef<SVGFEOffsetElement | null>(null);
  const cursorDisplacementRef =
    useRef<SVGFEDisplacementMapElement | null>(null);
  const cursorWaveRef = useRef({
    dx: 0,
    dy: 0,
    frequencyX: 0.009,
    frequencyY: 0.019,
    scale: 22,
  });
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const activeSlide = homeSlides[active];

  const applyCursorWave = useCallback(() => {
    const wave = cursorWaveRef.current;
    cursorNoiseOffsetRef.current?.setAttribute("dx", wave.dx.toFixed(2));
    cursorNoiseOffsetRef.current?.setAttribute("dy", wave.dy.toFixed(2));
    cursorDisplacementRef.current?.setAttribute(
      "scale",
      wave.scale.toFixed(2),
    );
    cursorTurbulenceRef.current?.setAttribute(
      "baseFrequency",
      `${wave.frequencyX.toFixed(4)} ${wave.frequencyY.toFixed(4)}`,
    );
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent) => {
    const section = heroRef.current;
    const cursorLayer =
      cursorLayerRef.current ??
      section?.querySelector<HTMLElement>(".hero-cursor-effect");
    if (!section || event.pointerType === "touch" || reducedMotionRef.current) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const last = lastPointerRef.current ?? { x, y };
    const velocityX = x - last.x;
    const velocityY = y - last.y;
    const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 58);
    const normalX = x / rect.width - 0.5;
    const normalY = y / rect.height - 0.5;
    const angle = Math.atan2(velocityY, velocityX || 0.001) * (180 / Math.PI);

    lastPointerRef.current = { x, y };
    section.classList.add("is-pointer-active");

    const styleTarget = cursorLayer ?? section;
    styleTarget.style.setProperty("opacity", "0.82");
    styleTarget.style.setProperty("--hero-x", `${x}px`);
    styleTarget.style.setProperty("--hero-y", `${y}px`);
    styleTarget.style.setProperty("--hero-cursor-opacity", "0.82");
    styleTarget.style.setProperty("--hero-caustic-opacity", "0.42");
    styleTarget.style.setProperty(
      "--hero-drift-x",
      `${normalX * -34 + velocityX * 0.2}px`,
    );
    styleTarget.style.setProperty(
      "--hero-drift-y",
      `${normalY * -24 + velocityY * 0.2}px`,
    );
    styleTarget.style.setProperty("--hero-wave-rotate", `${angle * 0.035}deg`);
    styleTarget.style.setProperty(
      "--hero-wave-scale",
      `${1.07 + speed * 0.045}`,
    );

    gsap.to(cursorWaveRef.current, {
      dx: normalX * 70 + velocityX * 0.5,
      dy: normalY * 70 + velocityY * 0.5,
      frequencyX: 0.009 + Math.abs(normalY) * 0.012 + speed * 0.006,
      frequencyY: 0.019 + Math.abs(normalX) * 0.018 + speed * 0.01,
      scale: 22 + speed * 42,
      duration: 0.32,
      ease: "power3.out",
      overwrite: true,
      onUpdate: applyCursorWave,
    });
  }, [applyCursorWave]);

  const handlePointerLeave = useCallback(() => {
    const section = heroRef.current;
    const cursorLayer =
      cursorLayerRef.current ??
      section?.querySelector<HTMLElement>(".hero-cursor-effect");
    if (!section) return;

    section.classList.remove("is-pointer-active");
    lastPointerRef.current = null;

    const styleTarget = cursorLayer ?? section;
    styleTarget.style.setProperty("opacity", "0");
    styleTarget.style.setProperty("--hero-cursor-opacity", "0");
    styleTarget.style.setProperty("--hero-caustic-opacity", "0");
    styleTarget.style.setProperty("--hero-drift-x", "0px");
    styleTarget.style.setProperty("--hero-drift-y", "0px");
    styleTarget.style.setProperty("--hero-wave-rotate", "0deg");
    styleTarget.style.setProperty("--hero-wave-scale", "1.07");

    gsap.to(cursorWaveRef.current, {
      dx: 0,
      dy: 0,
      frequencyX: 0.009,
      frequencyY: 0.019,
      scale: 22,
      duration: 0.72,
      ease: "power3.out",
      overwrite: true,
      onUpdate: applyCursorWave,
    });
  }, [applyCursorWave]);

  useEffect(() => {
    const intro = window.setTimeout(() => setIntroDone(true), 1600);
    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % homeSlides.length);
    }, 6200);
    return () => {
      window.clearTimeout(intro);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    const cursorLayer = cursorLayerRef.current;
    const cursorWave = cursorWaveRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) {
        heroRef.current?.classList.remove("is-pointer-active");
      }
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
      gsap.killTweensOf(cursorWave);
      if (section) {
        gsap.killTweensOf(section);
      }
      if (cursorLayer) {
        gsap.killTweensOf(cursorLayer);
      }
    };
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-live-title",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, delay: 1.15, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-slider-ui",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 1.55, ease: "power3.out" },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-svh min-h-[620px] overflow-hidden bg-amali-dark"
    >
      <svg aria-hidden className="absolute size-0">
        <filter id="amali-water-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.025"
            numOctaves="2"
            seed="6"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="8s"
              values="0.012 0.025;0.018 0.019;0.012 0.025"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id="amali-cursor-water-filter"
          x="-18%"
          y="-18%"
          width="136%"
          height="136%"
        >
          <feTurbulence
            ref={cursorTurbulenceRef}
            type="fractalNoise"
            baseFrequency="0.009 0.019"
            numOctaves="2"
            seed="11"
            result="cursorNoise"
          />
          <feOffset
            ref={cursorNoiseOffsetRef}
            in="cursorNoise"
            dx="0"
            dy="0"
            result="cursorShiftedNoise"
          />
          <feDisplacementMap
            ref={cursorDisplacementRef}
            in="SourceGraphic"
            in2="cursorShiftedNoise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="absolute inset-0 z-10 overflow-hidden">
        {homeSlides.map((slide, index) => (
          <img
            key={slide.label}
            src={slide.image}
            alt=""
            aria-hidden
            className={`fill-media scale-[1.02] transition-opacity duration-[1400ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="hero-top-blur absolute inset-x-0 top-0 z-20 h-[32vh] overflow-hidden">
        {homeSlides.map((slide, index) => (
          <img
            key={`top-blur-${slide.label}`}
            src={slide.image}
            alt=""
            aria-hidden
            className={`hero-water fill-media scale-[1.08] transition-opacity duration-[1400ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div
        ref={cursorLayerRef}
        className="hero-cursor-effect absolute inset-0 z-20 overflow-hidden"
        aria-hidden
      >
        {homeSlides.map((slide, index) => (
          <img
            key={`cursor-${slide.label}`}
            src={slide.image}
            alt=""
            aria-hidden
            className={`hero-water fill-media scale-[1.08] transition-opacity duration-[1400ms] ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-20 bg-black/25" />
      <div className="water-glass absolute inset-0 z-20 opacity-55" />
      <div className="absolute inset-x-0 bottom-0 z-20 hidden h-1/2 bg-gradient-to-t from-amali-dark/65 to-transparent md:block" />

      <div
        className={`absolute inset-0 z-30 flex items-start justify-center px-6 pt-32 text-center transition-all duration-700 md:items-center md:pt-0 ${
          introDone ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="max-w-[820px] text-[36px] font-light uppercase leading-[0.86] tracking-[0.8px] text-white sm:text-[42px] md:text-[72px] md:leading-[0.89] md:tracking-[2.16px]">
          Redefining
          <br />
          luxury living
        </h1>
      </div>

      <div
        className={`relative z-30 flex h-full flex-col items-center justify-center px-6 pt-20 text-center transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="hero-live-title max-w-[900px] text-[36px] font-light uppercase leading-[0.86] tracking-[0.8px] text-white sm:text-[42px] md:text-[72px] md:leading-[0.89] md:tracking-[2.16px]">
          one dream
          <br />
          at a time
        </h2>
      </div>

      <div
        className={`hero-slider-ui absolute bottom-8 left-1/2 z-40 hidden -translate-x-1/2 transition-opacity duration-500 md:block ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-6">
          <p className="text-[16px] font-normal uppercase leading-none tracking-[1.6px] text-white">
            Discover
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
            Living
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
            0{active + 1} / 03
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fly-video",
        { y: 90, scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".fly-card",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
      gsap.to(".cloud-a", {
        x: "-12vw",
        y: "-8vh",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
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
          end: "bottom top",
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
          ? "fly-panel pointer-events-none absolute inset-0 z-40 overflow-hidden bg-amali-dark text-white"
          : "relative overflow-hidden bg-white text-amali-dark"
      }
    >
      <div
        className={`fly-panel-frame relative overflow-hidden ${
          isHandoff ? "h-full min-h-[620px]" : "h-svh min-h-[620px]"
        }`}
      >
        <div className="absolute left-1/2 top-1/2 aspect-square w-[170vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(218,208,193,0.55)_0%,rgba(255,255,255,0)_64%)]" />
        <img
          src={`${ASSET_BASE}/uploads/2025/04/4dfe4c0468a937bf2545685b9b6f3f49-1.png`}
          alt=""
          aria-hidden
          className="cloud-a absolute -left-[15vw] top-[10vh] w-[72vw] opacity-10 md:w-[50vw]"
        />
        <img
          src={`${ASSET_BASE}/uploads/2025/04/4dfe4c0468a937bf2545685b9b6f3f49-1.png`}
          alt=""
          aria-hidden
          className="cloud-b absolute -right-[28vw] bottom-[8vh] w-[90vw] -scale-x-100 opacity-10 md:w-[58vw]"
        />
        <div
          className={`fly-title absolute left-1/2 z-40 w-[86%] max-w-[980px] -translate-x-1/2 -translate-y-1/2 text-center ${
            isHandoff
              ? "top-[47%] text-white drop-shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
              : "top-[42%] text-amali-dark"
          }`}
        >
          <p className="text-[30px] font-light uppercase leading-[0.86] tracking-[0.84px] md:text-[62px] md:leading-[0.94] md:tracking-[1.86px] lg:text-[76px] lg:tracking-[2.2px]">
            step into a reality that transcends
            <span
              className={`font-script relative block text-[48px] normal-case leading-none tracking-normal md:text-[102px] lg:text-[128px] ${
                isHandoff ? "text-[#d8bf7d]" : "-z-10 text-[#b19056]"
              }`}
            >
              Luxury
            </span>
          </p>
        </div>
        <div
          className={
            isHandoff
              ? "fly-video absolute inset-0 z-30 h-full w-full overflow-hidden bg-amali-dark"
              : "fly-video absolute left-1/2 top-1/2 z-30 aspect-[1185/670] h-[58vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-amali-dark md:h-[72vh]"
          }
        >
          <img
            src={`${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`}
            alt=""
            aria-hidden
            className={`fill-media opacity-100 ${isHandoff ? "scale-[1.04]" : ""}`}
          />
          <video
            className="fill-media opacity-100"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            poster={`${ASSET_BASE}/uploads/2025/08/Aerial-View-03-3-3.png`}
          >
            <source
              src={`${ASSET_BASE}/uploads/2026/02/zoom_out_new.mp4`}
              type="video/mp4"
            />
          </video>
          <div
            className={
              isHandoff
                ? "absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/45"
                : "absolute inset-0 bg-black/5"
            }
          />
        </div>
        <div className="fly-card absolute bottom-6 left-5 right-5 z-50 max-w-[530px] rounded-[10px] bg-amali-dark/78 px-7 py-7 text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-[15px] md:bottom-10 md:left-10 md:right-auto md:px-12 md:py-11">
          <h2 className="mb-3 text-[28px] font-light uppercase leading-[0.94] tracking-[1.02px] md:text-[34px]">
            Spirited serenity, artisanal intention
          </h2>
          <p className="font-body text-[18px] font-normal leading-[25px] md:text-[21px] md:leading-[27px]">
            Amali properties are designed to galvanise wellness, wonder and
            connection. Curated materials play with natural forms, water dances
            nearby and unrivalled amenities truly satiate every desire.
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

  useEffect(() => {
    if (reducedMotion) return;

    const sequence = sequenceRef.current;
    const pin = pinRef.current;
    if (!sequence || !pin) return;

    const ctx = gsap.context(() => {
      gsap.set(".fly-panel", {
        autoAlpha: 0,
        borderRadius: 42,
        scale: 0.16,
        transformOrigin: "50% 50%",
      });
      gsap.set(".fly-panel-frame", { scale: 1.12, transformOrigin: "50% 50%" });
      gsap.set(".fly-title", { autoAlpha: 0, scale: 0.68, y: 58 });
      gsap.set(".fly-video", { autoAlpha: 1, scale: 1.08, y: 0 });
      gsap.set(".fly-card", { autoAlpha: 0, scale: 0.98, y: 54 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sequence,
            start: "top top",
            end: "+=150%",
            pin,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          ".hero-sequence-hero",
          {
            filter: "blur(6px)",
            opacity: 0.18,
            scale: 1.06,
            duration: 0.58,
          },
          0,
        )
        .to(
          ".fly-panel",
          {
            autoAlpha: 1,
            borderRadius: 0,
            scale: 1,
            duration: 0.5,
          },
          0.04,
        )
        .to(".fly-panel-frame", { scale: 1, duration: 0.56 }, 0.04)
        .to(".fly-video", { scale: 1, duration: 0.7 }, 0.04)
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
            duration: 0.14,
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
          0.84,
        )
        .to(".cloud-a", { x: "-8vw", y: "-6vh", duration: 1 }, 0)
        .to(".cloud-b", { x: "7vw", y: "6vh", duration: 1 }, 0);
    }, sequence);

    return () => ctx.revert();
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
    <div ref={sequenceRef} className="hero-fly-sequence relative bg-amali-dark">
      <div
        ref={pinRef}
        className="hero-fly-pin relative h-svh min-h-[620px] overflow-hidden"
      >
        <div className="hero-sequence-hero absolute inset-0 z-10 will-change-transform">
          <HomeHero />
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
              A vision crafted for exceptional living
            </h2>
            <p className="font-body max-w-[720px] text-[20px] leading-[27px] md:text-[21px]">
              Amali pioneers a new era of ultra-luxurious real estate, defined
              by boutique, deeply personal living experiences. We harness the
              power of design to create a canvas upon which clients curate
              their ultimate lives.
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
            In Dubai&apos;s most coveted locations
          </h2>
          <p className="reveal-up font-body max-w-[760px] text-[18px] leading-[24px] md:mx-auto md:text-[21px] md:leading-[27px]">
            Whether nestled on a private island, on the shores of endless waters
            or soaring above urban streets, each Amali home is enviably situated
            in one of the world&apos;s most iconic cities, Dubai.
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
          Amali
        </p>
      </div>
      <div className="amali-container -mt-4 mb-10 md:-mt-8 md:mb-16">
        <div className="grid grid-cols-12 items-center gap-5">
          <div className="reveal-up col-span-12 md:col-span-7">
            <h2 className="text-[30px] font-light uppercase leading-[0.9] tracking-[0.9px] md:text-[44px] lg:text-[72px] lg:leading-[0.89]">
              Luxury living
              <br />
              <span className="font-normal">Redefined</span>
            </h2>
          </div>
          <div className="reveal-up col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <p className="mb-5 text-[18px] font-light uppercase leading-[18px] tracking-[0.2px] lg:text-[20px] lg:leading-[20px]">
              Discover how Amali is changing the narrative
            </p>
            <ArrowButton
              tone="sand"
              href="https://amaliproperties.com/about-amali/"
            >
              Our purpose
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
                Register your
                <br />
                interest
              </p>
              <ArrowButton tone="slate" onClick={onRegister}>
                Contact
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
                ["About Amali", "https://amaliproperties.com/about-amali/"],
                ["Contact", "https://amaliproperties.com/contact/"],
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
          <p>Amali Properties 2026. All rights reserved.</p>
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
          aria-label="Close register interest"
          onClick={handleClose}
          className="focus-ring absolute right-5 top-5 flex size-10 items-center justify-center rounded-full text-amali-gray transition-colors hover:bg-amali-dark hover:text-white"
        >
          <X aria-hidden className="size-5" />
        </button>
        <div className="max-w-[520px]">
          <p className="font-body mb-4 text-[13px] uppercase tracking-[1.6px] text-amali-slate">
            Amali Properties
          </p>
          <h2
            id="register-title"
            className="text-[32px] font-light uppercase leading-none tracking-[1.7px] sm:text-[42px]"
          >
            Register Interest
          </h2>
          <p className="font-body mt-5 text-[18px] font-light leading-[26px] text-amali-gray">
            We&apos;d love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-[28px] bg-amali-sand/55 p-7">
            <p className="text-[22px] font-light uppercase tracking-[1.4px]">
              Thank you
            </p>
            <p className="font-body mt-3 text-[17px] leading-7 text-amali-ink">
              Your interest has been registered. This clone keeps the form
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
                Register your interest
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
        <VisionSection />
        <MapSection />
        <TeasersSection />
      </main>
      <SiteFooter onRegister={() => setModalOpen(true)} />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
