import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!url || !service) return res.status(500).json({ error: "server_env_missing" });
  if (!token) return res.status(401).json({ error: "missing_token" });

  const admin = createClient(url, service, { auth: { persistSession: false } });

  const { data: userData, error: userErr } = await admin.auth.getUser(token);
  if (userErr) return res.status(401).json({ error: "invalid_token", detail: userErr.message || String(userErr) });

  const id = userData?.user?.id;
  if (!id) return res.status(401).json({ error: "invalid_token_no_user" });

  const { error: upErr } = await admin
    .from("profiles")
    .upsert({ id, role: null, username: null }, { onConflict: "id" });

  if (upErr) {
    return res.status(400).json({
      error: "reset_failed",
      detail: upErr.message || String(upErr),
      code: upErr.code || null
    });
  }

  return res.status(200).json({ ok: true });
}
