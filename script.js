/* =====================================================
   THE DEALER LEDGER — interaction
   ===================================================== */

(function () {
  'use strict';

  /* -------- Live Run: step controls -------- */
  const controls = document.querySelectorAll('.ctl');
  const steps = document.querySelectorAll('.step');

  function activateStep(n) {
    controls.forEach(c => c.classList.toggle('is-active', c.dataset.step === String(n)));
    steps.forEach(s => s.classList.toggle('is-active', s.dataset.step === String(n)));
  }

  controls.forEach(btn => {
    btn.addEventListener('click', () => activateStep(btn.dataset.step));
  });

  /* keyboard: arrows step through */
  document.addEventListener('keydown', e => {
    const active = document.querySelector('.ctl.is-active');
    if (!active) return;
    const cur = Number(active.dataset.step);
    if (e.key === 'ArrowRight' && cur < controls.length) {
      e.preventDefault();
      activateStep(cur + 1);
    } else if (e.key === 'ArrowLeft' && cur > 1) {
      e.preventDefault();
      activateStep(cur - 1);
    }
  });

  /* auto-advance the demo once when the section first scrolls into view, then stop */
  let autoplayed = false;
  const runSection = document.getElementById('run');
  if (runSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !autoplayed) {
          autoplayed = true;
          let n = 1;
          const tick = () => {
            n += 1;
            if (n > 4) return;
            activateStep(n);
            setTimeout(tick, 2200);
          };
          setTimeout(tick, 1400);
        }
      });
    }, { threshold: 0.45 });
    io.observe(runSection);
  }

  /* -------- Reveal-on-scroll for sections -------- */
  const revealTargets = document.querySelectorAll(
    '.section__header, .section__lede, .lede, .pullquote, .callout, ' +
    '.stage, .pipeline__note, .stack__row, .build__row, .ask, .footer__grid, .terminal'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-in'));
  }

  /* -------- Live build-status flicker in masthead -------- */
  const statuses = ['multi-tenant', 'rag-robert · 30+ docs', 'cite or refuse', 'pdf side-by-side'];
  const target = document.querySelector('.masthead__col--right span:last-child');
  if (target) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % statuses.length;
      target.textContent = 'Margin · ' + statuses[i];
    }, 4200);
  }

  /* -------- Subtle parallax on hero stats (engaged after entry anim) -------- */
  const stats = document.querySelector('.hero__stats');
  if (stats && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
      let raf = null;
      window.addEventListener('scroll', () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, 600);
          stats.style.transform = 'translateY(' + (y * -0.05) + 'px)';
          raf = null;
        });
      }, { passive: true });
    }, 1500);
  }

})();
