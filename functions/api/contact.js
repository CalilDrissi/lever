/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives a contact-form submission and creates a `contactMessage` entry in
 * Contentful via the Management API. Runs server-side on Cloudflare's edge, so
 * the Contentful token is never exposed to the browser.
 *
 * Required Pages environment variables (Settings → Environment variables):
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_CMA_TOKEN        (Content Management token)
 *   CONTENTFUL_ENVIRONMENT      (optional, defaults to "master")
 *
 * The entry is left unpublished (a draft) so messages land in Contentful for
 * review without going live anywhere.
 */
const LOCALE = "en-US"; // space default locale

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const message = String(payload?.message ?? "").trim();

  if (!name || !email || !message) {
    return json({ error: "Merci de remplir tous les champs." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Adresse email invalide." }, 400);
  }

  const space = env.CONTENTFUL_SPACE_ID;
  const token = env.CONTENTFUL_CMA_TOKEN;
  const environment = env.CONTENTFUL_ENVIRONMENT || "master";
  if (!space || !token) {
    return json({ error: "Formulaire non configuré côté serveur." }, 500);
  }

  const body = {
    fields: {
      name: { [LOCALE]: name.slice(0, 200) },
      email: { [LOCALE]: email.slice(0, 200) },
      message: { [LOCALE]: message.slice(0, 5000) },
      submittedAt: { [LOCALE]: new Date().toISOString() },
    },
  };

  const res = await fetch(
    `https://api.contentful.com/spaces/${space}/environments/${environment}/entries`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
        "X-Contentful-Content-Type": "contactMessage",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return json({ error: "Envoi impossible pour le moment." }, 502);
  }

  return json({ ok: true });
}
