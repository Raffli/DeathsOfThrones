package deathOfThrones.data.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.rest.deaths.DeathEpisodeSeason;
import deathOfThrones.rest.deaths.DeathPlace;
import deathOfThrones.rest.deaths.DirectorDeaths;
import deathOfThrones.rest.deaths.EpisodeDeaths;
import deathOfThrones.rest.deaths.PlaceDeaths;
import deathOfThrones.rest.deaths.WriterDeaths;
import deathOfThrones.rest.search.NameCategory;


public interface DeathRepository extends CrudRepository<DeathEntity, String> {
	
	DeathEntity findByName(String name);
	
	Iterable<DeathEntity> findByEpisodeId(int id);
	
	@Query("SELECT name FROM DeathEntity")
	Iterable<String> getAllNames();

    Iterable<DeathEntity>  findAllByOrderByEpisodeId();

	@Query("SELECT NEW deathOfThrones.rest.search.NameCategory(d.name, 'death') FROM DeathEntity d WHERE d.name LIKE %?1%")
	List<NameCategory> getWithSimilarName(String name);
    
	@Query("SELECT name FROM DeathEntity WHERE Murder LIKE ?1")
	Iterable<String> getByMurder(String name);
	
	@Query("SELECT NEW deathOfThrones.rest.deaths.DeathEpisodeSeason(d.name, d.episode.season, d.episodeId) FROM DeathEntity d ORDER BY d.episode")
	Iterable<DeathEpisodeSeason> getAllNamesOrderByEpisodeId();
	
	@Query("SELECT NEW deathOfThrones.rest.deaths.DeathPlace(d.name, d.place) FROM DeathEntity d ORDER BY d.place")
	Iterable<DeathPlace> getAllNamesOrderByPlace();
	
	Iterable<DeathEntity> findByPlaceLike(String name);
	
	@Query("SELECT COUNT(episode.season) FROM DeathEntity GROUP BY episode.season")
	int[] getSeasonCount();
	
	@Query("SELECT COUNT(*) FROM DeathEntity WHERE Murder LIKE ?1")
	int getKillCount(String name);

	@Query("SELECT NEW deathOfThrones.rest.deaths.PlaceDeaths(d.place, COUNT(d.place) AS deaths) FROM DeathEntity d GROUP BY d.place ORDER BY deaths DESC")
	Iterable<PlaceDeaths> getDeadlyPlaces();
	
	@Query("SELECT NEW deathOfThrones.rest.deaths.EpisodeDeaths(d.episodeId, COUNT(d.episodeId) AS deaths) FROM DeathEntity d GROUP BY d.episodeId ORDER BY deaths DESC")
	Iterable<EpisodeDeaths> getDeadlyEpisodes();
	
	@Query("SELECT NEW deathOfThrones.rest.deaths.WriterDeaths(e.writtenBy, COUNT(e.writtenBy) AS deaths) FROM DeathEntity d, EpisodeEntity e WHERE e.episodeId = d.episodeId GROUP BY e.writtenBy ORDER BY deaths DESC")
	Iterable<WriterDeaths> getDeadlyWriter();
	
	@Query("SELECT NEW deathOfThrones.rest.deaths.DirectorDeaths(e.directedBy, COUNT(e.directedBy) AS deaths) FROM DeathEntity d, EpisodeEntity e WHERE e.episodeId = d.episodeId GROUP BY e.directedBy ORDER BY deaths DESC")
	Iterable<DirectorDeaths> getDeadlyDirectors();
	
}
