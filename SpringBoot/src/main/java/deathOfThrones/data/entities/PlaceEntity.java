package deathOfThrones.data.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.persistence.JoinColumn;



import lombok.Getter;

@Entity
@Table(name ="places")
@Getter
public class PlaceEntity {
    @Id
    @Column (name = "name")
    private String name;

    @Column (name = "region", insertable=false, updatable=false)
    private String region;
    
    @Column (name = "inhabitant")
    private String inhabitant;
    
    @Column (name = "population")
    private String population;
    
    @Column (name = "religion")
    private String religion;
    
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="region")
	private RegionEntity continent;

	public String getContinent() {
		return continent.getContinent();
	}
}

