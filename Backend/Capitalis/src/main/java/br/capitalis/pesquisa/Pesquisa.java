package br.capitalis.Pesquisa;


import br.capitalis.pergunta.Pergunta;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class Pesquisa {

    private Long id;
    private String titulo;
    private Long id_criador;
    private List<Pergunta> perguntas;

    public Pesquisa(Long id, String titulo, Long id_criador) {
        this.id = id;
        this.titulo = titulo;
        this.id_criador = id_criador;
        perguntas = new ArrayList<>();
    }

    public Pesquisa(DTO_Post_Pesquisa dtoPesquisa) {
        this.id = dtoPesquisa.id();
        this.id_criador = dtoPesquisa.id_criador();
        this.titulo = dtoPesquisa.titulo();
        perguntas = new ArrayList<>();
    }

    public void addPergunta(Pergunta pergunta){
        perguntas.add(pergunta);
    }
}
