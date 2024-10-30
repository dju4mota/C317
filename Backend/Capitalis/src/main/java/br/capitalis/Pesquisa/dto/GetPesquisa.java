package br.capitalis.Pesquisa.dto;

import br.capitalis.Pesquisa.Pesquisa;
import br.capitalis.Pesquisa.pergunta.Pergunta;

import java.util.List;

public record GetPesquisa(
        Long id,
        String titulo,
        Long id_criador,
        List<Pergunta> perguntas)
{
    public GetPesquisa(Pesquisa pesquisa){
        this(pesquisa.getId(), pesquisa.getTitulo(), pesquisa.getId_criador(),pesquisa.getPerguntas());
    }

}
