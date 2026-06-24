export const SITE_BASE_URL = "https://kingstylehomes.com.au";

export function absoluteUrl(path: string, baseUrl: string = SITE_BASE_URL) {
  if (!path) return baseUrl;
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
