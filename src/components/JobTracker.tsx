import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { JobTrackerStyles } from "./JobTrackerStyles";

const STATUSES = ["Applied", "Interview Scheduled", "Interviewed", "Offer Received", "Rejected", "Ghosted"] as const;
const PRIORITIES = ["low", "medium", "high", "urgent"] as const;
const PLATFORMS_COMMON = ["LinkedIn", "Indeed", "Upwork", "OnlineJobsPh", "Facebook", "Threads", "Glassdoor", "Greenhouse", "Lever", "Freelancer", "Fiverr", "Toptal", "Company Website", "Referral", "Twitter/X", "Direct", "Other"];
const PLATFORMS_CORP = PLATFORMS_COMMON;
const PLATFORMS_FREE = PLATFORMS_COMMON;
const STATUS_KEY: Record<string, string> = { "Applied": "applied", "Interview Scheduled": "interview_scheduled", "Interviewed": "interviewed", "Offer Received": "offer_received", "Rejected": "rejected", "Ghosted": "ghosted" };
const STATUS_LABEL: Record<string, string> = { "applied": "Applied", "interview_scheduled": "Interview Scheduled", "interviewed": "Interviewed", "offer_received": "Offer Received", "rejected": "Rejected", "ghosted": "Ghosted" };
const PRIORITY_COLOR: Record<string, string> = { "low": "#86efac", "medium": "#fde68a", "high": "#fb923c", "urgent": "#f87171" };
const PLATFORM_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

type App = {
  id: string;
  user_id: string;
  type: string;
  company: string;
  title: string;
  date_applied: string;
  status: string;
  interview_date: string | null;
  salary: string | null;
  platform: string | null;
  link: string | null;
  notes: string | null;
  priority: string;
  history: Array<{ status: string; date: string; note: string }>;
};

type FormData = {
  type: string;
  company: string;
  title: string;
  date_applied: string;
  status: string;
  interview_date: string;
  salary: string;
  platform: string;
  link: string;
  notes: string;
  priority: string;
};

