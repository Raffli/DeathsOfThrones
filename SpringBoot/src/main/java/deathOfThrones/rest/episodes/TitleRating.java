package deathOfThrones.rest.episodes;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TitleRating {
	private String title;
	
	private double rating;
}
