package br.capitalis.resultado.resposta;

import br.capitalis.resultado.Resultado;
import br.capitalis.resultado.resposta.dto.PostResposta;
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
    private Long id_pergunta;
    private String alternativaEscolhida;

    @ManyToOne
    @JoinColumn(name ="restuladoId", nullable = false)
    private Resultado idResultado;

    public Resposta(PostResposta dto_resposta, Resultado res) {
        this.id_pergunta = dto_resposta.id_pergunta();
        this.alternativaEscolhida = dto_resposta.alternativaEscolhida();
        this.idResultado = res;
    }

    public Resposta() {
    }
}
