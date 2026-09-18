// ======================================================
// RESTAURANTE MM - JAVASCRIPT
// ======================================================

const WHATSAPP = "5519981123401";
const PRAZO_ENTREGA = "60 a 80 minutos";

let carrinho = JSON.parse(localStorage.getItem("mmCarrinho")) || [];
let historico = JSON.parse(localStorage.getItem("mmHistorico")) || [];


// ======================================================
// UTILIDADES
// ======================================================

function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarCarrinho() {
    localStorage.setItem("mmCarrinho", JSON.stringify(carrinho));
}

function salvarHistorico() {
    localStorage.setItem("mmHistorico", JSON.stringify(historico));
}

function horaAtual() {
    const agora = new Date();
    return agora.getHours() + (agora.getMinutes() / 60);
}

function restauranteAberto() {
    const hora = horaAtual();

    return (
        (hora >= 11 && hora < 15) ||
        (hora >= 19 && hora < 23)
    );
}

function estaNoAlmoco() {
    const hora = horaAtual();
    return hora >= 11 && hora < 15;
}

function estaNoJantar() {
    const hora = horaAtual();
    return hora >= 19 && hora < 23;
}


// ======================================================
// NAVEGAÇÃO
// ======================================================

function mostrarSecao(id) {

    document.querySelectorAll(".secao").forEach(secao => {
        secao.classList.remove("ativa");
    });

    const secao = document.getElementById(id);

    if (!secao) return;

    secao.classList.add("ativa");

    document.querySelectorAll("[data-secao]").forEach(botao => {
        botao.classList.remove("ativo");
    });

    document.querySelectorAll(`[data-secao="${id}"]`).forEach(botao => {
        botao.classList.add("ativo");
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "almoco") mostrarAlmoco();
    if (id === "marmitas") mostrarMarmitas();
    if (id === "jantar") mostrarJantar();
    if (id === "alacarte") mostrarAlacarte();
    if (id === "bebidas") mostrarBebidas();
    if (id === "carrinho") atualizarCarrinho();
    if (id === "historico") mostrarHistorico();
}


// ======================================================
// CLIQUES DO MENU
// ======================================================

document.addEventListener("click", function(event) {

    const botao = event.target.closest("[data-secao]");

    if (!botao) return;

    const secao = botao.dataset.secao;

    if (
        secao === "inicio" ||
        secao === "carrinho" ||
        secao === "historico" ||
        secao === "localizacao"
    ) {
        mostrarSecao(secao);
        return;
    }

    if (secao === "almoco") {

        if (!estaNoAlmoco()) {
            alert("O almoço funciona das 11h às 15h.");
            return;
        }

        mostrarSecao("almoco");
        return;
    }

    if (secao === "marmitas") {

        if (!estaNoAlmoco()) {
            alert("As marmitas funcionam das 11h às 15h.");
            return;
        }

        mostrarSecao("marmitas");
        return;
    }

    if (secao === "jantar") {

        if (!estaNoJantar()) {
            alert("O jantar funciona das 19h às 23h.");
            return;
        }

        mostrarSecao("jantar");
        return;
    }

    if (secao === "alacarte") {

        if (!estaNoJantar()) {
            alert("O À La Carte funciona somente das 19h às 23h.");
            return;
        }

        mostrarSecao("alacarte");
        return;
    }

    if (secao === "bebidas") {

        if (!restauranteAberto()) {
            alert("O restaurante está fechado no momento.");
            return;
        }

        mostrarSecao("bebidas");
    }

});


// ======================================================
// CARDÁPIO DO ALMOÇO
// ======================================================

const cardapioAlmoco = {

    segunda: {
        pratos: [
            "Frango assado",
            "Bife acebolado",
            "Linguiça acebolada",
            "Carne de panela"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão carioca",
            "Macarrão ao molho",
            "Batata frita",
            "Legumes refogados"
        ],
        saladas: [
            "Alface e tomate",
            "Vinagrete"
        ],
        sobremesas: [
            "Pudim de leite",
            "Mousse de chocolate"
        ]
    },

    terca: {
        pratos: [
            "Frango grelhado",
            "Carne de panela",
            "Linguiça assada",
            "Frango ao molho"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão alho e óleo",
            "Purê de batata",
            "Legumes cozidos"
        ],
        saladas: [
            "Salada de tomate",
            "Salada verde"
        ],
        sobremesas: [
            "Mousse de morango",
            "Banana caramelizada"
        ]
    },

    quarta: {
        pratos: [
            "Frango à parmegiana",
            "Bife acebolado",
            "Carne moída",
            "Linguiça assada"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão ao molho",
            "Batata frita",
            "Purê de batata"
        ],
        saladas: [
            "Salada verde",
            "Cenoura e beterraba"
        ],
        sobremesas: [
            "Bolo de chocolate",
            "Manjar de coco"
        ]
    },

    quinta: {
        pratos: [
            "Frango assado",
            "Bife grelhado",
            "Carne de panela",
            "Linguiça acebolada"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão",
            "Batata rústica",
            "Legumes refogados"
        ],
        saladas: [
            "Salada verde",
            "Vinagrete"
        ],
        sobremesas: [
            "Abacaxi com hortelã",
            "Pudim de leite"
        ]
    },

    sexta: {
        pratos: [
            "Frango empanado",
            "Bife acebolado",
            "Carne ao molho",
            "Frango grelhado"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão",
            "Batata frita",
            "Purê de batata"
        ],
        saladas: [
            "Alface e tomate",
            "Legumes"
        ],
        sobremesas: [
            "Mousse de chocolate",
            "Mousse de morango"
        ]
    },

    sabado: {
        pratos: [
            "Frango assado",
            "Bife grelhado",
            "Linguiça",
            "Carne de panela"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão",
            "Farofa",
            "Batata frita"
        ],
        saladas: [
            "Salada verde",
            "Vinagrete"
        ],
        sobremesas: [
            "Bolo de chocolate",
            "Banana caramelizada"
        ]
    },

    domingo: {
        pratos: [
            "Frango assado",
            "Carne assada",
            "Bife acebolado",
            "Linguiça"
        ],
        guarnicoes: [
            "Arroz branco",
            "Feijão",
            "Macarrão",
            "Farofa",
            "Batata frita"
        ],
        saladas: [
            "Salada especial",
            "Vinagrete"
        ],
        sobremesas: [
            "Manjar de coco",
            "Abacaxi com hortelã"
        ]
    }
};


function mostrarAlmoco() {

    const lista = document.getElementById("listaAlmoco");

    if (!lista) return;

    const dias = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado"
    ];

    const dia = dias[new Date().getDay()];
    const dados = cardapioAlmoco[dia];

    if (!dados) return;

    lista.innerHTML = `

        <div class="card-cardapio">
            <h3>🍽️ Pratos principais</h3>
            <ul>
                ${dados.pratos.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="card-cardapio">
            <h3>🍚 Guarnições</h3>
            <ul>
                ${dados.guarnicoes.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="card-cardapio">
            <h3>🥗 Saladas</h3>
            <ul>
                ${dados.saladas.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>

        <div class="card-cardapio">
            <h3>🍰 Sobremesas</h3>
            <ul>
                ${dados.sobremesas.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </div>

    `;
}


