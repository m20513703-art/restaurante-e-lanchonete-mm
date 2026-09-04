const WHATSAPP = "5519981123401";
const TAXA_ENTREGA = 5;

let carrinho = [];


/* =====================================================
   FUNÇÕES GERAIS
===================================================== */

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function obterPeriodoAtual() {

    const agora = new Date();

    const dia = agora.getDay();

    const horario =
        agora.getHours() * 60 +
        agora.getMinutes();


    let inicioAlmoco = 11 * 60;
    let fimAlmoco = 15 * 60;


    /* SÁBADO E DOMINGO */

    if (dia === 0 || dia === 6) {

        inicioAlmoco = 11 * 60 + 30;

        fimAlmoco = 15 * 60 + 30;
    }


    /* ALMOÇO */

    if (
        horario >= inicioAlmoco &&
        horario <= fimAlmoco
    ) {

        return "almoco";
    }


    /* NOITE - TERÇA A DOMINGO */

    if (
        dia >= 2 &&
        dia <= 6 &&
        horario >= 18 * 60 &&
        horario <= 22 * 60 + 30
    ) {

        return "noite";
    }


    return "fechado";
}


/* =====================================================
   CONTROLE DO CARDÁPIO POR HORÁRIO
===================================================== */

function atualizarCardapioPorHorario() {

    const periodo =
        obterPeriodoAtual();


    /*
       BOTÕES DAS CATEGORIAS
    */

    const botoesCategorias =
        document.querySelectorAll(
            "button[onclick]"
        );


    botoesCategorias.forEach(botao => {

        const acao =
            botao.getAttribute("onclick") || "";


        let categoria = null;


        if (acao.includes("'almoco'")) {
            categoria = "almoco";
        }

        if (acao.includes('"almoco"')) {
            categoria = "almoco";
        }


        if (acao.includes("'marmitas'")) {
            categoria = "marmitas";
        }

        if (acao.includes('"marmitas"')) {
            categoria = "marmitas";
        }


        if (acao.includes("'pizzas'")) {
            categoria = "noite";
        }

        if (acao.includes('"pizzas"')) {
            categoria = "noite";
        }


        if (acao.includes("'lanches'")) {
            categoria = "noite";
        }

        if (acao.includes('"lanches"')) {
            categoria = "noite";
        }


        if (acao.includes("'esfirras'")) {
            categoria = "noite";
        }

        if (acao.includes('"esfirras"')) {
            categoria = "noite";
        }


        if (acao.includes("'hotdogs'")) {
            categoria = "noite";
        }

        if (acao.includes('"hotdogs"')) {
            categoria = "noite";
        }


        if (acao.includes("'porcoes'")) {
            categoria = "noite";
        }

        if (acao.includes('"porcoes"')) {
            categoria = "noite";
        }


        if (acao.includes("'bebidas'")) {
            categoria = "noite";
        }

        if (acao.includes('"bebidas"')) {
            categoria = "noite";
        }


        if (!categoria) return;


        if (periodo === "almoco") {

            if (
                categoria === "almoco" ||
                categoria === "marmitas"
            ) {

                botao.style.display = "";

            } else {

                botao.style.display = "none";
            }

        }


        else if (periodo === "noite") {

            if (categoria === "noite") {

                botao.style.display = "";

            } else {

                botao.style.display = "none";
            }

        }


        else {

            botao.style.display = "none";
        }

    });


    /*
       SEÇÕES DO CARDÁPIO
    */

    const almoco =
        document.getElementById("almoco");

    const marmitas =
        document.getElementById("marmitas");

    const pizzasPagina =
        document.getElementById("pizzas");

    const lanchesPagina =
        document.getElementById("lanches");

    const esfirrasPagina =
        document.getElementById("esfirras");

    const hotdogsPagina =
        document.getElementById("hotdogs");

    const porcoesPagina =
        document.getElementById("porcoes");

    const bebidasPagina =
        document.getElementById("bebidas");


    if (periodo === "almoco") {

        if (almoco) {
            almoco.style.display = "";
        }

        if (marmitas) {
            marmitas.style.display = "";
        }

        if (pizzasPagina) {
            pizzasPagina.style.display = "none";
        }

        if (lanchesPagina) {
            lanchesPagina.style.display = "none";
        }

        if (esfirrasPagina) {
            esfirrasPagina.style.display = "none";
        }

        if (hotdogsPagina) {
            hotdogsPagina.style.display = "none";
        }

        if (porcoesPagina) {
            porcoesPagina.style.display = "none";
        }

        if (bebidasPagina) {
            bebidasPagina.style.display = "none";
        }

    }


    else if (periodo === "noite") {

        if (almoco) {
            almoco.style.display = "none";
        }

        if (marmitas) {
            marmitas.style.display = "none";
        }

        if (pizzasPagina) {
            pizzasPagina.style.display = "";
        }

        if (lanchesPagina) {
            lanchesPagina.style.display = "";
        }

        if (esfirrasPagina) {
            esfirrasPagina.style.display = "";
        }

        if (hotdogsPagina) {
            hotdogsPagina.style.display = "";
        }

        if (porcoesPagina) {
            porcoesPagina.style.display = "";
        }

        if (bebidasPagina) {
            bebidasPagina.style.display = "";
        }

    }


    else {

        if (almoco) {
            almoco.style.display = "none";
        }

        if (marmitas) {
            marmitas.style.display = "none";
        }

        if (pizzasPagina) {
            pizzasPagina.style.display = "none";
        }

        if (lanchesPagina) {
            lanchesPagina.style.display = "none";
        }

        if (esfirrasPagina) {
            esfirrasPagina.style.display = "none";
        }

        if (hotdogsPagina) {
            hotdogsPagina.style.display = "none";
        }

        if (porcoesPagina) {
            porcoesPagina.style.display = "none";
        }

        if (bebidasPagina) {
            bebidasPagina.style.display = "none";
        }

    }


    /*
       CARDÁPIO DO ALMOÇO NA PÁGINA INICIAL
    */

    const cardapioInicio =
        document.getElementById(
            "cardapioInicio"
        );


    if (cardapioInicio) {

        if (periodo === "almoco") {

            cardapioInicio.style.display =
                "";

        } else {

            cardapioInicio.style.display =
                "none";
        }
    }

}


/* =====================================================
   NAVEGAÇÃO
===================================================== */

