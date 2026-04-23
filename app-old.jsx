import { useState } from "react";

const DAYS = [
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
        prep: "HOY SE COCINA FUERTE (2-3hs): 2kg pechuga al horno · Olla de arroz · 2 tartas · Tuco grande · Hummus · Avena overnight x5 · Lavar y cortar verduras de la semana"
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
        }
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
        }
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
        }
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
        prep: "MINI PREP: Cortar carne en cubos para el estofado · Hacer milanesas extra para freezar"
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
        }
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
        prep: "MAÑANA ES DOMINGO: revisá qué falta, armá la lista del super para el meal prep"
    },
];

const RECIPES = [
    {
        id: "avena",
        title: "Avena overnight",
        emoji: "🥣",
        category: "desayuno",
        time: "10 min + reposo",
        portions: "5 porciones",
        ingredients: ["250g avena en copos", "1L leche", "2 cdas miel", "1 banana (opcional)", "Toppings: dulce de leche, mantequilla de maní"],
        steps: [
            "En cada frasco (o tupper) poné 50g de avena.",
            "Agregá 200ml de leche a cada uno.",
            "Sumá un chorrito de miel y revolvé bien.",
            "Tapá y guardá en la heladera.",
            "Se come frío al día siguiente. Agregá toppings al momento de comer.",
        ]
    },
    {
        id: "pechuga",
        title: "Pechuga al horno",
        emoji: "🍗",
        category: "almuerzo",
        time: "50 min",
        portions: "8-10 porciones",
        ingredients: ["2kg pechuga de pollo", "2 cebollas cortadas en cuartos", "3 zanahorias en rodajas", "3 cdas aceite", "Sal, pimienta, pimentón ahumado"],
        steps: [
            "Precalentá el horno a 200°C.",
            "Salpimentá las pechugas y untá con aceite y pimentón.",
            "En una asadera poné las verduras cortadas como cama.",
            "Apoyá las pechugas arriba de las verduras.",
            "Horneá 40-45 min hasta que estén doradas y cocidas.",
            "Dejá enfriar, desmenuzá y porcioná en tuppers para la semana.",
        ]
    },
    {
        id: "arroz",
        title: "Arroz blanco (batch)",
        emoji: "🍚",
        category: "base",
        time: "20 min",
        portions: "6-8 porciones",
        ingredients: ["500g arroz largo fino", "1L agua", "1 cda aceite", "Sal a gusto"],
        steps: [
            "Enjuagá el arroz bajo agua fría hasta que salga clara.",
            "En una olla grande, calentá el aceite y tostá el arroz 1 minuto.",
            "Agregá el agua hirviendo y sal.",
            "Cuando rompa hervor, bajá el fuego al mínimo y tapá.",
            "Cociná 15-17 min sin destapar.",
            "Apagá el fuego, dejá reposar 5 min tapado. Separé con tenedor.",
        ]
    },
    {
        id: "tuco",
        title: "Tuco casero",
        emoji: "🍅",
        category: "base",
        time: "40 min",
        portions: "6-8 porciones",
        ingredients: ["2 latas salsa de tomate", "2 cebollas picadas", "3 dientes de ajo", "1 zanahoria rallada", "Aceite, sal, orégano, azúcar (pizca)"],
        steps: [
            "En una olla, calentá aceite y rehogá la cebolla hasta que esté transparente.",
            "Agregá el ajo picado y la zanahoria rallada. Cociná 2 min.",
            "Sumá las latas de salsa de tomate y medio vaso de agua.",
            "Condimentá con sal, orégano y una pizca de azúcar (saca la acidez).",
            "Dejá cocinar a fuego bajo 25-30 min, revolviendo cada tanto.",
            "Guardá en tuppers. Dura 5 días en heladera o 3 meses en freezer.",
        ]
    },
    {
        id: "hummus",
        title: "Hummus casero",
        emoji: "🫘",
        category: "snack",
        time: "15 min (+ cocción garbanzos)",
        portions: "6-8 porciones",
        ingredients: ["1 lata garbanzos (o 200g secos cocidos)", "2 cdas tahini", "Jugo de 1 limón", "1 diente de ajo", "2 cdas aceite de oliva", "Sal, pimentón ahumado"],
        steps: [
            "Si usás garbanzos secos, remojalos 8hs y hervilos 1 hora. Si usás lata, escurrilos.",
            "Poné los garbanzos en un bowl y pisalos bien con tenedor (o procesadora si tenés).",
            "Agregá tahini, jugo de limón, ajo picado finito, aceite y sal.",
            "Mezclá hasta lograr una pasta cremosa. Si queda seca, sumá un poco del agua de los garbanzos.",
            "Serví con un hilo de aceite y pimentón ahumado arriba.",
            "Guardá en tupper tapado en la heladera. Dura 5 días.",
        ]
    },
    {
        id: "tarta",
        title: "Tarta de jamón y queso",
        emoji: "🥧",
        category: "cena",
        time: "45 min",
        portions: "6-8 porciones (x2 tartas)",
        ingredients: ["4 tapas de tarta (compradas)", "300g jamón cocido", "400g queso cremoso", "4 huevos", "Sal, pimienta, nuez moscada"],
        steps: [
            "Precalentá el horno a 180°C.",
            "Forrá dos tarteras con una tapa de tarta cada una, pinchá la base con tenedor.",
            "Cortá el jamón en cubitos y distribuí en las bases.",
            "En un bowl, mezclá los huevos, el queso cremoso cortado en cubos, sal, pimienta y nuez moscada.",
            "Volcá la mezcla sobre el jamón en cada tartera.",
            "Cubrí con la otra tapa de tarta, sellá los bordes con tenedor y pinchá arriba.",
            "Horneá 30-35 min hasta que estén doradas.",
            "Una se come hoy. La otra se enfría, se corta en porciones y se freezea.",
        ]
    },
    {
        id: "bowl",
        title: "Bowl de pechuga",
        emoji: "🥗",
        category: "almuerzo",
        time: "5 min",
        portions: "1 porción",
        ingredients: ["1 porción pechuga desmenuzada (del domingo)", "1 porción arroz (del domingo)", "Tomate cherry cortados", "½ palta en cubos", "Sal, limón, aceite"],
        steps: [
            "Calentá en microondas o sartén la pechuga y el arroz.",
            "Armá el bowl: arroz abajo, pechuga al costado.",
            "Agregá tomate cherry cortado y palta en cubos.",
            "Condimentá con sal, un chorro de limón y aceite.",
        ]
    },
    {
        id: "fideos_tuco",
        title: "Fideos con tuco",
        emoji: "🍝",
        category: "cena",
        time: "15 min",
        portions: "2 porciones",
        ingredients: ["200g fideos (los que prefieras)", "1 porción de tuco (del domingo)", "Queso rallado", "Sal"],
        steps: [
            "Poné agua a hervir con sal en una olla grande.",
            "Cuando hierva, tirá los fideos y cociná según el paquete (usualmente 8-10 min).",
            "Mientras, calentá el tuco en una sartén o en microondas.",
            "Colá los fideos, servilos y poné el tuco arriba.",
            "Terminá con queso rallado generoso.",
        ]
    },
    {
        id: "wrap",
        title: "Wrap de pechuga",
        emoji: "🌯",
        category: "almuerzo",
        time: "10 min",
        portions: "1-2 porciones",
        ingredients: ["2 tortillas de trigo", "Pechuga desmenuzada (del domingo)", "Lechuga lavada", "Tomate en rodajas", "Mayonesa"],
        steps: [
            "Calentá las tortillas 30 seg en sartén seca o microondas (quedan más flexibles).",
            "Untá con mayonesa.",
            "Poné lechuga, tomate en rodajas y pechuga desmenuzada.",
            "Enrollá bien apretado, doblando primero los costados.",
            "Cortá al medio en diagonal para servir.",
        ]
    },
    {
        id: "arroz_salteado",
        title: "Arroz salteado oriental",
        emoji: "🍳",
        category: "almuerzo",
        time: "15 min",
        portions: "2 porciones",
        ingredients: ["Arroz sobrante del domingo", "2 huevos", "½ cebolla picada", "1 zanahoria en cubitos", "2 cdas salsa de soja", "Aceite"],
        steps: [
            "Calentá aceite en una sartén grande o wok a fuego fuerte.",
            "Salteá la cebolla y la zanahoria 3-4 min.",
            "Hacé un hueco al costado, rompé los huevos y revolcálos hasta que cuajen.",
            "Agregá el arroz frío y mezclá todo.",
            "Subí el fuego, agregá la salsa de soja y salteá 2-3 min más.",
            "El secreto es fuego bien fuerte y arroz frío (no recién hecho).",
        ]
    },
    {
        id: "omelette",
        title: "Omelette completo",
        emoji: "🥚",
        category: "cena",
        time: "10 min",
        portions: "1 porción",
        ingredients: ["3 huevos", "2 fetas de jamón picado", "Queso cremoso en cubos", "Sal, pimienta", "1 cda manteca"],
        steps: [
            "Batí los huevos con sal y pimienta (no mucho, que quede suave).",
            "Derretí la manteca en sartén antiadherente a fuego medio.",
            "Volcá los huevos batidos y dejá que se cocinen 1 minuto sin tocar.",
            "Cuando los bordes empiecen a cuajar, distribuí el jamón y el queso.",
            "Con espátula, doblá al medio y cociná 1-2 min más.",
            "El centro tiene que quedar apenas jugoso. Serví con pan.",
        ]
    },
    {
        id: "estofado",
        title: "Estofado de carne con papas",
        emoji: "🍲",
        category: "almuerzo",
        time: "50 min",
        portions: "4-6 porciones",
        ingredients: ["1kg carne en cubos (roast beef o paleta)", "3 papas grandes en cubos", "2 zanahorias en rodajas", "2 cebollas picadas", "½ vaso vino tinto", "1 lata salsa de tomate", "Aceite, sal, pimentón, laurel"],
        steps: [
            "En una olla grande, calentá aceite y sellá la carne en tandas a fuego fuerte (que se dore, no que hierva).",
            "Retirá la carne y en la misma olla rehogá la cebolla hasta transparente.",
            "Agregá la zanahoria y cociná 2 min.",
            "Subí el fuego, volcá el vino tinto y dejá que evapore el alcohol 1 minuto.",
            "Volvé a poner la carne, agregá la salsa de tomate y agua hasta cubrir.",
            "Condimentá con sal, pimentón y laurel. Tapá y bajá a fuego mínimo.",
            "A los 20 min agregá las papas en cubos.",
            "Cociná todo 20-25 min más hasta que la papa esté tierna y la salsa espesa.",
            "Porcioná: la mitad para hoy, la otra mitad para recalentar mañana.",
        ]
    },
    {
        id: "milanesas",
        title: "Milanesas al horno + puré",
        emoji: "🥩",
        category: "cena",
        time: "40 min",
        portions: "4-6 porciones (+ extra freezer)",
        ingredients: ["Milanesas de carne (compradas o caseras)", "Pan rallado", "2 huevos", "Sal", "Para puré: 4 papas grandes, leche, manteca"],
        steps: [
            "Precalentá el horno a 200°C.",
            "Si las hacés caseras: pasá cada milanesa por huevo batido con sal, luego por pan rallado.",
            "Ponelas en asadera aceitada o con papel manteca. Rociá con un poco de aceite arriba.",
            "Horneá 10-12 min de cada lado hasta que estén crocantes.",
            "Para el puré: herví las papas peladas y cortadas 20 min hasta que estén blandas.",
            "Escurrilas, pisá con pisapapas. Agregá un chorro de leche caliente y manteca.",
            "Mezclá hasta que quede cremoso. Salpimentá.",
            "Las milanesas extra: dejalas crudas (empanadas) en bandeja separada con papel film y freezá.",
        ]
    },
    {
        id: "pizza",
        title: "Pizza casera rápida",
        emoji: "🍕",
        category: "cena",
        time: "25 min",
        portions: "2-3 porciones",
        ingredients: ["1 masa de pizza (comprada en panadería)", "3-4 cdas salsa de tomate", "200g muzarella", "Orégano", "Aceite de oliva"],
        steps: [
            "Precalentá el horno al máximo (250°C o lo que dé).",
            "Estirá la masa en la pizzera aceitada.",
            "Esparcí la salsa de tomate dejando el borde libre.",
            "Distribuí la muzarella cortada en fetas o rallada.",
            "Horneá 12-15 min hasta que el borde esté dorado y el queso burbujeante.",
            "Sacá del horno, agregá orégano y un hilo de aceite de oliva.",
        ]
    },
    {
        id: "hamburguesas",
        title: "Hamburguesas caseras",
        emoji: "🍔",
        category: "almuerzo",
        time: "30 min",
        portions: "4-6 hamburguesas",
        ingredients: ["500g carne picada", "1 cebolla chica rallada", "1 huevo", "3 cdas pan rallado", "Sal, pimienta", "Pan de hamburguesa, lechuga, tomate"],
        steps: [
            "En un bowl mezclá la carne, cebolla rallada, huevo, pan rallado, sal y pimienta.",
            "Formá bolitas y aplastá para hacer medallones de 1.5cm de grosor.",
            "Calentá sartén o plancha a fuego fuerte con un poco de aceite.",
            "Cociná 4-5 min de cada lado sin aplastar (pierde jugo).",
            "Armá: pan tostado + lechuga + hamburguesa + tomate + mayonesa.",
            "Las que sobren: ponelas crudas separadas con film en el freezer.",
        ]
    },
    {
        id: "napolitana",
        title: "Milanesa napolitana",
        emoji: "🇮🇹",
        category: "cena",
        time: "20 min",
        portions: "2 porciones",
        ingredients: ["2 milanesas freezadas (del jueves)", "4 cdas salsa de tomate o tuco", "2 fetas jamón", "100g muzarella", "Orégano"],
        steps: [
            "Precalentá el horno a 200°C.",
            "Poné las milanesas congeladas en asadera y horneá 10 min para que se cocinen.",
            "Sacá del horno. Sobre cada milanesa poné: salsa de tomate, una feta de jamón y muzarella.",
            "Volvé al horno 8-10 min hasta que el queso esté gratinado.",
            "Terminá con orégano arriba.",
        ]
    },
    {
        id: "tostado_jyq",
        title: "Tostado de jamón y queso",
        emoji: "🥪",
        category: "desayuno",
        time: "5 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "2 fetas jamón cocido", "1 feta queso cremoso o de máquina"],
        steps: [
            "Armá el sándwich: pan, jamón, queso, pan.",
            "Si tenés tostadora: poné el sándwich y esperá 3-4 min hasta que esté dorado.",
            "Si no: en sartén a fuego medio con un poquito de manteca de cada lado, 2-3 min por lado.",
            "Cortá en diagonal y servilo caliente.",
        ]
    },
    {
        id: "tostado_tyq",
        title: "Tostado de tomate y queso",
        emoji: "🍅",
        category: "merienda",
        time: "5 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "1 tomate en rodajas finas", "Queso cremoso o muzarella", "Sal, orégano"],
        steps: [
            "Tostar ligeramente el pan.",
            "Poné rodajas de tomate sobre una rebanada.",
            "Agregá el queso arriba del tomate.",
            "Si querés gratinado: mandá al horno o tostador eléctrico 3-4 min.",
            "Condimentá con sal y orégano. Tapá con la otra rebanada.",
        ]
    },
    {
        id: "tostadas_huevo",
        title: "Tostadas con huevo",
        emoji: "🍳",
        category: "desayuno",
        time: "5 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "2 huevos", "Manteca o aceite", "Sal, pimienta"],
        steps: [
            "Tostá el pan.",
            "Revuelto: batí los huevos con sal, cociná en sartén con manteca a fuego bajo revolviendo hasta que cuajen suaves.",
            "Frito: calentá aceite en sartén, rompé el huevo y cociná hasta que la clara esté hecha.",
            "Poné los huevos sobre las tostadas. Sal y pimienta.",
        ]
    },
    {
        id: "tostadas_palta",
        title: "Tostadas con palta",
        emoji: "🥑",
        category: "merienda",
        time: "5 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "½ palta madura", "Jugo de ½ limón", "Sal, pimienta"],
        steps: [
            "Tostá el pan.",
            "Pisá la palta con tenedor en un bowl.",
            "Agregá limón, sal y pimienta. Mezclá.",
            "Untá sobre las tostadas.",
        ]
    },
    {
        id: "tostadas_ddl",
        title: "Tostadas con dulce de leche",
        emoji: "🍯",
        category: "merienda",
        time: "2 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "Dulce de leche"],
        steps: [
            "Tostá el pan.",
            "Untá generosamente con dulce de leche.",
            "Listo. No hace falta complicarla.",
        ]
    },
    {
        id: "tostadas_hummus",
        title: "Tostadas con hummus",
        emoji: "🫘",
        category: "merienda",
        time: "3 min",
        portions: "1 porción",
        ingredients: ["2 rebanadas pan de molde", "2-3 cdas hummus (del domingo)", "Pimentón ahumado"],
        steps: [
            "Tostá el pan.",
            "Untá con hummus generoso.",
            "Espolvoreá pimentón ahumado arriba.",
        ]
    },
    {
        id: "yogur_granola",
        title: "Yogur con granola",
        emoji: "🥣",
        category: "merienda",
        time: "2 min",
        portions: "1 porción",
        ingredients: ["1 pote yogur natural", "3-4 cdas granola comprada (o avena tostada con miel)"],
        steps: [
            "Poné el yogur en un bowl o comelo del pote.",
            "Agregá la granola arriba.",
            "Si querés granola casera rápida: tostá avena en sartén seca 5 min con un chorrito de miel.",
        ]
    },
    {
        id: "bastones_hummus",
        title: "Bastones de verdura con hummus",
        emoji: "🥕",
        category: "snack",
        time: "10 min",
        portions: "2-3 porciones",
        ingredients: ["2 zanahorias", "2 ramas de apio", "Hummus casero"],
        steps: [
            "Lavá y pelá las zanahorias.",
            "Cortalas en bastones de 1cm de grosor y 8-10cm de largo.",
            "Lavá el apio y cortá en bastones similares.",
            "Serví con un bowl de hummus al centro para dipear.",
            "Los bastones cortados duran 3-4 días en la heladera en tupper con agua.",
        ]
    },
];

