package br.capitalis.Pesquisa.pergunta.dto;

import br.capitalis.resultado.resposta.TipoDeResposta;

public record PostPergunta(
         String titulo,
         String descricao,
         TipoDeResposta tipoDeResposta
) {
}
