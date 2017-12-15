package deathOfThrones.rest.episodes;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TitleViewer {
	private String title;
	
	private int viewers;
}
