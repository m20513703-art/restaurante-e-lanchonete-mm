// ==========================================
// RESTAURANTE LANCHONETE MM
// JAVASCRIPT PRINCIPAL
// ==========================================

const WHATSAPP = "5519981123401";
const TAXA_ENTREGA = 5;

let carrinho = [];
let desconto = 0;
let cupomAplicado = "";


// ==========================================
// UTILIDADES
// ==========================================

function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarDados() {
    localStorage.setItem("carrinhoMM", JSON.stringify(carrinho));
    localStorage.setItem("descontoMM", desconto);
    localStorage.setItem("cupomMM", cupomAplicado);
}

function carregarDados() {
    try {
        carrinho = JSON.parse(localStorage.getItem("carrinhoMM")) || [];
    } catch {
        carrinho = [];
    }

    desconto = Number(localStorage.getItem("descontoMM")) || 0;
    cupomAplicado = localStorage.getItem("cupomMM") || "";
}


// ==========================================
// TEMA
// ==========================================

function alternarTema() {

    const claro = document.body.classList.toggle("tema-claro");

    localStorage.setItem(
        "temaMM",
        claro ? "claro" : "escuro"
    );

    atualizarBotaoTema();
}

function carregarTema() {

    const tema =
        localStorage.getItem("temaMM") || "escuro";

    document.body.classList.toggle(
        "tema-claro",
        tema === "claro"
    );

    atualizarBotaoTema();
}

function atualizarBotaoTema() {

    const botao =
        document.getElementById("botaoTema");

    if (!botao) return;

    botao.textContent =
        document.body.classList.contains("tema-claro")
            ? "🌙 Modo escuro"
            : "☀️ Modo claro";
}


// ==========================================
// HORÁRIO DE FUNCIONAMENTO
// ==========================================

function obterPeriodoFuncionamento() {

    const agora = new Date();

    const dia = agora.getDay();

    const minutos =
        agora.getHours() * 60 +
        agora.getMinutes();


    // ==============================
    // ALMOÇO
    // ==============================

    // Segunda a sexta
    if (
        dia >= 1 &&
        dia <= 5 &&
        minutos >= 660 &&
        minutos <= 900
    ) {
        return "almoco";
    }


    // Sábado e domingo
    if (
        (dia === 0 || dia === 6) &&
        minutos >= 690 &&
        minutos <= 930
    ) {
        return "almoco";
    }


    // ==============================
    // NOITE
    // ==============================

    // Terça a sábado + domingo
    // Domingo também funciona à noite
    if (
        (dia === 0 || (dia >= 2 && dia <= 6)) &&
        minutos >= 1080 &&
        minutos <= 1350
    ) {
        return "noite";
    }


    return "fechado";
}


function pedidoEstaLiberado() {

    return obterPeriodoFuncionamento() !== "fechado";
}


// ==========================================
// CATEGORIAS PERMITIDAS
// ==========================================

function categoriaPermitidaMM(id) {

    const paginasLivres = [
        "inicio",
        "cardapio",
        "carrinho",
        "checkout",
        "sucesso",
        "historico"
    ];

    if (paginasLivres.includes(id)) {
        return true;
    }


    const periodo =
        obterPeriodoFuncionamento();


    // Fechado:
    // pode navegar e montar carrinho
    if (periodo === "fechado") {
        return true;
    }


    // ALMOÇO
    if (periodo === "almoco") {

        return [
            "almoco",
            "marmitas",
            "bebidas"
        ].includes(id);

    }


    // NOITE
    if (periodo === "noite") {

        return [
            "pizzas",
            "lanches",
            "hotdogs",
            "esfirras",
            "porcoes",
            "bebidas",
            "alacarte"
        ].includes(id);

    }


    return true;
}


// ==========================================
// STATUS
// ==========================================

function verificarFuncionamento() {

    const elemento =
        document.getElementById("statusFuncionamento");

    if (!elemento) return;


    const periodo =
        obterPeriodoFuncionamento();


    if (periodo === "almoco") {

        elemento.innerHTML =
            "🟢 Estamos abertos para o almoço!";

    } else if (periodo === "noite") {

        elemento.innerHTML =
            "🟢 Estamos abertos!";

    } else {

        elemento.innerHTML =
            "🔴 Estamos fechados para novos pedidos. Você pode montar seu carrinho.";

    }
}


// ==========================================
// NAVEGAÇÃO
// ==========================================

