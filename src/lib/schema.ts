import type { HomeDesign, Service } from "@/data/site-content";
import { contactDetails, services as allServices } from "@/data/site-content";
import { SITE_BASE_URL, absoluteUrl } from "@/lib/utils";

const COMPANY_NAME = "King Style Homes";
const LEGAL_NAME = "King Style Homes";
const LOGO_URL = absoluteUrl("/kingstyle-logo-wordmark-transparent.png");
const PHONE = `+61-${contactDetails.phone.replace(/^0/, "")}`; // 0421000100 -> +61-421000100

const SERVICE_AREAS = [
  "Kellyville",
  "Castle Hill",
  "Norwest",
  "Bella Vista",
  "Rouse Hill",
  "Box Hill",
  "The Ponds",
  "Stanhope Gardens",
  "Quakers Hill",
  "Schofields",
  "Marsden Park",
  "Riverstone",
];

export function homeBuilderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_BASE_URL}/#business`,
    name: COMPANY_NAME,
    legalName: LEGAL_NAME,
    url: SITE_BASE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: PHONE,
    email: contactDetails.email,
    description:
      "King Style Homes designs and constructs custom homes, duplexes, granny flats and renovations across Western Sydney — blending style, functionality and exceptional craftsmanship.",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nirimba Fields",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name,
      addressRegion: "NSW",
      addressCountry: "AU",
    })),
    knowsAbout: allServices.map((service) => service.title),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "17:00",
    },
  };
}

export function serviceSchema(
  service: Service,
  area?: { name: string; postcode?: string },
) {
  const baseName = area ? `${service.title} in ${area.name}` : service.title;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: baseName,
    serviceType: service.title,
    description: service.text,
    provider: { "@id": `${SITE_BASE_URL}/#business` },
    areaServed: area
      ? {
          "@type": "City",
          name: area.name,
          ...(area.postcode ? { postalCode: area.postcode } : {}),
          addressRegion: "NSW",
          addressCountry: "AU",
        }
      : SERVICE_AREAS.map((name) => ({
          "@type": "City",
          name,
          addressRegion: "NSW",
          addressCountry: "AU",
        })),
    image: absoluteUrl(service.image),
  };
}

export function productSchema(design: HomeDesign) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: design.name,
    description: design.description,
    image: absoluteUrl(design.image),
    brand: { "@id": `${SITE_BASE_URL}/#business` },
    category: design.category,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Bedrooms", value: design.beds },
      { "@type": "PropertyValue", name: "Bathrooms", value: design.baths },
      { "@type": "PropertyValue", name: "Cars", value: design.cars },
      { "@type": "PropertyValue", name: "Frontage", value: design.frontage },
      { "@type": "PropertyValue", name: "Storey", value: design.category },
    ],
  };
}

export function placeSchema(area: {
  name: string;
  postcode: string;
  lga: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: area.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      postalCode: area.postcode,
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${area.lga} LGA`,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
