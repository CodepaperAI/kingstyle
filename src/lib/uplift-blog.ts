const UPLIFT_API_BASE = "https://api.upliftai.co/api/public/v1";

export type UpliftBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  customFields?: {
    readingTime?: string;
    [key: string]: unknown;
  };
  meta?: {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    articleAuthor?: string;
    articleSection?: string;
    articleTags?: string[];
  };
};

type BlogListResponse = {
  success: boolean;
  data?: {
    blogs?: UpliftBlog[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  error?: string;
};

type BlogDetailResponse = {
  success: boolean;
  data?: {
    blog?: UpliftBlog;
  };
  error?: string;
};

export type BlogListResult = {
  blogs: UpliftBlog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  error?: string;
};

function getToken() {
  return process.env.UPLIFTAI_API_TOKEN?.trim() ?? "";
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getBlogs({
  page = 1,
  limit = 12,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<BlogListResult> {
  if (!getToken()) {
    return {
      blogs: [],
      pagination: null,
      error: "Blog API token is not configured.",
    };
  }

  const url = new URL(`${UPLIFT_API_BASE}/blogs`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("status", "PUBLISH");

  try {
    const response = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return {
        blogs: [],
        pagination: null,
        error: "Unable to load blog posts right now.",
      };
    }

    const result = (await response.json()) as BlogListResponse;

    if (!result.success) {
      return {
        blogs: [],
        pagination: null,
        error: result.error ?? "Unable to load blog posts right now.",
      };
    }

    return {
      blogs: result.data?.blogs ?? [],
      pagination: result.data?.pagination ?? null,
    };
  } catch {
    return {
      blogs: [],
      pagination: null,
      error: "Unable to load blog posts right now.",
    };
  }
}

export async function getBlogBySlug(slug: string) {
  if (!getToken()) return null;

  try {
    const response = await fetch(
      `${UPLIFT_API_BASE}/blog/${encodeURIComponent(slug)}`,
      {
        headers: authHeaders(),
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) return null;

    const result = (await response.json()) as BlogDetailResponse;
    return result.success ? result.data?.blog ?? null : null;
  } catch {
    return null;
  }
}

export function blogDate(blog: Pick<UpliftBlog, "publishDate" | "createdAt">) {
  const value = blog.publishDate ?? blog.createdAt;
  if (!value) return "";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function plainTextFromHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function blogExcerpt(blog: UpliftBlog, length = 170) {
  const text = blog.excerpt?.trim() || plainTextFromHtml(blog.content);
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export function sanitizeBlogHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\shref=["']javascript:[^"']*["']/gi, "");
}