function abrirPagina(id) {

    if (!document.getElementById(id)) {
        return;
    }


    // Bloqueia categoria somente quando
    // estiver aberto em outro período.
    if (!categoriaPermitidaMM(id)) {

        const periodo =
            obterPeriodoFuncionamento();

        if (periodo === "almoco") {

            alert(
                "🍛 Neste momento estamos atendendo somente o almoço, marmitas e bebidas."
            );

        } else if (periodo === "noite") {

            alert(
                "🌙 Neste momento estamos atendendo somente o cardápio da noite."
            );

        }

        return;
    }


    document
        .querySelectorAll(".pagina")
        .forEach(pagina => {
            pagina.style.display = "none";
        });


    const pagina =
        document.getElementById(id);

    pagina.style.display = "block";


    if (id === "almoco") {
        mostrarCardapioAlmoco();
    }

    if (id === "pizzas") {
        criarPizzas();
        criarTamanhosPizza();
        criarSaboresPizza();
        mostrarBordasPizza();
        mostrarComplementosPizza();
    }

    if (id === "lanches") {
        criarLanches();
    }

    if (id === "esfirras") {
        criarEsfirras();
    }

    if (id === "hotdogs") {
        criarHotdogs();
    }

    if (id === "porcoes") {
        criarPorcoes();
    }

    if (id === "bebidas") {
        criarBebidas();
    }

    if (id === "marmitas") {
        criarMarmitas();
    }

    if (id === "alacarte") {
        criarAlacarte();
    }

    if (id === "carrinho") {
        atualizarCarrinho();
    }

    if (id === "checkout") {
        atualizarResumoCheckout();
    }

    if (id === "historico") {
        mostrarHistorico();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function voltarInicio() {

    abrirPagina("inicio");
}


function abrirCarrinho() {

    atualizarCarrinho();

    abrirPagina("carrinho");
}


// ==========================================
// ALMOÇO
// ==========================================

const buffetFrio = [
    "Salada verde",
    "Tomate",
    "Cenoura ralada",
    "Beterraba",
    "Maionese",
    "Salada de macarrão"
];


const cardapioSemana = {

    0: {
        arroz: [
            "Arroz branco",
            "Arroz biro-biro"
        ],

        feijao: [
            "Feijão tropeiro",
            "Feijão carioca"
        ],

        carnes: [
            "Cupim assado",
            "Bacalhau espiritual",
            "Contrafilé na chapa"
        ],

        acompanhamentos: [
            "Rondelli de peru e queijo",
            "Mandioca frita",
            "Legumes na manteiga"
        ],

        sobremesas: [
            "Manjar de coco com ameixa",
            "Pudim",
            "Pavê de morango"
        ]
    },


    1: {
        arroz: [
            "Arroz branco soltinho",
            "Arroz integral"
        ],

        feijao: [
            "Feijão carioca temperado"
        ],

        carnes: [
            "Contrafilé acebolado",
            "Filé de frango grelhado",
            "Peixe empanado crocante"
        ],

        acompanhamentos: [
            "Batata frita",
            "Purê de batata cremoso",
            "Legumes salteados"
        ],

        sobremesas: [
            "Pudim",
            "Frutas fatiadas: abacaxi e melancia"
        ]
    },


    2: {
        arroz: [
            "Arroz branco",
            "Arroz com brócolis"
        ],

        feijao: [
            "Feijão carioca",
            "Feijão preto"
        ],

        carnes: [
            "Strogonoff de frango",
            "Frango assado de televisão",
            "Pernil acebolado"
        ],

        acompanhamentos: [
            "Batata palha",
            "Penne quatro queijos",
            "Abóbora assada"
        ],

        sobremesas: [
            "Mousse de maracujá",
            "Gelatina colorida"
        ]
    },


    3: {
        arroz: [
            "Arroz branco",
            "Arroz biro-biro"
        ],

        feijao: [
            "Feijoada tradicional",
            "Feijão carioca"
        ],

        carnes: [
            "Torresmo crocante",
            "Calabresa acebolada",
            "Maminha grelhada"
        ],

        acompanhamentos: [
            "Couve refogada",
            "Farofa com bacon",
            "Banana empanada"
        ],

        sobremesas: [
            "Mousse de chocolate",
            "Pudim"
        ]
    },


    4: {
        arroz: [
            "Arroz branco",
            "Arroz à grega"
        ],

        feijao: [
            "Feijão carioca"
        ],

        carnes: [
            "Parmegiana de carne",
            "Costelinha barbecue",
            "Sobrecoxa desossada"
        ],

        acompanhamentos: [
            "Nhoque à bolonhesa",
            "Polenta frita",
            "Couve-flor gratinada"
        ],

        sobremesas: [
            "Pavê de morango",
            "Frutas fatiadas"
        ]
    },


    5: {
        arroz: [
            "Arroz branco",
            "Arroz de coco"
        ],

        feijao: [
            "Feijão carioca",
            "Feijão fradinho"
        ],

        carnes: [
            "Moqueca de peixe",
            "Filé de tilápia com alcaparras",
            "Escalope de mignon"
        ],

        acompanhamentos: [
            "Pirão de peixe",
            "Batata rústica com alecrim",
            "Brócolis ao alho"
        ],

        sobremesas: [
            "Pudim",
            "Mousse de limão"
        ]
    },


    6: {
        arroz: [
            "Arroz branco",
            "Arroz com açafrão"
        ],

        feijao: [
            "Feijoada completa",
            "Feijão tropeiro"
        ],

        carnes: [
            "Picanha fatiada",
            "Cupim na manteiga",
            "Frango a passarinho"
        ],

        acompanhamentos: [
            "Batata gratinada com bacon",
            "Polenta frita",
            "Farofa de ovos"
        ],

        sobremesas: [
            "Pavê de chocolate",
            "Mousse de maracujá",
            "Frutas fatiadas"
        ]
    }
};


function montarLista(titulo, lista) {

    if (!lista || lista.length === 0) {
        return "";
    }

    return `
        <div class="listaBuffet">
            <h3>${titulo}</h3>

            <ul>
                ${lista
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>
        </div>
    `;
}


function mostrarCardapioAlmoco() {

    const elemento =
        document.getElementById("cardapioAlmoco");

    if (!elemento) return;


    const dia =
        new Date().getDay();

    const cardapio =
        cardapioSemana[dia];


    if (!cardapio) {
        elemento.innerHTML =
            "<p>Cardápio não disponível.</p>";
        return;
    }


    elemento.innerHTML = `

        ${montarLista(
            "🥗 Buffet de saladas",
            buffetFrio
        )}

        ${montarLista(
            "🍚 Arroz",
            cardapio.arroz
        )}

        ${montarLista(
            "🫘 Feijão",
            cardapio.feijao
        )}

        ${montarLista(
            "🥩 Carnes",
            cardapio.carnes
        )}

        ${montarLista(
            "🍽️ Acompanhamentos",
            cardapio.acompanhamentos
        )}

        ${montarLista(
            "🍰 Sobremesas",
            cardapio.sobremesas
        )}

    `;
}


// ==========================================
// PIZZAS
// ==========================================

const pizzas = [

    { nome:"Atum", preco:52, ingredientes:"Molho de tomate, mussarela, atum, cebola e orégano." },
    { nome:"Bacon", preco:50, ingredientes:"Molho de tomate, mussarela, bacon e orégano." },
    { nome:"Baiana", preco:52, ingredientes:"Molho de tomate, mussarela, calabresa, cebola, pimenta e ovos." },
    { nome:"Calabresa", preco:48, ingredientes:"Molho de tomate, mussarela, calabresa, cebola e orégano." },
    { nome:"Calabresa com Catupiry", preco:52, ingredientes:"Molho de tomate, mussarela, calabresa, Catupiry e orégano." },
    { nome:"Churrasco", preco:62, ingredientes:"Molho de tomate, mussarela, carne de churrasco, cebola e molho especial." },
    { nome:"Frango com Catupiry", preco:52, ingredientes:"Molho de tomate, mussarela, frango desfiado e Catupiry." },
    { nome:"Lombo com Catupiry", preco:54, ingredientes:"Molho de tomate, mussarela, lombo, cebola e Catupiry." },
    { nome:"Marguerita", preco:48, ingredientes:"Molho de tomate, mussarela, tomate, manjericão e parmesão." },
    { nome:"Milho com Bacon", preco:50, ingredientes:"Molho de tomate, mussarela, milho e bacon." },
    { nome:"Moda da Casa", preco:65, ingredientes:"Molho de tomate, mussarela, presunto, calabresa, bacon, milho, cebola e ovos." },
    { nome:"Mussarela", preco:45, ingredientes:"Molho de tomate, mussarela e orégano." },
    { nome:"Napolitana", preco:48, ingredientes:"Molho de tomate, mussarela, tomate, parmesão e orégano." },
    { nome:"Palmito", preco:54, ingredientes:"Molho de tomate, mussarela, palmito, tomate e orégano." },
    { nome:"Portuguesa", preco:52, ingredientes:"Molho de tomate, mussarela, presunto, ovos, cebola, milho e ervilha." },
    { nome:"Presunto e Queijo", preco:48, ingredientes:"Molho de tomate, mussarela, presunto e orégano." },
    { nome:"Quatro Queijos", preco:55, ingredientes:"Molho de tomate, mussarela, Catupiry, provolone e parmesão." },
    { nome:"Strogonoff de Carne", preco:60, ingredientes:"Molho de tomate, mussarela, strogonoff de carne, champignon e batata palha." },
    { nome:"Tilápia", preco:58, ingredientes:"Molho de tomate, mussarela, tilápia, tomate e cebola." },
    { nome:"Vegetariana", preco:52, ingredientes:"Molho de tomate, mussarela, milho, palmito, tomate, cebola e pimentão." },

    { nome:"Banana com Canela", preco:45, ingredientes:"Banana, açúcar, canela e leite condensado." },
    { nome:"Beijinho", preco:48, ingredientes:"Chocolate branco, coco ralado e leite condensado." },
    { nome:"Brigadeiro", preco:45, ingredientes:"Chocolate e brigadeiro cremoso." },
    { nome:"Chocoloco", preco:50, ingredientes:"Chocolate ao leite e coco ralado." },
    { nome:"Confeti", preco:48, ingredientes:"Chocolate ao leite e confetes de chocolate." },
    { nome:"Doce de Leite", preco:45, ingredientes:"Doce de leite cremoso." },
    { nome:"Paçoca", preco:48, ingredientes:"Chocolate branco, paçoca e leite condensado." },
    { nome:"Prestígio", preco:48, ingredientes:"Chocolate ao leite e coco." },
    { nome:"Romeu e Julieta", preco:45, ingredientes:"Mussarela e goiabada." },
    { nome:"Sensação", preco:52, ingredientes:"Chocolate ao leite, morango e leite condensado." }

];


const tamanhosPizza = [

    {
        nome:"Pequena",
        descricao:"4 pedaços • 1 sabor",
        sabores:1
    },

    {
        nome:"Média",
        descricao:"8 pedaços • até 2 sabores",
        sabores:2
    },

    {
        nome:"Grande",
        descricao:"12 pedaços • até 3 sabores",
        sabores:3
    }

];


const bordasPizza = [

    { nome:"Sem Borda", preco:0 },
    { nome:"Catupiry Original", preco:10 },
    { nome:"Cheddar", preco:10 },
    { nome:"Mussarela", preco:12 },
    { nome:"Provolone", preco:12 },
    { nome:"Requeijão com Alho Frito", preco:11 },
    { nome:"Vulcão / Pãozinho", preco:15 },
    { nome:"Chocolate ao Leite", preco:12 },
    { nome:"Chocolate Branco", preco:12 },
    { nome:"Doce de Leite", preco:10 },
    { nome:"Goiabada", preco:10 }

];


const complementosPizzaLista = [

    { nome:"Azeite Trufado", preco:8 },
    { nome:"Bacon Crocante Extra", preco:7 },
    { nome:"Catupiry Extra", preco:8 },
    { nome:"Cheddar Extra", preco:7 },
    { nome:"Cebola Crispy", preco:5 },
    { nome:"Geleia de Pimenta", preco:6 },
    { nome:"Mussarela Extra", preco:8 },
    { nome:"Ovo Cozido Extra", preco:4 },
    { nome:"Parmesão Ralado", preco:6 },
    { nome:"Pimenta Biquinho", preco:5 }

];


let pizzaSelecionada = null;
let tamanhoPizzaSelecionado = null;
let saboresPizza = [];
let bordaPizzaSelecionada = bordasPizza[0];
let complementosPizza = [];


function criarPizzas() {

    const elemento =
        document.getElementById("listaPizzas");

    if (!elemento) return;


    elemento.innerHTML = `

        <div class="produtosPizza">

            ${pizzas.map((pizza, index) => `

                <div class="produto">

                    <h3>${pizza.nome}</h3>

                    <p>${pizza.ingredientes}</p>

                    <strong>
                        A partir de ${dinheiro(pizza.preco)}
                    </strong>

                    <button
                        onclick="selecionarPizza(${index})">

                        🍕 Escolher

                    </button>

                </div>

            `).join("")}

        </div>

    `;
}


function criarTamanhosPizza() {

    const elemento =
        document.getElementById("tamanhoPizza");

    if (!elemento) return;


    elemento.innerHTML = `

        <h3>1️⃣ Escolha o tamanho</h3>

        ${tamanhosPizza.map((item, index) => `

            <button
                onclick="selecionarTamanhoPizza(${index})">

                ${item.nome}<br>
                <small>${item.descricao}</small>

            </button>

        `).join("")}

    `;
}


function selecionarTamanhoPizza(index) {

    tamanhoPizzaSelecionado =
        tamanhosPizza[index];

    saboresPizza = [];

    criarSaboresPizza();
}


function criarSaboresPizza() {

    const elemento =
        document.getElementById("saboresPizza");

    if (!elemento) return;


    if (!tamanhoPizzaSelecionado) {

        elemento.innerHTML =
            "<p>Escolha primeiro o tamanho da pizza.</p>";

        return;
    }


    elemento.innerHTML = `

        <h3>
            2️⃣ Escolha até
            ${tamanhoPizzaSelecionado.sabores}
            sabor(es)
        </h3>

        ${pizzas.map((pizza, index) => `

            <button
                onclick="selecionarSaborPizza(${index})">

                ${pizza.nome}
                -
                ${dinheiro(pizza.preco)}

            </button>

        `).join("")}

        <div id="saboresEscolhidosPizza">

            ${
                saboresPizza.length
                    ? `<p><strong>Escolhidos:</strong> ${saboresPizza.map(i => pizzas[i].nome).join(", ")}</p>`
                    : "<p>Nenhum sabor escolhido.</p>"
            }

        </div>

    `;
}


function selecionarSaborPizza(index) {

    if (!tamanhoPizzaSelecionado) {

        alert("Escolha primeiro o tamanho.");

        return;
    }


    const posicao =
        saboresPizza.indexOf(index);


    if (posicao >= 0) {

        saboresPizza.splice(posicao, 1);

    } else {

        if (
            saboresPizza.length >=
            tamanhoPizzaSelecionado.sabores
        ) {

            alert(
                `Você pode escolher até ${tamanhoPizzaSelecionado.sabores} sabor(es).`
            );

            return;
        }

        saboresPizza.push(index);
    }


    criarSaboresPizza();
}


function selecionarPizza(index) {

    pizzaSelecionada =
        pizzas[index];

    tamanhoPizzaSelecionado =
        null;

    saboresPizza = [];

    bordaPizzaSelecionada =
        bordasPizza[0];

    complementosPizza = [];

    criarTamanhosPizza();
    criarSaboresPizza();
    mostrarBordasPizza();
    mostrarComplementosPizza();


    document
        .getElementById("montagemPizza")
        ?.scrollIntoView({
            behavior:"smooth"
        });
}


function mostrarBordasPizza() {

    const elemento =
        document.getElementById("bordaPizza");

    if (!elemento) return;


    elemento.innerHTML = `

        <h3>3️⃣ Escolha a borda</h3>

        ${bordasPizza.map((borda, index) => `

            <button
                onclick="selecionarBordaPizza(${index})">

                ${borda.nome}

                ${
                    borda.preco > 0
                        ? `+ ${dinheiro(borda.preco)}`
                        : "Grátis"
                }

            </button>

        `).join("")}

    `;
}


function selecionarBordaPizza(index) {

    bordaPizzaSelecionada =
        bordasPizza[index];
}


function mostrarComplementosPizza() {

    const elemento =
        document.getElementById("complementosPizza");

    if (!elemento) return;


    elemento.innerHTML = `

        <h3>4️⃣ Complementos</h3>

        ${complementosPizzaLista.map((item, index) => `

            <button
                onclick="selecionarComplementoPizza(${index})">

                ${item.nome}
                + ${dinheiro(item.preco)}

            </button>

        `).join("")}

        <p>
            ${
                complementosPizza.length
                    ? "Extras: " +
                      complementosPizza
                        .map(i => complementosPizzaLista[i].nome)
                        .join(", ")
                    : "Nenhum complemento."
            }
        </p>

    `;
}


function selecionarComplementoPizza(index) {

    const posicao =
        complementosPizza.indexOf(index);


    if (posicao >= 0) {

        complementosPizza.splice(posicao, 1);

    } else {

        complementosPizza.push(index);

    }


    mostrarComplementosPizza();
}


function adicionarPizzaCarrinho() {

    if (!tamanhoPizzaSelecionado) {

        alert("Escolha o tamanho da pizza.");

        return;
    }


    if (saboresPizza.length === 0) {

        alert("Escolha pelo menos um sabor.");

        return;
    }


    const maiorPreco =
        Math.max(
            ...saboresPizza.map(
                index => pizzas[index].preco
            )
        );


    const totalComplementos =
        complementosPizza.reduce(
            (total, index) =>
                total +
                complementosPizzaLista[index].preco,
            0
        );


    const preco =
        maiorPreco +
        bordaPizzaSelecionada.preco +
        totalComplementos;


    const nomeSabores =
        saboresPizza
            .map(index => pizzas[index].nome)
            .join(" / ");


    const detalhes = [

        `Tamanho: ${tamanhoPizzaSelecionado.nome}`,

        `Sabores: ${nomeSabores}`,

        `Borda: ${bordaPizzaSelecionada.nome}`,

        complementosPizza.length
            ? `Complementos: ${
                complementosPizza
                    .map(i => complementosPizzaLista[i].nome)
                    .join(", ")
              }`
            : ""

    ]
    .filter(Boolean)
    .join(" | ");


    carrinho.push({

        nome:
            `Pizza ${tamanhoPizzaSelecionado.nome} - ${nomeSabores}`,

        preco,

        ingredientes:
            detalhes,

        quantidade:1

    });


    salvarDados();

    atualizarCarrinho();


    alert("🍕 Pizza adicionada ao carrinho!");

    abrirCarrinho();
}


// ==========================================
// LANCHES
// ==========================================

const lanches = [

    {
        nome:"X-Burguer",
        preco:20,
        ingredientes:"Pão, hambúrguer, queijo, alface, tomate e molho especial."
    },

    {
        nome:"X-Salada",
        preco:22,
        ingredientes:"Pão, hambúrguer, queijo, alface, tomate, milho e molho especial."
    },

    {
        nome:"X-Bacon",
        preco:26,
        ingredientes:"Pão, hambúrguer, queijo, bacon, alface, tomate e molho especial."
    },

    {
        nome:"X-Egg",
        preco:24,
        ingredientes:"Pão, hambúrguer, queijo, ovo, alface, tomate e molho especial."
    },

    {
        nome:"X-Frango",
        preco:22,
        ingredientes:"Pão, frango desfiado, queijo, alface, tomate e molho especial."
    },

    {
        nome:"X-Tudo",
        preco:32,
        ingredientes:"Pão, hambúrguer, queijo, presunto, bacon, ovo, calabresa, alface, tomate e molho."
    },

    {
        nome:"X-Calabresa",
        preco:23,
        ingredientes:"Pão, calabresa, queijo, cebola, alface, tomate e molho."
    },

    {
        nome:"X-Duplo Cheddar",
        preco:34,
        ingredientes:"Pão, dois hambúrgueres, cheddar, cebola e molho especial."
    },

    {
        nome:"X-Contrafilé",
        preco:30,
        ingredientes:"Pão, contrafilé, queijo, alface, tomate e molho especial."
    },

    {
        nome:"X-Vegetariano",
        preco:25,
        ingredientes:"Pão, queijo, alface, tomate, milho, palmito, cebola e molho especial."
    }

];


const adicionaisLanche = [

    { nome:"Bacon Extra", preco:6 },
    { nome:"Queijo Extra", preco:5 },
    { nome:"Cheddar Extra", preco:5 },
    { nome:"Ovo Extra", preco:3 },
    { nome:"Hambúrguer Extra", preco:8 },
    { nome:"Catupiry", preco:5 }

];


function criarProdutos(lista, elementoId, tipo) {

    const elemento =
        document.getElementById(elementoId);

    if (!elemento) return;


    elemento.innerHTML =
        lista.map((produto, index) => `

            <div class="produto">

                <h3>${produto.nome}</h3>

                <p>${produto.ingredientes || ""}</p>

                <strong>
                    ${dinheiro(produto.preco)}
                </strong>

                <button
                    onclick="adicionarProduto('${tipo}', ${index})">

                    🛒 Adicionar

                </button>

            </div>

        `).join("");
}


function adicionarProduto(tipo, index) {

    let produto;


    if (tipo === "lanches") {
        produto = lanches[index];
    }

    if (tipo === "hotdogs") {
        produto = hotdogs[index];
    }

    if (tipo === "porcoes") {
        produto = porcoes[index];
    }

    if (tipo === "bebidas") {
        produto = bebidas[index];
    }

    if (tipo === "esfirras") {
        produto = esfirras[index];
    }

    if (!produto) return;


    carrinho.push({

        nome: produto.nome,

        preco: produto.preco,

        ingredientes:
            produto.ingredientes || "",

        quantidade:1

    });


    salvarDados();

    atualizarCarrinho();


    alert(
        `${produto.nome} foi adicionado ao carrinho!`
    );
}


function criarLanches() {

    criarProdutos(
        lanches,
        "listaLanches",
        "lanches"
    );
}


// ==========================================
// HOT DOG
// ==========================================

const hotdogs = [

    {
        nome:"Dog Simples",
        preco:14,
        ingredientes:"Pão, salsicha, molho, milho, batata palha e ketchup."
    },

    {
        nome:"Dog Duplo",
        preco:18,
        ingredientes:"Pão, duas salsichas, molho, milho, batata palha e ketchup."
    },

    {
        nome:"Dog Frango",
        preco:20,
        ingredientes:"Pão, salsicha, frango desfiado, molho, milho e batata palha."
    },

    {
        nome:"Dog Bacon",
        preco:22,
        ingredientes:"Pão, salsicha, bacon, molho, milho e batata palha."
    },

    {
        nome:"Dog Tudo",
        preco:26,
        ingredientes:"Pão, salsicha, frango, bacon, queijo, milho, molho e batata palha."
    }

];


function criarHotdogs() {

    criarProdutos(
        hotdogs,
        "listaHotdogs",
        "hotdogs"
    );
}


// ==========================================
// PORÇÕES
// ==========================================

const porcoes = [

    {
        nome:"Batata Frita Tradicional 500g",
        preco:28,
        ingredientes:"Batata frita crocante."
    },

    {
        nome:"Batata com Cheddar e Bacon 600g",
        preco:38,
        ingredientes:"Batata frita, cheddar cremoso e bacon crocante."
    },

    {
        nome:"Calabresa Acebolada 500g",
        preco:35,
        ingredientes:"Calabresa fatiada acebolada."
    },

    {
        nome:"Frango a Passarinho 700g",
        preco:42,
        ingredientes:"Frango a passarinho temperado e frito."
    },

    {
        nome:"Isca de Tilápia 500g",
        preco:48,
        ingredientes:"Iscas de tilápia empanadas."
    },

    {
        nome:"Contrafilé Acebolado 500g",
        preco:55,
        ingredientes:"Contrafilé acebolado."
    }

];


function criarPorcoes() {

    criarProdutos(
        porcoes,
        "listaPorcoes",
        "porcoes"
    );
}


// ==========================================
// BEBIDAS
// ==========================================

const bebidas = [

    {
        nome:"Coca-Cola Lata",
        preco:6.50,
        ingredientes:"Refrigerante Coca-Cola lata."
    },

    {
        nome:"Coca-Cola Zero",
        preco:6.50,
        ingredientes:"Refrigerante Coca-Cola Zero lata."
    },

    {
        nome:"Guaraná Lata",
        preco:6.50,
        ingredientes:"Refrigerante Guaraná lata."
    },

    {
        nome:"Fanta Lata",
        preco:6.50,
        ingredientes:"Refrigerante Fanta lata."
    },

    {
        nome:"Sprite Lata",
        preco:6.50,
        ingredientes:"Refrigerante Sprite lata."
    },

    {
        nome:"Coca-Cola 2L",
        preco:14,
        ingredientes:"Refrigerante Coca-Cola 2 litros."
    },

    {
        nome:"Guaraná Antarctica 2L",
        preco:14,
        ingredientes:"Refrigerante Guaraná Antarctica 2 litros."
    },

    {
        nome:"Fanta 2L",
        preco:14,
        ingredientes:"Refrigerante Fanta 2 litros."
    },

    {
        nome:"Água sem gás",
        preco:4,
        ingredientes:"Água mineral sem gás."
    },

    {
        nome:"Água com gás",
        preco:4.50,
        ingredientes:"Água mineral com gás."
    }

];


function criarBebidas() {

    criarProdutos(
        bebidas,
        "listaBebidas",
        "bebidas"
    );
}


// ==========================================
// ESFIRRAS
// ==========================================

const esfirras = [

    {
        nome:"Carne",
        preco:8,
        ingredientes:"Carne temperada, cebola, tomate e temperos."
    },

    {
        nome:"Frango",
        preco:8.50,
        ingredientes:"Frango desfiado temperado."
    },

    {
        nome:"Queijo",
        preco:9,
        ingredientes:"Queijo mussarela."
    },

    {
        nome:"Calabresa",
        preco:9,
        ingredientes:"Calabresa, cebola e temperos."
    },

    {
        nome:"Presunto e Queijo",
        preco:9.50,
        ingredientes:"Presunto e queijo."
    },

    {
        nome:"Frango com Catupiry",
        preco:10,
        ingredientes:"Frango desfiado e Catupiry."
    },

    {
        nome:"Carne com Queijo",
        preco:10,
        ingredientes:"Carne temperada e queijo."
    },

    {
        nome:"Bacon com Queijo",
        preco:11,
        ingredientes:"Bacon e queijo."
    },

    {
        nome:"Quatro Queijos",
        preco:11.50,
        ingredientes:"Mussarela, Catupiry, provolone e parmesão."
    },

    {
        nome:"Especial da Casa",
        preco:12,
        ingredientes:"Recheio especial da casa."
    }

];


let esfirraSelecionada = null;


function criarEsfirras() {

    const elemento =
        document.getElementById("listaEsfirras");

    if (!elemento) return;


    elemento.innerHTML =
        esfirras.map((produto, index) => `

            <div class="produto">

                <h3>${produto.nome}</h3>

                <p>${produto.ingredientes}</p>

                <strong>
                    ${dinheiro(produto.preco)}
                </strong>

                <button
                    onclick="selecionarEsfirra(${index})">

                    🥙 Escolher

                </button>

            </div>

        `).join("");
}


function selecionarEsfirra(index) {

    esfirraSelecionada =
        esfirras[index];


    const ingredientes =
        document.getElementById("ingredientesEsfirra");


    if (ingredientes) {

        ingredientes.innerHTML = `

            <div class="produto">

                <h3>${esfirraSelecionada.nome}</h3>

                <p>
                    ${esfirraSelecionada.ingredientes}
                </p>

                <strong>
                    ${dinheiro(esfirraSelecionada.preco)}
                </strong>

            </div>

        `;

    }


    document
        .getElementById("montagemEsfirra")
        ?.scrollIntoView({
            behavior:"smooth"
        });
}


function adicionarEsfirraCarrinho() {

    if (!esfirraSelecionada) {

        alert("Escolha uma esfirra primeiro.");

        return;
    }


    carrinho.push({

        nome:
            `Esfirra ${esfirraSelecionada.nome}`,

        preco:
            esfirraSelecionada.preco,

        ingredientes:
            esfirraSelecionada.ingredientes,

        quantidade:1

    });


    salvarDados();

    atualizarCarrinho();


    alert("🥙 Esfirra adicionada ao carrinho!");

    abrirCarrinho();
}


// ==========================================
// MARMITAS
// ==========================================

const tamanhosMarmita = [

    {
        nome:"Pequena",
        preco:20,
        carnes:1
    },

    {
        nome:"Média",
        preco:25,
        carnes:2
    },

    {
        nome:"Grande",
        preco:28,
        carnes:3
    },

    {
        nome:"Comercial",
        preco:50,
        carnes:4
    }

];


const carnesMarmitaLista = [

    "Bife acebolado",
    "Frango grelhado",
    "Frango empanado",
    "Carne de panela",
    "Linguiça acebolada",
    "Calabresa acebolada",
    "Bife à parmegiana",
    "Peixe frito",
    "Strogonoff de frango",
    "Strogonoff de carne",
    "Pernil assado",
    "Costelinha barbecue"

];


let tamanhoMarmitaSelecionado = null;
let carnesMarmita = [];


function criarMarmitas() {

    const elemento =
        document.getElementById("listaMarmitas");

    if (!elemento) return;


    elemento.innerHTML =
        tamanhosMarmita.map((item, index) => `

            <div class="produto">

                <h3>
                    Marmita ${item.nome}
                </h3>

                <p>
                    Escolha até ${item.carnes}
                    carne(s).
                </p>

                <strong>
                    ${dinheiro(item.preco)}
                </strong>

                <button
                    onclick="abrirMontagemMarmita(${index})">

                    🍱 Montar Marmita

                </button>

            </div>

        `).join("");
}


function abrirMontagemMarmita(
    index,
    manterSelecao = false
) {

    tamanhoMarmitaSelecionado =
        tamanhosMarmita[index];


    if (!manterSelecao) {

        carnesMarmita = [];

    }


    const elemento =
        document.getElementById("opcoesMarmita");

    if (!elemento) return;


    elemento.innerHTML = `

        <h3>
            🍖 Escolha até
            ${tamanhoMarmitaSelecionado.carnes}
            carne(s)
        </h3>

        ${carnesMarmitaLista.map((carne, i) => `

            <button
                onclick="selecionarMisturaMarmita(${i})">

                ${carne}

            </button>

        `).join("")}

        <div>

            <h4>
                Carnes escolhidas:
            </h4>

            ${
                carnesMarmita.length
                    ? carnesMarmita
                        .map(i => carnesMarmitaLista[i])
                        .join(", ")
                    : "Nenhuma carne escolhida."
            }

        </div>

        <br>

        <button
            onclick="adicionarMarmitaCarrinho()">

            🛒 Adicionar Marmita

        </button>

    `;


    document
        .getElementById("montagemMarmita")
        ?.scrollIntoView({
            behavior:"smooth"
        });
}


function selecionarMisturaMarmita(index) {

    if (!tamanhoMarmitaSelecionado) {

        alert("Escolha primeiro o tamanho da marmita.");

        return;
    }


    const posicao =
        carnesMarmita.indexOf(index);


    if (posicao >= 0) {

        carnesMarmita.splice(posicao, 1);

    } else {

        if (
            carnesMarmita.length >=
            tamanhoMarmitaSelecionado.carnes
        ) {

            alert(
                `Essa marmita permite até ${tamanhoMarmitaSelecionado.carnes} carne(s).`
            );

            return;
        }

        carnesMarmita.push(index);
    }


    abrirMontagemMarmita(
        tamanhosMarmita.indexOf(
            tamanhoMarmitaSelecionado
        ),
        true
    );
}


function adicionarMarmitaCarrinho() {

    if (!tamanhoMarmitaSelecionado) {

        alert("Escolha o tamanho da marmita.");

        return;
    }


    if (carnesMarmita.length === 0) {

        alert("Escolha pelo menos uma carne.");

        return;
    }


    const nomesCarnes =
        carnesMarmita
            .map(i => carnesMarmitaLista[i])
            .join(", ");


    carrinho.push({

        nome:
            `Marmita ${tamanhoMarmitaSelecionado.nome}`,

        preco:
            tamanhoMarmitaSelecionado.preco,

        ingredientes:
            `Carnes: ${nomesCarnes}`,

        quantidade:1

    });


    salvarDados();

    atualizarCarrinho();


    alert("🍱 Marmita adicionada ao carrinho!");

    abrirCarrinho();
}


// ==========================================
// À LA CARTE
// ==========================================

const alacarte = [

    {
        nome:"À Parmegiana - Frango",
        categoria:"À Parmegiana",
        preco:38,
        ingredientes:"Molho de tomate artesanal, queijo derretido, arroz e batata frita."
    },

    {
        nome:"À Parmegiana - Carne",
        categoria:"À Parmegiana",
        preco:44,
        ingredientes:"Molho de tomate artesanal, queijo derretido, arroz e batata frita. Carne: contrafilé ou alcatra."
    },

    {
        nome:"À Parmegiana - Peixe",
        categoria:"À Parmegiana",
        preco:46,
        ingredientes:"Molho de tomate artesanal, queijo derretido, arroz e batata frita. Peixe filet empanado."
    },

    {
        nome:"À Parmegiana - Filé Mignon",
        categoria:"À Parmegiana",
        preco:58,
        ingredientes:"Molho de tomate artesanal, queijo derretido, arroz e batata frita. Filé mignon."
    },

    {
        nome:"Strogonoff Cremoso - Frango",
        categoria:"Strogonoff Cremoso",
        preco:32,
        ingredientes:"Molho cremoso com cogumelos, arroz e batata palha."
    },

    {
        nome:"Strogonoff Cremoso - Carne",
        categoria:"Strogonoff Cremoso",
        preco:42,
        ingredientes:"Molho cremoso com cogumelos, arroz e batata palha. Iscas de alcatra ou mignon."
    },

    {
        nome:"Strogonoff Cremoso - Camarão ou Peixe",
        categoria:"Strogonoff Cremoso",
        preco:48,
        ingredientes:"Molho cremoso com cogumelos, arroz e batata palha. Camarão ou peixe."
    },

    {
        nome:"Escondidinho Gratinado - Frango",
        categoria:"Escondidinho Gratinado",
        preco:32,
        ingredientes:"Purê de mandioca cremoso gratinado com queijo no forno. Frango desfiado."
    },

    {
        nome:"Escondidinho Gratinado - Carne Seca",
        categoria:"Escondidinho Gratinado",
        preco:38,
        ingredientes:"Purê de mandioca cremoso gratinado com queijo no forno. Carne seca."
    },

    {
        nome:"Escondidinho Gratinado - Peixe ou Bacalhau",
        categoria:"Escondidinho Gratinado",
        preco:42,
        ingredientes:"Purê de mandioca cremoso gratinado com queijo no forno. Peixe ou bacalhau desfiado."
    },

    {
        nome:"Grelhado Clássico - Frango",
        categoria:"Grelhado Clássico",
        preco:28,
        ingredientes:"Proteína grelhada na chapa, arroz, feijão, farofa e salada. Frango."
    },

    {
        nome:"Grelhado Clássico - Bisteca Suína",
        categoria:"Grelhado Clássico",
        preco:32,
        ingredientes:"Proteína grelhada na chapa, arroz, feijão, farofa e salada. Bisteca suína."
    },

    {
        nome:"Grelhado Clássico - Contrafilé",
        categoria:"Grelhado Clássico",
        preco:36,
        ingredientes:"Proteína grelhada na chapa, arroz, feijão, farofa e salada. Contrafilé."
    },

    {
        nome:"Grelhado Clássico - Tilápia",
        categoria:"Grelhado Clássico",
        preco:38,
        ingredientes:"Proteína grelhada na chapa, arroz, feijão, farofa e salada. Filé de peixe (tilápia)."
    },

    {
        nome:"Ao Molho Quatro Queijos - Frango",
        categoria:"Ao Molho Quatro Queijos",
        preco:36,
        ingredientes:"Coberto com molho de queijos caseiro, servido com arroz e batata sautée. Filé de frango."
    },

    {
        nome:"Ao Molho Quatro Queijos - Peixe",
        categoria:"Ao Molho Quatro Queijos",
        preco:42,
        ingredientes:"Coberto com molho de queijos caseiro, servido com arroz e batata sautée. Filé de peixe grelhado."
    },

    {
        nome:"Ao Molho Quatro Queijos - Medalhão",
        categoria:"Ao Molho Quatro Queijos",
        preco:48,
        ingredientes:"Coberto com molho de queijos caseiro, servido com arroz e batata sautée. Medalhão de carne."
    },

    {
        nome:"Ao Molho de Camarão ou Ervas Finas - Peixe",
        categoria:"Ao Molho de Camarão ou Ervas Finas",
        preco:45,
        ingredientes:"Servido com arroz branco e purê de batata ou legumes. Filé de peixe grelhado."
    },

    {
        nome:"Ao Molho de Camarão ou Ervas Finas - Mignon",
        categoria:"Ao Molho de Camarão ou Ervas Finas",
        preco:52,
        ingredientes:"Servido com arroz branco e purê de batata ou legumes. Medalhão de mignon."
    },

    {
        nome:"Massa com Iscas - Frango",
        categoria:"Massa com Iscas ou Filé Grelhado",
        preco:34,
        ingredientes:"Fettuccine ou penne ao molho pomodoro ou branco, com iscas de frango."
    },

    {
        nome:"Massa com Filé de Peixe",
        categoria:"Massa com Iscas ou Filé Grelhado",
        preco:40,
        ingredientes:"Fettuccine ou penne ao molho pomodoro ou branco, com filé de peixe."
    },

    {
        nome:"Massa com Iscas de Filé Mignon",
        categoria:"Massa com Iscas ou Filé Grelhado",
        preco:46,
        ingredientes:"Fettuccine ou penne ao molho pomodoro ou branco, com iscas de filé mignon."
    }

];


function criarAlacarte() {

    const elemento =
        document.getElementById("listaAlacarte");

    if (!elemento) return;


    elemento.innerHTML =
        alacarte.map((produto, index) => `

            <div class="produto">

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.ingredientes}
                </p>

                <strong>
                    ${dinheiro(produto.preco)}
                </strong>

                <button
                    onclick="adicionarAlacarte(${index})">

                    🛒 Adicionar

                </button>

            </div>

        `).join("");
}


function adicionarAlacarte(index) {

    const produto =
        alacarte[index];

    if (!produto) return;


    carrinho.push({

        nome:produto.nome,

        preco:produto.preco,

        ingredientes:produto.ingredientes,

        quantidade:1

    });


    salvarDados();

    atualizarCarrinho();


    alert(
        `${produto.nome} foi adicionado ao carrinho!`
    );
}


// ==========================================
// CARRINHO
// ==========================================

function subtotal() {

    return carrinho.reduce(
        (total, item) =>
            total +
            Number(item.preco || 0) *
            Number(item.quantidade || 1),
        0
    );
}


function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const total =
        document.getElementById("totalCarrinho");


    const contadores =
        document.querySelectorAll(
            '[id^="contadorCarrinho"]'
        );


    const quantidade =
        carrinho.reduce(
            (soma, item) =>
                soma + Number(item.quantidade || 1),
            0
        );


    contadores.forEach(elemento => {

        elemento.textContent =
            quantidade;

    });


    if (!lista || !total) return;


    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>🛒 Seu carrinho está vazio.</p>";

        total.innerHTML = "";

        salvarDados();

        return;
    }


    lista.innerHTML =
        carrinho.map((item, index) => `

            <div class="itemCarrinho">

                <h3>
                    ${item.nome}
                </h3>

                ${
                    item.ingredientes
                        ? `<p>${item.ingredientes}</p>`
                        : ""
                }

                <strong>
                    ${dinheiro(
                        Number(item.preco) *
                        Number(item.quantidade)
                    )}
                </strong>


                <div class="controlesCarrinho">

                    <button
                        onclick="diminuir(${index})">

                        −

                    </button>


                    <span>
                        ${item.quantidade}
                    </span>


                    <button
                        onclick="aumentar(${index})">

                        +

                    </button>


                    <button
                        onclick="remover(${index})">

                        🗑️

                    </button>

                </div>

            </div>

        `).join("");


    const valorSubtotal =
        subtotal();


    const valorDesconto =
        valorSubtotal *
        (desconto / 100);


    total.innerHTML = `

        <p>
            Subtotal:
            <strong>
                ${dinheiro(valorSubtotal)}
            </strong>
        </p>

        ${
            desconto > 0
                ? `
                    <p>
                        Desconto (${desconto}%):
                        <strong>
                            -${dinheiro(valorDesconto)}
                        </strong>
                    </p>
                `
                : ""
        }

        <p>
            Total dos produtos:
            <strong>
                ${dinheiro(
                    valorSubtotal -
                    valorDesconto
                )}
            </strong>
        </p>

    `;


    salvarDados();
}


