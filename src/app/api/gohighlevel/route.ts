type LeadBody = {
  source?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  message?: unknown;
  variant?: unknown;
  page?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadBody | null;

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid enquiry details." }, { status: 400 });
  }

  const source = clean(body.source) || "King Style Homes website";
  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const projectType = clean(body.projectType);
  const message = clean(body.message);
  const variant = clean(body.variant);
  const page = clean(body.page);

  if (!email && !phone) {
    return Response.json(
      { error: "Please provide an email address or phone number." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.GOHIGHLEVEL_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { error: "Lead capture is not configured yet." },
      { status: 503 },
    );
  }

  const submittedAt = new Date().toISOString();
  const goHighLevelPayload = {
    source,
    name,
    email,
    phone,
    project_type: projectType,
    message,
    inclusion_variant: variant,
    page_url: page,
    submitted_at: submittedAt,
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goHighLevelPayload),
    cache: "no-store",
  });

  const upstreamBody = await response.text().catch(() => "");

  if (!response.ok) {
    console.error("GHL webhook rejected lead", {
      status: response.status,
      statusText: response.statusText,
      body: upstreamBody.slice(0, 500),
      payload: goHighLevelPayload,
    });
    return Response.json(
      { error: "Unable to send your enquiry right now." },
      { status: 502 },
    );
  }

  console.log("GHL webhook accepted lead", {
    status: response.status,
    body: upstreamBody.slice(0, 500),
    email: goHighLevelPayload.email,
    source: goHighLevelPayload.source,
  });

  return Response.json({ ok: true, submittedAt });
}
