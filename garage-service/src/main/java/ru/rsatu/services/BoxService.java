package ru.rsatu.services;

import jakarta.ws.rs.NotFoundException;
import ru.rsatu.dto.BoxDto;
import ru.rsatu.dto.BoxFullDto;
import ru.rsatu.dto.BrandDto;
import ru.rsatu.dto.RentInfoDto;
import ru.rsatu.entities.*;

import jakarta.transaction.Transactional;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class BoxService {

    @Transactional
    public void addBox() {
        Box box = new Box();
        box.persist();
    }

    @Transactional
    public void deleteBox(Long boxId) {
        Box box = Box.findById(boxId);
        if (box == null) throw new NotFoundException("Бокс не найден");
        // проверяем, что бокс пуст
        BoxStorageCar rent = BoxStorageCar.find("box", box).firstResult();
        if (rent != null) throw new IllegalStateException("Бокс занят, нельзя закрыть");
        box.delete();
    }

    public List<BoxDto> getAllBoxes() {
        return Box.getEntityManager().createQuery(
                "SELECT NEW ru.rsatu.dto.BoxDto(b.id, " +
                        "NOT EXISTS (SELECT 1 FROM BoxStorageCar bsc WHERE bsc.box.id = b.id)) " +
                        "FROM Box b", BoxDto.class
        ).getResultList();
    }

    public BoxFullDto getBoxById(Long id) {
        boolean isFree = Box.getEntityManager().createQuery(
                "SELECT NOT EXISTS (SELECT 1 FROM BoxStorageCar bsc WHERE bsc.box.id = :boxId)",
                Boolean.class
        ).setParameter("boxId", id).getSingleResult();

        BoxFullDto dto = new BoxFullDto(isFree);

        if (!isFree) {
            dto.rentInfo = Box.getEntityManager().createQuery(
                    "SELECT NEW ru.rsatu.dto.RentInfoDto(cl.lastName, cl.firstName, cl.middleName, cl.address, " +
                            "c.id, b.name, bsc.receiptNumber, bsc.startDate, bsc.endDate, bsc.pricePerDay) " +
                            "FROM BoxStorageCar bsc " +
                            "JOIN bsc.car c " +
                            "JOIN c.client cl " +
                            "JOIN c.brand b " +
                            "WHERE bsc.box.id = :boxId",
                    RentInfoDto.class
            ).setParameter("boxId", id).getSingleResult();
        }

        dto.allowedBrands = Box.getEntityManager().createQuery(
                "SELECT NEW ru.rsatu.dto.BrandDto(b.id, b.name) " +
                        "FROM BoxSpecializationBrand bsb " +
                        "JOIN bsb.brand b " +
                        "WHERE bsb.id.boxId = :boxId",
                BrandDto.class
        ).setParameter("boxId", id).getResultList();

        return dto;
    }
}