function aumentar(index) {

    if (!carrinho[index]) return;

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


function diminuir(index) {

    if (!carrinho[index]) return;


    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();
}


function remover(index) {

    if (!carrinho[index]) return;


    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ==========================================
// CHECKOUT
// ==========================================

function abrirCheckout() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }


    abrirPagina("checkout");

    mostrarEndereco();

    mostrarTroco();

    atualizarResumoCheckout();
}


function mostrarEndereco() {

    const recebimento =
        document.getElementById("recebimento");

    const area =
        document.getElementById("enderecoArea");

    if (!recebimento || !area) return;


    area.style.display =
        recebimento.value === "entrega"
            ? "block"
            : "none";


    atualizarResumoCheckout();
}


function mostrarTroco() {

    const pagamento =
        document.getElementById("pagamento");

    const area =
        document.getElementById("areaTroco");

    if (!pagamento || !area) return;


    area.style.display =
        pagamento.value === "dinheiro"
            ? "block"
            : "none";


    atualizarResumoCheckout();
}


function atualizarResumoCheckout() {

    const elemento =
        document.getElementById("resumoCheckout");

    if (!elemento) return;


    const valorSubtotal =
        subtotal();


    const valorDesconto =
        valorSubtotal *
        (desconto / 100);


    const recebimento =
        document.getElementById("recebimento")?.value
        || "retirada";


    const taxa =
        recebimento === "entrega"
            ? TAXA_ENTREGA
            : 0;


    const totalFinal =
        valorSubtotal -
        valorDesconto +
        taxa;


    elemento.innerHTML = `

        ${carrinho.map(item => `

            <p>
                ${item.quantidade}x
                ${item.nome}
                —
                ${dinheiro(
                    item.preco *
                    item.quantidade
                )}
            </p>

        `).join("")}


        <hr>


        <p>
            Subtotal:
            <strong>
                ${dinheiro(valorSubtotal)}
            </strong>
        </p>


        ${
            desconto > 0
                ? `
                    <p>
                        Desconto:
                        <strong>
                            -${dinheiro(valorDesconto)}
                        </strong>
                    </p>
                `
                : ""
        }


        ${
            taxa > 0
                ? `
                    <p>
                        Entrega:
                        <strong>
                            ${dinheiro(taxa)}
                        </strong>
                    </p>
                `
                : `
                    <p>
                        Entrega:
                        <strong>
                            Grátis
                        </strong>
                    </p>
                `
        }


        <h3>
            Total:
            ${dinheiro(totalFinal)}
        </h3>

    `;
}


