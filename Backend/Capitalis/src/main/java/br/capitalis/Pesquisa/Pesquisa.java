package br.capitalis.Pesquisa;

import br.capitalis.Pesquisa.dto.PostPesquisa;
import br.capitalis.Pesquisa.dto.PutPesquisa;
import br.capitalis.Pesquisa.pergunta.Pergunta;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Pesquisa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private Long id_criador;
    private String descricao;
    @OneToMany(mappedBy = "pesquisa")
    private List<Pergunta> perguntas;


    public Pesquisa(Long id, String titulo, Long id_criador, String descricao) {
        this.id = id;
        this.titulo = titulo;
        this.id_criador = id_criador;
        this.descricao = descricao;
    }

    public Pesquisa(PostPesquisa dtoPesquisa) {
        this.id_criador = dtoPesquisa.id_criador();
        this.titulo = dtoPesquisa.titulo();
        this.descricao = dtoPesquisa.descricao();
    }

    public Pesquisa() {

    }

    public void atualizarDados(PutPesquisa dadosPesquisa) {
        if(dadosPesquisa.id_criador()!= null) {
            this.id_criador = dadosPesquisa.id_criador();
        }
        if(dadosPesquisa.titulo()!= null) {
            this.titulo = dadosPesquisa.titulo();
        }
        if(dadosPesquisa.descricao()!= null) {
            this.descricao = dadosPesquisa.descricao();
        }
    }


}
