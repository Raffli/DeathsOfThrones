package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.RegionEntity;
import deathOfThrones.rest.search.NameCategory;


public interface RegionRepository extends CrudRepository<RegionEntity, String> {
	
	RegionEntity findByRegion(String region);
	
	@Query("select region from RegionEntity")
	Iterable<String> getAllRegions();
	
	@Query("select new deathOfThrones.rest.search.NameCategory(r.region, 'region') from RegionEntity r where r.region like %?1%")
	List<NameCategory> getWithSimilarRegion(String region);
	
}
