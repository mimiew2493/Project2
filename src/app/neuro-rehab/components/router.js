// ─── Router ───────────────────────────────────────────────────────────────────
// Loads the correct page module based on URL hash.
// Default: #login  → Login page
// #patients        → Patient List
// #profile         → Patient Profile
// #dashboard       → Dashboard / Analytics

import { renderLogin }    from '../pages/login.js';
import { renderPatients } from '../pages/patients.js';
import { renderProfile }  from '../pages/profile.js';
import { renderDashboard }from '../pages/dashboard.js';

const app = document.getElementById('app');

function route() {
  const hash = window.location.hash || '#login';
  app.innerHTML = '';

  if (hash === '#login')          renderLogin(app);
  else if (hash === '#patients')  renderPatients(app);
  else if (hash === '#profile')   renderProfile(app);
  else if (hash === '#dashboard') renderDashboard(app);
  else renderLogin(app);
}

window.addEventListener('hashchange', route);
route();
