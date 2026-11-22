#!/usr/bin/env node
/* Vérifie que TOUS les textes du site existent dans les 5 langues.
   Usage : node tools/check-i18n.js
   Affiche chaque traduction manquante ; code de sortie 1 s'il y en a. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const ctx = {};
vm.createContext(ctx);
['translations.js', 'menu-data.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8') +
  '\n;this.__e=Object.assign(this.__e||{},{' + (f === 'translations.js' ? 'LANGS,UI,WHATSAPP_MESSAGES' : 'MENU') + '});', ctx));
const { LANGS, UI, WHATSAPP_MESSAGES, MENU } = ctx.__e;
const problems = [];
const need = (label, obj, optionalEn) => LANGS.forEach(l => {
  if (!(obj && typeof obj[l] === 'string' && (obj[l].trim() || (optionalEn && l === 'en')))) problems.push(label + ' -> langue manquante : ' + l);
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
      if (it.desc) need(it.name + '.desc', it.desc, !!it.gloss);
      if (it.desc2) need(it.name + '.desc2', it.desc2);
    });
  });
});
console.log(LANGS.length + ' langues, ' + Object.keys(UI).length + ' textes d\'interface, ' + items + ' articles de menu.');
if (problems.length) { console.log('\nPROBLEMES (' + problems.length + ') :\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('OK : aucune traduction manquante.');
