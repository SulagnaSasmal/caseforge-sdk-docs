// CaseForge SDK Docs — shared scripts
// Theme toggle + persistence, code copy, tabs, mobile nav

(function () {
  // ── Theme init (runs before body renders to prevent flash) ──
  const saved = localStorage.getItem('cf-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // ── Theme toggle ──
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    updateToggleIcon(document.documentElement.getAttribute('data-theme'));
    toggleBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cf-theme', next);
      updateToggleIcon(next);
    });
  }

  function updateToggleIcon(theme) {
    if (!toggleBtn) return;
    if (theme === 'dark') {
      toggleBtn.innerHTML = sunIcon();
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      toggleBtn.title = 'Switch to light mode';
    } else {
      toggleBtn.innerHTML = moonIcon();
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      toggleBtn.title = 'Switch to dark mode';
    }
  }

  function sunIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`;
  }

  function moonIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
  }

  // ── Mobile sidebar ──
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ── Code copy buttons ──
  document.querySelectorAll('.code-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const pre = btn.closest('.code-block').querySelector('pre');
      if (!pre) return;
      const text = pre.innerText || pre.textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        btn.textContent = 'Error';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });

  // ── Code tabs ──
  document.querySelectorAll('.code-tabs').forEach(function (tabs) {
    const buttons = tabs.querySelectorAll('.tab-btn');
    const panels  = tabs.querySelectorAll('.tab-panel');
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p)  { p.classList.remove('active'); });
        btn.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });

  // ── Install tabs ──
  document.querySelectorAll('.install-block').forEach(function (block) {
    const buttons = block.querySelectorAll('.install-tab');
    const panels  = block.querySelectorAll('.install-panel');
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p)  { p.classList.remove('active'); });
        btn.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });

  // ── Active nav link ──
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === current) {
      link.classList.add('active');
    }
  });

});
