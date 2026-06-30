import type { Metadata } from "next";
import { SITE_BASE_URL, absoluteUrl } from "@/lib/utils";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

const DEFAULT_OG_IMAGE = "/kingstyle-home-hero.jpeg";
const SITE_NAME = "King Style Homes";

export function buildMetadata(page: SeoPage): Metadata {
  const { path, title, description, keywords } = page;
  const image = absoluteUrl(page.image ?? DEFAULT_OG_IMAGE, SITE_BASE_URL);
  const imageAlt = page.imageAlt ?? `${SITE_NAME} — ${title}`;
  const sharedOpenGraph = {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_AU",
    images: [
      {
        url: image,
        width: 1600,
        height: 900,
        alt: imageAlt,
      },
    ],
  };

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_BASE_URL),
    alternates: {
      canonical: path,
    },
    openGraph:
      page.type === "article"
        ? {
            ...sharedOpenGraph,
            type: "article",
            publishedTime: page.publishedTime,
            modifiedTime: page.modifiedTime,
            authors: page.authors,
            section: page.section,
            tags: page.tags,
          }
        : {
            ...sharedOpenGraph,
            type: "website",
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
