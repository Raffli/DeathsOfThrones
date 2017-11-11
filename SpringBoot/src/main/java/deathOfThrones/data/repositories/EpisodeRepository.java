package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.EpisodeEntity;


public interface EpisodeRepository extends CrudRepository<EpisodeEntity, Long> {
	
	EpisodeEntity findByEpisodeId(int episodeId);

}
