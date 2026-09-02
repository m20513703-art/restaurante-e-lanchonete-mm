// ==========================================
// RESTAURANTE E LANCHONETE MM
// JAVASCRIPT COMPLETO
// ==========================================

let carrinho = [];

const WHATSAPP_EMPRESA = "5519981123401";


// ==========================================
// MOSTRAR CATEGORIA
// ==========================================

function mostrarCategoria(categoria) {

    const categorias =
        document.querySelectorAll(".categoria");

    categorias.forEach(function(secao) {
        secao.style.display = "none";
    });

    const selecionada =
        document.getElementById(categoria);

    if (selecionada) {
        selecionada.style.display = "block";
    }
}


// ==========================================
// PIZZA - MEIO A MEIO
// ==========================================

function mostrarMeioAMeio() {

    const tipo =
        document.querySelector(
            'input[name="tipoPizza"]:checked'
        );

    const segundoSabor =
        document.getElementById("segundoSabor");

    if (!tipo || !segundoSabor) {
        return;
    }

    if (tipo.value === "meio") {

        segundoSabor.style.display = "block";

        preencherSabores();

    } else {

        segundoSabor.style.display = "none";
    }
}


// ==========================================
// SABORES DAS PIZZAS
// ==========================================

function preencherSabores() {

    const select =
        document.getElementById("sabor2");

    if (!select) {
        return;
    }

    const sabores = [

        "Calabresa",
        "Muçarela",
        "Margherita",
        "Frango com Catupiry",
        "Portuguesa",
        "Quatro Queijos",
        "Bacon",
        "Atum",
        "Palmito",
        "Vegetariana",
        "Pepperoni",
        "Carne Seca",
        "Lombo com Cream Cheese",
        "Brócolis com Bacon",
        "Lombo ao Alho",
        "Moda da Casa",
        "Brigadeiro",
        "Prestígio",
        "Romeu e Julieta",
        "Banana com Canela"

    ];

    select.innerHTML = `
        <option value="">
            Escolha o segundo sabor
        </option>
    `;

    sabores.forEach(function(sabor) {

        const option =
            document.createElement("option");

        option.value = sabor;
        option.textContent = sabor;

        select.appendChild(option);

    });
}


// ==========================================
// PREÇOS DAS PIZZAS
// ==========================================

const precosPizzas = {

    "Calabresa": [30, 40, 50],
    "Muçarela": [30, 40, 50],
    "Margherita": [32, 42, 52],
    "Frango com Catupiry": [35, 45, 55],
    "Portuguesa": [35, 45, 55],
    "Quatro Queijos": [36, 46, 56],
    "Bacon": [34, 44, 54],
    "Atum": [34, 44, 54],
    "Palmito": [34, 44, 54],
    "Vegetariana": [34, 44, 54],
    "Pepperoni": [36, 46, 56],
    "Carne Seca": [38, 48, 58],
    "Lombo com Cream Cheese": [38, 48, 58],
    "Brócolis com Bacon": [36, 46, 56],
    "Lombo ao Alho": [36, 46, 56],
    "Moda da Casa": [40, 50, 60],
    "Brigadeiro": [35, 45, 55],
    "Prestígio": [35, 45, 55],
    "Romeu e Julieta": [35, 45, 55],
    "Banana com Canela": [35, 45, 55]

};


// ==========================================
// PEGAR TAMANHO DA PIZZA
// ==========================================

function pegarTamanho() {

    const tamanho =
        document.querySelector(
            'input[name="tamanhoPizza"]:checked'
        );

    if (!tamanho) {
        return "P";
    }

    return tamanho.value;
}


// ==========================================
// PEGAR PREÇO
// ==========================================

function pegarPreco(
    tamanho,
    pequena,
    media,
    grande
) {

    if (tamanho === "P") {
        return pequena;
    }

    if (tamanho === "G") {
        return grande;
    }

    return media;
}


