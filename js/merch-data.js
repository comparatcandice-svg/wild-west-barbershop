/* =====================================================================
   WILDWEST MERCH — vitrine de l'univers de la marque (PAS une boutique)
   Seul fichier à modifier pour cette rubrique.

   GARDE-FOUS
   - rightsConfirmed : false tant que les droits d'utilisation des
     illustrations ne sont pas confirmés ET documentés. Tant qu'il vaut
     false, la rubrique n'apparaît PAS sur un site publié.
   - localPreview : true = la rubrique s'affiche aussi sur http://localhost
     (prévisualisation de développement). Sans effet sur un site publié.
   - Les images ne sont PAS dans le dépôt : le dossier images/merch/ est
     ignoré par Git. Ne jamais les ajouter avant confirmation des droits.

   RÈGLES D'AFFICHAGE
   - Aucun prix, aucune mention « gratuit » / « disponible », aucun bouton
     d'achat. Le prix n'est affiché que si showPrice vaut true (jamais
     utilisé pour l'instant).
   - visible:false = jamais affiché (ni la collection, ni l'article).
   - w / h : dimensions NATIVES de l'image en pixels. L'image n'est jamais
     affichée ni agrandie au-delà de ces dimensions.

   Un visuel peut être retiré provisoirement : le supprimer de la liste (ou visible:false).
   Il reste alors dans les ressources locales, hors dépôt.

   AJOUTER UNE COLLECTION OU UN ARTICLE (modèle générique, à copier)
   { id: 'collection-id', title: 'cléDeTitreDansTranslations', layout: 'stickers' | 'photos',
     visible: false,                       // passer à true uniquement une fois validé
     items: [
       { id: 'article-id', image: 'images/merch/fichier.webp', w: 000, h: 000,
         alt: { en: '…', id: '…', ru: '…', zh: '…', fr: '…' },
         visible: true, price: null, showPrice: false }
     ] }
   ===================================================================== */
const MERCH = {
  rightsConfirmed: false,
  localPreview: true,
  intro: 'merchIntro',
  collections: [
    { id: 'stickers', title: 'merchStickers', layout: 'stickers', visible: true, items: [
      { id: 'cowboy-skull', image: 'images/merch/cowboy-skull.webp', w: 345, h: 404, visible: true, price: null, showPrice: false,
        alt: { en: 'Skull in a cowboy hat with a red bandana and a cigarette between its teeth', id: 'Tengkorak bertopi koboi dengan bandana merah, rokok terselip di giginya',
          ru: 'Череп в ковбойской шляпе с красной банданой и сигаретой в зубах', zh: '戴牛仔帽、系红色头巾、口叼香烟的骷髅', fr: 'Crâne en chapeau de cowboy, bandana rouge, cigarette entre les dents' } },
      { id: 'pinup-barber-chair', image: 'images/merch/pinup-barber-chair.webp', w: 304, h: 469, visible: true, price: null, showPrice: false,
        alt: { en: 'Pin-up sitting in a vintage barber chair, holding a pair of scissors', id: 'Pin-up duduk di kursi barber vintage sambil memegang gunting',
          ru: 'Пин-ап девушка в винтажном барберском кресле с ножницами в руке', zh: '坐在复古理发椅上、手持剪刀的海报女郎', fr: 'Pin-up assise dans un fauteuil de barbier vintage, ciseaux à la main' } },
      { id: 'cactus-red-sun', image: 'images/merch/cactus-red-sun.webp', w: 380, h: 371, visible: true, price: null, showPrice: false,
        alt: { en: 'Cactus in front of a red sun and desert buttes', id: 'Kaktus di depan matahari merah dan bukit gurun',
          ru: 'Кактус на фоне красного солнца и пустынных скал', zh: '红日与沙漠岩山前的仙人掌', fr: 'Cactus devant un soleil rouge et des buttes du désert' } },
      { id: 'barber-pole', image: 'images/merch/barber-pole.webp', w: 126, h: 393, visible: true, price: null, showPrice: false,
        alt: { en: 'Striped barber pole', id: 'Tiang barber bergaris', ru: 'Полосатый барберский столб', zh: '条纹理发店旋转灯柱', fr: 'Poteau de barbier rayé' } },
      { id: 'cowboy-boot', image: 'images/merch/cowboy-boot.webp', w: 264, h: 290, visible: true, price: null, showPrice: false,
        alt: { en: 'Cowboy boot with a spur', id: 'Sepatu bot koboi dengan taji', ru: 'Ковбойский сапог со шпорой', zh: '带马刺的牛仔靴', fr: 'Botte de cowboy avec éperon' } }
    ] },
    { id: 'keychains', title: 'merchKeychains', layout: 'photos', visible: true, items: [
      { id: 'keychain-cactus', image: 'images/merch/keychain-cactus.webp', w: 384, h: 512, visible: true, price: null, showPrice: false,
        alt: { en: 'Round wooden keychain engraved with a cactus in the desert', id: 'Gantungan kunci kayu bundar dengan ukiran kaktus di gurun',
          ru: 'Круглый деревянный брелок с гравировкой кактуса в пустыне', zh: '刻有沙漠仙人掌的圆形木质钥匙扣', fr: 'Porte-clés rond en bois gravé d’un cactus dans le désert' } },
      { id: 'keychain-bull-skull', image: 'images/merch/keychain-bull-skull.webp', w: 384, h: 512, visible: true, price: null, showPrice: false,
        alt: { en: 'Round wooden keychain engraved with a bull skull', id: 'Gantungan kunci kayu bundar dengan ukiran tengkorak banteng',
          ru: 'Круглый деревянный брелок с гравировкой черепа быка', zh: '刻有牛头骨的圆形木质钥匙扣', fr: 'Porte-clés rond en bois gravé d’un crâne de taureau' } },
      { id: 'keychain-boots-hat', image: 'images/merch/keychain-boots-hat.webp', w: 384, h: 512, visible: true, price: null, showPrice: false,
        alt: { en: 'Round wooden keychain engraved with cowboy boots and a hat', id: 'Gantungan kunci kayu bundar dengan ukiran sepatu bot dan topi koboi',
          ru: 'Круглый деревянный брелок с гравировкой ковбойских сапог и шляпы', zh: '刻有牛仔靴和牛仔帽的圆形木质钥匙扣', fr: 'Porte-clés rond en bois gravé de bottes et d’un chapeau de cowboy' } },
      { id: 'keychain-desert-road', image: 'images/merch/keychain-desert-road.webp', w: 384, h: 512, visible: true, price: null, showPrice: false,
        alt: { en: 'Round wooden keychain engraved with a desert road at sunset', id: 'Gantungan kunci kayu bundar dengan ukiran jalan gurun saat matahari terbenam',
          ru: 'Круглый деревянный брелок с гравировкой дороги в пустыне на закате', zh: '刻有日落沙漠公路的圆形木质钥匙扣', fr: 'Porte-clés rond en bois gravé d’une route du désert au soleil couchant' } }
    ] }
  ]
};
