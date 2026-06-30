import type { MetadataRoute } from "next";
import {
  designArchetypes,
  homeDesigns,
  pageImages,
  servicePath,
  services,
  suburbs,
} from "@/data/site-content";
import { SITE_BASE_URL, absoluteUrl } from "@/lib/utils";
import { getBlogs } from "@/lib/uplift-blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const { blogs } = await getBlogs({ limit: 100 });

  const staticRoutes = [
    "",
    "/about-us",
    "/blog",
    "/contact-us",
    "/display-centers",
    "/home-designs",
    "/portfolio",
    "/services",
    "/signature-inclusions",
    "/standard-inclusions",
  ];
  const staticRouteImages = new Map<string, string[]>([
    ["", [absoluteUrl("/kingstyle-home-hero.jpeg")]],
    ["/about-us", [absoluteUrl(pageImages.aboutHero)]],
    ["/blog", [absoluteUrl(pageImages.aboutHero)]],
    ["/contact-us", [absoluteUrl(pageImages.contactHero)]],
    ["/display-centers", [absoluteUrl(pageImages.displayHero)]],
    ["/home-designs", [absoluteUrl(homeDesigns[0]?.image ?? pageImages.aboutHero)]],
    ["/portfolio", [absoluteUrl(pageImages.aboutFeatureOne)]],
    ["/services", [absoluteUrl(pageImages.servicesHero)]],
    ["/signature-inclusions", [absoluteUrl(pageImages.aboutFeatureTwo)]],
    ["/standard-inclusions", [absoluteUrl(pageImages.inclusionsHero)]],
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_BASE_URL}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      images: staticRouteImages.get(route),
    })),
    ...homeDesigns.map((design) => ({
      url: `${SITE_BASE_URL}/home-designs/${design.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: [absoluteUrl(design.image)],
    })),
    ...designArchetypes.map((archetype) => ({
      url: `${SITE_BASE_URL}/home-designs/${archetype.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [
        absoluteUrl(
          homeDesigns.find((design) => archetype.filter(design))?.image ??
            homeDesigns[0]?.image ??
            pageImages.aboutHero,
        ),
      ],
    })),
    ...services.map((service) => ({
      url: `${SITE_BASE_URL}${servicePath(service)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [absoluteUrl(service.image)],
    })),
    ...blogs.map((blog) => ({
      url: `${SITE_BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
      images: blog.featuredImage ? [absoluteUrl(blog.featuredImage)] : undefined,
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
