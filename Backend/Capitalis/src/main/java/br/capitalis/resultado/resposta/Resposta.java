package br.capitalis.resultado.resposta;

import br.capitalis.resultado.Resultado;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String alternativa_escolhida;

    @ManyToOne
    @JoinColumn(name ="restuladoId", nullable = false)
    private Resultado idResultado;
    // TODO - id pergunta ?

}
