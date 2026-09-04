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
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarDados() {
    localStorage.setItem("carrinhoMM", JSON.stringify(carrinho));
}

function carregarDados() {
    const dados = localStorage.getItem("carrinhoMM");

    if (dados) {
        try {
            carrinho = JSON.parse(dados);
        } catch {
            carrinho = [];
        }
    }
}


// ==========================================
// NAVEGAÇÃO
// ==========================================

function abrirPagina(id) {

    document.querySelectorAll(".pagina").forEach(pagina => {
        pagina.style.display = "none";
    });

    const pagina = document.getElementById(id);

    if (!pagina) {
        console.error("Página não encontrada:", id);
        return;
    }

    pagina.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "almoco") {
        mostrarCardapioAlmoco();
    }

    if (id === "pizzas") {
        criarPizzas();
    }

    if (id === "lanches") {
        criarProdutos("listaLanches", lanches);
    }

    if (id === "esfirras") {
        criarEsfirras();
    }

    if (id === "hotdogs") {
        criarProdutos("listaHotdogs", hotdogs);
    }

    if (id === "porcoes") {
        criarProdutos("listaPorcoes", porcoes);
    }

    if (id === "bebidas") {
        criarProdutos("listaBebidas", bebidas);
    }

    if (id === "marmitas") {
        criarMarmitas();
    }

    if (id === "carrinho") {
        atualizarCarrinho();
    }

    if (id === "checkout") {
        atualizarResumoCheckout();
    }
}

function voltarInicio() {
    abrirPagina("inicio");
}

function abrirCarrinho() {
    abrirPagina("carrinho");
}


// ==========================================
// HORÁRIO DE FUNCIONAMENTO
// ==========================================

function pedidoEstaLiberado() {

    const agora = new Date();

    const dia = agora.getDay();
    const minutos =
        agora.getHours() * 60 +
        agora.getMinutes();

    // Domingo = 0
    // Segunda = 1
    // Terça = 2
    // Quarta = 3
    // Quinta = 4
    // Sexta = 5
    // Sábado = 6

    // ALMOÇO
    if (dia >= 1 && dia <= 5) {
        if (minutos >= 660 && minutos <= 900) {
            return true;
        }
    }

    if (dia === 0 || dia === 6) {
        if (minutos >= 690 && minutos <= 930) {
            return true;
        }
    }

    // NOITE
    if (dia >= 2 && dia <= 6) {
        if (minutos >= 1080 && minutos <= 1350) {
            return true;
        }
    }

    return false;
}


function verificarFuncionamento() {

    const status =
        document.getElementById("statusFuncionamento");

    if (!status) return;

    if (pedidoEstaLiberado()) {

        status.textContent =
            "🟢 Estamos abertos!";

    } else {

        status.textContent =
            "🔴 Estamos fechados para novos pedidos. Você pode montar seu carrinho.";
    }
}


// ==========================================
// CARDÁPIO DO ALMOÇO
// ==========================================

