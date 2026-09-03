/* =========================================================
   RESTAURANTE LANCHONETE MM
   SCRIPT.JS
========================================================= */

let carrinho = [];
let pedidoAtual = null;

const WHATSAPP = "5519981123401";
const TAXA_ENTREGA = 5.00;


/* =========================================================
   FORMATAR DINHEIRO
========================================================= */

function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   CARRINHO
========================================================= */

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

    alert("✅ Produto adicionado ao carrinho!");
}


function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const total = document.getElementById("totalCarrinho");
    const quantidade = document.getElementById("quantidadeCarrinho");

    if (!lista || !total) return;

    lista.innerHTML = "";

    let totalProdutos = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="mensagem-vazia">
                🛒 Seu carrinho está vazio.
            </div>
        `;

        total.innerHTML = `
            <h3>Total: R$ 0,00</h3>
        `;

        if (quantidade) {
            quantidade.textContent = "0";
        }

        return;
    }


    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;

        totalProdutos += subtotal;
        quantidadeTotal += item.quantidade;

        const div = document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                <small>${formatarDinheiro(item.preco)} cada</small>
                <small>Subtotal: ${formatarDinheiro(subtotal)}</small>
            </div>

            <div class="controle-quantidade">

                <button onclick="diminuirQuantidade(${index})">
                    −
                </button>

                <strong>${item.quantidade}</strong>

                <button onclick="aumentarQuantidade(${index})">
                    +
                </button>

                <button
                    class="remover-item"
                    onclick="removerProduto(${index})"
                >
                    🗑️
                </button>

            </div>
        `;

        lista.appendChild(div);

    });


    total.innerHTML = `
        <div style="margin-top:15px;">
            <h3>
                Total dos produtos:
                ${formatarDinheiro(totalProdutos)}
            </h3>
        </div>
    `;


    if (quantidade) {
        quantidade.textContent = quantidadeTotal;
    }
}


function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();
}


function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


/* =========================================================
   ABRIR / FECHAR CARRINHO
========================================================= */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {
        carrinhoElemento.classList.add("ativo");
    }

    atualizarCarrinho();
}


function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {
        carrinhoElemento.classList.remove("ativo");
    }
}


/* =========================================================
   CHECKOUT
========================================================= */

function irParaCheckout() {

    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;
    }

    fecharCarrinho();

    const checkout =
        document.getElementById("checkout");

    if (checkout) {

        checkout.classList.add("ativo");

        atualizarCheckout();

    }
}


function voltarCardapio() {

    const checkout =
        document.getElementById("checkout");

    if (checkout) {
        checkout.classList.remove("ativo");
    }

    fecharCarrinho();
}


function atualizarCheckout() {

    const resumo =
        document.getElementById("resumoCheckout");

    if (!resumo) return;


    let totalProdutos = 0;

    carrinho.forEach(item => {

        totalProdutos +=
            item.preco * item.quantidade;

    });


    const tipoEntrega =
        document.getElementById("tipoEntrega");


    let taxa = 0;

    if (
        tipoEntrega &&
        tipoEntrega.value === "delivery"
    ) {

        taxa = TAXA_ENTREGA;

    }


    const totalFinal =
        totalProdutos + taxa;


    resumo.innerHTML = `
        <div
            style="
                background:#f5f5f5;
                padding:15px;
                border-radius:12px;
                margin-top:15px;
            "
        >

            <p>
                Produtos:
                <strong>${formatarDinheiro(totalProdutos)}</strong>
            </p>

            <p>
                Entrega:
                <strong>${formatarDinheiro(taxa)}</strong>
            </p>

            <hr style="margin:10px 0;">

            <h3>
                Total:
                ${formatarDinheiro(totalFinal)}
            </h3>

        </div>
    `;
}


/* =========================================================
   ENTREGA / RETIRADA
========================================================= */

