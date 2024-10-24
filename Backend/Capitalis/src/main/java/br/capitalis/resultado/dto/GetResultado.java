package br.capitalis.resultado.dto;

import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.resultado.Resultado;

public record GetResultado(
        Long id,
        Long idPesquisa,
        Long idUsuario,
        boolean finalizada
) {
    public GetResultado(Resultado resultado)
    {
        this(resultado.getId(),resultado.getIdPesquisa(),resultado.getIdUsuario(), resultado.isFinalizada());
    }
}
