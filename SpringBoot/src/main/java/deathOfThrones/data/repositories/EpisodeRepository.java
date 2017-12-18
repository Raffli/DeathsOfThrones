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
	
	@Query("select title from EpisodeEntity order by title")
	Iterable<String> getAllTitlesByAbc();

	@Query("select new deathOfThrones.rest.search.NameCategory(e.title, 'episode') from EpisodeEntity e where e.title like %?1%")
	List<NameCategory> getWithSimilarTitle(String title);
	
	@Query("select new deathOfThrones.rest.episodes.TitleSeason(e.title, e.season) from EpisodeEntity e order by e.episodeId")
	Iterable<TitleSeason> getAllTitles();

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
		
	@Query("select AVG(viewers) from EpisodeEntity e group by e.season")
	public int[] getAVGViewersOfSeasons();
	


}
