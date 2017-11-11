package deathOfThrones.data.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name ="images")
@Getter
public class ImageEntity {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "image")
    private byte[] image;
    
}

