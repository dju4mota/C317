package br.capitalis.Pesquisa.pergunta.dto;

import br.capitalis.resultado.resposta.TipoDeResposta;

public record PutPergunta(
        Long id_pergunta,
        String titulo,
        String descricao

) {
}