// ======================================================
// MARMITAS
// ======================================================

const marmitas = [
    {
        nome: "Marmita Pequena",
        descricao: "1 mistura",
        preco: 22
    },
    {
        nome: "Marmita Média",
        descricao: "2 misturas",
        preco: 25
    },
    {
        nome: "Marmita Grande",
        descricao: "3 misturas",
        preco: 28
    },
    {
        nome: "Marmita Comercial",
        descricao: "4 misturas",
        preco: 50
    }
];


function mostrarMarmitas() {

    const lista = document.getElementById("listaMarmitas");

    if (!lista) return;

    lista.innerHTML = "";

    marmitas.forEach((marmita, index) => {

        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `

            <h3>${marmita.nome}</h3>

            <p>${marmita.descricao}</p>

            <strong>${dinheiro(marmita.preco)}</strong>

            <button
                type="button"
                class="botao-principal"
                data-marmita="${index}"
            >
                Adicionar
            </button>

        `;

        lista.appendChild(card);
    });


    lista.querySelectorAll("[data-marmita]").forEach(botao => {

        botao.addEventListener("click", () => {

            const marmita =
                marmitas[Number(botao.dataset.marmita)];

            const misturas = prompt(
                `Escolha suas misturas para ${marmita.nome}:`
            );

            if (!misturas || !misturas.trim()) return;

            adicionarCarrinho(
                `${marmita.nome} - ${misturas}`,
                marmita.preco
            );

        });

    });
}


