"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "@/lib/lead-submit";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const initialForm: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await submitLead({
        source: "Contact page consultation request",
        name: form.name,
        email: form.email,
        phone: form.phone,
        projectType: form.projectType,
        message: form.message,
        page: window.location.href,
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (leadError) {
      setError(
        leadError instanceof Error
          ? leadError.message
          : "Unable to send your enquiry right now.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-[34px] border border-amali-dark/10 bg-white p-6 shadow-[0_24px_90px_rgba(26,32,38,0.1)] md:p-9"
    >
      <div className="mb-4">
        <p className="font-body text-[12px] uppercase tracking-[1.5px] text-amali-slate">
          Start the conversation
        </p>
        <h2 className="mt-3 text-[32px] font-light uppercase leading-none">
          Request a tailored consultation
        </h2>
      </div>

      <label className="font-body text-[13px] uppercase tracking-[1px]">
        Name
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          autoComplete="name"
          required
          className="mt-2 h-14 w-full rounded-full border border-amali-dark/15 bg-amali-sand/35 px-5 outline-none transition-colors focus:border-amali-slate focus:bg-white"
        />
      </label>
      <label className="font-body text-[13px] uppercase tracking-[1px]">
        Email
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          autoComplete="email"
          required
          className="mt-2 h-14 w-full rounded-full border border-amali-dark/15 bg-amali-sand/35 px-5 outline-none transition-colors focus:border-amali-slate focus:bg-white"
        />
      </label>
      <label className="font-body text-[13px] uppercase tracking-[1px]">
        Phone
        <input
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          autoComplete="tel"
          className="mt-2 h-14 w-full rounded-full border border-amali-dark/15 bg-amali-sand/35 px-5 outline-none transition-colors focus:border-amali-slate focus:bg-white"
        />
      </label>
      <label className="font-body text-[13px] uppercase tracking-[1px]">
        Project type
        <input
          value={form.projectType}
          onChange={(event) => updateField("projectType", event.target.value)}
          className="mt-2 h-14 w-full rounded-full border border-amali-dark/15 bg-amali-sand/35 px-5 outline-none transition-colors focus:border-amali-slate focus:bg-white"
        />
      </label>
      <label className="font-body text-[13px] uppercase tracking-[1px]">
        Tell us about your project
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 min-h-36 w-full rounded-3xl border border-amali-dark/15 bg-amali-sand/35 p-5 outline-none transition-colors focus:border-amali-slate focus:bg-white"
        />
      </label>

      {error ? <p className="font-body text-sm text-red-700">{error}</p> : null}
      {submitted ? (
        <p className="font-body rounded-2xl bg-amali-sand/60 px-5 py-4 text-[15px] text-amali-dark">
          Thank you. Your consultation request has been sent.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-amali-dark px-6 py-4 text-[12px] uppercase tracking-[1.4px] text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {submitting ? "Sending..." : "Request consultation"}
      </button>
    </form>
  );
}
