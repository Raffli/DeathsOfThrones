package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.RegionEntity;
import deathOfThrones.rest.search.NameCategory;


public interface RegionRepository extends CrudRepository<RegionEntity, String> {
	
	RegionEntity findByRegion(String region);
	
	@Query("SELECT region FROM RegionEntity")
	Iterable<String> getAllRegions();
	
	@Query("SELECT NEW deathOfThrones.rest.search.NameCategory(r.region, 'region') FROM RegionEntity r WHERE r.region LIKE %?1%")
	List<NameCategory> getWithSimilarRegion(String region);
	
}