// ======================================================
// JANTAR
// ======================================================

const cardapioJantar = {

    segunda: {
        pais: "🇪🇸 Espanhol",
        pratos: [
            "Paella",
            "Tortilla espanhola",
            "Frango ao molho espanhol",
            "Arroz espanhol",
            "Batatas ao forno",
            "Salada espanhola"
        ],
        sobremesas: [
            "Churros com chocolate",
            "Crema Catalana"
        ]
    },

    terca: {
        pais: "🇳🇱 Holandês",
        pratos: [
            "Stamppot",
            "Carne ao molho",
            "Frango assado",
            "Batatas",
            "Legumes",
            "Salada"
        ],
        sobremesas: [
            "Poffertjes",
            "Appeltaart"
        ]
    },

    quarta: {
        pais: "🇮🇹 Italiano",
        pratos: [
            "Lasanha à bolonhesa",
            "Espaguete à bolonhesa",
            "Frango à parmegiana",
            "Nhoque ao molho",
            "Penne ao molho",
            "Salada italiana"
        ],
        sobremesas: [
            "Tiramisù",
            "Panna Cotta"
        ]
    },

    quinta: {
        pais: "🇩🇪 Alemão",
        pratos: [
            "Salsicha alemã",
            "Joelho de porco",
            "Carne ao molho",
            "Batatas",
            "Chucrute",
            "Salada"
        ],
        sobremesas: [
            "Floresta Negra",
            "Apfelstrudel"
        ]
    },

    sexta: {
        pais: "🇫🇷 Francês",
        pratos: [
            "Frango à francesa",
            "Carne ao molho",
            "Ratatouille",
            "Batatas gratinadas",
            "Arroz",
            "Salada"
        ],
        sobremesas: [
            "Crème Brûlée",
            "Mousse de chocolate"
        ]
    },

    sabado: {
        pais: "🇧🇷 Brasileiro",
        pratos: [
            "Arroz",
            "Feijão",
            "Carne assada",
            "Frango assado",
            "Linguiça",
            "Farofa",
            "Vinagrete",
            "Batata frita",
            "Salada"
        ],
        sobremesas: [
            "Pudim de leite",
            "Brigadeiro"
        ]
    },

    domingo: {
        pais: "🇦🇷 Argentino",
        pratos: [
            "Bife grelhado",
            "Bife acebolado",
            "Frango grelhado",
            "Linguiça",
            "Batata frita",
            "Batata assada",
            "Chimichurri",
            "Salada"
        ],
        sobremesas: [
            "Alfajor",
            "Pastelitos argentinos"
        ]
    }
};


function mostrarJantar() {

    const lista = document.getElementById("listaJantar");

    if (!lista) return;

    const dias = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado"
    ];

    const dia = dias[new Date().getDay()];
    const dados = cardapioJantar[dia];

    lista.innerHTML = `

        <div class="card-cardapio">

            <h3>${dados.pais}</h3>

            <ul>
                ${dados.pratos.map(item => `<li>${item}</li>`).join("")}
            </ul>

        </div>

        <div class="card-cardapio">

            <h3>🍰 Sobremesas</h3>

            <ul>
                ${dados.sobremesas.map(item => `<li>${item}</li>`).join("")}
            </ul>

        </div>

    `;
}


// ======================================================
// À LA CARTE
// ======================================================

