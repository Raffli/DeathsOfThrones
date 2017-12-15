package deathOfThrones.data.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.rest.deaths.DeathEpisodeSeason;
import deathOfThrones.rest.deaths.DeathPlace;


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

	
}