// ==========================================
// ADICIONAR PIZZA
// ==========================================

function adicionarPizza(
    botao,
    nome,
    precoP,
    precoM,
    precoG
) {

    const card =
        botao.closest(".pizza-card");

    if (!card) {
        return;
    }

    const tamanho =
        pegarTamanho();

    const tipo =
        document.querySelector(
            'input[name="tipoPizza"]:checked'
        );

    const tipoPizza =
        tipo ? tipo.value : "inteira";


    let preco =
        pegarPreco(
            tamanho,
            precoP,
            precoM,
            precoG
        );


    // ======================================
    // MEIO A MEIO
    // ======================================

    let segundoSabor = "";

    if (tipoPizza === "meio") {

        const select =
            document.getElementById("sabor2");

        if (!select || !select.value) {

            alert(
                "Escolha o segundo sabor da pizza."
            );

            return;
        }

        segundoSabor =
            select.value;

        const precosSegundo =
            precosPizzas[segundoSabor];

        if (precosSegundo) {

            let indice = 1;

            if (tamanho === "P") {
                indice = 0;
            }

            if (tamanho === "G") {
                indice = 2;
            }

            preco =
                Math.max(
                    preco,
                    precosSegundo[indice]
                );
        }
    }


    // ======================================
    // NOME
    // ======================================

    let nomePizza = nome;

    if (tipoPizza === "meio") {

        nomePizza =
            "½ " +
            nome +
            " + ½ " +
            segundoSabor;
    }


    // ======================================
    // BORDA
    // ======================================

    const borda =
        card.querySelector(".borda");

    let valorBorda = 0;

    let nomeBorda = "Sem borda";

    if (borda) {

        valorBorda =
            Number(borda.value);

        if (borda.value !== "0") {

            nomeBorda =
                borda.options[
                    borda.selectedIndex
                ].textContent;
        }
    }


    // ======================================
    // EXTRAS
    // ======================================

    const extras =
        card.querySelectorAll(
            ".extra:checked"
        );

    let valorExtras = 0;

    let nomesExtras = [];

    extras.forEach(function(extra) {

        valorExtras +=
            Number(extra.value);

        let texto =
            extra.parentElement.textContent.trim();

        texto =
            texto.replace(
                /-\s*R\$\s*[\d,.]+/,
                ""
            );

        nomesExtras.push(
            texto.trim()
        );

    });


    const produto = {

        id: Date.now(),

        categoria: "Pizza",

        nome: nomePizza,

        tamanho: tamanho,

        precoPizza: preco,

        borda: nomeBorda,

        valorBorda: valorBorda,

        extras: nomesExtras,

        valorExtras: valorExtras,

        quantidade: 1,

        total:
            preco +
            valorBorda +
            valorExtras
    };


    carrinho.push(produto);

    atualizarCarrinho();

    alert(
        "Pizza adicionada ao carrinho!"
    );
}


// ==========================================
// ADICIONAR PRODUTO NORMAL
// ==========================================

function adicionarProduto(
    nome,
    preco,
    categoria
) {

    const produto = {

        id: Date.now(),

        categoria: categoria,

        nome: nome,

        precoPizza: Number(preco),

        borda: "",

        valorBorda: 0,

        extras: [],

        valorExtras: 0,

        quantidade: 1,

        total: Number(preco)
    };


    carrinho.push(produto);

    atualizarCarrinho();

    alert(
        nome +
        " foi adicionado ao carrinho!"
    );
}


// ==========================================
// MARMITAS
// ==========================================

