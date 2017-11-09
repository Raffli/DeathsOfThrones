package deathOfThrones;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="episodes")

public class Episode {
    @Id
    @Column (name = "episodeId")
    private int episodeId;
    
    @Column (name = "season")
    private int season;

    @Column (name = "numberInSeason")
    private int numberInSeason;
    
    @Column (name = "title")
    private String title;
    
    @Column (name = "directedBy")
    private String directedBy;
    
	@Column (name = "writtenBy")
    private String writtenBy;
    
    @Column (name = "originalAirDate")
    private String originalAirDate;

    @Column (name = "viewers")
    private String viewers;
    
    @Column (name = "imdbRating")
    private int imdbRating;
    
    public int getNumberOverall() {
		return episodeId;
	}

	public int getSeason() {
		return season;
	}

	public int getNumberInSeason() {
		return numberInSeason;
	}

	public String getTitle() {
		return title;
	}

	public String getDirectedBy() {
		return directedBy;
	}

	public String getWrittenBy() {
		return writtenBy;
	}

	public String getOriginalAirDate() {
		return originalAirDate;
	}

	public String getViewers() {
		return viewers;
	}

	public int getImdbRating() {
		return imdbRating;
	}


}


