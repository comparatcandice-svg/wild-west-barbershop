/* =====================================================================
   TRADUCTIONS DE L'INTERFACE — 5 langues : en, id, ru, zh, fr
   Un texte = une clé. Pour ajouter / corriger un texte, modifier ici.
   - Si une langue manque, le site affiche l'anglais (jamais de blanc).
   - Vérification : node tools/check-i18n.js
   - {count} = emplacement du nombre d'avis Google.
   Les noms commerciaux (Classic Cut, The Drifter, Grit & Goods,
   WildWest Supply Co. …) restent en anglais dans toutes les langues.
   ===================================================================== */
const LANGS = ['id', 'en', 'ru', 'zh', 'fr'];
const DEFAULT_LANG = 'en';

const WHATSAPP_NUMBER = '6282144834392';

const UI = {
  /* ---- écran d'accueil et liens rapides ---- */
  splashHint: { en: 'TAP TO VIEW MENU', id: 'KETUK UNTUK LIHAT MENU', ru: 'НАЖМИТЕ, ЧТОБЫ ОТКРЫТЬ МЕНЮ', zh: '点击查看菜单', fr: 'TOUCHEZ POUR VOIR LE MENU' },
  linkLocation: { en: 'Location', id: 'Lokasi', ru: 'Локация', zh: '位置', fr: 'Localisation' },
  linkInstagram: { en: 'Instagram', id: 'Instagram', ru: 'Instagram', zh: 'Instagram', fr: 'Instagram' },
  linkWhatsApp: { en: 'WhatsApp', id: 'WhatsApp', ru: 'WhatsApp', zh: 'WhatsApp', fr: 'WhatsApp' },

  /* ---- titres des sections (onglets et bandeaux) ----
     The Cuts, The Grooming, WildWest Packages, Grit & Goods, Drinks : noms officiels,
     identiques dans les 5 langues. Reviews et The Shop (galerie) restent traduits. */
  titleCuts: { en: 'The Cuts', id: 'The Cuts', ru: 'The Cuts', zh: 'The Cuts', fr: 'The Cuts' },
  titleGrooming: { en: 'The Grooming', id: 'The Grooming', ru: 'The Grooming', zh: 'The Grooming', fr: 'The Grooming' },
  titlePackages: { en: 'WildWest Packages', id: 'WildWest Packages', ru: 'WildWest Packages', zh: 'WildWest Packages', fr: 'WildWest Packages' },
  titleGoods: { en: 'Grit & Goods', id: 'Grit & Goods', ru: 'Grit & Goods', zh: 'Grit & Goods', fr: 'Grit & Goods' },
  titleDrinks: { en: 'Drinks', id: 'Drinks', ru: 'Drinks', zh: 'Drinks', fr: 'Drinks' },
  titleReviews: { en: 'Reviews', id: 'Ulasan', ru: 'Отзывы', zh: '评价', fr: 'Avis' },
  titleGallery: { en: 'The Shop', id: 'Galeri', ru: 'Галерея', zh: '图库', fr: 'Le salon' },

  /* ---- sous-titres des menus ---- */
  subPackages: { en: 'Choose your ride', id: 'Pilih tunganganmu', ru: 'Выбери своего скакуна', zh: '选择你的坐骑', fr: 'Choisissez votre monture' },
  subGoodsBrand: { en: 'WildWest Supply Co.', id: 'WildWest Supply Co.', ru: 'WildWest Supply Co.', zh: 'WildWest Supply Co.', fr: 'WildWest Supply Co.' },
  subGoods: { en: 'Tools for the road.', id: 'Perlengkapan untuk perjalanan.', ru: 'Инструменты для дороги.', zh: '路上的必备工具。', fr: 'Les outils pour la route.' },
  subDrinks: { en: 'Cold drinks for the road', id: 'Minuman dingin untuk perjalanan', ru: 'Холодные напитки в дорогу', zh: '路上的冰爽饮品', fr: 'Boissons fraîches pour la route' },
  groupHair: { en: 'Hair', id: 'Rambut', ru: 'Волосы', zh: '发型', fr: 'Cheveux' },
  groupSkin: { en: 'Skin', id: 'Kulit', ru: 'Кожа', zh: '肌肤', fr: 'Peau' },

  /* ---- notes en bas de menu ---- */
  noteTax: {
    en: 'All prices include tax. Gratuity is always appreciated.',
    id: 'Semua harga sudah termasuk pajak. Tip selalu diapresiasi.',
    ru: 'Все цены указаны с учётом налога. Чаевые всегда приветствуются.',
    zh: '所有价格均含税。欢迎给予小费。',
    fr: 'Tous les prix incluent les taxes. Le pourboire est toujours apprécié.'
  },
  notePackages: {
    en: 'All WildWest packages include hot towel, cold towel & aftershave.',
    id: 'Semua paket WildWest termasuk handuk hangat, handuk dingin & aftershave.',
    ru: 'Все пакеты WildWest включают горячее полотенце, холодное полотенце и лосьон после бритья.',
    zh: '所有 WildWest 套餐均含热毛巾、冷毛巾及须后水。',
    fr: 'Toutes les formules WildWest comprennent une serviette chaude, une serviette froide et un soin après-rasage.'
  },
  /* Slogan : volontairement en anglais dans toutes les langues. */
  slogan: {
    en: 'Ride well ★ Look sharp ★ Live true', id: 'Ride well ★ Look sharp ★ Live true',
    ru: 'Ride well ★ Look sharp ★ Live true', zh: 'Ride well ★ Look sharp ★ Live true',
    fr: 'Ride well ★ Look sharp ★ Live true'
  },

  /* ---- réservation ---- */
  bookItem: { en: 'Book', id: 'Pesan', ru: 'Записаться', zh: '预约', fr: 'Réserver' },
  bookWhatsApp: { en: 'Book on WhatsApp', id: 'Pesan via WhatsApp', ru: 'Записаться в WhatsApp', zh: 'WhatsApp 预约', fr: 'Réserver sur WhatsApp' },

  /* ---- section avis Google ---- */
  reviewsTitle: { en: 'Trusted by Our Riders', id: 'Dipercaya Para Rider Kami', ru: 'Нам доверяют наши райдеры', zh: '深受我们车手信赖', fr: 'Nos riders nous font confiance' },
  reviewsSub: {
    en: 'Rated highly by our clients on Google. Real reviews from customers who stopped by Wild West Barbershop Bali.',
    id: 'Dinilai tinggi oleh klien kami di Google. Ulasan asli dari pelanggan yang mampir ke Wild West Barbershop Bali.',
    ru: 'Высоко оценён клиентами в Google. Настоящие отзывы гостей Wild West Barbershop Bali.',
    zh: '在 Google 上深受顾客好评。以下是光顾巴厘岛 Wild West Barbershop 的真实顾客评价。',
    fr: 'Très bien noté par nos clients sur Google. De vrais avis de clients passés chez Wild West Barbershop Bali.'
  },
  reviewsBased: {
    en: 'Based on {count} Google reviews', id: 'Berdasarkan {count} ulasan Google',
    ru: 'На основе {count} отзывов Google', zh: '基于 {count} 条 Google 评价', fr: 'Note basée sur {count} avis Google'
  },
  reviewsReadAll: { en: 'Read all reviews', id: 'Baca semua ulasan', ru: 'Читать все отзывы', zh: '查看全部评价', fr: 'Lire tous les avis' },
  reviewsView: { en: 'View on Google', id: 'Lihat di Google', ru: 'Смотреть в Google', zh: '在 Google 上查看', fr: 'Voir sur Google' },
  reviewsTranslated: { en: 'Translated by Google', id: 'Diterjemahkan oleh Google', ru: 'Переведено Google', zh: '由 Google 翻译', fr: 'Traduit par Google' },
  /* ---- WildWest Merch (vitrine ; aucun prix, aucune promesse commerciale) ---- */
  merchTitle: { en: 'WildWest Merch', id: 'WildWest Merch', ru: 'WildWest Merch', zh: 'WildWest Merch', fr: 'WildWest Merch' },
  merchIntro: {
    en: "A little dust on the boots, a little rock'n'roll in the blood. A few illustrations from the shop's universe, in the shape of stickers and keychains.",
    id: 'Sedikit debu di sepatu bot, sedikit rock\'n\'roll di darah. Beberapa ilustrasi dari dunia kedai kami, dalam bentuk stiker dan gantungan kunci.',
    ru: 'Немного пыли на сапогах и капля рок-н-ролла в крови. Несколько иллюстраций из мира нашего салона — в виде стикеров и брелоков.',
    zh: '靴上沾点尘土，血液里带点摇滚。来自店里世界的几幅插画，化作贴纸与钥匙扣。',
    fr: "Un peu de poussière sur les bottes, un peu de rock'n'roll dans le sang. Quelques illustrations de l'univers du salon, en stickers et porte-clés."
  },
  merchStickers: { en: 'Stickers', id: 'Stiker', ru: 'Стикеры', zh: '贴纸', fr: 'Stickers' },
  merchKeychains: { en: 'Keychains', id: 'Gantungan kunci', ru: 'Брелоки', zh: '钥匙扣', fr: 'Porte-clés' },
  merchEnlarge: { en: 'Enlarge', id: 'Perbesar', ru: 'Увеличить', zh: '放大', fr: 'Agrandir' },
  merchClose: { en: 'Close', id: 'Tutup', ru: 'Закрыть', zh: '关闭', fr: 'Fermer' },
};

