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
  const username = cleanUsername((req.body && req.body.username) || "");

  if (role !== "student" && role !== "creator") return res.status(400).json({ error: "invalid_role" });
  if (!username || username.length < 3) return res.status(400).json({ error: "invalid_username" });
  if (!url || !service) return res.status(500).json({ error: "server_env_missing" });
  if (!token) return res.status(401).json({ error: "missing_token" });

  const admin = createClient(url, service, { auth: { persistSession: false } });

  const { data: userData, error: userErr } = await admin.auth.getUser(token);
  if (userErr) return res.status(401).json({ error: "invalid_token", detail: userErr.message || String(userErr) });
  const id = userData?.user?.id;
  if (!id) return res.status(401).json({ error: "invalid_token_no_user" });

  const { data: takenRow, error: takenErr } = await admin
    .from("profiles")
    .select("id,username,role")
    .eq("username", username)
    .maybeSingle();

  if (takenErr && String(takenErr.message || "").length) {
    return res.status(400).json({ error: "username_check_failed", detail: takenErr.message });
  }

  if (takenRow?.id && takenRow.id !== id) {
    return res.status(409).json({ error: "username_taken" });
  }

  const { data: upsertData, error: upsertErr } = await admin
    .from("profiles")
    .upsert({ id, role, username }, { onConflict: "id" })
    .select("id,username,role")
    .single();

  if (upsertErr) {
    return res.status(400).json({
      error: "upsert_failed",
      detail: upsertErr.message || String(upsertErr),
      hint: upsertErr.hint || null,
      code: upsertErr.code || null
    });
  }

  return res.status(200).json({ ok: true, profile: upsertData });
}
