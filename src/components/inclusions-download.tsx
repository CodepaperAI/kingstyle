"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDownToLine, Check, X } from "lucide-react";
import { inclusionFeatureItems, inclusionGroups } from "@/data/site-content";

type DownloadVariant = "standard" | "signature";

export function InclusionsDownload({ variant }: { variant: DownloadVariant }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const title = variant === "signature" ? "Signature Inclusions" : "Standard Inclusions";
  const coverLabel = variant === "signature" ? "Signature" : "Standard";

  const downloadText = useMemo(() => {
    const lines = [
      `King Style Homes - ${title}`,
      "",
      "Key Features Include:",
      ...inclusionFeatureItems.map((item) => `- ${item}`),
      "",
      "Detailed Inclusions:",
      ...inclusionGroups.flatMap((group) => [
        "",
        group.title,
        ...group.items.map((item) => `- ${item}`),
      ]),
      "",
      "Contact:",
      "Phone: 0421000100",
      "Email: info@kingstylehomes.com.au",
    ];

    return lines.join("\n");
  }, [title]);

  function downloadFile() {
    const blob = new Blob([downloadText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `king-style-homes-${variant}-inclusions.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
    downloadFile();
  }

  function close() {
    setOpen(false);
    window.setTimeout(() => {
      setSubmitted(false);
      setError("");
    }, 250);
  }

  return (
    <>
      <section data-luxury-section className="luxury-section bg-amali-dark px-5 py-16 text-white md:px-12 md:py-20">
        <div data-luxury-card className="download-pack-panel mx-auto grid max-w-[1560px] gap-8 rounded-[28px] border border-white/12 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl lg:grid-cols-[0.95fr_0.9fr_auto] lg:items-center md:p-10">
          <div>
            <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-sand">
              Download
            </p>
            <h2 className="mt-4 text-[34px] font-light uppercase leading-none md:text-[56px]">
              Get the {title} pack
            </h2>
            <p className="font-body mt-5 max-w-[760px] text-[17px] leading-7 text-white/70">
              Enter your details to download the inclusions and specifications pack. This helps the King Style Homes team follow up with the right information for your build.
            </p>
          </div>
          <div className="relative mx-auto aspect-[0.72] w-full max-w-[330px] overflow-hidden rounded-[20px] border border-[#a88343]/45 bg-[#11100d] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-3 rounded-[12px] border border-[#9c7738]/35" />
            <div className="absolute inset-6 rounded-[8px] border border-[#9c7738]/30" />
            <div className="absolute left-8 right-8 top-10 aspect-[1.46] border border-[#d5ae61]/75 bg-[#2b261f]">
              <div className="absolute inset-x-0 top-[46%] h-px bg-[#6f604b]/45" />
              <div className="absolute left-[10%] right-[10%] top-[45%] h-[16%] border-t-4 border-[#746854]/55" />
              <div className="absolute bottom-[32%] left-[18%] h-[16%] w-[19%] border border-[#5c5144]/50" />
              <div className="absolute bottom-[32%] left-[39%] h-[16%] w-[19%] border border-[#5c5144]/50" />
              <div className="absolute bottom-[32%] right-[18%] h-[16%] w-[19%] border border-[#5c5144]/50" />
              <div className="absolute left-[22%] top-[8%] h-[15%] w-[22%] rounded-full bg-[#6a5a3d]/20" />
              <div className="absolute right-[22%] top-[8%] h-[15%] w-[22%] rounded-full bg-[#6a5a3d]/20" />
              <div className="absolute left-[41%] top-0 h-full w-px bg-[#d5ae61]/45" />
              <div className="absolute right-[41%] top-0 h-full w-px bg-[#d5ae61]/45" />
              <div className="absolute left-[41%] top-[34%] size-5 -translate-x-1/2 rounded-full border-4 border-[#6e5b38] bg-[#b29358]" />
              <div className="absolute right-[41%] top-[34%] size-5 translate-x-1/2 rounded-full border-4 border-[#6e5b38] bg-[#b29358]" />
            </div>
            <div className="absolute inset-x-10 top-[47%] grid justify-items-center text-center">
              <div className="relative mb-5 size-16">
                <Image
                  src="/kingstyle-shield-transparent.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain opacity-90"
                />
              </div>
              <span className="text-[11px] uppercase tracking-[7px] text-[#c29a55]">
                Kingstyle Homes
              </span>
              <div className="mt-5 h-px w-full bg-[#84673b]" />
            </div>
            <div className="absolute inset-x-8 bottom-[14%] text-center text-[#c19a58]">
              <span className="block text-[32px] font-light uppercase leading-[1.05] tracking-[8px] md:text-[38px]">
                {coverLabel}
              </span>
              <span className="mt-2 block text-[25px] font-light uppercase leading-[1.15] tracking-[7px] md:text-[30px]">
                Inclusions
              </span>
              <span className="font-body mt-8 block text-[9px] uppercase tracking-[4px] text-[#8f743f]">
                Quality - Craftsmanship - Distinction
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="download-pack-button inline-flex items-center justify-center gap-3 rounded-full bg-amali-sand px-7 py-4 text-[12px] uppercase tracking-[1.3px] text-amali-dark transition-transform hover:scale-[1.02] lg:justify-self-end"
          >
            Download now
            <ArrowDownToLine className="size-4" strokeWidth={1.6} />
          </button>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center bg-amali-dark/70 px-5 py-8 backdrop-blur-[14px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="inclusions-download-title"
      >
        <div className={`download-modal-card relative max-h-[90dvh] w-full max-w-[680px] overflow-auto rounded-[30px] bg-white p-7 text-amali-dark shadow-2xl md:p-10 ${open ? "is-open" : ""}`}>
          <button
            type="button"
            aria-label="Close download form"
            onClick={close}
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full text-amali-gray transition-colors hover:bg-amali-dark hover:text-white"
          >
            <X className="size-5" strokeWidth={1.6} />
          </button>

          {submitted ? (
            <div className="pr-8">
              <div className="flex size-12 items-center justify-center rounded-full bg-amali-dark text-white">
                <Check className="size-5" strokeWidth={1.7} />
              </div>
              <h2 id="inclusions-download-title" className="mt-6 text-[34px] font-light uppercase leading-none">
                Download started
              </h2>
              <p className="font-body mt-5 text-[17px] leading-7 text-amali-gray">
                Thank you. Your {title.toLowerCase()} pack has started downloading.
              </p>
              <button
                type="button"
                onClick={downloadFile}
                className="mt-8 rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.3px] text-white"
              >
                Download again
              </button>
            </div>
          ) : (
            <>
              <p className="font-body text-[12px] uppercase tracking-[1.8px] text-amali-slate">
                King Style Homes
              </p>
              <h2 id="inclusions-download-title" className="mt-4 pr-10 text-[34px] font-light uppercase leading-none md:text-[44px]">
                Download {title}
              </h2>
              <p className="font-body mt-5 text-[17px] leading-7 text-amali-gray">
                Please enter your details to access the inclusions and specifications download.
              </p>
              <form onSubmit={submit} className="mt-8 grid gap-4">
                <label className="font-body text-[12px] uppercase tracking-[1.2px]">
                  Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-xl border border-amali-dark/15 px-4 text-[15px] normal-case tracking-normal outline-none focus:border-amali-slate"
                  />
                </label>
                <label className="font-body text-[12px] uppercase tracking-[1.2px]">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-xl border border-amali-dark/15 px-4 text-[15px] normal-case tracking-normal outline-none focus:border-amali-slate"
                  />
                </label>
                <label className="font-body text-[12px] uppercase tracking-[1.2px]">
                  Phone optional
                  <input
                    value={form.phone}
                    onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-xl border border-amali-dark/15 px-4 text-[15px] normal-case tracking-normal outline-none focus:border-amali-slate"
                  />
                </label>
                {error ? <p className="font-body text-sm text-red-700">{error}</p> : null}
                <button
                  type="submit"
                  className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.3px] text-white"
                >
                  Submit and download
                  <ArrowDownToLine className="size-4" strokeWidth={1.6} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
