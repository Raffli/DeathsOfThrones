package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.EpisodeEntity;


public interface EpisodeRepository extends CrudRepository<EpisodeEntity, Long> {
	
	EpisodeEntity findByEpisodeId(int episodeId);
	
	EpisodeEntity findByTitle(String title);
	
	@Query("select title from EpisodeEntity")
	Iterable<String> getAllTitles();
	
	Iterable<EpisodeEntity> findAllByOrderByImdbRating();
	
	Iterable<EpisodeEntity> findAllByOrderByImdbRatingDesc();
	
	@Query("select distinct season from EpisodeEntity")
	public int[] getAllSeasons();
	
	@Query("select viewers from EpisodeEntity e where e.season = ?1")
	public int[] getAllViewersOfSeason(int season);

}
