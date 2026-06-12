import type { Metadata } from "next";
import "./globals.css";

const description =
  "King Style Homes designs and constructs custom homes that blend style, functionality, and exceptional craftsmanship.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kingstylehomes.com.au"),
  title: "Home - King Style Homes",
  description,
  openGraph: {
    title: "Home - King Style Homes",
    description,
    url: "/",
    siteName: "King Style Homes",
    images: [
      {
        url: "https://amaliproperties.com/wp-content/uploads/2026/03/View-8_Penthouse-1.jpg",
        width: 912,
        height: 697,
        alt: "King Style Homes custom home building",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - King Style Homes",
    description,
    images: [
      "https://amaliproperties.com/wp-content/uploads/2026/03/View-8_Penthouse-1.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-amali-dark text-white">{children}</body>
    </html>
  );
}
