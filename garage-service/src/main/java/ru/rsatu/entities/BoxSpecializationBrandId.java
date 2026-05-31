package ru.rsatu.entities;


import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
public class BoxSpecializationBrandId implements Serializable {
    public Long boxId;
    public Long brandId;

    public BoxSpecializationBrandId() {
    }

    public BoxSpecializationBrandId(Long boxId, Long brandId) {
        this.boxId = boxId;
        this.brandId = brandId;
    }
}