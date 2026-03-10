/**
 * POST /api/order
 * Accepts an order and optionally forwards to a webhook.
 *
 * Body (JSON):
 * { "name": "...", "phone": "...", "items": [{ "name": "...", "qty": 1 }], "notes": "..." }
 *
 * Set webhook: wrangler pages secret put ORDER_WEBHOOK_URL
 */
export async function onRequestPost(context) {
  let body;
  try { body = await context.request.json(); }
  catch { return json({ success: false, error: "Invalid JSON." }, 400); }

  const { name, phone, items, notes } = body;
  if (!name || String(name).trim().length < 2)
    return json({ success: false, error: '"name" required (min 2 chars).' }, 422);
  if (!phone || !/^\+?[\d\s\-]{7,15}$/.test(String(phone).trim()))
    return json({ success: false, error: '"phone" must be a valid number.' }, 422);
  if (!Array.isArray(items) || items.length === 0)
    return json({ success: false, error: '"items" must be a non-empty array.' }, 422);

  const order = {
    id:        crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    customer:  { name: name.trim(), phone: String(phone).trim() },
    items:     items.map(i => ({ name: String(i.name||"").trim(), qty: Math.max(1, parseInt(i.qty)||1) })),
    notes:     notes ? String(notes).trim() : null,
  };

  const hook = context.env?.ORDER_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            "🥟 New Order — Aunty Momo",
            "────────────────────────────",
            `ID:       ${order.id}`,
            `Time:     ${order.timestamp}`,
            `Customer: ${order.customer.name}`,
            `Phone:    ${order.customer.phone}`,
            "",
            "Items:",
            ...order.items.map(i => `  • ${i.name} × ${i.qty}`),
            ...(order.notes ? ["", `Notes: ${order.notes}`] : []),
          ].join("\n"),
          order,
        }),
      });
    } catch(e) { console.error("Webhook failed:", e.message); }
  }

  return json({ success: true, message: "Order received! Aunty will WhatsApp you shortly. 🥟", orderId: order.id }, 201);
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors() });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...cors() } });
}
function cors() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
}
