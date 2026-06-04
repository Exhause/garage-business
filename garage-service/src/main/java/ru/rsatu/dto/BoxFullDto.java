package ru.rsatu.dto;

import java.util.List;

public class BoxFullDto {
    public boolean free;
    public RentInfoDto rentInfo;
    public List<BrandDto> allowedBrands;

    public BoxFullDto(boolean free) {
        this.free = free;
    }
}
