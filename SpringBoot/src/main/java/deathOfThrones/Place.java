package deathOfThrones;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "places")
public class Place {
    @Id
    @Column (name = "name")
    private String name;

    @Column (name = "region")
    private String region;
    
    @Column (name = "continent")
    private String continent;
    
    @Column (name = "inhabitant")
    private String inhabitant;
    
    @Column (name = "population")
    private String population;
    
    @Column (name = "religion")
    private String religion;
    
    
	public String getName() {
		return name;
	}

	public String getRegion() {
		return region;
	}

	public String getContinent() {
		return continent;
	}

	public String getInhabitant() {
		return inhabitant;
	}

	public String getPopulation() {
		return population;
	}
	
	public String getReligion() {
		return religion;
	}
}

