package br.capitalis.Pesquisa;

import br.capitalis.Pesquisa.pergunta.DTO_Get_Pergunta;
import br.capitalis.Pesquisa.pergunta.DTO_Post_Pergunta;
import br.capitalis.Pesquisa.pergunta.Pergunta;
import br.capitalis.Pesquisa.pergunta.PerguntaRepository;
import br.capitalis.resultado.resposta.TipoDeResposta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("api/v1/pesquisas")

public class PesquisaController {

//    Dictionary<Long, Pesquisa> pesquisaRepository;

    @Autowired
    PesquisaRepository pesquisaRepository;
    @Autowired
    PerguntaRepository perguntaRepository;

    public PesquisaController() {
//        pesquisaRepository = new Hashtable<>();
//        pesquisaRepository.put(123456L, new Pesquisa(123456L, "pesquisa teste", 1234L));
////        pesquisaRepository.get(123456L).addPergunta(new Pergunta(123456L,
////                "pergunta de teste", "pergunta 1", TipoDeResposta.Texto));
//        pesquisaRepository.put(12567L, new Pesquisa(12567L, "pesquisa teste 2", 1234L));
    }


    // **** CRUD ****

    // Create
    @PostMapping
    public String criarPesquisa(@RequestBody DTO_Post_Pesquisa dto_pesquisa) {
        pesquisaRepository.save(new Pesquisa(dto_pesquisa));
        return "Pesquisa criada";
    }

    @PostMapping("/{id_pesquisa}/pergunta")
    public String adicionarPergunta(@PathVariable Long id_pesquisa, @RequestBody DTO_Post_Pergunta dto_pergunta) {

        Optional<Pesquisa> opt = pesquisaRepository.findById(id_pesquisa);

        if (opt.isPresent()) {
            Pesquisa pesq = opt.get();
            perguntaRepository.save(new Pergunta(dto_pergunta, pesq));
        } else {
            return "Id Pesquisa não encontrado";
        }
        return "Pergunta criada";
    }


    // Read
    // todas as pesquisas
    @GetMapping
    public Stream<DTO_Get_Pesquisa> getTodasPesquisas() {
        return pesquisaRepository.findAll().stream().map(DTO_Get_Pesquisa::new);
    }

    // 1 pesquisa por id
    @GetMapping("/{id}")
    public DTO_Get_Pesquisa getPesquisaPorId(@PathVariable Long id) {
        Optional<Pesquisa> pesquisa = pesquisaRepository.findById(id);
        return pesquisa.map(DTO_Get_Pesquisa::new).orElse(null);
    }

    // todas as perguntas de 1 pesquisa
    @GetMapping("/{id}/perguntas")
    public Stream<DTO_Get_Pergunta> getPerguntas(@PathVariable Long id) {
        Optional<Pesquisa> pesquisa = pesquisaRepository.findById(id);
        if(pesquisa.isPresent()) {
            Pesquisa pesq = pesquisa.get();
            return pesq.getPerguntas().stream().map(DTO_Get_Pergunta::new);
        }
        return null;
    }

    // todas as perguntas
    @GetMapping("/perguntas")
    public Stream<DTO_Get_Pergunta> getTodasPerguntas() {
        return perguntaRepository.findAll().stream().map(DTO_Get_Pergunta::new);
    }

    // 1 pergunta por ID
    @GetMapping("/pergunta/{id}")
    public DTO_Get_Pergunta getPerguntaPorId(@PathVariable Long id) {
        Optional<Pergunta> pergunta = perguntaRepository.findById(id);
        return pergunta.map(DTO_Get_Pergunta::new).orElse(null);
    }


    // Update

    // update pesquisa
//    @PutMapping()
//    public Pesquisa atualizaPesquias(@RequestBody DTO_Post_Pesquisa dto_pesquisa) {
//        return pesquisaRepository.put(dto_pesquisa.id(), new Pesquisa(dto_pesquisa));
//    }

    // update pergunta


    // Delete
//
//    @DeleteMapping("/{id}")
//    public String deletePesquisa(@PathVariable Long id) {
//        pesquisaRepository.remove(id);
//        return "Pesquisa deletada";
//    }

    // deletar pergunta especifica
}
