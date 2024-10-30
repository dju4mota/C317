package br.capitalis.Pesquisa.pergunta.dto;

import br.capitalis.Pesquisa.pergunta.Pergunta;

public record GetPergunta(
        Long id_pergunta,
        String titulo,
        String descricao,
        String[] alternativas
) {
    public GetPergunta(Pergunta pergunta){
        this(pergunta.getId_pergunta(), pergunta.getTitulo(),pergunta.getDescricao(),
                pergunta.converterStringLista());
    }
}
