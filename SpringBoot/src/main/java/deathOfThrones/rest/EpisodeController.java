package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.EpisodeEntity;
import deathOfThrones.data.repositories.EpisodeRepository;

@RequestMapping(path="/dot/episode")
@RestController
public class EpisodeController {
	
	@Autowired
	private EpisodeRepository episodeRepository;
	
	@GetMapping(path="/all")
	public Iterable<EpisodeEntity> getAllEpisodes() {
		return episodeRepository.findAll();
	}
	
	@GetMapping(path="/allTitles")
	public Iterable<String> getAllEpisodeTitles() {
		return episodeRepository.getAllTitles();
	}
	
	@GetMapping(path="/id")
	public EpisodeEntity getEpisodeById(@RequestParam int id) {
		return episodeRepository.findByEpisodeId(id);
	}
	
	
	@GetMapping(path="/title")
	public EpisodeEntity getEpisodeByTitle(@RequestParam String title) {
		return episodeRepository.findByTitle(title);
	}
	
}
