"use client";

import dynamic from "next/dynamic";

const AmaliLanding = dynamic(() => import("@/components/amali-landing"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen bg-amali-dark"
      role="status"
      aria-label="Loading"
    />
  ),
});

export default function AmaliLandingLoader() {
  return <AmaliLanding />;
}
