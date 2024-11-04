package br.capitalis.Pesquisa.pergunta.dto;


public record PutPergunta(
        Long id_pergunta,
        String titulo,
        String descricao,
        String[] alternativas

) {
}
