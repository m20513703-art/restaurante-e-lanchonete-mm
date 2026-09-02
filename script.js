// ========================================
// RESTAURANTE LANCHONETE MM
// SCRIPT.JS
// ========================================

let carrinho = [];
let pedidoAtual = null;


// ========================================
// ADICIONAR PRODUTO NORMAL
// ========================================

function adicionarCarrinho(nome, preco) {

    let produto = carrinho.find(
        item => item.nome === nome
    );

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: Number(preco),
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


// ========================================
// PERSONALIZAR PIZZA
// ========================================

function abrirPizza(nome, preco) {

    let antigo = document.getElementById("modalPizza");

    if (antigo) {
        antigo.remove();
    }

    let modal = document.createElement("div");

    modal.id = "modalPizza";

    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.75)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";
    modal.style.zIndex = "2000";

    let caixa = document.createElement("div");

    caixa.style.background = "white";
    caixa.style.color = "#222";
    caixa.style.width = "100%";
    caixa.style.maxWidth = "500px";
    caixa.style.maxHeight = "90vh";
    caixa.style.overflowY = "auto";
    caixa.style.borderRadius = "20px";
    caixa.style.padding = "25px";
    caixa.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.4)";

    caixa.innerHTML = `

        <h2>🍕 ${nome}</h2>

        <p>
            Pizza:
            <strong>
                R$ ${Number(preco)
                    .toFixed(2)
                    .replace(".", ",")}
            </strong>
        </p>

        <h3 style="margin-top:20px;">
            🧀 Escolha a borda
        </h3>

        <select id="bordaPizza">

            <option value="0|Sem borda">
                Sem borda — R$ 0,00
            </option>

            <option value="8|Catupiry">
                Catupiry — R$ 8,00
            </option>

            <option value="8|Cheddar">
                Cheddar — R$ 8,00
            </option>

            <option value="7|Requeijão">
                Requeijão — R$ 7,00
            </option>

            <option value="7|Requeijão Escala">
                Requeijão Escala — R$ 7,00
            </option>

            <option value="10|Chocolate">
                Chocolate — R$ 10,00
            </option>

        </select>

        <h3 style="margin-top:20px;">
            ➕ Acréscimos
        </h3>

        <label style="display:block;margin:12px 0;">
            <input
                type="checkbox"
                class="extraPizza"
                value="5|Bacon">
            🥓 Bacon — R$ 5,00
        </label>

        <label style="display:block;margin:12px 0;">
            <input
                type="checkbox"
                class="extraPizza"
                value="4|Muçarela">
            🧀 Muçarela — R$ 4,00
        </label>

        <label style="display:block;margin:12px 0;">
            <input
                type="checkbox"
                class="extraPizza"
                value="4|Catupiry">
            🧀 Catupiry — R$ 4,00
        </label>

        <label style="display:block;margin:12px 0;">
            <input
                type="checkbox"
                class="extraPizza"
                value="4|Cheddar">
            🧀 Cheddar — R$ 4,00
        </label>

        <div
            id="totalPizzaModal"
            style="
                margin-top:20px;
                font-size:25px;
                font-weight:bold;
                text-align:center;
            ">

            Total: R$ ${Number(preco)
                .toFixed(2)
                .replace(".", ",")}

        </div>

        <button
            id="confirmarPizza"
            style="
                width:100%;
                min-height:60px;
                margin-top:18px;
                border:0;
                border-radius:14px;
                background:#16803c;
                color:white;
                font-size:20px;
                font-weight:bold;
                cursor:pointer;
            ">

            🛒 Adicionar pizza

        </button>

        <button
            id="cancelarPizza"
            style="
                width:100%;
                min-height:55px;
                margin-top:10px;
                border:0;
                border-radius:14px;
                background:#d62828;
                color:white;
                font-size:19px;
                font-weight:bold;
                cursor:pointer;
            ">

            ❌ Cancelar

        </button>
    `;

    modal.appendChild(caixa);
    document.body.appendChild(modal);


    let selectBorda =
        document.getElementById("bordaPizza");

    let extras =
        document.querySelectorAll(".extraPizza");

    let totalElemento =
        document.getElementById("totalPizzaModal");


    function calcularPizza() {

        let total = Number(preco);

        let borda =
            selectBorda.value.split("|");

        total += Number(borda[0]);

        extras.forEach(function(extra) {

            if (extra.checked) {

                let partes =
                    extra.value.split("|");

                total += Number(partes[0]);
            }
        });

        totalElemento.innerText =
            "Total: R$ " +
            total.toFixed(2).replace(".", ",");
    }


    selectBorda.addEventListener(
        "change",
        calcularPizza
    );


    extras.forEach(function(extra) {

        extra.addEventListener(
            "change",
            calcularPizza
        );

    });


    document
        .getElementById("cancelarPizza")
        .onclick = function() {

            modal.remove();

        };


    document
        .getElementById("confirmarPizza")
        .onclick = function() {

            let total = Number(preco);

            let descricao = nome;


            // BORDA

            let borda =
                selectBorda.value.split("|");

            let valorBorda =
                Number(borda[0]);

            let nomeBorda =
                borda[1];


            if (valorBorda > 0) {

                total += valorBorda;

                descricao +=
                    " | Borda " +
                    nomeBorda;
            }


            // ACRÉSCIMOS

            let listaExtras = [];


            extras.forEach(function(extra) {

                if (extra.checked) {

                    let partes =
                        extra.value.split("|");

                    total +=
                        Number(partes[0]);

                    listaExtras.push(
                        partes[1]
                    );
                }

            });


            if (listaExtras.length > 0) {

                descricao +=
                    " | Acréscimos: " +
                    listaExtras.join(", ");

            }


            adicionarCarrinho(
                descricao,
                total
            );


            modal.remove();
        };
}


