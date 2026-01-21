package com.teste.teste.produtos.service;

import com.teste.teste.produtos.dto.CategoriaRequestDTO;
import com.teste.teste.produtos.dto.CategoriaResponseDTO;
import com.teste.teste.produtos.entity.Categoria;
import com.teste.teste.produtos.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaResponseDTO> listarCategorias() {
        return categoriaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CategoriaResponseDTO buscarPorId(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        return toDTO(categoria);
    }

    public CategoriaResponseDTO criarCategoria(CategoriaRequestDTO dto) {
        categoriaRepository.findByNome(dto.getNome())
                .ifPresent(c -> {
                    throw new RuntimeException("Já existe uma categoria com este nome");
                });

        Categoria categoria = new Categoria();
        categoria.setNome(dto.getNome());
        categoria.setDescricao(dto.getDescricao());

        Categoria categoriaSalva = categoriaRepository.save(categoria);
        return toDTO(categoriaSalva);
    }

    public CategoriaResponseDTO atualizarCategoria(Long id, CategoriaRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        categoriaRepository.findByNome(dto.getNome())
                .ifPresent(c -> {
                    if (!c.getId().equals(id)) {
                        throw new RuntimeException("Já existe uma categoria com este nome");
                    }
                });

        categoria.setNome(dto.getNome());
        categoria.setDescricao(dto.getDescricao());

        Categoria categoriaAtualizada = categoriaRepository.save(categoria);
        return toDTO(categoriaAtualizada);
    }

    public void excluirCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));


        categoriaRepository.delete(categoria);
    }

    private CategoriaResponseDTO toDTO(Categoria categoria) {
        return new CategoriaResponseDTO(
                categoria.getId(),
                categoria.getNome(),
                categoria.getDescricao()
        );
    }
}