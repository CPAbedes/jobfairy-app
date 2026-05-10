import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
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

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

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
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f7f6f3", fontFamily: "'DM Sans', system-ui, sans-serif", padding: 20,
    }}>
      <div style={{
        width: "100%", maxWidth: 380, background: "#fff", border: "1px solid #e8e4dd",
        borderRadius: 16, padding: 28, boxShadow: "0 4px 16px rgba(0,0,0,.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2563eb" }} />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-.5px" }}>JobTrackr</h1>
        </div>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#6b6860" }}>
          {mode === "signin" ? "Sign in to your account" : "Create a new account"}
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 12, color: "#6b6860", fontWeight: 500 }}>
            Email
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={inputStyle} placeholder="you@example.com" />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 12, color: "#6b6860", fontWeight: 500 }}>
            Password
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
              style={inputStyle} placeholder="••••••••" />
          </label>
          {err && <div style={{ fontSize: 12, color: "#dc2626", background: "#fef2f2", padding: "8px 10px", borderRadius: 8 }}>{err}</div>}
          {info && <div style={{ fontSize: 12, color: "#16a34a", background: "#f0fdf4", padding: "8px 10px", borderRadius: 8 }}>{info}</div>}
          <button type="submit" disabled={busy} style={{
            marginTop: 4, padding: "10px 14px", background: "#2563eb", color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14,
            cursor: busy ? "wait" : "pointer", opacity: busy ? 0.7 : 1,
          }}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#6b6860" }}>
          {mode === "signin" ? (
            <>No account?{" "}
              <button onClick={() => { setMode("signup"); setErr(null); setInfo(null); }}
                style={linkBtn}>Sign up</button>
            </>
          ) : (
            <>Have an account?{" "}
              <button onClick={() => { setMode("signin"); setErr(null); setInfo(null); }}
                style={linkBtn}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#f7f6f3", border: "1px solid #e8e4dd", borderRadius: 8,
  padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", color: "#1a1916",
};
const linkBtn: React.CSSProperties = {
  background: "none", border: "none", color: "#2563eb", cursor: "pointer",
  fontSize: 13, fontWeight: 600, padding: 0, fontFamily: "inherit",
};