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
import deathOfThrones.rest.deaths.PlacesDeaths;


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
	public PlacesDeaths[] getTopFiveDeathPlaces() {
		PlacesDeaths[] places = new PlacesDeaths[5];
		Iterable <PlacesDeaths> placesIterable = deathRepository.getDeadlyPlaces();
		
		int i = 0;
	    for(PlacesDeaths p: placesIterable) {
	         places[i] = p;
	         i++;
	         if (i >= places.length) {
	        	 break;
	         }
	    }
		return places;
	}
	
}
