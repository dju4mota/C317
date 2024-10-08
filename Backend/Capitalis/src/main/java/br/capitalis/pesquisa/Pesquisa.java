package br.capitalis.Pesquisa;

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
    @OneToMany(mappedBy = "pesquisa")
    private List<Pergunta> perguntas;


    public Pesquisa(Long id, String titulo, Long id_criador) {
        this.id = id;
        this.titulo = titulo;
        this.id_criador = id_criador;
    }

    public Pesquisa(DTO_Post_Pesquisa dtoPesquisa) {
        this.id_criador = dtoPesquisa.id_criador();
        this.titulo = dtoPesquisa.titulo();
    }

    public Pesquisa() {

    }

    public void atualizarDados(DTO_Put_Pesquisa dadosPesquisa) {
        if(dadosPesquisa.id_criador()!= null) {
            this.id_criador = dadosPesquisa.id_criador();
        }
        if(dadosPesquisa.titulo()!= null) {
            this.titulo = dadosPesquisa.titulo();
        }
    }


}
