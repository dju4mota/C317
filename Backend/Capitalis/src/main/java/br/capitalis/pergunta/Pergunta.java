package br.capitalis.pergunta;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class Pergunta {

    private Long id_pergunta;
    private String titulo;
    private String descricao;
    private String tipoDeResposta;

    public Pergunta(Long id_pergunta, String titulo, String descricao, String tipoDeResposta) {
        this.id_pergunta = id_pergunta;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoDeResposta = tipoDeResposta;
    }

    public Pergunta(DTO_Post_Pergunta dtoPostPergunta) {
        this.id_pergunta = dtoPostPergunta.id_pergunta();
        this.descricao = dtoPostPergunta.descricao();
        this.tipoDeResposta = dtoPostPergunta.tipoDeResposta();
        this.titulo = dtoPostPergunta.titulo();
    }
}
