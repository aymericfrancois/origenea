/* ORIGENEA — Tweaks partagés (palette + polices), persistés multipage. */
(function () {
  var KEY = 'origenea-tweaks';
  var defaults = { palette: 'equilibre', type: 'moderne' };

  function load() {
    try { return Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return Object.assign({}, defaults); }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  var state = load();

  function apply() {
    var root = document.documentElement;
    root.setAttribute('data-palette', state.palette);
    root.setAttribute('data-type', state.type);
    // reflect pressed states if panel exists
    document.querySelectorAll('.tw-opt').forEach(function (b) {
      var g = b.getAttribute('data-group'), v = b.getAttribute('data-value');
      b.setAttribute('aria-pressed', String(state[g] === v));
    });
  }
  // apply immediately (before paint where possible)
  apply();

  var paletteOpts = [
    { v: 'doux',      label: 'Doux',      cols: ['#3C828C', '#BE9A60'] },
    { v: 'equilibre', label: 'Équilibré', cols: ['#1F5560', '#B0894B'] },
    { v: 'profond',   label: 'Profond',   cols: ['#0F3138', '#9C7838'] }
  ];
  var typeOpts = [
    { v: 'moderne',   label: 'Moderne',   glyph: 'Aa', ff: "'Schibsted Grotesk', sans-serif" },
    { v: 'editorial', label: 'Éditorial', glyph: 'Aa', ff: "'Spectral', serif" },
    { v: 'caractere', label: 'Caractère', glyph: 'Aa', ff: "'Bricolage Grotesque', sans-serif" }
  ];

  function buildPanel() {
    if (document.getElementById('tw-panel')) return;
    var p = document.createElement('div');
    p.id = 'tw-panel';
    var h = '';
    h += '<div class="tw-head"><span class="tw-title">Réglages</span>' +
         '<button class="tw-close" aria-label="Fermer">\u00d7</button></div>';
    h += '<div class="tw-sec">Palette — bleu / ocre</div><div class="tw-opts" data-opts="palette">';
    paletteOpts.forEach(function (o) {
      h += '<button class="tw-opt" data-group="palette" data-value="' + o.v + '">' +
           '<span class="sw"><i style="background:' + o.cols[0] + '"></i><i style="background:' + o.cols[1] + '"></i></span>' +
           o.label + '</button>';
    });
    h += '</div>';
    h += '<div class="tw-sec">Polices</div><div class="tw-opts" data-opts="type">';
    typeOpts.forEach(function (o) {
      h += '<button class="tw-opt" data-group="type" data-value="' + o.v + '">' +
           '<span class="ty" style="font-family:' + o.ff + '">' + o.glyph + '</span>' +
           o.label + '</button>';
    });
    h += '</div>';
    p.innerHTML = h;
    document.body.appendChild(p);

    p.querySelector('.tw-close').addEventListener('click', dismiss);
    p.querySelectorAll('.tw-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.getAttribute('data-group'), v = b.getAttribute('data-value');
        state[g] = v; save(state); apply();
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { tweaks: state } }, '*');
      });
    });
    apply();
  }

  function open() { buildPanel(); document.getElementById('tw-panel').classList.add('open'); }
  function close() { var el = document.getElementById('tw-panel'); if (el) el.classList.remove('open'); }
  function dismiss() { close(); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }

  window.addEventListener('message', function (e) {
    var t = e && e.data && e.data.type;
    if (t === '__activate_edit_mode') open();
    else if (t === '__deactivate_edit_mode') close();
  });

  // announce availability once DOM is ready
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    apply();
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  });
})();