function abrirPagina(id) {

    const periodo =
        obterPeriodoAtual();


    /*
       BLOQUEIA ACESSO A CARDÁPIOS
       FORA DO HORÁRIO
    */

    if (
        periodo === "almoco" &&
        (
            id === "pizzas" ||
            id === "lanches" ||
            id === "esfirras" ||
            id === "hotdogs" ||
            id === "porcoes" ||
            id === "bebidas"
        )
    ) {

        alert(
            "🍱 Estamos no horário do almoço. O cardápio da noite estará disponível a partir das 18:00."
        );

        return;
    }


    if (
        periodo === "noite" &&
        (
            id === "almoco" ||
            id === "marmitas"
        )
    ) {

        alert(
            "🌙 O almoço e as marmitas funcionam durante o dia."
        );

        return;
    }


    if (
        periodo === "fechado" &&
        (
            id === "almoco" ||
            id === "marmitas" ||
            id === "pizzas" ||
            id === "lanches" ||
            id === "esfirras" ||
            id === "hotdogs" ||
            id === "porcoes" ||
            id === "bebidas"
        )
    ) {

        alert(
            "🔴 Estamos fechados no momento. Consulte nossos horários na página inicial."
        );

        return;
    }


    document.querySelectorAll(".pagina").forEach(pagina => {
        pagina.classList.remove("ativa");
    });


    const pagina =
        document.getElementById(id);


    if (pagina) {

        pagina.classList.add("ativa");

    }


    window.scrollTo(0, 0);


    if (id === "pizzas") {
        iniciarPizza();
    }


    if (id === "esfirras") {
        iniciarEsfirra();
    }


    if (id === "marmitas") {
        criarMarmitas();
    }


    if (id === "almoco") {
        mostrarCardapioAlmoco();
    }


    if (id === "carrinho") {
        atualizarCarrinho();
    }

}


function voltarInicio() {
    abrirPagina("inicio");
}


function abrirCarrinho() {
    abrirPagina("carrinho");
}


/* =====================================================
   HORÁRIO DE FUNCIONAMENTO
===================================================== */

function verificarFuncionamento() {

    const agora = new Date();

    const dia = agora.getDay();

    const hora = agora.getHours();

    const minutos = agora.getMinutes();

    const tempoAtual =
        hora * 60 + minutos;

    let aberto = false;


    /* ALMOÇO */

    if (dia >= 1 && dia <= 5) {

        if (
            tempoAtual >= 660 &&
            tempoAtual <= 900
        ) {

            aberto = true;

        }

    }


    /* SÁBADO E DOMINGO */

    if (dia === 0 || dia === 6) {

        if (
            tempoAtual >= 690 &&
            tempoAtual <= 930
        ) {

            aberto = true;

        }

    }


    /* NOITE - TERÇA A DOMINGO */

    if (dia >= 2 && dia <= 6) {

        if (
            tempoAtual >= 1080 &&
            tempoAtual <= 1350
        ) {

            aberto = true;

        }

    }


    const status =
        document.getElementById(
            "statusFuncionamento"
        );


    if (!status) return;


    if (aberto) {

        status.innerHTML =
            "🟢 ESTAMOS ABERTOS";

        status.className =
            "status aberto";

    } else {

        status.innerHTML =
            "🔴 ESTAMOS FECHADOS";

        status.className =
            "status fechado";

    }

}


/* =====================================================
   CARDÁPIO DO ALMOÇO
===================================================== */

const buffetFrio = [

    "Alface crespa",
    "Alface americana",
    "Rúcula",
    "Agrião",
    "Tomate fatiado",
    "Cenoura ralada",
    "Beterraba",
    "Palmito",
    "Pepino",
    "Salada maionese caseira",
    "Salpicão de frango",
    "Tabule"

];


