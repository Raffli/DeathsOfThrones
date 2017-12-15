package deathOfThrones.rest.murderer;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MurderKills {
	private String name;
	
	private long kills;
}
