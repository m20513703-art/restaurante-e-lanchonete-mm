// ===============================
// CARRINHO
// ===============================

let carrinho = [];

let pizzaSelecionada = "";


// ===============================
// PREÇOS DAS PIZZAS
// ===============================

const precosPizzas = {

    "Calabresa": {
        P: 30,
        M: 40,
        G: 50
    },

    "Muçarela": {
        P: 30,
        M: 40,
        G: 50
    },

    "Margherita": {
        P: 32,
        M: 42,
        G: 52
    },

    "Frango com Catupiry": {
        P: 35,
        M: 45,
        G: 55
    },

    "Portuguesa": {
        P: 35,
        M: 45,
        G: 55
    },

    "Quatro Queijos": {
        P: 36,
        M: 46,
        G: 56
    },

    "Bacon": {
        P: 34,
        M: 44,
        G: 54
    },

    "Atum": {
        P: 34,
        M: 44,
        G: 54
    },

    "Palmito": {
        P: 34,
        M: 44,
        G: 54
    },

    "Vegetariana": {
        P: 34,
        M: 44,
        G: 54
    },

    "Pepperoni": {
        P: 36,
        M: 46,
        G: 56
    },

    "Carne Seca": {
        P: 38,
        M: 48,
        G: 58
    },

    "Lombo com Cream Cheese": {
        P: 38,
        M: 48,
        G: 58
    },

    "Brócolis com Bacon": {
        P: 36,
        M: 46,
        G: 56
    },

    "Lombo ao Alho": {
        P: 36,
        M: 46,
        G: 56
    },

    "Moda da Casa": {
        P: 40,
        M: 50,
        G: 60
    },

    "Brigadeiro": {
        P: 35,
        M: 45,
        G: 55
    },

    "Prestígio": {
        P: 35,
        M: 45,
        G: 55
    },

    "Romeu e Julieta": {
        P: 35,
        M: 45,
        G: 55
    },

    "Banana com Canela": {
        P: 35,
        M: 45,
        G: 55
    }

};


// ===============================
// PREÇOS DAS BORDAS
// ===============================

const precosBordas = {

    "": 0,

    "Catupiry": 6,

    "Cheddar": 6,

    "Mussarela": 6,

    "Cream Cheese": 7,

    "Bacon com Cheddar": 9,

    "Nutella": 9

};


// ===============================
// PREÇOS DOS EXTRAS
// ===============================

const precosExtras = {

    "Catupiry": 3,

    "Cheddar": 3,

    "Bacon": 4,

    "Calabresa": 4,

    "Frango": 4,

    "Pepperoni": 5

};


// ===============================
// MOSTRAR CATEGORIA
// ===============================

function mostrarCategoria(categoria) {

    const categorias =
        document.querySelectorAll(".categoria");

    categorias.forEach(function(secao) {

        secao.style.display = "none";

    });


    const escolhida =
        document.getElementById(categoria);

    if (escolhida) {

        escolhida.style.display = "block";

    }

}


// ===============================
// ABRIR PIZZA
// ===============================

function abrirPizza(nome) {

    pizzaSelecionada = nome;

    document.getElementById("nomePizza").textContent =
        "🍕 " + nome;


    document.getElementById("modalPizza").style.display =
        "flex";


    // Sempre começa como pizza inteira

    document.querySelector(
        'input[name="tipoPizza"][value="inteira"]'
    ).checked = true;


    document.getElementById("segundaPizza").style.display =
        "none";

}


// ===============================
// FECHAR PIZZA
// ===============================

function fecharPizza() {

    document.getElementById("modalPizza").style.display =
        "none";

}


// ===============================
// ALTERAR TIPO DA PIZZA
// ===============================

function alterarTipoPizza() {

    const tipo =
        document.querySelector(
            'input[name="tipoPizza"]:checked'
        ).value;


    const segunda =
        document.getElementById("segundaPizza");


    if (tipo === "meio") {

        segunda.style.display = "block";

    } else {

        segunda.style.display = "none";

    }

}


// ===============================
// ADICIONAR PIZZA
// ===============================

