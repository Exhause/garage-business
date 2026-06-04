package ru.rsatu.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;

public class OwnedCarDto {
    public Long carId;
    public String brandName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Boolean occupyingBox;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Long boxId;
    public LocalDate endDate;

    public OwnedCarDto(Long carId, String brandName, Long boxId) {
        this.carId = carId;
        this.brandName = brandName;
        this.occupyingBox = boxId != null;
        this.boxId = boxId;
    }

    public OwnedCarDto(Long carId, String brandName, Long boxId, LocalDate endDate) {
        this.carId = carId;
        this.brandName = brandName;
        this.boxId = boxId;
        this.endDate = endDate;
    }
}
