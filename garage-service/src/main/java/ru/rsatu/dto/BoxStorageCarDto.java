package ru.rsatu.dto;

import com.sun.istack.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BoxStorageCarDto {

    @NotNull
    public Long boxId;

    @NotNull
    public Long carId;

    public String receiptNumber;

    @NotNull
    public LocalDate startDate;

    @NotNull
    public LocalDate endDate;

    @NotNull
    public BigDecimal pricePerDay;
}

