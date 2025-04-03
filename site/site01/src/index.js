document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    body.innerHTML = `
        <nav>
            <ul>
                <li><a href="#cadastro">Cadastro</a></li>
                <li><a href="#cardapio">Cardápio</a></li>
                <li><a href="#carrinho">Carrinho</a></li>
                <li><a href="#pagamento">Pagamento</a></li>
            </ul>
        </nav>
        <section id="cadastro">
            <h2>Cadastro de Produto</h2>
            <form id="formCadastro">
                <input type="text" id="nome" placeholder="Nome do Produto" required>
                <input type="text" id="descricao" placeholder="Descrição" required>
                <input type="number" id="preco" placeholder="Preço" required>
                <button type="submit">Adicionar</button>
            </form>
        </section>
        <section id="cardapio">
            <h2>Cardápio</h2>
            <ul id="listaProdutos"></ul>
        </section>
        <section id="carrinho">
            <h2>Carrinho</h2>
            <ul id="listaCarrinho"></ul>
            <button id="finalizarCompra">Finalizar Compra</button>
        </section>
        <section id="pagamento" style="display: none;">
            <h2>Pagamento</h2>
            <label for="metodoPagamento">Escolha o método de pagamento:</label>
            <select id="metodoPagamento">
                <option value="cartao">Cartão de Crédito</option>
                <option value="debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
            </select>
            <div id="detalhesPagamento"></div>
            <button id="confirmarPagamento">Confirmar Pagamento</button>
        </section>
    `;

    const formCadastro = document.getElementById("formCadastro");
    const listaProdutos = document.getElementById("listaProdutos");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");
    const secaoPagamento = document.getElementById("pagamento");
    const confirmarPagamento = document.getElementById("confirmarPagamento");
    const metodoPagamento = document.getElementById("metodoPagamento");
    const detalhesPagamento = document.getElementById("detalhesPagamento");
    
    let produtos = [];
    let carrinho = [];

    formCadastro.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = document.getElementById("preco").value;

        if (nome && descricao && preco) {
            const produto = { nome, descricao, preco };
            produtos.push(produto);
            atualizarListaProdutos();
            formCadastro.reset();
        }
    });

    function atualizarListaProdutos() {
        listaProdutos.innerHTML = "";
        produtos.forEach((produto, index) => {
            const item = document.createElement("li");
            item.innerHTML = `${produto.nome} - R$${produto.preco} <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>`;
            listaProdutos.appendChild(item);
        });
    }

    window.adicionarAoCarrinho = (index) => {
        carrinho.push(produtos[index]);
        atualizarListaCarrinho();
    };

    function atualizarListaCarrinho() {
        listaCarrinho.innerHTML = "";
        carrinho.forEach((produto, index) => {
            const item = document.createElement("li");
            item.innerHTML = `${produto.nome} - R$${produto.preco} <button onclick="removerDoCarrinho(${index})">Remover</button>`;
            listaCarrinho.appendChild(item);
        });
    }

    window.removerDoCarrinho = (index) => {
        carrinho.splice(index, 1);
        atualizarListaCarrinho();
    };

    finalizarCompra.addEventListener("click", () => {
        if (carrinho.length > 0) {
            secaoPagamento.style.display = "block";
        } else {
            alert("O carrinho está vazio!");
        }
    });

    metodoPagamento.addEventListener("change", () => {
        detalhesPagamento.innerHTML = "";
        if (metodoPagamento.value === "pix") {
            const codigoPix = "PIX123456789";
            detalhesPagamento.innerHTML = `<p>Seu código PIX: <strong>${codigoPix}</strong></p>`;
        } else if (metodoPagamento.value === "cartao" || metodoPagamento.value === "debito") {
            detalhesPagamento.innerHTML = `
                <input type="text" placeholder="Número do Cartão" required>
                <input type="text" placeholder="Nome no Cartão" required>
                <input type="month" placeholder="Validade" required>
                <input type="text" placeholder="CVV" required>
            `;
        }
    });

    confirmarPagamento.addEventListener("click", () => {
        alert("Pagamento realizado com sucesso!");
        carrinho = [];
        atualizarListaCarrinho();
        secaoPagamento.style.display = "none";
    });
});
