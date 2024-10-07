package br.capitalis.Pesquisa.pergunta;


import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.resultado.resposta.TipoDeResposta;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;


@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Pergunta {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_pergunta;
    private String titulo;
    private String descricao;
    private TipoDeResposta tipoDeResposta;

    @ManyToOne
    @JoinColumn(name ="pesquisa_id", nullable = false)
    private Pesquisa pesquisa;

    public Pergunta(Long id_pergunta, String titulo, String descricao, TipoDeResposta tipoDeResposta) {
        this.id_pergunta = id_pergunta;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoDeResposta = tipoDeResposta;
    }

    public Pergunta(DTO_Post_Pergunta dtoPostPergunta, Pesquisa pesquisa) {
        this.descricao = dtoPostPergunta.descricao();
        this.tipoDeResposta = dtoPostPergunta.tipoDeResposta();
        this.titulo = dtoPostPergunta.titulo();
        this.pesquisa = pesquisa;

    }

    public Pergunta() {

    }



}
