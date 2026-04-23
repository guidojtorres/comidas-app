export const DAYS = [
  {
    name: "Domingo",
    emoji: "🔥",
    tag: "MEAL PREP",
    meals: {
      desayuno: { title: "Avena overnight", desc: "Avena + leche + banana + miel. Dejás 5 porciones en frascos para la semana.", time: "10 min" },
      almuerzo: { title: "Pechuga al horno + arroz", desc: "Cociná 2kg de pechuga con verduras. Hacé una olla grande de arroz. Porcioná para lunes a miércoles.", time: "Incluido en prep" },
      merienda: { title: "Bastones de verdura con hummus", desc: "Zanahoria y apio en bastones + hummus casero (garbanzos, tahini, limón, ajo).", time: "10 min" },
      cena: { title: "Tarta de jamón y queso", desc: "Hacé 2 tartas: una para hoy, otra se freezea cortada en porciones.", time: "Incluido en prep" },
    },
    prep: "HOY SE COCINA FUERTE (2-3hs): 2kg pechuga al horno · Olla de arroz · 2 tartas · Tuco grande · Hummus · Avena overnight x5 · Lavar y cortar verduras de la semana",
  },
  {
    name: "Lunes",
    emoji: "⚡",
    tag: "RÁPIDO",
    meals: {
      desayuno: { title: "Avena overnight", desc: "Sacás un frasco de la heladera. Listo.", time: "0 min" },
      almuerzo: { title: "Bowl de pechuga", desc: "Pechuga desmenuzada del domingo + arroz + tomate cherry + palta. Calentar y servir.", time: "5 min" },
      merienda: { title: "Tostadas con hummus", desc: "Pan tostado + hummus del domingo + pimentón ahumado arriba.", time: "3 min" },
      cena: { title: "Fideos con tuco", desc: "Hervir fideos + calentar tuco del domingo. Queso rallado arriba.", time: "15 min" },
    },
  },
  {
    name: "Martes",
    emoji: "🥗",
    tag: "LIVIANO",
    meals: {
      desayuno: { title: "Avena overnight", desc: "Otro frasco. Podés agregarle frutas distintas cada día.", time: "0 min" },
      almuerzo: { title: "Wrap de pechuga", desc: "Tortilla de trigo + pechuga del domingo + lechuga + tomate + mayonesa casera.", time: "10 min" },
      merienda: { title: "Yogur con granola", desc: "Yogur natural + granola comprada o avena tostada con miel.", time: "2 min" },
      cena: { title: "Tarta freezada + ensalada", desc: "Sacás porción de tarta del freezer, al horno 15 min. Ensalada de lechuga y tomate.", time: "20 min" },
    },
  },
  {
    name: "Miércoles",
    emoji: "🍳",
    tag: "VERSÁTIL",
    meals: {
      desayuno: { title: "Avena overnight", desc: "Frasco #4. Agregale una cucharada de mantequilla de maní.", time: "0 min" },
      almuerzo: { title: "Arroz salteado", desc: "Último arroz del domingo salteado con huevo, verduras y salsa de soja. Estilo oriental.", time: "15 min" },
      merienda: { title: "Tostadas con palta", desc: "Pan + palta pisada + sal + limón. Simple y rendidor.", time: "5 min" },
      cena: { title: "Omelette completo", desc: "Huevos + jamón + queso + lo que encuentres en la heladera. Con pan.", time: "10 min" },
    },
  },
  {
    name: "Jueves",
    emoji: "🍲",
    tag: "ESTOFADO",
    meals: {
      desayuno: { title: "Avena overnight", desc: "Último frasco de la semana.", time: "0 min" },
      almuerzo: { title: "Estofado de carne con papas", desc: "Carne cortada en cubos + papa + zanahoria + cebolla + vino tinto. Cociná de más para mañana.", time: "50 min" },
      merienda: { title: "Tostadas con dulce de leche", desc: "Clásico argentino. Pan tostado con DDL.", time: "2 min" },
      cena: { title: "Milanesas al horno + puré", desc: "Hacé milanesas de más y freezá las que sobren para emergencias.", time: "40 min" },
    },
    prep: "MINI PREP: Cortar carne en cubos para el estofado · Hacer milanesas extra para freezar",
  },
  {
    name: "Viernes",
    emoji: "😌",
    tag: "RELAX",
    meals: {
      desayuno: { title: "Tostadas con huevo", desc: "Pan tostado + huevo revuelto o frito + sal y pimienta.", time: "5 min" },
      almuerzo: { title: "Estofado de carne (sobras)", desc: "Recalentado del jueves. Los estofados siempre están mejor al día siguiente.", time: "5 min" },
      merienda: { title: "Mate con bizcochitos", desc: "Comprar bizcochitos de grasa en panadería de barrio.", time: "0 min" },
      cena: { title: "Pizza casera rápida", desc: "Masa comprada en panadería + salsa + muzza + lo que quieras. Más barato que delivery.", time: "25 min" },
    },
  },
  {
    name: "Sábado",
    emoji: "🎉",
    tag: "ESPECIAL",
    meals: {
      desayuno: { title: "Tostado de jamón y queso", desc: "Pan de molde + jamón + queso en tostadora o sartén. Rápido y contundente.", time: "5 min" },
      almuerzo: { title: "Hamburguesas caseras", desc: "Carne picada + cebolla + huevo + pan rallado. Hacé de más y freezá.", time: "30 min" },
      merienda: { title: "Tostado de tomate y queso", desc: "Pan de molde + rodajas de tomate + queso. Gratinar en horno o tostadora.", time: "5 min" },
      cena: { title: "Milanesa napolitana", desc: "Usá las milanesas freezadas del jueves. Salsa + jamón + muzza al horno.", time: "20 min" },
    },
    prep: "MAÑANA ES DOMINGO: revisá qué falta, armá la lista del super para el meal prep",
  },
];
