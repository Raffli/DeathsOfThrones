package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.rest.deaths.DeathEpisodeSeason;
import deathOfThrones.rest.deaths.DeathPlace;
import deathOfThrones.rest.deaths.DirectorDeaths;
import deathOfThrones.rest.deaths.EpisodeDeaths;
import deathOfThrones.rest.deaths.PlaceDeaths;
import deathOfThrones.rest.deaths.WriterDeaths;


public interface DeathRepository extends CrudRepository<DeathEntity, String> {
	
	DeathEntity findByName(String name);
	
	Iterable<DeathEntity> findByEpisodeId(int id);
	
	@Query("select name from DeathEntity")
	Iterable<String> getAllNames();

    Iterable<DeathEntity>  findAllByOrderByEpisodeId();

	@Query("select name from DeathEntity where Murder like ?1")
	Iterable<String> getByMurder(String name);
	
	@Query("select new deathOfThrones.rest.deaths.DeathEpisodeSeason(d.name, d.episode.season, d.episodeId) from DeathEntity d order by d.episode")
	Iterable<DeathEpisodeSeason> getAllNamesOrderByEpisodeId();
	
	@Query("select new deathOfThrones.rest.deaths.DeathPlace(d.name, d.place) from DeathEntity d order by d.place")
	Iterable<DeathPlace> getAllNamesOrderByPlace();
	
	Iterable<DeathEntity> findByPlaceLike(String name);
	
	@Query("select count(episode.season) from DeathEntity group by episode.season")
	int[] getSeasonCount();
	
	@Query("select count(*) from DeathEntity where Murder like ?1")
	int getKillCount(String name);

	@Query("select new deathOfThrones.rest.deaths.PlaceDeaths(d.place, count(d.place) as deaths) from DeathEntity d group by d.place order by deaths Desc")
	Iterable<PlaceDeaths> getDeadlyPlaces();
	
	@Query("select new deathOfThrones.rest.deaths.EpisodeDeaths(d.episodeId, count(d.episodeId) as deaths) from DeathEntity d group by d.episodeId order by deaths Desc")
	Iterable<EpisodeDeaths> getDeadlyEpisodes();
	
	@Query("select new deathOfThrones.rest.deaths.WriterDeaths(e.writtenBy, count(e.writtenBy) as deaths) from DeathEntity d, EpisodeEntity e where e.episodeId = d.episodeId group by e.writtenBy order by deaths Desc")
	Iterable<WriterDeaths> getDeadlyWriter();
	
	@Query("select new deathOfThrones.rest.deaths.DirectorDeaths(e.directedBy, count(e.directedBy) as deaths) from DeathEntity d, EpisodeEntity e where e.episodeId = d.episodeId group by e.directedBy order by deaths Desc")
	Iterable<DirectorDeaths> getDeadlyDirectors();
	
}
