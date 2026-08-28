export async function onRequest(context) {
  // Cloudflare sets CF-IPCountry on every request automatically.
  const country = context.request.headers.get("CF-IPCountry") || "XX";
  return new Response(JSON.stringify({ country_code: country }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
