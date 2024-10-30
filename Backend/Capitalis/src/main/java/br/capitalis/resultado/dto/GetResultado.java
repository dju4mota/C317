package br.capitalis.resultado.dto;
import br.capitalis.resultado.Resultado;
import br.capitalis.resultado.resposta.dto.GetResposta;

import java.util.stream.Stream;

public record GetResultado(
        Long id,
        Long idPesquisa,
        Long idUsuario,
        boolean finalizada,
        Stream<GetResposta> respostas
) {
    public GetResultado(Resultado resultado)
    {
        this(resultado.getId(),resultado.getIdPesquisa(),resultado.getIdUsuario(), resultado.isFinalizada(),
                (resultado.getRespostas().stream().map(GetResposta::new)));
    }
}
