/* ========================================
   JavaScript: จัดการเข้าสู่ระบบ
   ======================================== */

// เลือกองค์ประกอบ HTML เพื่อใช้ใน JavaScript
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('rememberMe');
const togglePasswordBtn = document.getElementById('togglePassword');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModalBtn = document.getElementById('closeModal');
const loginButton = document.querySelector('.login-button');

// ========================================
// 1. แสดง/ซ่อนรหัสผ่าน (Toggle Eye Icon)
// ========================================

togglePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault(); // ไม่ให้รีเฟรชหน้า
    
    // ถ้าเป็น password ให้เปลี่ยนเป็น text (แสดง)
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '👁️‍🗨️'; // เปลี่ยน icon
    } 
    // ถ้าเป็น text ให้เปลี่ยนเป็น password (ซ่อน)
    else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
});

// ========================================
// 2. ตรวจสอบความถูกต้องของข้อมูล (Validation)
// ========================================

function validateForm() {
    // ลบข้อความแจ้งข้อผิดพลาดเก่า
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    
    let isValid = true; // สมมติว่าถูกต้อง
    
    // ตรวจสอบรหัสผู้ใช้
    if (usernameInput.value.trim() === '') {
        document.getElementById('usernameError').textContent = 'กรุณากรอกรหัสผู้ใช้';
        isValid = false;
    }
    
    // ตรวจสอบรหัสผ่าน
    if (passwordInput.value === '') {
        document.getElementById('passwordError').textContent = 'กรุณากรอกรหัสผ่าน';
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        document.getElementById('passwordError').textContent = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
        isValid = false;
    }
    
    return isValid;
}

// ========================================
// 3. จัดการส่งฟอร์ม (Form Submit)
// ========================================

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // ไม่ให้ส่งฟอร์มแบบธรรมดา
    
    // ตรวจสอบความถูกต้อง
    if (!validateForm()) {
        return; // ออกจากฟังก์ชัน
    }
    
    // แสดง Loading Spinner
    document.getElementById('spinner').style.display = 'inline-block';
    document.getElementById('buttonText').textContent = 'กำลังเข้าสู่ระบบ...';
    loginButton.disabled = true; // ปิดใช้งานปุ่ม
    
    // รอ 2 วินาที (จำลองการตรวจสอบ)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // ตรวจสอบ Username และ Password
    // (ตัวอย่าง: P-001 / 123456)
    if (usernameInput.value === 'P-001' && passwordInput.value === '123456') {
        // ✅ เข้าสู่ระบบสำเร็จ
        
        // บันทึกข้อมูลเข้าสู่ระบบ (ถ้าติ๊กลือกจำหรือให้คิด)
        if (rememberCheckbox.checked) {
            localStorage.setItem('username', usernameInput.value);
        }
        
        // แสดง Toast (ข้อความแจ้งเตือน)
        showToast('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับมา');
        
        // รอ 1 วินาที แล้วไปหน้า Home
        setTimeout(() => {
            window.location.href = 'home.html'; // หรือหน้า Home ของคุณ
        }, 1000);
    } else {
        // ❌ เข้าสู่ระบบล้มเหลว
        
        // ซ่อน Spinner
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('buttonText').textContent = 'เข้าสู่ระบบ';
        loginButton.disabled = false;
        
        // แสดงข้อความแจ้งข้อผิดพลาด
        document.getElementById('usernameError').textContent = 'รหัสหรือรหัสผ่านไม่ถูกต้อง';
        
        // ล้างช่องรหัสผ่าน
        passwordInput.value = '';
        
        // โฟกัสบนช่อง Username
        usernameInput.focus();
    }
});

// ========================================
// 4. หน้าต่าง Modal: ลืมรหัสผ่าน
// ========================================

// เปิด Modal เมื่อคลิก "ลืมรหัสผ่าน?"
forgotPasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordModal.style.display = 'flex'; // แสดง Modal
});

// ปิด Modal เมื่อคลิก X
closeModalBtn.addEventListener('click', function() {
    forgotPasswordModal.style.display = 'none';
});

// ปิด Modal เมื่อคลิกนอก Modal
window.addEventListener('click', function(e) {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
    }
});

// จัดการส่งฟอร์มรีเซ็ตรหัสผ่าน
document.getElementById('sendResetBtn').addEventListener('click', function() {
    const resetUsername = document.getElementById('resetUsername').value;
    
    if (resetUsername.trim() === '') {
        alert('กรุณากรอกรหัสผู้ใช้');
        return;
    }
    
    // ส่งลิงค์รีเซ็ต (ตัวอย่าง)
    showToast('ลิงค์รีเซ็ตถูกส่งไปยังอีเมลของคุณ');
    forgotPasswordModal.style.display = 'none';
    document.getElementById('resetUsername').value = '';
});

// ========================================
// 5. แสดง Toast (ข้อความแจ้งเตือน)
// ========================================

function showToast(message) {
    // สร้าง Element Toast
    const toast = document.createElement('div');
    toast.textContent = message;
    
    // จัดรูปแบบ
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    // เพิ่ม Animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // เพิ่ม Toast ลงในหน้า
    document.body.appendChild(toast);
    
    // ลบ Toast หลังจาก 3 วินาที
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// 6. โหลดข้อมูลที่บันทึกไว้ (Remember Me)
// ========================================

window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
});