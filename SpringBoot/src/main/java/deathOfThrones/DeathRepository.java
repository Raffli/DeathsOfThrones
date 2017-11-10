package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Death;


public interface DeathRepository extends CrudRepository<Death, String> {
	
	Death findByName(String name);

}