const cardapioSemana = {

    0: {

        dia: "Domingo",

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
            "Pudim de leite condensado",
            "Pavê de morango"
        ]

    },


    1: {

        dia: "Segunda-feira",

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
            "Pudim de leite condensado",
            "Frutas fatiadas: abacaxi e melancia"
        ]

    },


    2: {

        dia: "Terça-feira",

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
            "Penne ao molho quatro queijos",
            "Abóbora assada"
        ],

        sobremesas: [
            "Mousse de maracujá",
            "Gelatina colorida"
        ]

    },


    3: {

        dia: "Quarta-feira",

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
            "Couve refogada no alho",
            "Farofa de bacon",
            "Banana empanada"
        ],

        sobremesas: [
            "Mousse de chocolate",
            "Pudim de leite condensado"
        ]

    },


    4: {

        dia: "Quinta-feira",

        arroz: [
            "Arroz branco",
            "Arroz à grega"
        ],

        feijao: [
            "Feijão carioca temperado"
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
            "Pavê tradicional de morango",
            "Frutas fatiadas"
        ]

    },


    5: {

        dia: "Sexta-feira",

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
            "Pudim de leite condensado",
            "Mousse de limão"
        ]

    },


    6: {

        dia: "Sábado",

        arroz: [
            "Arroz branco",
            "Arroz com açafrão"
        ],

        feijao: [
            "Feijoada completa",
            "Feijão tropeiro"
        ],

        carnes: [
            "Picanha fatiada no réchaud",
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


/* =====================================================
   MOSTRAR CARDÁPIO DO DIA
===================================================== */

function montarLista(lista) {

    return lista
        .map(item => `<p>• ${item}</p>`)
        .join("");

}


function mostrarCardapioAlmoco() {

    const hoje = new Date();

    const dia = hoje.getDay();

    const cardapio =
        cardapioSemana[dia];

    if (!cardapio) return;


    const html = `

        <div class="resumo">

            <h2>
                🍱 Cardápio do Almoço
            </h2>

            <h3>
                📅 ${cardapio.dia}
            </h3>

            <p>
                <strong>
                    💰 Self-Service: R$ 35,50/kg
                </strong>
            </p>

            <hr>

            <h3>
                🥗 Buffet Frio
            </h3>

            ${montarLista(buffetFrio)}

            <hr>

            <h3>
                🍚 Arroz
            </h3>

            ${montarLista(cardapio.arroz)}

            <h3>
                🫘 Feijão
            </h3>

            ${montarLista(cardapio.feijao)}

            <h3>
                🥩 Carnes
            </h3>

            ${montarLista(cardapio.carnes)}

            <h3>
                🍽️ Acompanhamentos
            </h3>

            ${montarLista(cardapio.acompanhamentos)}

            <hr>

            <h3>
                🍨 Sobremesas
            </h3>

            ${montarLista(cardapio.sobremesas)}

            <hr>

            <p>
                🕒 Almoço presencial:
                11:00 às 15:00
            </p>

            <p>
                🕒 Sábado e domingo:
                até 15:30
            </p>

            <p>
                ⏰ Pedidos de Marmitex / Delivery:
                até 14:00
            </p>

            <p>
                🚚 Taxa de entrega:
                R$ 5,00
            </p>

        </div>

    `;


    const area =
        document.getElementById(
            "cardapioAlmoco"
        );


    if (area) {

        area.innerHTML = html;

    }


    const inicio =
        document.getElementById(
            "cardapioInicio"
        );


    if (inicio) {

        inicio.innerHTML = `

            <h3>
                🍱 Cardápio do Almoço
            </h3>

            <p>
                <strong>
                    ${cardapio.dia}
                </strong>
            </p>

            <p>
                💰 Self-Service:
                R$ 35,50/kg
            </p>

            <p>
                🥩 ${cardapio.carnes.join(" • ")}
            </p>

            <p>
                🍽️ ${cardapio.acompanhamentos.join(" • ")}
            </p>

            <p>
                🍨 ${cardapio.sobremesas.join(" • ")}
            </p>

            <p>
                Confira o cardápio completo
                no botão abaixo.
            </p>

        `;

    }

}


/* =====================================================
   PIZZAS
===================================================== */

const pizzas = [

    ["Atum", 52,
        "Molho de tomate, atum sólido e cebola fatiada."],

    ["Bacon", 50,
        "Molho de tomate, mussarela, bacon crocante e cebola."],

    ["Baiana", 52,
        "Molho de tomate, mussarela, calabresa moída, ovo, pimenta calabresa e cebola."],

    ["Calabresa", 48,
        "Molho de tomate, mussarela, calabresa fatiada e cebola."],

    ["Calabresa com Catupiry", 52,
        "Molho de tomate, mussarela, calabresa fatiada e requeijão cremoso."],

    ["Churrasco", 62,
        "Molho de tomate, mussarela, tiras de carne grelhada, alho frito e chimichurri."],

    ["Frango com Catupiry", 52,
        "Molho de tomate, mussarela, frango desfiado e requeijão cremoso."],

    ["Lombo com Catupiry", 54,
        "Molho de tomate, mussarela, lombo canadense e requeijão cremoso."],

    ["Marguerita", 48,
        "Molho de tomate, mussarela, tomate e manjericão fresco."],

    ["Milho com Bacon", 50,
        "Molho de tomate, mussarela, milho verde e bacon."],

    ["Moda da Casa", 65,
        "Molho de tomate, mussarela, contrafilé, presunto, calabresa, ovos, milho, catupiry, cebola e azeitonas."],

    ["Mussarela", 45,
        "Molho de tomate, mussarela, tomate e orégano."],

    ["Napolitana", 48,
        "Molho de tomate, mussarela, tomate, parmesão e alho frito."],

    ["Palmito", 54,
        "Molho de tomate, mussarela e palmito fatiado."],

    ["Portuguesa", 52,
        "Molho de tomate, mussarela, presunto, ovo, cebola, ervilha e azeitona."],

    ["Presunto e Queijo", 48,
        "Molho de tomate, mussarela, presunto e orégano."],

    ["Quatro Queijos", 55,
        "Molho de tomate, mussarela, provolone, parmesão e catupiry."],

    ["Strogonoff de Carne", 60,
        "Molho de tomate, mussarela, strogonoff de carne e batata palha."],

    ["Tilápia", 58,
        "Molho de tomate, mussarela, tilápia empanada e molho tártaro."],

    ["Vegetariana", 52,
        "Molho de tomate, mussarela, escarola, milho, ervilha, palmito e tomate."],

    ["Banana com Canela", 45,
        "Banana, açúcar, canela e cobertura doce."],

    ["Beijinho", 48,
        "Creme de coco, leite condensado e coco ralado."],

    ["Brigadeiro", 45,
        "Chocolate cremoso e granulado de chocolate."],

    ["Chocoloco", 50,
        "Chocolate cremoso e cobertura de chocolate."],

    ["Confeti", 48,
        "Chocolate cremoso e confeitos coloridos."],

    ["Doce de Leite", 45,
        "Doce de leite cremoso."],

    ["Paçoca", 48,
        "Creme doce e paçoca triturada."],

    ["Prestígio", 48,
        "Chocolate cremoso e coco ralado."],

    ["Romeu e Julieta", 45,
        "Queijo e goiabada."],

    ["Sensação", 52,
        "Chocolate cremoso e morango."]
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


const complementosPizza = [

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


let pizza = {

    tamanho: "",
    pedacos: 0,
    limite: 0,
    sabores: [],
    borda: ["Sem Borda", 0],
    complementos: []

};


function iniciarPizza() {

    pizza = {

        tamanho: "",
        pedacos: 0,
        limite: 0,
        sabores: [],
        borda: ["Sem Borda", 0],
        complementos: []

    };


    document
        .getElementById("pizzaTamanho")
        .classList.remove("escondido");

    document
        .getElementById("pizzaSabores")
        .classList.add("escondido");

    document
        .getElementById("pizzaBorda")
        .classList.add("escondido");

    document
        .getElementById("pizzaComplementos")
        .classList.add("escondido");

    document
        .getElementById("pizzaResumo")
        .classList.add("escondido");


    criarTamanhos();
}


function criarTamanhos() {

    const area =
        document.getElementById("listaTamanhos");

    area.innerHTML = "";


    const tamanhos = [

        ["Pequena", 4, 1],
        ["Média", 8, 2],
        ["Grande", 12, 3]

    ];


    tamanhos.forEach(item => {

        const botao =
            document.createElement("button");

        botao.className = "opcao";


        botao.innerHTML = `

            <strong>
                🍕 ${item[0]}
            </strong>

            <br>

            ${item[1]} pedaços

            <br>

            Até ${item[2]} sabor(es)

        `;


        botao.onclick = function() {

            pizza.tamanho = item[0];

            pizza.pedacos = item[1];

            pizza.limite = item[2];

            pizza.sabores = [];


            document
                .getElementById("pizzaTamanho")
                .classList.add("escondido");

            document
                .getElementById("pizzaSabores")
                .classList.remove("escondido");


            criarSabores();

        };


        area.appendChild(botao);

    });
}


function criarSabores() {

    const area =
        document.getElementById("listaSabores");

    area.innerHTML = "";


    document.getElementById(
        "limiteSabores"
    ).innerText =
        `Escolha até ${pizza.limite} sabor(es).`;


    pizzas.forEach(item => {

        const botao =
            document.createElement("button");

        botao.className = "opcao";


        botao.innerHTML = `

            <strong>
                ${item[0]}
            </strong>

            <p class="produto-descricao">
                ${item[2]}
            </p>

            <strong>
                ${dinheiro(item[1])}
            </strong>

        `;


        botao.onclick = function() {

            const existe =
                pizza.sabores.some(
                    sabor =>
                        sabor[0] === item[0]
                );


            if (existe) {

                pizza.sabores =
                    pizza.sabores.filter(
                        sabor =>
                            sabor[0] !== item[0]
                    );

            } else {

                if (
                    pizza.sabores.length >=
                    pizza.limite
                ) {

                    alert(
                        `Essa pizza permite no máximo ${pizza.limite} sabor(es).`
                    );

                    return;
                }


                pizza.sabores.push(item);
            }


            atualizarSabores();

        };


        area.appendChild(botao);

    });
}


function atualizarSabores() {

    const botoes =
        document.querySelectorAll(
            "#listaSabores .opcao"
        );


    botoes.forEach(botao => {

        const nome =
            botao.querySelector("strong").innerText;


        const selecionado =
            pizza.sabores.some(
                sabor =>
                    sabor[0] === nome
            );


        botao.classList.toggle(
            "selecionado",
            selecionado
        );

    });


    document.getElementById(
        "saboresEscolhidos"
    ).innerHTML =

        pizza.sabores.length

        ? `

            <div class="resumo">

                <strong>
                    Sabores escolhidos:
                </strong>

                ${pizza.sabores.map(s => `
                    <p>
                        🍕 ${s[0]}
                    </p>
                `).join("")}

            </div>

        `

        : "";
}


function irParaBordaPizza() {

    if (
        pizza.sabores.length === 0
    ) {

        alert(
            "Escolha pelo menos 1 sabor."
        );

        return;
    }


    document
        .getElementById("pizzaSabores")
        .classList.add("escondido");

    document
        .getElementById("pizzaBorda")
        .classList.remove("escondido");


    criarBordasPizza();
}


function criarBordasPizza() {

    const area =
        document.getElementById(
            "listaBordasPizza"
        );

    area.innerHTML = "";


    bordasPizza.forEach(item => {

        const botao =
            document.createElement("button");

        botao.className = "opcao";


        botao.innerHTML = `

            <strong>
                🧀 ${item[0]}
            </strong>

            <br>

            ${dinheiro(item[1])}

        `;


        botao.onclick = function() {

            pizza.borda = item;


            document
                .querySelectorAll(
                    "#listaBordasPizza .opcao"
                )
                .forEach(
                    b =>
                        b.classList.remove(
                            "selecionado"
                        )
                );


            botao.classList.add(
                "selecionado"
            );

        };


        area.appendChild(botao);

    });
}


function irParaComplementosPizza() {

    document
        .getElementById("pizzaBorda")
        .classList.add("escondido");

    document
        .getElementById("pizzaComplementos")
        .classList.remove("escondido");


    criarComplementosPizza();
}


function criarComplementosPizza() {

    const area =
        document.getElementById(
            "listaComplementosPizza"
        );

    area.innerHTML = "";


    complementosPizza.forEach(item => {

        const botao =
            document.createElement("button");

        botao.className = "opcao";


        botao.innerHTML = `

            <strong>
                ➕ ${item[0]}
            </strong>

            <br>

            ${dinheiro(item[1])}

        `;


        botao.onclick = function() {

            const existe =
                pizza.complementos.some(
                    c =>
                        c[0] === item[0]
                );


            if (existe) {

                pizza.complementos =
                    pizza.complementos.filter(
                        c =>
                            c[0] !== item[0]
                    );

                botao.classList.remove(
                    "selecionado"
                );

            } else {

                pizza.complementos.push(item);

                botao.classList.add(
                    "selecionado"
                );

            }

        };


        area.appendChild(botao);

    });
}


function calcularPizza() {

    if (
        pizza.sabores.length === 0
    ) {
        return 0;
    }


    let maior =
        Math.max(
            ...pizza.sabores.map(
                s => s[1]
            )
        );


    let total = maior;


    total += pizza.borda[1];


    pizza.complementos.forEach(
        item => {
            total += item[1];
        }
    );


    return total;
}


function mostrarResumoPizza() {

    const total =
        calcularPizza();


    document.getElementById(
        "resumoPizza"
    ).innerHTML = `

        <p>
            <strong>Tamanho:</strong>
            ${pizza.tamanho}
        </p>

        <p>
            <strong>Pedaços:</strong>
            ${pizza.pedacos}
        </p>

        <p>
            <strong>Sabores:</strong>
        </p>

        ${pizza.sabores.map(s => `

            <p>
                🍕 ${s[0]}
            </p>

            <p class="produto-descricao">
                ${s[2]}
            </p>

        `).join("")}


        <p>
            <strong>Borda:</strong>
            ${pizza.borda[0]}
            -
            ${dinheiro(pizza.borda[1])}
        </p>


        <p>
            <strong>Complementos:</strong>
        </p>


        ${
            pizza.complementos.length

            ? pizza.complementos.map(c => `
                <p>
                    ➕ ${c[0]} -
                    ${dinheiro(c[1])}
                </p>
            `).join("")

            : "<p>Nenhum</p>"
        }


        <hr>


        <h3>
            Total:
            ${dinheiro(total)}
        </h3>

    `;


    document
        .getElementById("pizzaComplementos")
        .classList.add("escondido");


    document
        .getElementById("pizzaResumo")
        .classList.remove("escondido");
}


function adicionarPizzaCarrinho() {

    const total =
        calcularPizza();


    const sabores =
        pizza.sabores
            .map(s => s[0])
            .join(" + ");


    let detalhes =

        `Tamanho: ${pizza.tamanho}<br>
         ${pizza.pedacos} pedaços<br>
         Sabores: ${sabores}<br>
         Borda: ${pizza.borda[0]}`;


    if (
        pizza.complementos.length
    ) {

        detalhes +=
            `<br>Complementos: ${
                pizza.complementos
                    .map(c => c[0])
                    .join(", ")
            }`;
    }


    carrinho.push({

        nome:
            `Pizza ${pizza.tamanho}`,

        detalhes:
            detalhes,

        preco:
            total,

        quantidade:
            1

    });


    atualizarCarrinho();


    alert(
        "🍕 Pizza adicionada ao carrinho!"
    );


    abrirPagina("cardapio");
}


/* =====================================================
   PRODUTOS
===================================================== */

const lanches = [

    ["X-Burguer", 20,
        "Pão de brioche, hambúrguer e queijo."],

    ["X-Salada", 22,
        "Pão de brioche, hambúrguer, queijo, alface, tomate e molho."],

    ["X-Bacon", 26,
        "Pão de brioche, hambúrguer, queijo, bacon e molho."],

    ["X-Egg", 24,
        "Pão de brioche, hambúrguer, queijo, ovo e molho."],

    ["X-Frango", 22,
        "Pão de brioche, frango desfiado, queijo e molho."],

    ["X-Tudo", 32,
        "Pão de brioche, hambúrguer, queijo, presunto, bacon, ovo, alface, tomate e molho."],

    ["X-Calabresa", 23,
        "Pão de brioche, calabresa, queijo, cebola e molho."],

    ["X-Duplo Cheddar", 34,
        "Pão de brioche, dois hambúrgueres, cheddar e molho."],

    ["X-Contrafilé", 30,
        "Pão de brioche, contrafilé, queijo, cebola e molho."],

    ["X-Vegetariano", 25,
        "Pão de brioche, queijo, alface, tomate, milho, ervilha e molho."]
];


const hotdogs = [

    ["Dog Simples", 14,
        "Pão de hot dog, salsicha, molho e batata palha."],

    ["Dog Duplo", 18,
        "Pão de hot dog, duas salsichas, molho e batata palha."],

    ["Dog Frango", 20,
        "Pão de hot dog, salsicha, frango desfiado, molho e batata palha."],

    ["Dog Bacon", 22,
        "Pão de hot dog, salsicha, bacon, molho e batata palha."],

    ["Dog Tudo", 26,
        "Pão de hot dog, salsicha, frango, bacon, queijo, molho e batata palha."]
];


const porcoes = [

    ["Batata Frita Tradicional - 500g", 28,
        "Batata frita crocante, 500g."],

    ["Batata Frita com Cheddar e Bacon - 600g", 38,
        "Batata frita, cheddar cremoso e bacon crocante, 600g."],

    ["Calabresa Acebolada - 500g", 35,
        "Calabresa fatiada acebolada, 500g."],

    ["Frango a Passarinho - 700g", 42,
        "Pedaços de frango temperados e fritos, 700g."],

    ["Isca de Tilápia - 500g", 48,
        "Iscas de filé de tilápia empanadas, 500g."],

    ["Contrafilé Acebolado na Chapa - 500g", 55,
        "Tiras de contrafilé aceboladas preparadas na chapa, 500g."]
];


const bebidas = [

    ["Coca-Cola Lata 350ml", 6.5,
        "Refrigerante Coca-Cola, lata de 350ml."],

    ["Coca-Cola Zero Lata 350ml", 6.5,
        "Refrigerante Coca-Cola Zero, lata de 350ml."],

    ["Guaraná Lata 350ml", 6.5,
        "Refrigerante sabor guaraná, lata de 350ml."],

    ["Fanta Lata 350ml", 6.5,
        "Refrigerante Fanta, lata de 350ml."],

    ["Sprite Lata 350ml", 6.5,
        "Refrigerante Sprite, lata de 350ml."],

    ["Coca-Cola 2L", 14,
        "Refrigerante Coca-Cola, garrafa de 2 litros."],

    ["Guaraná Antarctica 2L", 14,
        "Refrigerante Guaraná Antarctica, garrafa de 2 litros."],

    ["Fanta 2L", 14,
        "Refrigerante Fanta, garrafa de 2 litros."],

    ["Água sem gás 500ml", 4,
        "Água mineral sem gás, 500ml."],

    ["Água com gás 500ml", 4.5,
        "Água mineral com gás, 500ml."]
];


/* =====================================================
   MARMITAS AUTOMÁTICAS
===================================================== */

const marmitas = [

    ["Marmita Pequena", 20, 1],

    ["Marmita Média", 25, 2],

    ["Marmita Grande", 28, 3],

    ["Marmita Comercial", 50, 4]

];


let marmitaSelecionada = {

    nome: "",

    preco: 0,

    limite: 0,

    misturas: []

};


function obterCarnesDoDia() {

    const dia =
        new Date().getDay();

    return cardapioSemana[dia].carnes;

}


function criarMarmitas() {

    const area =
        document.getElementById(
            "listaMarmitas"
        );

    if (!area) return;


    const cardapio =
        cardapioSemana[
            new Date().getDay()
        ];


    const titulo =
        document.getElementById(
            "tituloMarmitaDia"
        );


    if (titulo) {

        titulo.innerHTML = `

            <div class="resumo">

                <h3>
                    🍱 Marmitas de hoje
                </h3>

                <p>
                    📅 ${cardapio.dia}
                </p>

                <p>
                    Escolha sua marmita
                    e selecione as misturas
                    disponíveis hoje.
                </p>

            </div>

        `;
    }


    area.innerHTML = "";


    marmitas.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "produto";


        div.innerHTML = `

            <h3>
                ${item[0]}
            </h3>

            <p class="produto-descricao">

                Escolha até
                ${item[2]}
                mistura(s) do dia.

            </p>

            <div class="preco">
                ${dinheiro(item[1])}
            </div>

            <button>
                🥩 Escolher mistura
            </button>

        `;


        div.querySelector(
            "button"
        ).onclick = function() {

            abrirMontagemMarmita(item);

        };


        area.appendChild(div);

    });

}


function abrirMontagemMarmita(item) {

    marmitaSelecionada = {

        nome: item[0],

        preco: item[1],

        limite: item[2],

        misturas: []

    };


    const cardapio =
        cardapioSemana[
            new Date().getDay()
        ];


    document.getElementById(
        "infoMarmita"
    ).innerHTML = `

        <p>
            <strong>
                ${item[0]}
            </strong>
        </p>

        <p>
            Valor:
            ${dinheiro(item[1])}
        </p>

        <p>
            📅 ${cardapio.dia}
        </p>

        <p>
            Escolha até
            <strong>
                ${item[2]} mistura(s)
            </strong>
            disponíveis hoje.
        </p>

    `;


    document.getElementById(
        "limiteMisturas"
    ).innerText =

        `Você pode escolher até ${item[2]} mistura(s).`;


    criarMisturas();


    abrirPagina("montarMarmita");
}


function criarMisturas() {

    const area =
        document.getElementById(
            "listaMisturas"
        );

    area.innerHTML = "";


    const carnes =
        obterCarnesDoDia();


    carnes.forEach(nome => {

        const botao =
            document.createElement("button");


        botao.className =
            "opcao";


        botao.innerHTML = `

            <strong>
                🥩 ${nome}
            </strong>

        `;


        botao.onclick = function() {

            const existe =
                marmitaSelecionada.misturas
                    .includes(nome);


            if (existe) {

                marmitaSelecionada.misturas =
                    marmitaSelecionada.misturas
                        .filter(
                            item =>
                                item !== nome
                        );


                botao.classList.remove(
                    "selecionado"
                );


                atualizarMisturas();

                return;
            }


            if (
                marmitaSelecionada.misturas
                    .length >=
                marmitaSelecionada.limite
            ) {

                alert(
                    `Essa marmita permite no máximo ${marmitaSelecionada.limite} mistura(s).`
                );

                return;
            }


            marmitaSelecionada.misturas.push(
                nome
            );


            botao.classList.add(
                "selecionado"
            );


            atualizarMisturas();

        };


        area.appendChild(botao);

    });


    atualizarMisturas();
}


function atualizarMisturas() {

    const area =
        document.getElementById(
            "misturasEscolhidas"
        );


    if (
        marmitaSelecionada.misturas
            .length === 0
    ) {

        area.innerHTML = "";

        return;
    }


    area.innerHTML = `

        <div class="resumo">

            <strong>
                🥩 Misturas escolhidas:
            </strong>

            ${marmitaSelecionada.misturas
                .map(nome => `
                    <p>
                        ✓ ${nome}
                    </p>
                `)
                .join("")}

        </div>

    `;
}


function adicionarMarmitaCarrinho() {

    if (
        marmitaSelecionada.misturas
            .length === 0
    ) {

        alert(
            "Escolha pelo menos 1 mistura para a marmita."
        );

        return;
    }


    const detalhes =

        `Misturas: ${
            marmitaSelecionada.misturas
                .join(", ")
        }`;


    carrinho.push({

        nome:
            marmitaSelecionada.nome,

        detalhes:
            detalhes,

        preco:
            marmitaSelecionada.preco,

        quantidade:
            1

    });


    atualizarCarrinho();


    alert(
        "🍱 Marmita adicionada ao carrinho!"
    );


    abrirPagina("cardapio");
}


/* =====================================================
   ESFIRRAS
===================================================== */

const esfirras = [

    ["Carne", 8,
        "Massa artesanal e carne moída temperada."],

    ["Frango", 8.5,
        "Massa artesanal e frango desfiado temperado."],

    ["Queijo", 9,
        "Massa artesanal e queijo."],

    ["Calabresa", 9,
        "Massa artesanal, calabresa e temperos."],

    ["Presunto e Queijo", 9.5,
        "Massa artesanal, presunto e queijo."],

    ["Frango com Catupiry", 10,
        "Massa artesanal, frango desfiado e requeijão cremoso."],

    ["Carne com Queijo", 10,
        "Massa artesanal, carne moída temperada e queijo."],

    ["Bacon com Queijo", 11,
        "Massa artesanal, bacon e queijo."],

    ["Quatro Queijos", 11.5,
        "Massa artesanal, mussarela, provolone, parmesão e requeijão."],

    ["Especial da Casa", 12,
        "Massa artesanal com recheio especial da casa."]

];


const bordasEsfirra = [

    ["Sem Borda", 0],

    ["Catupiry", 5],

    ["Cheddar", 5],

    ["Mussarela", 5],

    ["Provolone", 6],

    ["Requeijão com Alho Frito", 6]

];


const complementosEsfirra = [

    ["Bacon Extra", 5],

    ["Catupiry Extra", 5],

    ["Cheddar Extra", 5],

    ["Mussarela Extra", 5],

    ["Calabresa Extra", 5],

    ["Cebola Crispy", 4],

    ["Ovo", 3],

    ["Parmesão", 4],

    ["Pimenta", 2]

];


let esfirra = {

    produto: null,

    borda: ["Sem Borda", 0],

    complementos: []

};


function iniciarEsfirra() {

    esfirra = {

        produto: null,

        borda: ["Sem Borda", 0],

        complementos: []

    };


    document
        .getElementById("esfirraEscolha")
        .classList.remove("escondido");


    document
        .getElementById("esfirraBorda")
        .classList.add("escondido");


    document
        .getElementById("esfirraComplementos")
        .classList.add("escondido");


    document
        .getElementById("esfirraResumo")
        .classList.add("escondido");


    criarEsfirras();
}


function criarEsfirras() {

    const area =
        document.getElementById(
            "listaEsfirras"
        );


    area.innerHTML = "";


    esfirras.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "produto";


        div.innerHTML = `

            <h3>
                ${item[0]}
            </h3>

            <p class="produto-descricao">
                ${item[2]}
            </p>

            <div class="preco">
                ${dinheiro(item[1])}
            </div>

            <button>
                🥟 Escolher
            </button>

        `;


        div.querySelector(
            "button"
        ).onclick = function() {

            selecionarEsfirra(item);

        };


        area.appendChild(div);

    });
}


