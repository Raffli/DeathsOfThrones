package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table (name = "places")
@Getter
public class PlaceEntitie {
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
    
}

