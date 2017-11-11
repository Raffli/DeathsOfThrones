package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "regions")
public class RegionEntitie {
    @Id
    @Column (name = "region")
    private String region;
    
    @Column (name = "continent")
    private String continent;


	public String getRegion() {
		return region;
	}

	public String getContinent() {
		return continent;
	}

}

