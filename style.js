/* =========================================================
   RESTAURANTE LANCHONETE MM
   SCRIPT.JS - NOVO SISTEMA
========================================================= */

let carrinho = [];
let pedidoAtual = null;
let marmitaAtual = null;

const WHATSAPP = "5519981123401";
const TAXA_ENTREGA = 5.00;


/* =========================================================
   FORMATAÇÃO
========================================================= */

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   NAVEGAÇÃO ENTRE PÁGINAS
========================================================= */

function abrirPagina(id) {

    const inicio = document.getElementById("paginaInicio");

    if (inicio) {
        inicio.style.display = "none";
    }

    document.querySelectorAll(".pagina-cardapio").forEach(
        pagina => {
            pagina.style.display = "none";
        }
    );

    const pagina = document.getElementById(id);

    if (pagina) {
        pagina.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


function voltarInicio() {

    document.querySelectorAll(".pagina-cardapio").forEach(
        pagina => {
            pagina.style.display = "none";
        }
    );

    const inicio = document.getElementById("paginaInicio");

    if (inicio) {
        inicio.style.display = "block";
    }

    const sucesso =
        document.getElementById("pedidoSucesso");

    if (sucesso) {
        sucesso.classList.remove("ativo");
    }

    carrinho = [];

    atualizarCarrinho();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PRODUTOS
========================================================= */

const pizzasSalgadas = [

    ["Atum", "Molho de tomate, atum sólido e cebola fatiada", 52],
    ["Bacon", "Molho de tomate, mussarela, bacon crocante e cebola", 50],
    ["Baiana", "Molho de tomate, mussarela, calabresa moída, ovo, pimenta calabresa e cebola", 52],
    ["Calabresa", "Molho de tomate, mussarela, calabresa fatiada e cebola", 48],
    ["Calabresa com Catupiry", "Molho de tomate, mussarela, calabresa fatiada e requeijão cremoso", 52],
    ["Churrasco", "Molho de tomate, mussarela, tiras de carne grelhada, alho frito e molho chimichurri", 62],
    ["Frango com Catupiry", "Molho de tomate, mussarela, frango desfiado e requeijão cremoso", 52],
    ["Lombo com Catupiry", "Molho de tomate, mussarela, lombo canadense fatiado e requeijão cremoso", 54],
    ["Marguerita", "Molho de tomate, mussarela, fatias de tomate e manjericão fresco", 48],
    ["Milho com Bacon", "Molho de tomate, mussarela, milho verde e bacon em cubos", 50],
    ["Moda da Casa", "Molho de tomate, mussarela, contrafilé em pedaços, presunto, calabresa, ovos, milho, catupiry, cebola e azeitonas", 65],
    ["Mussarela", "Molho de tomate, mussarela, rodelas de tomate e orégano", 45],
    ["Napolitana", "Molho de tomate, mussarela, tomate fatiado, parmesão e alho frito", 48],
    ["Palmito", "Molho de tomate, mussarela e palmito fatiado", 54],
    ["Portuguesa", "Molho de tomate, mussarela, presunto, ovo cozido, cebola, ervilha e azeitona", 52],
    ["Presunto e Queijo", "Molho de tomate, mussarela, presunto fatiado e orégano", 48],
    ["Quatro Queijos", "Molho de tomate, mussarela, provolone, parmesão e catupiry", 55],
    ["Strogonoff de Carne", "Molho de tomate, mussarela, strogonoff de carne bovina e batata palha crocante", 60],
    ["Tilápia", "Molho de tomate, mussarela, tiras de filé de tilápia empanadas e molho tártaro", 58],
    ["Vegetariana", "Molho de tomate, mussarela, escarola, milho, ervilha, palmito e tomate", 52]

];


const pizzasDoces = [

    ["Banana com Canela", "Mussarela, banana fatiada, açúcar, canela e leite condensado", 45],
    ["Beijinho", "Chocolate branco derretido, leite condensado e coco ralado", 48],
    ["Brigadeiro", "Chocolate ao leite derretido e granulado", 45],
    ["Chocoloco", "Chocolate branco derretido com raspas de chocolate ao leite", 50],
    ["Confeti", "Chocolate ao leite coberto com confeitos coloridos", 48],
    ["Doce de Leite", "Doce de leite cremoso polvilhado com coco ralado", 45],
    ["Paçoca", "Doce de leite cremoso coberto com paçoca esfarelada", 48],
    ["Prestígio", "Chocolate ao leite derretido e coco ralado", 48],
    ["Romeu e Julieta", "Mussarela e goiabada derretida", 45],
    ["Sensação", "Chocolate ao leite com morangos fatiados", 52]

];


const bordas = [

    ["Catupiry Original", "Borda recheada", 10],
    ["Cheddar", "Borda recheada", 10],
    ["Mussarela", "Borda recheada", 12],
    ["Provolone", "Borda recheada", 12],
    ["Requeijão com Alho Frito", "Borda recheada", 11],
    ["Vulcão / Pãozinho", "Borda recheada", 15],
    ["Chocolate ao Leite", "Borda doce", 12],
    ["Chocolate Branco", "Borda doce", 12],
    ["Doce de Leite", "Borda doce", 10],
    ["Goiabada", "Borda doce", 10]

];


const complementos = [

    ["Azeite Trufado", "Adicional", 8],
    ["Bacon Crocante Extra", "Adicional", 7],
    ["Catupiry Extra", "Adicional", 8],
    ["Cheddar Extra", "Adicional", 7],
    ["Cebola Crispy", "Adicional", 5],
    ["Geleia de Pimenta", "Adicional", 6],
    ["Mussarela Extra", "Adicional", 8],
    ["Ovo Cozido Extra", "Adicional", 4],
    ["Parmesão Ralado Frio", "Adicional", 6],
    ["Pimenta Biquinho", "Adicional", 5]

];


const lanches = [

    ["X-Burguer", "Pão brioche, hambúrguer 150g, queijo prato e maionese", 20],
    ["X-Salada", "Pão brioche, hambúrguer 150g, queijo, alface, tomate e maionese", 22],
    ["X-Bacon", "Pão brioche, hambúrguer 150g, queijo, bacon e maionese", 26],
    ["X-Egg", "Pão brioche, hambúrguer 150g, queijo, ovo, alface, tomate e maionese", 24],
    ["X-Frango", "Pão brioche, filé de frango, queijo, alface, tomate e maionese", 22],
    ["X-Tudo", "Pão brioche, hambúrguer 150g, queijo, presunto, bacon, ovo, salada e maionese", 32],
    ["X-Calabresa", "Pão brioche, calabresa, queijo prato, cebola e maionese", 23],
    ["X-Duplo Cheddar", "Pão brioche, 2 hambúrgueres 150g, cheddar duplo e bacon", 34],
    ["X-Contrafilé", "Pão brioche, contrafilé, queijo prato, cebola e maionese", 30],
    ["X-Vegetariano", "Pão brioche, hambúrguer vegetal, queijo, salada e maionese", 25]

];


const esfihas = [

    ["Atum", "Atum, cebola e azeitona", 7.50],
    ["Bacon com Queijo", "Mussarela e bacon", 7.50],
    ["Banana com Canela", "Banana, canela e leite condensado", 6.50],
    ["Beijinho", "Chocolate branco e coco", 7],
    ["Brigadeiro", "Chocolate ao leite e granulado", 6.50],
    ["Calabresa", "Calabresa moída", 5.50],
    ["Calabresa com Catupiry", "Calabresa moída e catupiry", 6.50],
    ["Carne", "Carne moída temperada", 5.50],
    ["Carne com Queijo", "Carne moída e mussarela", 6.50],
    ["Doce de Leite", "Doce de leite cremoso", 6.50],
    ["Escarola com Bacon", "Escarola, bacon e mussarela", 7],
    ["Frango", "Frango desfiado", 5.50],
    ["Frango com Catupiry", "Frango e catupiry", 6.50],
    ["Lombo com Catupiry", "Lombo canadense e catupiry", 7.50],
    ["Marguerita", "Mussarela, tomate e manjericão", 6.50],
    ["Milho com Catupiry", "Milho verde e catupiry", 6],
    ["Moda da Casa", "Carne, presunto, calabresa, mussarela e catupiry", 8],
    ["Mussarela", "Mussarela derretida", 5.50],
    ["Palmito", "Palmito picado com tomate", 7.50],
    ["Pepperoni", "Mussarela e pepperoni", 8],
    ["Prestígio", "Chocolate ao leite e coco", 7],
    ["Quatro Queijos", "Mussarela, provolone, parmesão e catupiry", 7.50],
    ["Romeu e Julieta", "Mussarela e goiabada", 6.50],
    ["Sensação", "Chocolate ao leite e morango", 7.50],
    ["Tomate Seco com Rúcula", "Mussarela de búfala, tomate seco e rúcula", 8]

];


const hotDogs = [

    ["Dog Simples", "Pão, 1 salsicha, molho, milho, batata palha e maionese", 14],
    ["Dog Duplo", "Pão, 2 salsichas, molho, purê, milho, batata palha e maionese", 18],
    ["Dog Frango", "Pão, 1 salsicha, frango, catupiry, molho e batata palha", 20],
    ["Dog Bacon", "Pão, 1 salsicha, bacon, cheddar, molho e batata palha", 22],
    ["Dog Tudo", "Pão, 2 salsichas, frango, bacon, purê, milho, cheddar, catupiry e batata palha", 26]

];


const porcoes = [

    ["Batata Frita Tradicional (500g)", "Batata frita crocante", 28],
    ["Batata Frita com Cheddar e Bacon (600g)", "Batata, cheddar e bacon", 38],
    ["Calabresa Acebolada (500g)", "Calabresa acebolada", 35],
    ["Frango a Passarinho (700g)", "Frango frito temperado", 42],
    ["Isca de Tilápia (500g)", "Filé de tilápia empanado", 48],
    ["Contrafilé Acebolado na Chapa (500g)", "Contrafilé acebolado na chapa", 55]

];


/* =========================================================
   CRIAR CARDS
========================================================= */

function criarCards(lista, elementoId) {

    const container = document.getElementById(elementoId);

    if (!container) return;

    container.innerHTML = "";

    lista.forEach(produto => {

        const nome = produto[0];
        const descricao = produto[1];
        const preco = produto[2];

        const card = document.createElement("div");

        card.className = "produto";

        card.innerHTML = `

            <h3>${nome}</h3>

            <p>
                ${descricao}
            </p>

            <strong>
                ${dinheiro(preco)}
            </strong>

            <button
                onclick="adicionarProduto('${nome.replace(/'/g, "\\'")}', ${preco})"
            >
                🛒 Adicionar
            </button>

        `;

        container.appendChild(card);

    });
}


/* =========================================================
   BEBIDAS
========================================================= */

const refrigerantesLata = [

    ["Coca-Cola", "Lata 350ml", 6.50],
    ["Coca-Cola Zero", "Lata 350ml", 6.50],
    ["Guaraná", "Lata 350ml", 6.50],
    ["Fanta", "Lata 350ml", 6.50],
    ["Sprite", "Lata 350ml", 6.50]

];


const refrigerantes2L = [

    ["Coca-Cola", "Garrafa 2 litros", 14],
    ["Guaraná Antarctica", "Garrafa 2 litros", 14],
    ["Fanta", "Garrafa 2 litros", 14]

];


const aguas = [

    ["Água Mineral sem Gás", "500ml", 4],
    ["Água Mineral com Gás", "500ml", 4.50]

];


/* =========================================================
   MARMITAS
========================================================= */

const marmitas = [

    ["Marmita Pequena", "Escolha até 1 mistura", 20, 1],
    ["Marmita Média", "Escolha até 2 misturas", 25, 2],
    ["Marmita Grande", "Escolha até 3 misturas", 28, 3],
    ["Marmita Comercial", "Escolha até 4 misturas", 50, 4]

];


const misturasPorDia = {

    0: [
        "Feijoada",
        "Feijão tropeiro",
        "Picanha no réchaud",
        "Cupim na manteiga",
        "Bacalhau",
        "Massas especiais"
    ],

    1: [
        "Contrafilé acebolado",
        "Frango grelhado",
        "Peixe empanado"
    ],

    2: [
        "Strogonoff de frango",
        "Frango assado",
        "Pernil acebolado"
    ],

    3: [
        "Feijoada completa",
        "Bife de maminha",
        "Peixe ao molho de camarão",
        "Torresmo"
    ],

    4: [
        "Parmegiana de carne",
        "Costelinha barbecue",
        "Nhoque à bolonhesa",
        "Polenta frita"
    ],

    5: [
        "Moqueca de peixe",
        "Tilápia com alcaparras",
        "Escalope de mignon",
        "Pirão",
        "Batata rústica"
    ],

    6: [
        "Feijoada",
        "Feijão tropeiro",
        "Picanha no réchaud",
        "Cupim na manteiga",
        "Bacalhau",
        "Massas especiais"
    ]

};


/* =========================================================
   ABRIR MARMITA
========================================================= */

function abrirEscolhaMarmita(nome, preco, limite) {

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
        <strong>${nome}</strong>
        <br>
        Escolha até ${limite} mistura(s).
    `;

    const dia = new Date().getDay();

    const misturas =
        misturasPorDia[dia] || [];

    opcoes.innerHTML = "";

    misturas.forEach((mistura, index) => {

        const div = document.createElement("div");

        div.innerHTML = `

            <label class="opcao-mistura">

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

    });

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

        selecionadas[
            selecionadas.length - 1
        ].checked = false;

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

    adicionarProduto(
        nomeCompleto,
        marmitaAtual.preco
    );

    fecharEscolhaMarmita();
}


/* =========================================================
   ADICIONAR PRODUTO
========================================================= */

function adicionarProduto(nome, preco) {

    const existente =
        carrinho.find(
            item => item.nome === nome
        );

    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    alert(
        `✅ ${nome} foi adicionado ao carrinho!`
    );
}


/* =========================================================
   CARRINHO
========================================================= */

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const total =
        document.getElementById("totalCarrinho");

    const quantidade =
        document.getElementById("quantidadeCarrinho");

    if (!lista || !total) return;

    lista.innerHTML = "";

    let totalProdutos = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;

        totalProdutos += subtotal;

        quantidadeTotal += item.quantidade;

        const div =
            document.createElement("div");

        div.className =
            "item-carrinho";

        div.innerHTML = `

            <div>

                <strong>
                    ${item.nome}
                </strong>

                <small>
                    ${dinheiro(item.preco)} cada
                </small>

                <small>
                    Subtotal:
                    ${dinheiro(subtotal)}
                </small>

            </div>

            <div class="controle-quantidade">

                <button
                    onclick="diminuirQuantidade(${index})"
                >
                    −
                </button>

                <strong>
                    ${item.quantidade}
                </strong>

                <button
                    onclick="aumentarQuantidade(${index})"
                >
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

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="mensagem-vazia">
                🛒 Seu carrinho está vazio.
            </div>
        `;

    }

    total.innerHTML = `
        <h3>
            Total:
            ${dinheiro(totalProdutos)}
        </h3>
    `;

    if (quantidade) {
        quantidade.textContent =
            quantidadeTotal;
    }
}


