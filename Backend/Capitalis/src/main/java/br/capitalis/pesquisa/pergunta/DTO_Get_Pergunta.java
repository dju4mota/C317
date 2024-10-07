package br.capitalis.Pesquisa.pergunta;

import br.capitalis.resultado.resposta.TipoDeResposta;

public record DTO_Get_Pergunta(
        Long id_pergunta,
        String titulo,
        String descricao,
        TipoDeResposta tipoDeResposta
) {
    public DTO_Get_Pergunta (Pergunta pergunta){
        this(pergunta.getId_pergunta(), pergunta.getTitulo(),pergunta.getDescricao(),pergunta.getTipoDeResposta());
    }
}
