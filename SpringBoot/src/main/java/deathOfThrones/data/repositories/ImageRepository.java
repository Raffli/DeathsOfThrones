package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.ImageEntity;


public interface ImageRepository extends CrudRepository<ImageEntity, String> {
	
	ImageEntity findByName(String name);

}
