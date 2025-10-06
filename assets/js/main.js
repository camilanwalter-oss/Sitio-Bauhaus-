(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Highlight current nav link
  const path = location.pathname.replace(/\/index\.html?$/, '/');
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const target = href.replace(/\/index\.html?$/, '/');
    if (path.endsWith(target)) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // ARTISTAS filtering
  const searchInput = document.getElementById('artist-search');
  const disciplineSelect = document.getElementById('artist-discipline');
  const artistGrid = document.getElementById('artist-grid');
  if (artistGrid) {
    const applyFilter = () => {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const disc = (disciplineSelect?.value || '').trim().toLowerCase();
      const cards = artistGrid.querySelectorAll('article.card');
      cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const disciplines = (card.getAttribute('data-discipline') || '').toLowerCase();
        const matchesText = q === '' || name.includes(q) || disciplines.includes(q);
        const matchesDisc = disc === '' || disciplines.split(/\s+/).includes(disc);
        card.style.display = (matchesText && matchesDisc) ? '' : 'none';
      });
    };
    searchInput?.addEventListener('input', applyFilter);
    disciplineSelect?.addEventListener('change', applyFilter);
  }
})();
