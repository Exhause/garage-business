package ru.rsatu.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BoxStorageCarSaveDto {
    public Long boxId;
    public Long carId;
    public String receiptNumber;
    public LocalDate startDate;
    public LocalDate endDate;
    public BigDecimal pricePerDay;
}