const alacarte = [

    ["Bife Acebolado", 32],
    ["Bife à Parmegiana", 38],
    ["Filé de Frango Grelhado", 30],
    ["Filé de Frango à Parmegiana", 35],
    ["Filé de Frango Acebolado", 32],
    ["Filé de Carne Grelhado", 35],
    ["Carne de Panela", 32],
    ["Strogonoff de Carne", 35],
    ["Strogonoff de Frango", 32],
    ["Filé de Frango com Catupiry", 36],
    ["Filé de Frango com Bacon", 36],
    ["Bife com Ovo", 34],
    ["Bife com Fritas", 36],
    ["Frango com Fritas", 34],
    ["Linguiça Acebolada", 30],
    ["Linguiça com Fritas", 33],
    ["Omelete Especial", 28],
    ["Parmegiana Especial da Casa", 40],
    ["Prato Executivo de Carne", 35],
    ["Prato Executivo de Frango", 32]

];


function mostrarAlacarte() {

    const lista = document.getElementById("listaAlacarte");

    if (!lista) return;

    lista.innerHTML = "";

    alacarte.forEach((produto, index) => {

        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `

            <h3>${produto[0]}</h3>

            <strong>${dinheiro(produto[1])}</strong>

            <button
                type="button"
                class="botao-principal"
                data-alacarte="${index}"
            >
                Adicionar
            </button>

        `;

        lista.appendChild(card);

    });


    lista.querySelectorAll("[data-alacarte]").forEach(botao => {

        botao.addEventListener("click", () => {

            const produto =
                alacarte[Number(botao.dataset.alacarte)];

            let nome = produto[0];

            if (nome.toLowerCase().includes("bife")) {

                const tipo = prompt(
                    "Escolha o tipo de bife:\n\n" +
                    "1 - Bife tradicional\n" +
                    "2 - Contra-filé\n" +
                    "3 - Filé"
                );

                if (!tipo) return;

                let tipoBife;

                if (tipo === "1") {
                    tipoBife = "Bife tradicional";
                } else if (tipo === "2") {
                    tipoBife = "Contra-filé";
                } else if (tipo === "3") {
                    tipoBife = "Filé";
                } else {
                    alert("Opção inválida.");
                    return;
                }

                const ponto = prompt(
                    "Escolha o ponto da carne:\n\n" +
                    "1 - Malpassado\n" +
                    "2 - Ao ponto\n" +
                    "3 - Bem-passado"
                );

                if (!ponto) return;

                let pontoCarne;

                if (ponto === "1") {
                    pontoCarne = "Malpassado";
                } else if (ponto === "2") {
                    pontoCarne = "Ao ponto";
                } else if (ponto === "3") {
                    pontoCarne = "Bem-passado";
                } else {
                    alert("Opção inválida.");
                    return;
                }

                nome += ` - ${tipoBife} - ${pontoCarne}`;
            }

            adicionarCarrinho(nome, produto[1]);

        });

    });
}


// ======================================================
// BEBIDAS
// ======================================================

const bebidas = [

    ["Coca-Cola 2L", 12],
    ["Coca-Cola 600ml", 8],
    ["Coca-Cola Lata", 6],
    ["Guaraná Antarctica 2L", 10],
    ["Guaraná Antarctica 600ml", 7],
    ["Guaraná Antarctica Lata", 5.50],
    ["Guaraná Jesus 2L", 12],
    ["Guaraná Jesus Lata", 6],
    ["Guaraná Kuat 2L", 10],
    ["Guaraná Kuat Lata", 5.50],
    ["Fanta Laranja 2L", 10],
    ["Fanta Laranja 600ml", 7],
    ["Fanta Laranja Lata", 5.50],
    ["Fanta Uva Lata", 5.50],
    ["Heineken Long Neck", 10],
    ["Brahma Long Neck", 8],
    ["Skol Lata", 5.50],
    ["Brahma Lata", 5.50],
    ["Heineken Lata", 8],
    ["Água Mineral com Gás", 4],
    ["Água Mineral sem Gás", 3.50]

];


function mostrarBebidas() {

    const lista = document.getElementById("listaBebidas");

    if (!lista) return;

    lista.innerHTML = "";

    bebidas.forEach((produto, index) => {

        const card = document.createElement("div");

        card.className = "produto-card";

        card.innerHTML = `

            <h3>${produto[0]}</h3>

            <strong>${dinheiro(produto[1])}</strong>

            <button
                type="button"
                class="botao-principal"
                data-bebida="${index}"
            >
                Adicionar
            </button>

        `;

        lista.appendChild(card);

    });


    lista.querySelectorAll("[data-bebida]").forEach(botao => {

        botao.addEventListener("click", () => {

            const produto =
                bebidas[Number(botao.dataset.bebida)];

            adicionarCarrinho(
                produto[0],
                produto[1]
            );

        });

    });
}


