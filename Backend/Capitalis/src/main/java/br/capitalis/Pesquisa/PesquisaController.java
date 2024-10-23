package br.capitalis.Pesquisa;

import br.capitalis.Pesquisa.dto.GetPesquisa;
import br.capitalis.Pesquisa.dto.PostPesquisa;
import br.capitalis.Pesquisa.dto.PutPesquisa;
import br.capitalis.Pesquisa.pergunta.*;
import br.capitalis.Pesquisa.pergunta.dto.GetPergunta;
import br.capitalis.Pesquisa.pergunta.dto.PostPergunta;
import br.capitalis.Pesquisa.pergunta.dto.PutPergunta;
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
    public String criarPesquisa(@RequestBody PostPesquisa dto_pesquisa) {
        pesquisaRepository.save(new Pesquisa(dto_pesquisa));
        return "Pesquisa criada";
    }

    @PostMapping("/{id_pesquisa}/pergunta")
    @Transactional
    public String adicionarPergunta(@PathVariable Long id_pesquisa, @RequestBody PostPergunta dto_pergunta) {

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
    public Stream<GetPesquisa> getTodasPesquisas() {
        return pesquisaRepository.findAll().stream().map(GetPesquisa::new);
    }

    // 1 pesquisa por id
    @GetMapping("/{id}")
    public GetPesquisa getPesquisaPorId(@PathVariable Long id) {
        Optional<Pesquisa> pesquisa = pesquisaRepository.findById(id);
        return pesquisa.map(GetPesquisa::new).orElse(null);
    }

    // todas as perguntas de 1 pesquisa - TODO page
    @GetMapping("/{id}/perguntas")
    public Stream<GetPergunta> getPerguntas(@PathVariable Long id) {
        Optional<Pesquisa> pesquisa = pesquisaRepository.findById(id);
        if(pesquisa.isPresent()) {
            Pesquisa pesq = pesquisa.get();
            return pesq.getPerguntas().stream().map(GetPergunta::new);
        }
        return null;
    }

    // todas as perguntas - TODO page
    @GetMapping("/perguntas")
    public Stream<GetPergunta> getTodasPerguntas() {
        return perguntaRepository.findAll().stream().map(GetPergunta::new);
    }

    // 1 pergunta por ID
    @GetMapping("/pergunta/{id}")
    public GetPergunta getPerguntaPorId(@PathVariable Long id) {
        Optional<Pergunta> pergunta = perguntaRepository.findById(id);
        return pergunta.map(GetPergunta::new).orElse(null);
    }


    // ****** Update ******

    // update pesquisa
    @PutMapping()
    @Transactional
    public void atualizaPesquisa(@RequestBody PutPesquisa dtoPutPesquisa) {
        Pesquisa pesquisa = pesquisaRepository.getReferenceById(dtoPutPesquisa.id());
        pesquisa.atualizarDados(dtoPutPesquisa);
    }

    // update pergunta
    @PutMapping("/pergunta")
    @Transactional
    public void atualizaPergunta(@RequestBody PutPergunta dtoPutPergunta) {
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
    @DeleteMapping("/pergunta/{id}")
    public String deletarPergunta(@PathVariable Long id) {
        perguntaRepository.deleteById(id);
        return "Pergunta deletada";
    }
}
