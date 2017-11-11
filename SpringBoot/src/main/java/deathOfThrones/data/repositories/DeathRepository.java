package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Death;


public interface DeathRepository extends CrudRepository<Death, String> {
	
	Death findByName(String name);

}