document.addEventListener(
    "change",
    function(event) {

        if (event.target.id === "tipoEntrega") {

            const enderecoArea =
                document.getElementById("enderecoArea");


            if (
                event.target.value === "delivery"
            ) {

                if (enderecoArea) {
                    enderecoArea.style.display = "block";
                }

            } else {

                if (enderecoArea) {
                    enderecoArea.style.display = "none";
                }

            }


            atualizarCheckout();

        }

    }
);


/* =========================================================
   HORÁRIO DE FUNCIONAMENTO
========================================================= */

function verificarHorario() {

    const status =
        document.getElementById("statusRestaurante");

    if (!status) return;


    const agora = new Date();

    const dia = agora.getDay();

    const hora = agora.getHours();

    const minutos = agora.getMinutes();

    const horarioAtual =
        hora * 60 + minutos;


    let aberto = false;

    let mensagem = "";


    /*
       DOMINGO = 0
       SEGUNDA = 1
       TERÇA = 2
       QUARTA = 3
       QUINTA = 4
       SEXTA = 5
       SÁBADO = 6
    */


    /* ALMOÇO */

    if (dia >= 1 && dia <= 5) {

        if (
            horarioAtual >= 11 * 60 &&
            horarioAtual < 15 * 60
        ) {

            aberto = true;

            mensagem = "🟢 ABERTO - ALMOÇO";

        }

    } else {

        if (
            horarioAtual >= 11 * 60 + 30 &&
            horarioAtual < 15 * 60 + 30
        ) {

            aberto = true;

            mensagem = "🟢 ABERTO - ALMOÇO";

        }

    }


    /* NOITE */

    if (dia >= 2 && dia <= 0) {

        /*
           Mantido apenas como proteção.
        */

    }


    if (dia >= 2 && dia <= 6) {

        if (
            horarioAtual >= 18 * 60 &&
            horarioAtual < 22 * 60 + 30
        ) {

            aberto = true;

            mensagem = "🟢 ABERTO - NOITE";

        }

    }


    if (!aberto) {

        mensagem = "🔴 FECHADO";

    }


    status.textContent = mensagem;

}


/* =========================================================
   SOBREMESAS POR DIA
========================================================= */

const sobremesasPorDia = {

    1: [
        "🍮 Tradição: Pudim de leite condensado com calda de caramelo",
        "🥭 Frutada: Mousse de maracujá",
        "🍍 Leve/Fit: Salada de frutas tropicais com hortelã",
        "🍓 Rápida: Gelatina de morango com creme de leite"
    ],

    2: [
        "🍫 Tradição: Brigadeiro de colher com granulado",
        "🍌 Frutada: Banana assada com canela e mel",
        "🍍 Leve/Fit: Abacaxi fatiado com raspas de limão siciliano",
        "🍈 Rápida: Creme de papaya com licor de cassis"
    ],

    3: [
        "🍰 Tradição: Pavê de biscoito champagne e baunilha",
        "🍋 Frutada: Torta gelada de limão com biscoito",
        "🍓 Leve/Fit: Sorbet caseiro de morango congelado e banana",
        "🍓 Rápida: Morango fresco com leite condensado"
    ],

    4: [
        "🍚 Tradição: Arroz doce cremoso com canela",
        "🍑 Frutada: Compota de ameixa com creme de baunilha",
        "🍎 Leve/Fit: Maçã assada no forno com nozes",
        "🍮 Rápida: Mousse rápida de doce de leite com chantilly"
    ],

    5: [
        "🍫 Tradição: Petit gâteau de chocolate com sorvete de baunilha",
        "🍎 Frutada: Torta aberta de maçã com massa folhada",
        "🍓 Leve/Fit: Espetinho de frutas frescas com cacau em pó",
        "🍫 Rápida: Fondue rápido de chocolate com morangos e uvas"
    ],

    6: [
        "🍰 Tradição: Torta Holandesa tradicional",
        "🍓 Frutada: Cheesecake com calda de frutas vermelhas",
        "🥑 Leve/Fit: Mousse de cacau 70% com abacate e adoçante",
        "🍨 Rápida: Sorvete de creme com calda quente de brigadeiro"
    ],

    0: [
        "🍫 Tradição: Mousse aveludada de chocolate meio amargo",
        "🍑 Frutada: Pavê de pêssego em calda com creme branco",
        "🥭 Leve/Fit: Manga fatiada com raspas de coco queimado",
        "🧀 Rápida: Romeu e Julieta (queijo minas com goiabada cascão)"
    ]

};