// ======================================================
// CARRINHO
// ======================================================

function adicionarCarrinho(nome, preco) {

    const existente =
        carrinho.find(item => item.nome === nome);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: Number(preco),
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();

    alert(`${nome} foi adicionado ao carrinho.`);
}


function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    salvarCarrinho();
    atualizarCarrinho();
}


function diminuirQuantidade(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    atualizarCarrinho();
}


function removerItem(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();
    atualizarCarrinho();
}


function calcularSubtotal() {

    return carrinho.reduce(
        (total, item) =>
            total + (item.preco * item.quantidade),
        0
    );
}


// ======================================================
// TAXA DE ENTREGA
// ======================================================

function calcularTaxaEntrega() {

    const tipo =
        document.getElementById("tipoEntrega");

    if (!tipo) return 0;

    return tipo.value === "entrega" ? 5 : 0;
}


// ======================================================
// ATUALIZAR CARRINHO
// ======================================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const vazio =
        document.getElementById("carrinhoVazio");

    const resumo =
        document.getElementById("resumoCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    if (!lista || !vazio || !resumo) return;


    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );


    if (contador) {
        contador.textContent = quantidadeTotal;
    }


    if (carrinho.length === 0) {

        vazio.style.display = "block";
        resumo.style.display = "none";

        return;
    }


    vazio.style.display = "none";
    resumo.style.display = "block";

    lista.innerHTML = "";


    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;

        const div =
            document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `

            <div>
                <h3>${item.nome}</h3>
                <p>${dinheiro(item.preco)} cada</p>
            </div>

            <div class="controle-quantidade">

                <button
                    type="button"
                    data-acao="diminuir"
                    data-index="${index}"
                >
                    −
                </button>

                <strong>${item.quantidade}</strong>

                <button
                    type="button"
                    data-acao="aumentar"
                    data-index="${index}"
                >
                    +
                </button>

            </div>

            <strong>
                ${dinheiro(subtotal)}
            </strong>

            <button
                type="button"
                data-acao="remover"
                data-index="${index}"
            >
                🗑️
            </button>

        `;

        lista.appendChild(div);
    });


    const subtotal = calcularSubtotal();

    const taxa = calcularTaxaEntrega();

    const total = subtotal + taxa;


    const subtotalElemento =
        document.getElementById("subtotalCarrinho");

    const taxaElemento =
        document.getElementById("taxaCarrinho");

    const totalElemento =
        document.getElementById("totalCarrinho");


    if (subtotalElemento) {
        subtotalElemento.textContent =
            dinheiro(subtotal);
    }

    if (taxaElemento) {
        taxaElemento.textContent =
            dinheiro(taxa);
    }

    if (totalElemento) {
        totalElemento.textContent =
            dinheiro(total);
    }
}


// ======================================================
// BOTÕES DO CARRINHO
// ======================================================

document.addEventListener("click", function(event) {

    const botao =
        event.target.closest("[data-acao]");

    if (!botao) return;

    const index =
        Number(botao.dataset.index);

    const acao =
        botao.dataset.acao;

    if (acao === "aumentar") {
        aumentarQuantidade(index);
    }

    if (acao === "diminuir") {
        diminuirQuantidade(index);
    }

    if (acao === "remover") {
        removerItem(index);
    }

});


// ======================================================
// FINALIZAR PEDIDO
// ======================================================

const btnFinalizarPedido =
    document.getElementById("btnFinalizarPedido");


if (btnFinalizarPedido) {

    btnFinalizarPedido.addEventListener("click", function() {

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        if (!restauranteAberto()) {
            alert("O restaurante está fechado no momento.");
            return;
        }

        mostrarSecao("finalizacao");

        atualizarResumoFinal();

    });
}


