package br.capitalis.Pesquisa;

import br.capitalis.Pesquisa.pergunta.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("api/v1/pesquisas")

public class PesquisaController {

    @Autowired
    PesquisaRepository pesquisaRepository;
    @Autowired
    PerguntaRepository perguntaRepository;


    // ****** Create ******

    @PostMapping
    @Transactional
    public String criarPesquisa(@RequestBody DTO_Post_Pesquisa dto_pesquisa) {
        pesquisaRepository.save(new Pesquisa(dto_pesquisa));
        return "Pesquisa criada";
    }

    @PostMapping("/{id_pesquisa}/pergunta")
    @Transactional
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


    // ****** Read ******

    // todas as pesquisas - TODO page
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

    // todas as perguntas de 1 pesquisa - TODO page
    @GetMapping("/{id}/perguntas")
    public Stream<DTO_Get_Pergunta> getPerguntas(@PathVariable Long id) {
        Optional<Pesquisa> pesquisa = pesquisaRepository.findById(id);
        if(pesquisa.isPresent()) {
            Pesquisa pesq = pesquisa.get();
            return pesq.getPerguntas().stream().map(DTO_Get_Pergunta::new);
        }
        return null;
    }

    // todas as perguntas - TODO page
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


    // ****** Update ******

    // update pesquisa
    @PutMapping()
    @Transactional
    public void atualizaPesquisa(@RequestBody DTO_Put_Pesquisa dtoPutPesquisa) {
        Pesquisa pesquisa = pesquisaRepository.getReferenceById(dtoPutPesquisa.id());
        pesquisa.atualizarDados(dtoPutPesquisa);
    }

    // update pergunta
    @PutMapping()
    @Transactional
    public void atualizaPergunta(@RequestBody DTO_Put_Pergunta dtoPutPergunta) {
        Pergunta pergunta  = perguntaRepository.getReferenceById(dtoPutPergunta.id_pergunta());
        pergunta.atualizarDados(dtoPutPergunta);
    }


    // ****** Delete ******

    // delete pesquisa - TODO apagar as perguntas e respostas dessa pesquisa
    @DeleteMapping("/{id}")
    public String deletarPesquisa(@PathVariable Long id) {
        pesquisaRepository.deleteById(id);
        return "Pesquisa deletada";
    }

    // deletar pergunta
    @DeleteMapping("/{id}")
    public String deletarPergunta(@PathVariable Long id) {
        perguntaRepository.deleteById(id);
        return "Pergunta deletada";
    }
}
