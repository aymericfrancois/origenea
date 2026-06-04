/* ORIGENEA — comportements partagés : nav mobile + apparition au scroll */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    // Menu mobile
    var toggle = document.querySelector('.nav-toggle');
    var mnav = document.querySelector('.mobile-nav');
    if (toggle && mnav) {
      toggle.addEventListener('click', function () {
        var open = mnav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      mnav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { mnav.classList.remove('open'); });
      });
    }

    // Filtres "chips" (état actif visuel)
    var chipWrap = document.querySelector('.chips');
    if (chipWrap) {
      chipWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.chip');
        if (!btn) return;
        chipWrap.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
    }

    // Apparition au scroll — uniquement si l'horloge d'animation tourne,
    // sinon le contenu reste visible (pas de masquage opacity:0 bloquant).
    var els = [].slice.call(document.querySelectorAll('.reveal'));
    if (els.length === 0) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // contenu déjà visible (aucune classe .anim ajoutée)

    function timelineLive(cb) {
      if (!document.body.animate) { cb(false); return; }
      var a;
      try { a = document.body.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 2000 }); }
      catch (e) { cb(false); return; }
      var t0 = a.currentTime || 0;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var live = (a.currentTime || 0) > t0;
          a.cancel();
          cb(live);
        });
      });
    }

    timelineLive(function (live) {
      if (!live) return; // pas d'horloge : on laisse tout visible
      els.forEach(function (el) { el.classList.add('anim'); });

      function check() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        els = els.filter(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > 0) {
            var d = el.getAttribute('data-delay');
            if (d) el.style.animationDelay = d + 'ms';
            el.classList.add('in');
            return false;
          }
          return true;
        });
        if (els.length === 0) {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      }
      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { check(); ticking = false; });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      check();
    });
  });
})();
