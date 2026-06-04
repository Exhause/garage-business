package ru.rsatu.dto;

import java.math.BigDecimal;

public class OccupiedBoxDto {
    public Long id;
    public BigDecimal pricePerDay;

    public OccupiedBoxDto(Long id, BigDecimal pricePerDay) {
        this.id = id;
        this.pricePerDay = pricePerDay;
    }
}