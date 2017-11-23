package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.MurderEntity;
import deathOfThrones.data.repositories.MurderRepository;

@RequestMapping(path="/dot/murder")
@RestController
public class MurderController {
	@Autowired
	private MurderRepository murderRepository;
	
	@CrossOrigin()
	@GetMapping(path="/all")
	public Iterable<MurderEntity> getAllMurders() {
		return murderRepository.findAll();
	}
	
}
