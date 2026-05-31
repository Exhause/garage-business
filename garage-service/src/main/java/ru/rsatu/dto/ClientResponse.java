package ru.rsatu.dto;

import ru.rsatu.entities.Client;

public class ClientResponse {
    public Long id;
    public String firstName;
    public String lastName;
    public String middleName;
    public String address;

    public static ClientResponse fromEntity(Client client) {
        ClientResponse dto = new ClientResponse();
        dto.id = client.id;
        dto.firstName = client.firstName;
        dto.lastName = client.lastName;
        dto.middleName = client.middleName;
        dto.address = client.address;
        return dto;
    }
}