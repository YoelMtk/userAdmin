import { MenuItem, ReviewItem, GalleryPhoto } from '../types';

export const RESTAURANT_INFO = {
  name: 'Da Gianni',
  tagline: 'Café · Ristorante · Panadería · Bodegón',
  rating: 4.6,
  reviewsCount: 290,
  priceRange: '$5 - $20 por persona',
  plusCode: '5GH2+3QW',
  address: '5GH2+3QW, Santa Cruz 2123, Aragua, Venezuela',
  city: 'Santa Cruz, Estado Aragua',
  phone: '+58 412 889 4220',
  phoneSecondary: '+58 243 261 4050',
  whatsapp: '584128894220',
  email: 'reservas@dagianni.com',
  mapsUrl: 'https://maps.google.com/?q=5GH2%2B3QW+Santa+Cruz+2123+Aragua',
  instagram: '@dagianniristorante',
  deliveryZones: 'Santa Cruz, Cagua, Turmero, Palo Negro (consultar cobertura)',
  established: 'Tradición y Buena Mesa',
  features: [
    { title: 'Consumo en el lugar', desc: 'Salón climatizado y ambiente acogedor para negocios o familia' },
    { title: 'Para llevar (Pick-up)', desc: 'Empacado térmico para retirar café, panes o almuerzos al instante' },
    { title: 'Entrega a domicilio (Delivery)', desc: 'Servicio rápido a tu hogar u oficina en Santa Cruz y alrededores' },
  ],
  hours: [
    { day: 'Lunes a Jueves', hours: '7:00 AM – 10:00 PM', desc: 'Desayunos, almuerzos ejecutivos y cenas' },
    { day: 'Viernes y Sábado', hours: '7:00 AM – 11:30 PM', desc: 'Noches especiales de pastas, cócteles y bodegón' },
    { day: 'Domingo', hours: '8:00 AM – 9:00 PM', desc: 'Desayunos familiares y tradicionales almuerzos dominicales' },
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // 1. Café & Desayuno
  {
    id: 'cafe-01',
    name: 'Un Buen Café Da Gianni',
    category: 'cafe',
    categoryLabel: 'Café & Desayunos',
    description: 'Espresso italiano doble con tueste medio-oscuro, crema aterciopelada de avellana y notas de cacao puro.',
    price: 2.50,
    highlight: 'Especialidad',
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    isPopular: true,
    preparationTime: '5 min',
    dietary: ['Artesanal', '100% Arábica']
  },
  {
    id: 'cafe-02',
    name: 'Minipan de Jamón Y Café Con Leche',
    category: 'cafe',
    categoryLabel: 'Café & Desayunos',
    description: 'El clásico y aclamado por nuestros comensales: minipan de jamón recién horneado con tocineta, pasas y aceitunas, servido con café con leche espumoso.',
    price: 5.50,
    highlight: 'El Más Pedido',
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    isPopular: true,
    preparationTime: '7 min',
    dietary: ['Pan recién horneado']
  },
  {
    id: 'cafe-03',
    name: 'Cappuccino Italiano & Brioche Francés',
    category: 'cafe',
    categoryLabel: 'Café & Desayunos',
    description: 'Cappuccino de vapor sedoso con canela o cacao espolvoreado, acompañado de brioche dulce horneado con mantequilla.',
    price: 4.50,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    preparationTime: '6 min',
    dietary: ['Pastelería de la casa']
  },
  {
    id: 'cafe-04',
    name: 'Desayuno Campesino Gianni',
    category: 'cafe',
    categoryLabel: 'Café & Desayunos',
    description: 'Dos huevos de granja al gusto, queso blanco artesanal a la plancha, tajadas de aguacate, minipan tostado de masa madre y café negro.',
    price: 7.00,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    preparationTime: '12 min',
    dietary: ['Completo & Nutritivo']
  },
  {
    id: 'cafe-05',
    name: 'Omelette Especial Tres Quesos',
    category: 'cafe',
    categoryLabel: 'Café & Desayunos',
    description: 'Huevos batidos con queso mozzarella fundido, queso gouda y lluvia de parmesano, acompañado de pan focaccia al romero.',
    price: 6.00,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    preparationTime: '10 min',
    dietary: ['Vegetariano']
  },

  // 2. Pastas & Ristorante
  {
    id: 'pasta-01',
    name: 'Tagliatelle Bolognese Tradizionale',
    category: 'pastas',
    categoryLabel: 'Pastas & Ristorante',
    description: 'Pasta larga fresca hecha en casa, salsa bolognesa de carne estofada lentamente durante 6 horas con pomodoro San Marzano, hierbas italianas y láminas de Parmigiano Reggiano.',
    price: 12.00,
    highlight: 'Firma de la Casa',
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    isPopular: true,
    preparationTime: '18 min',
    dietary: ['Pasta fresca', 'Receta original']
  },
  {
    id: 'pasta-02',
    name: 'Lasagna della Casa al Horno de Leña',
    category: 'pastas',
    categoryLabel: 'Pastas & Ristorante',
    description: 'Generosas capas de pasta artesanal, carne mechada y molida seleccionada, cremosa bechamel de nuez moscada y abundante queso gratinado dorado.',
    price: 13.50,
    highlight: 'Plato Insignia',
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    isPopular: true,
    preparationTime: '20 min',
    dietary: ['Gratinado']
  },
  {
    id: 'pasta-03',
    name: 'Fettuccine Alfredo con Pollo Crocante',
    category: 'pastas',
    categoryLabel: 'Pastas & Ristorante',
    description: 'Fettuccine en emulsión de crema de leche fresca, mantequilla y queso parmesano añejado, coronado con pechuga de pollo marinada y crocante.',
    price: 12.50,
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    preparationTime: '15 min'
  },
  {
    id: 'pasta-04',
    name: 'Ravioli Ripieni di Ricotta e Spinaci',
    category: 'pastas',
    categoryLabel: 'Pastas & Ristorante',
    description: 'Raviolis hechos a mano rellenos de suave ricotta fresca y espinacas tiernas, servidos con salsa de mantequilla y salvia aromatizada.',
    price: 11.50,
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    preparationTime: '16 min',
    dietary: ['Vegetariano']
  },
  {
    id: 'pasta-05',
    name: 'Risotto ai Funghi Porcini & Tartufo',
    category: 'pastas',
    categoryLabel: 'Pastas & Ristorante',
    description: 'Arroz arborio al dente cocinado con hongos porcini secos rehidratados, vino blanco, mantecatura de mantequilla fría y aceite de trufa blanca.',
    price: 14.50,
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    preparationTime: '22 min'
  },

  // 3. Canastas & Entradas
  {
    id: 'canasta-01',
    name: 'Canasta de Pollo Con Papas Fritas',
    category: 'canastas',
    categoryLabel: 'Canastas & Piqueos',
    description: 'Crujientes tiras de pechuga de pollo empanizadas con nuestra mezcla especial de especias secretas, acompañadas de papas fritas doradas y salsa tártara casera.',
    price: 8.50,
    highlight: 'Destacado por Clientes',
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    isPopular: true,
    preparationTime: '12 min',
    dietary: ['Para compartir']
  },
  {
    id: 'canasta-02',
    name: 'Gran Tabla Antipasto Da Gianni',
    category: 'canastas',
    categoryLabel: 'Canastas & Piqueos',
    description: 'Prosciutto curado, salami milano, cuñas de queso provolone y parmesano, aceitunas marinadas en hierbas y focaccia caliente recién horneada.',
    price: 16.00,
    highlight: 'Ideal para 2-3 personas',
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    isPopular: true,
    preparationTime: '10 min',
    dietary: ['Charcutería fina']
  },
  {
    id: 'canasta-03',
    name: 'Carpaccio di Manzo Clásico',
    category: 'canastas',
    categoryLabel: 'Canastas & Piqueos',
    description: 'Finas láminas de lomo de res sellado, coronado con rúgula fresca, alcaparras baby, virutas de parmesano y reducción balsámica de Módena.',
    price: 10.50,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    preparationTime: '10 min'
  },
  {
    id: 'canasta-04',
    name: 'Burger Gourmet Da Gianni',
    category: 'canastas',
    categoryLabel: 'Canastas & Piqueos',
    description: '200g de carne angus molida en casa, queso provolone ahumado, cebolla caramelizada al vino tinto y rúgula en pan brioche artesanal con papas fritas.',
    price: 11.00,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    preparationTime: '15 min'
  },

  // 4. Panadería & Repostería
  {
    id: 'pan-01',
    name: 'Minipanes de Jamón Artesanales (Ración x2)',
    category: 'panaderia',
    categoryLabel: 'Panadería & Dulces',
    description: 'Masa suave y dorada con mantequilla, rellenos con jamón ahumado de primera, tocineta crujiente, aceitunas sevillanas y pasas dulces.',
    price: 4.50,
    highlight: 'Favorito Diario',
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    isPopular: true,
    preparationTime: 'Listo para servir',
    dietary: ['Horneado a diario']
  },
  {
    id: 'pan-02',
    name: 'Hogaza Campesina de Masa Madre (600g)',
    category: 'panaderia',
    categoryLabel: 'Panadería & Dulces',
    description: 'Corteza crujiente y miga alveolada con 24 horas de fermentación lenta. Ideal para llevar a casa y acompañar con vinos y quesos.',
    price: 4.00,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    preparationTime: 'Listo para llevar',
    dietary: ['100% Masa Madre']
  },
  {
    id: 'pan-03',
    name: 'Torta Tiramisú Tradicional Veneziano',
    category: 'panaderia',
    categoryLabel: 'Panadería & Dulces',
    description: 'Crema suntuosa de queso mascarpone auténtico, bizcochos savoiardi bañados en espresso concentrado y fino licor de café, cubierto de cacao amargo.',
    price: 5.00,
    highlight: 'Postre Estrella',
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    isPopular: true,
    preparationTime: 'Listo para servir'
  },
  {
    id: 'pan-04',
    name: 'Cannoli Siciliani Crocantes (2 unidades)',
    category: 'panaderia',
    categoryLabel: 'Panadería & Dulces',
    description: 'Tubos de masa frita crujiente rellenos al momento con crema dulce de ricotta de oveja, gotas de chocolate oscuro y trocitos de pistacho.',
    price: 4.50,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg',
    preparationTime: 'Listo para servir'
  },

  // 5. Bodegón & Bebidas
  {
    id: 'bodegon-01',
    name: 'Chianti Classico DOCG (Botella 750ml)',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'Tinto toscano de gran elegancia con notas de cereza madura, violeta y sutil toque especiado. Perfecto maridaje para nuestras pastas y carnes.',
    price: 22.00,
    highlight: 'Selección Bodegón',
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    isPopular: true,
    dietary: ['Vino Italiano']
  },
  {
    id: 'bodegon-02',
    name: 'Copa de Vino Tinto Selección Especial',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'Copa servida de nuestra selección rotativa de tintos italianos o chilenos de alta calidad para degustar durante la comida.',
    price: 5.00,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg'
  },
  {
    id: 'bodegon-03',
    name: 'Aperol Spritz Veneziano',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'El aperitivo italiano por excelencia: Aperol, Prosecco burbujeante, soda fría y rodaja de naranja fresca.',
    price: 7.00,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg'
  },
  {
    id: 'bodegon-04',
    name: 'Cerveza Fría Polar / Premium',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'Bien fría a punto de hielo, servida en copa fría o botella.',
    price: 2.50,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg'
  },
  {
    id: 'bodegon-05',
    name: 'Jugo Natural de Frutas Tropicales',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'Preparado al instante con fruta fresca natural: Parchita, Fresa, Mora o Melón.',
    price: 3.00,
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg'
  },

  // 6. Almuerzos Ejecutivos (para comidas de negocio)
  {
    id: 'ejec-01',
    name: 'Menú Ejecutivo Da Gianni: Pasta & Ensalada',
    category: 'ejecutivo',
    categoryLabel: 'Almuerzos Ejecutivos',
    description: 'Diseñado para comidas de negocio de lunes a viernes: Entrada de crema del día o ensalada verde, plato principal de pasta a elegir, bebida natural y espresso.',
    price: 9.50,
    highlight: 'Comidas de Negocios',
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg',
    isPopular: true,
    preparationTime: '10 min',
    dietary: ['Lunes a Viernes 12pm-3pm']
  },
  {
    id: 'ejec-02',
    name: 'Menú Ejecutivo Suprema de Pollo al Limón',
    category: 'ejecutivo',
    categoryLabel: 'Almuerzos Ejecutivos',
    description: 'Pechuga a la plancha con delicada emulsión de limón y alcaparras, arroz aromatizado o puré rústico, ensalada fresca y bebida.',
    price: 10.50,
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg',
    preparationTime: '12 min',
    dietary: ['Lunes a Viernes 12pm-3pm']
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    author: 'Darwing Meneses',
    role: 'Local Guide Google',
    reviewCount: '721 opiniones · 925 fotos',
    rating: 5,
    relativeTime: 'Reseña verificada',
    highlightQuote: 'Genial en Santa Cruz, la mejor opción al momento de disfrutar de platos especiales para cualquier ocasión.',
    text: 'Excelentes instalaciones, un menú de primera y una excelente atención hacen de Da Gianni tu decisión obligada. Exquisita panadería y un buen bodegón de bebidas marcan la diferencia. Da Gianni es el punto.',
    avatarLetter: 'D'
  },
  {
    author: 'Renny Arcia',
    role: 'Local Guide Google',
    reviewCount: '23 opiniones · 2 fotos',
    rating: 5,
    relativeTime: 'Reseña verificada',
    highlightQuote: 'Agradable lugar para comidas de negocio. Precio por persona $20-25.',
    text: 'Un ambiente verdaderamente cómodo y profesional para cerrar tratos y compartir con socios. El servicio es puntual, los platos tienen una presentación impecable y el salón climatizado brinda total privacidad y tranquilidad.',
    avatarLetter: 'R'
  },
  {
    author: 'Mariángel Colmenárez',
    role: 'Cliente Frecuente',
    reviewCount: 'Cliente verificado Santa Cruz',
    rating: 5,
    relativeTime: 'Hace 3 semanas',
    highlightQuote: 'El café y los minipanes de jamón son un ritual indispensable.',
    text: 'Vengo casi todas las mañanas por mi café con leche y el minipan de jamón recién salido del horno. La masa es suave y el sabor no tiene comparación en todo Aragua. Por las tardes las pastas son simplemente extraordinarias.',
    avatarLetter: 'M'
  },
  {
    author: 'Eduardo Tovar',
    role: 'Visita Familiar',
    reviewCount: '18 opiniones',
    rating: 5,
    relativeTime: 'Hace 1 mes',
    highlightQuote: 'La canasta de pollo con papas fritas y las pastas al horno son una delicia.',
    text: 'Celebramos el cumpleaños de mi mamá en Da Gianni y la experiencia fue de 10 puntos. Pedimos pastas, la gran tabla de antipastos y una botella de vino del bodegón. Excelente relación precio-calidad.',
    avatarLetter: 'E'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-01',
    title: 'Salón Principal y Comedor Nocturno',
    category: 'ambiente',
    categoryLabel: 'Ambiente & Salón',
    description: 'Iluminación cálida, mobiliario de madera noble y climatización pensada para cenas íntimas o reuniones ejecutivas.',
    image: '/src/assets/images/hero_restaurant_atmosphere_1792069079780.jpg'
  },
  {
    id: 'gal-02',
    title: 'Tagliatelle Bolognese Tradizionale',
    category: 'comidas',
    categoryLabel: 'Platos & Pastas',
    description: 'Pasta artesanal fresca bañada en ragù lento de 6 horas, albahaca fresca y láminas generosas de Parmigiano Reggiano.',
    image: '/src/assets/images/food_artisan_pasta_1792069080135.jpg'
  },
  {
    id: 'gal-03',
    title: 'Desayunos con Café & Panadería',
    category: 'cafe',
    categoryLabel: 'Café & Panadería',
    description: 'Cappuccino italiano preparado con precisión de barista junto a nuestro célebre minipan de jamón y bollería recién horneada.',
    image: '/src/assets/images/cafe_breakfast_croissant_1792069082543.jpg'
  },
  {
    id: 'gal-04',
    title: 'Bodegón de Vinos & Piqueos',
    category: 'bodegon',
    categoryLabel: 'Bodegón & Bebidas',
    description: 'Nuestra cava con etiquetas seleccionadas internacionales y tablas de embutidos y canasta de pollo crocante.',
    image: '/src/assets/images/restaurant_bodegon_wine_1792069082102.jpg'
  }
];

export const FAQS = [
  {
    q: '¿Cómo funciona el servicio de Delivery y pedidos para llevar?',
    a: 'Puedes armar tu pedido directamente en esta web y enviarlo con un solo clic a nuestro WhatsApp oficial con el detalle y total calculado. También puedes llamarnos o escribirnos para coordinar el retiro rápido o la entrega en tu domicilio u oficina.'
  },
  {
    q: '¿Cuentan con espacio para almuerzos o cenas de negocios?',
    a: 'Sí. Da Gianni cuenta con un salón climatizado con mesas amplias y ambiente acústicamente sereno, muy recomendado por ejecutivos de Santa Cruz y Cagua para reuniones y acuerdos comerciales.'
  },
  {
    q: '¿Cuáles son los métodos de pago aceptados?',
    a: 'Aceptamos divisas en efectivo ($ USD y € EUR), Zelle, Pago Móvil y punto de venta bancario al cambio del día.'
  },
  {
    q: '¿Es necesario reservar con anticipación?',
    a: 'No es obligatorio para visitas regulares, pero te recomendamos reservar especialmente los fines de semana o para grupos de más de 4 personas a través de nuestro módulo en línea.'
  }
];
