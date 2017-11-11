package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.PlaceEntitie;


public interface PlaceRepository extends CrudRepository<PlaceEntitie, String> {
	
	PlaceEntitie findByName(String name);

}
