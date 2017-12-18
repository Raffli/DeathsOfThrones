package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.data.repositories.DeathRepository;
import deathOfThrones.rest.deaths.DeathEpisodeSeason;
import deathOfThrones.rest.deaths.DeathPlace;
import deathOfThrones.rest.deaths.DirectorDeaths;
import deathOfThrones.rest.deaths.EpisodeDeaths;
import deathOfThrones.rest.deaths.PlaceDeaths;
import deathOfThrones.rest.deaths.WriterDeaths;


@RequestMapping(path="/dot/death")
@RestController
public class DeathController {
	
	@Autowired
	private DeathRepository deathRepository;
	
	@GetMapping(path="/all")
	public Iterable<DeathEntity> getAllDeaths() {
		return deathRepository.findAll();
	}
	
	@GetMapping(path="/allNames")
	public Iterable<String> getAllDeathsNames() {
		return deathRepository.getAllNames();
	}
	
	@GetMapping(path="/allByEpisodeId")
	public Iterable<DeathEpisodeSeason> getAllByEpisodeIdAndSeason() {
		return deathRepository.getAllNamesOrderByEpisodeId();
	}
	
	@GetMapping(path="/allByPlace")
	public Iterable<DeathPlace> getAllByPlace() {
		return deathRepository.getAllNamesOrderByPlace();
	}
	
	@GetMapping(path="/name")
	public DeathEntity getDeathByName(@RequestParam String name) {
		return deathRepository.findByName(name);
	}
	
	@GetMapping(path="/murder")
	public Iterable<String> getDeathByMurder(@RequestParam String name) {
		return deathRepository.getByMurder(name);
	}
	
	@GetMapping(path="/place")
	public Iterable<DeathEntity> getDeathByPlace(@RequestParam String name) {
		return deathRepository.findByPlaceLike(name);
	}
	
	@GetMapping(path="/episode")
	public Iterable<DeathEntity> getDeathByEpsidoes(@RequestParam int id) {
		return deathRepository.findByEpisodeId(id);
	}
	
	@GetMapping(path="/deathCountBySeason")
	public int[] getDeathCountBySeason() {
		return deathRepository.getSeasonCount();
	}
	
	@GetMapping(path="/killsByMurder")
	public int getKillsByMurderName(@RequestParam String name) {
		return deathRepository.getKillCount(name);
	}
	
	@GetMapping(path="/topFiveDeathPlaces")
	public PlaceDeaths[] getTopFiveDeathPlaces() {
		PlaceDeaths[] places = new PlaceDeaths[5];
		Iterable <PlaceDeaths> placesIterable = deathRepository.getDeadlyPlaces();
		
		int i = 0;
	    for(PlaceDeaths p: placesIterable) {
	         places[i] = p;
	         i++;
	         if (i >= places.length) {
	        	 break;
	         }
	    }
		return places;
	}
	
	@GetMapping(path="/topFiveDeathEpisodes")
	public EpisodeDeaths[] getTopFiveDeathEpisodes() {
		EpisodeDeaths[] episodes = new EpisodeDeaths[5];
		Iterable <EpisodeDeaths> episodesIterable = deathRepository.getDeadlyEpisodes();
		
		int i = 0;
	    for(EpisodeDeaths p: episodesIterable) {
	    	episodes[i] = p;
	         i++;
	         if (i >= episodes.length) {
	        	 break;
	         }
	    }
		return episodes;
	}
	
	@GetMapping(path="/topFiveDeathWriters")
	public WriterDeaths[] getTopFiveDeathWriters() {
		WriterDeaths[] writers = new WriterDeaths[5];
		Iterable <WriterDeaths> writersIterable = deathRepository.getDeadlyWriter();
		
		int i = 0;
	    for(WriterDeaths p: writersIterable) {
	    	writers[i] = p;
	         i++;
	         if (i >= writers.length) {
	        	 break;
	         }
	    }
		return writers;
	}
	
	@GetMapping(path="/topFiveDeathDirectors")
	public DirectorDeaths[] getTopFiveDeathDirectors() {
		DirectorDeaths[] directors = new DirectorDeaths[5];
		Iterable <DirectorDeaths> directorsIterable = deathRepository.getDeadlyDirectors();
		
		int i = 0;
	    for(DirectorDeaths p: directorsIterable) {
	    	directors[i] = p;
	         i++;
	         if (i >= directors.length) {
	        	 break;
	         }
	    }
		return directors;
	}
	
}