function configurarMarmita() {

    const tamanho =
        document.querySelector(
            'input[name="tamanhoMarmita"]:checked'
        );

    const limite =
        document.getElementById(
            "limiteMisturas"
        );

    if (!tamanho || !limite) {
        return;
    }

    let quantidade = 0;

    if (tamanho.value === "pequena") {
        quantidade = 1;
    }

    if (tamanho.value === "media") {
        quantidade = 2;
    }

    if (tamanho.value === "grande") {
        quantidade = 2;
    }

    if (tamanho.value === "comercial") {
        quantidade = 3;
    }

    limite.textContent =
        "Você pode escolher até " +
        quantidade +
        " mistura(s).";


    document
        .querySelectorAll(
            ".mistura-marmita"
        )
        .forEach(function(mistura) {

            mistura.checked = false;
            mistura.disabled = false;

        });
}


// ==========================================
// VERIFICAR MISTURAS
// ==========================================

function verificarMisturas() {

    const tamanho =
        document.querySelector(
            'input[name="tamanhoMarmita"]:checked'
        );

    if (!tamanho) {
        return;
    }

    let limite = 0;

    if (tamanho.value === "pequena") {
        limite = 1;
    }

    if (tamanho.value === "media") {
        limite = 2;
    }

    if (tamanho.value === "grande") {
        limite = 2;
    }

    if (tamanho.value === "comercial") {
        limite = 3;
    }


    const misturas =
        document.querySelectorAll(
            ".mistura-marmita"
        );

    let selecionadas = [];


    misturas.forEach(function(mistura) {

        if (mistura.checked) {
            selecionadas.push(mistura);
        }

    });


    if (selecionadas.length > limite) {

        selecionadas[
            selecionadas.length - 1
        ].checked = false;

        alert(
            "Essa marmita permite apenas " +
            limite +
            " mistura(s)."
        );

    }


    misturas.forEach(function(mistura) {

        if (
            selecionadas.length >= limite &&
            !mistura.checked
        ) {

            mistura.disabled = true;

        } else {

            mistura.disabled = false;

        }

    });
}


// ==========================================
// ADICIONAR MARMITA
// ==========================================

