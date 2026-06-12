import type { Metadata } from "next";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { contactDetails, displayCenters, pageImages } from "@/data/site-content";

export const metadata: Metadata = { title: "Contact Us | King Style Homes" };

export default function ContactPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="Contact"
        title="Speak with the experts"
        intro="Have questions or ready to start your home-building journey? King Style Homes can guide you from initial design through to project completion."
        image={pageImages.displayFeature}
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
            <div className="mt-10 grid gap-4">
              <p className="font-body text-[12px] uppercase tracking-[1.4px] text-amali-slate">Visit our display centres</p>
              {displayCenters.map((center) => (
                <article data-luxury-card key={center.name} className="rounded-[26px] border border-amali-dark/10 bg-white p-6 shadow-[0_20px_70px_rgba(26,32,38,0.08)]">
                  <h3 className="text-[24px] font-light uppercase">{center.name}</h3>
                  <p className="font-body mt-3 text-[16px] leading-6 text-amali-gray">{center.address}</p>
                  <p className="font-body mt-2 text-[13px] uppercase tracking-[1px] text-amali-slate">{center.phone}</p>
                </article>
              ))}
            </div>
          </div>
          <form className="grid gap-4 rounded-[34px] border border-amali-dark/10 bg-white p-6 shadow-[0_24px_90px_rgba(26,32,38,0.1)] md:p-9">
            <div className="mb-4">
              <p className="font-body text-[12px] uppercase tracking-[1.5px] text-amali-slate">
                Start the conversation
              </p>
              <h2 className="mt-3 text-[32px] font-light uppercase leading-none">
                Request a tailored consultation
              </h2>
            </div>
            {["Name", "Email", "Phone", "Project type"].map((label) => (
              <label key={label} className="font-body text-[13px] uppercase tracking-[1px]">
                {label}
                <input className="mt-2 h-14 w-full rounded-full border border-amali-dark/15 bg-amali-sand/35 px-5 outline-none transition-colors focus:border-amali-slate focus:bg-white" />
              </label>
            ))}
            <label className="font-body text-[13px] uppercase tracking-[1px]">
              Tell us about your project
              <textarea className="mt-2 min-h-36 w-full rounded-3xl border border-amali-dark/15 bg-amali-sand/35 p-5 outline-none transition-colors focus:border-amali-slate focus:bg-white" />
            </label>
            <button type="button" className="mt-2 rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-white transition-transform hover:scale-[1.02]">
              Request consultation
            </button>
          </form>
        </div>
      </SandSection>
    </InteriorPage>
  );
}