function mostrarSobremesasDoDia() {

    const container =
        document.getElementById("sobremesasDoDia");

    if (!container) return;


    const diaAtual =
        new Date().getDay();


    const sobremesas =
        sobremesasPorDia[diaAtual];


    container.innerHTML = "";


    if (!sobremesas) return;


    sobremesas.forEach(sobremesa => {

        const div =
            document.createElement("div");

        div.className =
            "dia-sobremesa";

        div.innerHTML = `
            <p>${sobremesa}</p>
        `;

        container.appendChild(div);

    });

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function irPara(id) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   MARMITAS
========================================================= */

let marmitaAtual = null;


/*
   Cardápio quente usado para as opções de mistura.
*/

const misturasPorDia = {

    1: [
        "Bife de contrafilé acebolado",
        "Filé de frango grelhado com ervas",
        "Peixe empanado crocante"
    ],

    2: [
        "Strogonoff de frango",
        "Frango assado com batatas",
        "Pernil fatiado com molho de cebola"
    ],

    3: [
        "Feijoada tradicional",
        "Torresmo crocante",
        "Calabresa acebolada",
        "Maminha grelhada",
        "Filé de peixe ao molho de camarão"
    ],

    4: [
        "Bife à parmegiana",
        "Costela suína ao molho barbecue",
        "Sobrecoxa de frango grelhada",
        "Nhoque à bolonhesa"
    ],

    5: [
        "Moqueca de peixe",
        "Tilápia grelhada com alcaparras",
        "Bife de picanha suína",
        "Escalope de filé mignon ao molho madeira"
    ],

    6: [
        "Feijoada completa",
        "Feijão tropeiro",
        "Cupim assado na manteiga de garrafa",
        "Picanha fatiada no réchaud",
        "Bacalhau espiritual",
        "Frango crocante"
    ],

    0: [
        "Feijoada completa",
        "Feijão tropeiro",
        "Cupim assado na manteiga de garrafa",
        "Picanha fatiada no réchaud",
        "Bacalhau espiritual",
        "Frango crocante"
    ]

};


function abrirEscolhaMarmita(
    nome,
    preco,
    limite
) {

    marmitaAtual = {
        nome: nome,
        preco: preco,
        limite: limite
    };


    const modal =
        document.getElementById("modalMarmita");

    const texto =
        document.getElementById("textoMarmita");

    const opcoes =
        document.getElementById("opcoesMistura");


    if (!modal || !texto || !opcoes) return;


    texto.innerHTML = `
        <strong>${nome}</strong><br>
        Escolha até ${limite} mistura(s).
    `;


    const diaAtual =
        new Date().getDay();


    const misturas =
        misturasPorDia[diaAtual] || [];


    opcoes.innerHTML = "";


    if (misturas.length === 0) {

        opcoes.innerHTML = `
            <p>
                Não há opções cadastradas para hoje.
            </p>
        `;

    } else {

        misturas.forEach(
            (mistura, index) => {

                const div =
                    document.createElement("div");

                div.style.margin =
                    "10px 0";

                div.innerHTML = `
                    <label
                        style="
                            display:flex;
                            align-items:center;
                            gap:8px;
                            background:#f5f5f5;
                            padding:10px;
                            border-radius:10px;
                            cursor:pointer;
                        "
                    >

                        <input
                            type="checkbox"
                            name="misturaMarmita"
                            value="${mistura}"
                            onchange="limitarMisturas()"
                        >

                        <span>
                            ${mistura}
                        </span>

                    </label>
                `;

                opcoes.appendChild(div);

            }
        );

    }


    modal.classList.add("ativo");

}


function limitarMisturas() {

    if (!marmitaAtual) return;


    const selecionadas =
        document.querySelectorAll(
            'input[name="misturaMarmita"]:checked'
        );


    if (
        selecionadas.length >
        marmitaAtual.limite
    ) {

        const ultima =
            selecionadas[selecionadas.length - 1];

        ultima.checked = false;

        alert(
            `Você pode escolher no máximo ${marmitaAtual.limite} mistura(s).`
        );

    }

}


function fecharEscolhaMarmita() {

    const modal =
        document.getElementById("modalMarmita");

    if (modal) {
        modal.classList.remove("ativo");
    }

    marmitaAtual = null;

}


function confirmarMarmita() {

    if (!marmitaAtual) return;


    const selecionadas =
        Array.from(
            document.querySelectorAll(
                'input[name="misturaMarmita"]:checked'
            )
        );


    if (selecionadas.length === 0) {

        alert(
            "🍱 Escolha pelo menos uma mistura."
        );

        return;

    }


    const misturas =
        selecionadas.map(
            item => item.value
        );


    const nomeCompleto =
        `${marmitaAtual.nome} - ${misturas.join(", ")}`;


    carrinho.push({

        nome: nomeCompleto,

        preco: marmitaAtual.preco,

        quantidade: 1

    });


    atualizarCarrinho();

    fecharEscolhaMarmita();

    alert(
        "✅ Marmita adicionada ao carrinho!"
    );

}


/* =========================================================
   ENVIAR PEDIDO WHATSAPP
========================================================= */

function enviarPedidoWhatsApp() {

    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;

    }


    const nome =
        document.getElementById("nomeCliente")
            ?.value.trim();


    const tipoEntrega =
        document.getElementById("tipoEntrega")
            ?.value;


    const endereco =
        document.getElementById("enderecoCliente")
            ?.value.trim();


    const pagamento =
        document.getElementById("formaPagamento")
            ?.value;


    const observacoes =
        document.getElementById("observacoes")
            ?.value.trim();


    if (!nome) {

        alert("Digite seu nome.");

        return;

    }


    if (
        tipoEntrega === "delivery" &&
        !endereco
    ) {

        alert("Digite seu endereço.");

        return;

    }


    let mensagem =
        "🍔 *RESTAURANTE LANCHONETE MM*%0A";

    mensagem +=
        "📋 *NOVO PEDIDO*%0A%0A";


    mensagem +=
        `👤 *Cliente:* ${nome}%0A%0A`;


    mensagem +=
        "🛒 *ITENS DO PEDIDO:*%0A";


    let totalProdutos = 0;


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;


        totalProdutos += subtotal;


        mensagem +=
            `• ${item.quantidade}x ${item.nome} - ${formatarDinheiro(subtotal)}%0A`;

    });


    let taxaEntrega = 0;


    if (tipoEntrega === "delivery") {

        taxaEntrega =
            TAXA_ENTREGA;

    }


    const totalFinal =
        totalProdutos + taxaEntrega;


    mensagem += "%0A";

    mensagem +=
        `💰 *Produtos:* ${formatarDinheiro(totalProdutos)}%0A`;


    mensagem +=
        `🚚 *Entrega:* ${formatarDinheiro(taxaEntrega)}%0A`;


    mensagem +=
        `💵 *TOTAL:* ${formatarDinheiro(totalFinal)}%0A%0A`;


    if (tipoEntrega === "delivery") {

        mensagem +=
            `🛵 *Entrega:* Delivery%0A`;

        mensagem +=
            `📍 *Endereço:* ${endereco}%0A`;

        mensagem +=
            `⏱️ *Tempo estimado:* 60 a 80 minutos%0A`;

    } else {

        mensagem +=
            "🏪 *Entrega:* Retirada no balcão%0A";

        mensagem +=
            "⏱️ *Retirada:* Seu pedido está sendo preparado para retirada no balcão.%0A";

    }


    mensagem += "%0A";


    mensagem +=
        `💳 *Pagamento:* ${pagamento}%0A`;


    if (observacoes) {

        mensagem +=
            `📝 *Observações:* ${observacoes}%0A`;

    }


    const numeroPedido =
        gerarNumeroPedido();


    mensagem +=
        `%0A🔢 *Pedido nº ${numeroPedido}*`;


    pedidoAtual = {

        numero: numeroPedido,

        nome: nome,

        total: totalFinal,

        endereco:
            tipoEntrega === "delivery"
                ? endereco
                : "Retirada no balcão",

        tipoEntrega:
            tipoEntrega

    };


    localStorage.setItem(
        "ultimoPedidoMM",
        JSON.stringify(pedidoAtual)
    );


    const url =
        `https://wa.me/${WHATSAPP}?text=${mensagem}`;


    window.open(
        url,
        "_blank"
    );


    mostrarSucesso();

}