function todayISO() { return new Date().toISOString().split("T")[0]; }
function getWeekStart(d: Date) { const s = new Date(d); s.setDate(s.getDate() - s.getDay()); s.setHours(0, 0, 0, 0); return s; }
function initials(s: string) { return (s || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); }
function fmtDate(s: string | null) { return s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"; }

export function JobTracker() {
  const { user, signOut } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"dashboard" | "corporate" | "freelance">("dashboard");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [editing, setEditing] = useState<App | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [viewing, setViewing] = useState<App | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("jt_dark") === "1";
    setDark(stored);
    if (stored) document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    setLoading(true);
    supabase.from("job_applications").select("*").order("date_applied", { ascending: false }).then(({ data, error }) => {
      if (!alive) return;
      if (error) console.error(error);
      setApps((data as unknown as App[] | null) ?? []);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [user]);

  const toggleDark = () => {
    const v = !dark; setDark(v);
    document.documentElement.classList.toggle("dark", v);
    if (typeof window !== "undefined") localStorage.setItem("jt_dark", v ? "1" : "0");
  };

  const filtered = useMemo(() => {
    const type = tab === "dashboard" ? "all" : tab;
    const q = search.toLowerCase();
    return apps.filter(a => {
      const t = type === "all" || a.type === type;
      const s = filterStatus === "all" || a.status === filterStatus;
      const sm = !q || a.company.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || (a.platform || "").toLowerCase().includes(q);
      return t && s && sm;
    });
  }, [apps, tab, filterStatus, search]);

  const handleSave = async (form: FormData, editId: string | null) => {
    if (!user) return;
    const payload = {
      user_id: user.id,
      type: form.type,
      company: form.company.trim(),
      title: form.title.trim(),
      date_applied: form.date_applied,
      status: form.status,
      interview_date: form.interview_date || null,
      salary: form.salary.trim() || null,
      platform: form.platform || null,
      link: form.link.trim() || null,
      notes: form.notes.trim() || null,
      priority: form.priority,
    };
    if (editId) {
      const old = apps.find(a => a.id === editId);
      let history = old?.history ?? [];
      if (old && old.status !== form.status) {
        history = [...history, { status: form.status, date: todayISO(), note: `Status changed to ${STATUS_LABEL[form.status]}` }];
      }
      const { data, error } = await supabase.from("job_applications").update({ ...payload, history }).eq("id", editId).select().single();
      if (error) { alert(error.message); return; }
      setApps(prev => prev.map(a => a.id === editId ? (data as unknown as App) : a));
    } else {
      const history = [{ status: form.status, date: form.date_applied, note: "Application submitted" }];
      const { data, error } = await supabase.from("job_applications").insert({ ...payload, history }).select().single();
      if (error) { alert(error.message); return; }
      setApps(prev => [data as unknown as App, ...prev]);
    }
    setEditing(null); setAdding(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    setApps(prev => prev.filter(a => a.id !== id));
    setViewing(null);
  };

  return (
    <div className="jt">
      <JobTrackerStyles />
      <div className="app">
        <nav className="topbar">
          <div className="logo"><span className="logo-dot" />JobTrackr</div>
          <div className="topbar-tabs">
            {(["dashboard", "corporate", "freelance"] as const).map(t => (
              <button key={t} className={`tab-btn${tab === t ? " active" : ""}`}
                onClick={() => { setTab(t); setFilterStatus("all"); setSearch(""); }}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="topbar-actions">
            <button className="btn btn-primary btn-sm" onClick={() => setAdding(tab === "freelance" ? "freelance" : "corporate")}>＋ Add Application</button>
            <div className={`dark-toggle${dark ? " on" : ""}`} onClick={toggleDark}><div className="dark-toggle-thumb" /></div>
            <button className="btn btn-ghost btn-sm" onClick={() => signOut()} title={user?.email}>Sign out</button>
          </div>
        </nav>
        <main className="main fade-in">
          {loading ? (
            <div className="empty"><div className="empty-icon">⏳</div><div className="empty-title">Loading…</div></div>
          ) : tab === "dashboard" ? (
            <Dashboard apps={apps} onView={setViewing} onAdd={() => setAdding("corporate")} />
          ) : (
            <ListView
              type={tab}
              filtered={filtered}
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              onAdd={() => setAdding(tab)}
              onView={setViewing}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </main>
        <footer className="jt-footer">
          <span>JobTrackr™</span>
          <span className="jt-footer-sep">·</span>
          <span>Created by Christian Paul Abedes</span>
        </footer>
      </div>
      {(adding || editing) && (
        <FormModal
          initial={editing ?? undefined}
          defaultType={editing?.type ?? adding ?? "corporate"}
          onClose={() => { setAdding(null); setEditing(null); }}
          onSave={handleSave}
        />
      )}
      {viewing && (
        <DetailModal app={viewing} onClose={() => setViewing(null)} onEdit={() => { setEditing(viewing); setViewing(null); }} onDelete={() => handleDelete(viewing.id)} />
      )}
    </div>
  );
}

function Dashboard({ apps, onView, onAdd }: { apps: App[]; onView: (a: App) => void; onAdd: () => void }) {
  const [dayModal, setDayModal] = useState<{ date: string; apps: App[] } | null>(null);
  const corp = apps.filter(a => a.type === "corporate");
  const free = apps.filter(a => a.type === "freelance");
  const interviews = apps.filter(a => a.status === "interview_scheduled" || a.status === "interviewed").length;
  const offers = apps.filter(a => a.status === "offer_received").length;
  const responded = apps.filter(a => a.status !== "applied" && a.status !== "ghosted").length;
  const rateStr = apps.length ? Math.round(responded / apps.length * 100) + "%" : "0%";
  const weekStart = getWeekStart(new Date());
  const weekApps = apps.filter(a => new Date(a.date_applied) >= weekStart).length;
  const todayApps = apps.filter(a => new Date(a.date_applied).toDateString() === new Date().toDateString()).length;
  const goalPct = Math.min(100, Math.round(todayApps / 7 * 100));

  const stages = [
    { s: "applied", label: "Applied" },
    { s: "interview_scheduled", label: "Interview Scheduled" },
    { s: "interviewed", label: "Interviewed" },
    { s: "offer_received", label: "Offer Received" },
  ];
  const funnel = stages.map(st => ({ ...st, count: apps.filter(a => a.status === st.s).length }));
  const topCount = funnel[0].count || 1;

  const platMap: Record<string, number> = {};
  apps.forEach(a => { if (a.platform) platMap[a.platform] = (platMap[a.platform] || 0) + 1; });
  const platforms = Object.entries(platMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxP = platforms[0]?.[1] ?? 1;

  // Response rate per platform
  const platStats: Record<string, { total: number; responded: number }> = {};
  apps.forEach(a => {
    const p = a.platform || "Unknown";
    if (!platStats[p]) platStats[p] = { total: 0, responded: 0 };
    platStats[p].total += 1;
    if (a.status !== "applied" && a.status !== "ghosted") platStats[p].responded += 1;
  });
  const platRates = Object.entries(platStats)
    .map(([name, v]) => ({ name, total: v.total, responded: v.responded, rate: v.total ? Math.round((v.responded / v.total) * 100) : 0 }))
    .sort((a, b) => b.rate - a.rate || b.total - a.total);
  const bestPlat = platRates[0];

  // Mini calendar
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const appByDay: Record<number, number> = {};
  apps.forEach(a => {
    const d = new Date(a.date_applied);
    if (d.getFullYear() === year && d.getMonth() === month) appByDay[d.getDate()] = (appByDay[d.getDate()] || 0) + 1;
  });

  // Week activity
  const weekDays: Date[] = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); weekDays.push(d); }
  const dayCounts = weekDays.map(d => apps.filter(a => new Date(a.date_applied).toDateString() === d.toDateString()).length);
  const maxDay = Math.max(1, ...dayCounts);
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const openDay = (d: number) => {
    const dayApps = apps.filter(a => {
      const dt = new Date(a.date_applied);
      return dt.getFullYear() === year && dt.getMonth() === month && dt.getDate() === d;
    });
    if (!dayApps.length) return;
    const label = new Date(year, month, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    setDayModal({ date: label, apps: dayApps });
  };

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total Applications</div><div className="stat-val">{apps.length}</div><div className="stat-sub">{corp.length} corporate · {free.length} freelance</div></div>
        <div className="stat-card"><div className="stat-label">Response Rate</div><div className="stat-val stat-accent">{rateStr}</div><div className="stat-sub">{responded} responded</div></div>
        <div className="stat-card"><div className="stat-label">Active Interviews</div><div className="stat-val">{interviews}</div><div className="stat-sub">{offers} offer{offers !== 1 ? "s" : ""} received</div></div>
        <div className="stat-card"><div className="stat-label">Today's Apps</div><div className="stat-val">{todayApps}</div><div className="stat-sub">Goal: 5–10 per day</div></div>
      </div>

      <div className="card goal-wrap" style={{ marginBottom: 16 }}>
        <div className="goal-header"><span style={{ fontSize: 13, fontWeight: 600 }}>Daily Goal Progress</span><span style={{ fontSize: 12, color: "var(--text2)" }}>{todayApps} / 7 today &nbsp; · &nbsp; {weekApps} this week</span></div>
        <div className="goal-track"><div className="goal-fill" style={{ width: `${goalPct}%` }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--text3)" }}>
          <span>0</span><span style={{ color: "var(--accent)" }}>5 (min)</span><span>10 (target)</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Applications by Platform</div>
          <div className="platform-bar-wrap">
            {platforms.length ? platforms.map((p, i) => (
              <div key={p[0]} className="platform-row">
                <div className="platform-name">{p[0]}</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.round(p[1] / maxP * 100)}%`, background: PLATFORM_COLORS[i % PLATFORM_COLORS.length] }} /></div>
                <div className="bar-count">{p[1]}</div>
              </div>
            )) : <div style={{ color: "var(--text3)", fontSize: 13, padding: "16px 0", textAlign: "center" }}>No data yet</div>}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Conversion Funnel</div>
          <table className="funnel-table">
            <thead><tr><th>Stage</th><th>Count</th><th>Rate</th></tr></thead>
            <tbody>
              {funnel.map((f, i) => (
                <tr key={f.s}>
                  <td>{f.label}</td>
                  <td style={{ fontWeight: 600 }}>{f.count}</td>
                  <td style={{ fontSize: 12, color: "var(--text2)" }}>
                    {topCount ? Math.round(f.count / topCount * 100) + "%" : "—"}
                    <span className="funnel-bar-inline" style={{ width: topCount ? Math.round(f.count / topCount * 60) : 0, background: PLATFORM_COLORS[i] }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Response Rate by Platform</div>
          {bestPlat && bestPlat.total > 0 && (
            <div style={{ fontSize: 12, color: "var(--text2)" }}>
              Best performer: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{bestPlat.name}</span> ({bestPlat.rate}%)
            </div>
          )}
        </div>
        {platRates.length ? (
          <div className="platform-bar-wrap">
            {platRates.map((p, i) => (
              <div key={p.name} className="platform-row">
                <div className="platform-name">{p.name}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.max(2, p.rate)}%`, background: PLATFORM_COLORS[i % PLATFORM_COLORS.length] }} />
                </div>
                <div className="bar-count" style={{ minWidth: 90, textAlign: "right" }}>
                  {p.rate}% <span style={{ color: "var(--text3)", fontWeight: 400 }}>({p.responded}/{p.total})</span>
                </div>
              </div>
            ))}
          </div>
        ) : <div style={{ color: "var(--text3)", fontSize: 13, padding: "16px 0", textAlign: "center" }}>No data yet</div>}
      </div>

      <div className="charts-grid">
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Mini Calendar — Applications</div>
          <div className="week-day-labels">{dayLabels.map(d => <div key={d} className="cal-day-label">{d}</div>)}</div>
          <div className="cal-grid">
            {Array.from({ length: first }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: days }, (_, i) => i + 1).map(d => {
              const count = appByDay[d] || 0;
              const isToday = d === now.getDate();
              const intensity = count ? Math.min(1, count / 5) : 0;
              const style: React.CSSProperties = count ? { background: `color-mix(in oklab, var(--accent) ${15 + intensity * 65}%, var(--bg-elev))`, color: "#fff", fontWeight: 700, cursor: "pointer" } : {};
              return <div key={d} className={`cal-day${isToday ? " today" : ""}`} style={style} title={count ? `${count} app${count > 1 ? "s" : ""} — click to view` : "No apps"} onClick={() => openDay(d)}>{d}</div>;
            })}
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8, textAlign: "center" }}>{now.toLocaleString("default", { month: "long" })} {year}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Week Activity</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, padding: "0 4px" }}>
            {weekDays.map((d, i) => {
              const count = dayCounts[i];
              const pct = Math.max(8, Math.round(count / maxDay * 100));
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: count ? "var(--accent)" : "var(--text3)" }}>{count || ""}</div>
                  <div style={{ width: "100%", height: `${pct}%`, background: isToday ? "var(--accent)" : "var(--border2)", borderRadius: "3px 3px 0 0", minHeight: 4, transition: "height .4s" }} />
                  <div style={{ fontSize: 10, color: isToday ? "var(--accent)" : "var(--text3)" }}>{dayLabels[d.getDay()]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Recent Applications</div>
        {apps.length ? <JobTable list={apps.slice(0, 8)} onView={onView} onEdit={() => {}} onDelete={() => {}} hideActions /> :
          <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">No applications yet</div><div>Add your first application to get started.</div><br /><button className="btn btn-primary" onClick={onAdd}>＋ Add Application</button></div>
        }
      </div>

      {dayModal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setDayModal(null); }}>
          <div className="modal fade-in" style={{ maxWidth: 600 }}>
            <div className="modal-title">
              <div>
                <div>Applications</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: "var(--text2)" }}>{dayModal.date} · {dayModal.apps.length} app{dayModal.apps.length > 1 ? "s" : ""}</div>
              </div>
              <button className="close-btn" onClick={() => setDayModal(null)}>×</button>
            </div>
            <div style={{ padding: 0, overflow: "hidden" }}>
              <JobTable list={dayModal.apps} onView={(a) => { setDayModal(null); onView(a); }} onEdit={() => {}} onDelete={() => {}} hideActions />
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setDayModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ListView({ type, filtered, search, setSearch, filterStatus, setFilterStatus, onAdd, onView, onEdit, onDelete }: {
  type: "corporate" | "freelance"; filtered: App[]; search: string; setSearch: (v: string) => void;
  filterStatus: string; setFilterStatus: (v: string) => void; onAdd: () => void;
  onView: (a: App) => void; onEdit: (a: App) => void; onDelete: (id: string) => void;
}) {
  const label = type === "corporate" ? "Corporate" : "Freelance";
  return (
    <>
      <div className="list-header">
        <div style={{ fontSize: 16, fontWeight: 700 }}>{label} Applications</div>
        <div className="search-box"><span style={{ color: "var(--text3)" }}>🔍</span><input placeholder="Search company, title…" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          {STATUSES.map(s => <option key={s} value={STATUS_KEY[s]}>{s}</option>)}
        </select>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {filtered.length ? <div className="table-wrap"><JobTable list={filtered} onView={onView} onEdit={onEdit} onDelete={onDelete} /></div> :
          <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">No applications yet</div><div>Add your first {label.toLowerCase()} application to get started.</div><br /><button className="btn btn-primary" onClick={onAdd}>＋ Add Application</button></div>
        }
      </div>
    </>
  );
}