function adicionarMarmita() {

    const tamanho =
        document.querySelector(
            'input[name="tamanhoMarmita"]:checked'
        );

    if (!tamanho) {

        alert(
            "Escolha o tamanho da marmita."
        );

        return;
    }


    let preco = 0;
    let limite = 0;
    let nomeTamanho = "";


    if (tamanho.value === "pequena") {

        preco = 20;
        limite = 1;
        nomeTamanho = "Pequena";

    }


    if (tamanho.value === "media") {

        preco = 25;
        limite = 2;
        nomeTamanho = "Média";

    }


    if (tamanho.value === "grande") {

        preco = 28;
        limite = 2;
        nomeTamanho = "Grande";

    }


    if (tamanho.value === "comercial") {

        preco = 50;
        limite = 3;
        nomeTamanho = "Comercial";

    }


    const misturasSelecionadas =
        document.querySelectorAll(
            ".mistura-marmita:checked"
        );


    if (
        misturasSelecionadas.length === 0
    ) {

        alert(
            "Escolha pelo menos uma mistura."
        );

        return;
    }


    if (
        misturasSelecionadas.length > limite
    ) {

        alert(
            "Essa marmita permite apenas " +
            limite +
            " mistura(s)."
        );

        return;
    }


    const misturas = [];


    misturasSelecionadas.forEach(
        function(mistura) {

            misturas.push(
                mistura.value
            );

        }
    );


    const produto = {

        id: Date.now(),

        categoria: "Marmita",

        nome:
            "Marmita " +
            nomeTamanho,

        tamanho:
            nomeTamanho,

        precoPizza:
            preco,

        borda: "",

        valorBorda: 0,

        extras: [],

        valorExtras: 0,

        misturas:
            misturas,

        acompanhamentos:
            [
                "Arroz",
                "Feijão",
                "Tutu de feijão"
            ],

        quantidade: 1,

        total: preco
    };


    carrinho.push(produto);

    atualizarCarrinho();


    alert(
        "Marmita adicionada ao carrinho!"
    );


    // Limpar seleção

    document
        .querySelectorAll(
            'input[name="tamanhoMarmita"]'
        )
        .forEach(function(input) {

            input.checked = false;

        });


    document
        .querySelectorAll(
            ".mistura-marmita"
        )
        .forEach(function(input) {

            input.checked = false;

            input.disabled = false;

        });


    const limiteTexto =
        document.getElementById(
            "limiteMisturas"
        );

    if (limiteTexto) {

        limiteTexto.textContent =
            "Escolha o tamanho da marmita primeiro.";

    }
}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );

    const totalElemento =
        document.getElementById(
            "totalCarrinho"
        );


    if (!lista || !totalElemento) {
        return;
    }


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        totalElemento.textContent =
            "R$ 0,00";

        return;
    }


    let totalGeral = 0;


    carrinho.forEach(function(produto) {

        const item =
            document.createElement("div");

        item.className =
            "item-carrinho";


        const totalProduto =
            produto.total *
            produto.quantidade;


        totalGeral += totalProduto;


        let tamanhoTexto = "";

        if (produto.tamanho) {

            tamanhoTexto =
                `
                <p>
                    📏 Tamanho:
                    ${produto.tamanho}
                </p>
                `;
        }


        let bordaTexto = "";

        if (
            produto.borda &&
            produto.borda !== "Sem borda"
        ) {

            bordaTexto =
                `
                <p>
                    🧀 Borda:
                    ${produto.borda}
                </p>
                `;
        }


        let extrasTexto = "";

        if (
            produto.extras &&
            produto.extras.length > 0
        ) {

            extrasTexto =
                `
                <p>
                    ➕ Extras:
                    ${produto.extras.join(", ")}
                </p>
                `;
        }


        let misturasTexto = "";

        if (
            produto.misturas &&
            produto.misturas.length > 0
        ) {

            misturasTexto =
                `
                <p>
                    🍖 Misturas:
                    ${produto.misturas.join(", ")}
                </p>
                `;
        }


        let acompanhamentosTexto = "";

        if (
            produto.acompanhamentos &&
            produto.acompanhamentos.length > 0
        ) {

            acompanhamentosTexto =
                `
                <p>
                    🍚 Acompanhamentos:
                    ${produto.acompanhamentos.join(", ")}
                </p>
                `;
        }


        item.innerHTML = `

            <h3>
                ${produto.nome}
            </h3>

            ${tamanhoTexto}

            ${misturasTexto}

            ${acompanhamentosTexto}

            ${bordaTexto}

            ${extrasTexto}

            <p>
                🔢 Quantidade:
            </p>

            <button
                onclick="diminuirQuantidade(${produto.id})"
            >
                ➖
            </button>

            <strong>
                ${produto.quantidade}
            </strong>

            <button
                onclick="aumentarQuantidade(${produto.id})"
            >
                ➕
            </button>

            <p>
                💰
                <strong>
                    R$ ${formatarMoeda(totalProduto)}
                </strong>
            </p>

            <button
                onclick="removerProduto(${produto.id})"
            >
                🗑️ Remover
            </button>

            <hr>

        `;


        lista.appendChild(item);

    });


    totalElemento.textContent =
        "R$ " +
        formatarMoeda(totalGeral);
}


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

function aumentarQuantidade(id) {

    const produto =
        carrinho.find(function(item) {

            return item.id === id;

        });


    if (produto) {

        produto.quantidade++;

    }


    atualizarCarrinho();
}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

