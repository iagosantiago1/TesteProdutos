package com.teste.teste.produtos.controller;

import com.teste.teste.produtos.dto.ProdutoEstoqueRequestDTO;
import com.teste.teste.produtos.dto.ProdutoRequestDTO;
import com.teste.teste.produtos.dto.ProdutoResponseDTO;
import com.teste.teste.produtos.service.ProdutoService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    public ProdutoResponseDTO criar(@RequestBody ProdutoRequestDTO dto) {
        return produtoService.criarProduto(dto);
    }

    @GetMapping
    public List<ProdutoResponseDTO> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) Long produtoId){
        return produtoService.listarProdutos(categoriaId, produtoId);
    }

    @Transactional
    @PutMapping("/{id}")
    public ProdutoResponseDTO atualizar(
            @PathVariable Long id,
            @RequestBody ProdutoRequestDTO dto) {
        return produtoService.atualizar(id, dto);
    }

    @Transactional
    @PatchMapping("/{id}/estoque")
    public ProdutoResponseDTO atualizarEstoque(
            @PathVariable Long id,
            @RequestBody ProdutoEstoqueRequestDTO data) {
        return produtoService.atualizarEstoque(id, data.getQuantidade());
    }

}