package com.teste.teste.produtos.dto;

import java.math.BigDecimal;

public class ProdutoResponseDTO {

    private Long id;
    private String nomeCategoria;
    private String nome;
    private BigDecimal preco;
    private Integer quantidadeEstoque;
    private Long categoriaId;

    public ProdutoResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public String getNomeCategoria() {
        return nomeCategoria;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeCategoria = nomeCategoria;
    }

    public Long getCategoriaId() { return categoriaId;}

    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
}


