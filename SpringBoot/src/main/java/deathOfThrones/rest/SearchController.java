package deathOfThrones.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.DeathEntity;
import deathOfThrones.data.repositories.DeathRepository;
import deathOfThrones.data.repositories.EpisodeRepository;
import deathOfThrones.data.repositories.MurderRepository;
import deathOfThrones.data.repositories.PlaceRepository;
import deathOfThrones.rest.search.NameCategory;


@RequestMapping(path="/dot/search")
@RestController
public class SearchController {
	
	@Autowired
	DeathRepository deathRepo;
	@Autowired
	EpisodeRepository episodeRepo;
	@Autowired
	MurderRepository murderRepo;
	@Autowired
	PlaceRepository placeRepo;
	
	@GetMapping(path="/all")
	public Iterable<DeathEntity> getAllDeaths() {
		return deathRepo.findAll();
	}
	
	@GetMapping(path="/findEntity")
	public List<NameCategory> getEntitiesWithName(@RequestParam String name) {
		List<NameCategory> entities = deathRepo.getWithSimilarName(name);
		List<NameCategory> episodes = episodeRepo.getWithSimilarTitle(name);
		List<NameCategory> murderer = murderRepo.getWithSimilarName(name);
		List<NameCategory> places = placeRepo.getWithSimilarName(name);
		
		 
		for (NameCategory e : episodes) {
			entities.add(e);
		}
		for (NameCategory m : murderer) {
			entities.add(m);
		}
		for (NameCategory p : places) {
			entities.add(p);
		}
		return entities;
	}

}
