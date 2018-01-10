package deathOfThrones.data.repositories;



import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.RegionEntity;


public interface RegionRepository extends CrudRepository<RegionEntity, String> {
	
	RegionEntity findByRegion(String region);
	
	@Query("SELECT region FROM RegionEntity")
	Iterable<String> getAllRegions();	
}
