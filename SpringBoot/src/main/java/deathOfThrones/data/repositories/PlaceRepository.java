package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.PlaceEntity;
import deathOfThrones.rest.places.PlacePopulation;
import deathOfThrones.rest.places.PlaceRegion;


public interface PlaceRepository extends CrudRepository<PlaceEntity, String> {
	
	PlaceEntity findByName(String name);
	
	@Query("select name from PlaceEntity")
	Iterable<String> getAllNames();
	
	@Query("select new deathOfThrones.rest.places.PlaceRegion(p.name, p.region) from PlaceEntity p order by p.region")
	Iterable<PlaceRegion> getAllPlacesOrderByRegion();
	
	@Query("select new deathOfThrones.rest.places.PlacePopulation(p.name, p.population) from PlaceEntity p order by p.population")
	Iterable<PlacePopulation> getAllPlacesOrderByPopulation();
	
}
