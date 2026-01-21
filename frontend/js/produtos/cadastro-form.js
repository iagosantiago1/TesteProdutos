async function carregarCategorias() {
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
        
        console.log(`${categorias.length} categorias carregadas`);
        
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        alert('Erro ao carregar categorias. Verifique se o backend está rodando.');
        select.innerHTML = `<option value="">Erro ao carregar categorias</option>`;
    }
}

async function salvarProduto(event) {
    event.preventDefault();
    
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

    console.log("Criando produto:", produto);

    try {
        const response = await fetch(`${API}/produtos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao criar produto');
        }

        alert('Produto cadastrado com sucesso!');

        window.location.href = 'index.html';
        
    } 
    
    catch (error) {
        console.error('Erro ao criar produto:', error);
        alert('Erro ao cadastrar produto: ' + error.message);
    }
}

document.getElementById('formProduto').addEventListener('submit', salvarProduto);
carregarCategorias();