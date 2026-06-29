import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InteriorPage, SandSection } from "@/components/site-shell";
import { pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import { SITE_BASE_URL, absoluteUrl, jsonLd } from "@/lib/utils";
import {
  blogDate,
  blogExcerpt,
  getBlogBySlug,
  getBlogs,
  sanitizeBlogHtml,
} from "@/lib/uplift-blog";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogs } = await getBlogs({ limit: 100 });
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return buildMetadata({
      path: `/blog/${slug}`,
      title: "Blog Article — King Style Homes",
      description: "Read the latest King Style Homes article.",
    });
  }

  return buildMetadata({
    path: `/blog/${blog.slug}`,
    title: blog.meta?.seoTitle || `${blog.title} — King Style Homes Blog`,
    description:
      blog.meta?.seoDescription ||
      blogExcerpt(blog, 155) ||
      "Read the latest King Style Homes article.",
    image: blog.featuredImage || pageImages.aboutHero,
    keywords: blog.meta?.keywords || blog.tags,
    type: "article",
    publishedTime: blog.publishDate || blog.createdAt,
    modifiedTime: blog.updatedAt || blog.publishDate || blog.createdAt,
    authors: [blog.authorName || "King Style Homes"],
    section: blog.categories?.[0] || blog.meta?.articleSection,
    tags: blog.tags || blog.meta?.articleTags,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const canonicalUrl = `${SITE_BASE_URL}/blog/${blog.slug}`;
  const description = blogExcerpt(blog, 155);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: blog.title,
    description,
    image: absoluteUrl(blog.featuredImage || pageImages.aboutHero),
    datePublished: blog.publishDate || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishDate || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.authorName || "King Style Homes",
      url: blog.authorUrl || SITE_BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "King Style Homes",
      url: SITE_BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/kingstyle-logo-wordmark-transparent.png"),
      },
    },
    articleSection: blog.categories?.[0],
    keywords: blog.tags?.join(", "),
  };

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <article className="bg-amali-dark text-white">
        <section className="relative flex min-h-[78svh] items-end overflow-hidden px-5 pb-14 pt-36 md:px-12 md:pb-20">
          <Image
            src={blog.featuredImage || pageImages.aboutHero}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amali-dark/20 via-amali-dark/30 to-amali-dark/95" />
          <div className="relative z-10 mx-auto w-full max-w-[1560px]">
            <Link
              href="/blog"
              className="font-body mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-3 text-[12px] uppercase tracking-[1.2px] text-white/80 transition-colors hover:bg-white hover:text-amali-dark"
            >
              <ArrowLeft className="size-4" />
              Back to blog
            </Link>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              {blogDate(blog)}
            </p>
            <h1 className="max-w-[1160px] text-[44px] font-light uppercase leading-[0.92] tracking-[1px] md:text-[76px] lg:text-[98px]">
              {blog.title}
            </h1>
            <p className="font-body mt-7 max-w-[860px] text-[19px] leading-8 text-white/78 md:text-[22px] md:leading-9">
              {blogExcerpt(blog, 240)}
            </p>
          </div>
        </section>

        <SandSection>
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[28px] border border-amali-dark/10 bg-white/70 p-6">
                <p className="font-body text-[12px] uppercase tracking-[1.6px] text-amali-slate">
                  Article details
                </p>
                <dl className="font-body mt-6 grid gap-4 text-[15px] text-amali-gray">
                  {blog.authorName ? (
                    <div>
                      <dt className="mb-1 uppercase tracking-[1px] text-amali-dark">
                        Author
                      </dt>
                      <dd>{blog.authorName}</dd>
                    </div>
                  ) : null}
                  {blog.customFields?.readingTime ? (
                    <div>
                      <dt className="mb-1 uppercase tracking-[1px] text-amali-dark">
                        Reading time
                      </dt>
                      <dd>{blog.customFields.readingTime}</dd>
                    </div>
                  ) : null}
                  {blog.categories?.length ? (
                    <div>
                      <dt className="mb-2 uppercase tracking-[1px] text-amali-dark">
                        Category
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {blog.categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-amali-sand/70 px-3 py-2 text-[12px] uppercase tracking-[1px] text-amali-slate"
                          >
                            {category}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>
            <div className="rounded-[32px] bg-white p-7 shadow-[0_24px_80px_rgba(26,32,38,0.1)] md:p-12">
              <div
                className="blog-content font-body text-[19px] leading-8 text-amali-gray"
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogHtml(blog.content || blog.excerpt || ""),
                }}
              />
            </div>
          </div>
        </SandSection>
      </article>
    </InteriorPage>
  );
}
