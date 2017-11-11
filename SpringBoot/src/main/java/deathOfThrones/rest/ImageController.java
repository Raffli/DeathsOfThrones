package deathOfThrones.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import deathOfThrones.data.entities.ImageEntity;
import deathOfThrones.data.repositories.ImageRepository;

@RequestMapping(path="/dot/image")
@RestController
public class ImageController {
	@Autowired
	private ImageRepository imageRepository;
	
	@GetMapping(path="/allImages")
	public Iterable<ImageEntity> getAllImages() {
		return imageRepository.findAll();
	}
	
	@GetMapping(path="/imageByName", produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] getImageByName(@RequestParam String name) {
        return imageRepository.findByName(name).getImage();
	}

}
