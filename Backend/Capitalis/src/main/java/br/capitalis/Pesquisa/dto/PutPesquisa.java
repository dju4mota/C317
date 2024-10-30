package br.capitalis.Pesquisa.dto;

public record PutPesquisa(
        Long id,
        String titulo,
        String descricao,
        Long id_criador
) {
}
