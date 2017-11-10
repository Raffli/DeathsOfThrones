package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Murder;


public interface MurderRepository extends CrudRepository<Murder, String> {
	
	Murder findByName(String name);

}
