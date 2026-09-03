// ==========================================
// RESTAURANTE LANCHONETE MM
// SCRIPT PRINCIPAL
// ==========================================


// ==========================================
// VARIÁVEIS
// ==========================================

let carrinho = [];

let pedidoAtual = null;


// ==========================================
// FORMATAÇÃO DE DINHEIRO
// ==========================================

function formatarDinheiro(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarProduto(nome, preco) {

    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,
            preco: preco,
            quantidade: 1

        });

    }


    atualizarCarrinho();

    alert("✅ " + nome + " foi adicionado ao carrinho!");

}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const lista = document.getElementById(
        "listaCarrinho"
    );

    const contador = document.getElementById(
        "contadorCarrinho"
    );

    const totalElemento = document.getElementById(
        "totalCarrinho"
    );


    if (!lista) return;


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p>
                🛒 Seu carrinho está vazio.
            </p>
        `;

        contador.textContent = "0";

        totalElemento.textContent =
            formatarDinheiro(0);

        atualizarCheckout();

        return;
    }


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;


        total += subtotal;

        quantidadeTotal += item.quantidade;


        const div = document.createElement("div");

        div.className = "item-carrinho";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.nome}
                </strong>

                <p>
                    ${formatarDinheiro(item.preco)}
                    cada
                </p>

            </div>


            <div class="controle-quantidade">

                <button
                    onclick="diminuirQuantidade(${index})">
                    −
                </button>

                <span>
                    ${item.quantidade}
                </span>

                <button
                    onclick="aumentarQuantidade(${index})">
                    +
                </button>

            </div>


            <strong>
                ${formatarDinheiro(subtotal)}
            </strong>


            <button
                class="remover-item"
                onclick="removerProduto(${index})">

                🗑️

            </button>

        `;


        lista.appendChild(div);

    });


    contador.textContent =
        quantidadeTotal;


    totalElemento.textContent =
        formatarDinheiro(total);


    atualizarCheckout();

}


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();

}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.add("ativo");

    }

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("ativo");

    }

}


// ==========================================
// IR PARA CHECKOUT
// ==========================================

function irParaCheckout() {

    if (carrinho.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!"
        );

        return;

    }


    fecharCarrinho();


    const checkout =
        document.getElementById("checkout");


    checkout.classList.add("ativo");


    checkout.scrollIntoView({
        behavior: "smooth"
    });


    atualizarCheckout();

}


// ==========================================
// VOLTAR AO CARDÁPIO
// ==========================================

function voltarCardapio() {

    const checkout =
        document.getElementById("checkout");


    checkout.classList.remove("ativo");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// ATUALIZAR CHECKOUT
// ==========================================

function atualizarCheckout() {

    const subtotalElemento =
        document.getElementById(
            "subtotalCheckout"
        );


    const taxaElemento =
        document.getElementById(
            "taxaEntrega"
        );


    const totalElemento =
        document.getElementById(
            "totalCheckout"
        );


    if (!subtotalElemento) return;


    let subtotal = 0;


    carrinho.forEach(item => {

        subtotal +=
            item.preco *
            item.quantidade;

    });


    const tipoEntrega =
        document.querySelector(
            'input[name="tipoEntrega"]:checked'
        );


    let taxaEntrega = 0;


    if (
        tipoEntrega &&
        tipoEntrega.value === "delivery"
    ) {

        taxaEntrega = 5;

    }


    const total =
        subtotal + taxaEntrega;


    subtotalElemento.textContent =
        formatarDinheiro(subtotal);


    taxaElemento.textContent =
        formatarDinheiro(taxaEntrega);


    totalElemento.textContent =
        formatarDinheiro(total);

}


// ==========================================
// ALTERAR TIPO DE ENTREGA
// ==========================================

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.name ===
            "tipoEntrega"
        ) {

            const campoEndereco =
                document.getElementById(
                    "campoEndereco"
                );


            if (
                event.target.value ===
                "delivery"
            ) {

                campoEndereco.style.display =
                    "block";

            } else {

                campoEndereco.style.display =
                    "none";

            }


            atualizarCheckout();

        }

    }
);


// ==========================================
// STATUS DO RESTAURANTE
// ==========================================

