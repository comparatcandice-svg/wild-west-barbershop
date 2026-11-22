/* =====================================================================
   MENUS OFFICIELS — prestations, produits, boissons, prix
   Source de référence : liste transmise par la propriétaire (nov. 2026).
   - name  : nom commercial OFFICIEL, en anglais, jamais traduit.
   - price : en roupies indonésiennes (K = 1 000 IDR), sans conversion.
   - size  : contenance affichée à côté du nom (optionnel).
   - desc / desc2 : lignes de description, par langue (en, id, ru, zh, fr).
   - gloss : true = description affichée seulement hors anglais
             (explication d'un nom, absente du menu officiel).
   - book  : true = bouton « Book » WhatsApp avec le nom de la prestation.
   Pour modifier un prix ou ajouter un produit : modifier uniquement ici.
   ===================================================================== */
const MENU = [
  {
    id: 'cuts', title: 'titleCuts', note: 'noteTax', book: true,
    sections: [{ items: [
      { name: 'Classic Cut', price: '180K', desc: {
        en: 'Classic haircut & styling', id: 'Potongan rambut & styling klasik', ru: 'Классическая стрижка и укладка',
        zh: '经典发型剪裁与造型', fr: 'Coupe classique & coiffage' } },
      { name: 'The Fade', price: '200K', desc: {
        en: 'Any fade style', id: 'Gaya fade apa saja', ru: 'Любой стиль фейда',
        zh: '任意渐变发型', fr: 'Tous styles de dégradé' } },
      { name: 'The Long Rider', price: '200K', desc: {
        en: 'Long hair trim & scissor work', id: 'Rapikan rambut panjang & teknik gunting', ru: 'Стрижка длинных волос ножницами',
        zh: '长发修剪与剪刀工艺', fr: 'Entretien des cheveux longs & travail aux ciseaux' } },
      { name: 'Young Gun', price: '150K', desc: {
        en: 'Kids haircut', id: 'Potongan rambut anak', ru: 'Детская стрижка',
        zh: '儿童理发', fr: 'Coupe enfant' } },
      { name: 'Bald Trim', price: '100K', desc: {
        en: 'Clipper head shave', id: 'Cukur kepala dengan clipper', ru: 'Бритьё головы машинкой',
        zh: '电推剪剃头', fr: 'Rasage de la tête à la tondeuse' } },
      { name: 'Bald Shave', price: '200K', desc: {
        en: 'Full head razor shave', id: 'Cukur kepala penuh dengan pisau cukur', ru: 'Полное бритьё головы опасной бритвой',
        zh: '全头剃刀刮剃', fr: 'Rasage complet de la tête au rasoir' } }
    ] }]
  },
  {
    id: 'grooming', title: 'titleGrooming', note: 'noteTax', book: true,
    sections: [{ items: [
      { name: 'Beard Trim', price: '100K', desc: {
        en: 'Beard shaping & clean-up', id: 'Bentuk & rapikan jenggot', ru: 'Формирование и чистка бороды',
        zh: '胡须造型与清理', fr: 'Mise en forme & entretien de la barbe' } },
      { name: 'Beard Shave', price: '150K', desc: {
        en: 'Traditional razor shave', id: 'Cukur tradisional dengan pisau cukur', ru: 'Традиционное бритьё опасной бритвой',
        zh: '传统剃刀刮胡', fr: 'Rasage traditionnel au rasoir' } },
      { name: 'Black Mask', price: '150K',
        desc: {
          en: 'Deep cleansing charcoal mask', id: 'Masker arang pembersih mendalam', ru: 'Глубоко очищающая угольная маска',
          zh: '深层清洁炭黑面膜', fr: 'Masque au charbon purifiant en profondeur' },
        desc2: {
          en: 'Add to any service: +100K', id: 'Tambahkan ke layanan apa pun: +100K', ru: 'Добавить к любой услуге: +100K',
          zh: '可加购任意服务：+100K', fr: 'À ajouter à toute prestation : +100K' } },
      { name: 'Nose Wax', price: '80K', gloss: true, desc: {
        en: '', id: 'Waxing bulu hidung', ru: 'Удаление волос в носу воском',
        zh: '用蜡去除鼻毛', fr: 'Épilation des narines à la cire' } },
      { name: 'Ear Wax', price: '60K', gloss: true, desc: {
        en: '', id: 'Waxing bulu telinga', ru: 'Удаление волос в ушах воском',
        zh: '用蜡去除耳毛', fr: 'Épilation des oreilles à la cire' } }
    ] }]
  },
  {
    id: 'packages', title: 'titlePackages', subtitle: 'subPackages', note: 'notePackages', book: true,
    sections: [{ items: [
      { name: 'The Drifter', price: '250K', desc: {
        en: 'Haircut + Beard Trim', id: 'Potong rambut + Rapikan jenggot', ru: 'Стрижка + оформление бороды',
        zh: '理发 + 胡须修剪', fr: 'Coupe + taille de barbe' } },
      { name: 'The Outlaw', price: '300K', desc: {
        en: 'Haircut + Beard Shave', id: 'Potong rambut + Cukur jenggot', ru: 'Стрижка + бритьё бороды',
        zh: '理发 + 剃须', fr: 'Coupe + rasage de la barbe' } },
      { name: 'The Gunslinger', price: '450K', desc: {
        en: 'Haircut + Beard Shave + Black Mask + Nose & Ear Wax',
        id: 'Potong rambut + Cukur jenggot + Black Mask + Waxing hidung & telinga',
        ru: 'Стрижка + бритьё бороды + Black Mask + эпиляция воском носа и ушей',
        zh: '理发 + 剃须 + Black Mask 黑面膜 + 鼻耳脱蜡',
        fr: 'Coupe + rasage de la barbe + Black Mask + épilation nez & oreilles à la cire' } }
    ] }]
  },
  {
    id: 'goods', title: 'titleGoods', subtitle: 'subGoodsBrand', subtitle2: 'subGoods',
    sections: [
      { group: 'groupHair', items: [
        { name: 'Tezzen Hercules Charcoal Powder', size: '10g', price: '150K', desc: {
          en: 'For volume & grit', id: 'Untuk volume & tekstur', ru: 'Для объёма и фактуры',
          zh: '增加蓬松度与质感', fr: 'Pour le volume & la texture' } },
        { name: 'Captain Paste Fiber Wax', size: '30g', price: '100K', desc: {
          en: 'For natural control', id: 'Untuk kontrol alami', ru: 'Для естественной фиксации',
          zh: '自然定型', fr: 'Pour un contrôle naturel' } },
        { name: 'Ventana Texture Salt Spray', size: '100ml', price: '125K', desc: {
          en: 'For volume before the ride', id: 'Untuk volume sebelum berkendara', ru: 'Для объёма перед поездкой',
          zh: '出发前打造蓬松感', fr: 'Pour du volume avant de prendre la route' } },
        { name: 'Tezzen Delta Charcoal Clay', size: '100g', price: '250K', desc: {
          en: 'For hold & texture', id: 'Untuk daya tahan & tekstur', ru: 'Для фиксации и фактуры',
          zh: '定型与质感', fr: 'Pour la tenue & la texture' } },
        { name: 'Tezzen Charlie Charcoal Clay', size: '100g', price: '250K', desc: {
          en: 'For natural hold & texture', id: 'Untuk daya tahan alami & tekstur', ru: 'Для естественной фиксации и фактуры',
          zh: '自然定型与质感', fr: 'Pour une tenue & une texture naturelles' } },
        { name: 'Black Friday Water Based Pomade', size: '85g', price: '250K', desc: {
          en: 'For a cleaner ride', id: 'Untuk tampilan lebih rapi', ru: 'Для более аккуратного образа',
          zh: '更清爽整洁', fr: 'Pour un look plus net' } }
      ] },
      { group: 'groupSkin', items: [
        { name: 'Hideung Tanning Oil', size: '100ml', price: '275K', desc: {
          en: 'For that sun-kissed look', id: 'Untuk kulit tampak cokelat alami', ru: 'Для эффекта загара',
          zh: '打造日晒古铜肤色', fr: 'Pour un look hâlé par le soleil' } }
      ] }
    ]
  },
  {
    id: 'drinks', title: 'titleDrinks', subtitle: 'subDrinks', closing: 'slogan',
    sections: [{ items: [
      { name: 'Bintang', size: '330ml', price: '35K',
        desc: { en: 'Pilsener Beer', id: 'Bir Pilsener', ru: 'Пиво пилснер', zh: '皮尔森啤酒', fr: 'Bière pils' },
        desc2: { en: 'Cold beer. Easy ride.', id: 'Bir dingin. Santai saja.', ru: 'Холодное пиво. Лёгкая дорога.',
          zh: '冰爽啤酒，轻松上路。', fr: 'Bière bien fraîche. Route tranquille.' } },
      { name: 'Coke Zero', size: '250ml', price: '20K',
        desc: { en: 'Zero Sugar', id: 'Tanpa gula', ru: 'Без сахара', zh: '零糖', fr: 'Zéro sucre' },
        desc2: { en: 'Crisp, bold & zero sugar.', id: 'Segar, tegas & tanpa gula.', ru: 'Освежающий, насыщенный вкус без сахара.',
          zh: '清爽浓郁，零糖配方。', fr: 'Frais, intense & zéro sucre.' } },
      { name: 'Hydro Coco', size: '250ml', price: '25K',
        desc: { en: 'Coconut Water', id: 'Air kelapa', ru: 'Кокосовая вода', zh: '椰子水', fr: 'Eau de coco' },
        desc2: { en: 'Natural hydration from the island.', id: 'Hidrasi alami dari pulau ini.',
          ru: 'Натуральная гидратация родом с острова.', zh: '来自岛屿的天然水分补给。', fr: "L'hydratation naturelle de l'île." } }
    ] }]
  }
];