/* =========================================================
   NÚMERO DO PEDIDO
========================================================= */

function gerarNumeroPedido() {

    const ultimo =
        parseInt(
            localStorage.getItem(
                "numeroPedidoMM"
            ) || "0"
        );


    const novoNumero =
        ultimo + 1;


    localStorage.setItem(
        "numeroPedidoMM",
        novoNumero
    );


    return novoNumero;

}


/* =========================================================
   SUCESSO
========================================================= */

function mostrarSucesso() {

    const tela =
        document.getElementById(
            "pedidoSucesso"
        );


    if (!tela) return;


    const numero =
        document.getElementById(
            "numeroPedidoSucesso"
        );


    const tempo =
        document.getElementById(
            "tempoPedidoSucesso"
        );


    const total =
        document.getElementById(
            "totalPedidoSucesso"
        );


    const endereco =
        document.getElementById(
            "enderecoPedidoSucesso"
        );


    if (pedidoAtual) {

        if (numero) {

            numero.textContent =
                `🔢 Número do pedido: ${pedidoAtual.numero}`;

        }


        if (total) {

            total.textContent =
                `💰 Total: ${formatarDinheiro(pedidoAtual.total)}`;

        }


        if (endereco) {

            endereco.textContent =
                `📍 ${pedidoAtual.endereco}`;

        }


        if (
            pedidoAtual.tipoEntrega ===
            "retirada"
        ) {

            if (tempo) {

                tempo.textContent =
                    "🏪 Seu pedido está sendo preparado para retirada no balcão.";

            }

        } else {

            if (tempo) {

                tempo.textContent =
                    "⏱️ Tempo estimado de entrega: 60 a 80 minutos.";

            }

        }

    }


    tela.classList.add("ativo");

}


function voltarInicio() {

    const tela =
        document.getElementById(
            "pedidoSucesso"
        );


    if (tela) {

        tela.classList.remove("ativo");

    }


    carrinho = [];

    atualizarCarrinho();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        verificarHorario();

        mostrarSobremesasDoDia();

        atualizarCarrinho();


        const tipoEntrega =
            document.getElementById(
                "tipoEntrega"
            );


        const enderecoArea =
            document.getElementById(
                "enderecoArea"
            );


        if (
            tipoEntrega &&
            enderecoArea
        ) {

            if (
                tipoEntrega.value ===
                "retirada"
            ) {

                enderecoArea.style.display =
                    "none";

            } else {

                enderecoArea.style.display =
                    "block";

            }

        }


        setInterval(
            verificarHorario,
            60000
        );

    }
);