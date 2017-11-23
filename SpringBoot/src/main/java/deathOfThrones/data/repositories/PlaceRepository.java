package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.PlaceEntity;


public interface PlaceRepository extends CrudRepository<PlaceEntity, String> {
	
	PlaceEntity findByName(String name);
	
	@Query("select name from PlaceEntity")
	Iterable<String> getAllNames();
	
}