const buffetFrio = [
    "Salada verde",
    "Tomate",
    "Cenoura ralada",
    "Beterraba",
    "Maionese",
    "Salada de repolho"
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


function montarLista(titulo, itens) {

    let html = `
        <div class="listaAlmoco">
            <h3>${titulo}</h3>
    `;

    itens.forEach(item => {
        html += `<p>• ${item}</p>`;
    });

    html += `</div>`;

    return html;
}


function mostrarCardapioAlmoco() {

    const area =
        document.getElementById("cardapioAlmoco");

    if (!area) return;

    const dia = new Date().getDay();
    const menu = cardapioSemana[dia];

    area.innerHTML = `
        <div class="almocoHoje">

            ${montarLista("🍚 Arroz", menu.arroz)}

            ${montarLista("🫘 Feijão", menu.feijao)}

            ${montarLista("🥩 Carnes", menu.carnes)}

            ${montarLista("🍽️ Acompanhamentos", menu.acompanhamentos)}

            ${montarLista("🥗 Buffet frio", buffetFrio)}

            ${montarLista("🍰 Sobremesas", menu.sobremesas)}

        </div>
    `;
}


// ==========================================
// PIZZAS
// ==========================================

const pizzas = [

    {
        nome: "Atum",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, atum, cebola e orégano."
    },

    {
        nome: "Bacon",
        preco: 50,
        ingredientes: "Molho de tomate, mussarela, bacon e orégano."
    },

    {
        nome: "Baiana",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, calabresa, cebola, pimenta e ovos."
    },

    {
        nome: "Calabresa",
        preco: 48,
        ingredientes: "Molho de tomate, mussarela, calabresa, cebola e orégano."
    },

    {
        nome: "Calabresa com Catupiry",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, calabresa, Catupiry e orégano."
    },

    {
        nome: "Churrasco",
        preco: 62,
        ingredientes: "Molho de tomate, mussarela, carne de churrasco, cebola e molho especial."
    },

    {
        nome: "Frango com Catupiry",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, frango desfiado e Catupiry."
    },

    {
        nome: "Lombo com Catupiry",
        preco: 54,
        ingredientes: "Molho de tomate, mussarela, lombo, cebola e Catupiry."
    },

    {
        nome: "Marguerita",
        preco: 48,
        ingredientes: "Molho de tomate, mussarela, tomate, manjericão e parmesão."
    },

    {
        nome: "Milho com Bacon",
        preco: 50,
        ingredientes: "Molho de tomate, mussarela, milho e bacon."
    },

    {
        nome: "Moda da Casa",
        preco: 65,
        ingredientes: "Molho de tomate, mussarela, presunto, calabresa, bacon, milho, cebola e ovos."
    },

    {
        nome: "Mussarela",
        preco: 45,
        ingredientes: "Molho de tomate, mussarela e orégano."
    },

    {
        nome: "Napolitana",
        preco: 48,
        ingredientes: "Molho de tomate, mussarela, tomate, parmesão e orégano."
    },

    {
        nome: "Palmito",
        preco: 54,
        ingredientes: "Molho de tomate, mussarela, palmito, tomate e orégano."
    },

    {
        nome: "Portuguesa",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, presunto, ovos, cebola, milho e ervilha."
    },

    {
        nome: "Presunto e Queijo",
        preco: 48,
        ingredientes: "Molho de tomate, mussarela, presunto e orégano."
    },

    {
        nome: "Quatro Queijos",
        preco: 55,
        ingredientes: "Molho de tomate, mussarela, Catupiry, provolone e parmesão."
    },

    {
        nome: "Strogonoff de Carne",
        preco: 60,
        ingredientes: "Molho de tomate, mussarela, strogonoff de carne, champignon e batata palha."
    },

    {
        nome: "Tilápia",
        preco: 58,
        ingredientes: "Molho de tomate, mussarela, tilápia, tomate e cebola."
    },

    {
        nome: "Vegetariana",
        preco: 52,
        ingredientes: "Molho de tomate, mussarela, milho, palmito, tomate, cebola e pimentão."
    },

    {
        nome: "Banana com Canela",
        preco: 45,
        ingredientes: "Banana, açúcar, canela e leite condensado."
    },

    {
        nome: "Beijinho",
        preco: 48,
        ingredientes: "Chocolate branco, coco ralado e leite condensado."
    },

    {
        nome: "Brigadeiro",
        preco: 45,
        ingredientes: "Chocolate e brigadeiro cremoso."
    },

    {
        nome: "Chocoloco",
        preco: 50,
        ingredientes: "Chocolate ao leite e coco ralado."
    },

    {
        nome: "Confeti",
        preco: 48,
        ingredientes: "Chocolate ao leite e confetes de chocolate."
    },

    {
        nome: "Doce de Leite",
        preco: 45,
        ingredientes: "Doce de leite cremoso."
    },

    {
        nome: "Paçoca",
        preco: 48,
        ingredientes: "Chocolate branco, paçoca e leite condensado."
    },

    {
        nome: "Prestígio",
        preco: 48,
        ingredientes: "Chocolate ao leite e coco."
    },

    {
        nome: "Romeu e Julieta",
        preco: 45,
        ingredientes: "Mussarela e goiabada."
    },

    {
        nome: "Sensação",
        preco: 52,
        ingredientes: "Chocolate ao leite, morango e leite condensado."
    }

];


const tamanhosPizza = [
    {
        nome: "Pequena",
        pedaços: 4,
        sabores: 1
    },
    {
        nome: "Média",
        pedaços: 8,
        sabores: 2
    },
    {
        nome: "Grande",
        pedaços: 12,
        sabores: 3
    }
];


const bordasPizza = [
    ["Sem Borda", 0],
    ["Catupiry Original", 10],
    ["Cheddar", 10],
    ["Mussarela", 12],
    ["Provolone", 12],
    ["Requeijão com Alho Frito", 11],
    ["Vulcão / Pãozinho", 15],
    ["Chocolate ao Leite", 12],
    ["Chocolate Branco", 12],
    ["Doce de Leite", 10],
    ["Goiabada", 10]
];


const complementosPizzaLista = [
    ["Azeite Trufado", 8],
    ["Bacon Crocante Extra", 7],
    ["Catupiry Extra", 8],
    ["Cheddar Extra", 7],
    ["Cebola Crispy", 5],
    ["Geleia de Pimenta", 6],
    ["Mussarela Extra", 8],
    ["Ovo Cozido Extra", 4],
    ["Parmesão Ralado", 6],
    ["Pimenta Biquinho", 5]
];


let pizzaSelecionada = null;
let tamanhoPizzaSelecionado = null;
let saboresPizza = [];
let bordaPizzaSelecionada = ["Sem Borda", 0];
let complementosPizza = [];


function criarPizzas() {

    const area =
        document.getElementById("listaPizzas");

    if (!area) return;

    area.innerHTML = `
        <div class="listaPizzas">

            <h3>🍕 Escolha sua pizza</h3>

            <p>
                Primeiro escolha o tamanho e depois os sabores.
            </p>

            <div id="tamanhosPizza"></div>

            <div id="saboresPizza"></div>

            <div id="ingredientesPizza"></div>

            <div id="bordasPizza"></div>

            <div id="complementosPizza"></div>

        </div>
    `;

    criarTamanhosPizza();
}


function criarTamanhosPizza() {

    const area =
        document.getElementById("tamanhosPizza");

    if (!area) return;

    area.innerHTML = `
        <h3>1️⃣ Escolha o tamanho</h3>
    `;

    tamanhosPizza.forEach((tamanho, index) => {

        area.innerHTML += `
            <button
                onclick="selecionarTamanhoPizza(${index})">

                🍕 ${tamanho.nome}<br>
                ${tamanho.pedaços} pedaços<br>
                Até ${tamanho.sabores} sabor${tamanho.sabores > 1 ? "es" : ""}

            </button>
        `;
    });
}


function selecionarTamanhoPizza(index) {

    tamanhoPizzaSelecionado = tamanhosPizza[index];

    saboresPizza = [];
    bordaPizzaSelecionada = ["Sem Borda", 0];
    complementosPizza = [];

    criarSaboresPizza();

    const ingredientes =
        document.getElementById("ingredientesPizza");

    if (ingredientes) {
        ingredientes.innerHTML = "";
    }

    const bordas =
        document.getElementById("bordasPizza");

    if (bordas) {
        bordas.innerHTML = "";
    }

    const complementos =
        document.getElementById("complementosPizza");

    if (complementos) {
        complementos.innerHTML = "";
    }
}


function criarSaboresPizza() {

    const area =
        document.getElementById("saboresPizza");

    if (!area) return;

    area.innerHTML = `
        <h3>2️⃣ Escolha o sabor</h3>

        <p>
            Você pode escolher até
            ${tamanhoPizzaSelecionado.sabores}
            sabor${tamanhoPizzaSelecionado.sabores > 1 ? "es" : ""}.
        </p>
    `;

    pizzas.forEach((pizza, index) => {

        const selecionada =
            saboresPizza.some(s => s.nome === pizza.nome);

        area.innerHTML += `
            <div class="pizzaItem">

                <button
                    onclick="selecionarSaborPizza(${index})">

                    ${selecionada ? "✅" : "🍕"}
                    ${pizza.nome}
                    - ${dinheiro(pizza.preco)}

                </button>

                <p>
                    <strong>Ingredientes:</strong>
                    ${pizza.ingredientes}
                </p>

            </div>
        `;
    });
}


function selecionarSaborPizza(index) {

    if (!tamanhoPizzaSelecionado) {

        alert("Escolha primeiro o tamanho da pizza.");
        return;
    }

    const pizza = pizzas[index];

    const existente =
        saboresPizza.findIndex(
            sabor => sabor.nome === pizza.nome
        );

    if (existente >= 0) {

        saboresPizza.splice(existente, 1);

    } else {

        if (
            saboresPizza.length >=
            tamanhoPizzaSelecionado.sabores
        ) {

            alert(
                `Essa pizza permite até ${tamanhoPizzaSelecionado.sabores} sabor${tamanhoPizzaSelecionado.sabores > 1 ? "es" : ""}.`
            );

            return;
        }

        saboresPizza.push(pizza);
    }

    criarSaboresPizza();

    mostrarBordasPizza();
}


function mostrarBordasPizza() {

    if (saboresPizza.length === 0) return;

    const area =
        document.getElementById("bordasPizza");

    if (!area) return;

    area.innerHTML = `
        <h3>3️⃣ Escolha a borda</h3>
    `;

    bordasPizza.forEach((borda, index) => {

        const selecionada =
            bordaPizzaSelecionada[0] === borda[0];

        area.innerHTML += `
            <button
                onclick="selecionarBordaPizza(${index})">

                ${selecionada ? "✅" : "⭕"}
                ${borda[0]}
                ${borda[1] > 0 ? "- " + dinheiro(borda[1]) : ""}

            </button>
        `;
    });

    mostrarComplementosPizza();
}


function selecionarBordaPizza(index) {

    bordaPizzaSelecionada =
        bordasPizza[index];

    mostrarBordasPizza();
}


function mostrarComplementosPizza() {

    const area =
        document.getElementById("complementosPizza");

    if (!area) return;

    area.innerHTML = `
        <h3>4️⃣ Adicionais</h3>

        <p>
            Escolha os adicionais que quiser.
        </p>
    `;

    complementosPizzaLista.forEach((item, index) => {

        const selecionado =
            complementosPizza.some(
                complemento =>
                    complemento[0] === item[0]
            );

        area.innerHTML += `
            <button
                onclick="selecionarComplementoPizza(${index})">

                ${selecionado ? "✅" : "➕"}
                ${item[0]}
                - ${dinheiro(item[1])}

            </button>
        `;
    });

    area.innerHTML += `
        <button
            onclick="adicionarPizzaCarrinho()"
            class="botaoAdicionar">

            🛒 ADICIONAR PIZZA AO CARRINHO

        </button>
    `;
}


function selecionarComplementoPizza(index) {

    const item =
        complementosPizzaLista[index];

    const existente =
        complementosPizza.findIndex(
            complemento =>
                complemento[0] === item[0]
        );

    if (existente >= 0) {

        complementosPizza.splice(existente, 1);

    } else {

        complementosPizza.push(item);
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
                pizza => pizza.preco
            )
        );

    const precoBorda =
        Number(bordaPizzaSelecionada[1] || 0);

    const precoComplementos =
        complementosPizza.reduce(
            (total, item) =>
                total + Number(item[1]),
            0
        );

    const precoFinal =
        maiorPreco +
        precoBorda +
        precoComplementos;

    const nomeSabores =
        saboresPizza
            .map(pizza => pizza.nome)
            .join(" / ");

    const ingredientes =
        saboresPizza
            .map(pizza => pizza.ingredientes)
            .join(" | ");

    carrinho.push({

        id: Date.now(),

        tipo: "pizza",

        nome:
            `Pizza ${tamanhoPizzaSelecionado.nome} - ${nomeSabores}`,

        detalhes:
            `${tamanhoPizzaSelecionado.pedaços} pedaços | Borda: ${bordaPizzaSelecionada[0]} | Adicionais: ${
                complementosPizza.length
                    ? complementosPizza.map(c => c[0]).join(", ")
                    : "Nenhum"
            }`,

        ingredientes,

        preco: precoFinal,

        quantidade: 1
    });

    salvarDados();
    atualizarCarrinho();

    alert("🍕 Pizza adicionada ao carrinho!");

    saboresPizza = [];
    complementosPizza = [];
    bordaPizzaSelecionada = ["Sem Borda", 0];

    criarPizzas();
}


