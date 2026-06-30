export type LeadPayload = {
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  variant?: string;
  page?: string;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch("/api/gohighlevel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error ?? "Unable to send your enquiry right now.");
  }

  return data;
}
