import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { homeBuilderSchema } from "@/lib/schema";
import { jsonLd } from "@/lib/utils";
import "./globals.css";

const description =
  "King Style Homes designs and constructs custom homes, duplexes, granny flats and renovations across Western Sydney — blending style, functionality and exceptional craftsmanship.";

export const metadata: Metadata = {
  ...buildMetadata({
    path: "/",
    title: "King Style Homes — Custom Home Builder, Western Sydney",
    description,
    keywords: [
      "custom home builder western sydney",
      "knockdown rebuild sydney",
      "duplex builder western sydney",
      "granny flat builder sydney",
      "home designs western sydney",
      "king style homes",
    ],
  }),
  applicationName: "King Style Homes",
  category: "Home Construction",
  authors: [{ name: "King Style Homes" }],
  creator: "King Style Homes",
  publisher: "King Style Homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-amali-dark text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(homeBuilderSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