function verificarHorario() {

    const agora = new Date();


    const dia =
        agora.getDay();


    const hora =
        agora.getHours();


    const minuto =
        agora.getMinutes();


    const horarioAtual =
        hora * 60 + minuto;


    let aberto = false;

    let mensagem = "";


    // ======================================
    // ALMOÇO
    // ======================================

    if (dia >= 1 && dia <= 5) {

        const abertura =
            11 * 60;

        const fechamento =
            15 * 60;


        if (
            horarioAtual >= abertura &&
            horarioAtual <= fechamento
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO • Almoço";

        }

    } else {

        const abertura =
            11 * 60 + 30;

        const fechamento =
            15 * 60 + 30;


        if (
            horarioAtual >= abertura &&
            horarioAtual <= fechamento
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO • Almoço";

        }

    }


    // ======================================
    // NOITE
    // ======================================

    if (dia >= 2 && dia <= 6) {

        const abertura =
            18 * 60;

        const fechamento =
            22 * 60 + 30;


        if (
            horarioAtual >= abertura &&
            horarioAtual <= fechamento
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO • Pizzaria / Lanchonete";

        }

    }


    // ======================================
    // DOMINGO
    // ======================================

    if (dia === 0) {

        const abertura =
            18 * 60;

        const fechamento =
            22 * 60 + 30;


        if (
            horarioAtual >= abertura &&
            horarioAtual <= fechamento
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO • Pizzaria / Lanchonete";

        }

    }


    // ======================================
    // FECHADO
    // ======================================

    if (!aberto) {

        if (dia === 1) {

            mensagem =
                "🔴 FECHADO • Pizzaria fechada hoje";

        } else {

            mensagem =
                "🔴 FECHADO no momento";

        }

    }


    const status =
        document.getElementById(
            "statusRestaurante"
        );


    if (status) {

        status.textContent =
            mensagem;

    }

}


// ==========================================
// SOBREMESAS POR DIA
// ==========================================

const sobremesasPorDia = {

    1: [

        {
            categoria: "Tradição",
            nome:
                "Pudim de leite condensado com calda de caramelo"
        },

        {
            categoria: "Frutada",
            nome:
                "Mousse de maracujá"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Salada de frutas tropicais com hortelã"
        },

        {
            categoria: "Rápida",
            nome:
                "Gelatina de morango com creme de leite"
        }

    ],


    2: [

        {
            categoria: "Tradição",
            nome:
                "Brigadeiro de colher com granulado"
        },

        {
            categoria: "Frutada",
            nome:
                "Banana assada com canela e mel"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Abacaxi fatiado com raspas de limão siciliano"
        },

        {
            categoria: "Rápida",
            nome:
                "Creme de papaya com licor de cassis"
        }

    ],


    3: [

        {
            categoria: "Tradição",
            nome:
                "Pavê de biscoito champagne e baunilha"
        },

        {
            categoria: "Frutada",
            nome:
                "Torta gelada de limão com biscoito"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Sorbet caseiro de morango congelado e banana"
        },

        {
            categoria: "Rápida",
            nome:
                "Morango fresco com leite condensado"
        }

    ],


    4: [

        {
            categoria: "Tradição",
            nome:
                "Arroz doce cremoso com canela"
        },

        {
            categoria: "Frutada",
            nome:
                "Compota de ameixa com creme de baunilha"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Maçã assada no forno com nozes"
        },

        {
            categoria: "Rápida",
            nome:
                "Mousse rápida de doce de leite com chantilly"
        }

    ],


    5: [

        {
            categoria: "Tradição",
            nome:
                "Petit gâteau de chocolate com sorvete de baunilha"
        },

        {
            categoria: "Frutada",
            nome:
                "Torta aberta de maçã com massa folhada"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Espetinho de frutas frescas com cacau em pó"
        },

        {
            categoria: "Rápida",
            nome:
                "Fondue rápido de chocolate com morangos e uvas"
        }

    ],


    6: [

        {
            categoria: "Tradição",
            nome:
                "Torta Holandesa tradicional"
        },

        {
            categoria: "Frutada",
            nome:
                "Cheesecake com calda de frutas vermelhas"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Mousse de cacau 70% com abacate e adoçante"
        },

        {
            categoria: "Rápida",
            nome:
                "Sorvete de creme com calda quente de brigadeiro"
        }

    ],


    0: [

        {
            categoria: "Tradição",
            nome:
                "Mousse aveludada de chocolate meio amargo"
        },

        {
            categoria: "Frutada",
            nome:
                "Pavê de pêssego em calda com creme branco"
        },

        {
            categoria: "Leve/Fit",
            nome:
                "Manga fatiada com raspas de coco queimado"
        },

        {
            categoria: "Rápida",
            nome:
                "Romeu e Julieta — queijo minas com goiabada cascão"
        }

    ]

};


// ==========================================
// MOSTRAR SOBREMESAS DE HOJE
// ==========================================