// ==========================================
// LANCHES
// ==========================================

const lanches = [

    {
        nome: "X-Burguer",
        preco: 20,
        ingredientes: "Pão, hambúrguer, queijo, alface, tomate e molho especial."
    },

    {
        nome: "X-Salada",
        preco: 22,
        ingredientes: "Pão, hambúrguer, queijo, alface, tomate, milho e molho especial."
    },

    {
        nome: "X-Bacon",
        preco: 26,
        ingredientes: "Pão, hambúrguer, queijo, bacon, alface, tomate e molho especial."
    },

    {
        nome: "X-Egg",
        preco: 24,
        ingredientes: "Pão, hambúrguer, queijo, ovo, alface, tomate e molho especial."
    },

    {
        nome: "X-Frango",
        preco: 22,
        ingredientes: "Pão, frango desfiado, queijo, alface, tomate e molho especial."
    },

    {
        nome: "X-Tudo",
        preco: 32,
        ingredientes: "Pão, hambúrguer, queijo, presunto, bacon, ovo, calabresa, alface, tomate e molho."
    },

    {
        nome: "X-Calabresa",
        preco: 23,
        ingredientes: "Pão, calabresa, queijo, cebola, alface, tomate e molho."
    },

    {
        nome: "X-Duplo Cheddar",
        preco: 34,
        ingredientes: "Pão, dois hambúrgueres, cheddar, cebola e molho especial."
    },

    {
        nome: "X-Contrafilé",
        preco: 30,
        ingredientes: "Pão, contrafilé, queijo, alface, tomate e molho especial."
    },

    {
        nome: "X-Vegetariano",
        preco: 25,
        ingredientes: "Pão, queijo, alface, tomate, milho, palmito, cebola e molho especial."
    }

];


