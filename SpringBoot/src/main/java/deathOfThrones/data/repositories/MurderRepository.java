package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.MurderEntity;
import deathOfThrones.rest.murderer.MurderKills;
import deathOfThrones.rest.murderer.MurderOrigin;


public interface MurderRepository extends CrudRepository<MurderEntity, String> {
	
	MurderEntity findByName(String name);
	
	@Query("select name from MurderEntity")
	Iterable<String> getAllNames();
	
	@Query("select new deathOfThrones.rest.murderer.MurderKills(m.name, count(d.name) as kills) from DeathEntity d, MurderEntity m where d.murder = m.name group by m.name order by kills")
	Iterable<MurderKills> getAllNamesByKills();
	
	@Query("select new deathOfThrones.rest.murderer.MurderKills(m.name, count(d.name) as kills) from DeathEntity d, MurderEntity m where d.murder = m.name group by m.name order by kills Desc")
	Iterable<MurderKills> getAllNamesByKillsDesc();
	
	@Query("select new deathOfThrones.rest.murderer.MurderOrigin(m.name, m.origin) from MurderEntity m order by m.origin")
	Iterable<MurderOrigin> getAllNamesByOrigins();
	
	
	Iterable<MurderEntity> findByOrigin(String origin);

}