const RECIPE_CATEGORIES = [
    { key: "all", label: "Todas" },
    { key: "base", label: "Bases" },
    { key: "desayuno", label: "Desayunos" },
    { key: "almuerzo", label: "Almuerzos" },
    { key: "merienda", label: "Meriendas" },
    { key: "snack", label: "Snacks" },
    { key: "cena", label: "Cenas" },
];

const SHOPPING = {
    proteinas: ["Pechuga de pollo 2kg", "Carne picada 1kg", "Carne para estofado 1kg (roast beef o paleta)", "Huevos x30", "Milanesas de carne (o hacerlas)", "Chorizo colorado", "Jamón cocido 400g"],
    lacteos: ["Leche 2L", "Yogur natural", "Queso cremoso 500g", "Queso rallado", "Muzarella 500g", "Dulce de leche", "Manteca"],
    verduras: ["Papas 2kg", "Cebolla 2kg", "Zanahoria 1kg", "Tomate 1kg", "Lechuga 2u", "Palta 3u", "Apio 1u", "Limón 3u"],
    secos: ["Arroz 1kg", "Fideos 1kg", "Avena 500g", "Pan lactal", "Tortillas de trigo", "Pan rallado", "Harina 1kg", "Tahini"],
    condimentos: ["Aceite", "Sal", "Salsa de soja", "Salsa de tomate 2 latas", "Mayonesa", "Mermelada", "Pimentón ahumado", "Vino tinto para cocinar"],
};