const adicionaisLanche = [
    ["Bacon Extra", 6],
    ["Queijo Extra", 5],
    ["Cheddar Extra", 5],
    ["Ovo Extra", 3],
    ["Hambúrguer Extra", 8],
    ["Catupiry", 5]
];


function criarProdutos(id, lista) {

    const area =
        document.getElementById(id);

    if (!area) return;

    area.innerHTML = "";

    lista.forEach((produto, index) => {

        const div =
            document.createElement("div");

        div.className = "produto";

        div.innerHTML = `

            <h3>${produto.nome}</h3>

            <p>
                <strong>Ingredientes:</strong>
                ${produto.ingredientes || "Produto da casa."}
            </p>

            <strong>${dinheiro(produto.preco)}</strong>

            <button
                onclick="adicionarProduto('${produto.nome}', ${produto.preco}, '${id}', ${index})">

                ➕ Adicionar

            </button>

        `;

        area.appendChild(div);
    });
}


function adicionarProduto(nome, preco, origem, index) {

    let ingredientes = "";

    if (origem === "listaLanches") {
        ingredientes =
            lanches[index]?.ingredientes || "";
    }

    if (origem === "listaHotdogs") {
        ingredientes =
            hotdogs[index]?.ingredientes || "";
    }

    if (origem === "listaPorcoes") {
        ingredientes =
            porcoes[index]?.ingredientes || "";
    }

    if (origem === "listaBebidas") {
        ingredientes =
            bebidas[index]?.ingredientes || "";
    }

    carrinho.push({

        id: Date.now() + Math.random(),

        tipo: origem,

        nome,

        ingredientes,

        preco: Number(preco),

        quantidade: 1

    });

    salvarDados();
    atualizarCarrinho();

    alert(`${nome} foi adicionado ao carrinho!`);
}


// ==========================================
// HOT DOG
// ==========================================

const hotdogs = [

    {
        nome: "Dog Simples",
        preco: 14,
        ingredientes: "Pão, salsicha, molho, milho, ervilha, batata palha e ketchup."
    },

    {
        nome: "Dog Duplo",
        preco: 18,
        ingredientes: "Pão, duas salsichas, molho, milho, ervilha, batata palha e ketchup."
    },

    {
        nome: "Dog Frango",
        preco: 20,
        ingredientes: "Pão, salsicha, frango desfiado, molho, milho, ervilha e batata palha."
    },

    {
        nome: "Dog Bacon",
        preco: 22,
        ingredientes: "Pão, salsicha, bacon, queijo, molho, milho e batata palha."
    },

    {
        nome: "Dog Tudo",
        preco: 26,
        ingredientes: "Pão, salsicha, bacon, queijo, frango, milho, ervilha, purê e batata palha."
    }

];


// ==========================================
// PORÇÕES
// ==========================================

const porcoes = [

    {
        nome: "Batata Frita Tradicional 500g",
        preco: 28,
        ingredientes: "Batata frita crocante e sal."
    },

    {
        nome: "Batata com Cheddar e Bacon 600g",
        preco: 38,
        ingredientes: "Batata frita, cheddar cremoso e bacon crocante."
    },

    {
        nome: "Calabresa Acebolada 500g",
        preco: 35,
        ingredientes: "Calabresa fatiada, cebola e temperos."
    },

    {
        nome: "Frango a Passarinho 700g",
        preco: 42,
        ingredientes: "Pedaços de frango temperados e fritos."
    },

    {
        nome: "Isca de Tilápia 500g",
        preco: 48,
        ingredientes: "Iscas de tilápia empanadas."
    },

    {
        nome: "Contrafilé Acebolado 500g",
        preco: 55,
        ingredientes: "Contrafilé fatiado, cebola e temperos."
    }

];


// ==========================================
// BEBIDAS
// ==========================================

const bebidas = [

    {
        nome: "Coca-Cola Lata",
        preco: 6.50,
        ingredientes: "Refrigerante Coca-Cola lata."
    },

    {
        nome: "Coca-Cola Zero",
        preco: 6.50,
        ingredientes: "Refrigerante Coca-Cola Zero lata."
    },

    {
        nome: "Guaraná Lata",
        preco: 6.50,
        ingredientes: "Refrigerante Guaraná lata."
    },

    {
        nome: "Fanta Lata",
        preco: 6.50,
        ingredientes: "Refrigerante Fanta lata."
    },

    {
        nome: "Sprite Lata",
        preco: 6.50,
        ingredientes: "Refrigerante Sprite lata."
    },

    {
        nome: "Coca-Cola 2L",
        preco: 14,
        ingredientes: "Refrigerante Coca-Cola 2 litros."
    },

    {
        nome: "Guaraná Antarctica 2L",
        preco: 14,
        ingredientes: "Refrigerante Guaraná Antarctica 2 litros."
    },

    {
        nome: "Fanta 2L",
        preco: 14,
        ingredientes: "Refrigerante Fanta 2 litros."
    },

    {
        nome: "Água sem gás",
        preco: 4,
        ingredientes: "Água mineral sem gás."
    },

    {
        nome: "Água com gás",
        preco: 4.50,
        ingredientes: "Água mineral com gás."
    }

];


