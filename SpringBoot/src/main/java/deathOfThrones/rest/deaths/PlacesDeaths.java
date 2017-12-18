package deathOfThrones.rest.deaths;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlacesDeaths {
	private String name;
	
	private long deaths;
}
