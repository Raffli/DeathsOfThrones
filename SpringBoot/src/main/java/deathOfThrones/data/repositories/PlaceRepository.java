package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.PlaceEntity;


public interface PlaceRepository extends CrudRepository<PlaceEntity, String> {
	
	PlaceEntity findByName(String name);

}
