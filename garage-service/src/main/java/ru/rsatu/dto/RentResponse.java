package ru.rsatu.dto;

import ru.rsatu.entities.BoxStorageCar;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RentResponse {
    public Long boxId;
    public Long carId;
    public String clientFirstName;
    public String clientLastName;
    public String brandName;
    public String receiptNumber;
    public LocalDate startDate;
    public LocalDate endDate;
    public BigDecimal pricePerDay;

    public static RentResponse fromEntity(BoxStorageCar rent) {
        RentResponse dto = new RentResponse();
        dto.boxId = rent.box.id;
        dto.carId = rent.car.id;
        dto.clientFirstName = rent.car.client.firstName;
        dto.clientLastName = rent.car.client.lastName;
        dto.brandName = rent.car.brand.name;
        dto.receiptNumber = rent.receiptNumber;
        dto.startDate = rent.startDate;
        dto.endDate = rent.endDate;
        dto.pricePerDay = rent.pricePerDay;
        return dto;
    }
}