// ==========================================
// ESFIRRAS
// ==========================================

const esfirras = [

    {
        nome: "Carne",
        preco: 8,
        ingredientes: "Massa, carne temperada, cebola, tomate e temperos."
    },

    {
        nome: "Frango",
        preco: 8.50,
        ingredientes: "Massa, frango desfiado, cebola, tomate e temperos."
    },

    {
        nome: "Queijo",
        preco: 9,
        ingredientes: "Massa, mussarela e orégano."
    },

    {
        nome: "Calabresa",
        preco: 9,
        ingredientes: "Massa, calabresa, cebola e temperos."
    },

    {
        nome: "Presunto e Queijo",
        preco: 9.50,
        ingredientes: "Massa, presunto, mussarela e orégano."
    },

    {
        nome: "Frango com Catupiry",
        preco: 10,
        ingredientes: "Massa, frango desfiado e Catupiry."
    },

    {
        nome: "Carne com Queijo",
        preco: 10,
        ingredientes: "Massa, carne temperada e mussarela."
    },

    {
        nome: "Bacon com Queijo",
        preco: 11,
        ingredientes: "Massa, bacon crocante e mussarela."
    },

    {
        nome: "Quatro Queijos",
        preco: 11.50,
        ingredientes: "Massa, mussarela, Catupiry, provolone e parmesão."
    },

    {
        nome: "Especial da Casa",
        preco: 12,
        ingredientes: "Massa, carne, queijo, bacon, milho, cebola e temperos especiais."
    }

];


let esfirraSelecionada = null;


function criarEsfirras() {

    const area =
        document.getElementById("listaEsfirras");

    if (!area) return;

    area.innerHTML = `
        <h3>🥙 Escolha sua esfirra</h3>
    `;

    esfirras.forEach((esfirra, index) => {

        area.innerHTML += `

            <div class="produto">

                <h3>${esfirra.nome}</h3>

                <p>
                    <strong>Ingredientes:</strong>
                    ${esfirra.ingredientes}
                </p>

                <strong>${dinheiro(esfirra.preco)}</strong>

                <button
                    onclick="selecionarEsfirra(${index})">

                    ➕ Escolher

                </button>

            </div>

        `;
    });
}


function selecionarEsfirra(index) {

    esfirraSelecionada =
        esfirras[index];

    const area =
        document.getElementById("montagemEsfirra");

    if (!area) return;

    area.innerHTML = `

        <h3>🥙 ${esfirraSelecionada.nome}</h3>

        <p>
            <strong>Ingredientes:</strong><br>
            ${esfirraSelecionada.ingredientes}
        </p>

        <p>
            ${dinheiro(esfirraSelecionada.preco)}
        </p>

        <label>Quantidade</label>

        <input
            type="number"
            id="quantidadeEsfirra"
            min="1"
            value="1">

        <button onclick="adicionarEsfirraCarrinho()">

            🛒 Adicionar ao Carrinho

        </button>

    `;
}


function adicionarEsfirraCarrinho() {

    if (!esfirraSelecionada) {

        alert("Escolha uma esfirra.");
        return;
    }

    const quantidade =
        Number(
            document.getElementById(
                "quantidadeEsfirra"
            )?.value || 1
        );

    carrinho.push({

        id: Date.now() + Math.random(),

        tipo: "esfirra",

        nome: esfirraSelecionada.nome,

        ingredientes:
            esfirraSelecionada.ingredientes,

        preco:
            esfirraSelecionada.preco,

        quantidade:
            quantidade > 0 ? quantidade : 1

    });

    salvarDados();
    atualizarCarrinho();

    alert("🥙 Esfirra adicionada ao carrinho!");

    esfirraSelecionada = null;

    criarEsfirras();
}


// ==========================================
// MARMITAS
// ==========================================

const tamanhosMarmita = [

    {
        nome: "Pequena",
        preco: 20,
        carnes: 1
    },

    {
        nome: "Média",
        preco: 25,
        carnes: 2
    },

    {
        nome: "Grande",
        preco: 28,
        carnes: 3
    },

    {
        nome: "Comercial",
        preco: 50,
        carnes: 4
    }

];


let marmitaSelecionada = null;
let tamanhoMarmitaSelecionado = null;
let carnesMarmita = [];


function obterCarnesDoDia() {

    const dia =
        new Date().getDay();

    return cardapioSemana[dia].carnes;
}


function criarMarmitas() {

    const area =
        document.getElementById("listaMarmitas");

    if (!area) return;

    area.innerHTML = `
        <h3>🍱 Monte sua marmita</h3>

        <p>
            Escolha o tamanho.
        </p>

        <div id="tamanhosMarmita"></div>

        <div id="carnesMarmita"></div>
    `;

    const tamanhos =
        document.getElementById(
            "tamanhosMarmita"
        );

    tamanhosMarmita.forEach((marmita, index) => {

        tamanhos.innerHTML += `

            <button
                onclick="abrirMontagemMarmita(${index})">

                🍱 ${marmita.nome}<br>
                ${dinheiro(marmita.preco)}<br>
                Até ${marmita.carnes} mistura${marmita.carnes > 1 ? "s" : ""}

            </button>

        `;
    });
}


