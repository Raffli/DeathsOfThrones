package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.PlaceEntity;
import deathOfThrones.data.repositories.PlaceRepository;

@RequestMapping(path="/dot/place")
@RestController
public class PlaceController {

	@Autowired
	private PlaceRepository placeRepository;

	
	@GetMapping(path="/all")
	public Iterable<PlaceEntity> getAllPlaces() {
		return placeRepository.findAll();
	}
}