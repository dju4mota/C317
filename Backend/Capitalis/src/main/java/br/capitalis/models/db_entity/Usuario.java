package br.capitalis.models.db_entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

// O banco vai trabalhar diretamente com as classes entity, que serão tabelas no SQL
// as Classses DTO vão servir para formatar dados na hora de enviar ou receber do front ou api


@Table
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Usuario {

    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String email;
    private String senha;
}
