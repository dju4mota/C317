package br.capitalis.Pesquisa.pergunta;

import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.resultado.resposta.TipoDeResposta;

public record DTO_Post_Pergunta(
         String titulo,
         String descricao,
         TipoDeResposta tipoDeResposta
) {
}
