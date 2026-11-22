/* Construit la section « Trusted by Our Riders » à partir de js/reviews-data.js.
   Doit être chargé AVANT main.js (qui liste les onglets et sections). */
(function () {
  const panel = document.getElementById('panel-reviews');
  const tab = document.querySelector('.tab[data-target="panel-reviews"]');
  const R = (typeof REVIEWS !== 'undefined') ? REVIEWS : null;
  const valid = R && R.enabled && typeof R.rating === 'number' && R.count && R.mapsUrl
    && Array.isArray(R.items) && R.items.length > 0;
  if (!valid) { if (panel) panel.remove(); if (tab) tab.remove(); return; }

  const stars = n => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  const set = (sel, fn) => panel.querySelectorAll(sel).forEach(fn);
  set('.js-rating', el => el.textContent = R.rating.toFixed(1));
  set('.js-count', el => el.textContent = R.count);
  set('.js-maps', el => el.href = R.mapsUrl);

  const tpl = panel.querySelector('#review-template');
  const list = panel.querySelector('.review-list');
  R.items.forEach(it => {
    const card = tpl.content.cloneNode(true);
    card.querySelector('.review-name').textContent = it.name;
    card.querySelector('.review-stars').textContent = stars(it.stars || 5);
    card.querySelector('.review-text').textContent = '“' + it.text + '”';
    const date = card.querySelector('.review-date');
    if (it.date) date.textContent = it.date; else date.remove();
    const tr = card.querySelector('.review-translated');
    if (!it.translated) tr.remove();
    card.querySelector('.review-link').href = it.url || R.mapsUrl;
    list.appendChild(card);
  });
})();
