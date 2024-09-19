package br.capitalis.db;

import org.springframework.data.jpa.repository.JpaRepository;
import br.capitalis.models.db_entity.Pesquisa;

public interface PesquisaRepository extends JpaRepository<Pesquisa,Long> {
}
