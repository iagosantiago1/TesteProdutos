window.abrirModalProduto = async function (produto) {
    if (!produto) {
        console.error('Produto não fornecido para edição');
        return;
    }

    const modal = document.getElementById("modalProduto");
    
    try {

        const res = await fetch("produtos/produtos-form/editar-produto.html");
        
        if (!res.ok) {
            throw new Error('Erro ao carregar formulário');
        }
        
        modal.innerHTML = await res.text();
        modal.style.display = "block";

        await carregarCategoriasModal();

        document.getElementById("tituloModal").innerText = "Editar Produto";
        document.getElementById("produtoId").value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("quantidadeEstoque").value = produto.quantidadeEstoque;
        
        setTimeout(() => {
            document.getElementById("categoria").value = produto.categoriaId;
        }, 100);

    } 
    
    catch (error) {
        console.error('Erro ao abrir modal:', error);
        alert('Erro ao abrir formulário de edição');
    }
};

function fecharModalProduto() {
    document.getElementById("modalProduto").style.display = "none";
}

async function carregarCategoriasModal() {
    const select = document.getElementById("categoria");
    
    try {
        const res = await fetch(`${API}/categorias`);
        
        if (!res.ok) {
            throw new Error('Erro ao buscar categorias');
        }
        
        const categorias = await res.json();

        select.innerHTML = `<option value="">Selecione uma categoria</option>`;
        
        categorias.forEach(c => {
            select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });
        
        console.log(`${categorias.length} categorias carregadas no modal`);
        
    } 
    
    catch (error) {
        console.error('Erro ao carregar categorias:', error);
        alert('Erro ao carregar categorias. Verifique se o backend está rodando.');
        select.innerHTML = `<option value="">Erro ao carregar categorias</option>`;
    }
}

async function salvarProduto() {
    const id = document.getElementById("produtoId").value;
    
    if (!id) {
        alert("Erro: ID do produto não encontrado");
        return;
    }
    
    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidadeValor = document.getElementById("quantidadeEstoque").value;
    const quantidade = quantidadeValor === "" ? 0 : parseInt(quantidadeValor);

    let categoriaId = document.getElementById("categoria").value;

    if (!nome || nome.length < 3) {
        alert("Nome precisa ter no mínimo 3 caracteres");
        document.getElementById("nome").focus();
        return;
    }

    if (isNaN(preco) || preco <= 0) {
        alert("Preço deve ser maior que zero");
        document.getElementById("preco").focus();
        return;
    }

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Quantidade não pode ser negativa");
        document.getElementById("quantidadeEstoque").focus();
        return;
    }

    if (!categoriaId || categoriaId === "") {
        categoriaId = 4;
    }

    const produto = { 
        nome, 
        preco, 
        quantidadeEstoque: quantidade, 
        categoriaId: parseInt(categoriaId)
    };

    console.log("Atualizando produto:", produto);

    try {
        const response = await fetch(`${API}/produtos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao atualizar produto');
        }

        alert('Produto atualizado com sucesso!');
        
        fecharModalProduto();
        listarProdutos();
        
    } 
    
    catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao atualizar produto: ' + error.message);
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("modalProduto");
    if (event.target === modal) {
        fecharModalProduto();
    }
};

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById("modalProduto");
        if (modal && modal.style.display === 'block') {
            fecharModalProduto();
        }
    }
});