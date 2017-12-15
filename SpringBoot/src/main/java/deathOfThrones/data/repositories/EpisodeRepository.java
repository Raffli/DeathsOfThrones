package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.EpisodeEntity;
import deathOfThrones.rest.episodes.TitleRating;
import deathOfThrones.rest.episodes.TitleViewer;


public interface EpisodeRepository extends CrudRepository<EpisodeEntity, Long> {
	
	EpisodeEntity findByEpisodeId(int episodeId);
	
	EpisodeEntity findByTitle(String title);
	
	@Query("select title from EpisodeEntity order by title")
	Iterable<String> getAllTitlesByAbc();
	
	@Query("select title from EpisodeEntity")
	Iterable<String> getAllTitles();

	@Query("select new deathOfThrones.rest.episodes.TitleRating(e.title, e.imdbRating) from EpisodeEntity e order by e.imdbRating")
	Iterable<TitleRating> getAllByOrderByImdbRating();
	
	@Query("select new deathOfThrones.rest.episodes.TitleRating(e.title, e.imdbRating) from EpisodeEntity e order by e.imdbRating desc")
	Iterable<TitleRating> getAllByOrderByImdbRatingDesc();
	
	@Query("select new deathOfThrones.rest.episodes.TitleViewer(e.title, e.viewers) from EpisodeEntity e order by e.viewers")
	Iterable<TitleViewer> getAllByOrderByViewers();	
	
	@Query("select new deathOfThrones.rest.episodes.TitleViewer(e.title, e.viewers) from EpisodeEntity e order by e.viewers desc")
	Iterable<TitleViewer> getAllByOrderByViewersDesc();	
	
	@Query("select distinct season from EpisodeEntity")
	public int[] getAllSeasons();
	
	@Query("select viewers from EpisodeEntity e where e.season = ?1")
	public int[] getAllViewersOfSeason(int season);
	


}
