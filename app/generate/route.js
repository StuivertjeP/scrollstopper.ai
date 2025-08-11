export async function POST(request) {
  const { text } = await request.json();

  if (!text || !text.trim()) {
    return new Response(JSON.stringify({ error: "No text provided" }), { status: 400 });
  }

  const trimmed = text.trim();
  const hooks = [
    `🔥 ${trimmed.slice(0, 60)}… Klik en zie waarom!`,
    `👀 Dit verandert alles: ${trimmed.split(" ").slice(0, 8).join(" ")}…`,
    `⚡ Doe dit vóór je volgende post: ${trimmed.slice(0, 40)}…`,
  ];

  return new Response(JSON.stringify({ hooks }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