// ======================================================
// TIPO DE ENTREGA
// ======================================================

const tipoEntrega =
    document.getElementById("tipoEntrega");

const campoEndereco =
    document.getElementById("campoEndereco");


function atualizarCampoEndereco() {

    if (!tipoEntrega || !campoEndereco) return;


    if (tipoEntrega.value === "entrega") {

        campoEndereco.style.display = "block";

        document.getElementById("ruaCliente").required = true;
        document.getElementById("numeroCliente").required = true;
        document.getElementById("bairroCliente").required = true;

    } else {

        campoEndereco.style.display = "none";

        document.getElementById("ruaCliente").required = false;
        document.getElementById("numeroCliente").required = false;
        document.getElementById("bairroCliente").required = false;

    }

    atualizarCarrinho();
}


if (tipoEntrega) {

    tipoEntrega.addEventListener(
        "change",
        atualizarCampoEndereco
    );

}


// ======================================================
// PAGAMENTO / TROCO
// ======================================================

const formaPagamento =
    document.getElementById("formaPagamento");

const campoTroco =
    document.getElementById("campoTroco");

const valorTroco =
    document.getElementById("valorTroco");

const valorTrocoCalculado =
    document.getElementById("valorTrocoCalculado");


function atualizarCampoTroco() {

    if (!formaPagamento || !campoTroco) return;


    if (formaPagamento.value === "dinheiro") {

        campoTroco.style.display = "block";

        valorTroco.required = true;

    } else {

        campoTroco.style.display = "none";

        valorTroco.required = false;

        valorTroco.value = "";

        if (valorTrocoCalculado) {
            valorTrocoCalculado.textContent =
                "Troco: R$ 0,00";
        }

    }

}


if (formaPagamento) {

    formaPagamento.addEventListener(
        "change",
        atualizarCampoTroco
    );

}


if (valorTroco) {

    valorTroco.addEventListener(
        "input",
        calcularTroco
    );

}


function calcularTroco() {

    const total =
        calcularSubtotal() +
        calcularTaxaEntrega();

    const valor =
        Number(valorTroco.value || 0);

    const troco =
        valor - total;


    if (!valorTrocoCalculado) return;


    if (valor <= 0) {

        valorTrocoCalculado.textContent =
            "Troco: R$ 0,00";

        return;
    }


    if (troco < 0) {

        valorTrocoCalculado.textContent =
            "⚠️ Valor insuficiente para o pagamento.";

        return;
    }


    valorTrocoCalculado.textContent =
        `Troco: ${dinheiro(troco)}`;

}


// ======================================================
// RESUMO FINAL
// ======================================================

function atualizarResumoFinal() {

    const resumo =
        document.getElementById("resumoFinalPedido");

    if (!resumo) return;


    const subtotal =
        calcularSubtotal();

    const taxa =
        calcularTaxaEntrega();

    const total =
        subtotal + taxa;


    resumo.innerHTML = `

        <h3>🛒 Resumo do pedido</h3>

        ${carrinho.map(item => `

            <div class="resumo-item">

                <span>
                    ${item.quantidade}x ${item.nome}
                </span>

                <strong>
                    ${dinheiro(
                        item.preco * item.quantidade
                    )}
                </strong>

            </div>

        `).join("")}

        <hr>

        <div class="resumo-item">

            <span>Subtotal</span>

            <strong>
                ${dinheiro(subtotal)}
            </strong>

        </div>

        <div class="resumo-item">

            <span>Taxa de entrega</span>

            <strong>
                ${dinheiro(taxa)}
            </strong>

        </div>

        <div class="resumo-item total">

            <span>Total</span>

            <strong>
                ${dinheiro(total)}
            </strong>

        </div>

    `;
}


// ======================================================
// ENVIO DO PEDIDO
// ======================================================

const formPedido =
    document.getElementById("formPedido");


if (formPedido) {

    formPedido.addEventListener(
        "submit",
        enviarPedido
    );

}