function abrirMontagemMarmita(index) {

    tamanhoMarmitaSelecionado =
        tamanhosMarmita[index];

    carnesMarmita = [];

    const area =
        document.getElementById("carnesMarmita");

    if (!area) return;

    const carnes =
        obterCarnesDoDia();

    area.innerHTML = `

        <h3>
            1️⃣ Escolha até
            ${tamanhoMarmitaSelecionado.carnes}
            mistura${tamanhoMarmitaSelecionado.carnes > 1 ? "s" : ""}
        </h3>

    `;

    carnes.forEach((carne, indexCarne) => {

        area.innerHTML += `

            <button
                onclick="selecionarMisturaMarmita(${indexCarne})">

                🍖 ${carne}

            </button>

        `;
    });

    area.innerHTML += `

        <button
            onclick="adicionarMarmitaCarrinho()">

            🛒 Adicionar Marmita ao Carrinho

        </button>

    `;
}


function selecionarMisturaMarmita(index) {

    const carnes =
        obterCarnesDoDia();

    const carne =
        carnes[index];

    const existente =
        carnesMarmita.indexOf(carne);

    if (existente >= 0) {

        carnesMarmita.splice(existente, 1);

    } else {

        if (
            carnesMarmita.length >=
            tamanhoMarmitaSelecionado.carnes
        ) {

            alert(
                `Essa marmita permite até ${tamanhoMarmitaSelecionado.carnes} mistura${tamanhoMarmitaSelecionado.carnes > 1 ? "s" : ""}.`
            );

            return;
        }

        carnesMarmita.push(carne);
    }

    abrirMontagemMarmita(
        tamanhosMarmita.indexOf(
            tamanhoMarmitaSelecionado
        )
    );

    const area =
        document.getElementById("carnesMarmita");

    area.innerHTML += `
        <p>
            <strong>Selecionadas:</strong>
            ${carnesMarmita.join(", ") || "Nenhuma"}
        </p>

        <button onclick="adicionarMarmitaCarrinho()">
            🛒 Adicionar Marmita ao Carrinho
        </button>
    `;
}


function adicionarMarmitaCarrinho() {

    if (!tamanhoMarmitaSelecionado) {

        alert("Escolha o tamanho da marmita.");
        return;
    }

    if (carnesMarmita.length === 0) {

        alert("Escolha pelo menos uma mistura.");
        return;
    }

    carrinho.push({

        id: Date.now(),

        tipo: "marmita",

        nome:
            `Marmita ${tamanhoMarmitaSelecionado.nome}`,

        detalhes:
            `Misturas: ${carnesMarmita.join(", ")}`,

        preco:
            tamanhoMarmitaSelecionado.preco,

        quantidade: 1

    });

    salvarDados();
    atualizarCarrinho();

    alert("🍱 Marmita adicionada ao carrinho!");

    tamanhoMarmitaSelecionado = null;
    carnesMarmita = [];

    criarMarmitas();
}


// ==========================================
// CARRINHO
// ==========================================

function subtotal() {

    return carrinho.reduce(
        (total, item) =>
            total +
            Number(item.preco) *
            Number(item.quantidade),
        0
    );
}


