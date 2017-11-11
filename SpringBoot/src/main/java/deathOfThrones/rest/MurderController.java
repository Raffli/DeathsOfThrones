package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.MurderEntitie;
import deathOfThrones.data.repositories.MurderRepository;

@RequestMapping(path="/dot/murder")
@RestController
public class MurderController {
	@Autowired
	private MurderRepository murderRepository;
	
	@GetMapping(path="/allMurders")
	public Iterable<MurderEntitie> getAllMurders() {
		return murderRepository.findAll();
	}
	
}
