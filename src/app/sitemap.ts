import type { MetadataRoute } from "next";
import { homeDesigns, servicePath, services } from "@/data/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kingstylehomes.com.au";
  const routes = [
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
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...homeDesigns.map((design) => ({
      url: `${baseUrl}/home-designs/${design.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}${servicePath(service)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