function selecionarEsfirra(item) {

    esfirra.produto = item;

    esfirra.borda =
        ["Sem Borda", 0];

    esfirra.complementos = [];


    document
        .getElementById("esfirraEscolha")
        .classList.add("escondido");


    document
        .getElementById("esfirraBorda")
        .classList.remove("escondido");


    criarBordasEsfirra();
}


function criarBordasEsfirra() {

    const area =
        document.getElementById(
            "listaBordasEsfirra"
        );


    area.innerHTML = "";


    bordasEsfirra.forEach(item => {

        const botao =
            document.createElement("button");


        botao.className =
            "opcao";


        botao.innerHTML = `

            <strong>
                🧀 ${item[0]}
            </strong>

            <br>

            ${dinheiro(item[1])}

        `;


        botao.onclick = function() {

            esfirra.borda = item;


            document
                .querySelectorAll(
                    "#listaBordasEsfirra .opcao"
                )
                .forEach(
                    b =>
                        b.classList.remove(
                            "selecionado"
                        )
                );


            botao.classList.add(
                "selecionado"
            );

        };


        area.appendChild(botao);

    });
}


function irParaComplementosEsfirra() {

    document
        .getElementById("esfirraBorda")
        .classList.add("escondido");


    document
        .getElementById("esfirraComplementos")
        .classList.remove("escondido");


    criarComplementosEsfirra();
}


