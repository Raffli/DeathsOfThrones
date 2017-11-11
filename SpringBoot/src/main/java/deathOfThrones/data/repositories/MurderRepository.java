package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.MurderEntitie;


public interface MurderRepository extends CrudRepository<MurderEntitie, String> {
	
	MurderEntitie findByName(String name);

}
