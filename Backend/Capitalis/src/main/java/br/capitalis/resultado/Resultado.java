package br.capitalis.resultado;

import br.capitalis.resultado.resposta.Resposta;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Resultado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idPesquisa;
    private Long idUsuario;
    @OneToMany(mappedBy = "resultado")
    private List<Resposta>  respostas;
}
