export function JobTrackerStyles() {
  return (
    <style>{`
:root {
  /* Editorial productivity palette — warm cream + ink + terracotta */
  --bg:#f5f1ea;
  --bg-elev:#ebe5da;
  --card:#fffdf9;
  --border:#e2dccf;
  --border2:#cfc7b5;
  --text:#16140f;
  --text2:#5a564c;
  --text3:#8c8678;
  --accent:#d94f1e;        /* terracotta */
  --accent2:#b73c10;
  --accent-bg:#fbe7dd;
  --accent-soft:#f6d3c2;
  --ink:#16140f;
  --ok:#3a7a3a;--ok-bg:#e6efde;
  --warn:#a86a00;--warn-bg:#f7e8c8;
  --err:#a52a18;--err-bg:#f6dad2;
  --info:#3a5fa8;--info-bg:#dde6f5;
  --plum:#6b3a86;--plum-bg:#ecdef3;
  --mute:#6b6660;--mute-bg:#ece7dc;
  --jt-display:'Instrument Serif',ui-serif,Georgia,serif;
  --jt-font:'Inter Tight',ui-sans-serif,system-ui,sans-serif;
  --jt-mono:'JetBrains Mono',ui-monospace,monospace;
  --r:8px;--r2:14px;--r3:22px;
  --shadow:0 1px 0 rgba(22,20,15,.04), 0 1px 2px rgba(22,20,15,.05);
  --shadow2:0 12px 32px -12px rgba(22,20,15,.18);
  --ring:0 0 0 3px rgba(217,79,30,.22);
}
html.dark {
  --bg:#100f0d;
  --bg-elev:#1a1815;
  --card:#1a1815;
  --border:#2a2620;
  --border2:#3a342c;
  --text:#f4efe5;
  --text2:#a39d8f;
  --text3:#6e6757;
  --accent:#ff6a3d;
  --accent2:#ff8a64;
  --accent-bg:#3a1a0d;
  --accent-soft:#4a2415;
  --ink:#f4efe5;
  --ok:#7fbf6a;--ok-bg:#15301a;
  --warn:#e6b450;--warn-bg:#3a2a0c;
  --err:#ff7a63;--err-bg:#3a160f;
  --info:#7aa2e3;--info-bg:#142035;
  --plum:#c79bd6;--plum-bg:#2a1535;
  --mute:#a39d8f;--mute-bg:#22201c;
  --shadow:0 1px 0 rgba(0,0,0,.4);
  --shadow2:0 16px 40px -12px rgba(0,0,0,.6);
  --ring:0 0 0 3px rgba(255,106,61,.28);
}

.jt {font-family:var(--jt-font);background:var(--bg);color:var(--text);min-height:100vh;font-size:14px;line-height:1.5;font-feature-settings:"ss01","cv11"}
.jt *{box-sizing:border-box}
.jt button{font-family:var(--jt-font);cursor:pointer;border:none;background:none;color:inherit}
.jt input,.jt select,.jt textarea{font-family:var(--jt-font);outline:none;color:var(--text)}

/* Layout */
.jt .app{display:flex;flex-direction:column;min-height:100vh}
.jt .topbar{display:flex;align-items:center;gap:18px;padding:14px 28px;background:var(--bg);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;backdrop-filter:saturate(140%) blur(8px)}
.jt .logo{font-family:var(--jt-display);font-weight:400;font-size:24px;letter-spacing:-.5px;color:var(--text);display:flex;align-items:center;gap:10px;font-style:italic}
.jt .logo-dot{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--accent-bg)}
.jt .topbar-tabs{display:flex;gap:2px;margin-left:8px;background:var(--bg-elev);padding:4px;border-radius:10px;border:1px solid var(--border)}
.jt .tab-btn{padding:6px 14px;border-radius:7px;font-size:13px;font-weight:500;color:var(--text2);transition:all .18s ease;letter-spacing:-.1px}
.jt .tab-btn:hover{color:var(--text)}
.jt .tab-btn.active{background:var(--card);color:var(--text);box-shadow:var(--shadow);font-weight:600}
.jt .topbar-actions{margin-left:auto;display:flex;align-items:center;gap:10px}

/* Buttons */
.jt .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9px;font-size:13px;font-weight:500;transition:all .15s;border:1px solid var(--border);color:var(--text);background:var(--card);letter-spacing:-.1px}
.jt .btn:hover{border-color:var(--border2);transform:translateY(-1px)}
.jt .btn-primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.jt .btn-primary:hover{background:var(--accent);border-color:var(--accent);color:#fff}
.jt .btn-ghost{background:transparent;color:var(--text2);border-color:transparent}
.jt .btn-ghost:hover{background:var(--bg-elev);color:var(--text)}
.jt .btn-sm{padding:6px 11px;font-size:12.5px}
.jt .btn-icon{width:34px;height:34px;padding:0;justify-content:center;border-radius:9px}

/* Main */
.jt .main{flex:1;padding:32px 28px 64px;max-width:1240px;margin:0 auto;width:100%}

/* Cards */
.jt .card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:22px;box-shadow:var(--shadow);transition:border-color .2s}
.jt .card:hover{border-color:var(--border2)}

/* Stats */
.jt .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:18px}
.jt .stat-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:20px;display:flex;flex-direction:column;gap:6px;position:relative;overflow:hidden}
.jt .stat-card::before{content:"";position:absolute;top:0;left:0;width:3px;height:24px;background:var(--accent);border-radius:0 4px 4px 0}
.jt .stat-card:nth-child(2)::before{background:var(--info)}
.jt .stat-card:nth-child(3)::before{background:var(--plum)}
.jt .stat-card:nth-child(4)::before{background:var(--ok)}
.jt .stat-label{font-size:10.5px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1.4px}
.jt .stat-val{font-family:var(--jt-display);font-size:42px;font-weight:400;color:var(--text);line-height:1;letter-spacing:-1.5px;margin-top:4px}
.jt .stat-sub{font-size:12px;color:var(--text2);margin-top:2px}
.jt .stat-accent{color:var(--accent)}

/* Charts grid */
.jt .charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
@media(max-width:780px){.jt .charts-grid{grid-template-columns:1fr}}

/* Section titles inside cards */
.jt .card .section-title,
.jt .card > div[style*="font-weight:600"]{font-family:var(--jt-display) !important;font-style:italic}

/* Platform bars */
.jt .platform-bar-wrap{display:flex;flex-direction:column;gap:10px}
.jt .platform-row{display:flex;align-items:center;gap:10px}
.jt .platform-name{font-size:12px;color:var(--text2);width:90px;flex-shrink:0;text-align:right;font-weight:500}
.jt .bar-track{flex:1;height:6px;background:var(--bg-elev);border-radius:99px;overflow:hidden}
.jt .bar-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.4,0,.2,1)}
.jt .bar-count{font-family:var(--jt-mono);font-size:11px;color:var(--text2);width:28px;text-align:right;font-weight:500}

/* Funnel */
.jt .funnel-table{width:100%;border-collapse:collapse}
.jt .funnel-table th{font-size:10.5px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1.2px;text-align:left;padding:8px 10px;border-bottom:1px solid var(--border)}
.jt .funnel-table td{padding:11px 10px;font-size:13px;border-bottom:1px solid var(--border);color:var(--text)}
.jt .funnel-table tr:last-child td{border-bottom:none}
.jt .funnel-bar-inline{height:5px;border-radius:99px;display:inline-block;vertical-align:middle;margin-left:8px;opacity:.85}

/* Goal */
.jt .goal-wrap{margin-bottom:18px}
.jt .goal-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.jt .goal-track{height:8px;background:var(--bg-elev);border-radius:99px;overflow:hidden}
.jt .goal-fill{height:100%;background:linear-gradient(90deg,var(--accent),#f0a07c);border-radius:99px;transition:width .8s cubic-bezier(.4,0,.2,1)}

/* List header */
.jt .list-header{display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap}
.jt .search-box{flex:1;min-width:200px;display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 12px;transition:all .15s}
.jt .search-box:focus-within{border-color:var(--accent);box-shadow:var(--ring)}
.jt .search-box input{background:none;border:none;font-size:13.5px;width:100%}
.jt .filter-select{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px 12px;font-size:13px;cursor:pointer;font-weight:500}
.jt .filter-select:focus{border-color:var(--accent);box-shadow:var(--ring)}

/* Job table */
.jt .job-table{width:100%;border-collapse:collapse}
.jt .job-table th{font-size:10.5px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1.2px;text-align:left;padding:10px 12px;border-bottom:1px solid var(--border);white-space:nowrap;background:var(--bg-elev)}
.jt .job-table th:first-child{border-radius:8px 0 0 0}
.jt .job-table th:last-child{border-radius:0 8px 0 0}
.jt .job-table td{padding:13px 12px;border-bottom:1px solid var(--border);font-size:13.5px;vertical-align:middle;color:var(--text)}
.jt .job-table tr:last-child td{border-bottom:none}
.jt .job-table tbody tr{transition:background .12s;cursor:pointer}
.jt .job-table tbody tr:hover td{background:var(--bg-elev)}

.jt .priority-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;display:inline-block;margin-right:8px;box-shadow:0 0 0 3px color-mix(in oklab,currentColor 12%,transparent)}
.jt .company-cell{display:flex;align-items:center;gap:11px}
.jt .company-avatar{width:32px;height:32px;border-radius:8px;background:var(--ink);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;color:var(--bg);flex-shrink:0;letter-spacing:.3px}
.jt .company-name{font-weight:600;color:var(--text);letter-spacing:-.1px}

/* Badges */
.jt .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:99px;font-size:11px;font-weight:600;white-space:nowrap;letter-spacing:.1px;border:1px solid transparent}
.jt .badge-applied{background:var(--info-bg);color:var(--info)}
.jt .badge-interview_scheduled{background:var(--plum-bg);color:var(--plum)}
.jt .badge-interviewed{background:var(--warn-bg);color:var(--warn)}
.jt .badge-offer_received{background:var(--ok-bg);color:var(--ok)}
.jt .badge-rejected{background:var(--err-bg);color:var(--err)}
.jt .badge-ghosted{background:var(--mute-bg);color:var(--mute)}

/* Modal */
.jt .modal-backdrop{position:fixed;inset:0;background:rgba(22,20,15,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);animation:jtFadeIn .2s ease}
.jt .modal{background:var(--card);border:1px solid var(--border);border-radius:var(--r3);padding:28px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow2);color:var(--text);animation:jtSlideUp .25s cubic-bezier(.2,.8,.2,1)}
.jt .modal-title{font-family:var(--jt-display);font-style:italic;font-size:26px;font-weight:400;margin-bottom:22px;display:flex;justify-content:space-between;align-items:center;letter-spacing:-.5px}
.jt .close-btn{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--text2);cursor:pointer;border:1px solid var(--border);background:var(--bg)}
.jt .close-btn:hover{background:var(--bg-elev);color:var(--text)}

/* Forms */
.jt .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:520px){.jt .form-grid{grid-template-columns:1fr}}
.jt .form-group{display:flex;flex-direction:column;gap:6px}
.jt .form-group.full{grid-column:1/-1}
.jt label{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:1px}
.jt .form-input{background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:10px 12px;font-size:13.5px;transition:all .15s;width:100%}
.jt .form-input:focus{border-color:var(--accent);box-shadow:var(--ring);background:var(--card)}
.jt textarea.form-input{resize:vertical;min-height:80px;font-family:inherit}
.jt .form-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}

/* Detail */
.jt .detail-section{margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--border)}
.jt .detail-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.jt .detail-label{font-size:10.5px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:6px}
.jt .detail-value{font-size:14.5px;color:var(--text)}
.jt .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.jt .timeline-item{display:flex;gap:12px;padding:8px 0;position:relative}
.jt .timeline-dot{width:9px;height:9px;border-radius:50%;background:var(--accent);margin-top:5px;flex-shrink:0;box-shadow:0 0 0 3px var(--accent-bg)}
.jt .timeline-line{position:absolute;left:4px;top:20px;bottom:-8px;width:1px;background:var(--border)}

/* Empty */
.jt .empty{text-align:center;padding:56px 20px;color:var(--text2)}
.jt .empty-icon{font-size:42px;margin-bottom:14px;opacity:.6}
.jt .empty-title{font-family:var(--jt-display);font-style:italic;font-size:22px;font-weight:400;color:var(--text);margin-bottom:6px;letter-spacing:-.4px}

/* Calendar */
.jt .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px}
.jt .cal-day-label{font-size:10px;color:var(--text3);text-align:center;font-weight:600;letter-spacing:.5px;text-transform:uppercase;padding:4px 0}
.jt .week-day-labels{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.jt .cal-day{aspect-ratio:1;min-height:30px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-family:var(--jt-mono);position:relative;cursor:default;color:var(--text3);background:var(--bg-elev)}
.jt .cal-day.today{outline:2px solid var(--accent);outline-offset:1px;color:var(--accent);font-weight:700}

/* Misc */
.jt .table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:var(--r2);background:var(--card)}
.jt .dark-toggle{width:40px;height:22px;background:var(--border2);border-radius:99px;position:relative;cursor:pointer;transition:background .2s}
.jt .dark-toggle.on{background:var(--ink)}
.jt .dark-toggle-thumb{width:16px;height:16px;background:var(--card);border-radius:50%;position:absolute;top:2px;left:3px;transition:left .18s ease;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.jt .dark-toggle.on .dark-toggle-thumb{left:21px;background:var(--accent)}

.jt .jt-footer{margin-top:auto;padding:24px 28px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:center;gap:10px;font-size:12px;color:var(--text3);letter-spacing:.2px;font-family:var(--jt-font)}
.jt .jt-footer-sep{opacity:.5}

@media(max-width:600px){
  .jt .topbar{flex-wrap:wrap;gap:10px;padding:12px 16px}
  .jt .main{padding:18px 16px 40px}
  .jt .stats-grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .jt .stat-card{padding:14px}
  .jt .stat-val{font-size:32px}
  .jt .job-table th:nth-child(4),.jt .job-table td:nth-child(4),
  .jt .job-table th:nth-child(5),.jt .job-table td:nth-child(5){display:none}
  .jt .modal{padding:20px}
}

@keyframes jtFadeIn{from{opacity:0}to{opacity:1}}
@keyframes jtSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.jt .fade-in{animation:jtFadeIn .25s ease}
`}</style>
  );
}