function JobTable({ list, onView, onEdit, onDelete, hideActions }: { list: App[]; onView: (a: App) => void; onEdit: (a: App) => void; onDelete: (id: string) => void; hideActions?: boolean }) {
  return (
    <table className="job-table">
      <thead><tr><th>Company</th><th>Position</th><th>Status</th><th>Date</th><th>Platform</th><th>Priority</th>{!hideActions && <th></th>}</tr></thead>
      <tbody>
        {list.map(a => {
          const statusKey = a.status || "applied";
          return (
            <tr key={a.id} onClick={() => onView(a)}>
              <td>
                <div className="company-cell">
                  <div className="company-avatar">{initials(a.company)}</div>
                  <div>
                    <div className="company-name">{a.company}</div>
                    {a.link && <a href={a.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 10, color: "var(--accent)" }}>🔗 View post</a>}
                  </div>
                </div>
              </td>
              <td style={{ fontWeight: 500 }}>{a.title}</td>
              <td><span className={`badge badge-${statusKey}`}>{STATUS_LABEL[statusKey]}</span></td>
              <td style={{ color: "var(--text2)" }}>{fmtDate(a.date_applied)}</td>
              <td style={{ color: "var(--text2)" }}>{a.platform || "—"}</td>
              <td><span className="priority-dot" style={{ background: PRIORITY_COLOR[a.priority] || "#ccc" }} />{a.priority}</td>
              {!hideActions && (
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(a)} title="Edit">✏️</button>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(a.id)} title="Delete">🗑️</button>
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function FormModal({ initial, defaultType, onClose, onSave }: {
  initial?: App; defaultType: string; onClose: () => void;
  onSave: (form: FormData, editId: string | null) => void;
}) {
  const [form, setForm] = useState<FormData>({
    type: initial?.type ?? defaultType,
    company: initial?.company ?? "",
    title: initial?.title ?? "",
    date_applied: initial?.date_applied ?? todayISO(),
    status: initial?.status ?? "applied",
    interview_date: initial?.interview_date ?? "",
    salary: initial?.salary ?? "",
    platform: initial?.platform ?? (defaultType === "freelance" ? PLATFORMS_FREE[0] : PLATFORMS_CORP[0]),
    link: initial?.link ?? "",
    notes: initial?.notes ?? "",
    priority: initial?.priority ?? "medium",
  });
  const platforms = form.type === "freelance" ? PLATFORMS_FREE : PLATFORMS_CORP;
  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => setForm(f => ({ ...f, [k]: v }));
  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    if (submitting) return;
    if (!form.company.trim() || !form.title.trim() || !form.date_applied) {
      alert("Please fill in company, title, and date."); return;
    }
    setSubmitting(true);
    try {
      await onSave(form, initial?.id ?? null);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal fade-in">
        <div className="modal-title">{initial ? "Edit Application" : "New Application"}<button className="close-btn" onClick={onClose}>×</button></div>
        <div className="form-grid">
          <div className="form-group"><label>Type</label>
            <select className="form-input" value={form.type} onChange={e => update("type", e.target.value)}>
              <option value="corporate">Corporate</option><option value="freelance">Freelance</option>
            </select>
          </div>
          <div className="form-group"><label>Priority</label>
            <select className="form-input" value={form.priority} onChange={e => update("priority", e.target.value)}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div className="form-group full"><label>Company Name *</label><input className="form-input" value={form.company} onChange={e => update("company", e.target.value)} placeholder="e.g. Acme Corp" /></div>
          <div className="form-group full"><label>Job Title / Position *</label><input className="form-input" value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Senior Frontend Developer" /></div>
          <div className="form-group"><label>Date Applied *</label><input className="form-input" type="date" value={form.date_applied} onChange={e => update("date_applied", e.target.value)} /></div>
          <div className="form-group"><label>Status</label>
            <select className="form-input" value={form.status} onChange={e => update("status", e.target.value)}>
              {STATUSES.map(s => <option key={s} value={STATUS_KEY[s]}>{s}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Interview Date (optional)</label><input className="form-input" type="date" value={form.interview_date} onChange={e => update("interview_date", e.target.value)} /></div>
          <div className="form-group"><label>Salary / Rate (optional)</label><input className="form-input" value={form.salary} onChange={e => update("salary", e.target.value)} placeholder="e.g. ₱50k/mo or $25/hr" /></div>
          <div className="form-group"><label>Platform</label>
            <select className="form-input" value={form.platform} onChange={e => update("platform", e.target.value)}>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Link to Job Posting (optional)</label><input className="form-input" value={form.link} onChange={e => update("link", e.target.value)} placeholder="https://..." /></div>
          <div className="form-group full"><label>Notes / Next Steps</label><textarea className="form-input" value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Any notes, follow-up actions…" /></div>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={submitting}>
            {submitting ? "Saving…" : initial ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ app, onClose, onEdit, onDelete }: { app: App; onClose: () => void; onEdit: () => void; onDelete: () => void }) {
  const statusKey = app.status || "applied";
  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal fade-in" style={{ maxWidth: 500 }}>
        <div className="modal-title">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="company-avatar" style={{ width: 36, height: 36, fontSize: 13 }}>{initials(app.company)}</div>
            <div>
              <div>{app.company}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "var(--text2)" }}>{app.title}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="detail-section">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <span className={`badge badge-${statusKey}`}>{STATUS_LABEL[statusKey]}</span>
            <span style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
              <span className="priority-dot" style={{ background: PRIORITY_COLOR[app.priority] || "#ccc" }} />{app.priority}
            </span>
            <span style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{app.type}</span>
          </div>
          <div className="detail-grid">
            <div><div className="detail-label">Date Applied</div><div className="detail-value">{app.date_applied || "—"}</div></div>
            <div><div className="detail-label">Platform</div><div className="detail-value">{app.platform || "—"}</div></div>
            {app.interview_date && <div><div className="detail-label">Interview Date</div><div className="detail-value">{app.interview_date}</div></div>}
            {app.salary && <div><div className="detail-label">Salary / Rate</div><div className="detail-value">{app.salary}</div></div>}
          </div>
          {app.link && <div style={{ marginTop: 10 }}><a href={app.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: 13 }}>🔗 View job posting</a></div>}
        </div>
        {app.notes && (
          <div className="detail-section">
            <div className="detail-label">Notes / Next Steps</div>
            <div className="detail-value" style={{ marginTop: 6, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{app.notes}</div>
          </div>
        )}
        <div className="detail-section">
          <div className="detail-label" style={{ marginBottom: 10 }}>Application Timeline</div>
          <div>
            {(app.history || []).map((h, i, arr) => (
              <div key={i} className="timeline-item">
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div className="timeline-dot" />
                  {i < arr.length - 1 && <div className="timeline-line" />}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{STATUS_LABEL[h.status] || h.status}</div>
                  <div style={{ fontSize: 11, color: "var(--text2)" }}>{h.note || ""}{h.date ? " · " + h.date : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={onDelete} style={{ color: "var(--red)" }}>🗑️ Delete</button>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onEdit}>✏️ Edit</button>
        </div>
      </div>
    </div>
  );
}