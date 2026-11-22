#!/usr/bin/env node
/* Génère docs/traductions-francaises.md : tous les textes français à relire,
   face à l'anglais. Usage : node tools/export-fr.js */
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
['translations.js', 'menu-data.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, 'js', f), 'utf8') +
  '\n;this.__e=Object.assign(this.__e||{},{' + (f === 'translations.js' ? 'UI,WHATSAPP_MESSAGES' : 'MENU') + '});', ctx));
const { UI, WHATSAPP_MESSAGES, MENU } = ctx.__e;
const c = s => (s || '').replace(/\|/g, '\\|');
let md = '# Traductions françaises — à relire\n\nGénéré depuis `js/translations.js` et `js/menu-data.js`. Corriger dans ces fichiers, pas ici.\n' +
  'Règles : noms commerciaux en anglais (Classic Cut, The Drifter, Grit & Goods, WildWest Supply Co.…), prix en IDR (K = 1 000 IDR), slogan en anglais.\n\n';
md += '## 1. Menus (prestations, produits, boissons)\n\n';
MENU.forEach(cat => {
  md += `### ${UI[cat.title].en} → **${UI[cat.title].fr}**\n\n`;
  if (cat.subtitle) md += `Sous-titre : ${UI[cat.subtitle].en} → **${UI[cat.subtitle].fr}**\n\n`;
  md += '| Nom officiel (non traduit) | Prix | Anglais | Français |\n|---|---|---|---|\n';
  cat.sections.forEach(s => s.items.forEach(it => {
    const line = k => it[k] ? (it[k].en || '—') : '';
    md += `| ${c(it.name)}${it.size ? ' (' + it.size + ')' : ''} | ${it.price} | ${c(line('desc'))}${it.desc2 ? '<br>' + c(line('desc2')) : ''} | **${c(it.desc.fr)}**${it.desc2 ? '<br>**' + c(it.desc2.fr) + '**' : ''} |\n`;
  }));
  if (cat.note) md += `\nNote : ${UI[cat.note].en} → **${UI[cat.note].fr}**\n`;
  md += '\n';
});
md += '## 2. Interface, avis Google, boutons\n\n| Clé | Anglais | Français |\n|---|---|---|\n';
Object.entries(UI).forEach(([k, v]) => { md += `| ${k} | ${c(v.en)} | **${c(v.fr)}** |\n`; });
md += '\n## 3. Messages WhatsApp pré-remplis\n\n';
Object.entries(WHATSAPP_MESSAGES).forEach(([k, v]) => { md += `**${k}**\n\n- EN : ${v.en}\n- FR : **${v.fr}**\n\n`; });
md += '`{service}` est remplacé par le nom officiel anglais de la prestation (ex. « Classic Cut »).\n';
fs.writeFileSync(path.join(dir, 'docs', 'traductions-francaises.md'), md);
console.log('docs/traductions-francaises.md généré (' + md.split('\n').length + ' lignes)');
