package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
    
	
}