function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


function diminuirQuantidade(index) {

    if (
        carrinho[index].quantidade > 1
    ) {

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

        carrinhoElemento.classList.add(
            "ativo"
        );
    }

    atualizarCarrinho();
}


function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {

        carrinhoElemento.classList.remove(
            "ativo"
        );
    }
}


/* =========================================================
   CHECKOUT
========================================================= */

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

    if (checkout) {

        checkout.classList.add(
            "ativo"
        );

        atualizarCheckout();
    }
}


function voltarCardapio() {

    const checkout =
        document.getElementById("checkout");

    if (checkout) {

        checkout.classList.remove(
            "ativo"
        );
    }
}


/* =========================================================
   CHECKOUT / TOTAL
========================================================= */

function atualizarCheckout() {

    const resumo =
        document.getElementById(
            "resumoCheckout"
        );

    if (!resumo) return;

    let totalProdutos = 0;

    carrinho.forEach(item => {

        totalProdutos +=
            item.preco * item.quantidade;

    });

    const tipo =
        document.getElementById(
            "tipoEntrega"
        );

    let taxa = 0;

    if (
        tipo &&
        tipo.value === "delivery"
    ) {

        taxa = TAXA_ENTREGA;

    }

    const totalFinal =
        totalProdutos + taxa;

    resumo.innerHTML = `

        <div class="resumo-final">

            <p>
                Produtos:
                <strong>
                    ${dinheiro(totalProdutos)}
                </strong>
            </p>

            <p>
                Entrega:
                <strong>
                    ${dinheiro(taxa)}
                </strong>
            </p>

            <hr>

            <h3>
                TOTAL:
                ${dinheiro(totalFinal)}
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

        if (
            event.target.id ===
            "tipoEntrega"
        ) {

            const area =
                document.getElementById(
                    "enderecoArea"
                );

            if (
                event.target.value ===
                "delivery"
            ) {

                if (area) {
                    area.style.display =
                        "block";
                }

            } else {

                if (area) {
                    area.style.display =
                        "none";
                }
            }

            atualizarCheckout();
        }
    }
);


/* =========================================================
   HORÁRIO
========================================================= */

function verificarHorario() {

    const status =
        document.getElementById(
            "statusRestaurante"
        );

    if (!status) return;

    const agora = new Date();

    const dia =
        agora.getDay();

    const minutos =
        agora.getHours() * 60 +
        agora.getMinutes();

    let aberto = false;
    let mensagem = "";


    /* ALMOÇO */

    if (
        dia >= 1 &&
        dia <= 5
    ) {

        if (
            minutos >= 660 &&
            minutos < 900
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO - ALMOÇO";
        }

    } else {

        if (
            minutos >= 690 &&
            minutos < 930
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO - ALMOÇO";
        }
    }


    /* NOITE */

    if (
        dia >= 2 &&
        dia <= 6
    ) {

        if (
            minutos >= 1080 &&
            minutos < 1350
        ) {

            aberto = true;

            mensagem =
                "🟢 ABERTO - NOITE";
        }
    }


    if (!aberto) {

        mensagem =
            "🔴 FECHADO";
    }

    status.textContent =
        mensagem;
}


/* =========================================================
   SOBREMESAS DO DIA
========================================================= */

const sobremesasPorDia = {

    0: [
        "🍫 Tradição: Mousse aveludada de chocolate meio amargo",
        "🍑 Frutada: Pavê de pêssego em calda com creme branco",
        "🥭 Leve/Fit: Manga fatiada com raspas de coco queimado",
        "🧀 Rápida: Romeu e Julieta"
    ],

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
        "🍈 Rápida: Creme de papaya"
    ],

    3: [
        "🍰 Tradição: Pavê de biscoito champagne e baunilha",
        "🍋 Frutada: Torta gelada de limão",
        "🍓 Leve/Fit: Sorbet de morango e banana",
        "🍓 Rápida: Morango com leite condensado"
    ],

    4: [
        "🍚 Tradição: Arroz doce cremoso com canela",
        "🍑 Frutada: Compota de ameixa com creme de baunilha",
        "🍎 Leve/Fit: Maçã assada com nozes",
        "🍮 Rápida: Mousse de doce de leite"
    ],

    5: [
        "🍫 Tradição: Petit gâteau com sorvete",
        "🍎 Frutada: Torta aberta de maçã",
        "🍓 Leve/Fit: Espetinho de frutas",
        "🍫 Rápida: Fondue de chocolate"
    ],

    6: [
        "🍰 Tradição: Torta Holandesa",
        "🍓 Frutada: Cheesecake com frutas vermelhas",
        "🥑 Leve/Fit: Mousse de cacau 70%",
        "🍨 Rápida: Sorvete de creme com brigadeiro"
    ]

};


function mostrarSobremesasDoDia() {

    const container =
        document.getElementById(
            "sobremesasDoDia"
        );

    if (!container) return;

    const dia =
        new Date().getDay();

    const lista =
        sobremesasPorDia[dia];

    container.innerHTML = "";

    if (!lista) return;

    lista.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "dia-sobremesa";

        div.innerHTML = `
            <p>${item}</p>
        `;

        container.appendChild(div);

    });
}


/* =========================================================
   ENVIAR WHATSAPP
========================================================= */

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
        )?.value.trim();

    const tipo =
        document.getElementById(
            "tipoEntrega"
        )?.value;

    const endereco =
        document.getElementById(
            "enderecoCliente"
        )?.value.trim();

    const pagamento =
        document.getElementById(
            "formaPagamento"
        )?.value;

    const observacoes =
        document.getElementById(
            "observacoes"
        )?.value.trim();


    if (!nome) {

        alert(
            "Digite seu nome."
        );

        return;
    }


    if (
        tipo === "delivery" &&
        !endereco
    ) {

        alert(
            "Digite seu endereço."
        );

        return;
    }


    if (!pagamento) {

        alert(
            "Escolha a forma de pagamento."
        );

        return;
    }


    let totalProdutos = 0;

    let itensTexto = "";


    carrinho.forEach(item => {

        const subtotal =
            item.preco *
            item.quantidade;

        totalProdutos +=
            subtotal;

        itensTexto +=
            `• ${item.quantidade}x ${item.nome} - ${dinheiro(subtotal)}\n`;

    });


    const taxa =
        tipo === "delivery"
            ? TAXA_ENTREGA
            : 0;


    const total =
        totalProdutos + taxa;


    const numeroPedido =
        gerarNumeroPedido();


    let mensagem =

`🍔 RESTAURANTE LANCHONETE MM
📋 NOVO PEDIDO

🔢 Pedido nº ${numeroPedido}

👤 Cliente: ${nome}

🛒 ITENS DO PEDIDO:
${itensTexto}
💰 Produtos: ${dinheiro(totalProdutos)}
🚚 Entrega: ${dinheiro(taxa)}
💵 TOTAL: ${dinheiro(total)}

`;


    if (tipo === "delivery") {

        mensagem +=

`🛵 Tipo: Delivery
📍 Endereço: ${endereco}
⏱️ Tempo estimado: 60 a 80 minutos

`;

    } else {

        mensagem +=

`🏪 Tipo: Retirada no balcão
⏱️ Seu pedido está sendo preparado para retirada no balcão.

`;
    }


    mensagem +=
        `💳 Pagamento: ${pagamento}\n`;


    if (observacoes) {

        mensagem +=
            `📝 Observações: ${observacoes}\n`;
    }


    pedidoAtual = {

        numero: numeroPedido,

        nome: nome,

        total: total,

        endereco:
            tipo === "delivery"
                ? endereco
                : "Retirada no balcão",

        tipoEntrega: tipo

    };


    localStorage.setItem(
        "ultimoPedidoMM",
        JSON.stringify(
            pedidoAtual
        )
    );


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;


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

    const novo =
        ultimo + 1;

    localStorage.setItem(
        "numeroPedidoMM",
        novo
    );

    return novo;
}


/* =========================================================
   TELA DE SUCESSO
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
                `💰 Total: ${dinheiro(pedidoAtual.total)}`;
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


    tela.classList.add(
        "ativo"
    );
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* PIZZAS */

        criarCards(
            pizzasSalgadas,
            "listaPizzasSalgadas"
        );

        criarCards(
            pizzasDoces,
            "listaPizzasDoces"
        );

        criarCards(
            bordas,
            "listaBordas"
        );

        criarCards(
            complementos,
            "listaComplementos"
        );


        /* LANCHES */

        criarCards(
            lanches,
            "listaLanches"
        );


        /* ESFIHAS */

        criarCards(
            esfihas,
            "listaEsfihas"
        );


        /* HOT DOG */

        criarCards(
            hotDogs,
            "listaHotDog"
        );


        /* PORÇÕES */

        criarCards(
            porcoes,
            "listaPorcoes"
        );


        /* BEBIDAS */

        criarCards(
            refrigerantesLata,
            "listaRefriLata"
        );

        criarCards(
            refrigerantes2L,
            "listaRefri2L"
        );

        criarCards(
            aguas,
            "listaAguas"
        );


        /* MARMITAS */

        const listaMarmitas =
            document.getElementById(
                "listaMarmitas"
            );

        if (listaMarmitas) {

            listaMarmitas.innerHTML = "";

            marmitas.forEach(
                marmita => {

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "produto";

                    card.innerHTML = `

                        <h3>
                            🍱 ${marmita[0]}
                        </h3>

                        <p>
                            ${marmita[1]}
                        </p>

                        <strong>
                            ${dinheiro(marmita[2])}
                        </strong>

                        <button
                            onclick="abrirEscolhaMarmita(
                                '${marmita[0]}',
                                ${marmita[2]},
                                ${marmita[3]}
                            )"
                        >
                            🍱 Escolher mistura
                        </button>

                    `;

                    listaMarmitas.appendChild(
                        card
                    );
                }
            );
        }


        /* OUTRAS FUNÇÕES */

        verificarHorario();

        mostrarSobremesasDoDia();

        atualizarCarrinho();


        /* ENTREGA */

        const tipo =
            document.getElementById(
                "tipoEntrega"
            );

        const area =
            document.getElementById(
                "enderecoArea"
            );

        if (
            tipo &&
            area
        ) {

            if (
                tipo.value ===
                "delivery"
            ) {

                area.style.display =
                    "block";

            } else {

                area.style.display =
                    "none";
            }
        }


        setInterval(
            verificarHorario,
            60000
        );

    }
);