function mostrarSobremesasDoDia() {

    const container =
        document.getElementById(
            "sobremesasDoDia"
        );


    if (!container) return;


    const dia =
        new Date().getDay();


    const sobremesas =
        sobremesasPorDia[dia];


    container.innerHTML = "";


    sobremesas.forEach(
        sobremesa => {

            const card =
                document.createElement("article");


            card.className =
                "produto sobremesa-dia";


            card.innerHTML = `

                <h3>
                    🍨 ${sobremesa.categoria}
                </h3>

                <p>
                    ${sobremesa.nome}
                </p>

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// NAVEGAÇÃO DAS CATEGORIAS
// ==========================================

function irPara(id) {

    const elemento =
        document.getElementById(id);


    if (!elemento) return;


    elemento.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ==========================================
// ENVIAR PEDIDO PARA WHATSAPP
// ==========================================

function enviarPedidoWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!"
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


    const tipoEntrega =
        document.querySelector(
            'input[name="tipoEntrega"]:checked'
        ).value;


    const endereco =
        document.getElementById(
            "enderecoCliente"
        ).value.trim();


    const pagamento =
        document.getElementById(
            "pagamento"
        ).value;


    const observacao =
        document.getElementById(
            "observacao"
        ).value.trim();


    if (nome === "") {

        alert(
            "⚠️ Digite seu nome."
        );

        return;

    }


    if (telefone === "") {

        alert(
            "⚠️ Digite seu telefone."
        );

        return;

    }


    if (
        tipoEntrega === "delivery" &&
        endereco === ""
    ) {

        alert(
            "⚠️ Digite o endereço de entrega."
        );

        return;

    }


    if (pagamento === "") {

        alert(
            "⚠️ Escolha a forma de pagamento."
        );

        return;

    }


    let subtotal = 0;


    carrinho.forEach(item => {

        subtotal +=
            item.preco *
            item.quantidade;

    });


    const taxaEntrega =
        tipoEntrega === "delivery"
            ? 5
            : 0;


    const total =
        subtotal +
        taxaEntrega;


    const numeroPedido =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    pedidoAtual = {

        numero:
            numeroPedido,

        nome:
            nome,

        telefone:
            telefone,

        tipoEntrega:
            tipoEntrega,

        endereco:
            endereco,

        pagamento:
            pagamento,

        observacao:
            observacao,

        itens:
            [...carrinho],

        subtotal:
            subtotal,

        taxaEntrega:
            taxaEntrega,

        total:
            total

    };


    let mensagem = "";


    mensagem +=
        "🍔 RESTAURANTE LANCHONETE MM\n";

    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n";

    mensagem +=
        "📋 PEDIDO #" +
        numeroPedido +
        "\n\n";


    mensagem +=
        "👤 Cliente: " +
        nome +
        "\n";


    mensagem +=
        "📞 Telefone: " +
        telefone +
        "\n\n";


    if (tipoEntrega === "delivery") {

        mensagem +=
            "🛵 DELIVERY\n";

        mensagem +=
            "📍 Endereço: " +
            endereco +
            "\n\n";

    } else {

        mensagem +=
            "🏪 RETIRADA NO BALCÃO\n\n";

    }


    mensagem +=
        "🛒 PRODUTOS\n";

    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n";


    carrinho.forEach(item => {

        const subtotalItem =
            item.preco *
            item.quantidade;


        mensagem +=
            item.quantidade +
            "x " +
            item.nome +
            " - " +
            formatarDinheiro(
                subtotalItem
            ) +
            "\n";

    });


    mensagem += "\n";


    mensagem +=
        "💳 Pagamento: " +
        pagamento +
        "\n";


    if (observacao !== "") {

        mensagem +=
            "📝 Observação: " +
            observacao +
            "\n";

    }


    if (tipoEntrega === "delivery") {

        mensagem +=
            "🛵 Taxa de entrega: R$ 5,00\n";

    }


    mensagem +=
        "\n💰 TOTAL: " +
        formatarDinheiro(total);


    const numeroWhatsApp =
        "5519981123401";


    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensagem);


    // ======================================
    // MOSTRAR CONFIRMAÇÃO
    // ======================================

    mostrarSucesso(
        numeroPedido,
        total,
        tipoEntrega
    );


    // ======================================
    // ABRIR WHATSAPP
    // ======================================

    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// TELA DE SUCESSO
// ==========================================

function mostrarSucesso(
    numeroPedido,
    total,
    tipoEntrega
) {

    const checkout =
        document.getElementById(
            "checkout"
        );


    const sucesso =
        document.getElementById(
            "pedidoSucesso"
        );


    const numeroElemento =
        document.getElementById(
            "numeroPedido"
        );


    const totalElemento =
        document.getElementById(
            "totalSucesso"
        );


    checkout.classList.remove(
        "ativo"
    );


    sucesso.classList.add(
        "ativo"
    );


    numeroElemento.textContent =
        "#" + numeroPedido;


    totalElemento.textContent =
        formatarDinheiro(total);


    const texto =
        sucesso.querySelector("p");


    if (tipoEntrega === "retirada") {

        const mensagens =
            sucesso.querySelectorAll("p");


        if (mensagens.length >= 2) {

            mensagens[1].textContent =
                "🏪 Seu pedido está sendo preparado para retirada no balcão.";

        }

    }


    sucesso.scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// VOLTAR AO INÍCIO
// ==========================================

function voltarInicio() {

    const sucesso =
        document.getElementById(
            "pedidoSucesso"
        );


    sucesso.classList.remove(
        "ativo"
    );


    carrinho = [];


    pedidoAtual = null;


    atualizarCarrinho();


    document.getElementById(
        "nomeCliente"
    ).value = "";


    document.getElementById(
        "telefoneCliente"
    ).value = "";


    document.getElementById(
        "enderecoCliente"
    ).value = "";


    document.getElementById(
        "pagamento"
    ).value = "";


    document.getElementById(
        "observacao"
    ).value = "";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        verificarHorario();

        mostrarSobremesasDoDia();

        atualizarCarrinho();

        setInterval(
            verificarHorario,
            60000
        );

    }
);