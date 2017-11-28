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
	
	@GetMapping(path="/byImdb")
	public Iterable<EpisodeEntity> getAllEbisodesByImdbRating() {
		return episodeRepository.findAllByOrderByImdbRating();
	}
	
	@GetMapping(path="/byImdbDesc")
	public Iterable<EpisodeEntity> getAllEbisodesByImdbRatingDesc() {
		return episodeRepository.findAllByOrderByImdbRatingDesc();
	}
	
	@GetMapping(path="/id")
	public EpisodeEntity getEpisodeById(@RequestParam int id) {
		return episodeRepository.findByEpisodeId(id);
	}
	
	
	@GetMapping(path="/title")
	public EpisodeEntity getEpisodeByTitle(@RequestParam String title) {
		return episodeRepository.findByTitle(title);
	}
	
	@GetMapping(path="/avgViewerSeason")
	public int[] averageViewersSeason() {
		int[] seasons = episodeRepository.getAllSeasons();
		int[] avgViewers = new int[seasons.length];

		for(int i = 0; i < seasons.length; i++) {
			int[] viewers = episodeRepository.getAllViewersOfSeason(seasons[i]);
			int totalViewers = 0;
			for (int j = 0; j < viewers.length;j++) {
				totalViewers += viewers[j];
			}
			avgViewers[i] = totalViewers/viewers.length;			
		}
		return avgViewers;
	}
	
	
}
