package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name ="episodes")
@Getter
public class EpisodeEntity {
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
    
}


