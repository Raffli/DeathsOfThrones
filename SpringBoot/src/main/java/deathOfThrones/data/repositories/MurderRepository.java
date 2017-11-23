package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.MurderEntity;


public interface MurderRepository extends CrudRepository<MurderEntity, String> {
	
	MurderEntity findByName(String name);
	
	@Query("select name from MurderEntity")
	Iterable<String> getAllNames();
	
	Iterable<MurderEntity> findByOrigin(String origin);

}
