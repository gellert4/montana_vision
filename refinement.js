/* Progressive enhancements; no cookies, analytics or browser storage. */
(() => {
  const rail = document.getElementById('mediaRail');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    rail.querySelectorAll('[data-category]').forEach(tile => {
      tile.hidden = button.dataset.filter !== 'all' && tile.dataset.category !== button.dataset.filter;
      if (tile.hidden) tile.querySelector('video')?.pause();
    });
    rail.scrollLeft = 0;
    updateArrows();
  }));
  function updateArrows() {
    document.getElementById('galleryPrev').disabled = rail.scrollLeft <= 1;
    document.getElementById('galleryNext').disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
  }
  rail.addEventListener('scroll', updateArrows, {passive:true});
  window.addEventListener('resize', updateArrows);
  updateArrows();
  document.querySelectorAll('.mediaTile:not(.mediaTile--video)').forEach(tile => {
    tile.tabIndex = 0;
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-haspopup','dialog');
    tile.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); tile.click(); }
    });
  });
  const search = document.getElementById('documentSearch');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    document.querySelectorAll('[data-search]').forEach(card => {
      card.hidden = !card.dataset.search.toLocaleLowerCase().includes(query);
      if (!card.hidden) visible++;
    });
    document.getElementById('documentEmpty').hidden = visible > 0;
  });
  // Keep focus inside existing modal components and restore it on close.
  for (const modal of document.querySelectorAll('[role="dialog"]')) {
    let opener;
    new MutationObserver(() => {
      if (!modal.hidden) {
        if (!opener) opener = document.activeElement;
        if (!modal.contains(document.activeElement)) modal.querySelector('button')?.focus();
      } else if (opener) { opener.focus(); opener = null; }
    }).observe(modal, {attributes:true,attributeFilter:['hidden']});
    modal.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const nodes = [...modal.querySelectorAll('button,a[href],iframe,[tabindex="0"]')].filter(el => !el.disabled && !el.hidden);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
      if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
    });
  }
})();
