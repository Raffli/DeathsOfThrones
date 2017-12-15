package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.MurderEntity;
import deathOfThrones.data.repositories.MurderRepository;
import deathOfThrones.rest.murderer.MurderKills;
import deathOfThrones.rest.murderer.MurderOrigin;

@RequestMapping(path="/dot/murder")
@RestController
public class MurderController {
	@Autowired
	private MurderRepository murderRepository;
	
	@GetMapping(path="/all")
	public Iterable<MurderEntity> getAllMurders() {
		return murderRepository.findAll();
	}
	
	@GetMapping(path="/allNames")
	public Iterable<String> getAllMurderNames() {
		return murderRepository.getAllNames();
	}
	
	@GetMapping(path="/allNamesByKills")
	public Iterable<MurderKills> getAllMurderNamesByKills() {
		return murderRepository.getAllNamesByKills();
	}
	
	@GetMapping(path="/allNamesByOrigins")
	public Iterable<MurderOrigin> getAllMurderNamesByOrigins() {
		return murderRepository.getAllNamesByOrigins();
	}
	
	
	@GetMapping(path="/name")
	public MurderEntity getMurderByName(@RequestParam String name) {
		return murderRepository.findByName(name);
	}
	
	@GetMapping(path="/origin")
	public Iterable<MurderEntity> getMurderByOrigin(@RequestParam String origin) {
		return murderRepository.findByOrigin(origin);
	}
	
}