// ==========================================
// CUPOM
// ==========================================

function aplicarCupom() {

    const campo =
        document.getElementById("cupom");

    const resultado =
        document.getElementById("resultadoCupom");


    if (!campo || !resultado) return;


    const codigo =
        campo.value
            .trim()
            .toUpperCase();


    if (
        codigo === "PRIMEIRACOMPRA" ||
        codigo === "UNESP10"
    ) {

        desconto = 10;

        cupomAplicado = codigo;


        resultado.innerHTML =
            "✅ Cupom aplicado! Desconto de 10%.";


    } else {

        desconto = 0;

        cupomAplicado = "";


        resultado.innerHTML =
            "❌ Cupom inválido.";

    }


    salvarDados();

    atualizarResumoCheckout();
}


// ==========================================
// VALIDAÇÃO
// ==========================================

function validarCheckout() {

    const nome =
        document
            .getElementById("nomeCliente")
            ?.value.trim();


    const telefone =
        document
            .getElementById("telefoneCliente")
            ?.value.trim();


    if (!nome) {

        alert("Digite seu nome.");

        return false;
    }


    if (!telefone) {

        alert("Digite seu telefone.");

        return false;
    }


    const recebimento =
        document.getElementById("recebimento")?.value;


    if (recebimento === "entrega") {

        const rua =
            document.getElementById("rua")
                ?.value.trim();

        const numero =
            document.getElementById("numero")
                ?.value.trim();

        const bairro =
            document.getElementById("bairro")
                ?.value.trim();


        if (!rua || !numero || !bairro) {

            alert(
                "Preencha rua, número e bairro para a entrega."
            );

            return false;
        }
    }


    const pagamento =
        document.getElementById("pagamento")?.value;


    if (pagamento === "dinheiro") {

        const troco =
            Number(
                document
                    .getElementById("troco")
                    ?.value
            );


        const valorSubtotal =
            subtotal();


        const valorDesconto =
            valorSubtotal *
            (desconto / 100);


        const taxa =
            recebimento === "entrega"
                ? TAXA_ENTREGA
                : 0;


        const total =
            valorSubtotal -
            valorDesconto +
            taxa;


        if (!troco || troco < total) {

            alert(
                `Informe um valor de troco igual ou maior que ${dinheiro(total)}.`
            );

            return false;
        }
    }


    return true;
}