function criarComplementosEsfirra() {

    const area =
        document.getElementById(
            "listaComplementosEsfirra"
        );


    area.innerHTML = "";


    complementosEsfirra.forEach(item => {

        const botao =
            document.createElement("button");


        botao.className =
            "opcao";


        botao.innerHTML = `

            <strong>
                ➕ ${item[0]}
            </strong>

            <br>

            ${dinheiro(item[1])}

        `;


        botao.onclick = function() {

            const existe =
                esfirra.complementos.some(
                    c =>
                        c[0] === item[0]
                );


            if (existe) {

                esfirra.complementos =
                    esfirra.complementos.filter(
                        c =>
                            c[0] !== item[0]
                    );


                botao.classList.remove(
                    "selecionado"
                );

            } else {

                esfirra.complementos.push(item);


                botao.classList.add(
                    "selecionado"
                );

            }

        };


        area.appendChild(botao);

    });
}


function calcularEsfirra() {

    if (!esfirra.produto) {
        return 0;
    }


    let total =
        esfirra.produto[1];


    total +=
        esfirra.borda[1];


    esfirra.complementos.forEach(
        item => {

            total += item[1];

        }
    );


    return total;
}


function mostrarResumoEsfirra() {

    if (!esfirra.produto) {

        alert(
            "Escolha uma esfirra."
        );

        return;
    }


    const total =
        calcularEsfirra();


    document.getElementById(
        "resumoEsfirra"
    ).innerHTML = `

        <p>
            <strong>
                Esfirra:
            </strong>

            ${esfirra.produto[0]}
        </p>


        <p class="produto-descricao">
            ${esfirra.produto[2]}
        </p>


        <p>
            <strong>
                Borda:
            </strong>

            ${esfirra.borda[0]}

            -

            ${dinheiro(esfirra.borda[1])}
        </p>


        <p>
            <strong>
                Complementos:
            </strong>
        </p>


        ${
            esfirra.complementos.length

            ? esfirra.complementos.map(c => `

                <p>
                    ➕ ${c[0]} -
                    ${dinheiro(c[1])}
                </p>

            `).join("")

            : "<p>Nenhum</p>"
        }


        <hr>


        <h3>
            Total:
            ${dinheiro(total)}
        </h3>

    `;


    document
        .getElementById("esfirraComplementos")
        .classList.add("escondido");


    document
        .getElementById("esfirraResumo")
        .classList.remove("escondido");
}


