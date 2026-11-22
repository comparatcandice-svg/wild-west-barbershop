/* Construit les menus, les onglets et les textes multilingues, gère le
   changement de langue (5 langues) et les liens WhatsApp.
   Dépend de : translations.js, menu-data.js. Chargé AVANT reviews.js et main.js. */
(function () {
  const STORE_KEY = 'wwb-lang'; // stockage local du navigateur : aucun cookie, aucun suivi

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Un texte multilingue -> un <span data-i18n="xx"> par langue.
     Langue manquante -> l'anglais est affiché à la place. */
  function spans(obj) {
    return LANGS.map(l => {
      const v = obj[l] != null ? obj[l] : obj.en;
      return '<span data-i18n="' + l + '">' + esc(v == null ? '' : v).replace('{count}', '<b class="js-count"></b>') + '</span>';
    }).join('');
  }
  const t = key => spans(UI[key]);

  /* ---------- menus ---------- */
  function itemHTML(it, bookable) {
    const size = it.size ? ' <small class="item-size">' + esc(it.size) + '</small>' : '';
    let h = '<div class="item"><div class="item-row"><div class="item-name">' + esc(it.name) + size +
      '</div><div class="item-price">' + esc(it.price) + '</div></div>';
    if (it.desc) h += '<div class="item-desc' + (it.gloss ? ' item-desc--gloss' : '') + '">' + spans(it.desc) + '</div>';
    if (it.desc2) h += '<div class="item-desc">' + spans(it.desc2) + '</div>';
    if (bookable) {
      h += '<div class="item-actions"><a class="item-book" data-wa data-service="' + esc(it.name) +
        '" href="#" target="_blank" rel="noopener">' + t('bookItem') + ' ›</a></div>';
    }
    return h + '</div>';
  }

  function panelHTML(cat) {
    let h = '<div class="panel" id="panel-' + cat.id + '"><div class="panel-title"><span class="panel-mark"></span>' +
      '<span class="panel-title-text">' + t(cat.title) + '</span></div>';
    if (cat.subtitle) h += '<div class="panel-sub">' + t(cat.subtitle) + '</div>';
    if (cat.subtitle2) h += '<div class="panel-sub panel-sub--soft">' + t(cat.subtitle2) + '</div>';
    cat.sections.forEach(sec => {
      if (sec.group) h += '<div class="sub-title">' + t(sec.group) + '</div>';
      sec.items.forEach(it => { h += itemHTML(it, cat.book); });
    });
    if (cat.note) h += '<div class="cat-note">' + t(cat.note) + '</div>';
    if (cat.closing) h += '<div class="cat-note cat-note--slogan">' + t(cat.closing) + '</div>';
    return h + '</div>';
  }

  const root = document.getElementById('menu-root');
  root.innerHTML = MENU.map(panelHTML).join('');

  /* ---------- onglets : menus + avis + galerie ---------- */
  const TABS = MENU.map(c => ({ id: 'panel-' + c.id, title: c.title }))
    .concat([{ id: 'panel-reviews', title: 'titleReviews' }, { id: 'panel-gallery', title: 'titleGallery' }]);
  document.getElementById('tabs-scroll').innerHTML = TABS.map((tb, i) =>
    '<button class="tab btn3d' + (i === 0 ? ' active' : '') + '" data-target="' + tb.id + '">' + t(tb.title) + '</button>').join('');

  /* ---------- textes statiques de la page : <… data-t="clé"> ---------- */
  function fill(rootEl) {
    rootEl.querySelectorAll('[data-t]').forEach(el => { el.innerHTML = t(el.dataset.t); });
  }
  fill(document);
  document.querySelectorAll('template').forEach(tp => fill(tp.content));

  /* ---------- WhatsApp : message dans la langue choisie ---------- */
  function waUrl(lang, service) {
    const m = service ? WHATSAPP_MESSAGES.service : WHATSAPP_MESSAGES.general;
    let msg = m[lang] || m.en;
    if (service) msg = msg.replace('{service}', service);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }
  function updateWhatsAppLinks(lang) {
    document.querySelectorAll('[data-wa]').forEach(a => { a.href = waUrl(lang, a.dataset.service || ''); });
  }

  /* ---------- langue : choix mémorisé (sans cookie) ---------- */
  const HTML_LANG = { id: 'id', en: 'en', ru: 'ru', zh: 'zh-Hans', fr: 'fr' };
  function setLang(lang, remember) {
    if (LANGS.indexOf(lang) < 0) lang = DEFAULT_LANG;
    document.body.className = document.body.className.replace(/lang-\S+/g, '').trim();
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelectorAll('.lang-btn').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    updateWhatsAppLinks(lang);
    if (remember) { try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* navigation privée : on ignore */ } }
    window.dispatchEvent(new Event('wwb-lang-change'));
  }
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignoré */ }
  setLang(saved || DEFAULT_LANG, false); // anglais par défaut à la première visite
})();
