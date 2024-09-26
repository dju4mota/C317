package br.capitalis.models.db_entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Pesquisa {

    @Id
    @GeneratedValue
    private Long id;
    private Long id_criador;
    private String titulo;
    private String descricao;

    @ElementCollection (targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name="Pesquisa_Pergunta",joinColumns = @JoinColumn(name="id"))
    @Column (name="perguntas",nullable = false)
    private List<Integer> perguntas;

    @ElementCollection (targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name="Pesquisa_Resposta",joinColumns = @JoinColumn(name="id"))
    @Column (name="respostas",nullable = false)
    private List<Integer> respostas;


}
