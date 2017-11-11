package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name ="murder")
@Getter
public class MurderEntitie {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "origin")
    private String origin;
    
    @Column (name = "following")
    private String following;
    
    @Column (name = "religion")
    private String religion;
}

