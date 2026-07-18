// ─── Patient Profile Page ─────────────────────────────────────────────────────
// Matches top-right "ดูรายละเอียดแต่ละคน" screen.

import { createShell } from '../components/shell.js';

export function renderProfile(container) {
  createShell(container, {
    title: 'โปรไฟล์ผู้ป่วย',
    subtitle: 'ระบบฟื้นฟูกล้ามเนื้อด้วยสเก็ตบอร์ดแขน',
    activeNav: '#profile',
  }, (content) => {
    content.innerHTML = `
      <!-- Back button -->
      <div style="margin-bottom:20px;">
        <a href="#patients" class="btn btn-outline btn-sm">← กลับรายชื่อผู้ป่วย</a>
      </div>

      <div class="grid-2" style="align-items:start;">

        <!-- Left: Profile card -->
        <div>
          <div class="card">
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
              <div class="avatar" style="width:60px;height:60px;font-size:18px;">MK</div>
              <div>
                <div style="font-size:19px;font-weight:700;">Annonymous Jumine</div>
                <div class="text-sm text-muted">ผู้ป่วย</div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="grid-2 gap-10" style="margin-top:14px;">
              ${field('Full Name (TH)','สมชาย สายฟ้า')}
              ${field('สมชาย ไทย','สมชาย ไทย')}
              ${field('Email Address','s.jumine@phat.org')}
              ${field('Phone Number','+66-02-445-200X')}
            </div>

            <div class="mt-16">
              ${field('เลขบัตรประชาชน','1923068503020505')}
            </div>

            <div class="mt-16">
              <button class="btn btn-primary" style="width:100%;justify-content:center;">
                ✏️  แก้ไขโปรไฟล์ (แก้ไขข้อมูล)
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Tabs + info -->
        <div>
          <div class="card" style="padding:0;overflow:hidden;">
            <!-- Tabs -->
            <div class="profile-tabs" id="tabs">
              <button class="ptab active" data-tab="info">ข้อมูลทั่วไป</button>
              <button class="ptab" data-tab="programs">โปรไฟล์</button>
              <button class="ptab" data-tab="history">โปรไฟล์</button>
            </div>

            <div style="padding:22px 24px;" id="tab-content">
              ${tabInfo()}
            </div>
          </div>
        </div>

      </div>
    `;

    injectProfileStyles();

    // Tab switching
    content.querySelectorAll('.ptab').forEach(btn => {
      btn.addEventListener('click', () => {
        content.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tc = content.querySelector('#tab-content');
        if (btn.dataset.tab === 'info') tc.innerHTML = tabInfo();
        else tc.innerHTML = `<div class="text-muted text-sm" style="padding:20px 0;">ไม่มีข้อมูล</div>`;
      });
    });
  });
}

function field(label, value) {
  return `
    <div>
      <div class="form-label">${label}</div>
      <div style="font-size:14px;font-weight:600;margin-top:2px;">${value}</div>
    </div>
  `;
}

function tabInfo() {
  return `
    <div class="grid-2 gap-10">
      ${field('วันเกิด','15 มกราคม 2530')}
      ${field('เพศ','ชาย')}
      ${field('กรุ๊ปเลือด','O+')}
      ${field('น้ำหนัก / ส่วนสูง','72 kg / 175 cm')}
    </div>
    <div class="divider"></div>
    <div class="form-label mt-4">การวินิจฉัย</div>
    <div style="font-size:13.5px;margin-top:6px;line-height:1.7;">
      อาการอ่อนแรงของกล้ามเนื้อแขนข้างขวา หลังจากเกิดอุบัติเหตุทางรถยนต์
      เมื่อเดือนพฤศจิกายน 2023 แพทย์แนะนำให้เข้าโปรแกรม Sequence-1
    </div>
    <div class="divider"></div>
    <div style="display:flex;gap:10px;margin-top:4px;">
      <div class="badge badge-blue">Sequence-1</div>
      <div class="badge badge-yellow">ติดตามผล</div>
    </div>
  `;
}

function injectProfileStyles() {
  if (document.getElementById('profile-styles')) return;
  const s = document.createElement('style');
  s.id = 'profile-styles';
  s.textContent = `
    .profile-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      padding: 0 6px;
    }
    .ptab {
      padding: 12px 18px;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text-muted);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
    }
    .ptab:hover { color: var(--text-primary); }
    .ptab.active { color: var(--accent); border-bottom-color: var(--accent); }
    .mt-4 { margin-top: 4px; }
  `;
  document.head.appendChild(s);
}
