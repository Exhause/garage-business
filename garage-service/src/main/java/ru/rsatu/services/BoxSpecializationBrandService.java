package ru.rsatu.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import ru.rsatu.entities.Box;
import ru.rsatu.entities.BoxSpecializationBrand;
import ru.rsatu.entities.BoxSpecializationBrandId;
import ru.rsatu.entities.Brand;

@ApplicationScoped
public class BoxSpecializationBrandService {
    @Transactional
    public void addSpecialization(Long boxId, Long brandId) {
        BoxSpecializationBrand boxSpecializationBrand = new BoxSpecializationBrand();
        boxSpecializationBrand.box = Box.findById(boxId);
        boxSpecializationBrand.brand = Brand.findById(brandId);
        boxSpecializationBrand.persist();
    }

    @Transactional
    public void removeSpecialization(Long boxId, Long brandId) {
        BoxSpecializationBrandId id = new BoxSpecializationBrandId(boxId, brandId);
        BoxSpecializationBrand.deleteById(id);
    }
}
