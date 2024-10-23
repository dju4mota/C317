package br.capitalis.Pesquisa.dto;

import br.capitalis.Pesquisa.Pesquisa;

public record GetPesquisa(
        Long id,
        String titulo,
        Long id_criador)
{
    public GetPesquisa(Pesquisa pesquisa){
        this(pesquisa.getId(), pesquisa.getTitulo(), pesquisa.getId_criador());
    }

}
