import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorPricingPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [prices, setPrices] = useState([]);
  const [formCategory, setFormCategory] = useState("");
  const [formFormat, setFormFormat] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  async function loadPrices(uid) {
    const { data, error } = await supabase
      .from("creator_pricing")
      .select("*")
      .eq("creator_id", uid)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg("Could not load pricing.");
      return;
    }

    setPrices(data || []);
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data || !data.user) {
        router.replace("/login");
        return;
      }

      if (!isMounted) return;

      setUserId(data.user.id);
      setUserEmail(data.user.email || "");
      setLoadingUser(false);
      loadPrices(data.user.id);
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleAddPrice = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!userId) return;

    const category = formCategory.trim();
    const format = formFormat.trim();
    const priceNumber = parseFloat(formPrice);

    if (!category || !format || !priceNumber || priceNumber <= 0) {
      setErrorMsg("Enter category, format and a positive price in AED.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("creator_pricing").insert([
      {
        creator_id: userId,
        category,
        format,
        base_price_aed: priceNumber,
      },
    ]);

    setSaving(false);

    if (error) {
      setErrorMsg(error.message || "Could not save price.");
      return;
    }

    setFormCategory("");
    setFormFormat("");
    setFormPrice("");
    setInfoMsg("Price saved.");
    loadPrices(userId);
  };

  const handleToggleActive = async (price) => {
    if (!userId) return;
    setErrorMsg("");
    setInfoMsg("");

    const { error } = await supabase
      .from("creator_pricing")
      .update({ is_active: !price.is_active })
      .eq("id", price.id);

    if (error) {
      setErrorMsg("Could not update price.");
      return;
    }

    setInfoMsg("Price updated.");
    loadPrices(userId);
  };

  const handleDelete = async (price) => {
    if (!userId) return;

    const ok = window.confirm("Remove this price option?");
    if (!ok) return;

    setErrorMsg("");
    setInfoMsg("");

    const { error } = await supabase
      .from("creator_pricing")
      .delete()
      .eq("id", price.id);

    if (error) {
      setErrorMsg("Could not delete price.");
      return;
    }

    setInfoMsg("Price deleted.");
    loadPrices(userId);
  };

  if (loadingUser) {
    return (
      <div className="cp-shell">
        <div className="cp-inner">
          <p className="cp-loading">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-shell">
      <div className="cp-topbar">
        <div className="cp-brand">WORKLY · CREATOR</div>
        <div className="cp-user">
          <span className="cp-email">{userEmail}</span>
          <button className="cp-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="cp-inner">
        <header className="cp-header">
          <div>
            <h1 className="cp-title">Creator pricing</h1>
            <p className="cp-subtitle">
              Set your base prices for different project types. Students will
              see these when choosing you.
            </p>
          </div>
          <button
            type="button"
            className="cp-backdash"
            onClick={() => router.push("/dashboard/creator")}
          >
            Back to dashboard
          </button>
        </header>

        <div className="cp-grid">
          <section className="cp-card cp-form-card">
            <h2 className="cp-section-title">Add price option</h2>
            <form onSubmit={handleAddPrice} className="cp-form">
              <div className="cp-field">
                <label className="cp-label">Category</label>
                <input
                  className="cp-input"
                  placeholder="Example: Report, PPT, Group project"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  required
                />
              </div>

              <div className="cp-field">
                <label className="cp-label">Format</label>
                <input
                  className="cp-input"
                  placeholder="Example: PDF, Word, PowerPoint"
                  value={formFormat}
                  onChange={(e) => setFormFormat(e.target.value)}
                  required
                />
              </div>

              <div className="cp-field">
                <label className="cp-label">Base price (AED)</label>
                <input
                  className="cp-input"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Example: 150"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="cp-primary-btn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save price"}
              </button>

              {errorMsg && <p className="cp-error">{errorMsg}</p>}
              {infoMsg && !errorMsg && <p className="cp-info">{infoMsg}</p>}
            </form>
          </section>

          <section className="cp-card cp-list-card">
            <h2 className="cp-section-title">Your prices</h2>
            {prices.length === 0 ? (
              <p className="cp-empty">
                You do not have any pricing options yet. Add at least one so
                students can see your base prices.
              </p>
            ) : (
              <div className="cp-table">
                <div className="cp-table-head">
                  <span>Category</span>
                  <span>Format</span>
                  <span>Price (AED)</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                <div className="cp-table-body">
                  {prices.map((price) => (
                    <div key={price.id} className="cp-table-row">
                      <span>{price.category}</span>
                      <span>{price.format}</span>
                      <span>{Number(price.base_price_aed).toFixed(2)}</span>
                      <span>
                        <span
                          className={
                            price.is_active
                              ? "cp-pill cp-pill-active"
                              : "cp-pill cp-pill-inactive"
                          }
                        >
                          {price.is_active ? "Active" : "Hidden"}
                        </span>
                      </span>
                      <span className="cp-row-actions">
                        <button
                          type="button"
                          className="cp-secondary-btn"
                          onClick={() => handleToggleActive(price)}
                        >
                          {price.is_active ? "Hide" : "Activate"}
                        </button>
                        <button
                          type="button"
                          className="cp-ghost-btn"
                          onClick={() => handleDelete(price)}
                        >
                          Delete
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
