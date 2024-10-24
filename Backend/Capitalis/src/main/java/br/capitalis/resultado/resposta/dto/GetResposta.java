package br.capitalis.resultado.resposta.dto;

import br.capitalis.resultado.resposta.Resposta;

public record GetResposta(
        Long id,
        Long id_pergunta,
        String alternativaEscolhida
) {
    public GetResposta(Resposta resposta)
    {
        this(resposta.getId(),resposta.getId_pergunta(),resposta.getAlternativaEscolhida());
    }
}
