package ru.rsatu.services;

import ru.rsatu.dto.ClientSaveDto;
import ru.rsatu.entities.Client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ClientService {

    @Transactional
    public void createClient(ClientSaveDto dto) {
        Client client = new Client();
        client.firstName = dto.firstName;
        client.lastName = dto.lastName;
        client.middleName = dto.middleName;
        client.address = dto.address;
        client.persist();
    }

    @Transactional
    public void deleteClient(Long clientId) {
        Client.deleteById(clientId);
    }
}