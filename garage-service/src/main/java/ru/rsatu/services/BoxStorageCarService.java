package ru.rsatu.services;

import ru.rsatu.dto.BoxStorageCarDto;
import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class BoxStorageCarService {

    @Transactional
    public void rentBox(BoxStorageCarDto boxStorageCarDto) {
        Box box = Box.findById(boxStorageCarDto.boxId);
        Car car = Car.findById(boxStorageCarDto.carId);
        if (box == null || car == null) throw new IllegalArgumentException("Бокс или автомобиль не найдены");

        BoxStorageCar existingRent = BoxStorageCar.find("box", box).firstResult();
        if (existingRent != null) throw new IllegalStateException("Бокс уже занят");

        boolean specializationExists = BoxSpecializationBrand
                .find("box = ?1 and brand = ?2", box, car.brand).count() > 0;
        if (!specializationExists) throw new IllegalStateException("Бокс не специализируется на марке автомобиля");

        BoxStorageCar rent = new BoxStorageCar();
        rent.box = box;
        rent.car = car;
        rent.receiptNumber = boxStorageCarDto.receiptNumber;
        rent.startDate = boxStorageCarDto.startDate;
        rent.endDate = boxStorageCarDto.endDate;
        rent.pricePerDay = boxStorageCarDto.pricePerDay;
        rent.persist();
    }

    @Transactional
    public void evictClientFromBox(Long boxId) {
        Box box = Box.findById(boxId);
        if (box == null) throw new IllegalArgumentException("Бокс не найден");
        BoxStorageCar rent = BoxStorageCar.find("box", box).firstResult();
        if (rent != null) {
            rent.delete();
        }
    }

    @Transactional
    public void multiplyAllPrices(BigDecimal factor) {
        BoxStorageCar.update("pricePerDay = pricePerDay * ?1", factor);
    }

    public BoxStorageCar getRentByBox(Long boxId) {
        Box box = Box.findById(boxId);
        if (box == null) return null;
        return BoxStorageCar.find("box", box).firstResult();
    }

    public List<Client> getClientsByBrand(Long brandId) {
        List<Car> cars = Car.find("brand.id", brandId).list();
        return cars.stream().map(c -> c.client).distinct().collect(Collectors.toList());
    }

    public List<BoxStorageCar> getRentsExpiringByDate(LocalDate date) {
        return BoxStorageCar.find("endDate = ?1", date).list();
    }
}