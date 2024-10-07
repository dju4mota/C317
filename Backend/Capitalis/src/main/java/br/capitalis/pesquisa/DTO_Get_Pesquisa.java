package br.capitalis.Pesquisa;

public record DTO_Get_Pesquisa(
        Long id,
        String titulo,
        Long id_criador)
{
    public DTO_Get_Pesquisa(Pesquisa pesquisa){
        this(pesquisa.getId(), pesquisa.getTitulo(), pesquisa.getId_criador());
    }

}
