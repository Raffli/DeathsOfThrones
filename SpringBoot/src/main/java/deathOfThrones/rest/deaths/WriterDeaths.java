package deathOfThrones.rest.deaths;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WriterDeaths {	
	private String writer;
	
	private long deaths;

}
