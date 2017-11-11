package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="murder")

public class Murder {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "origin")
    private String origin;
    
    @Column (name = "following")
    private String following;
    
    @Column (name = "religion")
    private String religion;
    
    
	public String getName() {
		return name;
	}

	public String getOrigin() {
		return origin;
	}

	public String getFollowing() {
		return following;
	}


	public String getReligion() {
		return religion;
	}
}