function diminuirQuantidade(id) {

    const produto =
        carrinho.find(function(item) {

            return item.id === id;

        });


    if (!produto) {
        return;
    }


    if (produto.quantidade > 1) {

        produto.quantidade--;

    } else {

        carrinho =
            carrinho.filter(function(item) {

                return item.id !== id;

            });

    }


    atualizarCarrinho();
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(id) {

    carrinho =
        carrinho.filter(function(item) {

            return item.id !== id;

        });


    atualizarCarrinho();
}


// ==========================================
// LIMPAR CARRINHO
// ==========================================

function limparCarrinho() {

    if (carrinho.length === 0) {
        return;
    }


    const confirmar =
        confirm(
            "Deseja realmente limpar o carrinho?"
        );


    if (!confirmar) {
        return;
    }


    carrinho = [];

    atualizarCarrinho();
}


// ==========================================
// MOSTRAR ENDEREÇO
// ==========================================

function mostrarEndereco() {

    const tipo =
        document.querySelector(
            'input[name="tipoEntrega"]:checked'
        );

    const campo =
        document.getElementById(
            "campoEndereco"
        );


    if (!tipo || !campo) {
        return;
    }


    if (tipo.value === "delivery") {

        campo.style.display = "block";

    } else {

        campo.style.display = "none";
    }
}


// ==========================================
// PAGAMENTO
// ==========================================

function verificarPagamento() {

    const pagamento =
        document.getElementById(
            "formaPagamento"
        );

    const campoTroco =
        document.getElementById(
            "campoTroco"
        );


    if (!pagamento || !campoTroco) {
        return;
    }


    if (pagamento.value === "Dinheiro") {

        campoTroco.style.display =
            "block";

    } else {

        campoTroco.style.display =
            "none";
    }
}


// ==========================================
// FORMATAR MOEDA
// ==========================================

function formatarMoeda(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
}


// ==========================================
// TOTAL
// ==========================================

function calcularTotalCarrinho() {

    let total = 0;


    carrinho.forEach(function(produto) {

        total +=
            produto.total *
            produto.quantidade;

    });


    return total;
}


// ==========================================
// ENVIAR PEDIDO PELO WHATSAPP
// ==========================================

function enviarPedidoWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }


    const nome =
        document.getElementById(
            "nomeCliente"
        ).value.trim();


    const whatsapp =
        document.getElementById(
            "whatsappCliente"
        ).value.trim();


    const tipoEntrega =
        document.querySelector(
            'input[name="tipoEntrega"]:checked'
        );


    const endereco =
        document.getElementById(
            "enderecoCliente"
        ).value.trim();


    const complemento =
        document.getElementById(
            "complementoCliente"
        ).value.trim();


    const pagamento =
        document.getElementById(
            "formaPagamento"
        ).value;


    const troco =
        document.getElementById(
            "troco"
        ).value;


    const observacao =
        document.getElementById(
            "observacao"
        ).value.trim();


    // ======================================
    // VALIDAÇÕES
    // ======================================

    if (!nome) {

        alert(
            "Digite seu nome."
        );

        return;
    }


    if (!whatsapp) {

        alert(
            "Digite seu WhatsApp."
        );

        return;
    }


    if (!tipoEntrega) {

        alert(
            "Escolha Delivery ou Retirada."
        );

        return;
    }


    if (
        tipoEntrega.value === "delivery" &&
        !endereco
    ) {

        alert(
            "Digite o endereço para entrega."
        );

        return;
    }


    if (!pagamento) {

        alert(
            "Escolha a forma de pagamento."
        );

        return;
    }


    if (
        pagamento === "Dinheiro" &&
        !troco
    ) {

        alert(
            "Informe o valor para o troco."
        );

        return;
    }


    // ======================================
    // TAXA DELIVERY
    // ======================================

    let taxaDelivery = 0;


    if (
        tipoEntrega.value === "delivery"
    ) {

        taxaDelivery = 5;

    }


    // ======================================
    // TOTAL
    // ======================================

    const subtotal =
        calcularTotalCarrinho();


    const totalFinal =
        subtotal +
        taxaDelivery;


    // ======================================
    // MENSAGEM
    // ======================================

    let mensagem = "";


    mensagem +=
        "🍽️ *NOVO PEDIDO*";

    mensagem +=
        "\n*Restaurante e Lanchonete MM*";


    mensagem +=
        "\n\n━━━━━━━━━━━━━━━━━━";


    mensagem +=
        "\n👤 *Cliente:* " +
        nome;


    mensagem +=
        "\n📱 *WhatsApp:* " +
        whatsapp;


    // ======================================
    // ENTREGA
    // ======================================

    if (
        tipoEntrega.value === "delivery"
    ) {

        mensagem +=
            "\n🛵 *Entrega:* Delivery";

        mensagem +=
            "\n🏠 *Endereço:* " +
            endereco;


        if (complemento) {

            mensagem +=
                "\n📍 *Referência:* " +
                complemento;

        }

    } else {

        mensagem +=
            "\n📍 *Entrega:* Retirar no local";

    }


    // ======================================
    // PEDIDOS
    // ======================================

    mensagem +=
        "\n\n🛒 *PEDIDO:*";


    mensagem +=
        "\n━━━━━━━━━━━━━━━━━━";


    carrinho.forEach(function(produto) {

        const valor =
            produto.total *
            produto.quantidade;


        mensagem +=
            "\n\n" +
            produto.quantidade +
            "x " +
            produto.nome;


        if (produto.tamanho) {

            mensagem +=
                "\n📏 Tamanho: " +
                produto.tamanho;

        }


        if (
            produto.misturas &&
            produto.misturas.length > 0
        ) {

            mensagem +=
                "\n🍖 Misturas: " +
                produto.misturas.join(", ");

        }


        if (
            produto.acompanhamentos &&
            produto.acompanhamentos.length > 0
        ) {

            mensagem +=
                "\n🍚 Acompanhamentos: " +
                produto.acompanhamentos.join(", ");

        }


        if (
            produto.borda &&
            produto.borda !== "Sem borda"
        ) {

            mensagem +=
                "\n🧀 Borda: " +
                produto.borda;

        }


        if (
            produto.extras &&
            produto.extras.length > 0
        ) {

            mensagem +=
                "\n➕ Extras: " +
                produto.extras.join(", ");

        }


        mensagem +=
            "\n💰 R$ " +
            formatarMoeda(valor);

    });


    // ======================================
    // VALORES
    // ======================================

    mensagem +=
        "\n\n━━━━━━━━━━━━━━━━━━";


    mensagem +=
        "\n💰 *Subtotal:* R$ " +
        formatarMoeda(subtotal);


    if (taxaDelivery > 0) {

        mensagem +=
            "\n🛵 *Taxa de delivery:* R$ " +
            formatarMoeda(taxaDelivery);

    }


    mensagem +=
        "\n💵 *TOTAL:* R$ " +
        formatarMoeda(totalFinal);


    // ======================================
    // PAGAMENTO
    // ======================================

    mensagem +=
        "\n\n💳 *Pagamento:* " +
        pagamento;


    if (
        pagamento === "Dinheiro"
    ) {

        mensagem +=
            "\n💵 *Troco para:* R$ " +
            formatarMoeda(troco);

    }


    // ======================================
    // OBSERVAÇÃO
    // ======================================

    if (observacao) {

        mensagem +=
            "\n\n📝 *Observação:* " +
            observacao;

    }


    mensagem +=
        "\n\n━━━━━━━━━━━━━━━━━━";


    mensagem +=
        "\n🙏 Obrigado pelo pedido!";


    // ======================================
    // WHATSAPP
    // ======================================

    const mensagemCodificada =
        encodeURIComponent(
            mensagem
        );


    const link =
        "https://wa.me/" +
        WHATSAPP_EMPRESA +
        "?text=" +
        mensagemCodificada;


    window.open(
        link,
        "_blank"
    );
}


// ==========================================
// INICIAR SITE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

        mostrarCategoria("pizzas");

        mostrarEndereco();


        const pagamento =
            document.getElementById(
                "formaPagamento"
            );


        if (pagamento) {

            pagamento.addEventListener(
                "change",
                verificarPagamento
            );

        }

    }
);