package deathOfThrones;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="images")

public class Image {
    @Id
    @Column (name = "name")
    private String name;
    
    @Column (name = "image")
    private byte[] image;

    
    
	public String getName() {
		return name;
	}

	public byte[] getImage() {
		return image;
	}
}

