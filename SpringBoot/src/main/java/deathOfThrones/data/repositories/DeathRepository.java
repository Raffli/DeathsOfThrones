package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntitie;


public interface DeathRepository extends CrudRepository<DeathEntitie, String> {
	
	DeathEntitie findByName(String name);

}
