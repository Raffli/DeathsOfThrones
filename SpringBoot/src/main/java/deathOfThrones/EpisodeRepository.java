package deathOfThrones;


import org.springframework.data.repository.CrudRepository;

import deathOfThrones.Episode;


public interface EpisodeRepository extends CrudRepository<Episode, Long> {
	
	Episode findByNumberOverall(int numberOverall);

}