function enviarPedido(event) {

    event.preventDefault();


    if (!restauranteAberto()) {

        alert(
            "O restaurante está fechado no momento."
        );

        return;
    }


    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

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

    const entrega =
        document.getElementById(
            "tipoEntrega"
        ).value;

    const pagamento =
        document.getElementById(
            "formaPagamento"
        ).value;

    const observacao =
        document.getElementById(
            "observacaoPedido"
        ).value.trim();


    if (!nome || !telefone || !entrega || !pagamento) {

        alert(
            "Preencha todos os campos obrigatórios."
        );

        return;
    }


    // ==================================================
    // ENDEREÇO
    // ==================================================

    let enderecoTexto =
        "Retirada no restaurante";


    if (entrega === "entrega") {

        const rua =
            document.getElementById(
                "ruaCliente"
            ).value.trim();

        const numero =
            document.getElementById(
                "numeroCliente"
            ).value.trim();

        const bairro =
            document.getElementById(
                "bairroCliente"
            ).value.trim();

        const complemento =
            document.getElementById(
                "complementoCliente"
            ).value.trim();

        const referencia =
            document.getElementById(
                "referenciaCliente"
            ).value.trim();


        if (!rua || !numero || !bairro) {

            alert(
                "Preencha Rua, Número e Bairro para a entrega."
            );

            return;
        }


        enderecoTexto =
            `Rua: ${rua}\n` +
            `Número: ${numero}\n` +
            `Bairro: ${bairro}\n` +
            `Complemento: ${complemento || "Não informado"}\n` +
            `Referência: ${referencia || "Não informada"}`;
    }


    // ==================================================
    // TOTAL
    // ==================================================

    const subtotal =
        calcularSubtotal();

    const taxa =
        entrega === "entrega" ? 5 : 0;

    const total =
        subtotal + taxa;


    // ==================================================
    // PAGAMENTO
    // ==================================================

    let pagamentoTexto = "";


    if (pagamento === "credito") {

        pagamentoTexto =
            "Cartão de crédito";

    } else if (pagamento === "debito") {

        pagamentoTexto =
            "Cartão de débito";

    } else if (pagamento === "dinheiro") {

        const valorPago =
            Number(
                document.getElementById(
                    "valorTroco"
                ).value
            );


        if (!valorPago || valorPago < total) {

            alert(
                `O valor informado é menor que o total de ${dinheiro(total)}.`
            );

            return;
        }


        const troco =
            valorPago - total;


        pagamentoTexto =
            `Dinheiro\n` +
            `Valor entregue: ${dinheiro(valorPago)}\n` +
            `Troco: ${dinheiro(troco)}`;
    }


    // ==================================================
    // ITENS
    // ==================================================

    const itensTexto =
        carrinho.map(item => {

            const subtotalItem =
                item.preco * item.quantidade;

            return (
                `${item.quantidade}x ${item.nome} - ` +
                `${dinheiro(subtotalItem)}`
            );

        }).join("\n");


    // ==================================================
    // WHATSAPP
    // ==================================================

    const mensagem =

        `🍽️ *NOVO PEDIDO - RESTAURANTE MM*\n\n` +

        `👤 *Cliente:* ${nome}\n` +
        `📱 *Telefone:* ${telefone}\n\n` +

        `📦 *Recebimento:* ` +
        `${
            entrega === "entrega"
                ? "Entrega"
                : "Retirada no restaurante"
        }\n\n` +

        `📍 *Endereço:*\n` +
        `${enderecoTexto}\n\n` +

        `💳 *Pagamento:*\n` +
        `${pagamentoTexto}\n\n` +

        `🛒 *Itens do pedido:*\n` +
        `${itensTexto}\n\n` +

        `💰 *Subtotal:* ${dinheiro(subtotal)}\n` +
        `🚚 *Taxa de entrega:* ${dinheiro(taxa)}\n` +
        `💵 *TOTAL:* ${dinheiro(total)}\n\n` +

        `⏱️ *Prazo estimado:* ${PRAZO_ENTREGA}\n\n` +

        `📍 *Restaurante MM:*\n` +
        `Rua Guanabara, nº 26\n` +
        `Divinolândia - SP\n\n` +

        `📝 *Observações:*\n` +
        `${observacao || "Nenhuma"}`;


    // ==================================================
    // HISTÓRICO
    // ==================================================

    const pedido = {

        id: Date.now(),

        data: new Date().toLocaleString("pt-BR"),

        nome: nome,

        telefone: telefone,

        entrega: entrega,

        endereco: enderecoTexto,

        pagamento: pagamentoTexto,

        itens: [...carrinho],

        subtotal: subtotal,

        taxa: taxa,

        total: total,

        observacao: observacao
    };


    historico.unshift(pedido);

    salvarHistorico();


    // ==================================================
    // ABRIR WHATSAPP
    // ==================================================

    const url =
        `https://wa.me/${WHATSAPP}?text=` +
        encodeURIComponent(mensagem);

    window.open(url, "_blank");


    // ==================================================
    // SUCESSO
    // ==================================================

    const detalhes =
        document.getElementById(
            "detalhesPedidoRealizado"
        );


    if (detalhes) {

        detalhes.innerHTML = `

            <p>
                <strong>Cliente:</strong>
                ${nome}
            </p>

            <p>
                <strong>Total:</strong>
                ${dinheiro(total)}
            </p>

            <p>
                <strong>Recebimento:</strong>
                ${
                    entrega === "entrega"
                        ? "Entrega"
                        : "Retirada no restaurante"
                }
            </p>

            <p>
                Seu pedido foi enviado pelo WhatsApp.
            </p>

        `;
    }


    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

    formPedido.reset();

    atualizarCampoEndereco();

    atualizarCampoTroco();

    mostrarSecao("pedidoSucesso");
}