const TIPS = [
    "Comprá pechuga entera y cortala vos — sale más barato que comprarla ya fileteada.",
    "El estofado mejora con el reposo. Cociná de más el jueves y el viernes tenés almuerzo resuelto.",
    "Freezá en porciones individuales con fecha. Rotulá todo con cinta de papel.",
    "La palta se madura más rápido en bolsa de papel con una banana.",
    "Compará precios: verdulería de barrio para frescos, mayorista para secos.",
    "Los huevos son la proteína más barata y versátil que existe. Tené siempre.",
    "El hummus casero dura 5 días en la heladera y rinde como snack toda la semana.",
];

const mealLabels = { desayuno: "Desayuno", almuerzo: "Almuerzo", merienda: "Merienda", cena: "Cena" };
const mealIcons = { desayuno: "☀️", almuerzo: "🌤️", merienda: "🍵", cena: "🌙" };

export default function MealPlan() {
    const [selectedDay, setSelectedDay] = useState(0);
    const [view, setView] = useState("plan");
    const [recipeFilter, setRecipeFilter] = useState("all");
    const [openRecipe, setOpenRecipe] = useState(null);
    const day = DAYS[selectedDay];

    const filteredRecipes = recipeFilter === "all" ? RECIPES : RECIPES.filter(r => r.category === recipeFilter);

    return (
        <div style={{
            fontFamily: "'Nunito', sans-serif",
            minHeight: "100vh",
            background: "var(--bg, #faf8f5)",
            color: "var(--text, #2d2a26)",
            padding: "0",
        }}>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

            <style>{`
        :root {
          --bg: #faf8f5;
          --text: #2d2a26;
          --card: #ffffff;
          --accent: #e07a3a;
          --accent2: #3a8a6e;
          --accent3: #c4553a;
          --muted: #8a8580;
          --border: #ebe6e0;
          --soft: #f3efe9;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #1a1816;
            --text: #e8e4df;
            --card: #252220;
            --accent: #e8934f;
            --accent2: #4faa88;
            --accent3: #d4664a;
            --muted: #8a8580;
            --border: #3a3633;
            --soft: #2a2724;
          }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .day-btn { transition: all 0.2s ease; cursor: pointer; border: none; }
        .day-btn:hover { transform: translateY(-2px); }
        .meal-card { transition: all 0.2s ease; cursor: default; }
        .meal-card:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .tab-btn { cursor: pointer; transition: all 0.15s ease; border: none; background: none; }
        .recipe-card { transition: all 0.2s ease; cursor: pointer; }
        .recipe-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.1); }
        .cat-chip { cursor: pointer; border: none; transition: all 0.15s ease; }
        .cat-chip:hover { transform: scale(1.05); }
        .back-btn { cursor: pointer; border: none; background: none; transition: all 0.15s ease; }
        .back-btn:hover { transform: translateX(-2px); }
      `}</style>

            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent3) 100%)",
                padding: "28px 20px 20px",
                color: "white",
                borderRadius: "0 0 24px 24px",
            }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85, marginBottom: 4 }}>
                    Plan semanal
                </div>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginBottom: 6,
                }}>
                    Comé rico, gastá poco 🍽️
                </h1>
                <p style={{ fontSize: 13, opacity: 0.85 }}>
                    Meal prep dominical + recetas rápidas entre semana
                </p>
            </div>

            {/* Tabs */}
            <div style={{
                display: "flex",
                gap: 0,
                margin: "16px 16px 0",
                background: "var(--soft)",
                borderRadius: 12,
                padding: 3,
            }}>
                {[["plan", "📅 Plan"], ["recetas", "👨‍🍳 Recetas"], ["compras", "🛒 Compras"], ["tips", "💡 Tips"]].map(([key, label]) => (
                    <button
                        key={key}
                        className="tab-btn"
                        onClick={() => { setView(key); setOpenRecipe(null); }}
                        style={{
                            flex: 1,
                            padding: "10px 0",
                            borderRadius: 10,
                            fontSize: 12,
                            fontWeight: view === key ? 800 : 600,
                            fontFamily: "inherit",
                            color: view === key ? "white" : "var(--muted)",
                            background: view === key ? "var(--accent)" : "transparent",
                        }}
                    >{label}</button>
                ))}
            </div>

            <div style={{ padding: "12px 16px 32px" }}>

                {/* ===== PLAN VIEW ===== */}
                {view === "plan" && (
                    <>
                        <div style={{
                            display: "flex",
                            gap: 6,
                            overflowX: "auto",
                            paddingBottom: 4,
                            marginBottom: 16,
                            marginTop: 4,
                        }}>
                            {DAYS.map((d, i) => (
                                <button
                                    key={i}
                                    className="day-btn"
                                    onClick={() => setSelectedDay(i)}
                                    style={{
                                        minWidth: 56,
                                        padding: "10px 6px 8px",
                                        borderRadius: 14,
                                        background: selectedDay === i ? "var(--accent)" : "var(--card)",
                                        color: selectedDay === i ? "white" : "var(--text)",
                                        border: selectedDay === i ? "none" : "1px solid var(--border)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                        fontFamily: "inherit",
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>{d.emoji}</span>
                                    <span style={{ fontSize: 11, fontWeight: selectedDay === i ? 800 : 600 }}>
                                        {d.name.slice(0, 3)}
                                    </span>
                                    {d.tag && (
                                        <span style={{
                                            fontSize: 8,
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            opacity: 0.7,
                                            letterSpacing: 0.5,
                                        }}>{d.tag}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginBottom: 12 }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 22,
                                fontWeight: 800,
                                color: "var(--text)",
                            }}>
                                {day.emoji} {day.name}
                            </h2>
                            {day.tag && (
                                <span style={{
                                    display: "inline-block",
                                    marginTop: 4,
                                    fontSize: 10,
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                    color: "var(--accent)",
                                }}>{day.tag}</span>
                            )}
                        </div>

                        {day.prep && (
                            <div style={{
                                background: "linear-gradient(135deg, var(--accent2)18, var(--accent2)08)",
                                border: "1px solid var(--accent2)",
                                borderRadius: 14,
                                padding: "12px 14px",
                                marginBottom: 14,
                                fontSize: 12,
                                lineHeight: 1.5,
                                color: "var(--text)",
                            }}>
                                <span style={{ fontWeight: 800, color: "var(--accent2)" }}>📋 </span>
                                {day.prep}
                            </div>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {Object.entries(day.meals).map(([key, meal]) => (
                                <div
                                    key={key}
                                    className="meal-card"
                                    style={{
                                        background: "var(--card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 16,
                                        padding: "14px 16px",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 18 }}>{mealIcons[key]}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--muted)" }}>
                                                {mealLabels[key]}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "var(--accent)",
                                            background: "var(--soft)",
                                            padding: "3px 8px",
                                            borderRadius: 8,
                                        }}>
                                            ⏱ {meal.time}
                                        </span>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: "var(--text)" }}>
                                        {meal.title}
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                                        {meal.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ===== RECETAS VIEW ===== */}
                {view === "recetas" && !openRecipe && (
                    <>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 22,
                            fontWeight: 800,
                            marginTop: 8,
                            marginBottom: 4,
                        }}>
                            👨‍🍳 Recetas
                        </h2>
                        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
                            Paso a paso de cada comida del plan
                        </p>

                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                            {RECIPE_CATEGORIES.map(cat => (
                                <button
                                    key={cat.key}
                                    className="cat-chip"
                                    onClick={() => setRecipeFilter(cat.key)}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: recipeFilter === cat.key ? 800 : 600,
                                        fontFamily: "inherit",
                                        color: recipeFilter === cat.key ? "white" : "var(--text)",
                                        background: recipeFilter === cat.key ? "var(--accent)" : "var(--card)",
                                        border: recipeFilter === cat.key ? "none" : "1px solid var(--border)",
                                    }}
                                >{cat.label}</button>
                            ))}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {filteredRecipes.map(recipe => (
                                <div
                                    key={recipe.id}
                                    className="recipe-card"
                                    onClick={() => setOpenRecipe(recipe.id)}
                                    style={{
                                        background: "var(--card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 16,
                                        padding: "14px 16px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 14,
                                    }}
                                >
                                    <span style={{ fontSize: 32 }}>{recipe.emoji}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: 14, color: "var(--text)", marginBottom: 2 }}>
                                            {recipe.title}
                                        </div>
                                        <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--muted)" }}>
                                            <span>⏱ {recipe.time}</span>
                                            <span>🍽 {recipe.portions}</span>
                                        </div>
                                    </div>
                                    <span style={{ color: "var(--muted)", fontSize: 18 }}>›</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ===== RECIPE DETAIL ===== */}
                {view === "recetas" && openRecipe && (() => {
                    const recipe = RECIPES.find(r => r.id === openRecipe);
                    if (!recipe) return null;
                    return (
                        <>
                            <button
                                className="back-btn"
                                onClick={() => setOpenRecipe(null)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: "var(--accent)",
                                    marginBottom: 12,
                                    marginTop: 4,
                                    fontFamily: "inherit",
                                    padding: "4px 0",
                                }}
                            >
                                ← Volver a recetas
                            </button>

                            <div style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: 20,
                                padding: "20px",
                                marginBottom: 14,
                                textAlign: "center",
                            }}>
                                <div style={{ fontSize: 48, marginBottom: 8 }}>{recipe.emoji}</div>
                                <h2 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 22,
                                    fontWeight: 800,
                                    color: "var(--text)",
                                    marginBottom: 6,
                                }}>{recipe.title}</h2>
                                <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, color: "var(--muted)" }}>
                                    <span>⏱ {recipe.time}</span>
                                    <span>🍽 {recipe.portions}</span>
                                </div>
                            </div>

                            <div style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: 16,
                                padding: "16px",
                                marginBottom: 14,
                            }}>
                                <div style={{ fontWeight: 800, fontSize: 14, color: "var(--accent)", marginBottom: 10 }}>
                                    🧾 Ingredientes
                                </div>
                                {recipe.ingredients.map((ing, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "5px 0",
                                        borderBottom: i < recipe.ingredients.length - 1 ? "1px solid var(--border)" : "none",
                                        fontSize: 13,
                                        color: "var(--text)",
                                    }}>
                                        <span style={{
                                            width: 6, height: 6, borderRadius: "50%",
                                            background: "var(--accent)",
                                            flexShrink: 0,
                                        }} />
                                        {ing}
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: 16,
                                padding: "16px",
                            }}>
                                <div style={{ fontWeight: 800, fontSize: 14, color: "var(--accent2)", marginBottom: 10 }}>
                                    📝 Preparación
                                </div>
                                {recipe.steps.map((step, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "flex-start",
                                        padding: "8px 0",
                                        borderBottom: i < recipe.steps.length - 1 ? "1px solid var(--border)" : "none",
                                    }}>
                                        <span style={{
                                            background: "var(--accent2)",
                                            color: "white",
                                            minWidth: 24, height: 24,
                                            borderRadius: 8,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 12,
                                            fontWeight: 800,
                                            flexShrink: 0,
                                        }}>{i + 1}</span>
                                        <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    );
                })()}

                {/* ===== COMPRAS VIEW ===== */}
                {view === "compras" && (
                    <>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 22,
                            fontWeight: 800,
                            marginTop: 8,
                            marginBottom: 4,
                        }}>
                            🛒 Lista de compras semanal
                        </h2>
                        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                            Todo lo que necesitás para la semana completa
                        </p>

                        {Object.entries(SHOPPING).map(([cat, items]) => {
                            const catNames = { proteinas: "🥩 Proteínas", lacteos: "🧀 Lácteos", verduras: "🥬 Verduras y frutas", secos: "🌾 Secos y harinas", condimentos: "🫙 Condimentos" };
                            return (
                                <div key={cat} style={{
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: 16,
                                    padding: "14px 16px",
                                    marginBottom: 10,
                                }}>
                                    <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8, color: "var(--accent)" }}>
                                        {catNames[cat]}
                                    </div>
                                    {items.map((item, i) => (
                                        <div key={i} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            padding: "6px 0",
                                            borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
                                            fontSize: 13,
                                            color: "var(--text)",
                                        }}>
                                            <span style={{
                                                width: 18, height: 18, borderRadius: 5,
                                                border: "2px solid var(--border)",
                                                flexShrink: 0,
                                            }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </>
                )}

                {/* ===== TIPS VIEW ===== */}
                {view === "tips" && (
                    <>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 22,
                            fontWeight: 800,
                            marginTop: 8,
                            marginBottom: 4,
                        }}>
                            💡 Tips para ahorrar
                        </h2>
                        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                            Trucos para maximizar tu presupuesto
                        </p>

                        {TIPS.map((tip, i) => (
                            <div key={i} style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: 14,
                                padding: "14px 16px",
                                marginBottom: 8,
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                            }}>
                                <span style={{
                                    background: "var(--accent)",
                                    color: "white",
                                    width: 26, height: 26,
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 13,
                                    fontWeight: 800,
                                    flexShrink: 0,
                                }}>{i + 1}</span>
                                <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>{tip}</span>
                            </div>
                        ))}

                        <div style={{
                            marginTop: 16,
                            background: "linear-gradient(135deg, var(--accent)15, var(--accent3)10)",
                            border: "1px solid var(--accent)",
                            borderRadius: 16,
                            padding: "16px",
                            textAlign: "center",
                        }}>
                            <div style={{ fontSize: 28, marginBottom: 6 }}>💰</div>
                            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4, color: "var(--accent)" }}>
                                Ahorro estimado
                            </div>
                            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                                Cocinando en casa vs. delivery podés ahorrar entre un 50% y 70% del gasto mensual en comida.
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}