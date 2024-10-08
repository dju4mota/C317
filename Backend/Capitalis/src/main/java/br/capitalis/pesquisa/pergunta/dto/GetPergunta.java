package br.capitalis.Pesquisa.pergunta.dto;

import br.capitalis.Pesquisa.pergunta.Pergunta;
import br.capitalis.resultado.resposta.TipoDeResposta;

public record GetPergunta(
        Long id_pergunta,
        String titulo,
        String descricao,
        TipoDeResposta tipoDeResposta
) {
    public GetPergunta(Pergunta pergunta){
        this(pergunta.getId_pergunta(), pergunta.getTitulo(),pergunta.getDescricao(),pergunta.getTipoDeResposta());
    }
}
