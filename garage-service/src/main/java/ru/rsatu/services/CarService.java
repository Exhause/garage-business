package ru.rsatu.services;

import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CarService {

    @Transactional
    public Car addCar(Long clientId, Long brandId) {
        Client client = Client.findById(clientId);
        Brand brand = Brand.findById(brandId);
        if (client == null || brand == null) throw new IllegalArgumentException("Клиент или марка не найдены");
        Car car = new Car();
        car.client = client;
        car.brand = brand;
        car.persist();
        return car;
    }

    public Car getCar(Long carId) {
        return Car.findById(carId);
    }
}