/* ============================================================
   GP49 Chiang Mai — Interactions
   ============================================================ */

// ---------- Theme toggle ----------
(function () {
  const btn = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  renderIcon();

  function renderIcon() {
    btn.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  btn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    renderIcon();
  });
})();

// ---------- Header scroll state ----------
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// ---------- Day tabs ----------
(function () {
  const tabs = document.querySelectorAll('.day-tab');
  const panels = document.querySelectorAll('.day-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === day));
      // Smooth scroll up to itinerary section top
      const section = document.getElementById('itinerary');
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
})();

// ---------- Scroll reveal ----------
(function () {
  // Add .reveal to all significant blocks
  const targets = document.querySelectorAll(
    '.section > .container > .eyebrow, .section > .container > .section-title, .section > .container > .section-lede, .villa-card, .activity-card, .info-card, .timeline-item, .budget-wrap'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  targets.forEach((el) => io.observe(el));
})();

// ---------- Smooth scroll for nav links ----------
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
})();
