// ─── Dashboard / Program Page ─────────────────────────────────────────────────
// Matches bottom-right "สมหมาย สายหัว / โปรแกรม" screen.

import { createShell } from '../components/shell.js';

export function renderDashboard(container) {
  createShell(container, {
    title: 'สมหมาย สายหัว',
    subtitle: 'ระบบฟื้นฟูกล้ามเนื้อด้วยสเก็ตบอร์ดแขน',
    activeNav: '#dashboard',
  }, (content) => {
    content.innerHTML = `
      <!-- Breadcrumb -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;font-size:13px;color:var(--text-muted);">
        <a href="#patients" style="color:var(--text-muted);">รายชื่อผู้ป่วย</a>
        <span>›</span>
        <a href="#profile" style="color:var(--text-muted);">โปรไฟล์ผู้ป่วย</a>
        <span>›</span>
        <span style="color:var(--text-primary);">โปรแกรมการรักษา</span>
        <a href="#profile" class="btn btn-outline btn-sm" style="margin-left:auto;">← แก้ไขโปรไฟล์</a>
      </div>

      <!-- Patient name banner -->
      <div class="card mb-16" style="display:flex;align-items:center;gap:16px;padding:16px 22px;">
        <div class="avatar" style="width:48px;height:48px;font-size:14px;">นส</div>
        <div>
          <div style="font-size:17px;font-weight:700;">สมหมาย สายหัว</div>
          <div class="text-sm text-muted">+เพิ่มโน้ต / ข้อมูลเพิ่มเติม — คลิก ตรง, พิง ลง</div>
        </div>
        <button class="btn btn-primary btn-sm" style="margin-left:auto;">+ จัดการ</button>
      </div>

      <!-- Main grid -->
      <div class="grid-2" style="align-items:start;gap:20px;">

        <!-- Left col: Stats + Chart -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Stat cards -->
          <div class="card">
            <div class="stat-row">
              <div class="stat-box">
                <div>
                  <span class="stat-value">0.45</span>
                  <span class="stat-unit">V/s</span>
                </div>
                <div class="stat-label">ความแรง EMG เฉลี่ย</div>
                <div class="progress-wrap mt-6">
                  <div class="progress-fill" style="width:45%;background:var(--accent);"></div>
                </div>
              </div>
              <div style="width:1px;background:var(--border);"></div>
              <div class="stat-box">
                <div>
                  <span class="stat-value" style="color:var(--success);">1,240</span>
                  <span class="stat-unit">ครั้ง</span>
                </div>
                <div class="stat-label">จำนวนครั้งการรักษา</div>
                <div class="progress-wrap mt-6">
                  <div class="progress-fill" style="width:78%;background:var(--success);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- IoT chart -->
          <div class="card">
            <div class="flex-between mb-16">
              <div>
                <div class="section-title" style="font-size:14px;">ข้อมูล IoT ด้านการวัดระหว่างการรักษา</div>
              </div>
              <select class="form-input" style="width:130px;padding:6px 10px;">
                <option>7 วันย้อนหลัง</option>
                <option>30 วันย้อนหลัง</option>
              </select>
            </div>

            <!-- SVG Sparkline -->
            <svg id="emg-chart" viewBox="0 0 480 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:140px;">
              <defs>
                <linearGradient id="emgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <!-- Grid lines -->
              <line x1="0" y1="35"  x2="480" y2="35"  stroke="#2E3F55" stroke-width="1"/>
              <line x1="0" y1="70"  x2="480" y2="70"  stroke="#2E3F55" stroke-width="1"/>
              <line x1="0" y1="105" x2="480" y2="105" stroke="#2E3F55" stroke-width="1"/>
              <!-- Area fill -->
              <path id="emg-area" fill="url(#emgGrad)"/>
              <!-- Line -->
              <path id="emg-line" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Y axis labels -->
              <text x="4" y="34"  fill="#4B657F" font-size="10">0.8</text>
              <text x="4" y="69"  fill="#4B657F" font-size="10">0.5</text>
              <text x="4" y="104" fill="#4B657F" font-size="10">0.2</text>
            </svg>

            <div id="chart-x-labels" style="display:flex;justify-content:space-between;margin-top:4px;padding:0 2px;font-size:10.5px;color:var(--text-muted);"></div>
          </div>

        </div>

        <!-- Right col: Program + Conditions -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Program selector -->
          <div class="card">
            <div class="flex-between mb-16">
              <div class="section-title" style="font-size:14px;">โปรแกรมฟื้นฟูผู้สูงอายุ</div>
              <a href="#patients" class="link-btn text-sm">← ดูทั้งหมด</a>
            </div>

            <div class="form-group">
              <label class="form-label">โปรแกรม</label>
              <select class="form-input" id="program-sel">
                <option value="A">Program A</option>
                <option value="B" selected>Program B</option>
                <option value="C">Program C</option>
              </select>
            </div>

            <div class="divider"></div>

            <div class="form-group">
              <label class="form-label">ข้อมูลเพิ่มเติม</label>
              <textarea class="form-input" rows="3" placeholder="บันทึกสำหรับแพทย์..." style="resize:none;"></textarea>
            </div>

            <button class="btn btn-primary mt-16" style="width:100%;justify-content:center;">
              📋 บันทึกโปรแกรมการรักษา
            </button>
          </div>

          <!-- Conditions panel -->
          <div class="card">
            <div class="section-title" style="font-size:14px;margin-bottom:14px;">สถานะเส้นเลือด</div>
            <div id="conditions-list" style="display:flex;flex-direction:column;gap:10px;"></div>
            <button class="btn btn-outline mt-16" style="width:100%;justify-content:center;">
              👁 ดูเพิ่มเติม
            </button>
          </div>

        </div>
      </div>
    `;

    drawChart(content);
    renderConditions(content);
    injectDashboardStyles();
  });
}

