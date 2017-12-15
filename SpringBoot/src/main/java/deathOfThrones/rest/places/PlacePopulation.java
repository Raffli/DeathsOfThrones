package deathOfThrones.rest.places;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlacePopulation {
	private String name;
	
	private int population;
}
