(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matchesles;
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const topbar = document.querySelector('.topbar');

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const glow = document.createElement('div');
  glow.className = 'ambient-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  const sections = [...document.querySelectorAll('main > section:not(.hero)')];
  sections.forEach((section) => section.classList.add('motion-section'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-inview', entry.isIntersecting));
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  sections.forEach((section) => observer.observe(section));

  const depthTargets = [...document.querySelectorAll('.mediaCard img, .mediaTile img, .personWrap img')];
  depthTargets.forEach((element, index) => element.dataset.depth = String(.035 + (index % 3) * .012));

  let ticking = false;
  const renderScroll = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
    topbar?.classList.toggle('is-scrolled', y > 28);
    if (hero) {
      const amount = Math.min(1, Math.max(0, y / Math.max(1, hero.offsetHeight)));
      root.style.setProperty('--mv-motion', amount.toFixed(3));
    }
    if (!reduceMotion) {
      depthTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
        element.style.setProperty('--depth-y', `${(-distance * Number(element.dataset.depth)).toFixed(1)}px`);
      });
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(renderScroll);
  }, { passive: true });

  if (!reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      root.style.setProperty('--mv-pointer-x', `${event.clientX}px`);
      root.style.setProperty('--mv-pointer-y', `${event.clientY}px`);
    }, { passive: true });

    document.querySelectorAll('.mediaTile, .usecaseCard, .mediaCard, .swipePanel').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    });
  }
  renderScroll();
})();