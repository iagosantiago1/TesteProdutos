package com.teste.teste.produtos.service;

import com.teste.teste.produtos.dto.ProdutoRequestDTO;
import com.teste.teste.produtos.dto.ProdutoResponseDTO;
import com.teste.teste.produtos.entity.Categoria;
import com.teste.teste.produtos.entity.Produto;
import com.teste.teste.produtos.repository.CategoriaRepository;
import com.teste.teste.produtos.repository.ProdutoRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository,
                          CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional
    public ProdutoResponseDTO criarProduto(ProdutoRequestDTO dto) {
        if (dto.getPreco().signum() <= 0) {
            throw new IllegalArgumentException("Preço deve ser maior que zero");
        }

        Categoria categoria = obterCategoria(dto.getCategoriaId());

        Produto produto = new Produto();
        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setCategoria(categoria);
        produto.setDataCadastro(LocalDateTime.now());



        Produto salvo = produtoRepository.save(produto);
        return toResponseDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarProdutos(Long categoriaId, Long produtoId) {
        return produtoRepository.buscarComFiltros(categoriaId, produtoId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        if (dto.getPreco().signum() <= 0) {
            throw new IllegalArgumentException("Preço deve ser maior que zero");
        }

        Categoria categoria = obterCategoria(dto.getCategoriaId());

        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setCategoria(categoria);

        Produto atualizado = produtoRepository.save(produto);
        return toResponseDTO(atualizado);
    }

    @Transactional
    public ProdutoResponseDTO atualizarEstoque(Long id, Integer quantidade) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setQuantidadeEstoque(quantidade);
        return toResponseDTO(produtoRepository.save(produto));
    }

    private Categoria obterCategoria(Long categoriaId) {
        if (categoriaId == null) {
            return categoriaRepository.findByNome("Geral")
                    .orElseThrow();
        }
        return categoriaRepository.findById(categoriaId)
                .orElseThrow();
    }

    private ProdutoResponseDTO toResponseDTO(Produto produto) {
        ProdutoResponseDTO dto = new ProdutoResponseDTO();
        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setPreco(produto.getPreco());
        dto.setQuantidadeEstoque(produto.getQuantidadeEstoque());
        dto.setNomeCategoria(produto.getCategoria().getNome());
        dto.setCategoriaId(produto.getCategoria().getId());
        return dto;
    }
}