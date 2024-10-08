package br.capitalis.Pesquisa.pergunta;

import br.capitalis.resultado.resposta.TipoDeResposta;

public record DTO_Put_Pergunta(
        Long id_pergunta,
        String titulo,
        String descricao,
        TipoDeResposta tipoDeResposta
) {
}
