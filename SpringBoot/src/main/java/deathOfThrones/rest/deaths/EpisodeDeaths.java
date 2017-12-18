package deathOfThrones.rest.deaths;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EpisodeDeaths {
	private int episodeId;
	
	private long deaths;
}
