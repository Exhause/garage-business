package ru.rsatu.dto;

import ru.rsatu.entities.Brand;

public class BrandResponse {
    public Long id;
    public String name;

    public static BrandResponse fromEntity(Brand brand) {
        BrandResponse dto = new BrandResponse();
        dto.id = brand.id;
        dto.name = brand.name;
        return dto;
    }
}
