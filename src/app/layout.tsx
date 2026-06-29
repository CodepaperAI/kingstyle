import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/seo";
import { homeBuilderSchema } from "@/lib/schema";
import { jsonLd } from "@/lib/utils";
import "./globals.css";

const description =
  "King Style Homes designs and constructs custom homes, duplexes, granny flats and renovations across Western Sydney — blending style, functionality and exceptional craftsmanship.";
const whatsappNumber = "+61421000100";
const whatsappDisplayNumber = "+61 421 000 100";
const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

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
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with King Style Homes on WhatsApp at ${whatsappDisplayNumber}`}
          className="fixed bottom-24 right-5 z-[70] inline-flex items-center gap-3 rounded-full border border-white/18 bg-[#25d366] px-4 py-3 text-[12px] uppercase tracking-[1px] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-transform hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-white/80 sm:px-5"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.54 2 2.08 6.44 2.08 11.91c0 1.75.46 3.46 1.34 4.97L2 22l5.26-1.37a10.04 10.04 0 0 0 4.78 1.21h.01c5.49 0 9.95-4.44 9.95-9.91C22 6.46 17.54 2 12.04 2Zm0 18.17h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.12.82.83-3.03-.2-.31a8.13 8.13 0 0 1-1.27-4.4c0-4.55 3.72-8.25 8.3-8.25 2.22 0 4.31.86 5.88 2.42a8.18 8.18 0 0 1 2.43 5.85c0 4.55-3.72 8.24-8.31 8.24Zm4.55-6.17c-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.12-.12.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.21-.49-.41-.42-.57-.43h-.49c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.17 1.75 2.66 4.24 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.3Z" />
          </svg>
          <span className="hidden sm:inline">{whatsappDisplayNumber}</span>
        </a>
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/68259a7ee9a0a8190cd22631/1ir9e6vpo";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
