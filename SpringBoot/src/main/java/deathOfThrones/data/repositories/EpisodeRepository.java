package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.EpisodeEntity;
import deathOfThrones.rest.episodes.TitleRating;
import deathOfThrones.rest.episodes.TitleSeason;
import deathOfThrones.rest.episodes.TitleViewer;
import deathOfThrones.rest.search.NameCategory;


public interface EpisodeRepository extends CrudRepository<EpisodeEntity, Long> {
	
	EpisodeEntity findByEpisodeId(int episodeId);
	
	EpisodeEntity findByTitle(String title);
	
	@Query("SELECT title FROM EpisodeEntity ORDER BY title")
	Iterable<String> getAllTitlesByAbc();

	@Query("SELECT NEW deathOfThrones.rest.search.NameCategory(e.title, 'episode') FROM EpisodeEntity e WHERE e.title like %?1%")
	List<NameCategory> getWithSimilarTitle(String title);
	
	@Query("SELECT NEW deathOfThrones.rest.episodes.TitleSeason(e.title, e.season) FROM EpisodeEntity e ORDER BY e.episodeId")
	Iterable<TitleSeason> getAllTitles();

	@Query("SELECT NEW deathOfThrones.rest.episodes.TitleRating(e.title, e.imdbRating) FROM EpisodeEntity e ORDER BY e.imdbRating")
	Iterable<TitleRating> getAllByOrderByImdbRating();
	
	@Query("SELECT NEW deathOfThrones.rest.episodes.TitleRating(e.title, e.imdbRating) FROM EpisodeEntity e ORDER BY e.imdbRating desc")
	Iterable<TitleRating> getAllByOrderByImdbRatingDesc();
	
	@Query("SELECT NEW deathOfThrones.rest.episodes.TitleViewer(e.title, e.viewers) FROM EpisodeEntity e ORDER BY e.viewers")
	Iterable<TitleViewer> getAllByOrderByViewers();	
	
	@Query("SELECT NEW deathOfThrones.rest.episodes.TitleViewer(e.title, e.viewers) FROM EpisodeEntity e ORDER BY e.viewers desc")
	Iterable<TitleViewer> getAllByOrderByViewersDesc();	
	
	@Query("SELECT DISTINCT season FROM EpisodeEntity")
	public int[] getAllSeasons();
		
	@Query("SELECT AVG(viewers) FROM EpisodeEntity e GROUP BY e.season")
	public int[] getAVGViewersOfSeasons();
	


}
