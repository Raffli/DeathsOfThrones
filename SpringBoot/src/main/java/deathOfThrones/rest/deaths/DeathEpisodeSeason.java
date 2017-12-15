package deathOfThrones.rest.deaths;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeathEpisodeSeason {

	private String name;
	
	private int season;
	
	private int episodeId;
}
