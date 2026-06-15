import type { Metadata } from "next";
import Image from "next/image";
import { InteriorHero, InteriorPage, SandSection } from "@/components/site-shell";
import { pageImages, processSteps, testimonials, trustProofItems, whyBuildItems } from "@/data/site-content";

export const metadata: Metadata = { title: "About Us | King Style Homes" };

export default function AboutPage() {
  return (
    <InteriorPage>
      <InteriorHero
        eyebrow="About us"
        title="Where your dream home becomes a reality"
        intro="King Style Homes specialises in bespoke homes tailored to your lifestyle and needs, combining innovative design, exceptional craftsmanship and personalised service."
        image={pageImages.aboutHero}
      />
      <SandSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <h2 className="text-[38px] font-light uppercase leading-[0.95] md:text-[64px]">
            A trusted partner from first idea to handover
          </h2>
          <div className="font-body space-y-5 text-[19px] leading-7 text-amali-gray">
            <p>Located in Nirimba Fields, NSW, King Style Homes creates spaces that combine functionality, beauty and quality.</p>
            <p>Whether you are building your first home, upgrading to a luxury design or starting a renovation, the team partners with you through every stage to bring the vision to life.</p>
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          {[pageImages.aboutFeatureOne, pageImages.aboutFeatureTwo, pageImages.aboutFeatureThree].map((image, index) => (
            <div key={image} data-luxury-card className={index === 1 ? "relative aspect-[4/5] overflow-hidden rounded-2xl md:translate-y-10" : "relative aspect-[4/5] overflow-hidden rounded-2xl"}>
              <Image src={image} alt="King Style Homes craftsmanship" fill className="object-cover" />
            </div>
          ))}
        </div>
      </SandSection>
      <SandSection className="bg-amali-dark text-white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-sand">
              Local expertise
            </p>
            <h2 className="text-[38px] font-light uppercase leading-none md:text-[64px]">
              Western Sydney knowledge, premium home delivery.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Nirimba Fields based", "Tailored homes", "Craft-led finishes"].map((item) => (
              <div key={item} data-luxury-card className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-[20px] font-light uppercase leading-tight tracking-[0.6px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-body mb-5 text-[12px] uppercase tracking-[2px] text-amali-slate">
              Proof points
            </p>
            <h2 className="text-[36px] font-light uppercase leading-none md:text-[58px]">
              Clear reasons to trust the process.
            </h2>
          </div>
          <p className="font-body max-w-[820px] text-[18px] leading-7 text-amali-gray">
            The King Style story should be grounded in useful, verifiable
            promises: local focus, site-aware planning, inclusions clarity and
            a guided path to handover.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trustProofItems.map((item) => (
            <article
              data-luxury-card
              key={item.title}
              className="rounded-[26px] border border-amali-dark/10 bg-white p-7 shadow-[0_20px_70px_rgba(26,32,38,0.07)]"
            >
              <h3 className="text-[23px] font-light uppercase leading-none tracking-[0.6px]">
                {item.title}
              </h3>
              <p className="font-body mt-5 text-[16px] leading-7 text-amali-gray">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-[38px] font-light uppercase leading-none md:text-[58px]">Why build with King Style Homes?</h2>
          <p className="font-body text-[18px] leading-7 text-amali-gray">
            Building with King Style means investing in a home designed to elevate your lifestyle, with a collaborative process, experienced guidance and a focus on quality delivery.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyBuildItems.map((item) => (
            <article data-luxury-card key={item} className="rounded-2xl bg-white p-7">
              <p className="text-[22px] font-light uppercase tracking-[0.7px]">{item}</p>
            </article>
          ))}
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-10 text-[38px] font-light uppercase leading-none md:text-[58px]">Our process</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <article data-luxury-card key={step.title} className="rounded-2xl bg-white p-7">
              <p className="font-body text-[12px] text-amali-slate">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-[24px] font-light uppercase leading-none">{step.title}</h3>
              <p className="font-body mt-4 text-[16px] leading-6 text-amali-gray">{step.text}</p>
            </article>
          ))}
        </div>
      </SandSection>
      <SandSection className="pt-0">
        <h2 className="mb-10 text-[38px] font-light uppercase leading-none md:text-[58px]">What customers say</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote data-luxury-card key={testimonial.name} className="rounded-2xl bg-white p-7">
              <p className="font-body text-[18px] leading-7 text-amali-gray">“{testimonial.quote}”</p>
              <cite className="font-body mt-6 block text-[12px] not-italic uppercase tracking-[1.2px] text-amali-slate">
                {testimonial.name}
                {testimonial.projectType ? ` // ${testimonial.projectType}` : ""}
              </cite>
            </blockquote>
          ))}
        </div>
      </SandSection>
    </InteriorPage>
  );
}
