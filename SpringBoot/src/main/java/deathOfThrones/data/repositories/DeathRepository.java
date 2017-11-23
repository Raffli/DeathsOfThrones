package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntity;


public interface DeathRepository extends CrudRepository<DeathEntity, String> {
	
	DeathEntity findByName(String name);
	
	Iterable<DeathEntity> findByEpisodeId(int id);
	
	@Query("select name from DeathEntity")
	Iterable<String> getAllNames();

	Iterable<DeathEntity>  findAllByOrderByEpisodeId();
	
	Iterable<DeathEntity> findByMurderLike(String name);
	
	Iterable<DeathEntity> findByPlaceLike(String name);


}
