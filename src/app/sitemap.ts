import type { MetadataRoute } from "next";
import {
  designArchetypes,
  homeDesigns,
  servicePath,
  services,
  suburbs,
} from "@/data/site-content";
import { SITE_BASE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/display-centers",
    "/home-designs",
    "/portfolio",
    "/services",
    "/signature-inclusions",
    "/standard-inclusions",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_BASE_URL}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...homeDesigns.map((design) => ({
      url: `${SITE_BASE_URL}/home-designs/${design.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...designArchetypes.map((archetype) => ({
      url: `${SITE_BASE_URL}/home-designs/${archetype.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `${SITE_BASE_URL}${servicePath(service)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...suburbs.map((suburb) => ({
      url: `${SITE_BASE_URL}/areas/${suburb.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...services.flatMap((service) =>
      suburbs.map((suburb) => ({
        url: `${SITE_BASE_URL}${servicePath(service)}/${suburb.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    ),
  ];
}
