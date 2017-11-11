package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="deaths")

public class Death {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "role")
    private String role;
    
    @Column (name = "episodeId")
    private int episodeId;
    
    @Column (name = "execution")
    private String execution;
    
    @Column (name = "murder")
    private String murder;
    
    @Column (name = "likelihoodofreturn")
    private String likelihoodofreturn;
    
    @Column (name = "place")
    private String place;
    
	public String getName() {
		return name;
	}

	public String getRole() {
		return role;
	}

	public String getPlace() {
		return place;
	}


	public String getLikelihoodofreturn() {
		return likelihoodofreturn;
	}

	public String getMurder() {
		return murder;
	}

	public String getExecution() {
		return execution;
	}


	public int getEpisode() {
		return episodeId;
	}
    
}

