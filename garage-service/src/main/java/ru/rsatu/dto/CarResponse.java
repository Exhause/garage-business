package ru.rsatu.dto;

import ru.rsatu.entities.Car;

public class CarResponse {
    public Long id;
    public Long clientId;
    public Long brandId;

    public static CarResponse fromEntity(Car car) {
        CarResponse dto = new CarResponse();
        dto.id = car.id;
        dto.clientId = car.client.id;
        dto.brandId = car.brand.id;
        return dto;
    }
}
