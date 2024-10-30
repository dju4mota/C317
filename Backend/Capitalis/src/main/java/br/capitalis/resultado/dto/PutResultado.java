package br.capitalis.resultado.dto;

public record PutResultado(
        Long id,
        Long idPesquisa,
        Long idUsuario,
        boolean finalizada
) {
}
