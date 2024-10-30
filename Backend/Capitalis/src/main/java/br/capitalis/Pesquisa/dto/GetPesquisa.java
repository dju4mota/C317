package br.capitalis.Pesquisa.dto;

import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.Pesquisa.pergunta.dto.GetPergunta;
import java.util.stream.Stream;

public record GetPesquisa(
        Long id,
        String titulo,
        Long id_criador,
        Stream<GetPergunta> perguntas)
{
    public GetPesquisa(Pesquisa pesquisa){
        this(pesquisa.getId(), pesquisa.getTitulo(), pesquisa.getId_criador(),
                (pesquisa.getPerguntas().stream().map(GetPergunta::new)));
    }

}