// ==========================================
// WHATSAPP
// ==========================================

function gerarNumeroPedido() {

    const agora =
        new Date();


    return (
        String(agora.getFullYear()).slice(-2) +
        String(agora.getMonth() + 1).padStart(2, "0") +
        String(agora.getDate()).padStart(2, "0") +
        String(agora.getHours()).padStart(2, "0") +
        String(agora.getMinutes()).padStart(2, "0") +
        String(agora.getSeconds()).padStart(2, "0")
    );
}


function enviarWhatsApp() {

    if (!validarCheckout()) {
        return;
    }


    if (!pedidoEstaLiberado()) {

        alert(
            "🔴 No momento estamos fechados para novos pedidos. Seu carrinho continua salvo para você finalizar quando estivermos abertos."
        );

        return;
    }


    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }


    const numeroPedido =
        gerarNumeroPedido();


    const nome =
        document
            .getElementById("nomeCliente")
            .value.trim();


    const telefone =
        document
            .getElementById("telefoneCliente")
            .value.trim();


    const recebimento =
        document
            .getElementById("recebimento")
            .value;


    const pagamento =
        document
            .getElementById("pagamento")
            .value;


    const valorSubtotal =
        subtotal();


    const valorDesconto =
        valorSubtotal *
        (desconto / 100);


    const taxa =
        recebimento === "entrega"
            ? TAXA_ENTREGA
            : 0;


    const total =
        valorSubtotal -
        valorDesconto +
        taxa;


    let mensagem =
        `🍔 *RESTAURANTE LANCHONETE MM*\n\n`;


    mensagem +=
        `📋 *Pedido nº ${numeroPedido}*\n\n`;


    mensagem +=
        `👤 *Cliente:* ${nome}\n`;


    mensagem +=
        `📱 *Telefone:* ${telefone}\n\n`;


    mensagem +=
        `🛒 *PEDIDO*\n`;


    carrinho.forEach(item => {

        mensagem +=
            `\n${item.quantidade}x ${item.nome}`;


        if (item.ingredientes) {

            mensagem +=
                `\n   ↳ ${item.ingredientes}`;

        }


        mensagem +=
            `\n   ${dinheiro(
                item.preco *
                item.quantidade
            )}\n`;

    });


    mensagem +=
        `\n💰 *Subtotal:* ${dinheiro(valorSubtotal)}`;


    if (desconto > 0) {

        mensagem +=
            `\n🏷️ *Desconto:* ${desconto}% (-${dinheiro(valorDesconto)})`;

    }


    if (recebimento === "entrega") {

        mensagem +=
            `\n🛵 *Entrega:* ${dinheiro(TAXA_ENTREGA)}`;

    } else {

        mensagem +=
            `\n🏠 *Retirada no balcão:* Grátis`;

    }


    mensagem +=
        `\n💵 *TOTAL:* ${dinheiro(total)}\n`;


    mensagem +=
        `\n📦 *Recebimento:* ${
            recebimento === "entrega"
                ? "Entrega"
                : "Retirada no balcão"
        }`;


    if (recebimento === "entrega") {

        const rua =
            document.getElementById("rua").value.trim();

        const numero =
            document.getElementById("numero").value.trim();

        const bairro =
            document.getElementById("bairro").value.trim();

        const complemento =
            document.getElementById("complemento").value.trim();

        const referencia =
            document.getElementById("referencia").value.trim();


        mensagem +=
            `\n\n📍 *ENDEREÇO*`;

        mensagem +=
            `\n${rua}, ${numero}`;

        mensagem +=
            `\nBairro: ${bairro}`;


        if (complemento) {

            mensagem +=
                `\nComplemento: ${complemento}`;

        }


        if (referencia) {

            mensagem +=
                `\nReferência: ${referencia}`;

        }
    }


    mensagem +=
        `\n\n💳 *Pagamento:* `;


    if (pagamento === "pix") {

        mensagem += "Pix";

    } else if (pagamento === "cartao") {

        mensagem += "Cartão";

    } else {

        const troco =
            Number(
                document
                    .getElementById("troco")
                    .value
            );


        mensagem +=
            `Dinheiro — troco para ${dinheiro(troco)}`;

    }


    mensagem +=
        `\n\n📍 Restaurante Lanchonete MM`;

    mensagem +=
        `\nRua Guanabara, nº 26`;

    mensagem +=
        `\nDivinolândia - SP`;


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;


    salvarHistorico(
        numeroPedido,
        mensagem
    );


    document
        .getElementById("numeroPedido")
        .textContent =
            numeroPedido;


    document
        .getElementById("statusPedido")
        .textContent =
            "Seu pedido foi preparado e encaminhado para o WhatsApp.";


    carrinho = [];

    desconto = 0;

    cupomAplicado = "";


    salvarDados();

    atualizarCarrinho();


    abrirPagina("sucesso");


    window.open(
        url,
        "_blank"
    );
}


