package ru.rsatu.services;

import ru.rsatu.dto.BoxStorageCarSaveDto;
import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@ApplicationScoped
public class BoxStorageCarService {
    @Transactional
    public void createBoxStorageCar(BoxStorageCarSaveDto dto) {
        Box box = Box.findById(dto.boxId);
        Car car = Car.findById(dto.carId);

        long count = BoxSpecializationBrand.count("box = ?1 and brand = ?2", box, car.brand);
        if (count == 0) {
            throw new IllegalArgumentException("Box does not support this car brand");
        }

        BoxStorageCar boxStorageCar = new BoxStorageCar();
        boxStorageCar.box = box;
        boxStorageCar.car = car;
        boxStorageCar.receiptNumber = dto.receiptNumber;
        boxStorageCar.startDate = dto.startDate;
        boxStorageCar.endDate = dto.endDate;
        boxStorageCar.pricePerDay = dto.pricePerDay;
        boxStorageCar.persist();
    }

    @Transactional
    public void deleteBoxStorageCar(Long boxId, Long carId) {
        BoxStorageCarId id = new BoxStorageCarId();
        id.boxId = boxId;
        id.carId = carId;
        BoxStorageCar.deleteById(id);
    }

    @Transactional
    public void multiplyPrices(BigDecimal factor) {
        List<BoxStorageCar> boxStorageCars = BoxStorageCar.listAll();
        for (BoxStorageCar bsc : boxStorageCars) {
            bsc.pricePerDay = bsc.pricePerDay.multiply(factor).setScale(2, RoundingMode.HALF_EVEN);
        }
    }
}