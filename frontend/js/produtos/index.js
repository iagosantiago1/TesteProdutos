let produtoSelecionado = null;

async function carregarCategorias() {
    const selectFiltro = document.getElementById('filtroCategoria');
    
    try {
        const res = await fetch(`${API}/categorias`);
        
        if (!res.ok) {
            throw new Error('Erro ao buscar categorias');
        }
        
        const categorias = await res.json();

        selectFiltro.innerHTML = `<option value="">Todas as categorias</option>`;

        categorias.forEach(c => {
            selectFiltro.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });
        
        console.log(`${categorias.length} categorias carregadas no filtro`);
        
    } catch (error) {
        console.error('Erro ao carregar categorias no filtro:', error);
        selectFiltro.innerHTML = `<option value="">Erro ao carregar categorias</option>`;
    }
}

async function listarProdutos() {
    const categoriaId = document.getElementById('filtroCategoria').value;
    let url = `${API}/produtos`;
    
    if (categoriaId) {
        url += `?categoriaId=${categoriaId}`;
    }

    const res = await fetch(url);
    const produtos = await res.json();
    const tbody = document.getElementById('tabelaProdutos');
    tbody.innerHTML = '';
    
    produtos.sort((a, b) => a.id - b.id);

    produtos.forEach(p => {
        const tr = document.createElement('tr');

        tr.onclick = () => {
            document.querySelectorAll('tr').forEach(l => l.classList.remove('selecionado'));
            tr.classList.add('selecionado');
        };
        
        tr.innerHTML = `
            <td data-label="ID">#${p.id}</td>
            <td data-label="Nome" class="produto-nome">${p.nome}</td>
            <td data-label="Preço" class="produto-preco">${formatarMoeda(p.preco)}</td>
            <td data-label="Estoque" class="produto-estoque">${p.quantidadeEstoque}</td>
            <td data-label="Categoria" class="produto-categoria">${p.nomeCategoria || '-'}</td>
            <td data-label="Ações" class="produto-acoes">
                <button onclick="event.stopPropagation(); editarProduto(${p.id})" class="btn-edit" title="Editar produto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Editar
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

async function editarProduto(id) {

    try {
        const res = await fetch(`${API}/produtos?produtoId=${id}`);
        if (!res.ok) {
            throw new Error('Erro ao buscar produto');
        }
        
        const produtos = await res.json();
        if (produtos && produtos.length > 0) {
            const produto = produtos[0];
            await abrirModalProduto(produto);
        } else {
            alert('Produto não encontrado');
        }
    }

    catch (error) {
        console.error('Erro ao editar produto:', error);
        alert('Erro ao carregar dados do produto');
    }
}

carregarCategorias();
listarProdutos();