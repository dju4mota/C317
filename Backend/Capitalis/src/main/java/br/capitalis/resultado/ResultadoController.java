package br.capitalis.resultado;


import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.Pesquisa.dto.PostPesquisa;
import br.capitalis.resultado.dto.PostResultado;
import br.capitalis.resultado.resposta.RespostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/resultados")
public class ResultadoController {

    @Autowired
    RespostaRepository respostaRepository;
    @Autowired
    ResultadoRepository resultadoRepository;


    // ****** Create ******
    @PostMapping
    @Transactional
    public String criarResultado(@RequestBody PostResultado dtoResultado) {
        resultadoRepository.save(new Resultado(dtoResultado));
        return "Resultado criadao";
    }

    // ******  Read  ******


    // ****** Update ******



    // ****** Delete ******




}
