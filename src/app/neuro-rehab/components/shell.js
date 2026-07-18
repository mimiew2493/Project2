// ─── App Shell ────────────────────────────────────────────────────────────────
// Renders sidebar + topbar wrapper; injects page content inside .page-content.

export function createShell(container, { title, subtitle, activeNav }, renderContent) {
  const navItems = [
    { id: '#patients',  icon: '👥', label: 'รายชื่อผู้ป่วย' },
    { id: '#profile',   icon: '👤', label: 'โปรไฟล์' },
    { id: '#dashboard', icon: '📊', label: 'โปรแกรม' },
  ];

  container.innerHTML = `
    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div style="font-size:18px;font-weight:700;color:var(--accent);letter-spacing:0.02em;">
            NeuroRehab
          </div>
          <span>ระบบฟื้นฟูกล้ามเนื้อ</span>
        </div>

        <nav class="sidebar-nav">
          ${navItems.map(n => `
            <a href="${n.id}" class="nav-item ${activeNav === n.id ? 'active' : ''}">
              <span class="icon">${n.icon}</span>
              ${n.label}
            </a>
          `).join('')}
        </nav>

        <div style="margin-top:auto;padding:16px 18px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;">
          <div class="avatar" style="width:30px;height:30px;font-size:11px;">DR</div>
          <div>
            <div style="font-size:12.5px;font-weight:600;">นพ. สมชาย</div>
            <div style="font-size:11px;color:var(--text-muted);">แพทย์</div>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <div class="main-area">
        <header class="topbar">
          <div class="topbar-title">
            <span>${subtitle || 'ระบบฟื้นฟูกล้ามเนื้อด้วยสเก็ตบอร์ดแขน'}</span>
            <strong>${title}</strong>
          </div>
          <div class="topbar-actions">
            <button class="icon-btn" title="การแจ้งเตือน">🔔</button>
            <button class="icon-btn" title="การตั้งค่า">⚙️</button>
          </div>
        </header>

        <div class="page-content" id="page-content"></div>
      </div>
    </div>
  `;

  renderContent(container.querySelector('#page-content'));
}
