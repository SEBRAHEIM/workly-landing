import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

function cleanUsername(v) {
  const s = String(v || "").trim().toLowerCase();
  const ok = s.replace(/[^a-z0-9_]/g, "");
  return ok.slice(0, 20);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  const role = String((req.body && req.body.role) || "").trim();
  const usernameRaw = (req.body && req.body.username) || "";
  const username = cleanUsername(usernameRaw);

  if (role !== "student" && role !== "creator") return res.status(400).json({ error: "invalid_role" });
  if (!username || username.length < 3) return res.status(400).json({ error: "invalid_username" });
  if (!url || !service) return res.status(500).json({ error: "server_env_missing" });
  if (!token) return res.status(401).json({ error: "missing_token" });

  const admin = createClient(url, service, { auth: { persistSession: false } });

  const { data: userData, error: userErr } = await admin.auth.getUser(token);
  if (userErr || !userData?.user?.id) return res.status(401).json({ error: "invalid_token" });

  const id = userData.user.id;

  const { error: upsertErr } = await admin
    .from("profiles")
    .upsert({ id, role, username }, { onConflict: "id" });

  if (upsertErr) return res.status(400).json({ error: upsertErr.message });

  return res.status(200).json({ ok: true, role, username });
}
