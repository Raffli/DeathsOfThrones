package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Image;


public interface ImageRepository extends CrudRepository<Image, String> {
	
	Image findByName(String name);

}
