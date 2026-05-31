package ru.rsatu.services;

import jakarta.ws.rs.NotFoundException;
import ru.rsatu.dto.BoxDto;
import ru.rsatu.entities.*;

import jakarta.transaction.Transactional;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class BoxService {

    @Transactional
    public void addBox() {
        Box box = new Box();
        box.persist();
    }

    @Transactional
    public void closeBox(Long boxId) {
        Box box = Box.findById(boxId);
        if (box == null) throw new NotFoundException("Бокс не найден");
        // проверяем, что бокс пуст
        BoxStorageCar rent = BoxStorageCar.find("box", box).firstResult();
        if (rent != null) throw new IllegalStateException("Бокс занят, нельзя закрыть");
        box.delete();
    }

    public List<Box> getFreeBoxes() {
        List<Long> occupiedIds = BoxStorageCar.findAll().stream()
                .map(bs -> ((BoxStorageCar) bs).box.id)
                .collect(Collectors.toList());
        if (occupiedIds.isEmpty()) {
            return Box.listAll();
        }
        return Box.find("id NOT IN (?1)", occupiedIds).list();
    }

    public List<Brand> getAllowedBrands(Long boxId) {
        List<BoxSpecializationBrand> specs = BoxSpecializationBrand.find("box.id", boxId).list();
        return specs.stream().map(s -> s.brand).collect(Collectors.toList());
    }

    @Transactional
    public BoxSpecializationBrand addSpecialization(Long boxId, Long brandId) {
        Box box = Box.findById(boxId);
        Brand brand = Brand.findById(brandId);
        if (box == null || brand == null) throw new IllegalArgumentException("Бокс или марка не найдены");
        BoxSpecializationBrandId id = new BoxSpecializationBrandId(boxId, brandId);
        BoxSpecializationBrand existing = BoxSpecializationBrand.findById(id);
        if (existing == null) {
            BoxSpecializationBrand spec = new BoxSpecializationBrand();
            spec.box = box;
            spec.brand = brand;
            spec.persist();
            return spec;
        }
        return existing;
    }
}