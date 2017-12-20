package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.MurderEntity;
import deathOfThrones.rest.murderer.MurderKills;
import deathOfThrones.rest.murderer.MurderOrigin;
import deathOfThrones.rest.search.NameCategory;


public interface MurderRepository extends CrudRepository<MurderEntity, String> {
	
	MurderEntity findByName(String name);
	
	@Query("SELECT name FROM MurderEntity")
	Iterable<String> getAllNames();
	
	@Query("SELECT NEW deathOfThrones.rest.search.NameCategory(m.name, 'murder') FROM MurderEntity m WHERE m.name LIKE %?1%")
	List<NameCategory> getWithSimilarName(String name);
	
	@Query("SELECT NEW deathOfThrones.rest.murderer.MurderKills(m.name, COUNT(d.name) as kills) FROM DeathEntity d, MurderEntity m WHERE d.murder = m.name group by m.name ORDER BY kills")
	Iterable<MurderKills> getAllNamesByKills();
	
	@Query("SELECT NEW deathOfThrones.rest.murderer.MurderKills(m.name, COUNT(d.name) as kills) FROM DeathEntity d, MurderEntity m WHERE d.murder = m.name group by m.name ORDER BY kills DESC")
	Iterable<MurderKills> getAllNamesByKillsDesc();
	
	@Query("SELECT NEW deathOfThrones.rest.murderer.MurderOrigin(m.name, m.origin) FROM MurderEntity m ORDER BY m.origin")
	Iterable<MurderOrigin> getAllNamesByOrigins();
	
	
	Iterable<MurderEntity> findByOrigin(String origin);

}
