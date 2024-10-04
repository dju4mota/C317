package br.capitalis.pergunta;

public record DTO_Post_Pergunta(
         Long id_pergunta,
         String titulo,
         String descricao,
         String tipoDeResposta
) {
}