// ==========================================
// WHATSAPP CONVERSA
// ==========================================

function abrirWhatsAppConversa() {

    const mensagem =
        encodeURIComponent(
            "Olá! Gostaria de falar com o Restaurante Lanchonete MM."
        );


    window.open(
        `https://wa.me/${WHATSAPP}?text=${mensagem}`,
        "_blank"
    );
}


// ==========================================
// HISTÓRICO
// ==========================================

function salvarHistorico(
    numeroPedido,
    mensagem
) {

    let historico = [];


    try {

        historico =
            JSON.parse(
                localStorage.getItem("historicoMM")
            ) || [];

    } catch {

        historico = [];

    }


    historico.unshift({

        numero:
            numeroPedido,

        mensagem:
            mensagem,

        data:
            new Date().toLocaleString("pt-BR")

    });


    historico =
        historico.slice(0, 20);


    localStorage.setItem(
        "historicoMM",
        JSON.stringify(historico)
    );
}


function mostrarHistorico() {

    const elemento =
        document.getElementById("listaHistorico");

    if (!elemento) return;


    let historico = [];


    try {

        historico =
            JSON.parse(
                localStorage.getItem("historicoMM")
            ) || [];

    } catch {

        historico = [];

    }


    if (historico.length === 0) {

        elemento.innerHTML =
            "<p>Você ainda não possui pedidos.</p>";

        return;
    }


    elemento.innerHTML =
        historico.map((pedido, index) => `

            <div class="itemHistorico">

                <h3>
                    Pedido #${pedido.numero}
                </h3>

                <p>
                    ${pedido.data}
                </p>

                <button
                    onclick="repetirPedido(${index})">

                    🔄 Repetir pedido

                </button>

            </div>

        `).join("");
}


