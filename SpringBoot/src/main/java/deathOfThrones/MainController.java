package deathOfThrones;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.Death;
import deathOfThrones.DeathRepository;

@Controller
@RequestMapping(path="/dot")
@RestController
public class MainController {
	
	@Autowired
	private DeathRepository deathRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private EpisodeRepository episodeRepository;
	
	@Autowired
	private MurderRepository murderRepository;
	
	@Autowired
	private PlaceRepository placeRepository;
	
	@Autowired
	private RegionRepository regionRepository;
	
	@GetMapping(path="/allDeaths")
	public Iterable<Death> getAllDeaths() {
		return deathRepository.findAll();
	}
	
	@GetMapping(path="/allEpisodes")
	public Iterable<Episode> getAllEpisodes() {
		return episodeRepository.findAll();
	}
	
	@GetMapping(path="/allRegions")
	public Iterable<Region> getAllRegions() {
		return regionRepository.findAll();
	}
	
	@GetMapping(path="/allImages")
	public Iterable<Image> getAllImages() {
		return imageRepository.findAll();
	}
	
	@GetMapping(path="/imageByName", produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] getImageByName(@RequestParam String name) {
        return imageRepository.findByName(name).getImage();
	}

	
	@GetMapping(path="/allPlaces")
	public Iterable<Place> getAllPlaces() {
		return placeRepository.findAll();
	}
	
	@GetMapping(path="/allMurders")
	public Iterable<Murder> getAllMurders() {
		return murderRepository.findAll();
	}
	
	@GetMapping(path="/death")
	public String getDeath(@RequestParam String name){
		return deathRepository.findByName(name).getMurder();
	}
	
}
