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
public class Pesquisa {

    @Id
    @GeneratedValue
    private Long id;
    private String titulo;
    private String descricao;
    private Long id_usuario;
}
