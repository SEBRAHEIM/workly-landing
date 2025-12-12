export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, token } = req.body || {};

  if (!email || !token) {
    return res.status(400).json({ error: "Missing email or token." });
  }

  // TODO: Connect this to a real verification flow (Supabase / custom).
  // For now we just accept any 6-digit code so you can continue the UI flow.
  if (String(token).length !== 6) {
    return res.status(400).json({ error: "Invalid code length." });
  }

  return res.status(200).json({ ok: true });
}
