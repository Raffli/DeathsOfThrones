package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.EpisodeEntity;
import deathOfThrones.data.repositories.EpisodeRepository;

@RequestMapping(path="/dot/episode")
@RestController
public class EpisodeController {
	
	@Autowired
	private EpisodeRepository episodeRepository;
	
	
	@GetMapping(path="/allEpisodes")
	public Iterable<EpisodeEntity> getAllEpisodes() {
		return episodeRepository.findAll();
	}
	
}
