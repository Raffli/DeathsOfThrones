package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table (name = "regions")
@Getter
public class RegionEntity {
    @Id
    @Column (name = "region")
    private String region;
    
    @Column (name = "continent")
    private String continent;
}

