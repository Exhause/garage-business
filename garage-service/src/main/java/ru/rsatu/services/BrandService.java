package ru.rsatu.services;

import ru.rsatu.dto.BrandDto;
import ru.rsatu.dto.BrandSaveDto;
import ru.rsatu.entities.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class BrandService {
    public List<BrandDto> getAllBrands() {
        return Brand.getEntityManager().createQuery(
                "SELECT NEW ru.rsatu.dto.BrandDto(b.id, b.name) FROM Brand b", BrandDto.class
        ).getResultList();
    }

    @Transactional
    public void createBrand(BrandSaveDto dto) {
        Brand brand = new Brand();
        brand.name = dto.name;
        brand.persist();
    }

    @Transactional
    public void deleteBrand(Long brandId) {
        Brand.deleteById(brandId);
    }
}