function adicionarEsfirraCarrinho() {

    const total =
        calcularEsfirra();


    let detalhes =

        `Borda: ${esfirra.borda[0]}`;


    if (
        esfirra.complementos.length
    ) {

        detalhes +=

            `<br>Complementos: ${
                esfirra.complementos
                    .map(c => c[0])
                    .join(", ")
            }`;
    }


    carrinho.push({

        nome:
            `Esfirra ${esfirra.produto[0]}`,

        detalhes:
            detalhes,

        preco:
            total,

        quantidade:
            1

    });


    atualizarCarrinho();


    alert(
        "🥟 Esfirra adicionada ao carrinho!"
    );


    abrirPagina("cardapio");
}


/* =====================================================
   PRODUTOS NORMAIS
===================================================== */

function criarProdutos(lista, id) {

    const area =
        document.getElementById(id);


    if (!area) return;


    area.innerHTML = "";


    lista.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "produto";


        div.innerHTML = `

            <h3>
                ${item[0]}
            </h3>

            <p class="produto-descricao">
                ${item[2]}
            </p>

            <div class="preco">
                ${dinheiro(item[1])}
            </div>

            <button>
                ➕ Adicionar
            </button>

        `;


        div.querySelector(
            "button"
        ).onclick = function() {

            adicionarProduto(
                item[0],
                item[1],
                item[2]
            );

        };


        area.appendChild(div);

    });
}


