/* Rubrique « WildWest Merch » (vitrine) : s'insère à la fin de Grit & Goods.
   Données : js/merch-data.js. Chargé APRÈS render.js.

   GARDE-FOU DES DROITS : tant que MERCH.rightsConfirmed n'est pas true, la rubrique
   n'existe pas sur un site publié (aucun élément créé, aucune image demandée).
   Seule exception : prévisualisation sur localhost si MERCH.localPreview est true. */
(function () {
  if (typeof MERCH === 'undefined' || !window.WWRender) return;
  const host = location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  if (!(MERCH.rightsConfirmed === true || (MERCH.localPreview === true && isLocal))) return;
  const goods = document.getElementById('panel-goods');
  if (!goods) return;

  const { spans, t, esc } = window.WWRender;
  const collections = MERCH.collections.filter(c => c.visible && c.items.some(i => i.visible));
  if (!collections.length) return;

  const currentLang = () => (document.body.className.match(/lang-(\w+)/) || [0, 'en'])[1];
  const altOf = (it, lang) => (it.alt && (it.alt[lang] || it.alt.en)) || '';

  function cardHTML(it, layout) {
    const price = it.showPrice === true && it.price ? '<span class="merch-price">' + esc(it.price) + '</span>' : '';
    /* Harmonisation de la taille apparente des stickers : à SURFACE visuelle égale (largeur = T·√ratio),
       bornée par la hauteur de la carte et par la taille native (jamais agrandi au-delà, jamais déformé). */
    let sizing = '';
    if (layout === 'stickers') {
      const a = it.w / it.h, T = 84;
      const wp = Math.min(T * Math.sqrt(a), 0.92 * 1.13 * a * 100, 92);
      sizing = ' style="--wp:' + wp.toFixed(1) + ';--nw:' + it.w + 'px"';
    }
    return '<li class="merch-cell"><button type="button" class="merch-card merch-card--' + layout + '" data-merch="' + esc(it.id) + '"' + sizing + '>' +
      '<img src="' + esc(it.image) + '" width="' + it.w + '" height="' + it.h + '" loading="lazy" decoding="async" alt="">' +
      price + '</button></li>';
  }

  let html = '<div class="sub-title sub-title--merch">' + t('merchTitle') + '</div>';
  if (MERCH.intro) html += '<div class="panel-sub merch-intro">' + t(MERCH.intro) + '</div>';
  collections.forEach(c => {
    html += '<div class="sub-title merch-group-title">' + t(c.title) + '</div><ul class="merch-grid merch-grid--' + c.layout + '">' +
      c.items.filter(i => i.visible).map(i => cardHTML(i, c.layout)).join('') + '</ul>';
  });
  const wrap = document.createElement('div');
  wrap.className = 'merch'; wrap.id = 'merch'; wrap.innerHTML = html;
  goods.appendChild(wrap);

  const byId = {};
  collections.forEach(c => c.items.forEach(i => { byId[i.id] = i; }));

  /* textes alternatifs et étiquettes d'accessibilité dans la langue courante */
  function refreshLabels() {
    const lang = currentLang();
    wrap.querySelectorAll('.merch-card').forEach(b => {
      const it = byId[b.dataset.merch], alt = altOf(it, lang);
      b.querySelector('img').alt = alt; b.setAttribute('aria-label', alt + ' — ' + UI.merchEnlarge[lang || 'en']);
    });
    if (box && !box.hidden) { const it = byId[box.dataset.current]; lbImg.alt = altOf(it, lang); lbCap.textContent = altOf(it, lang); lbClose.setAttribute('aria-label', UI.merchClose[lang]); }
  }

  /* ---------- agrandissement (jamais au-delà de la taille native) ---------- */
  const box = document.createElement('div');
  box.className = 'merch-lightbox'; box.hidden = true; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" class="merch-lightbox-close" aria-label="Close">✕</button>' +
    '<figure class="merch-lightbox-fig"><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(box);
  const lbImg = box.querySelector('img'), lbCap = box.querySelector('figcaption'), lbClose = box.querySelector('button');
  let lastFocus = null;

  function open(id, trigger) {
    const it = byId[id]; lastFocus = trigger;
    box.dataset.current = id;
    lbImg.src = it.image;
    lbImg.style.setProperty('--nw', it.w + 'px'); lbImg.style.setProperty('--nh', it.h + 'px'); // plafond = taille native
    box.hidden = false; document.body.classList.add('merch-open'); refreshLabels(); lbClose.focus();
  }
  function close() {
    box.hidden = true; document.body.classList.remove('merch-open'); lbImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }
  wrap.addEventListener('click', e => { const b = e.target.closest('.merch-card'); if (b) open(b.dataset.merch, b); });
  box.addEventListener('click', close);               // clic ou toucher n'importe où : fermer
  document.addEventListener('keydown', e => { if (!box.hidden && (e.key === 'Escape' || e.key === 'Esc')) close(); });

  window.addEventListener('wwb-lang-change', refreshLabels);
  refreshLabels();
})();
