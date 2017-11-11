package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.DeathEntitie;
import deathOfThrones.data.repositories.DeathRepository;

@RequestMapping(path="/dot/death")
@RestController
public class DeathController {
	
	@Autowired
	private DeathRepository deathRepository;
	
	@GetMapping(path="/all")
	public Iterable<DeathEntitie> getAllDeaths() {
		return deathRepository.findAll();
	}
	
}
