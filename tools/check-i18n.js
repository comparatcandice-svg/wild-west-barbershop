#!/usr/bin/env node
/* Vérifie que TOUS les textes du site existent dans les 5 langues.
   Usage : node tools/check-i18n.js
   Affiche chaque traduction manquante ; code de sortie 1 s'il y en a. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const ctx = {};
vm.createContext(ctx);
const EXPORTS = { 'translations.js': 'LANGS,UI,WHATSAPP_MESSAGES', 'menu-data.js': 'MENU', 'merch-data.js': 'MERCH' };
Object.keys(EXPORTS).forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8') +
  '\n;this.__e=Object.assign(this.__e||{},{' + EXPORTS[f] + '});', ctx));
const { LANGS, UI, WHATSAPP_MESSAGES, MENU, MERCH } = ctx.__e;
const problems = [];
const need = (label, obj) => LANGS.forEach(l => {
  if (!(obj && typeof obj[l] === 'string' && obj[l].trim())) problems.push(label + ' -> langue manquante : ' + l);
});
Object.entries(UI).forEach(([k, v]) => need('UI.' + k, v));
Object.entries(WHATSAPP_MESSAGES).forEach(([k, v]) => need('WHATSAPP.' + k, v));
Object.entries(WHATSAPP_MESSAGES).forEach(([k, v]) => LANGS.forEach(l => {
  if (k === 'service' && v[l] && !v[l].includes('{service}')) problems.push('WHATSAPP.service.' + l + ' -> {service} absent');
}));
let items = 0;
MENU.forEach(cat => {
  ['title', 'subtitle', 'subtitle2', 'note', 'closing'].forEach(k => { if (cat[k] && !UI[cat[k]]) problems.push(cat.id + '.' + k + ' -> clé UI inconnue : ' + cat[k]); });
  cat.sections.forEach(sec => {
    if (sec.group && !UI[sec.group]) problems.push(cat.id + ' -> groupe inconnu : ' + sec.group);
    sec.items.forEach(it => {
      items++;
      if (!/^\d+K$/.test(it.price)) problems.push(it.name + ' -> prix inattendu : ' + it.price);
      if (it.desc) need(it.name + '.desc', it.desc);
      if (it.desc2) need(it.name + '.desc2', it.desc2);
    });
  });
});
/* ---- WildWest Merch : textes, drapeaux de sécurité, absence de prix ---- */
let merchItems = 0;
if (MERCH.rightsConfirmed !== false) problems.push('MERCH.rightsConfirmed : ' + MERCH.rightsConfirmed + ' (doit rester false tant que les droits ne sont pas documentés)');
if (MERCH.intro && !UI[MERCH.intro]) problems.push('MERCH.intro -> clé UI inconnue : ' + MERCH.intro);
MERCH.collections.forEach(c => {
  if (!UI[c.title]) problems.push('MERCH.' + c.id + '.title -> clé UI inconnue : ' + c.title);
  c.items.forEach(it => {
    merchItems++;
    need('MERCH.' + it.id + '.alt', it.alt);
    if (it.showPrice === true) problems.push('MERCH.' + it.id + ' : showPrice=true (aucun prix ne doit être affiché pour l\'instant)');
    if (!(it.w > 0 && it.h > 0)) problems.push('MERCH.' + it.id + ' : dimensions natives w/h manquantes');
    if (!/^images\/merch\/[a-z0-9-]+\.webp$/.test(it.image)) problems.push('MERCH.' + it.id + ' : chemin d\'image inattendu ' + it.image);
  });
});
['merchTitle', 'merchIntro', 'merchStickers', 'merchKeychains', 'merchEnlarge', 'merchClose'].forEach(k => { if (!UI[k]) problems.push('UI.' + k + ' manquant'); });
/* aucun mot promettant un prix ou une gratuité dans les textes merch */
const banned = /free|gratuit|offert|gift|cadeau|complimentary|price|prix|buy|acheter|stock|disponible|available|IDR|\bK\b/i;
['merchIntro', 'merchStickers', 'merchKeychains'].forEach(k => LANGS.forEach(l => { if (banned.test(UI[k][l])) problems.push('UI.' + k + '.' + l + ' contient un terme commercial interdit'); }));
console.log(LANGS.length + ' langues, ' + Object.keys(UI).length + ' textes d\'interface, ' + items + ' articles de menu, ' + merchItems + ' visuels merch.');
if (problems.length) { console.log('\nPROBLEMES (' + problems.length + ') :\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('OK : aucune traduction manquante.');
