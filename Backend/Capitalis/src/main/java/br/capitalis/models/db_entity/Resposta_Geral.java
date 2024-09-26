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
public class Resposta_Geral {
    @Id
    @GeneratedValue
    private Long id_resposta;
    private Long id_usuario;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name="Resposta_Pergunta",joinColumns = @JoinColumn(name="id_resposta"))
    @Column (name="perguntas",nullable = false)
    private List<Integer> perguntas;

    @ElementCollection (targetClass = Integer.class, fetch = FetchType.EAGER)
    @CollectionTable(name="RespostasGeral_Resposta",joinColumns = @JoinColumn(name="id_resposta"))
    @Column (name="respostas",nullable = false)
    private List<Integer> respostas;

}
