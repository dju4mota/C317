package br.capitalis.models.db_entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Table
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Pergunta {

    @Id
    @GeneratedValue
    private Long id_pergunta;
    private String enunciado;
    private int tipo_de_resposta;
}
