package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Place;


public interface PlaceRepository extends CrudRepository<Place, String> {
	
	Place findByName(String name);

}
