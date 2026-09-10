"use strict";

/* =========================================================
   RESTAURANTE LANCHONETE MM
   SCRIPT PRINCIPAL
========================================================= */

const WHATSAPP = "5519981123401";
const TAXA_ENTREGA = 5;

const CHAVE_CARRINHO = "carrinhoMM";
const CHAVE_PRODUTOS = "produtosMM";
const CHAVE_HISTORICO = "historicoMM";
const CHAVE_SEMENTE = "menuMMInicializadoV3";

let carrinho = [];
let desconto = 0;
let cupomAplicado = "";


/* =========================================================
   FUNÇÕES BÁSICAS
========================================================= */

function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function escaparHTML(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function gerarId() {
    return Date.now().toString(36) + Math.random()
        .toString(36)
        .substring(2, 9);
}


function slug(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


/* =========================================================
   PIZZAS
========================================================= */

const PIZZAS_SALGADAS = [

    {
        nome: "Mussarela Suprema",
        preco: 52,
        descricao: "Molho rústico, muçarela, tomate fresco, azeitonas e orégano."
    },

    {
        nome: "Calabresa Defumada com Cebola Roxa",
        preco: 55,
        descricao: "Molho, muçarela, linguiça calabresa defumada, cebola roxa caramelizada e manjericão."
    },

    {
        nome: "Margherita D'Itália",
        preco: 58,
        descricao: "Tomates pelados, muçarela de búfala, tomates cereja confitados e manjericão fresco."
    },

    {
        nome: "Frango Cremoso com Catupiry",
        preco: 60,
        descricao: "Molho, frango desfiado temperado, requeijão Catupiry original, milho e salsinha."
    },

    {
        nome: "Portuguesa Tradicional",
        preco: 62,
        descricao: "Molho, muçarela, presunto artesanal, ovos cozidos, cebola roxa, ervilhas, azeitonas e pimentões."
    },

    {
        nome: "Quatro Queijos Nobres",
        preco: 65,
        descricao: "Molho, muçarela, provolone, gorgonzola, Catupiry e grana padano."
    },

    {
        nome: "Bacon Crocante com Milho",
        preco: 58,
        descricao: "Molho, muçarela, cubos de bacon defumado crocante e milho verde na manteiga."
    },

    {
        nome: "Pepperoni com Mel Picante",
        preco: 66,
        descricao: "Molho, muçarela de búfala, pepperoni importado, pimenta dedo-de-moça e fio de mel com pimenta."
    },

    {
        nome: "Napolitana Especial",
        preco: 54,
        descricao: "Molho rústico, muçarela, tomate fresco, alho frito dourado e parmesão maturado."
    },

    {
        nome: "Margherita com Rúcula e Tomate Seco",
        preco: 63,
        descricao: "Molho, muçarela, rúcula selvagem, tomate seco artesanal e lascas de parmesão."
    },

    {
        nome: "Alho com Parmesão Trufado",
        preco: 56,
        descricao: "Molho, muçarela, lâminas de alho na manteiga, parmesão gratinado e azeite trufado."
    },

    {
        nome: "Palmito Pupunha com Catupiry",
        preco: 64,
        descricao: "Molho, muçarela, rodelas de palmito pupunha fresco e Catupiry."
    },

    {
        nome: "Atum Sólido com Alcaparras",
        preco: 65,
        descricao: "Molho, muçarela, atum sólido em azeite, cebola roxa e alcaparras importadas."
    },

    {
        nome: "Carne Seca com Cream Cheese",
        preco: 68,
        descricao: "Molho, muçarela, carne seca desfiada na manteiga de garrafa e cream cheese."
    },

    {
        nome: "Escarola com Bacon",
        preco: 59,
        descricao: "Molho, muçarela, escarola fresca refogada, bacon em cubos crocantes e nozes picadas."
    },

    {
        nome: "Brócolis com Bacon e Catupiry",
        preco: 60,
        descricao: "Molho, muçarela, brócolis ninja, bacon crocante, Catupiry e alho dourado."
    },

    {
        nome: "Lombo Canadense com Abacaxi",
        preco: 62,
        descricao: "Molho, muçarela, lombo canadense defumado e pedaços de abacaxi caramelizados."
    },

    {
        nome: "Moda da Casa Especial",
        preco: 70,
        descricao: "Molho, muçarela, carne moída temperada, bacon, champignon, cebola caramelizada e borda de Catupiry."
    },

    {
        nome: "Mexicana Picante",
        preco: 64,
        descricao: "Molho, muçarela, carne moída com jalapeño, pimentões, cheddar cremoso e Doritos."
    },

    {
        nome: "Caprese Suprema",
        preco: 65,
        descricao: "Molho, muçarela de búfala, tomates frescos, pesto de manjericão e balsâmico reduzido."
    }

];


const PIZZAS_DOCES = [

    {
        nome: "Chocolate Belga com Morangos",
        preco: 58,
        descricao: "Chocolate belga cremoso e morangos frescos."
    },

    {
        nome: "Prestígio Gourmet",
        preco: 54,
        descricao: "Chocolate cremoso, coco ralado e leite condensado."
    },

    {
        nome: "Romeu e Julieta com Requeijão",
        preco: 52,
        descricao: "Goiabada cremosa, requeijão e queijo."
    },

    {
        nome: "Banana Caramelizada com Doce de Leite",
        preco: 55,
        descricao: "Banana caramelizada, canela e doce de leite."
    },

    {
        nome: "Sensação de Ninho com Morango",
        preco: 60,
        descricao: "Creme de leite Ninho, chocolate e morangos."
    }

];


const BORDAS_PIZZA = [

    {
        nome: "Sem Borda",
        preco: 0
    },

    {
        nome: "Catupiry",
        preco: 10
    },

    {
        nome: "Cheddar",
        preco: 10
    },

    {
        nome: "Mussarela",
        preco: 12
    },

    {
        nome: "Provolone",
        preco: 12
    },

    {
        nome: "Requeijão com Alho Frito",
        preco: 11
    },

    {
        nome: "Vulcão/Pãozinho",
        preco: 15
    },

    {
        nome: "Chocolate ao Leite",
        preco: 12
    },

    {
        nome: "Chocolate Branco",
        preco: 12
    },

    {
        nome: "Doce de Leite",
        preco: 10
    },

    {
        nome: "Goiabada",
        preco: 10
    }

];


const COMPLEMENTOS_PIZZA = [

    {
        nome: "Azeite Trufado",
        preco: 8
    },

    {
        nome: "Bacon Crocante Extra",
        preco: 7
    },

    {
        nome: "Catupiry Extra",
        preco: 8
    },

    {
        nome: "Cheddar Extra",
        preco: 7
    },

    {
        nome: "Cebola Crispy",
        preco: 5
    },

    {
        nome: "Geleia de Pimenta",
        preco: 6
    },

    {
        nome: "Mussarela Extra",
        preco: 8
    },

    {
        nome: "Ovo Cozido Extra",
        preco: 4
    },

    {
        nome: "Parmesão Ralado",
        preco: 6
    },

    {
        nome: "Pimenta Biquinho",
        preco: 5
    }

];


/* =========================================================
   LANCHES
========================================================= */

const LANCHES = [

    {
        nome: "Burger Clássico da Casa",
        preco: 32,
        descricao: "Pão brioche, hambúrguer artesanal, queijo muçarela, alface, tomate, cebola roxa e molho especial."
    },

    {
        nome: "Burger Bacon Crispy",
        preco: 38,
        descricao: "Pão brioche, hambúrguer artesanal, cheddar, bacon crocante, alface, tomate e molho especial."
    },

    {
        nome: "X-Tudo Especial",
        preco: 42,
        descricao: "Pão, hambúrguer, presunto, queijo, bacon, calabresa, ovo, alface, tomate e molho especial."
    },

    {
        nome: "Burger de Frango Grelhado Fit",
        preco: 30,
        descricao: "Pão integral, frango grelhado, queijo branco, alface, tomate e molho de iogurte."
    },

    {
        nome: "Burger Gorgonzola com Pera",
        preco: 40,
        descricao: "Pão brioche, hambúrguer artesanal, gorgonzola cremoso, pera caramelizada e rúcula."
    },

    {
        nome: "Burger Costela Barbecue",
        preco: 42,
        descricao: "Pão brioche, hambúrguer de costela, cheddar, cebola crispy e molho barbecue."
    },

    {
        nome: "Burger Picanha com Alho",
        preco: 45,
        descricao: "Pão brioche, hambúrguer de picanha, queijo, alho crocante, cebola caramelizada e molho especial."
    },

    {
        nome: "Burger Vegetariano de Grão-de-Bico",
        preco: 32,
        descricao: "Pão brioche, hambúrguer de grão-de-bico, queijo, alface, tomate, cebola e molho especial."
    },

    {
        nome: "Burger Cheddar Melt",
        preco: 36,
        descricao: "Pão brioche, hambúrguer artesanal, cheddar cremoso, cebola caramelizada e molho especial."
    },

    {
        nome: "X-Salada Tradicional",
        preco: 28,
        descricao: "Pão, hambúrguer, queijo, alface, tomate, milho, ervilha e molho especial."
    },

    {
        nome: "X-Bacon Simples",
        preco: 30,
        descricao: "Pão, hambúrguer artesanal, queijo, bacon crocante e molho especial."
    },

    {
        nome: "X-Egg Burger",
        preco: 29,
        descricao: "Pão, hambúrguer artesanal, queijo, ovo, alface, tomate e molho especial."
    },

    {
        nome: "Burger Duplo Smash",
        preco: 38,
        descricao: "Pão brioche, dois hambúrgueres smash, cheddar, cebola e molho especial."
    },

    {
        nome: "Burger com Cream Cheese",
        preco: 37,
        descricao: "Pão brioche, hambúrguer artesanal, cream cheese, queijo, tomate e rúcula."
    },

    {
        nome: "Burger de Frango Empanado (Chicken)",
        preco: 34,
        descricao: "Pão brioche, filé de frango empanado crocante, queijo, alface, tomate e molho especial."
    },

    {
        nome: "X-Calabresa Lanche",
        preco: 31,
        descricao: "Pão, calabresa acebolada, queijo, alface, tomate e molho especial."
    },

    {
        nome: "Burger Salada com Ovo",
        preco: 35,
        descricao: "Pão brioche, hambúrguer artesanal, queijo, ovo, alface, tomate e molho da casa."
    },

    {
        nome: "Burger Poivre (Pimenta do Reino)",
        preco: 39,
        descricao: "Pão brioche, hambúrguer artesanal, molho cremoso de pimenta-do-reino e queijo."
    },

    {
        nome: "Burger Trufado",
        preco: 44,
        descricao: "Pão brioche, hambúrguer artesanal, queijo, creme trufado, cebola caramelizada e rúcula."
    },

    {
        nome: "Burger Mini Trio",
        preco: 48,
        descricao: "Três mini burgers artesanais com sabores variados da casa."
    }

];


/* =========================================================
   HOT DOGS
========================================================= */

const HOTDOGS = [

    {
        nome: "Hot Dog Tradicional",
        preco: 22,
        descricao: "Pão macio, salsicha, molho de tomate, milho, ervilha, batata palha e ketchup."
    },

    {
        nome: "Hot Dog de Frango",
        preco: 26,
        descricao: "Pão, salsicha, frango desfiado temperado, queijo, milho, batata palha e molho especial."
    },

    {
        nome: "Hot Dog Duplo Bacon",
        preco: 28,
        descricao: "Pão, duas salsichas, queijo, bacon crocante, milho, batata palha e molho especial."
    },

    {
        nome: "Hot Dog Mexicano",
        preco: 27,
        descricao: "Pão, salsicha, carne moída temperada, cheddar, jalapeño, milho e molho picante."
    },

    {
        nome: "Hot Dog Forno Gratinado",
        preco: 30,
        descricao: "Pão, salsicha, molho especial, presunto, queijo, catupiry e gratinado no forno."
    },

    {
        nome: "Hot Dog Vegetariano",
        preco: 24,
        descricao: "Pão, legumes grelhados, milho, ervilha, queijo e molho especial."
    },

    {
        nome: "Hot Dog Quatro Queijos",
        preco: 29,
        descricao: "Pão, salsicha, muçarela, cheddar, provolone, catupiry e batata palha."
    },

    {
        nome: "Hot Dog Calabresa Acebolada",
        preco: 26,
        descricao: "Pão, salsicha, calabresa acebolada, queijo, milho e batata palha."
    },

    {
        nome: "Hot Dog Cheddar e Crispy",
        preco: 27,
        descricao: "Pão, salsicha, cheddar cremoso, cebola crispy, milho e batata palha."
    },

    {
        nome: "Hot Dog Especial da Casa",
        preco: 32,
        descricao: "Pão, salsicha, frango, bacon, queijo, cheddar, milho, ervilha, batata palha e molho especial."
    }

];


/* =========================================================
   ESFIRRAS
========================================================= */

const ESFIRRAS_SALGADAS = [

    {
        nome: "Carne com Hortelã",
        preco: 8,
        descricao: "Carne temperada, cebola, tomate e hortelã."
    },

    {
        nome: "Frango com Catupiry",
        preco: 8.5,
        descricao: "Frango desfiado temperado e Catupiry."
    },

    {
        nome: "Queijo Muçarela",
        preco: 8,
        descricao: "Muçarela derretida e orégano."
    },

    {
        nome: "Calabresa com Queijo",
        preco: 8.5,
        descricao: "Calabresa fatiada, muçarela e cebola."
    },

    {
        nome: "Quatro Queijos",
        preco: 9,
        descricao: "Muçarela, provolone, Catupiry e parmesão."
    },

    {
        nome: "Carne Seca com Cream Cheese",
        preco: 10,
        descricao: "Carne seca desfiada e cream cheese."
    },

    {
        nome: "Espinafre com Ricota",
        preco: 8.5,
        descricao: "Espinafre refogado, ricota e temperos."
    },

    {
        nome: "Escarola com Bacon",
        preco: 8.5,
        descricao: "Escarola refogada, bacon e muçarela."
    },

    {
        nome: "Palmito com Catupiry",
        preco: 9,
        descricao: "Palmito pupunha e Catupiry."
    },

    {
        nome: "Pepperoni com Muçarela",
        preco: 9.5,
        descricao: "Pepperoni, muçarela e orégano."
    },

    {
        nome: "Bacon com Milho e Catupiry",
        preco: 9,
        descricao: "Bacon crocante, milho e Catupiry."
    },

    {
        nome: "Atum com Cebola",
        preco: 9.5,
        descricao: "Atum, cebola roxa e muçarela."
    },

    {
        nome: "Lombo Canadense com Queijo",
        preco: 9,
        descricao: "Lombo canadense, muçarela e orégano."
    },

    {
        nome: "Brócolis com Bacon",
        preco: 8.5,
        descricao: "Brócolis, bacon e muçarela."
    },

    {
        nome: "Alho-Poró com Queijo",
        preco: 8.5,
        descricao: "Alho-poró refogado e muçarela."
    },

    {
        nome: "Strogonoff de Frango",
        preco: 9,
        descricao: "Frango cremoso ao molho de strogonoff."
    },

    {
        nome: "Mexicana (Picante)",
        preco: 9.5,
        descricao: "Carne temperada, pimentões, jalapeño e queijo."
    },

    {
        nome: "Marguerita",
        preco: 8.5,
        descricao: "Muçarela, tomate, manjericão e orégano."
    },

    {
        nome: "Catupiry com Alho Frito",
        preco: 8.5,
        descricao: "Catupiry cremoso e alho frito crocante."
    },

    {
        nome: "Moda do Chef",
        preco: 10.5,
        descricao: "Carne, bacon, queijo, cebola caramelizada e tempero especial."
    }

];


const ESFIRRAS_DOCES = [

    {
        nome: "Chocolate com Morango",
        preco: 10,
        descricao: "Chocolate cremoso e morangos."
    },

    {
        nome: "Banana com Doce de Leite",
        preco: 9.5,
        descricao: "Banana, canela e doce de leite."
    },

    {
        nome: "Prestígio",
        preco: 9.5,
        descricao: "Chocolate e coco."
    },

    {
        nome: "Romeu e Julieta",
        preco: 9,
        descricao: "Goiabada e queijo."
    },

    {
        nome: "Sensação de Ninho",
        preco: 10.5,
        descricao: "Creme de leite Ninho, chocolate e morango."
    }

];


/* =========================================================
   PORÇÕES
========================================================= */

const PORCOES = [

    {
        nome: "Batata Frita Rústica com Cheddar e Bacon",
        preco: 38,
        descricao: "Batatas rústicas crocantes, cheddar cremoso e bacon."
    },

    {
        nome: "Frango à Passarinho Crocante",
        preco: 45,
        descricao: "Pedaços de frango temperados e fritos até ficarem crocantes."
    },

    {
        nome: "Filé Mignon Acebolado com Fritas",
        preco: 75,
        descricao: "Tiras de filé mignon, cebola grelhada e batatas fritas."
    },

    {
        nome: "Mandioca Frita com Carne de Sol",
        preco: 58,
        descricao: "Mandioca frita crocante acompanhada de carne de sol."
    },

    {
        nome: "Anéis de Cebola Empanados",
        preco: 28,
        descricao: "Anéis de cebola empanados e crocantes."
    },

    {
        nome: "Polenta Frita com Parmesão",
        preco: 26,
        descricao: "Polenta frita crocante com parmesão ralado."
    },

    {
        nome: "Calabresa Acebolada com Fritas",
        preco: 42,
        descricao: "Calabresa fatiada acebolada acompanhada de fritas."
    },

    {
        nome: "Iscas de Frango Empanadas",
        preco: 44,
        descricao: "Iscas de frango empanadas e crocantes."
    },

    {
        nome: "Tábua de Frios Completa",
        preco: 52,
        descricao: "Seleção de frios, queijos, azeitonas e acompanhamentos."
    },

    {
        nome: "Camarão à Milanesa com Molho Tártaro",
        preco: 85,
        descricao: "Camarões empanados e crocantes acompanhados de molho tártaro."
    }

];


/* =========================================================
   À LA CARTE
========================================================= */

const ALACARTE = [

    {
        nome: "Picanha na Chapa Completa",
        preco: 110,
        descricao: "Picanha grelhada, arroz, feijão, farofa, fritas e salada."
    },

    {
        nome: "Strogonoff de Frango Gratinado",
        preco: 52,
        descricao: "Frango em molho cremoso, queijo gratinado, arroz e batata palha."
    },

    {
        nome: "Peixe Grelhado ao Molho de Alcaparras",
        preco: 62,
        descricao: "Filé de peixe grelhado com molho de alcaparras, arroz e legumes."
    },

    {
        nome: "Filé Mignon ao Molho Madeira",
        preco: 72,
        descricao: "Filé mignon grelhado ao molho madeira e acompanhamentos."
    },

    {
        nome: "Frango Grelhado Fit",
        preco: 46,
        descricao: "Filé de frango grelhado, arroz integral e legumes."
    },

    {
        nome: "Costela Bovina Assada na Brasa",
        preco: 85,
        descricao: "Costela bovina assada lentamente e acompanhamentos."
    },

    {
        nome: "Salmão Grelhado com Molho de Maracujá",
        preco: 78,
        descricao: "Salmão grelhado, molho de maracujá e acompanhamentos."
    },

    {
        nome: "Spaghetti à Carbonara",
        preco: 54,
        descricao: "Massa, bacon, ovos, parmesão e molho cremoso."
    },

    {
        nome: "Bife de Ancho com Batatas Rústicas",
        preco: 82,
        descricao: "Bife de ancho grelhado acompanhado de batatas rústicas."
    },

    {
        nome: "Risoto de Camarão Cremoso",
        preco: 76,
        descricao: "Arroz arbóreo, camarões, parmesão e molho cremoso."
    },

    {
        nome: "Medalhão de Frango ao Bacon",
        preco: 52,
        descricao: "Medalhões de frango envolvidos em bacon e acompanhamentos."
    },

    {
        nome: "Moqueca de Peixe com Camarão",
        preco: 95,
        descricao: "Peixe e camarões ao molho de coco, tomate, pimentão e azeite de dendê."
    },

    {
        nome: "Lombo Suíno ao Molho Barbecue",
        preco: 56,
        descricao: "Lombo suíno grelhado com molho barbecue e acompanhamentos."
    },

    {
        nome: "Arroz de Carreteiro Tradicional",
        preco: 50,
        descricao: "Arroz preparado com carne seca, linguiça e temperos."
    },

    {
        nome: "Strogonoff de Carne Bovina",
        preco: 60,
        descricao: "Carne bovina ao molho cremoso de strogonoff, arroz e batata palha."
    },

    {
        nome: "Filé de Peixe à Dorê",
        preco: 58,
        descricao: "Filé de peixe empanado e frito, acompanhado de arroz e salada."
    },

    {
        nome: "Bife à Cavalo Completo",
        preco: 64,
        descricao: "Bife grelhado com ovos, arroz, feijão, fritas e salada."
    },

    {
        nome: "Risoto de Funghi Secchi",
        preco: 65,
        descricao: "Arroz arbóreo cremoso com funghi secchi e parmesão."
    }

];


/* =========================================================
   PARMEGIANAS
========================================================= */

const PARMEGIANAS = [

    {
        id: "parmegiana-frango",
        nome: "Parmegiana de Frango",
        preco: 58,
        descricao: "Filé de frango empanado, molho de tomate, muçarela gratinada e acompanhamentos."
    },

    {
        id: "parmegiana-peixe",
        nome: "Parmegiana de Peixe",
        preco: 62,
        descricao: "Filé de peixe empanado, molho especial, muçarela gratinada e acompanhamentos."
    }

];


/*
 * Para a parmegiana de carne o cliente escolhe
 * Mignon ou Alcatra.
 *
 * O preço base será R$ 68,00 até que o restaurante
 * defina preços diferentes para cada corte.
 */
const PARMEGIANA_CARNE_PRECO = 68;


/* =========================================================
   BEBIDAS
========================================================= */

const BEBIDAS = [

    {
        nome: "Coca-Cola Lata 350ml",
        preco: 7,
        descricao: "Refrigerante Coca-Cola lata 350ml."
    },

    {
        nome: "Guaraná Antarctica Lata 350ml",
        preco: 7,
        descricao: "Refrigerante Guaraná Antarctica lata 350ml."
    },

    {
        nome: "Sprite Lata 350ml",
        preco: 7,
        descricao: "Refrigerante Sprite lata 350ml."
    },

    {
        nome: "Fanta Laranja Lata 350ml",
        preco: 7,
        descricao: "Refrigerante Fanta Laranja lata 350ml."
    },

    {
        nome: "Fanta Uva Lata 350ml",
        preco: 7,
        descricao: "Refrigerante Fanta Uva lata 350ml."
    },

    {
        nome: "Coca-Cola 2L",
        preco: 14,
        descricao: "Refrigerante Coca-Cola 2 litros."
    },

    {
        nome: "Guaraná Antarctica 2L",
        preco: 14,
        descricao: "Refrigerante Guaraná Antarctica 2 litros."
    },

    {
        nome: "Suco Natural de Laranja 400ml",
        preco: 9,
        descricao: "Suco natural de laranja."
    },

    {
        nome: "Suco Natural de Limão 400ml",
        preco: 9,
        descricao: "Suco natural de limão."
    },

    {
        nome: "Suco Natural de Maracujá 400ml",
        preco: 9,
        descricao: "Suco natural de maracujá."
    },

    {
        nome: "Cerveja Heineken Long Neck",
        preco: 10,
        descricao: "Cerveja Heineken long neck."
    },

    {
        nome: "Cerveja Stella Artois Long Neck",
        preco: 10,
        descricao: "Cerveja Stella Artois long neck."
    },

    {
        nome: "Cerveja Amstel Long Neck",
        preco: 10,
        descricao: "Cerveja Amstel long neck."
    },

    {
        nome: "Cerveja Original 600ml",
        preco: 16,
        descricao: "Cerveja Original 600ml."
    },

    {
        nome: "Cerveja Heineken 600ml",
        preco: 16,
        descricao: "Cerveja Heineken 600ml."
    },

    {
        nome: "Água Mineral 500ml com Gás",
        preco: 5,
        descricao: "Água mineral 500ml com gás."
    },

    {
        nome: "Água Mineral 500ml sem Gás",
        preco: 5,
        descricao: "Água mineral 500ml sem gás."
    }

];


/* =========================================================
   CARDÁPIO DE ALMOÇO
========================================================= */

const CARDAPIO_ALMOCO = {

    1: {
        titulo: "Segunda-feira",
        tema: "Almoço Caseiro de Segunda",
        misturas: [
            "Frango à milanesa",
            "Bife acebolado",
            "Carne de panela com legumes",
            "Linguiça toscana grelhada"
        ],
        guarnicoes: [
            "Arroz branco",
            "Arroz integral",
            "Feijão carioca",
            "Macarrão ao sugo",
            "Purê de batatas"
        ],
        saladas: [
            "Alface americana",
            "Tomate caipira",
            "Salada de maionese de batata",
            "Cenoura ralada com passas"
        ],
        complementos: [
            "Bacon em cubos crocantes",
            "Calabresa fatiada acebolada",
            "Milho verde na manteiga"
        ],
        pizzas: [
            "Mussarela Suprema",
            "Calabresa Defumada com Cebola Roxa",
            "Frango Cremoso com Catupiry",
            "Margherita D'Itália",
            "Chocolate Belga com Morangos",
            "Prestígio Gourmet"
        ],
        sobremesas: [
            "Pudim de leite condensado",
            "Gelatina colorida"
        ]
    },

    2: {
        titulo: "Terça-feira",
        tema: "Almoço Especial de Terça",
        misturas: [
            "Sobrecoxa assada ao forno",
            "Carne moída com batata",
            "Frango xadrez",
            "Costelinha suína"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão preto",
            "Farofa de bacon",
            "Polenta frita",
            "Espaguete à bolonhesa"
        ],
        saladas: [
            "Alface crespa",
            "Tomate cereja com rúcula",
            "Beterraba cozida em cubos",
            "Repolho roxo com abacaxi"
        ],
        complementos: [
            "Catupiry original",
            "Cheddar cremoso",
            "Ovos cozidos fatiados"
        ],
        pizzas: [
            "Margherita D'Itália",
            "Portuguesa Tradicional",
            "Bacon Crocante com Milho",
            "Napolitana Especial",
            "Romeu e Julieta com Requeijão",
            "Banana Caramelizada com Doce de Leite"
        ],
        sobremesas: [
            "Mousse de maracujá",
            "Pavê de chocolate"
        ]
    },

    3: {
        titulo: "Quarta-feira",
        tema: "Quarta da Feijoada",
        misturas: [
            "Feijoada completa",
            "Strogonoff de frango",
            "Filé de peixe à dorê",
            "Bife de gado acebolado"
        ],
        guarnicoes: [
            "Arroz branco",
            "Farofa de ovos",
            "Couve à mineira",
            "Mandioca cozida",
            "Batata frita"
        ],
        saladas: [
            "Mix de folhas nobres",
            "Salada tropical com manga",
            "Vinagrete fresco",
            "Tomate em rodelas"
        ],
        complementos: [
            "Bacon crocante",
            "Palmito pupunha",
            "Champignon fresco fatiado"
        ],
        pizzas: [
            "Quatro Queijos Nobres",
            "Pepperoni com Mel Picante",
            "Margherita com Rúcula e Tomate Seco",
            "Alho com Parmesão Trufado",
            "Chocolate Branco",
            "Sensação de Ninho"
        ],
        sobremesas: [
            "Torta de limão",
            "Manjar branco com calda de ameixa"
        ]
    },

    4: {
        titulo: "Quinta-feira",
        tema: "Almoço Especial de Quinta",
        misturas: [
            "Frango à parmegiana",
            "Carne de panela com mandioca",
            "Sobrecoxa ao forno",
            "Linguiça calabresa acebolada"
        ],
        guarnicoes: [
            "Arroz branco",
            "Arroz com brócolis",
            "Feijão carioca",
            "Macarrão ao alho e óleo",
            "Batata rústica"
        ],
        saladas: [
            "Alface americana",
            "Salada grega",
            "Cenoura ralada",
            "Maionese de legumes"
        ],
        complementos: [
            "Catupiry",
            "Cheddar",
            "Milho verde",
            "Bacon crocante"
        ],
        pizzas: [
            "Palmito Pupunha com Catupiry",
            "Atum Sólido com Alcaparras",
            "Carne Seca com Cream Cheese",
            "Escarola com Bacon",
            "Chocolate Belga com Morangos",
            "Sensação de Ninho com Morango"
        ],
        sobremesas: [
            "Pudim de leite condensado",
            "Mousse de maracujá"
        ]
    },

    5: {
        titulo: "Sexta-feira",
        tema: "Sexta Especial",
        misturas: [
            "Peixe à milanesa",
            "Picanha suína grelhada",
            "Frango xadrez",
            "Costelinha de porco frita"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão preto",
            "Farofa panko",
            "Espaguete à carbonara",
            "Polenta cremosa"
        ],
        saladas: [
            "Mix de folhas",
            "Tomate com muçarela de búfala",
            "Salada tropical com manga",
            "Beterraba"
        ],
        complementos: [
            "Calabresa fatiada",
            "Ovos cozidos",
            "Champignon",
            "Bacon"
        ],
        pizzas: [
            "Brócolis com Bacon e Catupiry",
            "Lombo Canadense com Abacaxi",
            "Moda da Casa Especial",
            "Mexicana Picante",
            "Prestígio Gourmet",
            "Romeu e Julieta com Requeijão"
        ],
        sobremesas: [
            "Pavê de chocolate",
            "Torta de limão"
        ]
    },

    6: {
        titulo: "Sábado",
        tema: "Sábado Especial",
        misturas: [
            "Feijoada da casa",
            "Frango caipira com quiabo",
            "Lagarto fatiado ao molho madeira",
            "Picanha suína grelhada"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão preto",
            "Couve refogada",
            "Mandioca frita",
            "Pirão",
            "Farofa da casa"
        ],
        saladas: [
            "Salada caesar com croutons",
            "Tomate cereja com rúcula",
            "Vinagrete",
            "Alface crespa"
        ],
        complementos: [
            "Bacon em cubos",
            "Catupiry",
            "Cheddar",
            "Milho verde",
            "Palmito"
        ],
        pizzas: [
            "Caprese Suprema",
            "Mussarela Suprema",
            "Margherita D'Itália",
            "Pepperoni com Mel Picante",
            "Banana Caramelizada com Doce de Leite",
            "Chocolate Branco"
        ],
        sobremesas: [
            "Manjar branco",
            "Gelatina colorida",
            "Pudim de leite"
        ]
    },

    0: {
        titulo: "Domingo",
        tema: "Domingo Especial em Família",
        misturas: [
            "Frango assado inteiro",
            "Lagarto recheado",
            "Costela bovina assada",
            "Filé de frango à milanesa"
        ],
        guarnicoes: [
            "Arroz branco",
            "Arroz com passas",
            "Feijão carioca",
            "Batata souté com ervas",
            "Espaguete à bolonhesa"
        ],
        saladas: [
            "Salada tropical completa",
            "Salada de maionese cremosa",
            "Tomate recheado com atum",
            "Mix de folhas"
        ],
        complementos: [
            "Bacon crocante",
            "Calabresa acebolada",
            "Catupiry",
            "Cheddar",
            "Ovos cozidos"
        ],
        pizzas: [
            "Quatro Queijos Nobres",
            "Frango Cremoso com Catupiry",
            "Portuguesa Tradicional",
            "Moda da Casa Especial",
            "Sensação de Ninho com Morango",
            "Chocolate Belga com Morangos"
        ],
        sobremesas: [
            "Pavê de chocolate",
            "Pudim de leite condensado",
            "Torta de limão"
        ]
    }

};


/* =========================================================
   CARDÁPIO DE JANTAR
========================================================= */

const CARDAPIO_JANTAR = {

    1: {
        titulo: "Segunda-feira",
        tema: "Noite Leve e Reconfortante",

        entradas: [
            "Mix de folhas verdes com cenoura ralada, gomos de laranja e molho cítrico",
            "Caldo verde tradicional"
        ],

        principais: [
            "Filé de frango grelhado com ervas finas e molho de mostarda suave",
            "Filé de tilápia assado com crosta de ervas e limão siciliano"
        ],

        guarnicoes: [
            "Arroz branco",
            "Arroz integral com castanhas",
            "Purê de batata-doce",
            "Legumes ao vapor (brócolis e cenoura)"
        ],

        sobremesas: [
            "Salada de frutas da estação com hortelã",
            "Manjar branco com calda de ameixa"
        ]
    },

    2: {
        titulo: "Terça-feira",
        tema: "Noite Italiana",

        entradas: [
            "Salada Caprese (tomate, muçarela de búfala e manjericão)",
            "Sopa de legumes com massinha"
        ],

        principais: [
            "Escalopes de carne ao molho madeira com champignon",
            "Rondelli recheado com presunto e queijo ao molho pomodoro rústico"
        ],

        guarnicoes: [
            "Arroz branco",
            "Polenta cremosa com parmesão",
            "Mix de legumes salteados na manteiga"
        ],

        sobremesas: [
            "Pavê de chocolate",
            "Torta de limão"
        ]
    },

    3: {
        titulo: "Quarta-feira",
        tema: "Noite Brasileira / Confort Food",

        entradas: [
            "Salada de repolho com abacaxi e maionese leve",
            "Caldinho de feijão com bacon crocante"
        ],

        principais: [
            "Picadinho de carne com legumes e ovos pochê",
            "Filé de frango à parmegiana (em porções menores)"
        ],

        guarnicoes: [
            "Arroz branco",
            "Farofa de banana-da-terra",
            "Couve à mineira refogada com alho",
            "Fatias de laranja"
        ],

        sobremesas: [
            "Pudim de leite condensado",
            "Cocada cremosa"
        ]
    },

    4: {
        titulo: "Quinta-feira",
        tema: "Noite do Chef (Carnes Nobres)",

        entradas: [
            "Carpaccio de carne com alcaparras, parmesão e molho de mostarda e mel",
            "Creme de palmito"
        ],

        principais: [
            "Medalhões de filé mignon ao molho de vinho tinto",
            "Salmão grelhado ao molho de alcaparras e manteiga noisette"
        ],

        guarnicoes: [
            "Arroz branco",
            "Arroz de amêndoas",
            "Batatas rústicas ao alecrim",
            "Aspargos salteados"
        ],

        sobremesas: [
            "Petit Gâteau de chocolate com calda de frutas vermelhas",
            "Cheesecake de frutas vermelhas"
        ]
    },

    5: {
        titulo: "Sexta-feira",
        tema: "Início de Fim de Semana (Descontraído)",

        entradas: [
            "Tábua de frios, castanhas e torradas aromatizadas",
            "Creme de mandioquinha com carne-seca"
        ],

        principais: [
            "Picanha fatiada ao ponto com molho à campanha",
            "Bacalhau à Gomes de Sá (batatas, cebolas, azeitonas e lascas de bacalhau)"
        ],

        guarnicoes: [
            "Arroz branco",
            "Arroz bi-bi (com ovos mexidos e bacon)",
            "Batata frita rústica",
            "Farofa rica"
        ],

        sobremesas: [
            "Torta holandesa",
            "Mousse de maracujá"
        ]
    },

    6: {
        titulo: "Sábado",
        tema: "Noite Festiva e Sofisticada",

        entradas: [
            "Salada Waldorf (maçã, aipo, nozes e maionese leve)",
            "Sopa de cebola gratinada"
        ],

        principais: [
            "Rosbife de carne com molho roastbeef e cogumelos",
            "Risoto de camarão cremoso",
            "Lasanha à bolonhesa tradicional"
        ],

        guarnicoes: [
            "Arroz branco",
            "Arroz com brócolis e alho dourado",
            "Purê de mandioquinha",
            "Legumes grelhados na brasa (abobrinha, berinjela e pimentões)"
        ],

        sobremesas: [
            "Tiramisu tradicional",
            "Torta três chocolates"
        ]
    },

    0: {
        titulo: "Domingo",
        tema: "Jantar Afetivo e Confortável",

        entradas: [
            "Mix de folhas com tomate-cereja, palmito e croutons",
            "Sopa de tomates assados com manjericão"
        ],

        principais: [
            "Pernil suíno assado com molho agridoce de abacaxi",
            "Sobrecoxas de frango assadas com ervas",
            "Escondidinho de carne-seca com requeijão"
        ],

        guarnicoes: [
            "Arroz branco",
            "Arroz grego (com ervilhas, cenoura e passas)",
            "Batatas sautées na manteiga",
            "Farofa de ovos"
        ],

        sobremesas: [
            "Bolo de cenoura com cobertura de chocolate",
            "Pudim"
        ]
    }

};


/* =========================================================
   MENU ESPECIAL DE FERIADOS
========================================================= */

const CARDAPIO_FERIADO = {

    titulo: "Menu Especial de Celebração",
    tema: "Menu Especial de Celebração",

    entradas: [
        "Bruschettas variadas (tomate com manjericão e pasta de cogumelos com trufas)",
        "Salada de folhas nobres com figos frescos, queijo brie e nozes ao molho de romã"
    ],

    principais: [
        "Paleta de cordeiro assada lentamente ao molho de hortelã e vinho",
        "Robalo assado ao forno com molho de camarão e alho-poró",
        "Nhoque artesanal de mandioquinha com molho de tomate rústico"
    ],

    guarnicoes: [
        "Arroz de amêndoas douradas",
        "Arroz branco",
        "Batatas hasselback assadas com azeite e tomilho",
        "Aspargos frescos confitados"
    ],

    sobremesas: [
        "Mil-folhas de creme pâtissier e frutas vermelhas",
        "Petit gâteau com sorvete de baunilha",
        "Torta mousse de chocolate belga"
    ]

};


/* =========================================================
   FERIADOS FIXOS
========================================================= */

const FERIADOS_FIXOS = [
    "01-01",
    "04-21",
    "05-01",
    "09-07",
    "10-12",
    "11-02",
    "11-15",
    "11-20",
    "12-25"
];


function ehFeriado() {

    const hoje = new Date();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return FERIADOS_FIXOS.includes(`${mes}-${dia}`);
}


/* =========================================================
   PRODUTOS DO PDV
========================================================= */

function obterProdutosPDV() {

    try {

        const dados = localStorage.getItem(CHAVE_PRODUTOS);

        if (!dados) {
            return [];
        }

        const produtos = JSON.parse(dados);

        return Array.isArray(produtos)
            ? produtos
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar produtos do PDV:",
            erro
        );

        return [];
    }
}


/* =========================================================
   DISPONIBILIDADE
========================================================= */

function produtoDisponivel(nome, categoria) {

    const produtos = obterProdutosPDV();

    const encontrado = produtos.find(produto => {

        const mesmoNome =
            slug(produto.nome) === slug(nome);

        if (!categoria) {
            return mesmoNome;
        }

        return (
            mesmoNome &&
            slug(produto.categoria) === slug(categoria)
        );

    });


    if (!encontrado) {
        return true;
    }


    return encontrado.disponivel !== false;
}


/* =========================================================
   INICIALIZAÇÃO DO CATÁLOGO
========================================================= */

function inicializarCatalogo() {

    let produtos = obterProdutosPDV();


    const bases = [

        ...LANCHES.map(item => ({
            nome: item.nome,
            categoria: "Lanches",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...HOTDOGS.map(item => ({
            nome: item.nome,
            categoria: "Hot Dogs",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...ESFIRRAS_SALGADAS.map(item => ({
            nome: item.nome,
            categoria: "Esfirras",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...ESFIRRAS_DOCES.map(item => ({
            nome: item.nome,
            categoria: "Esfirras",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...PORCOES.map(item => ({
            nome: item.nome,
            categoria: "Porções",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...ALACARTE.map(item => ({
            nome: item.nome,
            categoria: "À La Carte",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...PARMEGIANAS.map(item => ({
            nome: item.nome,
            categoria: "Parmegianas",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...BEBIDAS.map(item => ({
            nome: item.nome,
            categoria: "Bebidas",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...PIZZAS_SALGADAS.map(item => ({
            nome: item.nome,
            categoria: "Pizzas",
            preco: item.preco,
            descricao: item.descricao
        })),

        ...PIZZAS_DOCES.map(item => ({
            nome: item.nome,
            categoria: "Pizzas",
            preco: item.preco,
            descricao: item.descricao
        }))

    ];


    let alterou = false;


    bases.forEach(base => {

        const existente = produtos.find(produto =>
            slug(produto.nome) === slug(base.nome) &&
            slug(produto.categoria) === slug(base.categoria)
        );


        if (!existente) {

            produtos.push({
                id: gerarId(),
                nome: base.nome,
                categoria: base.categoria,
                preco: Number(base.preco),
                descricao: base.descricao || "",
                disponivel: true
            });

            alterou = true;

        } else {

            if (existente.preco === undefined) {
                existente.preco = base.preco;
                alterou = true;
            }

            if (existente.descricao === undefined) {
                existente.descricao = base.descricao || "";
                alterou = true;
            }

            if (existente.disponivel === undefined) {
                existente.disponivel = true;
                alterou = true;
            }

        }

    });


    if (alterou || !localStorage.getItem(CHAVE_SEMENTE)) {

        localStorage.setItem(
            CHAVE_PRODUTOS,
            JSON.stringify(produtos)
        );

        localStorage.setItem(
            CHAVE_SEMENTE,
            "true"
        );

    }

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function abrirPagina(id) {

    const paginas =
        document.querySelectorAll(".pagina");


    paginas.forEach(pagina => {

        pagina.classList.remove("ativa");

    });


    const destino =
        document.getElementById(id);


    if (!destino) {
        console.warn(
            "Página não encontrada:",
            id
        );
        return;
    }


    destino.classList.add("ativa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "carrinho") {
        renderizarCarrinho();
    }


    if (id === "checkout") {
        renderizarCheckout();
    }


    if (id === "almoco") {
        mostrarCardapioAlmoco();
    }


    if (id === "jantar") {
        mostrarCardapioJantar();
    }


    if (id === "marmitas") {
        renderizarMarmitas();
    }


    if (id === "pizzas") {
        prepararPizza();
    }


    if (id === "lanches") {
        renderizarCategoria(
            "Lanches",
            "listaLanches",
            LANCHES
        );
    }


    if (id === "hotdogs") {
        renderizarCategoria(
            "Hot Dogs",
            "listaHotdogs",
            HOTDOGS
        );
    }


    if (id === "esfirras") {

        renderizarCategoria(
            "Esfirras",
            "listaEsfirrasSalgadas",
            ESFIRRAS_SALGADAS
        );

        renderizarCategoria(
            "Esfirras",
            "listaEsfirrasDoces",
            ESFIRRAS_DOCES
        );

    }


    if (id === "porcoes") {
        renderizarCategoria(
            "Porções",
            "listaPorcoes",
            PORCOES
        );
    }


    if (id === "alacarte") {

        renderizarCategoria(
            "À La Carte",
            "listaAlacarte",
            ALACARTE
        );

        renderizarParmegianas();

    }


    if (id === "bebidas") {

        renderizarCategoria(
            "Bebidas",
            "listaBebidas",
            BEBIDAS
        );

    }

}


/* =========================================================
   HORÁRIO DE FUNCIONAMENTO
========================================================= */

function verificarFuncionamento() {

    const agora = new Date();

    const horas =
        agora.getHours() +
        agora.getMinutes() / 60;


    const almoco =
        horas >= 10.5 &&
        horas < 14;


    const jantar =
        horas >= 18.5 &&
        horas < 23;


    const aberto =
        almoco || jantar;


    const status =
        document.getElementById(
            "statusFuncionamento"
        );


    if (!status) {
        return;
    }


    if (aberto) {

        if (almoco) {

            status.innerHTML =
                "🟢 ABERTO • Almoço até 14:00";

        } else {

            status.innerHTML =
                "🟢 ABERTO • Jantar até 23:00";

        }

        status.classList.add("aberto");
        status.classList.remove("fechado");

    } else {

        status.innerHTML =
            "🔴 FECHADO • Almoço 10:30–14:00 • Jantar 18:30–23:00";

        status.classList.add("fechado");
        status.classList.remove("aberto");

    }

}


/* =========================================================
   CARDÁPIO DE ALMOÇO
========================================================= */

function obterCardapioAlmocoAtual() {

    const dia =
        new Date().getDay();

    return CARDAPIO_ALMOCO[dia];

}


function criarListaCardapio(titulo, itens) {

    if (!Array.isArray(itens) || itens.length === 0) {
        return "";
    }


    return `
        <div class="bloco-cardapio">

            <h3>${escaparHTML(titulo)}</h3>

            <ul>

                ${itens.map(item => `
                    <li>
                        ${escaparHTML(item)}
                    </li>
                `).join("")}

            </ul>

        </div>
    `;
}


function mostrarCardapioAlmoco() {

    const container =
        document.getElementById(
            "cardapioDoDia"
        );


    if (!container) {
        return;
    }


    const cardapio =
        obterCardapioAlmocoAtual();


    if (!cardapio) {

        container.innerHTML = `
            <div class="aviso-vazio">
                Cardápio de almoço indisponível.
            </div>
        `;

        return;
    }


    let html = "";


    html += `
        <div class="cardapio-cabecalho">

            <span>
                ☀️ ALMOÇO DE HOJE
            </span>

            <h3>
                ${escaparHTML(cardapio.titulo)}
            </h3>

            <strong>
                ${escaparHTML(cardapio.tema)}
            </strong>

        </div>
    `;


    if (ehFeriado()) {

        html += `
            <div class="aviso-feriado">

                🎉 Hoje é feriado!

                <strong>
                    Confira também nosso Menu Especial de Celebração.
                </strong>

            </div>
        `;

    }


    html += criarListaCardapio(
        "🥩 Misturas",
        cardapio.misturas
    );


    html += criarListaCardapio(
        "🍚 Guarnições",
        cardapio.guarnicoes
    );


    html += criarListaCardapio(
        "🥗 Saladas",
        cardapio.saladas
    );


    html += criarListaCardapio(
        "➕ Complementos",
        cardapio.complementos
    );


    html += criarListaCardapio(
        "🍕 Pizzas disponíveis",
        cardapio.pizzas
    );


    html += criarListaCardapio(
        "🍰 Sobremesas",
        cardapio.sobremesas
    );


    html += `
        <div class="cardapio-preco">

            <strong>
                Buffet serve-serve
            </strong>

            <span>
                R$ 50,00 por pessoa
            </span>

        </div>
    `;


    container.innerHTML = html;

}


/* =========================================================
   CARDÁPIO DE JANTAR
========================================================= */

function obterCardapioJantarAtual() {

    const dia =
        new Date().getDay();

    return CARDAPIO_JANTAR[dia];

}


function mostrarCardapioJantar() {

    const container =
        document.getElementById(
            "cardapioJantar"
        );


    if (!container) {
        return;
    }


    const cardapio =
        obterCardapioJantarAtual();


    if (!cardapio) {

        container.innerHTML = `
            <div class="aviso-vazio">
                Cardápio de jantar indisponível.
            </div>
        `;

        return;
    }


    let html = `

        <div class="cardapio-cabecalho jantar">

            <span>
                🌙 JANTAR DE HOJE
            </span>

            <h3>
                ${escaparHTML(cardapio.titulo)}
            </h3>

            <strong>
                ${escaparHTML(cardapio.tema)}
            </strong>

        </div>

    `;


    if (ehFeriado()) {

        html += `

            <div class="aviso-feriado">

                🎉 Hoje é feriado!

                <strong>
                    Menu Especial de Celebração disponível.
                </strong>

            </div>

        `;

    }


    html += criarListaCardapio(
        "🥗 Entradas",
        cardapio.entradas
    );


    html += criarListaCardapio(
        "🍽️ Pratos Principais",
        cardapio.principais
    );


    html += criarListaCardapio(
        "🍚 Guarnições",
        cardapio.guarnicoes
    );


    html += criarListaCardapio(
        "🍰 Sobremesas",
        cardapio.sobremesas
    );


    html += `

        <div class="cardapio-preco">

            <strong>
                Buffet especial de jantar
            </strong>

            <span>
                R$ 50,00 por pessoa
            </span>

        </div>

    `;


    container.innerHTML = html;

}


/* =========================================================
   MENU DE FERIADO
========================================================= */

function mostrarMenuFeriado() {

    const cardapio =
        CARDAPIO_FERIADO;


    const html = `

        <div class="cardapio-cabecalho feriado">

            <span>
                🎉 MENU ESPECIAL
            </span>

            <h3>
                ${escaparHTML(cardapio.titulo)}
            </h3>

            <strong>
                ${escaparHTML(cardapio.tema)}
            </strong>

        </div>

        ${criarListaCardapio(
            "🥗 Entradas",
            cardapio.entradas
        )}

        ${criarListaCardapio(
            "🍽️ Pratos Principais",
            cardapio.principais
        )}

        ${criarListaCardapio(
            "🍚 Guarnições",
            cardapio.guarnicoes
        )}

        ${criarListaCardapio(
            "🍰 Sobremesas",
            cardapio.sobremesas
        )}

    `;


    return html;

}


/* =========================================================
   MARMITAS
========================================================= */

const MARMITAS = [

    {
        id: "marmita-pequena",
        nome: "Marmita Pequena",
        preco: 20,
        carnes: 1,
        descricao: "Arroz, feijão, acompanhamentos e escolha de 1 mistura."
    },

    {
        id: "marmita-media",
        nome: "Marmita Média",
        preco: 25,
        carnes: 2,
        descricao: "Arroz, feijão, acompanhamentos e escolha de 2 misturas."
    },

    {
        id: "marmita-grande",
        nome: "Marmita Grande",
        preco: 28,
        carnes: 3,
        descricao: "Arroz, feijão, acompanhamentos e escolha de 3 misturas."
    },

    {
        id: "marmita-comercial",
        nome: "Marmita Comercial",
        preco: 50,
        carnes: 4,
        descricao: "Marmita completa com escolha de até 4 misturas."
    }

];


function obterMisturasMarmita() {

    const almoco =
        obterCardapioAlmocoAtual();


    const jantar =
        obterCardapioJantarAtual();


    const lista = [];


    if (almoco && Array.isArray(almoco.misturas)) {

        almoco.misturas.forEach(item => {

            if (!lista.includes(item)) {
                lista.push(item);
            }

        });

    }


    if (jantar && Array.isArray(jantar.principais)) {

        jantar.principais.forEach(item => {

            if (!lista.includes(item)) {
                lista.push(item);
            }

        });

    }


    return lista;

}


function renderizarMarmitas() {

    const container =
        document.getElementById(
            "listaMarmitas"
        );


    if (!container) {
        return;
    }


    const carnes =
        obterMisturasMarmita();


    container.innerHTML =
        MARMITAS.map(marmita => {

            const opcoes = carnes.length
                ? carnes.map((carne, index) => `

                    <label class="opcao-marmita">

                        <input
                            type="checkbox"
                            name="${marmita.id}-carne"
                            value="${escaparHTML(carne)}"
                            onchange="limitarMisturasMarmita('${marmita.id}', ${marmita.carnes})"
                        >

                        <span>
                            ${escaparHTML(carne)}
                        </span>

                    </label>

                `).join("")
                : `
                    <p>
                        Consulte as opções disponíveis.
                    </p>
                `;


            return `

                <article class="produto-card marmita-card">

                    <div class="produto-info">

                        <span class="categoria-tag">
                            MARMITA
                        </span>

                        <h3>
                            ${escaparHTML(marmita.nome)}
                        </h3>

                        <p>
                            ${escaparHTML(marmita.descricao)}
                        </p>

                    </div>


                    <div class="produto-preco">
                        ${dinheiro(marmita.preco)}
                    </div>


                    <div class="marmita-opcoes">

                        <strong>
                            Escolha até ${marmita.carnes} mistura(s):
                        </strong>

                        ${opcoes}

                    </div>


                    <button
                        type="button"
                        class="botao-adicionar"
                        onclick="adicionarMarmita('${marmita.id}')"
                    >
                        ➕ ADICIONAR MARMITA
                    </button>

                </article>

            `;

        }).join("");

}


function limitarMisturasMarmita(id, limite) {

    const marcados =
        document.querySelectorAll(
            `input[name="${id}-carne"]:checked`
        );


    if (marcados.length > limite) {

        marcados[marcados.length - 1].checked =
            false;

        alert(
            `Esta marmita permite escolher no máximo ${limite} mistura(s).`
        );

    }

}


function adicionarMarmita(id) {

    const marmita =
        MARMITAS.find(item =>
            item.id === id
        );


    if (!marmita) {
        return;
    }


    const selecionados =
        Array.from(
            document.querySelectorAll(
                `input[name="${id}-carne"]:checked`
            )
        ).map(input => input.value);


    if (selecionados.length !== marmita.carnes) {

        alert(
            `Escolha exatamente ${marmita.carnes} mistura(s).`
        );

        return;

    }


    const detalhes =
        `Misturas: ${selecionados.join(", ")}`;


    adicionarAoCarrinho({

        id: id,

        nome: marmita.nome,

        preco: marmita.preco,

        categoria: "Marmitas",

        descricao: marmita.descricao,

        detalhes: detalhes

    });


    alert(
        `${marmita.nome} adicionada ao carrinho!`
    );

}


/* =========================================================
   RENDERIZAÇÃO DE CATEGORIAS
========================================================= */

function obterCatalogoCategoria(
    categoria,
    fallback
) {

    const produtosPDV =
        obterProdutosPDV()
            .filter(produto =>
                slug(produto.categoria) ===
                slug(categoria)
            );


    if (!produtosPDV.length) {

        return fallback.map(item => ({
            id: slug(item.nome),
            nome: item.nome,
            preco: item.preco,
            descricao: item.descricao || "",
            disponivel: true
        }));

    }


    return produtosPDV;

}


function renderizarCategoria(
    categoria,
    idContainer,
    dadosFallback
) {

    const container =
        document.getElementById(
            idContainer
        );


    if (!container) {
        return;
    }


    const produtos =
        obterCatalogoCategoria(
            categoria,
            dadosFallback
        );


    if (!produtos.length) {

        container.innerHTML = `
            <div class="aviso-vazio">
                Nenhum produto disponível nesta categoria.
            </div>
        `;

        return;
    }


    container.innerHTML =
        produtos.map(produto => {

            const disponivel =
                produto.disponivel !== false &&
                produtoDisponivel(
                    produto.nome,
                    categoria
                );


            return `

                <article
                    class="produto-card ${disponivel ? "" : "indisponivel"}"
                >

                    <div class="produto-info">

                        <span class="categoria-tag">
                            ${escaparHTML(categoria)}
                        </span>

                        <h3>
                            ${escaparHTML(produto.nome)}
                        </h3>

                        <p>
                            ${escaparHTML(produto.descricao || "")}
                        </p>

                    </div>


                    <div class="produto-footer">

                        <strong class="produto-preco">
                            ${dinheiro(produto.preco)}
                        </strong>


                        ${
                            disponivel
                            ? `
                                <button
                                    type="button"
                                    class="botao-adicionar"
                                    onclick="adicionarProdutoSimples(
                                        '${escaparHTML(produto.id || slug(produto.nome))}',
                                        '${escaparHTML(produto.nome)}',
                                        ${Number(produto.preco)},
                                        '${escaparHTML(categoria)}',
                                        '${escaparHTML(produto.descricao || "")}'
                                    )"
                                >
                                    ➕ ADICIONAR
                                </button>
                            `
                            : `
                                <span class="produto-indisponivel">
                                    Indisponível
                                </span>
                            `
                        }

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================================
   PRODUTOS SIMPLES
========================================================= */

function adicionarProdutoSimples(
    id,
    nome,
    preco,
    categoria,
    descricao
) {

    if (!produtoDisponivel(nome, categoria)) {

        alert(
            "Este produto está indisponível no momento."
        );

        return;

    }


    adicionarAoCarrinho({

        id: id,

        nome: nome,

        preco: Number(preco),

        categoria: categoria,

        descricao: descricao,

        detalhes: ""

    });


    alert(
        `${nome} foi adicionado ao carrinho!`
    );

}


/* =========================================================
   PARMEGIANAS
========================================================= */

function renderizarParmegianas() {

    const container =
        document.getElementById(
            "listaParmegianas"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        PARMEGIANAS.map(produto => {

            const disponivel =
                produtoDisponivel(
                    produto.nome,
                    "Parmegianas"
                );


            return `

                <article
                    class="produto-card parmegiana-card ${disponivel ? "" : "indisponivel"}"
                >

                    <div class="produto-info">

                        <span class="categoria-tag">
                            PARMEGIANA
                        </span>

                        <h3>
                            ${escaparHTML(produto.nome)}
                        </h3>

                        <p>
                            ${escaparHTML(produto.descricao)}
                        </p>

                    </div>


                    <div class="produto-footer">

                        <strong class="produto-preco">
                            ${dinheiro(produto.preco)}
                        </strong>


                        ${
                            disponivel
                            ? `
                                <button
                                    type="button"
                                    class="botao-adicionar"
                                    onclick="adicionarParmegiana(
                                        '${produto.id}'
                                    )"
                                >
                                    ➕ ADICIONAR
                                </button>
                            `
                            : `
                                <span class="produto-indisponivel">
                                    Indisponível
                                </span>
                            `
                        }

                    </div>

                </article>

            `;

        }).join("");

}


function adicionarParmegiana(id) {

    const produto =
        PARMEGIANAS.find(item =>
            item.id === id
        );


    if (!produto) {
        return;
    }


    if (!produtoDisponivel(
        produto.nome,
        "Parmegianas"
    )) {

        alert(
            "Esta parmegiana está indisponível."
        );

        return;

    }


    adicionarAoCarrinho({

        id: produto.id,

        nome: produto.nome,

        preco: produto.preco,

        categoria: "Parmegianas",

        descricao: produto.descricao,

        detalhes: ""

    });


    alert(
        `${produto.nome} adicionada ao carrinho!`
    );

}


function adicionarParmegianaCarne() {

    const select =
        document.getElementById(
            "tipoCarneParmegiana"
        );


    const tipo =
        select
            ? select.value
            : "Mignon";


    const nome =
        `Parmegiana de Carne - ${tipo}`;


    if (!produtoDisponivel(
        "Parmegiana de Carne",
        "Parmegianas"
    )) {

        alert(
            "A parmegiana de carne está indisponível."
        );

        return;

    }


    adicionarAoCarrinho({

        id: `parmegiana-carne-${slug(tipo)}`,

        nome: nome,

        preco: PARMEGIANA_CARNE_PRECO,

        categoria: "Parmegianas",

        descricao:
            `Parmegiana de carne com filé ${tipo.toLowerCase()}, molho de tomate, muçarela gratinada e acompanhamentos.`,

        detalhes:
            `Corte escolhido: ${tipo}`

    });


    alert(
        `${nome} adicionada ao carrinho!`
    );

}


/* =========================================================
   PIZZA
========================================================= */

function obterTamanhoPizza() {

    const select =
        document.getElementById(
            "tamanhoPizza"
        );


    return select
        ? select.value
        : "";

}


function limiteSaboresPizza(tamanho) {

    if (tamanho === "Pequena") {
        return 1;
    }


    if (tamanho === "Média") {
        return 2;
    }


    if (tamanho === "Grande") {
        return 2;
    }


    return 0;

}


function prepararPizza() {

    renderizarPizzas();

    renderizarBordas();

    renderizarComplementos();

    atualizarPizza();

}


function renderizarPizzas() {

    const container =
        document.getElementById(
            "saboresPizza"
        );


    if (!container) {
        return;
    }


    const todos = [

        ...PIZZAS_SALGADAS.map(item => ({
            ...item,
            tipo: "Salgada"
        })),

        ...PIZZAS_DOCES.map(item => ({
            ...item,
            tipo: "Doce"
        }))

    ];


    container.innerHTML =
        todos.map(pizza => {

            const disponivel =
                produtoDisponivel(
                    pizza.nome,
                    "Pizzas"
                );


            return `

                <label
                    class="opcao-pizza ${disponivel ? "" : "indisponivel"}"
                >

                    <input
                        type="checkbox"
                        class="sabor-pizza"
                        value="${escaparHTML(pizza.nome)}"
                        data-preco="${Number(pizza.preco)}"
                        data-tipo="${escaparHTML(pizza.tipo)}"
                        ${disponivel ? "" : "disabled"}
                        onchange="atualizarPizza()"
                    >

                    <span>

                        <strong>
                            ${escaparHTML(pizza.nome)}
                        </strong>

                        <small>
                            ${escaparHTML(pizza.descricao)}
                        </small>

                        <em>
                            ${dinheiro(pizza.preco)}
                        </em>

                    </span>

                </label>

            `;

        }).join("");

}


function renderizarBordas() {

    const container =
        document.getElementById(
            "bordasPizza"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        BORDAS_PIZZA.map((borda, index) => {

            return `

                <label class="opcao-borda">

                    <input
                        type="radio"
                        name="bordaPizza"
                        value="${escaparHTML(borda.nome)}"
                        data-preco="${Number(borda.preco)}"
                        ${index === 0 ? "checked" : ""}
                        onchange="atualizarPizza()"
                    >

                    <span>

                        ${escaparHTML(borda.nome)}

                        <strong>
                            ${
                                borda.preco > 0
                                ? "+ " + dinheiro(borda.preco)
                                : "Grátis"
                            }
                        </strong>

                    </span>

                </label>

            `;

        }).join("");

}


function renderizarComplementos() {

    const container =
        document.getElementById(
            "complementosPizza"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        COMPLEMENTOS_PIZZA.map(complemento => {

            return `

                <label class="opcao-complemento">

                    <input
                        type="checkbox"
                        name="complementoPizza"
                        value="${escaparHTML(complemento.nome)}"
                        data-preco="${Number(complemento.preco)}"
                        onchange="atualizarPizza()"
                    >

                    <span>

                        ${escaparHTML(complemento.nome)}

                        <strong>
                            + ${dinheiro(complemento.preco)}
                        </strong>

                    </span>

                </label>

            `;

        }).join("");

}


function atualizarPizza() {

    const tamanho =
        obterTamanhoPizza();


    const aviso =
        document.getElementById(
            "avisoSaboresPizza"
        );


    const sabores =
        document.querySelectorAll(
            ".sabor-pizza:checked"
        );


    const limite =
        limiteSaboresPizza(tamanho);


    if (aviso) {

        if (!tamanho) {

            aviso.textContent =
                "Primeiro escolha o tamanho.";

        } else {

            aviso.textContent =
                `Escolha até ${limite} sabor(es).`;

        }

    }


    if (tamanho && sabores.length > limite) {

        sabores[sabores.length - 1].checked =
            false;

        alert(
            `A pizza ${tamanho} permite até ${limite} sabor(es).`
        );

    }


    const saboresSelecionados =
        Array.from(
            document.querySelectorAll(
                ".sabor-pizza:checked"
            )
        );


    let precoBase = 0;


    saboresSelecionados.forEach(input => {

        const preco =
            Number(input.dataset.preco || 0);


        precoBase =
            Math.max(
                precoBase,
                preco
            );

    });


    const bordaSelecionada =
        document.querySelector(
            'input[name="bordaPizza"]:checked'
        );


    const precoBorda =
        bordaSelecionada
            ? Number(bordaSelecionada.dataset.preco || 0)
            : 0;


    const complementos =
        Array.from(
            document.querySelectorAll(
                'input[name="complementoPizza"]:checked'
            )
        );


    const precoComplementos =
        complementos.reduce(
            (total, input) =>
                total +
                Number(input.dataset.preco || 0),
            0
        );


    const total =
        precoBase +
        precoBorda +
        precoComplementos;


    const resumo =
        document.getElementById(
            "resumoPizza"
        );


    const preco =
        document.getElementById(
            "precoPizza"
        );


    if (resumo) {

        if (!tamanho) {

            resumo.innerHTML =
                "Escolha o tamanho da pizza.";

        } else if (!saboresSelecionados.length) {

            resumo.innerHTML =
                "Escolha pelo menos um sabor.";

        } else {

            const nomes =
                saboresSelecionados.map(
                    input => input.value
                );


            const borda =
                bordaSelecionada
                    ? bordaSelecionada.value
                    : "Sem Borda";


            const adicionais =
                complementos.map(
                    input => input.value
                );


            resumo.innerHTML = `

                <div>
                    <strong>Tamanho:</strong>
                    ${escaparHTML(tamanho)}
                </div>

                <div>
                    <strong>Sabores:</strong>
                    ${nomes.map(
                        nome =>
                            `<span>${escaparHTML(nome)}</span>`
                    ).join(", ")}
                </div>

                <div>
                    <strong>Borda:</strong>
                    ${escaparHTML(borda)}
                </div>

                ${
                    adicionais.length
                    ? `
                        <div>
                            <strong>Complementos:</strong>
                            ${adicionais.map(
                                item =>
                                    `<span>${escaparHTML(item)}</span>`
                            ).join(", ")}
                        </div>
                    `
                    : ""
                }

            `;

        }

    }


    if (preco) {
        preco.textContent =
            dinheiro(total);
    }

}


function adicionarPizzaCarrinho() {

    const tamanho =
        obterTamanhoPizza();


    if (!tamanho) {

        alert(
            "Escolha o tamanho da pizza."
        );

        return;

    }


    const limite =
        limiteSaboresPizza(tamanho);


    const sabores =
        Array.from(
            document.querySelectorAll(
                ".sabor-pizza:checked"
            )
        );


    if (!sabores.length) {

        alert(
            "Escolha pelo menos um sabor."
        );

        return;

    }


    if (sabores.length > limite) {

        alert(
            `Escolha no máximo ${limite} sabor(es).`
        );

        return;

    }


    const borda =
        document.querySelector(
            'input[name="bordaPizza"]:checked'
        );


    const complementos =
        Array.from(
            document.querySelectorAll(
                'input[name="complementoPizza"]:checked'
            )
        );


    let precoBase = 0;


    sabores.forEach(input => {

        precoBase =
            Math.max(
                precoBase,
                Number(input.dataset.preco || 0)
            );

    });


    const precoBorda =
        borda
            ? Number(borda.dataset.preco || 0)
            : 0;


    const precoComplementos =
        complementos.reduce(
            (total, input) =>
                total +
                Number(input.dataset.preco || 0),
            0
        );


    const precoFinal =
        precoBase +
        precoBorda +
        precoComplementos;


    const nomesSabores =
        sabores.map(
            input => input.value
        );


    const nome =
        `Pizza ${tamanho}`;


    const detalhes = [

        `Tamanho: ${tamanho}`,

        `Sabores: ${nomesSabores.join(" / ")}`,

        `Borda: ${
            borda
                ? borda.value
                : "Sem Borda"
        }`,

        complementos.length
            ? `Complementos: ${
                complementos
                    .map(input => input.value)
                    .join(", ")
              }`
            : ""

    ].filter(Boolean).join(" | ");


    adicionarAoCarrinho({

        id:
            `pizza-${slug(tamanho)}-${Date.now()}`,

        nome: nome,

        preco: precoFinal,

        categoria: "Pizzas",

        descricao:
            "Pizza personalizada",

        detalhes: detalhes

    });


    alert(
        "Pizza adicionada ao carrinho!"
    );


    limparMontadorPizza();

}


function limparMontadorPizza() {

    const tamanho =
        document.getElementById(
            "tamanhoPizza"
        );


    if (tamanho) {
        tamanho.value = "";
    }


    document
        .querySelectorAll(
            ".sabor-pizza"
        )
        .forEach(input => {
            input.checked = false;
        });


    document
        .querySelectorAll(
            'input[name="complementoPizza"]'
        )
        .forEach(input => {
            input.checked = false;
        });


    const primeiraBorda =
        document.querySelector(
            'input[name="bordaPizza"]'
        );


    if (primeiraBorda) {
        primeiraBorda.checked = true;
    }


    atualizarPizza();

}


/* =========================================================
   CARRINHO
========================================================= */

function carregarCarrinho() {

    try {

        const dados =
            localStorage.getItem(
                CHAVE_CARRINHO
            );


        if (!dados) {

            carrinho = [];

            return;

        }


        const convertido =
            JSON.parse(dados);


        carrinho =
            Array.isArray(convertido)
                ? convertido
                : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar carrinho:",
            erro
        );

        carrinho = [];

    }

}


function salvarCarrinho() {

    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );

    atualizarContadorCarrinho();

}


function adicionarAoCarrinho(produto) {

    const detalhes =
        produto.detalhes || "";


    const existente =
        carrinho.find(item =>

            item.id === produto.id &&
            item.detalhes === detalhes

        );


    if (existente) {

        existente.quantidade += 1;

    } else {

        carrinho.push({

            id:
                produto.id ||
                gerarId(),

            nome:
                produto.nome,

            preco:
                Number(produto.preco || 0),

            categoria:
                produto.categoria || "",

            descricao:
                produto.descricao || "",

            detalhes:
                detalhes,

            quantidade: 1

        });

    }


    salvarCarrinho();

    renderizarCarrinho();

}


function removerDoCarrinho(index) {

    if (
        index < 0 ||
        index >= carrinho.length
    ) {
        return;
    }


    carrinho.splice(index, 1);


    salvarCarrinho();

    renderizarCarrinho();

}


function alterarQuantidade(index, delta) {

    const item =
        carrinho[index];


    if (!item) {
        return;
    }


    item.quantidade += delta;


    if (item.quantidade <= 0) {

        carrinho.splice(
            index,
            1
        );

    }


    salvarCarrinho();

    renderizarCarrinho();

}


function calcularSubtotal() {

    return carrinho.reduce(
        (total, item) =>
            total +
            (
                Number(item.preco || 0) *
                Number(item.quantidade || 0)
            ),
        0
    );

}


function calcularDesconto() {

    const subtotal =
        calcularSubtotal();


    return subtotal *
        (Number(desconto || 0) / 100);

}


function obterTipoRecebimento() {

    const selecionado =
        document.querySelector(
            'input[name="recebimento"]:checked'
        );


    return selecionado
        ? selecionado.value
        : "retirada";

}


function calcularTaxaEntrega() {

    return obterTipoRecebimento() === "entrega"
        ? TAXA_ENTREGA
        : 0;

}


function calcularTotal() {

    const subtotal =
        calcularSubtotal();


    const valorDesconto =
        calcularDesconto();


    const taxa =
        calcularTaxaEntrega();


    return Math.max(
        0,
        subtotal -
        valorDesconto +
        taxa
    );

}


function atualizarContadorCarrinho() {

    const contador =
        document.getElementById(
            "contadorCarrinho"
        );


    if (!contador) {
        return;
    }


    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total +
                Number(item.quantidade || 0),
            0
        );


    contador.textContent =
        quantidade;

}


function renderizarCarrinho() {

    const container =
        document.getElementById(
            "listaCarrinho"
        );


    if (!container) {
        return;
    }


    if (!carrinho.length) {

        container.innerHTML = `

            <div class="carrinho-vazio">

                <div>
                    🛒
                </div>

                <h3>
                    Seu carrinho está vazio.
                </h3>

                <p>
                    Adicione alguns produtos
                    para começar seu pedido.
                </p>

                <button
                    type="button"
                    onclick="abrirPagina('cardapio')"
                >
                    🍽️ VER CARDÁPIO
                </button>

            </div>

        `;

    } else {

        container.innerHTML =
            carrinho.map((item, index) => {

                const totalItem =
                    Number(item.preco) *
                    Number(item.quantidade);


                return `

                    <article class="item-carrinho">

                        <div class="item-carrinho-info">

                            <span class="categoria-tag">
                                ${escaparHTML(item.categoria)}
                            </span>

                            <h3>
                                ${escaparHTML(item.nome)}
                            </h3>

                            ${
                                item.detalhes
                                ? `
                                    <p>
                                        ${escaparHTML(item.detalhes)}
                                    </p>
                                `
                                : ""
                            }

                            <strong>
                                ${dinheiro(item.preco)}
                            </strong>

                        </div>


                        <div class="item-carrinho-acoes">

                            <button
                                type="button"
                                onclick="alterarQuantidade(${index}, -1)"
                                aria-label="Diminuir quantidade"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantidade}
                            </span>


                            <button
                                type="button"
                                onclick="alterarQuantidade(${index}, 1)"
                                aria-label="Aumentar quantidade"
                            >
                                +
                            </button>


                            <strong>
                                ${dinheiro(totalItem)}
                            </strong>


                            <button
                                type="button"
                                class="botao-remover"
                                onclick="removerDoCarrinho(${index})"
                            >
                                🗑️
                            </button>

                        </div>

                    </article>

                `;

            }).join("");

    }


    const subtotal =
        calcularSubtotal();


    const valorDesconto =
        calcularDesconto();


    const taxa =
        calcularTaxaEntrega();


    const total =
        calcularTotal();


    const elementoSubtotal =
        document.getElementById(
            "subtotalCarrinho"
        );


    const elementoDesconto =
        document.getElementById(
            "descontoCarrinho"
        );


    const elementoTaxa =
        document.getElementById(
            "taxaCarrinho"
        );


    const elementoTotal =
        document.getElementById(
            "totalCarrinho"
        );


    if (elementoSubtotal) {
        elementoSubtotal.textContent =
            dinheiro(subtotal);
    }


    if (elementoDesconto) {
        elementoDesconto.textContent =
            dinheiro(valorDesconto);
    }


    if (elementoTaxa) {
        elementoTaxa.textContent =
            dinheiro(taxa);
    }


    if (elementoTotal) {
        elementoTotal.textContent =
            dinheiro(total);
    }


    atualizarContadorCarrinho();

}


/* =========================================================
   CHECKOUT
========================================================= */

function abrirCheckout() {

    if (!carrinho.length) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    abrirPagina("checkout");

}


function atualizarEntrega() {

    const radio =
        document.querySelector(
            'input[name="recebimento"]:checked'
        );


    const endereco =
        document.getElementById(
            "enderecoEntrega"
        );


    if (!radio || !endereco) {
        return;
    }


    const entrega =
        radio.value === "entrega";


    endereco.hidden =
        !entrega;


    const campos = [
        "rua",
        "numero",
        "bairro"
    ];


    campos.forEach(id => {

        const campo =
            document.getElementById(id);


        if (campo) {
            campo.required = entrega;
        }

    });


    renderizarCarrinho();

    renderizarCheckout();

}


function obterPagamento() {

    const radio =
        document.querySelector(
            'input[name="pagamento"]:checked'
        );


    return radio
        ? radio.value
        : "Pix";

}


function mostrarTroco() {

    const campo =
        document.getElementById(
            "campoTroco"
        );


    if (!campo) {
        return;
    }


    const pagamento =
        obterPagamento();


    campo.hidden =
        pagamento !== "Dinheiro";


    renderizarCheckout();

}


function renderizarCheckout() {

    const container =
        document.getElementById(
            "resumoCheckout"
        );


    if (!container) {
        return;
    }


    if (!carrinho.length) {

        container.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    } else {

        container.innerHTML =
            carrinho.map(item => `

                <div class="linha-resumo">

                    <span>
                        ${item.quantidade}x
                        ${escaparHTML(item.nome)}
                    </span>

                    <strong>
                        ${dinheiro(
                            Number(item.preco) *
                            Number(item.quantidade)
                        )}
                    </strong>

                </div>

            `).join("");

    }


    const subtotal =
        calcularSubtotal();


    const descontoValor =
        calcularDesconto();


    const taxa =
        calcularTaxaEntrega();


    const total =
        calcularTotal();


    const totalElemento =
        document.getElementById(
            "totalCheckout"
        );


    if (totalElemento) {

        totalElemento.textContent =
            dinheiro(total);

    }


    const linhas = `

        <div class="linha-resumo">

            <span>
                Subtotal
            </span>

            <strong>
                ${dinheiro(subtotal)}
            </strong>

        </div>


        <div class="linha-resumo">

            <span>
                Desconto
            </span>

            <strong>
                - ${dinheiro(descontoValor)}
            </strong>

        </div>


        <div class="linha-resumo">

            <span>
                Entrega
            </span>

            <strong>
                ${dinheiro(taxa)}
            </strong>

        </div>

    `;


    container.insertAdjacentHTML(
        "beforeend",
        linhas
    );

}


/* =========================================================
   CUPONS
========================================================= */

function aplicarCupom() {

    const input =
        document.getElementById(
            "cupom"
        );


    const mensagem =
        document.getElementById(
            "mensagemCupom"
        );


    if (!input) {
        return;
    }


    const codigo =
        input.value
            .trim()
            .toUpperCase();


    if (!codigo) {

        desconto = 0;
        cupomAplicado = "";


        if (mensagem) {

            mensagem.textContent =
                "Digite um cupom.";

        }


        renderizarCarrinho();
        renderizarCheckout();

        return;

    }


    const cupons = {

        "PRIMEIRACOMPRA": 10,

        "UNESP10": 10

    };


    if (cupons[codigo]) {

        desconto =
            cupons[codigo];

        cupomAplicado =
            codigo;


        if (mensagem) {

            mensagem.textContent =
                `Cupom ${codigo} aplicado: ${desconto}% de desconto.`;

            mensagem.className =
                "cupom-sucesso";

        }

    } else {

        desconto = 0;
        cupomAplicado = "";


        if (mensagem) {

            mensagem.textContent =
                "Cupom inválido.";

            mensagem.className =
                "cupom-erro";

        }

    }


    renderizarCarrinho();
    renderizarCheckout();

}


/* =========================================================
   VALIDAÇÃO DO CHECKOUT
========================================================= */

function validarCheckout() {

    if (!carrinho.length) {

        alert(
            "Adicione produtos ao carrinho antes de finalizar."
        );

        return false;

    }


    const nome =
        document.getElementById(
            "nomeCliente"
        );


    const telefone =
        document.getElementById(
            "telefoneCliente"
        );


    if (!nome || !nome.value.trim()) {

        alert(
            "Informe seu nome."
        );

        nome?.focus();

        return false;

    }


    if (!telefone || !telefone.value.trim()) {

        alert(
            "Informe seu WhatsApp."
        );

        telefone?.focus();

        return false;

    }


    const recebimento =
        obterTipoRecebimento();


    if (recebimento === "entrega") {

        const rua =
            document.getElementById("rua");


        const numero =
            document.getElementById("numero");


        const bairro =
            document.getElementById("bairro");


        if (
            !rua?.value.trim() ||
            !numero?.value.trim() ||
            !bairro?.value.trim()
        ) {

            alert(
                "Preencha rua, número e bairro para a entrega."
            );

            return false;

        }

    }


    const pagamento =
        obterPagamento();


    if (pagamento === "Dinheiro") {

        const troco =
            document.getElementById(
                "troco"
            );


        if (
            troco &&
            troco.value &&
            Number(troco.value) <
            calcularTotal()
        ) {

            alert(
                "O valor informado para o troco precisa ser maior ou igual ao total."
            );

            troco.focus();

            return false;

        }

    }


    return true;

}


/* =========================================================
   MONTAGEM DA MENSAGEM DO WHATSAPP
========================================================= */

function montarMensagemWhatsApp(
    pedido
) {

    const linhas = [];


    linhas.push(
        "🍔 *NOVO PEDIDO*"
    );


    linhas.push(
        "*Restaurante Lanchonete MM*"
    );


    linhas.push(
        ""
    );


    linhas.push(
        `📋 *Pedido nº:* ${pedido.numero}`
    );


    linhas.push(
        `👤 *Cliente:* ${pedido.cliente.nome}`
    );


    linhas.push(
        `📱 *WhatsApp:* ${pedido.cliente.telefone}`
    );


    linhas.push(
        ""
    );


    if (
        pedido.recebimento ===
        "entrega"
    ) {

        linhas.push(
            "🚗 *FORMA: DELIVERY*"
        );


        linhas.push(
            `📍 *Endereço:* ${pedido.endereco.rua}, ${pedido.endereco.numero}`
        );


        linhas.push(
            `🏘️ *Bairro:* ${pedido.endereco.bairro}`
        );


        if (
            pedido.endereco.complemento
        ) {

            linhas.push(
                `🏠 *Complemento:* ${pedido.endereco.complemento}`
            );

        }


        if (
            pedido.endereco.referencia
        ) {

            linhas.push(
                `📌 *Referência:* ${pedido.endereco.referencia}`
            );

        }


        linhas.push(
            "🛵 *Prazo estimado: 60 a 80 minutos.*"
        );

        linhas.push(
            "Seu pedido será entregue em aproximadamente 60 a 80 minutos e estará na sua residência."
        );

    } else {

        linhas.push(
            "🏪 *FORMA: RETIRADA NO LOCAL*"
        );


        linhas.push(
            "Seu pedido estará disponível para retirada no local."
        );

    }


    linhas.push(
        ""
    );


    linhas.push(
        "🛒 *ITENS DO PEDIDO:*"
    );


    pedido.itens.forEach(item => {

        linhas.push(
            `• ${item.quantidade}x ${item.nome} — ${dinheiro(item.preco * item.quantidade)}`
        );


        if (item.detalhes) {

            linhas.push(
                `   ↳ ${item.detalhes}`
            );

        }

    });


    linhas.push(
        ""
    );


    linhas.push(
        `💰 *Subtotal:* ${dinheiro(pedido.subtotal)}`
    );


    if (pedido.desconto > 0) {

        linhas.push(
            `🎟️ *Cupom:* ${pedido.cupom}`
        );


        linhas.push(
            `🏷️ *Desconto:* -${dinheiro(pedido.valorDesconto)}`
        );

    }


    linhas.push(
        `🚗 *Taxa de entrega:* ${dinheiro(pedido.taxaEntrega)}`
    );


    linhas.push(
        `💵 *TOTAL:* ${dinheiro(pedido.total)}`
    );


    linhas.push(
        ""
    );


    linhas.push(
        `💳 *Pagamento:* ${pedido.pagamento}`
    );


    if (
        pedido.pagamento ===
        "Dinheiro" &&
        pedido.troco
    ) {

        linhas.push(
            `💵 *Troco para:* ${dinheiro(pedido.troco)}`
        );


        linhas.push(
            `💰 *Troco:* ${dinheiro(
                pedido.troco -
                pedido.total
            )}`
        );

    }


    linhas.push(
        ""
    );


    linhas.push(
        "Obrigado por pedir no Restaurante Lanchonete MM! ❤️"
    );


    return linhas.join("\n");

}


/* =========================================================
   FINALIZAR PEDIDO
========================================================= */

function finalizarPedido(event) {

    if (event) {
        event.preventDefault();
    }


    if (!validarCheckout()) {
        return;
    }


    const nome =
        document.getElementById(
            "nomeCliente"
        ).value.trim();


    const telefone =
        document.getElementById(
            "telefoneCliente"
        ).value.trim();


    const recebimento =
        obterTipoRecebimento();


    const pagamento =
        obterPagamento();


    const subtotal =
        calcularSubtotal();


    const valorDesconto =
        calcularDesconto();


    const taxaEntrega =
        calcularTaxaEntrega();


    const total =
        calcularTotal();


    const trocoCampo =
        document.getElementById(
            "troco"
        );


    const troco =
        pagamento === "Dinheiro" &&
        trocoCampo &&
        trocoCampo.value
            ? Number(trocoCampo.value)
            : 0;


    const pedidoNumero =
        "MM-" +
        new Date()
            .toISOString()
            .replace(/\D/g, "")
            .slice(2, 14);


    const pedido = {

        numero:
            pedidoNumero,

        data:
            new Date().toISOString(),

        status:
            "Recebido",

        cliente: {

            nome:
                nome,

            telefone:
                telefone

        },

        recebimento:
            recebimento,

        endereco:
            recebimento === "entrega"
            ? {

                rua:
                    document.getElementById(
                        "rua"
                    )?.value.trim() || "",

                numero:
                    document.getElementById(
                        "numero"
                    )?.value.trim() || "",

                bairro:
                    document.getElementById(
                        "bairro"
                    )?.value.trim() || "",

                complemento:
                    document.getElementById(
                        "complemento"
                    )?.value.trim() || "",

                referencia:
                    document.getElementById(
                        "referencia"
                    )?.value.trim() || ""

            }
            : {},

        pagamento:
            pagamento,

        troco:
            troco,

        itens:
            carrinho.map(item => ({
                ...item
            })),

        subtotal:
            subtotal,

        desconto:
            desconto,

        cupom:
            cupomAplicado,

        valorDesconto:
            valorDesconto,

        taxaEntrega:
            taxaEntrega,

        total:
            total

    };


    /* =====================================================
       HISTÓRICO
    ====================================================== */

    let historico = [];


    try {

        const salvo =
            localStorage.getItem(
                CHAVE_HISTORICO
            );


        historico =
            salvo
                ? JSON.parse(salvo)
                : [];


        if (!Array.isArray(historico)) {
            historico = [];
        }

    } catch {

        historico = [];

    }


    historico.push(pedido);


    localStorage.setItem(
        CHAVE_HISTORICO,
        JSON.stringify(historico)
    );


    /* =====================================================
       ATUALIZA TELA DE SUCESSO
    ====================================================== */

    const numero =
        document.getElementById(
            "numeroPedido"
        );


    const status =
        document.getElementById(
            "statusPedido"
        );


    if (numero) {
        numero.textContent =
            pedido.numero;
    }


    if (status) {

        if (recebimento === "entrega") {

            status.innerHTML =
                "🛵 Pedido recebido! Seu pedido será entregue em aproximadamente <strong>60 a 80 minutos</strong> e estará na sua residência.";

        } else {

            status.innerHTML =
                "🏪 Pedido recebido! Seu pedido estará disponível para retirada no local.";

        }

    }


    /* =====================================================
       MONTA WHATSAPP
    ====================================================== */

    const mensagem =
        montarMensagemWhatsApp(
            pedido
        );


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;


    /* =====================================================
       LIMPA CARRINHO
    ====================================================== */

    carrinho = [];

    desconto = 0;
    cupomAplicado = "";


    salvarCarrinho();


    const cupom =
        document.getElementById(
            "cupom"
        );


    if (cupom) {
        cupom.value = "";
    }


    /* =====================================================
       ABRE TELA DE SUCESSO
    ====================================================== */

    abrirPagina("sucesso");


    /*
     * Abre o WhatsApp depois de mostrar
     * a confirmação ao cliente.
     */

    setTimeout(() => {

        window.location.href =
            url;

    }, 700);

}


/* =========================================================
   MAPA
========================================================= */

function abrirMapa() {

    const endereco =
        encodeURIComponent(
            "Rua Guanabara, 26, Divinolândia, SP"
        );


    window.open(
        `https://www.google.com/maps/search/?api=1&query=${endereco}`,
        "_blank"
    );

}


/* =========================================================
   PDV
========================================================= */

function abrirPDV() {

    window.location.href =
        "./pdv.html";

}


/* =========================================================
   ATUALIZAR CATEGORIAS
========================================================= */

function atualizarTodasCategorias() {

    renderizarCategoria(
        "Lanches",
        "listaLanches",
        LANCHES
    );


    renderizarCategoria(
        "Hot Dogs",
        "listaHotdogs",
        HOTDOGS
    );


    renderizarCategoria(
        "Esfirras",
        "listaEsfirrasSalgadas",
        ESFIRRAS_SALGADAS
    );


    renderizarCategoria(
        "Esfirras",
        "listaEsfirrasDoces",
        ESFIRRAS_DOCES
    );


    renderizarCategoria(
        "Porções",
        "listaPorcoes",
        PORCOES
    );


    renderizarCategoria(
        "À La Carte",
        "listaAlacarte",
        ALACARTE
    );


    renderizarCategoria(
        "Bebidas",
        "listaBebidas",
        BEBIDAS
    );


    renderizarParmegianas();


    renderizarMarmitas();


    mostrarCardapioAlmoco();


    mostrarCardapioJantar();


    renderizarPizzas();


    renderizarBordas();


    renderizarComplementos();


    atualizarPizza();

}


/* =========================================================
   EVENTOS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        inicializarCatalogo();


        carregarCarrinho();


        atualizarContadorCarrinho();


        verificarFuncionamento();


        atualizarTodasCategorias();


        const form =
            document.getElementById(
                "formCheckout"
            );


        if (form) {

            form.addEventListener(
                "submit",
                finalizarPedido
            );

        }


        atualizarEntrega();


        mostrarTroco();


        renderizarCarrinho();


        renderizarCheckout();


        /*
         * Atualiza o horário a cada minuto.
         */

        setInterval(
            verificarFuncionamento,
            60000
        );


        /*
         * Atualiza o cardápio do dia
         * quando necessário.
         */

        setInterval(
            function () {

                mostrarCardapioAlmoco();

                mostrarCardapioJantar();

                renderizarMarmitas();

            },
            60000
        );

    }
);


/* =========================================================
   STORAGE EVENT
   Sincroniza o site quando o PDV altera produtos.
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            CHAVE_PRODUTOS
        ) {

            atualizarTodasCategorias();

        }


        if (
            event.key ===
            CHAVE_CARRINHO
        ) {

            carregarCarrinho();

            renderizarCarrinho();

            renderizarCheckout();

        }

    }
);


/* =========================================================
   FUNÇÕES GLOBAIS
========================================================= */

window.abrirPagina =
    abrirPagina;

window.abrirPDV =
    abrirPDV;

window.abrirMapa =
    abrirMapa;

window.adicionarProdutoSimples =
    adicionarProdutoSimples;

window.adicionarAoCarrinho =
    adicionarAoCarrinho;

window.removerDoCarrinho =
    removerDoCarrinho;

window.alterarQuantidade =
    alterarQuantidade;

window.abrirCheckout =
    abrirCheckout;

window.atualizarEntrega =
    atualizarEntrega;

window.mostrarTroco =
    mostrarTroco;

window.aplicarCupom =
    aplicarCupom;

window.finalizarPedido =
    finalizarPedido;

window.atualizarPizza =
    atualizarPizza;

window.adicionarPizzaCarrinho =
    adicionarPizzaCarrinho;

window.limitarMisturasMarmita =
    limitarMisturasMarmita;

window.adicionarMarmita =
    adicionarMarmita;

window.adicionarParmegiana =
    adicionarParmegiana;

window.adicionarParmegianaCarne =
    adicionarParmegianaCarne;

window.renderizarCategoria =
    renderizarCategoria;

window.mostrarCardapioAlmoco =
    mostrarCardapioAlmoco;

window.mostrarCardapioJantar =
    mostrarCardapioJantar;