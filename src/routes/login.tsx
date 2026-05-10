import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in · JobTrackr" }] }),
});

function LoginPage() {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && user) navigate({ to: "/" }); }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null); setBusy(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) { setErr(error); return; }
    if (mode === "signup") {
      setInfo("Check your email to confirm your account, then sign in.");
      setMode("signin");
    }
  };

  return (
    <div style={shell}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap');
        .lp-input{background:#fffdf9;border:1px solid #e2dccf;border-radius:10px;padding:11px 14px;font-size:14px;font-family:inherit;outline:none;color:#16140f;transition:all .15s;width:100%}
        .lp-input:focus{border-color:#d94f1e;box-shadow:0 0 0 3px rgba(217,79,30,.18)}
        .lp-link{background:none;border:none;color:#d94f1e;cursor:pointer;font-size:13px;font-weight:600;padding:0;font-family:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
        .lp-link:hover{color:#b73c10}
        .lp-btn{margin-top:6px;padding:13px 16px;background:#16140f;color:#f5f1ea;border:none;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;letter-spacing:-.1px;transition:all .15s;cursor:pointer}
        .lp-btn:hover{background:#d94f1e}
        .lp-btn:disabled{opacity:.6;cursor:wait}
        @keyframes lpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .lp-orb{animation:lpFloat 6s ease-in-out infinite}
      `}</style>

      {/* Left: brand panel */}
      <div style={brandPanel}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#d94f1e", boxShadow: "0 0 0 5px rgba(217,79,30,.18)" }} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 28, color: "#f5f1ea", letterSpacing: "-.5px" }}>JobTrackr</span>
          </div>
          <h2 style={brandHead}>
            Track every<br />
            <em style={{ color: "#ff8a64", fontStyle: "italic" }}>application</em>,<br />
            land the offer.
          </h2>
          <p style={brandSub}>
            A calm, focused workspace for your job hunt. Pipelines, interviews,
            response rates — all in one place.
          </p>
          <div style={featureGrid}>
            {[
              ["Pipeline", "Visual funnel from applied → offer"],
              ["Insights", "Response rates & platform breakdown"],
              ["Private", "Your data, locked to your account"],
            ].map(([t, d]) => (
              <div key={t} style={featureItem}>
                <div style={featureDot} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f1ea", marginBottom: 2 }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: "#a39d8f", lineHeight: 1.5 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* decorative orbs */}
        <div className="lp-orb" style={{ position: "absolute", right: -80, top: 60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #ff6a3d, transparent 65%)", filter: "blur(40px)", opacity: .55 }} />
        <div className="lp-orb" style={{ position: "absolute", right: 40, bottom: 40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, #d94f1e, transparent 70%)", filter: "blur(50px)", opacity: .35, animationDelay: "2s" }} />
      </div>

      {/* Right: form */}
      <div style={formPanel}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "#8c8678", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
              {mode === "signin" ? "Welcome back" : "Get started"}
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, fontSize: 40, letterSpacing: "-1px", color: "#16140f", lineHeight: 1.05 }}>
              {mode === "signin" ? "Sign in to continue" : "Create your account"}
            </h1>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "#5a564c", lineHeight: 1.5 }}>
              {mode === "signin"
                ? "Pick up your job hunt where you left off."
                : "A free workspace for your applications and interviews."}
            </p>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={fieldLabel}>Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="lp-input" placeholder="you@example.com" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={fieldLabel}>Password</label>
              <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="lp-input" placeholder="At least 6 characters" />
            </div>

            {err && <div style={alertErr}>{err}</div>}
            {info && <div style={alertOk}>{info}</div>}

            <button type="submit" disabled={busy} className="lp-btn">
              {busy ? "Please wait…" : mode === "signin" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <div style={{ marginTop: 22, fontSize: 13.5, color: "#5a564c" }}>
            {mode === "signin" ? (
              <>New here?{" "}
                <button onClick={() => { setMode("signup"); setErr(null); setInfo(null); }} className="lp-link">Create an account</button>
              </>
            ) : (
              <>Already have one?{" "}
                <button onClick={() => { setMode("signin"); setErr(null); setInfo(null); }} className="lp-link">Sign in</button>
              </>
            )}
          </div>

          <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid #e2dccf", fontSize: 11.5, color: "#8c8678", letterSpacing: .3 }}>
            Protected by row-level security. Your applications are private to you.
          </div>
        </div>
      </div>
    </div>
  );
}

const shell: React.CSSProperties = {
  minHeight: "100vh", display: "grid", gridTemplateColumns: "1.05fr 1fr",
  background: "#f5f1ea", fontFamily: "'Inter Tight', system-ui, sans-serif", color: "#16140f",
};
const brandPanel: React.CSSProperties = {
  background: "#16140f", color: "#f5f1ea", padding: "56px 56px",
  display: "flex", flexDirection: "column", justifyContent: "center",
  position: "relative", overflow: "hidden",
};
const brandHead: React.CSSProperties = {
  fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 64,
  lineHeight: 1.02, letterSpacing: "-2px", margin: "0 0 22px",
};
const brandSub: React.CSSProperties = {
  fontSize: 15.5, lineHeight: 1.6, color: "#a39d8f", margin: "0 0 40px", maxWidth: 420,
};
const featureGrid: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 18,
  padding: "24px 0 0", borderTop: "1px solid #2a2620", maxWidth: 380,
};
const featureItem: React.CSSProperties = { display: "flex", gap: 12, alignItems: "flex-start" };
const featureDot: React.CSSProperties = {
  width: 6, height: 6, borderRadius: "50%", background: "#ff6a3d",
  marginTop: 8, flexShrink: 0, boxShadow: "0 0 0 3px rgba(255,106,61,.18)",
};
const formPanel: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px",
};
const fieldLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: "#5a564c",
  textTransform: "uppercase", letterSpacing: 1,
};
const alertErr: React.CSSProperties = {
  fontSize: 12.5, color: "#a52a18", background: "#f6dad2",
  padding: "10px 12px", borderRadius: 9, border: "1px solid #f0c4b7",
};
const alertOk: React.CSSProperties = {
  fontSize: 12.5, color: "#3a7a3a", background: "#e6efde",
  padding: "10px 12px", borderRadius: 9, border: "1px solid #cfdcc0",
};

// Mobile collapse — inject responsive override
if (typeof document !== "undefined" && !document.getElementById("lp-resp")) {
  const s = document.createElement("style");
  s.id = "lp-resp";
  s.textContent = `@media(max-width:880px){[data-lp-shell]{grid-template-columns:1fr !important}[data-lp-brand]{display:none !important}}`;
  document.head.appendChild(s);
}
