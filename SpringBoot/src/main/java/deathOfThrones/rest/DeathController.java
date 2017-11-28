package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.data.repositories.DeathRepository;

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
	public Iterable<DeathEntity> getAllByEpisodeId() {
		return deathRepository.findAllByOrderByEpisodeId();
	}
	
	@GetMapping(path="/name")
	public DeathEntity getDeathByName(@RequestParam String name) {
		return deathRepository.findByName(name);
	}
	
	@GetMapping(path="/murder")
	public Iterable<DeathEntity> getDeathByMurder(@RequestParam String name) {
		return deathRepository.findByMurderLike(name);
	}
	
	@GetMapping(path="/place")
	public Iterable<DeathEntity> getDeathByPlace(@RequestParam String name) {
		return deathRepository.findByPlaceLike(name);
	}
	
	@GetMapping(path="/episode")
	public Iterable<DeathEntity> getDeathByEpsidoes(@RequestParam int id) {
		return deathRepository.findByEpisodeId(id);
	}
	
	@GetMapping(path="/deathCountSeason")
	public Iterable<DeathEntity> getDeathCountBySeason() {
		
		return deathRepository.findAllByOrderByEpisodeId();
	}
}