function repetirPedido(index) {

    let historico = [];


    try {

        historico =
            JSON.parse(
                localStorage.getItem("historicoMM")
            ) || [];

    } catch {

        historico = [];

    }


    const pedido =
        historico[index];


    if (!pedido) return;


    alert(
        "O histórico serve para consultar seus pedidos anteriores. Monte novamente os itens no cardápio para fazer um novo pedido."
    );
}


// ==========================================
// BUSCA
// ==========================================

function buscarProdutos() {

    const campo =
        document.getElementById("campoBusca");

    const resultado =
        document.getElementById("resultadoBusca");


    if (!campo || !resultado) return;


    const termo =
        campo.value
            .trim()
            .toLowerCase();


    if (!termo) {

        resultado.innerHTML = "";

        return;
    }


    const resultados = [];


    function procurar(
        lista,
        tipo
    ) {

        lista.forEach((produto, index) => {

            const texto =
                `
                ${produto.nome}
                ${produto.ingredientes || ""}
                ${produto.categoria || ""}
                `.toLowerCase();


            if (texto.includes(termo)) {

                resultados.push({

                    produto,

                    tipo,

                    index

                });

            }

        });

    }


    procurar(lanches, "lanches");

    procurar(hotdogs, "hotdogs");

    procurar(porcoes, "porcoes");

    procurar(bebidas, "bebidas");

    procurar(esfirras, "esfirras");

    procurar(alacarte, "alacarte");

    procurar(pizzas, "pizzas");


    if (resultados.length === 0) {

        resultado.innerHTML =
            "<p>❌ Nenhum produto encontrado.</p>";

        return;
    }


    resultado.innerHTML =
        resultados.map(item => `

            <div class="resultadoBuscaItem">

                <h3>
                    ${item.produto.nome}
                </h3>

                <p>
                    ${item.produto.ingredientes || ""}
                </p>

                <strong>
                    ${dinheiro(item.produto.preco)}
                </strong>


                ${
                    item.tipo === "pizzas"

                        ? `
                            <button
                                onclick="abrirPagina('pizzas'); selecionarPizza(${item.index})">

                                🍕 Escolher pizza

                            </button>
                          `

                        : item.tipo === "alacarte"

                        ? `
                            <button
                                onclick="adicionarAlacarte(${item.index})">

                                🛒 Adicionar

                            </button>
                          `

                        : `
                            <button
                                onclick="adicionarProduto('${item.tipo}', ${item.index})">

                                🛒 Adicionar

                            </button>
                          `
                }

            </div>

        `).join("");
}


// ==========================================
// MAPA
// ==========================================

function abrirMapa() {

    const endereco =
        encodeURIComponent(
            "Rua Guanabara, 26, Divinolândia - SP"
        );


    window.open(
        `https://www.google.com/maps/search/?api=1&query=${endereco}`,
        "_blank"
    );
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .querySelectorAll(".pagina")
            .forEach(pagina => {
                pagina.style.display = "none";
            });


        const inicio =
            document.getElementById("inicio");

        if (inicio) {

            inicio.style.display =
                "block";

        }


        carregarDados();

        carregarTema();

        atualizarCarrinho();

        verificarFuncionamento();

        mostrarEndereco();

        mostrarTroco();


        setInterval(
            verificarFuncionamento,
            60000
        );

    }
);