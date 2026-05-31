package ru.rsatu.services;

import ru.rsatu.entities.Client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ClientService {

    @Transactional
    public Client addClient(String firstName, String lastName, String middleName, String address) {
        Client client = new Client();
        client.firstName = firstName;
        client.lastName = lastName;
        client.middleName = middleName;
        client.address = address;
        client.persist();
        return client;
    }

    public List<Client> getAllClients() {
        return Client.listAll();
    }

    public Client getClient(Long id) {
        return Client.findById(id);
    }
}