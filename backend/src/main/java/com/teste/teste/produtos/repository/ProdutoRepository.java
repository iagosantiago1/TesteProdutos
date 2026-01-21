package com.teste.teste.produtos.repository;

import com.teste.teste.produtos.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query ("""
        SELECT p FROM Produto p
        WHERE (:categoriaId IS NULL OR p.categoria.id = :categoriaId)
        AND (:produtoId IS NULL OR p.id = :produtoId)
    """)
    List<Produto> buscarComFiltros(
            @Param("categoriaId") Long categoriaId,
            @Param("produtoId") Long produtoId
    );
}
