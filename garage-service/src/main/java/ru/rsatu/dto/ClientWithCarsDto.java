package ru.rsatu.dto;

import java.util.List;

public class ClientWithCarsDto {
    public Long id;
    public String fullName;
    public String address;
    public List<OwnedCarDto> ownedCars;

    public ClientWithCarsDto(Long id, String lastName, String firstName, String middleName, String address) {
        this.id = id;
        this.fullName = lastName + " " + firstName + (middleName != null ? " " + middleName : "");
        this.address = address;
    }
}