/* ── Chart drawing ───────────────────────────────────────────────────── */
function drawChart(content) {
  const raw = [0.28, 0.42, 0.38, 0.55, 0.48, 0.61, 0.45];
  const days = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];

  const W = 480, H = 140, padL = 30, padR = 10, padT = 10, padB = 25;
  const min = 0, max = 0.85;
  const pts = raw.map((v, i) => {
    const x = padL + (i / (raw.length - 1)) * (W - padL - padR);
    const y = padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
    return [x, y];
  });

  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const areaD = lineD + ` L${pts[pts.length-1][0]},${H} L${pts[0][0]},${H} Z`;

  const linePath = content.querySelector('#emg-line');
  const areaPath = content.querySelector('#emg-area');
  if (linePath) linePath.setAttribute('d', lineD);
  if (areaPath) areaPath.setAttribute('d', areaD);

  const xLabels = content.querySelector('#chart-x-labels');
  if (xLabels) xLabels.innerHTML = days.map(d => `<span>${d}</span>`).join('');
}

/* ── Conditions list ─────────────────────────────────────────────────── */
function renderConditions(content) {
  const items = [
    { label: 'ความดันโลหิต', value: '120/80 mmHg', status: 'green' },
    { label: 'ชีพจร',        value: '72 bpm',       status: 'green' },
    { label: 'อ้วนเกิน',     value: 'BMI 24.5',     status: 'yellow' },
  ];

  const list = content.querySelector('#conditions-list');
  if (!list) return;
  list.innerHTML = items.map(item => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--bg-mid);border-radius:var(--r-sm);border:1px solid var(--border);">
      <div style="font-size:13px;">${item.label}</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="badge badge-${item.status === 'green' ? 'green' : 'yellow'}">${item.value}</span>
      </div>
    </div>
  `).join('');
}

function injectDashboardStyles() {
  if (document.getElementById('dash-styles')) return;
  const s = document.createElement('style');
  s.id = 'dash-styles';
  s.textContent = `
    .mb-16 { margin-bottom: 16px; }
  `;
  document.head.appendChild(s);
}
