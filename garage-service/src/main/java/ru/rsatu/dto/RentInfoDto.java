package ru.rsatu.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RentInfoDto {
    public String clientFullName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String clientAddress;
    public Long carId;
    public String brandName;
    public String receiptNumber;
    public LocalDate startDate;
    public LocalDate endDate;
    public BigDecimal pricePerDay;

    public RentInfoDto(String clientLastName, String clientFirstName, String clientMiddleName, String clientAddress,
                       Long carId, String brandName, String receiptNumber, LocalDate startDate, LocalDate endDate,
                       BigDecimal pricePerDay) {
        this.clientFullName = clientLastName + " " + clientFirstName + (clientMiddleName != null ? " " + clientMiddleName : "");
        this.clientAddress = clientAddress;
        this.carId = carId;
        this.brandName = brandName;
        this.receiptNumber = receiptNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.pricePerDay = pricePerDay;
    }
}
