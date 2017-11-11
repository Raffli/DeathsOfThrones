package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Region;


public interface RegionRepository extends CrudRepository<Region, String> {
	
	Region findByRegion(String region);

}
