package ru.rsatu.entities;


import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
public class BoxStorageCarId implements Serializable {
    public Long boxId;
    public Long carId;

    public BoxStorageCarId() {
    }

    public BoxStorageCarId(Long boxId, Long carId) {
        this.boxId = boxId;
        this.carId = carId;
    }
}