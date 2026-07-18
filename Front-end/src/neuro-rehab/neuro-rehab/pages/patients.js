// ─── Patient List Page ────────────────────────────────────────────────────────
// Matches bottom-left "รายชื่อผู้ป่วย" screen from the design reference.

import { createShell } from '../components/shell.js';

const PATIENTS = [
  { id: 'MK', name: 'สมชาย สายฟ้า', program: 'Sequence-1', date: '2023-12-5',  status: 'กำลังรักษา' },
  { id: 'NS', name: 'นาย สมหมาย',   program: 'Sequence-1', date: '2023-12-20', status: 'กำลังรักษา' },
  { id: 'AS', name: 'นายชัย วันใจ',  program: 'Sequence-1', date: '2023-12-31', status: 'กำลังรักษา' },
];

export function renderPatients(container) {
  createShell(container, {
    title: 'รายชื่อผู้ป่วย',
    subtitle: 'ระบบฟื้นฟูกล้ามเนื้อด้วยสเก็ตบอร์ดแขน',
    activeNav: '#patients',
  }, (content) => {
    content.innerHTML = `
      <div class="card" style="padding:0;overflow:hidden;">

        <!-- Table header row -->
        <div class="flex-between" style="padding:18px 22px;border-bottom:1px solid var(--border);">
          <div class="section-title">รายชื่อผู้ป่วย</div>
          <div style="display:flex;gap:10px;align-items:center;">
            <div style="position:relative;">
              <input class="form-input" id="search-input" type="text" placeholder="ค้นหาชื่อ, นามสกุล, รหัสผู้ป่วย ..." style="width:280px;padding-left:32px;" />
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:14px;">🔍</span>
            </div>
            <div class="form-input" style="width:160px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
              <span id="filter-text" style="color:var(--text-muted);">โปรแกรมการรักษา</span>
              <span style="color:var(--text-muted);">▾</span>
            </div>
            <div class="form-input" style="width:140px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
              <span id="status-text" style="color:var(--text-muted);">สถานะ</span>
              <span style="color:var(--text-muted);">▾</span>
            </div>
          </div>
        </div>

        <!-- Table -->
        <table class="data-table" id="patient-table">
          <thead>
            <tr>
              <th>ชื่อผู้ป่วย</th>
              <th>โปรแกรมการรักษา</th>
              <th>วันที่เริ่มการรักษา</th>
              <th>สถานะ</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="patient-tbody">
            ${PATIENTS.map(p => patientRow(p)).join('')}
          </tbody>
        </table>

        <!-- Pagination -->
        <div style="padding:14px 22px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <div class="text-sm text-muted">แสดง 3 รายการ</div>
          <div class="pagination">
            <button class="page-btn">‹</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">›</button>
          </div>
        </div>
      </div>
    `;

    // Search filter
    const input = content.querySelector('#search-input');
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      content.querySelectorAll('#patient-tbody tr').forEach(row => {
        const name = row.querySelector('.patient-name')?.textContent.toLowerCase() || '';
        row.style.display = name.includes(q) ? '' : 'none';
      });
    });

    // Row click → profile
    content.querySelectorAll('.row-link').forEach(btn => {
      btn.addEventListener('click', () => { window.location.hash = '#profile'; });
    });
  });
}

function patientRow(p) {
  return `
    <tr>
      <td>
        <div class="patient-cell">
          <div class="avatar">${p.id}</div>
          <div>
            <div class="patient-name">${p.name}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-blue">${p.program}</span></td>
      <td><span style="font-family:var(--font-mono);color:var(--text-secondary);font-size:13px;">${p.date}</span></td>
      <td><span class="badge badge-green">${p.status}</span></td>
      <td>
        <button class="btn btn-outline btn-sm row-link">รายละเอียด →</button>
      </td>
    </tr>
  `;
}
