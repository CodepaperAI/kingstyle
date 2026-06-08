import type { Metadata } from "next";
import "./globals.css";

const description =
  "Amali is pioneering a new era of ultra-luxurious real estate to redefine luxury living, one dream at a time.";

export const metadata: Metadata = {
  metadataBase: new URL("https://amaliproperties.com"),
  title: "Home - Amali Properties",
  description,
  openGraph: {
    title: "Home - Amali Properties",
    description,
    url: "/",
    siteName: "Amali Properties",
    images: [
      {
        url: "https://amaliproperties.com/wp-content/uploads/2026/03/View-8_Penthouse-1.jpg",
        width: 912,
        height: 697,
        alt: "Amali Properties luxury living",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - Amali Properties",
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
