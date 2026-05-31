package ru.rsatu.services;

import jakarta.ws.rs.NotFoundException;
import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class BrandService {

    @Transactional
    public Brand addBrand(String name) {
        Brand brand = new Brand();
        brand.name = name;
        brand.persist();
        return brand;
    }

    @Transactional
    public void removeBrand(Long brandId) {
        Brand brand = Brand.findById(brandId);
        if (brand == null) throw new NotFoundException("Бренд отсутствует");
        Car.delete("brand", brand);
        brand.delete();
    }

    public List<Brand> getAllBrands() {
        return Brand.listAll();
    }
}