function adicionarProduto(
    nome,
    preco,
    descricao
) {

    const existente =
        carrinho.find(
            item =>
                item.nome === nome
        );


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            detalhes: descricao,

            preco: preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();


    alert(
        `${nome} adicionado ao carrinho!`
    );
}


/* =====================================================
   CARRINHO
===================================================== */

function atualizarCarrinho() {

    const contador =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    const contadorElemento =
        document.getElementById(
            "contadorCarrinho"
        );


    if (contadorElemento) {

        contadorElemento.innerText =
            contador;

    }


    const area =
        document.getElementById(
            "listaCarrinho"
        );


    if (!area) return;


    if (
        carrinho.length === 0
    ) {

        area.innerHTML = `

            <div class="resumo">

                🛒 Seu carrinho está vazio.

            </div>

        `;


        document.getElementById(
            "totalCarrinho"
        ).innerHTML = "";


        return;
    }


    area.innerHTML = "";


    carrinho.forEach(
        (item, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "item-carrinho";


            div.innerHTML = `

                <h3>
                    ${item.nome}
                </h3>

                ${
                    item.detalhes
                    ? `
                        <p>
                            ${item.detalhes}
                        </p>
                    `
                    : ""
                }


                <p>
                    ${dinheiro(item.preco)}
                    cada
                </p>


                <div class="controles">

                    <button
                        onclick="diminuir(${index})">

                        −

                    </button>


                    <strong>
                        ${item.quantidade}
                    </strong>


                    <button
                        onclick="aumentar(${index})">

                        +

                    </button>


                    <button
                        onclick="remover(${index})">

                        🗑️

                    </button>

                </div>

            `;


            area.appendChild(div);

        }
    );


    atualizarTotal();
}