// ======================================================
// NOVO PEDIDO
// ======================================================

const btnNovoPedido =
    document.getElementById(
        "btnNovoPedido"
    );


if (btnNovoPedido) {

    btnNovoPedido.addEventListener(
        "click",
        function() {

            if (formPedido) {
                formPedido.reset();
            }

            atualizarCampoEndereco();
            atualizarCampoTroco();

            mostrarSecao("inicio");

        }
    );
}


// ======================================================
// HISTÓRICO
// ======================================================

function mostrarHistorico() {

    const lista =
        document.getElementById(
            "listaHistorico"
        );

    if (!lista) return;


    if (historico.length === 0) {

        lista.innerHTML = `

            <div class="carrinho-vazio">

                <h3>
                    Nenhum pedido realizado.
                </h3>

                <p>
                    Seus pedidos aparecerão aqui.
                </p>

            </div>

        `;

        return;
    }


    lista.innerHTML =
        historico.map(pedido => `

            <div class="historico-card">

                <h3>
                    Pedido de ${pedido.nome}
                </h3>

                <p>
                    📅 ${pedido.data}
                </p>

                <p>
                    💰 Total:
                    ${dinheiro(pedido.total)}
                </p>

                <p>
                    📦 ${
                        pedido.entrega === "entrega"
                            ? "Entrega"
                            : "Retirada"
                    }
                </p>

            </div>

        `).join("");
}


// ======================================================
// GOOGLE MAPS
// ======================================================

const btnAbrirMapa =
    document.getElementById(
        "btnAbrirMapa"
    );


if (btnAbrirMapa) {

    btnAbrirMapa.addEventListener(
        "click",
        abrirMapa
    );

}


function abrirMapa() {

    const endereco =
        "Rua Guanabara, 26, Divinolândia, SP";

    const url =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(endereco);

    window.open(url, "_blank");
}


// ======================================================
// STATUS DO RESTAURANTE
// ======================================================

function atualizarStatus() {

    const status =
        document.getElementById(
            "statusFuncionamento"
        );

    if (!status) return;


    if (estaNoAlmoco()) {

        status.textContent =
            "🟢 Aberto - Almoço";

    } else if (estaNoJantar()) {

        status.textContent =
            "🟢 Aberto - Jantar";

    } else {

        status.textContent =
            "🔴 Fechado";
    }
}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarStatus();

        mostrarAlmoco();

        atualizarCarrinho();

        atualizarCampoEndereco();

        atualizarCampoTroco();

        const ano =
            document.getElementById(
                "anoAtual"
            );

        if (ano) {
            ano.textContent =
                new Date().getFullYear();
        }

    }
);


setInterval(
    atualizarStatus,
    60000
);