function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const total =
        document.getElementById("totalCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    const contadorAlmoco =
        document.getElementById(
            "contadorCarrinhoAlmoco"
        );

    if (contador) {

        contador.textContent =
            carrinho.reduce(
                (soma, item) =>
                    soma + Number(item.quantidade),
                0
            );
    }

    if (contadorAlmoco) {

        contadorAlmoco.textContent =
            carrinho.reduce(
                (soma, item) =>
                    soma + Number(item.quantidade),
                0
            );
    }

    if (!lista) return;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p>
                🛒 Seu carrinho está vazio.
            </p>
        `;

        if (total) {
            total.innerHTML = "";
        }

        return;
    }

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {

        const div =
            document.createElement("div");

        div.className = "itemCarrinho";

        div.innerHTML = `

            <h3>${item.nome}</h3>

            ${
                item.detalhes
                    ? `<p>${item.detalhes}</p>`
                    : ""
            }

            ${
                item.ingredientes
                    ? `<small>${item.ingredientes}</small>`
                    : ""
            }

            <p>
                ${dinheiro(item.preco)}
            </p>

            <div>

                <button onclick="diminuir(${index})">
                    −
                </button>

                <strong>
                    ${item.quantidade}
                </strong>

                <button onclick="aumentar(${index})">
                    +
                </button>

                <button onclick="remover(${index})">
                    🗑️
                </button>

            </div>

        `;

        lista.appendChild(div);
    });

    if (total) {

        total.innerHTML = `

            <h3>
                Subtotal:
                ${dinheiro(subtotal())}
            </h3>

        `;
    }
}


function aumentar(index) {

    carrinho[index].quantidade++;

    salvarDados();
    atualizarCarrinho();
}


function diminuir(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);
    }

    salvarDados();
    atualizarCarrinho();
}


function remover(index) {

    carrinho.splice(index, 1);

    salvarDados();
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
}


function mostrarEndereco() {

    const recebimento =
        document.getElementById(
            "recebimento"
        )?.value;

    const area =
        document.getElementById(
            "enderecoArea"
        );

    if (!area) return;

    if (recebimento === "entrega") {

        area.style.display = "block";

    } else {

        area.style.display = "none";
    }

    atualizarResumoCheckout();
}


function mostrarTroco() {

    const pagamento =
        document.getElementById(
            "pagamento"
        )?.value;

    const area =
        document.getElementById(
            "areaTroco"
        );

    if (!area) return;

    if (pagamento === "dinheiro") {

        area.style.display = "block";

    } else {

        area.style.display = "none";
    }
}


function atualizarResumoCheckout() {

    const area =
        document.getElementById(
            "resumoCheckout"
        );

    if (!area) return;

    let subtotalAtual =
        subtotal();

    let taxa = 0;

    const recebimento =
        document.getElementById(
            "recebimento"
        )?.value;

    if (recebimento === "entrega") {
        taxa = TAXA_ENTREGA;
    }

    const valorDesconto =
        subtotalAtual * desconto;

    const total =
        subtotalAtual +
        taxa -
        valorDesconto;

    area.innerHTML = `

        <p>
            Subtotal:
            <strong>${dinheiro(subtotalAtual)}</strong>
        </p>

        <p>
            Entrega:
            <strong>${dinheiro(taxa)}</strong>
        </p>

        ${
            desconto > 0
                ? `
                    <p>
                        Desconto:
                        <strong>
                            - ${dinheiro(valorDesconto)}
                        </strong>
                    </p>
                `
                : ""
        }

        <h3>
            Total:
            ${dinheiro(total)}
        </h3>

    `;
}


function aplicarCupom() {

    const campo =
        document.getElementById("cupom");

    const resultado =
        document.getElementById(
            "resultadoCupom"
        );

    if (!campo || !resultado) return;

    const cupom =
        campo.value
            .trim()
            .toUpperCase();

    if (cupom === "PRIMEIRACOMPRA") {

        desconto = 0.10;
        cupomAplicado = cupom;

        resultado.innerHTML =
            "✅ Cupom aplicado: 10% de desconto.";

    } else if (cupom === "UNESP10") {

        desconto = 0.10;
        cupomAplicado = cupom;

        resultado.innerHTML =
            "✅ Cupom aplicado: 10% de desconto.";

    } else {

        desconto = 0;
        cupomAplicado = "";

        resultado.innerHTML =
            "❌ Cupom inválido.";
    }

    atualizarResumoCheckout();
}


function validarCheckout() {

    const nome =
        document.getElementById(
            "nomeCliente"
        )?.value.trim();

    const telefone =
        document.getElementById(
            "telefoneCliente"
        )?.value.trim();

    const recebimento =
        document.getElementById(
            "recebimento"
        )?.value;

    const pagamento =
        document.getElementById(
            "pagamento"
        )?.value;

    if (!nome) {

        alert("Digite seu nome.");
        return false;
    }

    if (!telefone) {

        alert("Digite seu telefone.");
        return false;
    }

    if (recebimento === "entrega") {

        const rua =
            document.getElementById(
                "rua"
            )?.value.trim();

        const numero =
            document.getElementById(
                "numero"
            )?.value.trim();

        const bairro =
            document.getElementById(
                "bairro"
            )?.value.trim();

        if (!rua || !numero || !bairro) {

            alert(
                "Preencha rua, número e bairro."
            );

            return false;
        }
    }

    if (pagamento === "dinheiro") {

        const troco =
            Number(
                document.getElementById(
                    "troco"
                )?.value || 0
            );

        let taxa = 0;

        if (recebimento === "entrega") {
            taxa = TAXA_ENTREGA;
        }

        const total =
            subtotal() +
            taxa -
            subtotal() * desconto;

        if (troco < total) {

            alert(
                `O valor informado para troco deve ser igual ou maior que ${dinheiro(total)}.`
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

    const numero =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return numero;
}


function enviarWhatsApp() {

    // IMPORTANTE:
    // O cliente pode montar o carrinho
    // mesmo quando o restaurante está fechado.
    // Apenas o envio final é bloqueado.

    if (!pedidoEstaLiberado()) {

        alert(
            "🔴 No momento estamos fechados para novos pedidos.\n\nVocê pode deixar seu carrinho montado e finalizar quando estivermos abertos."
        );

        return;
    }

    if (!validarCheckout()) {
        return;
    }

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");
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
        document.getElementById(
            "recebimento"
        ).value;

    const pagamento =
        document.getElementById(
            "pagamento"
        ).value;

    let mensagem = "";

    const numeroPedido =
        gerarNumeroPedido();

    mensagem +=
        `*🍔 RESTAURANTE LANCHONETE MM*\n`;

    mensagem +=
        `*PEDIDO #${numeroPedido}*\n\n`;

    mensagem +=
        `👤 *Cliente:* ${nome}\n`;

    mensagem +=
        `📞 *Telefone:* ${telefone}\n\n`;

    mensagem +=
        `*🛒 PEDIDO:*\n`;

    carrinho.forEach((item, index) => {

        mensagem +=
            `\n${index + 1}. ${item.nome}`;

        mensagem +=
            `\nQuantidade: ${item.quantidade}`;

        mensagem +=
            `\nValor: ${dinheiro(
                item.preco *
                item.quantidade
            )}`;

        if (item.detalhes) {

            mensagem +=
                `\n${item.detalhes}`;
        }

        if (item.ingredientes) {

            mensagem +=
                `\nIngredientes: ${item.ingredientes}`;
        }

        mensagem += "\n";
    });

    const subtotalAtual =
        subtotal();

    const taxa =
        recebimento === "entrega"
            ? TAXA_ENTREGA
            : 0;

    const valorDesconto =
        subtotalAtual * desconto;

    const total =
        subtotalAtual +
        taxa -
        valorDesconto;

    mensagem +=
        `\n*💰 SUBTOTAL:* ${dinheiro(subtotalAtual)}\n`;

    if (taxa > 0) {

        mensagem +=
            `*🛵 ENTREGA:* ${dinheiro(taxa)}\n`;

    } else {

        mensagem +=
            `*🏪 RETIRADA:* GRÁTIS\n`;
    }

    if (valorDesconto > 0) {

        mensagem +=
            `*🎟️ DESCONTO:* -${dinheiro(valorDesconto)}\n`;

        mensagem +=
            `*Cupom:* ${cupomAplicado}\n`;
    }

    mensagem +=
        `*💵 TOTAL:* ${dinheiro(total)}\n\n`;

    if (recebimento === "entrega") {

        const rua =
            document.getElementById(
                "rua"
            ).value.trim();

        const numero =
            document.getElementById(
                "numero"
            ).value.trim();

        const bairro =
            document.getElementById(
                "bairro"
            ).value.trim();

        const complemento =
            document.getElementById(
                "complemento"
            ).value.trim();

        const referencia =
            document.getElementById(
                "referencia"
            ).value.trim();

        mensagem +=
            `*📍 ENDEREÇO DE ENTREGA:*\n`;

        mensagem +=
            `${rua}, ${numero}\n`;

        mensagem +=
            `${bairro}\n`;

        if (complemento) {

            mensagem +=
                `Complemento: ${complemento}\n`;
        }

        if (referencia) {

            mensagem +=
                `Referência: ${referencia}\n`;
        }

        mensagem += "\n";

    } else {

        mensagem +=
            `*🏪 RETIRADA NO BALCÃO*\n\n`;
    }

    mensagem +=
        `*💳 PAGAMENTO:* ${pagamento.toUpperCase()}\n`;

    if (pagamento === "dinheiro") {

        const troco =
            document.getElementById(
                "troco"
            ).value;

        mensagem +=
            `Troco para: ${dinheiro(troco)}\n`;
    }

    mensagem +=
        `\nObrigado pela preferência! ❤️`;

    salvarHistorico(
        numeroPedido,
        nome,
        total
    );

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(
        url,
        "_blank"
    );

    carrinho = [];
    desconto = 0;
    cupomAplicado = "";

    salvarDados();
    atualizarCarrinho();

    const numeroArea =
        document.getElementById(
            "numeroPedido"
        );

    if (numeroArea) {
        numeroArea.textContent =
            `#${numeroPedido}`;
    }

    const status =
        document.getElementById(
            "statusPedido"
        );

    if (status) {

        status.textContent =
            "Seu pedido foi enviado pelo WhatsApp.";
    }

    abrirPagina("sucesso");
}


