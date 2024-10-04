package br.capitalis.Pesquisa;

import br.capitalis.pergunta.DTO_Post_Pergunta;
import br.capitalis.pergunta.Pergunta;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/v1/pesquisas")

public class PesquisaController {

    Dictionary<Long,Pesquisa> pesquisas;

    public PesquisaController(){
        pesquisas = new Hashtable<>();
        pesquisas.put(123456L,new Pesquisa(123456L,"pesquisa teste", 1234L));
        pesquisas.get(123456L).addPergunta(new Pergunta(123456L,
                "pergunta de teste", "pergunta 1", "texto"));
        pesquisas.put(12567L,new Pesquisa(12567L,"pesquisa teste 2", 1234L));
    }


    // **** CRUD ****

    // Create
    @PostMapping
    public String criarPesquisa(@RequestBody DTO_Post_Pesquisa dto_pesquisa){
        pesquisas.put(dto_pesquisa.id(), new Pesquisa(dto_pesquisa));
        return "Pesquisa criada";
    }

    @PostMapping("/{id_pesquisa}/pergunta")
    public String adicionarPergunta(@PathVariable Long id_pesquisa, @RequestBody DTO_Post_Pergunta dto_pergunta){
        pesquisas.get(id_pesquisa).addPergunta(new Pergunta(dto_pergunta));
        return "Pergunta criada";
    }


    // Read
    @GetMapping
    public Dictionary<Long,Pesquisa> getPesquisas(){
        return pesquisas;
    }

    @GetMapping("/{id}")
    public Pesquisa getPesquisaPorId(@PathVariable Long id){
        return pesquisas.get(id);
    }

    @GetMapping("/{id}/perguntas")
    public List<Pergunta> getPerguntas(@PathVariable Long id){
        return pesquisas.get(id).getPerguntas();
    }
    // ler pergunta especifica


    // Update

    // update pesquisa
    @PutMapping()
    public Pesquisa atualizaPesquias(@RequestBody DTO_Post_Pesquisa dto_pesquisa){
        return pesquisas.put(dto_pesquisa.id(), new Pesquisa(dto_pesquisa));
    }

    // update pergunta



    // Delete

    @DeleteMapping("/{id}")
    public String deletePesquisa(@PathVariable Long id){
        pesquisas.remove(id);
        return "Pesquisa deletada";
    }

    // deletar pergunta especifica
}