/* ---- messages WhatsApp pré-remplis ----
   {service} = nom officiel anglais de la prestation (jamais traduit). */
const WHATSAPP_MESSAGES = {
  general: {
    en: "Hi Wild West Barbershop! I'd like to book an appointment. Could you let me know your availability? Thank you!",
    id: 'Halo Wild West Barbershop! Saya ingin membuat janji temu. Bisa tolong beri tahu jadwal yang tersedia? Terima kasih!',
    ru: 'Здравствуйте, Wild West Barbershop! Хочу записаться. Подскажите, пожалуйста, свободное время? Спасибо!',
    zh: '你好 Wild West Barbershop！我想预约。请问有哪些空档时间？谢谢！',
    fr: 'Bonjour Wild West Barbershop ! Je souhaiterais prendre rendez-vous. Pouvez-vous me communiquer vos disponibilités ? Merci !'
  },
  service: {
    en: "Hi Wild West Barbershop! I'd like to book the “{service}” service. Could you let me know your availability? Thank you!",
    id: 'Halo Wild West Barbershop! Saya ingin memesan layanan “{service}”. Bisa tolong beri tahu jadwal yang tersedia? Terima kasih!',
    ru: 'Здравствуйте, Wild West Barbershop! Хочу записаться на услугу «{service}». Подскажите, пожалуйста, свободное время? Спасибо!',
    zh: '你好 Wild West Barbershop！我想预约“{service}”服务。请问有哪些空档时间？谢谢！',
    fr: 'Bonjour Wild West Barbershop ! Je souhaiterais réserver la prestation « {service} ». Pouvez-vous me communiquer vos disponibilités ? Merci !'
  }
};
