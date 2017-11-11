package deathOfThrones.data.repositories;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.Episode;


public interface EpisodeRepository extends CrudRepository<Episode, Long> {
	
	Episode findByEpisodeId(int episodeId);

}
