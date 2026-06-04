package ru.rsatu.services;

import ru.rsatu.dto.AvailableCarDto;
import ru.rsatu.dto.CarSaveDto;
import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class CarService {

    @Transactional
    public void createCar(CarSaveDto dto) {
        Car car = new Car();
        car.brand = Brand.findById(dto.brandId);
        car.client = Client.findById(dto.clientId);
        car.persist();
    }

    @Transactional
    public void deleteCar(Long carId) {
        Car.deleteById(carId);
    }

    public List<AvailableCarDto> getAvailableCarsForBox(Long boxId) {
        return Car.getEntityManager().createQuery(
                "SELECT NEW ru.rsatu.dto.AvailableCarDto(c.id, b.name, cl.lastName, cl.firstName, cl.middleName) " +
                        "FROM Car c " +
                        "JOIN c.brand b " +
                        "JOIN c.client cl " +
                        "JOIN BoxSpecializationBrand bsb ON bsb.id.brandId = b.id " +
                        "WHERE bsb.id.boxId = :boxId " +
                        "AND NOT EXISTS (SELECT 1 FROM BoxStorageCar bsc WHERE bsc.car.id = c.id)",
                AvailableCarDto.class
        ).setParameter("boxId", boxId).getResultList();
    }
}