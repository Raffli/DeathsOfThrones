package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.RegionEntity;
import deathOfThrones.data.repositories.RegionRepository;

@RequestMapping(path="/dot/region")
@RestController
public class RegionController {
	
	@Autowired
	private RegionRepository regionRepository;
	
	
	@GetMapping(path="/all")
	public Iterable<RegionEntity> getAllRegions() {
		return regionRepository.findAll();
	}
	
}
