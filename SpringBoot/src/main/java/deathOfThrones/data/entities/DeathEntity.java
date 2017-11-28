package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name ="deaths")
@Getter
public class DeathEntity {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "role")
    private String role;
    
    @Column (name = "episodeId", insertable=false, updatable=false)
    private int episodeId;
    
    @Column (name = "execution")
    private String execution;
    
    @Column (name = "murder")
    private String murder;
    
    @Column (name = "likelihoodofreturn")
    private String likelihoodofreturn;
    
    @Column (name = "place")
    private String place;
    
    @Column (name = "videoStart")
    private int videoStart;
    
    @Column (name = "videoEnd")
    private int videoEnd;
    
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="episodeId")
	private EpisodeEntity episode;
	
	public int getSeason() {
		return episode.getSeason();
	}
	public int getEpisode() {
		return episode.getNumberInSeason();
	}
}

