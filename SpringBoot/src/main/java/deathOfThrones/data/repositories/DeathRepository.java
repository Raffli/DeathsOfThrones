package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntity;


public interface DeathRepository extends CrudRepository<DeathEntity, String> {
	
	DeathEntity findByName(String name);

}