function aumentar(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


function diminuir(index) {

    if (
        carrinho[index].quantidade > 1
    ) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();
}


function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


function subtotal() {

    return carrinho.reduce(
        (total, item) =>
            total +
            item.preco *
            item.quantidade,
        0
    );
}


function atualizarTotal() {

    const area =
        document.getElementById(
            "totalCarrinho"
        );


    if (!area) return;


    area.innerText =

        `Subtotal: ${dinheiro(
            subtotal()
        )}`;
}


/* =====================================================
   CHECKOUT
===================================================== */

function abrirCheckout() {

    if (
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }


    mostrarEndereco();

    atualizarResumoCheckout();

    abrirPagina("checkout");
}


function mostrarEndereco() {

    const recebimento =
        document.getElementById(
            "recebimento"
        );


    const area =
        document.getElementById(
            "enderecoArea"
        );


    if (!recebimento || !area) {
        return;
    }


    if (
        recebimento.value === "entrega"
    ) {

        area.style.display =
            "block";

    } else {

        area.style.display =
            "none";
    }


    atualizarResumoCheckout();
}


function atualizarResumoCheckout() {

    const area =
        document.getElementById(
            "resumoCheckout"
        );


    if (!area) return;


    const sub =
        subtotal();


    const recebimento =
        document.getElementById(
            "recebimento"
        );


    const entrega =
        recebimento &&
        recebimento.value === "entrega"
            ? TAXA_ENTREGA
            : 0;


    const total =
        sub + entrega;


    area.innerHTML = `

        <p>
            <strong>
                Subtotal:
            </strong>

            ${dinheiro(sub)}
        </p>


        <p>
            <strong>
                Entrega:
            </strong>

            ${dinheiro(entrega)}
        </p>


        <h3>
            Total:
            ${dinheiro(total)}
        </h3>

    `;
}


/* =====================================================
   WHATSAPP
===================================================== */

function gerarNumeroPedido() {

    const agora =
        new Date();


    return (

        agora.getHours()
            .toString()
            .padStart(2, "0") +

        agora.getMinutes()
            .toString()
            .padStart(2, "0") +

        agora.getSeconds()
            .toString()
            .padStart(2, "0")

    );
}


function enviarWhatsApp() {

    const nome =
        document.getElementById(
            "nome"
        ).value.trim();


    const telefone =
        document.getElementById(
            "telefone"
        ).value.trim();


    const recebimento =
        document.getElementById(
            "recebimento"
        ).value;


    const endereco =
        document.getElementById(
            "endereco"
        ).value.trim();


    const pagamento =
        document.getElementById(
            "pagamento"
        ).value;


    const observacao =
        document.getElementById(
            "observacao"
        ).value.trim();


    if (!nome) {

        alert(
            "Digite seu nome."
        );

        return;
    }


    if (
        recebimento === "entrega" &&
        !endereco
    ) {

        alert(
            "Digite o endereço."
        );

        return;
    }


    const numero =
        gerarNumeroPedido();


    const sub =
        subtotal();


    const taxa =
        recebimento === "entrega"
            ? TAXA_ENTREGA
            : 0;


    const total =
        sub + taxa;


    let mensagem =

        "*🍔 RESTAURANTE LANCHONETE MM*%0A%0A";


    mensagem +=

        "*PEDIDO Nº:* " +
        numero +
        "%0A";


    mensagem +=

        "*Cliente:* " +
        nome +
        "%0A";


    if (telefone) {

        mensagem +=

            "*Telefone:* " +
            telefone +
            "%0A";
    }


    mensagem +=

        "%0A*🛒 PEDIDO:*%0A";


    carrinho.forEach(item => {

        mensagem +=

            "%0A• " +
            item.nome +
            " x" +
            item.quantidade +
            " - " +
            dinheiro(
                item.preco *
                item.quantidade
            );


        if (item.detalhes) {

            let detalhes =
                item.detalhes
                    .replace(
                        /<br>/g,
                        " | "
                    )
                    .replace(
                        /<[^>]*>/g,
                        ""
                    );


            mensagem +=

                "%0A  " +
                detalhes;
        }

    });


    mensagem +=

        "%0A%0A*Subtotal:* " +
        dinheiro(sub);


    mensagem +=

        "%0A*Entrega:* " +
        dinheiro(taxa);


    mensagem +=

        "%0A*TOTAL:* " +
        dinheiro(total);


    mensagem +=

        "%0A%0A*Recebimento:* " +

        (
            recebimento === "entrega"
                ? "Entrega"
                : "Retirada no balcão"
        );


    if (
        recebimento === "entrega"
    ) {

        mensagem +=

            "%0A*Endereço:* " +
            endereco;
    }


    mensagem +=

        "%0A*Pagamento:* " +
        pagamento;


    if (observacao) {

        mensagem +=

            "%0A*Observação:* " +
            observacao;
    }


    mensagem +=

        "%0A%0A🧡 Obrigado!";


    const url =

        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        mensagem;


    window.open(
        url,
        "_blank"
    );


    document.getElementById(
        "numeroPedido"
    ).innerText = numero;


    carrinho = [];


    atualizarCarrinho();


    abrirPagina(
        "sucesso"
    );
}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        criarProdutos(
            lanches,
            "listaLanches"
        );


        criarProdutos(
            hotdogs,
            "listaHotdogs"
        );


        criarProdutos(
            porcoes,
            "listaPorcoes"
        );


        criarProdutos(
            bebidas,
            "listaBebidas"
        );


        criarMarmitas();


        mostrarCardapioAlmoco();


        atualizarCarrinho();


        verificarFuncionamento();


        atualizarCardapioPorHorario();


        setInterval(
            verificarFuncionamento,
            60000
        );


        setInterval(
            mostrarCardapioAlmoco,
            60000
        );


        setInterval(
            atualizarCardapioPorHorario,
            60000
        );

    }
);

/* =====================================================
   BLOQUEIO DE PEDIDOS FORA DO HORÁRIO
===================================================== */

function pedidoEstaLiberado() {

    const agora = new Date();

    const dia = agora.getDay();

    const horario =
        agora.getHours() * 60 +
        agora.getMinutes();

    /* ALMOÇO */

    let inicioAlmoco = 660; // 11:00
    let fimAlmoco = 900;    // 15:00

    /* SÁBADO E DOMINGO */

    if (dia === 0 || dia === 6) {

        inicioAlmoco = 690; // 11:30
        fimAlmoco = 930;    // 15:30

    }

    /* TERÇA A DOMINGO À NOITE */

    const inicioNoite = 1080; // 18:00
    const fimNoite = 1350;    // 22:30


    /* ALMOÇO */

    if (
        horario >= inicioAlmoco &&
        horario <= fimAlmoco
    ) {

        return true;

    }


    /* NOITE */

    if (
        dia >= 2 &&
        dia <= 6 &&
        horario >= inicioNoite &&
        horario <= fimNoite
    ) {

        return true;

    }


    return false;

}


/* =====================================================
   AVISO DE LOJA FECHADA
===================================================== */

function verificarPedidoLiberado() {

    if (pedidoEstaLiberado()) {

        return true;

    }


    alert(
        "🔴 Estamos fechados no momento.\n\n" +
        "Os pedidos estão disponíveis somente durante nosso horário de funcionamento."
    );


    return false;

    /* =====================================================
   BLOQUEAR CHECKOUT FORA DO HORÁRIO
===================================================== */

const abrirCheckoutOriginal = abrirCheckout;

abrirCheckout = function() {

    if (!verificarPedidoLiberado()) {
        return;
    }

    abrirCheckoutOriginal();

};


/* =====================================================
   BLOQUEAR WHATSAPP FORA DO HORÁRIO
===================================================== */

const enviarWhatsAppOriginal = enviarWhatsApp;

enviarWhatsApp = function() {

    if (!verificarPedidoLiberado()) {
        return;
    }

    enviarWhatsAppOriginal();

};


/* =====================================================
   VERIFICAÇÃO AUTOMÁTICA
===================================================== */

setInterval(
    verificarFuncionamento,
    60000
);