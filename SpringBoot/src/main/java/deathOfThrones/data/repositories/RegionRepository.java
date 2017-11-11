package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.RegionEntitie;


public interface RegionRepository extends CrudRepository<RegionEntitie, String> {
	
	RegionEntitie findByRegion(String region);

}
