package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.PlaceEntity;
import deathOfThrones.rest.places.PlacePopulation;
import deathOfThrones.rest.places.PlaceRegion;
import deathOfThrones.rest.search.NameCategory;


public interface PlaceRepository extends CrudRepository<PlaceEntity, String> {
	
	PlaceEntity findByName(String name);
	
	@Query("SELECT name FROM PlaceEntity")
	Iterable<String> getAllNames();
	
	@Query("SELECT NEW deathOfThrones.rest.search.NameCategory(p.name, 'place') FROM PlaceEntity p WHERE p.name LIKE %?1%")
	List<NameCategory> getWithSimilarName(String name);
	
	@Query("SELECT NEW deathOfThrones.rest.places.PlaceRegion(p.name, p.region) FROM PlaceEntity p ORDER BY p.region")
	Iterable<PlaceRegion> getAllPlacesOrderByRegion();
	
	@Query("SELECT NEW deathOfThrones.rest.places.PlacePopulation(p.name, p.population) FROM PlaceEntity p ORDER BY p.population")
	Iterable<PlacePopulation> getAllPlacesOrderByPopulation();
	
}
