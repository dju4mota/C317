package br.capitalis.Pesquisa.dto;

public record PutPesquisa(
        Long id,
        String titulo,
        Long id_criador
) {
}
