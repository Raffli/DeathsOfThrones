package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Image;


public interface ImageRepository extends CrudRepository<Image, String> {
	
	Image findByName(String name);

}
