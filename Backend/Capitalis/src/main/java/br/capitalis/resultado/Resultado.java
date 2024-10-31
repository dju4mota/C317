package br.capitalis.resultado;

import br.capitalis.Pesquisa.dto.PutPesquisa;
import br.capitalis.resultado.dto.PostResultado;
import br.capitalis.resultado.dto.PutResultado;
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
    private boolean finalizada = false;

    @OneToMany(mappedBy = "idResultado")
    private List<Resposta> respostas;

    public Resultado(PostResultado resultado) {
        this.idPesquisa = resultado.idPesquisa();
        this.idUsuario = resultado.idUsuario();
    }

    public Resultado() {

    }

    public void atualizarDados(PutResultado dadosResultados) {
        this.finalizada = dadosResultados.finalizada();
    }
}
