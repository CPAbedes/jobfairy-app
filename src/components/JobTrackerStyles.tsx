export function JobTrackerStyles() {
  return (
    <style>{`
:root {
  --bg:#f7f6f3;--card:#fff;--border:#e8e4dd;--border2:#d4cfc7;
  --text:#1a1916;--text2:#6b6860;--text3:#9e9b96;
  --accent:#2563eb;--accent2:#1d4ed8;--accent-bg:#eff6ff;
  --green:#16a34a;--green-bg:#f0fdf4;
  --red:#dc2626;--red-bg:#fef2f2;
  --amber:#d97706;--amber-bg:#fffbeb;
  --blue:#2563eb;--blue-bg:#eff6ff;
  --purple:#7c3aed;--purple-bg:#f5f3ff;
  --gray:#6b7280;--gray-bg:#f9fafb;
  --jt-font:'DM Sans',sans-serif;
  --r:10px;--r2:14px;--r3:20px;
  --shadow:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --shadow2:0 4px 16px rgba(0,0,0,.08);
}
html.dark {
  --bg:#111110;--card:#1c1b19;--border:#2d2c29;--border2:#3d3c38;
  --text:#f0ede8;--text2:#a09d98;--text3:#6b6860;
  --accent:#3b82f6;--accent2:#60a5fa;--accent-bg:#1e3a5f;
  --green:#22c55e;--green-bg:#052e16;
  --red:#f87171;--red-bg:#450a0a;
  --amber:#fbbf24;--amber-bg:#451a03;
  --blue:#60a5fa;--blue-bg:#1e3a5f;
  --purple:#a78bfa;--purple-bg:#2e1065;
  --gray:#9ca3af;--gray-bg:#1f2937;
  --shadow:0 1px 3px rgba(0,0,0,.3);
  --shadow2:0 4px 16px rgba(0,0,0,.4);
}
.jt body, .jt {font-family:var(--jt-font);background:var(--bg);color:var(--text);min-height:100vh;font-size:14px;line-height:1.5}
.jt button{font-family:var(--jt-font);cursor:pointer;border:none;background:none}
.jt input,.jt select,.jt textarea{font-family:var(--jt-font);outline:none}
.jt .app{display:flex;flex-direction:column;min-height:100vh}
.jt .topbar{display:flex;align-items:center;gap:12px;padding:14px 20px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}
.jt .logo{font-weight:700;font-size:18px;letter-spacing:-.5px;color:var(--text);display:flex;align-items:center;gap:8px}
.jt .logo-dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}
.jt .topbar-tabs{display:flex;gap:4px;margin-left:8px}
.jt .tab-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:500;color:var(--text2);transition:all .15s;border:1px solid transparent}
.jt .tab-btn:hover{background:var(--bg);color:var(--text)}
.jt .tab-btn.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.jt .topbar-actions{margin-left:auto;display:flex;align-items:center;gap:8px}
.jt .btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:13px;font-weight:500;transition:all .15s;cursor:pointer;border:1px solid var(--border);color:var(--text)}
.jt .btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.jt .btn-primary:hover{background:var(--accent2)}
.jt .btn-ghost{background:transparent;color:var(--text2)}
.jt .btn-ghost:hover{background:var(--border);color:var(--text)}
.jt .btn-sm{padding:5px 10px;font-size:12px}
.jt .btn-icon{width:32px;height:32px;padding:0;justify-content:center;border-radius:8px}
.jt .main{flex:1;padding:20px;max-width:1200px;margin:0 auto;width:100%}
.jt .card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:18px;box-shadow:var(--shadow)}
.jt .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.jt .stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:16px;display:flex;flex-direction:column;gap:4px}
.jt .stat-label{font-size:11px;font-weight:500;color:var(--text3);text-transform:uppercase;letter-spacing:.6px}
.jt .stat-val{font-size:26px;font-weight:700;color:var(--text);line-height:1}
.jt .stat-sub{font-size:11px;color:var(--text2)}
.jt .stat-accent{color:var(--accent)}
.jt .charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
@media(max-width:700px){.jt .charts-grid{grid-template-columns:1fr}}
.jt .platform-bar-wrap{display:flex;flex-direction:column;gap:8px}
.jt .platform-row{display:flex;align-items:center;gap:8px}
.jt .platform-name{font-size:12px;color:var(--text2);width:80px;flex-shrink:0;text-align:right}
.jt .bar-track{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden}
.jt .bar-fill{height:100%;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1)}
.jt .bar-count{font-size:11px;color:var(--text3);width:24px;text-align:right}
.jt .funnel-table{width:100%;border-collapse:collapse}
.jt .funnel-table th{font-size:11px;font-weight:500;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;text-align:left;padding:6px 8px;border-bottom:1px solid var(--border)}
.jt .funnel-table td{padding:7px 8px;font-size:13px;border-bottom:1px solid var(--border)}
.jt .funnel-table tr:last-child td{border-bottom:none}
.jt .funnel-bar-inline{height:6px;border-radius:3px;display:inline-block;vertical-align:middle;margin-left:6px}
.jt .goal-wrap{margin-bottom:20px}
.jt .goal-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
.jt .goal-track{height:10px;background:var(--border);border-radius:5px;overflow:hidden}
.jt .goal-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--green));border-radius:5px;transition:width .8s cubic-bezier(.4,0,.2,1)}
.jt .list-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap}
.jt .search-box{flex:1;min-width:160px;display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:6px 10px}
.jt .search-box input{background:none;border:none;color:var(--text);font-size:13px;width:100%}
.jt .filter-select{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:13px;color:var(--text);cursor:pointer}
.jt .job-table{width:100%;border-collapse:collapse}
.jt .job-table th{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);white-space:nowrap}
.jt .job-table td{padding:10px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle;color:var(--text)}
.jt .job-table tr:last-child td{border-bottom:none}
.jt .job-table tbody tr{transition:background .1s;cursor:pointer}
.jt .job-table tbody tr:hover td{background:var(--bg)}
.jt .priority-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;display:inline-block;margin-right:6px}
.jt .company-cell{display:flex;align-items:center;gap:10px}
.jt .company-avatar{width:28px;height:28px;border-radius:6px;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;color:var(--accent);flex-shrink:0}
.jt .company-name{font-weight:500;color:var(--text)}
.jt .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}
.jt .badge-applied{background:var(--blue-bg);color:var(--blue)}
.jt .badge-interview_scheduled{background:var(--purple-bg);color:var(--purple)}
.jt .badge-interviewed{background:var(--amber-bg);color:var(--amber)}
.jt .badge-offer_received{background:var(--green-bg);color:var(--green)}
.jt .badge-rejected{background:var(--red-bg);color:var(--red)}
.jt .badge-ghosted{background:var(--gray-bg);color:var(--gray)}
.jt .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(2px)}
.jt .modal{background:var(--card);border:1px solid var(--border);border-radius:var(--r3);padding:24px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow2);color:var(--text)}
.jt .modal-title{font-size:17px;font-weight:700;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}
.jt .close-btn{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--text2);cursor:pointer;border:1px solid var(--border);background:var(--bg)}
.jt .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:500px){.jt .form-grid{grid-template-columns:1fr}}
.jt .form-group{display:flex;flex-direction:column;gap:5px}
.jt .form-group.full{grid-column:1/-1}
.jt label{font-size:12px;font-weight:500;color:var(--text2)}
.jt .form-input{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:13px;color:var(--text);transition:border-color .15s;width:100%}
.jt .form-input:focus{border-color:var(--accent)}
.jt textarea.form-input{resize:vertical;min-height:70px}
.jt .form-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;padding-top:16px;border-top:1px solid var(--border)}
.jt .detail-section{margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.jt .detail-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.jt .detail-label{font-size:11px;font-weight:500;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.jt .detail-value{font-size:14px;color:var(--text)}
.jt .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.jt .timeline-item{display:flex;gap:10px;padding:8px 0;position:relative}
.jt .timeline-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);margin-top:4px;flex-shrink:0}
.jt .timeline-line{position:absolute;left:3.5px;top:18px;bottom:-8px;width:1px;background:var(--border)}
.jt .empty{text-align:center;padding:40px 20px;color:var(--text2)}
.jt .empty-icon{font-size:36px;margin-bottom:12px}
.jt .empty-title{font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px}
.jt .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-top:8px}
.jt .cal-day-label{font-size:10px;color:var(--text3);text-align:center}
.jt .week-day-labels{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.jt .cal-day{min-height:28px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;position:relative;cursor:default;color:var(--text2)}
.jt .cal-day.today{outline:2px solid var(--accent);outline-offset:-2px}
.jt .table-wrap{overflow-x:auto}
.jt .dark-toggle{width:36px;height:20px;background:var(--border2);border-radius:10px;position:relative;cursor:pointer;transition:background .2s;border:1px solid var(--border2)}
.jt .dark-toggle.on{background:var(--accent)}
.jt .dark-toggle-thumb{width:14px;height:14px;background:#fff;border-radius:50%;position:absolute;top:2px;left:2px;transition:left .15s}
.jt .dark-toggle.on .dark-toggle-thumb{left:18px}
@media(max-width:600px){
.jt .topbar{flex-wrap:wrap;gap:8px}
.jt .main{padding:12px}
.jt .stats-grid{grid-template-columns:repeat(2,1fr)}
.jt .job-table th:nth-child(4),.jt .job-table td:nth-child(4),
.jt .job-table th:nth-child(5),.jt .job-table td:nth-child(5){display:none}
}
@keyframes jtFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.jt .fade-in{animation:jtFadeIn .2s ease}
`}</style>
  );
}