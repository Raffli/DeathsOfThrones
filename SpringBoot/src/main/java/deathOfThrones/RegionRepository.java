package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Region;


public interface RegionRepository extends CrudRepository<Region, String> {
	
	Region findByRegion(String region);

}
