package ru.rsatu.dto;

public class AvailableCarDto {
    public Long id;
    public String brandName;
    public String clientFullName;

    public AvailableCarDto(Long id, String brandName, String clientLastName, String clientFirstName, String clientMiddleName) {
        this.id = id;
        this.brandName = brandName;
        this.clientFullName = clientLastName + " " + clientFirstName + (clientMiddleName != null ? " " + clientMiddleName : "");
    }
}