function adicionarPizza() {

    const tamanho =
        document.getElementById("tamanhoPizza").value;


    const tipo =
        document.querySelector(
            'input[name="tipoPizza"]:checked'
        ).value;


    let nome = "";

    let preco = 0;


    // ===========================
    // PIZZA INTEIRA
    // ===========================

    if (tipo === "inteira") {

        nome =
            pizzaSelecionada +
            " (" +
            tamanho +
            ")";


        preco =
            precosPizzas[pizzaSelecionada][tamanho];

    }


    // ===========================
    // PIZZA MEIO A MEIO
    // ===========================

    if (tipo === "meio") {

        const sabor2 =
            document.getElementById("sabor2").value;


        nome =
            "½ " +
            pizzaSelecionada +
            " + ½ " +
            sabor2 +
            " (" +
            tamanho +
            ")";


        const preco1 =
            precosPizzas[pizzaSelecionada][tamanho];


        const preco2 =
            precosPizzas[sabor2][tamanho];


        // Cobra o maior preço dos dois sabores

        preco =
            Math.max(preco1, preco2);

    }


    // ===========================
    // BORDA
    // ===========================

    const borda =
        document.getElementById("borda").value;


    if (borda !== "") {

        nome +=
            " | Borda: " +
            borda;


        preco +=
            precosBordas[borda];

    }


    // ===========================
    // EXTRAS
    // ===========================

    const extras =
        document.querySelectorAll(".extra:checked");


    let listaExtras = [];


    extras.forEach(function(extra) {

        const nomeExtra = extra.value;

        listaExtras.push(nomeExtra);


        preco +=
            precosExtras[nomeExtra];

    });


    if (listaExtras.length > 0) {

        nome +=
            " | Extras: " +
            listaExtras.join(", ");

    }


    // ===========================
    // COLOCAR NO CARRINHO
    // ===========================

    carrinho.push({

        nome: nome,

        preco: preco,

        quantidade: 1

    });


    atualizarCarrinho();


    // ===========================
    // LIMPAR ESCOLHAS
    // ===========================

    document.querySelectorAll(".extra").forEach(
        function(extra) {

            extra.checked = false;

        }
    );


    document.getElementById("borda").value = "";

    fecharPizza();


    alert("🍕 Pizza adicionada ao carrinho!");

}


// ===============================
// ADICIONAR OUTROS PRODUTOS
// ===============================

function adicionarProduto(nome, preco) {

    carrinho.push({

        nome: nome,

        preco: Number(preco),

        quantidade: 1

    });


    atualizarCarrinho();

}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const elemento =
        document.getElementById("carrinho");


    const totalElemento =
        document.getElementById("total");


    if (carrinho.length === 0) {

        elemento.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        totalElemento.textContent =
            "R$ 0,00";

        return;

    }


    elemento.innerHTML = "";


    let total = 0;


    carrinho.forEach(function(item, indice) {

        const subtotal =
            item.preco *
            item.quantidade;


        total += subtotal;


        const div =
            document.createElement("div");


        div.className =
            "item-carrinho";


        div.innerHTML = `

            <p>
                <strong>${item.nome}</strong>
            </p>

            <p>
                Quantidade:
                ${item.quantidade}
            </p>

            <p>
                Valor:
                R$ ${subtotal.toFixed(2).replace(".", ",")}
            </p>

            <button onclick="aumentarQuantidade(${indice})">
                ➕
            </button>

            <button onclick="diminuirQuantidade(${indice})">
                ➖
            </button>

            <button onclick="removerProduto(${indice})">
                🗑️
            </button>

            <hr>

        `;


        elemento.appendChild(div);

    });


    totalElemento.textContent =
        "R$ " +
        total.toFixed(2).replace(".", ",");

}


// ===============================
// AUMENTAR QUANTIDADE
// ===============================

function aumentarQuantidade(indice) {

    carrinho[indice].quantidade++;

    atualizarCarrinho();

}


// ===============================
// DIMINUIR QUANTIDADE
// ===============================

function diminuirQuantidade(indice) {

    carrinho[indice].quantidade--;


    if (carrinho[indice].quantidade <= 0) {

        carrinho.splice(indice, 1);

    }


    atualizarCarrinho();

}


// ===============================
// REMOVER
// ===============================

function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


// ===============================
// LIMPAR CARRINHO
// ===============================

function limparCarrinho() {

    if (carrinho.length === 0) {

        alert("O carrinho já está vazio.");

        return;

    }


    if (
        confirm(
            "Deseja realmente limpar o carrinho?"
        )
    ) {

        carrinho = [];

        atualizarCarrinho();

    }

}


// ===============================
// FINALIZAR PEDIDO
// ===============================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;

    }


    let mensagem =
        "🍔 RESTAURANTE E LANCHONETE MM\n\n";


    mensagem +=
        "🛒 PEDIDO:\n\n";


    let total = 0;


    carrinho.forEach(function(item) {

        const subtotal =
            item.preco *
            item.quantidade;


        total += subtotal;


        mensagem +=
            item.quantidade +
            "x " +
            item.nome +
            "\n";


        mensagem +=
            "R$ " +
            subtotal.toFixed(2).replace(".", ",") +
            "\n\n";

    });


    mensagem +=
        "💰 TOTAL: R$ " +
        total.toFixed(2).replace(".", ",");


    alert(mensagem);

}


// ===============================
// INICIAR SITE
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarCategoria("pizzas");

        atualizarCarrinho();

    }
);