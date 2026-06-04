package ru.rsatu.services;

import ru.rsatu.dto.ClientSaveDto;
import ru.rsatu.dto.ClientWithCarsDto;
import ru.rsatu.dto.OwnedCarDto;
import ru.rsatu.entities.Client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    public List<ClientWithCarsDto> getClientsWithCars() {
        List<Object[]> results = Client.getEntityManager().createQuery(
                "SELECT cl, c.id, b.name, bsc.box.id " +
                        "FROM Client cl " +
                        "JOIN Car c ON c.client.id = cl.id " +
                        "JOIN c.brand b " +
                        "LEFT JOIN BoxStorageCar bsc ON bsc.car.id = c.id",
                Object[].class
        ).getResultList();

        Map<Long, ClientWithCarsDto> clientMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            Client client = (Client) row[0];
            Long carId = (Long) row[1];
            String brandName = (String) row[2];
            Long boxId = (Long) row[3];

            clientMap.computeIfAbsent(client.id, id ->
                    new ClientWithCarsDto(client.id, client.lastName, client.firstName, client.middleName, client.address)
            );
            if (clientMap.get(client.id).ownedCars == null) {
                clientMap.get(client.id).ownedCars = new ArrayList<>();
            }
            clientMap.get(client.id).ownedCars.add(new OwnedCarDto(carId, brandName, boxId));
        }
        return new ArrayList<>(clientMap.values());
    }

    public List<ClientWithCarsDto> getClientsWithCarsRentEndsByDate(LocalDate date) {
        List<Object[]> results = Client.getEntityManager().createQuery(
                "SELECT cl, c.id, b.name, bsc.box.id, bsc.endDate " +
                        "FROM Client cl " +
                        "JOIN Car c ON c.client.id = cl.id " +
                        "JOIN c.brand b " +
                        "JOIN BoxStorageCar bsc ON bsc.car.id = c.id " +
                        "WHERE bsc.endDate <= :date",
                Object[].class
        ).setParameter("date", date).getResultList();

        Map<Long, ClientWithCarsDto> clientMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            Client client = (Client) row[0];
            Long carId = (Long) row[1];
            String brandName = (String) row[2];
            Long boxId = (Long) row[3];
            LocalDate endDate = (LocalDate) row[4];

            clientMap.computeIfAbsent(client.id, id ->
                    new ClientWithCarsDto(client.id, client.lastName, client.firstName, client.middleName, client.address)
            );
            if (clientMap.get(client.id).ownedCars == null) {
                clientMap.get(client.id).ownedCars = new ArrayList<>();
            }
            clientMap.get(client.id).ownedCars.add(new OwnedCarDto(carId, brandName, boxId, endDate));
        }
        return new ArrayList<>(clientMap.values());
    }
}