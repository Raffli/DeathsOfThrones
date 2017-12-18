package deathOfThrones.rest.deaths;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DirectorDeaths {
	private String director;
	
	private long deaths;
}