// ==========================================
// HISTÓRICO
// ==========================================

function salvarHistorico(
    numero,
    nome,
    total
) {

    const historico =
        JSON.parse(
            localStorage.getItem(
                "historicoMM"
            ) || "[]"
        );

    historico.unshift({

        numero,

        nome,

        total,

        data:
            new Date().toLocaleString(
                "pt-BR"
            )

    });

    localStorage.setItem(
        "historicoMM",
        JSON.stringify(
            historico.slice(0, 20)
        )
    );
}


function mostrarHistorico() {

    const area =
        document.getElementById(
            "listaHistorico"
        );

    if (!area) return;

    const historico =
        JSON.parse(
            localStorage.getItem(
                "historicoMM"
            ) || "[]"
        );

    if (historico.length === 0) {

        area.innerHTML =
            "<p>Nenhum pedido realizado ainda.</p>";

        return;
    }

    area.innerHTML = "";

    historico.forEach(pedido => {

        area.innerHTML += `

            <div class="pedidoHistorico">

                <h3>
                    Pedido #${pedido.numero}
                </h3>

                <p>
                    Cliente:
                    ${pedido.nome}
                </p>

                <p>
                    Total:
                    ${dinheiro(pedido.total)}
                </p>

                <small>
                    ${pedido.data}
                </small>

            </div>

        `;
    });
}


function repetirPedido() {

    alert(
        "Para repetir um pedido, vamos selecionar os produtos novamente pelo cardápio."
    );
}


// ==========================================
// BUSCA
// ==========================================

function buscarProdutos() {

    const campo =
        document.getElementById(
            "campoBusca"
        );

    const resultado =
        document.getElementById(
            "resultadoBusca"
        );

    if (!campo || !resultado) return;

    const termo =
        campo.value
            .toLowerCase()
            .trim();

    if (!termo) {

        resultado.innerHTML = "";
        return;
    }

    const todos = [

        ...lanches.map((p, i) => ({
            ...p,
            origem: "listaLanches",
            index: i
        })),

        ...hotdogs.map((p, i) => ({
            ...p,
            origem: "listaHotdogs",
            index: i
        })),

        ...porcoes.map((p, i) => ({
            ...p,
            origem: "listaPorcoes",
            index: i
        })),

        ...bebidas.map((p, i) => ({
            ...p,
            origem: "listaBebidas",
            index: i
        })),

        ...esfirras.map((p, i) => ({
            ...p,
            origem: "listaEsfirras",
            index: i
        })),

        ...pizzas.map((p, i) => ({
            ...p,
            origem: "pizza",
            index: i
        }))

    ];

    const encontrados =
        todos.filter(produto =>

            produto.nome
                .toLowerCase()
                .includes(termo)

            ||

            (produto.ingredientes || "")
                .toLowerCase()
                .includes(termo)

        );

    if (encontrados.length === 0) {

        resultado.innerHTML =
            "<p>Nenhum produto encontrado.</p>";

        return;
    }

    resultado.innerHTML = `
        <h3>🔎 Resultados</h3>
    `;

    encontrados.forEach(produto => {

        resultado.innerHTML += `

            <div class="resultadoProduto">

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.ingredientes || ""}
                </p>

                <strong>
                    ${dinheiro(produto.preco)}
                </strong>

                ${
                    produto.origem === "pizza"

                    ?

                    `<button onclick="abrirPagina('pizzas')">
                        🍕 Montar pizza
                    </button>`

                    :

                    `<button onclick="adicionarProduto(
                        '${produto.nome}',
                        ${produto.preco},
                        '${produto.origem}',
                        ${produto.index}
                    )">
                        ➕ Adicionar
                    </button>`
                }

            </div>

        `;
    });
}


// ==========================================
// GOOGLE MAPS
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
            document.getElementById(
                "inicio"
            );

        if (inicio) {
            inicio.style.display = "block";
        }

        carregarDados();

        atualizarCarrinho();

        verificarFuncionamento();

        setInterval(
            verificarFuncionamento,
            60000
        );

        mostrarEndereco();

        mostrarTroco();

    }
);