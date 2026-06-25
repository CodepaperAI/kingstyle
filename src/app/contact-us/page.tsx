import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { contactDetails, pageImages } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/contact-us",
  title: "Contact King Style Homes — Western Sydney Custom Home Builder",
  description: `Talk to King Style Homes about your custom home, knockdown rebuild, duplex or granny flat. Call ${contactDetails.phone}, email ${contactDetails.email}, or visit our Sydney TCE display home.`,
  image: pageImages.contactHero,
  keywords: [
    "contact king style homes",
    "western sydney home builder contact",
    "custom home consultation sydney",
  ],
});

export default function ContactPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Contact"
        title="Speak with the experts"
        intro="Have questions or ready to start your home-building journey? King Style Homes can guide you from initial design through to project completion."
        image={pageImages.contactHero}
      />
      <SandSection>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[62px]">Let’s talk about your home</h2>
            <div className="font-body mt-8 space-y-3 text-[18px] text-amali-gray">
              <p>Email: {contactDetails.email}</p>
              <p>Phone: {contactDetails.phone}</p>
              <p>{contactDetails.hours}</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {["Free quote pathway", "Design-led advice", "Western Sydney service"].map((item) => (
                <div key={item} className="rounded-2xl border border-amali-dark/10 bg-white/70 p-5">
                  <p className="text-[18px] font-light uppercase tracking-[0.5px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </SandSection>
    </InteriorPage>
  );
}
