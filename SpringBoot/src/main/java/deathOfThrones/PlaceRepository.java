package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Place;


public interface PlaceRepository extends CrudRepository<Place, String> {
	
	Place findByName(String name);

}
