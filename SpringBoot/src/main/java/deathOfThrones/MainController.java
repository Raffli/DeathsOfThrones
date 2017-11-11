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

import deathOfThrones.data.entities.Death;
import deathOfThrones.data.entities.Episode;
import deathOfThrones.data.entities.Image;
import deathOfThrones.data.entities.Murder;
import deathOfThrones.data.entities.Place;
import deathOfThrones.data.entities.Region;
import deathOfThrones.data.repositories.DeathRepository;
import deathOfThrones.data.repositories.EpisodeRepository;
import deathOfThrones.data.repositories.ImageRepository;
import deathOfThrones.data.repositories.MurderRepository;
import deathOfThrones.data.repositories.PlaceRepository;
import deathOfThrones.data.repositories.RegionRepository;

@RequestMapping(path="/dot")
@RestController
public class MainController {
	
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
	
}