// ========================================
// CARDÁPIO DO DIA
// ========================================

function adicionarCardapioDia() {

    let peso = prompt(
        "🍽️ CARDÁPIO DO DIA\n\n" +
        "Preço: R$ 35,00 por kg\n\n" +
        "Digite o peso em kg.\n" +
        "Exemplo: 0,500 para 500 gramas."
    );

    if (peso === null) {
        return;
    }

    peso = peso.replace(",", ".");
    peso = parseFloat(peso);

    if (isNaN(peso) || peso <= 0) {

        alert(
            "⚠️ Digite um peso válido."
        );

        return;
    }

    let valor = peso * 35;

    carrinho.push({

        nome:
            "Cardápio do Dia - " +
            peso.toFixed(3) +
            " kg",

        preco: valor,

        quantidade: 1
    });

    atualizarCarrinho();
}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    let lista =
        document.getElementById(
            "listaCarrinho"
        );

    let totalElemento =
        document.getElementById(
            "total"
        );


    if (!lista || !totalElemento) {
        return;
    }


    lista.innerHTML = "";

    let total = 0;


    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>🛒 Seu carrinho está vazio.</p>";

        totalElemento.innerText =
            "Total: R$ 0,00";

        return;
    }


    carrinho.forEach(function(item, index) {

        let subtotal =
            item.preco *
            item.quantidade;

        total += subtotal;


        let div =
            document.createElement("div");

        div.className =
            "item-carrinho";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.quantidade}x
                    ${item.nome}
                </strong>

                <br>

                R$ ${subtotal
                    .toFixed(2)
                    .replace(".", ",")}

            </div>

            <div>

                <button
                    onclick="diminuirQuantidade(${index})"
                    style="
                        background:#d35400;
                        margin-right:5px;
                    ">

                    −

                </button>

                <button
                    onclick="aumentarQuantidade(${index})"
                    style="
                        background:#16803c;
                        margin-right:5px;
                    ">

                    +

                </button>

                <button
                    onclick="removerCarrinho(${index})">

                    🗑️

                </button>

            </div>
        `;

        lista.appendChild(div);

    });


    totalElemento.innerText =
        "Total: R$ " +
        total.toFixed(2).replace(".", ",");
}


// ========================================
// AUMENTAR QUANTIDADE
// ========================================

function aumentarQuantidade(index) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


// ========================================
// DIMINUIR QUANTIDADE
// ========================================

function diminuirQuantidade(index) {

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}


// ========================================
// REMOVER PRODUTO
// ========================================

function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ========================================
// FILTRAR CATEGORIA
// ========================================

function filtrarCategoria(categoria) {

    let produtos =
        document.querySelectorAll(
            ".produto"
        );


    produtos.forEach(function(produto) {

        let categoriaProduto =
            produto.getAttribute(
                "data-categoria"
            );


        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });
}


// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!\n\n" +
            "Adicione algum produto primeiro."
        );

        return;
    }


    let finalizacao =
        document.getElementById(
            "finalizacao"
        );


    if (!finalizacao) {
        return;
    }


    finalizacao.style.display =
        "block";


    finalizacao.scrollIntoView({
        behavior: "smooth"
    });
}


// ========================================
// ENTREGA / RETIRADA
// ========================================

function alternarEndereco() {

    let tipo =
        document.getElementById(
            "tipoEntrega"
        );

    let campo =
        document.getElementById(
            "campoEndereco"
        );

    let endereco =
        document.getElementById(
            "enderecoCliente"
        );


    if (
        !tipo ||
        !campo ||
        !endereco
    ) {
        return;
    }


    if (tipo.value === "delivery") {

        campo.style.display =
            "block";

        endereco.required =
            true;

    } else {

        campo.style.display =
            "none";

        endereco.required =
            false;

        endereco.value =
            "";
    }
}


// ========================================
// CONFIRMAR PEDIDO
// ========================================

function confirmarPedido(event) {

    event.preventDefault();


    if (carrinho.length === 0) {

        alert(
            "🛒 Carrinho vazio."
        );

        return;
    }


    let nome =
        document.getElementById(
            "nomeCliente"
        ).value.trim();


    let telefone =
        document.getElementById(
            "telefoneCliente"
        ).value.trim();


    let tipoEntrega =
        document.getElementById(
            "tipoEntrega"
        ).value;


    let endereco =
        document.getElementById(
            "enderecoCliente"
        ).value.trim();


    let pagamento =
        document.getElementById(
            "pagamentoCliente"
        ).value;


    let observacao =
        document.getElementById(
            "observacaoCliente"
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
            "⚠️ Digite seu endereço."
        );

        return;
    }


    if (pagamento === "") {

        alert(
            "⚠️ Escolha uma forma de pagamento."
        );

        return;
    }


    let total = 0;


    carrinho.forEach(function(item) {

        total +=
            item.preco *
            item.quantidade;

    });


    let numeroPedido =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    pedidoAtual = {

        numero: numeroPedido,

        nome: nome,

        telefone: telefone,

        tipoEntrega: tipoEntrega,

        endereco: endereco,

        pagamento: pagamento,

        observacao: observacao,

        itens: carrinho.map(function(item) {

            return {

                nome: item.nome,

                preco: item.preco,

                quantidade:
                    item.quantidade

            };

        }),

        total: total
    };


    mostrarPedidoConfirmado();
}


// ========================================
// MOSTRAR PEDIDO CONFIRMADO
// ========================================

function mostrarPedidoConfirmado() {

    let finalizacao =
        document.getElementById(
            "finalizacao"
        );

    let confirmado =
        document.getElementById(
            "pedidoConfirmado"
        );

    let numero =
        document.getElementById(
            "numeroPedido"
        );

    let resumo =
        document.getElementById(
            "resumoPedido"
        );


    if (
        !finalizacao ||
        !confirmado ||
        !numero ||
        !resumo
    ) {
        return;
    }


    numero.innerText =
        "Pedido #" +
        pedidoAtual.numero;


    let html = "";


    html +=
        "<p><strong>👤 Cliente:</strong> " +
        pedidoAtual.nome +
        "</p>";


    html +=
        "<p><strong>📞 Telefone:</strong> " +
        pedidoAtual.telefone +
        "</p>";


    if (
        pedidoAtual.tipoEntrega ===
        "delivery"
    ) {

        html +=
            "<p><strong>🚴 Entrega</strong></p>";

        html +=
            "<p><strong>📍 Endereço:</strong><br>" +
            pedidoAtual.endereco +
            "</p>";

    } else {

        html +=
            "<p><strong>🏪 Retirada no local</strong></p>";

    }


    html += "<hr>";


    html +=
        "<h3>🛒 Produtos</h3>";


    pedidoAtual.itens.forEach(function(item) {

        let subtotal =
            item.preco *
            item.quantidade;


        html +=
            "<p>" +
            item.quantidade +
            "x " +
            item.nome +
            " — R$ " +
            subtotal
                .toFixed(2)
                .replace(".", ",") +
            "</p>";

    });


    html += "<hr>";


    html +=
        "<p><strong>💳 Pagamento:</strong> " +
        pedidoAtual.pagamento +
        "</p>";


    if (pedidoAtual.observacao !== "") {

        html +=
            "<p><strong>📝 Observação:</strong><br>" +
            pedidoAtual.observacao +
            "</p>";
    }


    html +=
        "<h2>💰 Total: R$ " +
        pedidoAtual.total
            .toFixed(2)
            .replace(".", ",") +
        "</h2>";


    resumo.innerHTML = html;


    finalizacao.style.display =
        "none";

    confirmado.style.display =
        "block";


    confirmado.scrollIntoView({
        behavior: "smooth"
    });
}


// ========================================
// ENVIAR PARA WHATSAPP
// ========================================

function enviarPedidoWhatsApp() {

    if (!pedidoAtual) {

        alert(
            "⚠️ Pedido não encontrado."
        );

        return;
    }


    let mensagem = "";


    mensagem +=
        "🍔 *RESTAURANTE LANCHONETE MM*%0A";

    mensagem +=
        "━━━━━━━━━━━━━━━━━━%0A";

    mensagem +=
        "📋 *PEDIDO #" +
        pedidoAtual.numero +
        "*%0A%0A";


    mensagem +=
        "👤 *Cliente:* " +
        pedidoAtual.nome +
        "%0A";


    mensagem +=
        "📞 *Telefone:* " +
        pedidoAtual.telefone +
        "%0A%0A";


    if (
        pedidoAtual.tipoEntrega ===
        "delivery"
    ) {

        mensagem +=
            "🚴 *ENTREGA*%0A";

        mensagem +=
            "📍 *Endereço:* " +
            pedidoAtual.endereco +
            "%0A%0A";

    } else {

        mensagem +=
            "🏪 *RETIRADA NO LOCAL*%0A%0A";
    }


    mensagem +=
        "🛒 *PRODUTOS*%0A";

    mensagem +=
        "━━━━━━━━━━━━━━━━━━%0A";


    pedidoAtual.itens.forEach(function(item) {

        let subtotal =
            item.preco *
            item.quantidade;


        mensagem +=
            item.quantidade +
            "x " +
            item.nome +
            " - R$ " +
            subtotal
                .toFixed(2)
                .replace(".", ",") +
            "%0A";

    });


    mensagem += "%0A";


    mensagem +=
        "💳 *Pagamento:* " +
        pedidoAtual.pagamento +
        "%0A";


    if (pedidoAtual.observacao !== "") {

        mensagem +=
            "📝 *Observação:* " +
            pedidoAtual.observacao +
            "%0A";
    }


    mensagem +=
        "%0A💰 *TOTAL: R$ " +
        pedidoAtual.total
            .toFixed(2)
            .replace(".", ",") +
        "*";


    let numeroWhatsApp =
        "5519981123401";


    let url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensagem;


    window.open(
        url,
        "_blank"
    );
}


// ========================================
// MODO ESCURO
// ========================================

function alternarAparencia() {

    document.body.classList.toggle(
        "dark"
    );


    let escuro =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "temaMM",
        escuro ? "dark" : "light"
    );


    let botao =
        document.getElementById(
            "btnAparencia"
        );


    if (botao) {

        botao.innerText =
            escuro ? "☀️" : "🌙";
    }
}


// ========================================
// CARREGAR TEMA
// ========================================

function carregarTema() {

    let tema =
        localStorage.getItem(
            "temaMM"
        );


    if (tema === "dark") {

        document.body.classList.add(
            "dark"
        );

    } else {

        document.body.classList.remove(
            "dark"
        );
    }


    let botao =
        document.getElementById(
            "btnAparencia"
        );


    if (botao) {

        botao.innerText =
            tema === "dark"
                ? "☀️"
                : "🌙";
    }
}


// ========================================
// INICIAR
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarTema();

        atualizarCarrinho();

        alternarEndereco();

        filtrarCategoria("todos");

    }
);