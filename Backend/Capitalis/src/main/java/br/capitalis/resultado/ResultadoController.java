package br.capitalis.resultado;

import br.capitalis.resultado.resposta.dto.GetResposta;
import br.capitalis.resultado.dto.GetResultado;
import br.capitalis.resultado.dto.PostResultado;
import br.capitalis.resultado.resposta.Resposta;
import br.capitalis.resultado.resposta.RespostaRepository;
import br.capitalis.resultado.resposta.dto.PostResposta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Stream;

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
    public String criarResultado(@RequestBody PostResultado dto_resultado) {
        resultadoRepository.save(new Resultado(dto_resultado));
        return "Resultado criado";
    }

    @PostMapping("/{id_resultado}/resposta")
    @Transactional
    public String adicionarResposta(@PathVariable Long id_resultado,
                                    @RequestBody PostResposta dto_resposta) {
        Optional<Resultado> opt = resultadoRepository.findById(id_resultado);

        if (opt.isPresent()) {
            Resultado res = opt.get();
            respostaRepository.save(new Resposta(dto_resposta, res));
        } else {
            return "Id Resultado não encontrado";
        }
        return "Resposta criada";
    }


    // ****** Read ******

    // todos os resultados - TODO page
    @GetMapping
    public Stream<GetResultado> getTodosResultados() {
        return resultadoRepository.findAll().stream().map(GetResultado::new);
    }

    // 1 resultado por id
    @GetMapping("/{id_resultado}")
    public GetResultado getResultadoPorId(@PathVariable Long id_resultado) {
        Optional<Resultado> resultado = resultadoRepository.findById(id_resultado);
        return resultado.map(GetResultado::new).orElse(null);
    }

    // todas as respostas de 1 resultado - TODO page
    @GetMapping("/{id_resultado}/respostas")
    public Stream<GetResposta> GetRespostas(@PathVariable Long id_resultado) {
        Optional<Resultado> res = resultadoRepository.findById(id_resultado);
        if(res.isPresent()) {
            Resultado resultado = res.get();
            return resultado.getRespostas().stream().map(GetResposta::new);
        }
        return null;
    }

    // todas as perguntas - TODO page
    @GetMapping("/respostas")
    public Stream<GetResposta> getTodasRespostas() {
        return respostaRepository.findAll().stream().map(GetResposta::new);
    }

    // 1 pergunta por ID
    @GetMapping("/pergunta/{id_resposta}")
    public GetResposta GetRespostaPorId(@PathVariable Long id_resposta) {
        Optional<Resposta> resposta = respostaRepository.findById(id_resposta);
        return resposta.map(GetResposta::new).orElse(null);
    }


//    // ****** Update ******
//
//    // update pesquisa
//    @PutMapping()
//    @Transactional
//    public void atualizaPesquisa(@RequestBody PutPesquisa dtoPutPesquisa) {
//        Pesquisa pesquisa = resultadoRepository.getReferenceById(dtoPutPesquisa.id());
//        pesquisa.atualizarDados(dtoPutPesquisa);
//    }
//
//    // update pergunta
//    @PutMapping("/pergunta")
//    @Transactional
//    public void atualizaPergunta(@RequestBody PutPergunta dtoPutPergunta) {
//        Pergunta pergunta  = respostaRepository.getReferenceById(dtoPutPergunta.id_pergunta());
//        pergunta.atualizarDados(dtoPutPergunta);
//    }
//
//
//    // ****** Delete ******
//
//    // delete pesquisa - TODO apagar as perguntas e respostas dessa pesquisa
//    @DeleteMapping("/{id}")
//    public String deletarPesquisa(@PathVariable Long id) {
//        resultadoRepository.deleteById(id);
//        return "Pesquisa deletada";
//    }
//
//    // deletar pergunta
//    @DeleteMapping("/pergunta/{id}")
//    public String deletarPergunta(@PathVariable Long id) {
//        respostaRepository.deleteById(id);
//        return "Pergunta deletada";
//    }
//

}
