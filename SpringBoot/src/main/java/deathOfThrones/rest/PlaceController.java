package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.PlaceEntity;
import deathOfThrones.data.repositories.PlaceRepository;
import deathOfThrones.rest.places.PlacePopulation;
import deathOfThrones.rest.places.PlaceRegion;

@RequestMapping(path="/dot/place")
@RestController
public class PlaceController {

	@Autowired
	private PlaceRepository placeRepository;

	@GetMapping(path="/all")
	public Iterable<PlaceEntity> getAllPlaces() {
		return placeRepository.findAll();
	}
	
	@GetMapping(path="/allByRegion")
	public Iterable<PlaceRegion> getAllPlacesByRegion() {
		return placeRepository.getAllPlacesOrderByRegion();
	}
	
	@GetMapping(path="/allByPopulation")
	public Iterable<PlacePopulation> getAllPlacesByPopulation() {
		return placeRepository.getAllPlacesOrderByPopulation();
	}
	
	@GetMapping(path="/name")
	public PlaceEntity getPlaceByName(@RequestParam String name) {
		return placeRepository.findByName(name);
	}	
	
	@GetMapping(path="/allNames")
	public Iterable<String> getAllPlacesNames() {
		return placeRepository.getAllNames();
	}
}
