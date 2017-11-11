package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Murder;


public interface MurderRepository extends CrudRepository<Murder, String> {
	
	Murder findByName(String name);

}
