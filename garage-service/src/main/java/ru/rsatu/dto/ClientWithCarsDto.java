package ru.rsatu.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

public class ClientWithCarsDto {
    public Long id;
    public String fullName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String address;
    public List<OwnedCarDto> ownedCars;

    public ClientWithCarsDto(Long id, String lastName, String firstName, String middleName, String address) {
        this.id = id;
        this.fullName = lastName + " " + firstName + (middleName != null ? " " + middleName : "");
        this.address = address;
    }
}
