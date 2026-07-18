// ─── Login Page ───────────────────────────────────────────────────────────────
// Matches the left "เข้าสู่ระบบ" screen from the design reference.

// Backend (Next.js) รันอยู่คนละ port กับหน้านี้ (5500) จึงต้องระบุ URL เต็ม
// ถ้าย้ายไป deploy จริง ให้เปลี่ยนค่านี้เป็น domain จริงของ backend
const API_BASE_URL = 'http://localhost:3000';

export function renderLogin(container) {
  container.innerHTML = `
    <div class="login-root">
      <!-- Left hero panel -->
      <div class="login-hero">
        <div class="hero-badge">IoT · EMG · AI</div>
        <h1 class="hero-headline">
          ระบบฟื้นฟูกล้ามเนื้อ<br/>
          <span class="hero-accent">ด้วยสเก็ตบอร์ดแขน</span>
        </h1>
        <p class="hero-body">
          Empowering neuro-rehabilitation specialists with real-time IoT data
          and advanced patient diagnostics.
        </p>

        <!-- Decorative dots grid -->
        <div class="dot-grid" aria-hidden="true">
          ${Array.from({length:48}, (_,i) =>
            `<div class="dot" style="animation-delay:${(i*0.04).toFixed(2)}s"></div>`
          ).join('')}
        </div>
      </div>

      <!-- Right form panel -->
      <div class="login-panel">
        <div class="login-card card">
          <div style="margin-bottom:22px;">
            <div style="font-size:22px;font-weight:700;margin-bottom:4px;">เข้าสู่ระบบ</div>
            <div class="text-muted text-sm">โปรดเข้าสู่ระบบเพื่อเริ่มต้นการใช้งาน</div>
          </div>

          <div class="form-group mb-16">
            <label class="form-label">รหัสพนักงาน / Username</label>
            <input class="form-input" type="text" placeholder="Ex. PT-90000" id="username" />
          </div>

          <div class="form-group mb-16">
            <div class="flex-between mb-4">
              <label class="form-label">รหัสผ่าน / Password</label>
              <span class="link-btn">ลืมรหัสผ่าน / Forgot?</span>
            </div>
            <div style="position:relative;">
              <input class="form-input" type="password" placeholder="••••••••" id="password" style="padding-right:40px;" />
              <button id="toggle-pw" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;color:var(--text-muted);font-size:16px;">👁</button>
            </div>
          </div>

          <!-- error message: ซ่อนไว้ก่อน จะโชว์ก็ต่อเมื่อ login ไม่สำเร็จ -->
          <div id="login-error" class="text-sm" style="color:var(--danger);display:none;margin-bottom:12px;"></div>

          <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px;" id="login-btn">
            เข้าสู่ระบบ / Login →
          </button>

          <div class="divider"></div>
          <div class="flex-between" style="font-size:12px;color:var(--text-muted);">
            <span>TH/EN</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const usernameInput = container.querySelector('#username');
  const passwordInput = container.querySelector('#password');
  const loginBtn      = container.querySelector('#login-btn');
  const errorBox       = container.querySelector('#login-error');

  // Toggle password visibility
  container.querySelector('#toggle-pw').addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  });

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
  }

  function clearError() {
    errorBox.style.display = 'none';
    usernameInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
  }

  function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    loginBtn.textContent = isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ / Login →';
  }

  async function handleLogin() {
    clearError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
      usernameInput.style.borderColor = 'var(--danger)';
      showError('กรุณากรอกรหัสพนักงาน');
      return;
    }

    if (!password) {
      passwordInput.style.borderColor = 'var(--danger)';
      showError('กรุณากรอกรหัสผ่าน');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include' สำคัญมากสำหรับ vanilla JS SPA ที่ frontend/backend
        // อาจรันคนละ origin/port กัน ถ้าไม่ใส่ browser จะไม่แนบ cookie (session) ให้อัตโนมัติ
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showError(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      // เก็บข้อมูล user ไว้ใช้แสดงผลในหน้าอื่น (เช่น หน้า patients, dashboard)
      // ใช้ sessionStorage แทน localStorage เพราะข้อมูลจะหายไปเมื่อปิดแท็บ ปลอดภัยกว่าสำหรับ session สั้น ๆ
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));

      window.location.hash = '#patients';
    } catch (err) {
      console.error(err);
      showError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  }

  loginBtn.addEventListener('click', handleLogin);

  // ให้กด Enter ในช่อง password แล้ว submit ได้เลย ไม่ต้องกดปุ่มด้วยเมาส์
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // Inject page-specific CSS
  injectLoginStyles();
}

function injectLoginStyles() {
  if (document.getElementById('login-styles')) return;
  const s = document.createElement('style');
  s.id = 'login-styles';
  s.textContent = `
    .login-root {
      display: flex;
      min-height: 100vh;
    }

    /* ── Hero panel ── */
    .login-hero {
      flex: 1.1;
      background: linear-gradient(135deg, #0B1120 0%, #0D1E35 60%, #0A2240 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 64px;
      position: relative;
      overflow: hidden;
    }

    .hero-badge {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 99px;
      border: 1px solid rgba(59,130,246,0.4);
      background: rgba(59,130,246,0.08);
      color: #60A5FA;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      margin-bottom: 24px;
      width: fit-content;
    }

    .hero-headline {
      font-size: 42px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--text-primary);
      margin-bottom: 18px;
    }

    .hero-accent { color: var(--accent); }

    .hero-body {
      font-size: 14px;
      color: var(--text-secondary);
      max-width: 380px;
      line-height: 1.7;
    }

    /* Decorative dot grid */
    .dot-grid {
      position: absolute;
      bottom: 40px;
      right: 40px;
      display: grid;
      grid-template-columns: repeat(8,1fr);
      gap: 10px;
    }
    .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.2;
      animation: pulse-dot 3s ease-in-out infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 0.08; transform: scale(1); }
      50%       { opacity: 0.45; transform: scale(1.4); }
    }

    /* ── Form panel ── */
    .login-panel {
      width: 420px;
      background: var(--bg-mid);
      border-left: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 32px;
    }

    .login-card {
      width: 100%;
      max-width: 360px;
    }

    .mb-4  { margin-bottom: 4px; }
    .mb-16 { margin-bottom: 16px; }

    @media (max-width: 768px) {
      .login-root { flex-direction: column; }
      .login-hero { padding: 40px 28px; flex: none; min-height: 260px; }
      .hero-headline { font-size: 28px; }
      .dot-grid { display: none; }
      .login-panel { width: 100%; border-left: none; border-top: 1px solid var(--border); }
    }
  `;
  document.head.appendChild(s);
}