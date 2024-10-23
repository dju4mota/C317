package br.capitalis.Pesquisa.pergunta;

import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.Pesquisa.pergunta.dto.PostPergunta;
import br.capitalis.Pesquisa.pergunta.dto.PutPergunta;
import br.capitalis.resultado.resposta.TipoDeResposta;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;


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
    private String alternativas;

    @ManyToOne
    @JoinColumn(name ="pesquisa_id", nullable = false)
    private Pesquisa pesquisa;

    public Pergunta(Long id_pergunta, String titulo, String descricao, TipoDeResposta tipoDeResposta) {
        this.id_pergunta = id_pergunta;
        this.titulo = titulo;
        this.descricao = descricao;
    }

    public Pergunta(PostPergunta dtoPostPergunta, Pesquisa pesquisa) {
        this.descricao = dtoPostPergunta.descricao();
        this.titulo = dtoPostPergunta.titulo();
        this.pesquisa = pesquisa;

    }

    public Pergunta() {

    }

    public void atualizarDados(PutPergunta dadosPergunta) {
        if(dadosPergunta.descricao()!= null) {
            this.descricao = dadosPergunta.descricao();
        }
        if(dadosPergunta.titulo()!= null) {
            this.titulo = dadosPergunta.titulo();
        }
    }




}
