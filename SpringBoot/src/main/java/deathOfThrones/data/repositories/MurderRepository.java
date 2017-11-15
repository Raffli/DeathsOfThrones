package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.MurderEntity;


public interface MurderRepository extends CrudRepository<MurderEntity, String> {
	
	MurderEntity findByName(String name);

}
