import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";
import { SITE_BASE_URL, absoluteUrl, jsonLd } from "@/lib/utils";
import { blogDate, blogExcerpt, getBlogs } from "@/lib/uplift-blog";

export const metadata: Metadata = buildMetadata({
  path: "/blog",
  title: "Blog — King Style Homes Insights",
  description:
    "Read King Style Homes blog articles on custom homes, duplex projects, granny flats, inclusions, approvals and building in Western Sydney.",
  image: pageImages.aboutHero,
  keywords: [
    "king style homes blog",
    "western sydney home builder blog",
    "custom home building advice",
    "duplex and granny flat insights",
  ],
});

export default async function BlogPage() {
  const { blogs, error } = await getBlogs({ limit: 12 });
  const featured = blogs[0];
  const remainingBlogs = blogs.slice(1);
  const blogUrl = `${SITE_BASE_URL}/blog`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        name: "King Style Homes Blog",
        url: blogUrl,
        description:
          "Build insights, design guidance and project clarity from King Style Homes.",
        publisher: {
          "@type": "Organization",
          name: "King Style Homes",
          url: SITE_BASE_URL,
          logo: absoluteUrl("/kingstyle-logo-wordmark-transparent.png"),
        },
        blogPost: blogs.map((blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          url: `${blogUrl}/${blog.slug}`,
          datePublished: blog.publishDate || blog.createdAt,
          dateModified: blog.updatedAt || blog.publishDate || blog.createdAt,
          image: absoluteUrl(blog.featuredImage || pageImages.aboutFeatureTwo),
          description: blogExcerpt(blog, 155),
          author: {
            "@type": "Person",
            name: blog.authorName || "King Style Homes",
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${blogUrl}#articles`,
        name: "King Style Homes blog articles",
        itemListElement: blogs.map((blog, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${blogUrl}/${blog.slug}`,
          name: blog.title,
        })),
      },
    ],
  };

  return (
    <InteriorPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <InteriorHero
        eyebrow="Blog"
        title="Build insights, design guidance and project clarity"
        intro="Practical articles from King Style Homes covering design decisions, site planning, inclusions and the details that shape a better build."
        image={pageImages.aboutHero}
      />
      <SandSection>
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Latest articles
            </p>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[64px]">
              Guidance before you build.
            </h2>
          </div>
          <p className="font-body max-w-[860px] text-[18px] leading-7 text-amali-gray md:text-[21px] md:leading-8">
            Explore clear, useful content for clients comparing designs, planning
            approvals, reviewing specifications or preparing for a custom home
            journey.
          </p>
        </div>

        {error ? (
          <div className="rounded-[28px] border border-amali-dark/10 bg-white/75 p-8">
            <p className="font-body text-[18px] text-amali-gray">{error}</p>
          </div>
        ) : null}

        {!error && !blogs.length ? (
          <div className="rounded-[28px] border border-amali-dark/10 bg-white/75 p-8">
            <p className="font-body text-[18px] text-amali-gray">
              Blog articles will appear here once published.
            </p>
          </div>
        ) : null}

        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-8 grid overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(26,32,38,0.12)] lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden bg-amali-dark">
              {featured.featuredImage ? (
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              ) : (
                <Image
                  src={pageImages.aboutFeatureOne}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.06]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-amali-dark/65 via-transparent to-transparent" />
            </div>
            <div className="flex min-h-[360px] flex-col justify-between p-7 md:p-10">
              <div>
                <div className="mb-8 flex flex-wrap gap-3">
                  {(featured.categories ?? ["Featured"]).slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="font-body rounded-full bg-amali-sand/65 px-4 py-2 text-[11px] uppercase tracking-[1.2px] text-amali-slate"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="font-body mb-4 text-[13px] uppercase tracking-[1.5px] text-amali-slate">
                  {blogDate(featured)}
                </p>
                <h3 className="text-[34px] font-light uppercase leading-none md:text-[52px]">
                  {featured.title}
                </h3>
                <p className="font-body mt-6 text-[18px] leading-7 text-amali-gray">
                  {blogExcerpt(featured, 230)}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 text-[12px] uppercase tracking-[1.4px] text-amali-dark">
                Read article
                <span className="flex size-10 items-center justify-center rounded-full bg-amali-dark text-white transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="size-4" strokeWidth={1.6} />
                </span>
              </span>
            </div>
          </Link>
        ) : null}

        {remainingBlogs.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {remainingBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group overflow-hidden rounded-[28px] bg-white shadow-[0_18px_60px_rgba(26,32,38,0.1)]"
              >
                <div className="relative aspect-[1.35] overflow-hidden bg-amali-dark">
                  <Image
                    src={blog.featuredImage || pageImages.aboutFeatureTwo}
                    alt={blog.title}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="p-6">
                  <p className="font-body mb-4 text-[12px] uppercase tracking-[1.4px] text-amali-slate">
                    {blogDate(blog)}
                  </p>
                  <h3 className="text-[27px] font-light uppercase leading-none">
                    {blog.title}
                  </h3>
                  <p className="font-body mt-5 text-[16px] leading-7 text-amali-gray">
                    {blogExcerpt(blog, 150)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </SandSection>
    </InteriorPage>
  );
}
